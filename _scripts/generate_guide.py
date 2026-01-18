#!/usr/bin/env python3
"""
指南生成腳本

從來源 Markdown 生成多語言版本的指南 HTML 頁面。
- 讀取 zh-Hant 來源檔案
- 替換 {{KEY}} 變數為對應語言的值
- 轉換 Markdown 為 HTML
- 處理 GitHub Alerts 語法
- 替換 emoji 為 Phosphor 圖示
- 輸出到 gh-pages 目錄結構
"""

import re
import json
import yaml
from pathlib import Path
import markdown
from markdown.extensions.tables import TableExtension
from markdown.extensions.fenced_code import FencedCodeExtension


def slugify_heading(text: str) -> str:
    """
    將標題文字轉換為 HTML id（支援中文）

    規則：
    - 英文轉小寫
    - 移除特殊符號（保留中日韓文、英文、數字、空格、連字號）
    - 空格替換為連字號
    - 合併連續連字號
    """
    # 移除 HTML 標籤
    text = re.sub(r'<[^>]+>', '', text)
    # 英文轉小寫
    text = text.lower()
    # 只保留中日韓文、英文、數字、空格、連字號
    text = re.sub(r'[^\w\s\-\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]', '', text)
    # 空格替換為連字號
    text = re.sub(r'\s+', '-', text)
    # 合併連續連字號
    text = re.sub(r'-+', '-', text)
    # 移除首尾連字號
    text = text.strip('-')
    return text


# 語言配置
# erikyin_path: erikyin.net 的語系路徑
#   - 繁中/簡中：不帶語系（erikyin.net）
#   - 英/日/韓：導向英文版（erikyin.net/en/）
# noto_font: 該語系需要的 Noto Sans 字體（None 表示只用 IBM Plex Sans）
LOCALES = {
    'zh-Hant': {
        'name': '繁體中文',
        'short_name': '繁',
        'path': '',  # 根目錄
        'erikyin_path': '/',
        'noto_font': 'Noto+Sans+TC:wght@100..900',
    },
    'en': {
        'name': 'English',
        'short_name': 'EN',
        'path': 'en/',
        'erikyin_path': '/en/',
        'noto_font': None,
    },
    'zh-Hans': {
        'name': '简体中文',
        'short_name': '简',
        'path': 'zh-Hans/',
        'erikyin_path': '/',
        'noto_font': 'Noto+Sans+SC:wght@100..900',
    },
    'ja': {
        'name': '日本語',
        'short_name': '日',
        'path': 'ja/',
        'erikyin_path': '/en/',
        'noto_font': 'Noto+Sans+JP:wght@100..900',
    },
    'ko': {
        'name': '한국어',
        'short_name': '한',
        'path': 'ko/',
        'erikyin_path': '/en/',
        'noto_font': 'Noto+Sans+KR:wght@100..900',
    },
}

# 指南頁面配置（順序決定側邊欄顯示順序）
GUIDE_PAGES = [
    {'source': 'guide.md', 'output': 'index.html', 'nav_key': 'GUIDE_NAV_HOME'},
    {'source': 'guide-reference.md', 'output': 'reference.html', 'nav_key': 'GUIDE_NAV_REFERENCE'},
    {'source': 'guide-lock.md', 'output': 'lock.html', 'nav_key': 'GUIDE_NAV_LOCK'},
    {'source': 'guide-presets.md', 'output': 'presets.html', 'nav_key': 'GUIDE_NAV_PRESETS'},
    {'source': 'guide-advanced.md', 'output': 'advanced.html', 'nav_key': 'GUIDE_NAV_ADVANCED'},
    {'source': 'guide-license.md', 'output': 'license.html', 'nav_key': 'GUIDE_NAV_LICENSE'},
    {'source': 'guide-faq.md', 'output': 'faq.html', 'nav_key': 'GUIDE_NAV_FAQ'},
]

