#!/usr/bin/env python3
"""
首頁 header/footer 更新腳本

讀取現有首頁 HTML，更新 header/footer 區塊為統一內容。
首頁主體內容保持不變（手動維護）。
"""

import re
import yaml
from pathlib import Path


# 語言配置（與 generate_guide.py 保持一致）
LOCALES = {
    'zh-Hant': {
        'name': '繁體中文',
        'short_name': '繁',
        'path': '',  # 根目錄
        'erikyin_path': '/',
    },
    'en': {
        'name': 'English',
        'short_name': 'EN',
        'path': 'en/',
        'erikyin_path': '/en/',
    },
    'zh-Hans': {
        'name': '简体中文',
        'short_name': '简',
        'path': 'zh-Hans/',
        'erikyin_path': '/',
    },
    'ja': {
        'name': '日本語',
        'short_name': '日',
        'path': 'ja/',
        'erikyin_path': '/en/',
    },
    'ko': {
        'name': '한국어',
        'short_name': '한',
        'path': 'ko/',
        'erikyin_path': '/en/',
    },
}


def load_strings(strings_path: Path) -> dict:
    """載入 strings.yaml 詞彙對照表"""
    with open(strings_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def load_partial(partial_path: Path) -> str:
    """載入片段模板"""
    if partial_path.exists():
        return partial_path.read_text(encoding='utf-8')
    else:
        print(f"  警告：找不到片段模板 {partial_path}")
        return ''


def generate_lang_switcher(current_locale: str) -> str:
    """
    生成首頁的語言切換器 HTML

    首頁路徑計算（使用明確檔案名稱，支援 file:// 協議）：
    - 繁中首頁在根目錄，其他語系在 {locale}/ 子目錄
    - 從繁中到其他語系：{locale}/index.html
    - 從其他語系到繁中：../index.html
    - 從其他語系到其他語系：../{locale}/index.html
    """
    links = []

    for locale, config in LOCALES.items():
        short_name = config['short_name']
        full_name = config['name']

        # 計算從當前語系到目標語系的相對路徑
        if locale == current_locale:
            # 當前語系：使用 span（無障礙性：非連結元素不應使用 a 標籤）
            links.append(f'<span class="active" title="{full_name}">{short_name}</span>')
        elif current_locale == 'zh-Hant':
            # 從繁中到其他語系
            href = f'{locale}/index.html'
            links.append(f'<a href="{href}" title="{full_name}">{short_name}</a>')
        elif locale == 'zh-Hant':
            # 從其他語系到繁中
            href = '../index.html'
            links.append(f'<a href="{href}" title="{full_name}">{short_name}</a>')
        else:
            # 從其他語系到其他語系
            href = f'../{locale}/index.html'
            links.append(f'<a href="{href}" title="{full_name}">{short_name}</a>')

    return '\n        '.join(links)


def render_header(
    partial: str,
    strings: dict,
    locale: str,
    erikyin_path: str,
    lang_switcher: str
) -> str:
    """渲染首頁 header 片段"""
    nav_home = strings.get('NAV_HOME', {}).get(locale, 'Home')
    nav_guide = strings.get('NAV_GUIDE', {}).get(locale, 'Guide')

    # 首頁的連結路徑（使用明確檔案名稱，支援 file:// 協議）
    # 首頁連結：當前頁面
    home_link = 'index.html'
    # 指南連結：guide/index.html
    guide_link = 'guide/index.html'

    html = partial
    html = html.replace('{{HOME_LINK}}', home_link)
    html = html.replace('{{GUIDE_LINK}}', guide_link)
    html = html.replace('{{ERIKYIN_PATH}}', erikyin_path)
    html = html.replace('{{NAV_HOME}}', nav_home)
    html = html.replace('{{NAV_GUIDE}}', nav_guide)
    html = html.replace('{{LANG_SWITCHER}}', lang_switcher)
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


def update_landing_page(
    html_path: Path,
    header_partial: str,
    footer_partial: str,
    strings: dict,
    locale: str
) -> bool:
    """
    更新單一首頁的 header/footer

    Returns:
        True 如果更新成功，False 如果失敗
    """
    if not html_path.exists():
        print(f"  跳過：{html_path}（檔案不存在）")
        return False

    # 讀取現有 HTML
    html = html_path.read_text(encoding='utf-8')

    locale_config = LOCALES[locale]
    erikyin_path = locale_config['erikyin_path']

    # 生成語言切換器
    lang_switcher = generate_lang_switcher(locale)

    # 渲染新的 header 和 footer
    new_header = render_header(
        header_partial,
        strings,
        locale,
        erikyin_path,
        lang_switcher
    )
    new_footer = render_footer(
        footer_partial,
        strings,
        locale,
        erikyin_path
    )

    # 替換 <nav>...</nav> 區塊
    # 使用正則匹配從 <!-- Navigation --> 註釋開始的 nav 區塊
    nav_pattern = r'<!-- Navigation -->\s*<nav class="nav">.*?</nav>'
    if re.search(nav_pattern, html, re.DOTALL):
        html = re.sub(nav_pattern, new_header.strip(), html, flags=re.DOTALL)
    else:
        # 嘗試只匹配 <nav>...</nav>
        nav_pattern_simple = r'<nav class="nav">.*?</nav>'
        if re.search(nav_pattern_simple, html, re.DOTALL):
            html = re.sub(nav_pattern_simple, new_header.strip(), html, flags=re.DOTALL)
        else:
            print(f"  警告：找不到 nav 區塊")

    # 替換 <footer>...</footer> 區塊
    footer_pattern = r'<!-- Footer -->\s*<footer class="footer">.*?</footer>'
    if re.search(footer_pattern, html, re.DOTALL):
        html = re.sub(footer_pattern, new_footer.strip(), html, flags=re.DOTALL)
    else:
        # 嘗試只匹配 <footer>...</footer>
        footer_pattern_simple = r'<footer class="footer">.*?</footer>'
        if re.search(footer_pattern_simple, html, re.DOTALL):
            html = re.sub(footer_pattern_simple, new_footer.strip(), html, flags=re.DOTALL)
        else:
            print(f"  警告：找不到 footer 區塊")

    # 寫回檔案
    html_path.write_text(html, encoding='utf-8')
    return True


def main():
    # 設定路徑
    script_dir = Path(__file__).parent
    gh_pages_root = script_dir.parent
    strings_path = gh_pages_root / "_source" / "strings.yaml"
    partials_dir = gh_pages_root / "_templates" / "_partials"

    # 檢查檔案
    if not strings_path.exists():
        print(f"錯誤：詞彙檔案不存在 {strings_path}")
        return 1

    # 載入資源
    print("載入詞彙對照表...")
    strings = load_strings(strings_path)
    print(f"  載入 {len(strings)} 個詞彙")

    print("載入片段模板...")
    header_partial = load_partial(partials_dir / 'header.html')
    footer_partial = load_partial(partials_dir / 'footer.html')
    print(f"  載入 header: {len(header_partial)} 字元")
    print(f"  載入 footer: {len(footer_partial)} 字元")

    # 更新各語言首頁
    print("\n更新首頁 header/footer...")
    for locale, config in LOCALES.items():
        if locale == 'zh-Hant':
            html_path = gh_pages_root / 'index.html'
        else:
            html_path = gh_pages_root / locale / 'index.html'

        if update_landing_page(
            html_path,
            header_partial,
            footer_partial,
            strings,
            locale
        ):
            print(f"  ✓ {html_path.relative_to(gh_pages_root)}")

    print("\n完成！")
    return 0


if __name__ == "__main__":
    exit(main())