# =============================================================================
# 圖示設定（統一管理所有圖示）
# =============================================================================
# 在 Markdown 中使用 {{ICON_XXX}} 語法插入圖示
# SVG 檔案存放在 _icons/ 目錄，使用 Phosphor Icons
# 圖示名稱參考：https://phosphoricons.com

ICONS = {
    # 工具列按鈕
    'ICON_LOCK': 'lock',
    'ICON_LOCK_OPEN': 'lock-open',
    'ICON_SUN': 'sun',
    'ICON_MOON': 'moon',
    'ICON_PRESETS': 'cards-three',
    'ICON_REFERENCE': 'article',
    'ICON_MENU': 'list',
    # 拖曳圖示
    'ICON_SWAP': 'arrows-clockwise',
    'ICON_INSERT': 'text-indent',
    'ICON_PROHIBIT': 'prohibit',
    'ICON_PIN': 'push-pin',
    'ICON_GRID': 'grid-nine',
    'ICON_ADD': 'plus-square',
    'ICON_COPY': 'copy',
    # 字組面板
    'ICON_PLUS': 'plus',
    'ICON_MORE': 'dots-three-circle',
    # 功能對比表
    'ICON_CHECK': 'check',
    'ICON_X': 'x',
    # Alert 圖示
    'ICON_INFO': 'info',
    'ICON_LIGHTBULB': 'lightbulb',
    'ICON_WARNING': 'warning',
    # 核心概念
    'ICON_PEN_NIB': 'pen-nib',
    'ICON_ARTICLE': 'article',
}

# SVG 圖示快取（避免重複讀取檔案）
_icon_cache: dict[str, str] = {}

# GitHub Alert 類型對照
ALERT_TYPES = {
    'NOTE': {'class': 'note', 'icon_key': 'ICON_INFO', 'title_key': 'ALERT_NOTE'},
    'TIP': {'class': 'tip', 'icon_key': 'ICON_LIGHTBULB', 'title_key': 'ALERT_TIP'},
    'CAUTION': {'class': 'caution', 'icon_key': 'ICON_WARNING', 'title_key': 'ALERT_CAUTION'},
    'WARNING': {'class': 'warning', 'icon_key': 'ICON_WARNING', 'title_key': 'ALERT_WARNING'},
}


def get_icon_html(icon_key: str) -> str:
    """
    根據圖示 key 讀取 SVG 檔案並返回內嵌 HTML

    SVG 檔案存放在 _icons/ 目錄，使用 Phosphor Icons
    """
    icon_name = ICONS.get(icon_key, icon_key.replace('ICON_', '').lower())

    # 檢查快取
    if icon_name in _icon_cache:
        return _icon_cache[icon_name]

    # 讀取 SVG 檔案
    script_dir = Path(__file__).parent
    icons_dir = script_dir.parent / '_icons'
    svg_path = icons_dir / f'{icon_name}.svg'

    if svg_path.exists():
        svg_content = svg_path.read_text(encoding='utf-8').strip()
        # 加入 class 以便 CSS 樣式控制
        svg_html = svg_content.replace('<svg ', '<svg class="icon" ')
        _icon_cache[icon_name] = svg_html
        return svg_html
    else:
        print(f"  警告：找不到圖示檔案 {svg_path}")
        return f'<span class="icon-missing">[{icon_name}]</span>'


def get_font_link(locale: str) -> str:
    """
    根據語系生成對應的 Google Fonts 連結

    - IBM Plex Sans：使用可變字重（wght@100..700）
    - Noto Sans：根據語系載入對應字體
    """
    # IBM Plex Sans 可變字重
    base_font = 'family=IBM+Plex+Sans:wght@100..700'

    noto_font = LOCALES[locale].get('noto_font')
    if noto_font:
        fonts = f'{base_font}&family={noto_font}'
    else:
        fonts = base_font

    return f'https://fonts.googleapis.com/css2?{fonts}&display=optional'


def load_strings(strings_path: Path) -> dict:
    """載入 strings.yaml 詞彙對照表"""
    with open(strings_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def load_template(template_path: Path) -> str:
    """載入 HTML 模板"""
    return template_path.read_text(encoding='utf-8')


def load_partials(partials_dir: Path) -> dict:
    """載入片段模板（header/footer）"""
    partials = {}
    header_path = partials_dir / 'header.html'
    footer_path = partials_dir / 'footer.html'

    if header_path.exists():
        partials['header'] = header_path.read_text(encoding='utf-8')
    else:
        print(f"  警告：找不到 header 片段模板 {header_path}")
        partials['header'] = ''

    if footer_path.exists():
        partials['footer'] = footer_path.read_text(encoding='utf-8')
    else:
        print(f"  警告：找不到 footer 片段模板 {footer_path}")
        partials['footer'] = ''

    return partials


def render_header(
    partial: str,
    strings: dict,
    locale: str,
    home_link: str,
    guide_link: str,
    erikyin_path: str,
    lang_switcher: str,
    nav_guide_active: str = ''
) -> str:
    """渲染 header 片段"""
    nav_home = strings.get('NAV_HOME', {}).get(locale, 'Home')
    nav_guide = strings.get('NAV_GUIDE', {}).get(locale, 'Guide')

    # 無障礙標籤
    aria_toggle_theme = strings.get('ARIA_TOGGLE_THEME', {}).get(locale, 'Toggle theme')
    theme_toggle_light = strings.get('THEME_TOGGLE_LIGHT_TOOLTIP', {}).get(locale, 'Switch to dark mode')
    theme_toggle_dark = strings.get('THEME_TOGGLE_DARK_TOOLTIP', {}).get(locale, 'Switch to light mode')

    html = partial
    html = html.replace('{{HOME_LINK}}', home_link)
    html = html.replace('{{GUIDE_LINK}}', guide_link)
    html = html.replace('{{ERIKYIN_PATH}}', erikyin_path)
    html = html.replace('{{NAV_HOME}}', nav_home)
    html = html.replace('{{NAV_GUIDE}}', nav_guide)
    html = html.replace('{{NAV_GUIDE_ACTIVE}}', nav_guide_active)
    html = html.replace('{{LANG_SWITCHER}}', lang_switcher)
    html = html.replace('{{ARIA_TOGGLE_THEME}}', aria_toggle_theme)
    html = html.replace('{{THEME_TOGGLE_LIGHT_TOOLTIP}}', theme_toggle_light)
    html = html.replace('{{THEME_TOGGLE_DARK_TOOLTIP}}', theme_toggle_dark)
    return html


def render_footer(
    partial: str,
    strings: dict,
    locale: str,
    erikyin_path: str
) -> str:
    """渲染 footer 片段"""
    footer_name = strings.get('FOOTER_NAME', {}).get(locale, '')
    footer_contact = strings.get('FOOTER_CONTACT', {}).get(locale, 'Contact')
    footer_privacy = strings.get('FOOTER_PRIVACY', {}).get(locale, 'Privacy')
    footer_terms = strings.get('FOOTER_TERMS', {}).get(locale, 'Terms')

    html = partial
    html = html.replace('{{FOOTER_NAME}}', footer_name)
    html = html.replace('{{FOOTER_CONTACT}}', footer_contact)
    html = html.replace('{{FOOTER_PRIVACY}}', footer_privacy)
    html = html.replace('{{FOOTER_TERMS}}', footer_terms)
    html = html.replace('{{ERIKYIN_PATH}}', erikyin_path)
    return html


def replace_variables(content: str, strings: dict, locale: str) -> str:
    """
    替換內容中的變數

    支援的格式：
    - {{KEY}} - 標準替換
    - {{KEY|}} - 帶管道符的替換（用於純文字引用）
    """
    def replace_match(match):
        key = match.group(1)
        # 移除可能的管道符
        key = key.rstrip('|')

        if key in strings and locale in strings[key]:
            return strings[key][locale]
        else:
            # 如果找不到，保留原始文字並發出警告
            print(f"  警告：找不到 key '{key}' 的 {locale} 翻譯")
            return match.group(0)

    # 匹配 {{KEY}} 或 {{KEY|}} 格式
    pattern = r'\{\{([^}|]+\|?)\}\}'
    return re.sub(pattern, replace_match, content)


def convert_inline_markdown(text: str) -> str:
    """
    轉換行內 Markdown 語法為 HTML

    支援：
    - 連結 [text](url)
    - 粗體 **text**
    - 斜體 *text* 或 _text_
    - 行內程式碼 `code`
    """
    # 連結 [text](url)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    # 粗體 **text**
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    # 斜體 *text*（但不匹配 **）
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', text)
    # 斜體 _text_
    text = re.sub(r'(?<!_)_([^_]+)_(?!_)', r'<em>\1</em>', text)
    # 行內程式碼 `code`
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text


def process_github_alerts(content: str, strings: dict, locale: str) -> str:
    """
    處理 GitHub Alerts 語法

    將 > [!NOTE] 轉換為 HTML alert 區塊
    同時處理已替換的 {{ALERT_NOTE}} 等自訂提示文字
    """
    def replace_alert(match):
        alert_type = match.group(1).upper()
        alert_content = match.group(2).strip()

        if alert_type not in ALERT_TYPES:
            return match.group(0)

        config = ALERT_TYPES[alert_type]

        # 取得標題
        title_key = config['title_key']
        if title_key in strings and locale in strings[title_key]:
            title = strings[title_key][locale]
        else:
            title = alert_type.capitalize()

        # 移除 blockquote 前綴並收集內容
        alert_content = re.sub(r'^>\s*', '', alert_content, flags=re.MULTILINE).strip()

        # 處理多行內容，先轉換 Markdown 再包裝
        lines = alert_content.split('\n')
        processed_lines = []
        for line in lines:
            if line.strip():
                # 將單行 Markdown 轉換為 HTML（連結、粗體、斜體等）
                line_html = convert_inline_markdown(line.strip())
                processed_lines.append(f'<p>{line_html}</p>')

        content_html = '\n'.join(processed_lines)

        icon_html = get_icon_html(config['icon_key'])
        return f'''<div class="alert alert--{config['class']}">
  <p class="alert__title">{icon_html} {title}</p>
  {content_html}
</div>'''

    # 匹配 GitHub Alert 語法
    # > [!NOTE]
    # > 內容...
    pattern = r'>\s*\[!(\w+)\]\s*\n((?:>.*\n?)+)'
    return re.sub(pattern, replace_alert, content)


def fix_internal_links(content: str) -> str:
    """
    修正內部連結

    將 (guide-reference) 轉換為 (reference.html)
    將 (guide) 轉換為 (index.html)
    將 (guide-advanced#xxx) 轉換為 (advanced.html#xxx)
    """
    def replace_link(match):
        link_text = match.group(1)
        link_target = match.group(2)

        # 只處理 guide 開頭的內部連結
        if link_target.startswith('guide'):
            parts = link_target.split('#', 1)
            base = parts[0]
            anchor = f"#{parts[1]}" if len(parts) > 1 else ""

            if base == 'guide':
                new_base = 'index.html'
            else:
                # guide-reference -> reference.html
                suffix = base.replace('guide-', '')
                new_base = f"{suffix}.html"

            return f"[{link_text}]({new_base}{anchor})"

        return match.group(0)

    # 匹配 [text](guide...) 格式
    pattern = r'\[([^\]]+)\]\((guide[^)]*)\)'
    return re.sub(pattern, replace_link, content)


def replace_icons(content: str) -> str:
    """
    替換 {{ICON_XXX}} 語法為 Phosphor 圖示 HTML

    在 Markdown 來源檔案中使用 {{ICON_LOCK}}、{{ICON_SUN}} 等語法
    """
    for icon_key in ICONS.keys():
        placeholder = '{{' + icon_key + '}}'
        if placeholder in content:
            content = content.replace(placeholder, get_icon_html(icon_key))
    return content


def add_heading_ids(html: str) -> str:
    """為 HTML 標題添加 id 屬性"""
    def add_id(match):
        tag = match.group(1)
        content = match.group(2)
        slug = slugify_heading(content)
        return f'<h{tag} id="{slug}">{content}</h{tag}>'

    return re.sub(r'<h([2-6])>([^<]+)</h\1>', add_id, html)


def convert_markdown_to_html(content: str) -> str:
    """
    將 Markdown 轉換為 HTML
    """
    md = markdown.Markdown(
        extensions=[
            TableExtension(),
            FencedCodeExtension(),
            'md_in_html',
        ],
        output_format='html5'
    )
    html = md.convert(content)
    # 為標題添加 id 屬性
    html = add_heading_ids(html)
    return html


def extract_search_entries(html_content: str, page_config: dict, strings: dict, locale: str) -> list:
    """
    從 HTML 內容提取搜尋索引條目

    每個 h2/h3 標題作為一個獨立的搜尋條目
    """
    entries = []

    # 取得頁面標題
    nav_key = page_config['nav_key']
    page_title = strings.get(nav_key, {}).get(locale, page_config['output'])
    page_url = page_config['output']

    # 匹配標題和其後的內容
    # 使用正則表達式找出所有 h2/h3 標題
    heading_pattern = r'<h([23]) id="([^"]*)"[^>]*>([^<]+)</h\1>'
    headings = list(re.finditer(heading_pattern, html_content))

    for i, match in enumerate(headings):
        anchor = match.group(2)
        title = match.group(3).strip()

        # 提取該標題到下一個同級或更高級標題之間的內容
        start_pos = match.end()
        if i + 1 < len(headings):
            end_pos = headings[i + 1].start()
        else:
            end_pos = len(html_content)

        section_html = html_content[start_pos:end_pos]

        # 移除 HTML 標籤，只保留純文字
        content_text = re.sub(r'<[^>]+>', ' ', section_html)
        # 合併多餘空白
        content_text = re.sub(r'\s+', ' ', content_text).strip()
        # 限制內容長度（避免索引過大）
        content_text = content_text[:500]

        if title:
            entries.append({
                'title': title,
                'page': page_url,
                'pageTitle': page_title,
                'anchor': f'#{anchor}' if anchor else '',
                'content': content_text
            })

    return entries


def generate_sidebar_nav(current_page: str, strings: dict, locale: str) -> str:
    """
    生成側邊導覽 HTML
    """
    nav_items = []
    for page in GUIDE_PAGES:
        nav_key = page['nav_key']
        output = page['output']

        # 取得導覽文字
        if nav_key in strings and locale in strings[nav_key]:
            nav_text = strings[nav_key][locale]
        else:
            nav_text = nav_key

        # 判斷是否為當前頁面
        is_active = (output == current_page)
        active_class = ' class="active"' if is_active else ''

        nav_items.append(f'<a href="{output}"{active_class}>{nav_text}</a>')

    return '\n'.join(nav_items)


def generate_lang_switcher(current_locale: str, current_page: str, strings: dict) -> str:
    """
    生成語言切換器 HTML（使用自訂下拉選單）

    設計：
    - 按鈕顯示當前語言縮寫 + chevron
    - 展開選單顯示完整語言名稱

    路徑計算（指南頁面）:
    - 所有語系統一在 {locale}/guide/ 目錄下
    - 當前語系：{page}
    - 其他語系：../../{locale}/guide/{page}

    注意：current_page 已經是完整檔案名（如 index.html、reference.html）
    """
    current_short_name = LOCALES[current_locale]['short_name']

    # 取得本地化的 aria-label
    aria_label = strings.get('ARIA_SELECT_LANGUAGE', 'Select language')

    # Chevron SVG（Phosphor Icons - caret-down）
    chevron_svg = '''<svg class="lang-chevron" width="12" height="12" viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/></svg>'''

    # 生成選單項目
    items = []
    for locale, config in LOCALES.items():
        full_name = config['name']

        # 計算連結路徑（所有語系統一在 {locale}/guide/ 目錄下）
        if locale == current_locale:
            href = current_page
            aria_current = ' aria-current="page"'
        else:
            # 到其他語系
            href = f'../../{locale}/guide/{current_page}'
            aria_current = ''

        items.append(f'<li><a href="{href}"{aria_current}>{full_name}</a></li>')

    items_html = '\n        '.join(items)

    return f'''<div class="lang-menu">
      <button class="lang-trigger" type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="{aria_label}">
        <span class="lang-current">{current_short_name}</span>
        {chevron_svg}
      </button>
      <ul class="lang-dropdown" role="listbox">
        {items_html}
      </ul>
    </div>'''


def get_page_meta(source_name: str, strings: dict, locale: str, page_config: dict) -> dict:
    """
    取得頁面的標題和描述

    標題使用側邊導覽的文字 + NineBoxView Pro
    """
    # 取得導覽標題作為頁面標題
    nav_key = page_config['nav_key']
    if nav_key in strings and locale in strings[nav_key]:
        title = strings[nav_key][locale]
    elif 'NINE_BOX_VIEW' in strings and locale in strings['NINE_BOX_VIEW']:
        title = strings['NINE_BOX_VIEW'][locale]
    else:
        title = 'NineBoxView Pro'

    # 取得描述（使用對應的 GUIDE_DESC_xxx）
    if source_name == 'guide.md':
        desc_key = 'GUIDE_DESC_HOME'
    else:
        suffix = source_name.replace('guide-', '').replace('.md', '').upper()
        desc_key = f'GUIDE_DESC_{suffix}'

    if desc_key in strings and locale in strings[desc_key]:
        description = strings[desc_key][locale]
    else:
        description = ''

    return {'title': title, 'description': description}


def generate_page_html(
    html_content: str,
    template: str,
    partials: dict,
    strings: dict,
    locale: str,
    page_config: dict,
    search_index_json: str
) -> str:
    """
    生成完整的 HTML 頁面（包含內嵌搜尋索引）
    """
    # 取得頁面 meta
    meta = get_page_meta(page_config['source'], strings, locale, page_config)

    # 計算路徑（所有語系統一在 {locale}/guide/ 目錄下）
    locale_config = LOCALES[locale]
    root_path = '../../'
    home_link = '../index.html'
    guide_link = 'index.html'

    # 生成側邊導覽和語言切換器
    sidebar_nav = generate_sidebar_nav(page_config['output'], strings, locale)
    lang_switcher = generate_lang_switcher(locale, page_config['output'], strings)

    # 渲染 header 和 footer
    erikyin_path = locale_config['erikyin_path']
    rendered_header = render_header(
        partials['header'], strings, locale,
        home_link, guide_link, erikyin_path, lang_switcher,
        nav_guide_active=' active'
    )
    rendered_footer = render_footer(
        partials['footer'], strings, locale, erikyin_path
    )

    # 生成字體連結
    font_link = get_font_link(locale)

    # 填充模板
    html = template
    html = html.replace('{{LANG}}', locale)
    html = html.replace('{{PAGE_TITLE}}', meta['title'])
    html = html.replace('{{PAGE_DESCRIPTION}}', meta['description'])
    html = html.replace('{{ROOT_PATH}}', root_path)
    html = html.replace('{{FONT_LINK}}', font_link)
    html = html.replace('{{HEADER}}', rendered_header)
    html = html.replace('{{FOOTER}}', rendered_footer)
    html = html.replace('{{SIDEBAR_NAV}}', sidebar_nav)
    html = html.replace('{{CONTENT}}', html_content)
    html = html.replace('{{SEARCH_INDEX}}', search_index_json)

    # 搜尋按鈕的 placeholder 文字（從 strings.yaml 讀取）
    search_placeholder = strings.get('SEARCH_PLACEHOLDER', {}).get(locale, 'Search...')
    html = html.replace('{{SEARCH_PLACEHOLDER}}', search_placeholder)

    return html


def generate_for_locale(
    source_base: Path,
    output_base: Path,
    template: str,
    partials: dict,
    strings: dict,
    locale: str
):
    """
    為指定語言生成所有指南頁面（兩階段：先收集索引，再生成頁面）

    來源檔案優先順序：
    1. 對應語言目錄（如 _source/en/）
    2. 繁體中文目錄（_source/zh-Hant/）作為 fallback
    """
    print(f"\n生成 {locale} 版本...")

    # 決定來源目錄（優先使用對應語言，fallback 到 zh-Hant）
    locale_source_dir = source_base / locale
    fallback_source_dir = source_base / 'zh-Hant'

    # 決定輸出目錄（統一輸出到 locale/guide/ 目錄）
    output_dir = output_base / locale / 'guide'

    # === 第一階段：收集所有頁面的搜尋索引 ===
    search_entries = []
    page_contents = []  # 暫存頁面內容

    for page_config in GUIDE_PAGES:
        # 優先使用對應語言的來源檔案
        source_path = locale_source_dir / page_config['source']
        if not source_path.exists():
            # Fallback 到繁體中文
            source_path = fallback_source_dir / page_config['source']

        if not source_path.exists():
            print(f"  跳過：{page_config['source']}（檔案不存在）")
            continue

        # 處理 Markdown 內容（但先不寫入檔案）
        content = source_path.read_text(encoding='utf-8')
        content = replace_variables(content, strings, locale)
        content = process_github_alerts(content, strings, locale)
        content = fix_internal_links(content)
        content = replace_icons(content)
        html_content = convert_markdown_to_html(content)

        # 提取搜尋條目
        entries = extract_search_entries(html_content, page_config, strings, locale)
        search_entries.extend(entries)

        page_contents.append({
            'page_config': page_config,
            'html_content': html_content
        })

    # 將搜尋索引轉為 JSON 字串
    search_index_json = json.dumps(search_entries, ensure_ascii=False)

    # === 第二階段：生成所有頁面（包含內嵌索引） ===
    for item in page_contents:
        page_config = item['page_config']
        html_content = item['html_content']
        output_path = output_dir / page_config['output']

        # 生成完整 HTML
        html = generate_page_html(
            html_content=html_content,
            template=template,
            partials=partials,
            strings=strings,
            locale=locale,
            page_config=page_config,
            search_index_json=search_index_json
        )

        # 確保輸出目錄存在並寫入
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(html, encoding='utf-8')

        print(f"  ✓ {output_path.relative_to(output_base)}")

    print(f"  ✓ 搜尋索引已內嵌 ({len(search_entries)} 條目)")


def main():
    # 設定路徑（相對於 gh-pages 根目錄）
    script_dir = Path(__file__).parent
    gh_pages_root = script_dir.parent
    source_base = gh_pages_root / "_source"
    strings_path = gh_pages_root / "_source" / "strings.yaml"
    template_path = gh_pages_root / "_templates" / "guide.html"

    # 檢查檔案（至少需要 zh-Hant 作為 fallback）
    fallback_dir = source_base / "zh-Hant"
    if not fallback_dir.exists():
        print(f"錯誤：來源目錄不存在 {fallback_dir}")
        return 1

    if not strings_path.exists():
        print(f"錯誤：詞彙檔案不存在 {strings_path}")
        return 1

    if not template_path.exists():
        print(f"錯誤：模板檔案不存在 {template_path}")
        return 1

    # 載入資源
    print("載入詞彙對照表...")
    strings = load_strings(strings_path)
    print(f"  載入 {len(strings)} 個詞彙")

    print("載入 HTML 模板...")
    template = load_template(template_path)

    print("載入片段模板...")
    partials_dir = gh_pages_root / "_templates" / "_partials"
    partials = load_partials(partials_dir)
    print(f"  載入 header: {len(partials['header'])} 字元")
    print(f"  載入 footer: {len(partials['footer'])} 字元")

    # 生成各語言版本
    for locale in LOCALES.keys():
        generate_for_locale(
            source_base=source_base,
            output_base=gh_pages_root,
            template=template,
            partials=partials,
            strings=strings,
            locale=locale
        )

    print("\n完成！")
    return 0


if __name__ == "__main__":
    exit(main())
