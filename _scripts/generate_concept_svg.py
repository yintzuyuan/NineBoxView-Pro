#!/usr/bin/env python3
"""
概念圖 SVG 生成腳本

從模板動態生成多語言、明暗模式的三層預覽系統概念圖。
- 支援 5 個語系（zh-Hant, en, zh-Hans, ja, ko）
- 支援明暗兩種主題
- 移除標籤文字，只保留圖示標記
- 各語系使用本地化字符，英文使用繁中文字池
"""

import json
from pathlib import Path


# =============================================================================
# 文字池載入（從 JSON 讀取，避免重複定義）
# =============================================================================

def load_text_pools() -> dict:
    """
    從 text-pools.json 載入文字池配置

    Returns:
        文字池字典，包含各語系的 reference、locked、center
    """
    json_path = Path(__file__).parent.parent / 'assets' / 'data' / 'text-pools.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)


# 載入文字池（模組層級快取）
TEXT_POOLS = load_text_pools()


# =============================================================================
# 主題配色配置
# =============================================================================
# 基於 NineBoxView Pro 官網設計系統
# 淺色：背景 #f8f6f0, 文字 #4a4a4a, 次要 #6a6a6a
# 深色：背景 #1a1a1a, 文字 #e8e6e0, 次要 #b0b0b0

THEMES = {
    'light': {
        # 格子：由深到淺（編輯層最深，鎖定層最淺）- 整體偏淺
        'cell_edit': ('rgba(223, 218, 210, 0.88)', '#b8b2a6'),
        'cell_reference': ('rgba(235, 232, 226, 0.90)', '#ccc8be'),
        'cell_locked': ('rgba(245, 243, 239, 0.92)', '#dedad2'),
        # 文字：由深到淺（與格子對比）
        'glyph_edit': '#4a4640',
        'glyph_reference': '#7a756c',
        'glyph_locked': '#a8a298',
        # 標籤
        'icon': '#6a6a6a',
        'line': '#6a6a6a',
        # 陰影透明度
        'shadow_sm': '0.1',
        'shadow_md': '0.15',
        'shadow_lg': '0.2',
    },
    'dark': {
        # 格子：由暗到亮（編輯層最暗，鎖定層最亮）- 符合視覺層疊邏輯
        'cell_edit': ('rgba(45, 43, 40, 0.92)', '#3a3836'),
        'cell_reference': ('rgba(55, 52, 48, 0.88)', '#4a4642'),
        'cell_locked': ('rgba(65, 62, 56, 0.85)', '#5a5650'),
        # 文字：由暗到亮（與格子對比）
        'glyph_edit': '#7a7468',
        'glyph_reference': '#9a9488',
        'glyph_locked': '#c8c0b4',
        # 標籤
        'icon': '#b0b0b0',
        'line': '#b0b0b0',
        # 陰影透明度
        'shadow_sm': '0.4',
        'shadow_md': '0.5',
        'shadow_lg': '0.6',
    }
}


# =============================================================================
# Phosphor Icons SVG Path（用於標籤圖示）
# =============================================================================

ICON_PATHS = {
    # pen-nib（編輯層）
    'edit': 'M240,100.68a15.86,15.86,0,0,0-4.69-11.31L166.63,20.68a16,16,0,0,0-22.63,0L115.57,49.11l-58,21.77A16.06,16.06,0,0,0,47.35,83.23L24.11,222.68A8,8,0,0,0,32,232a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L235.31,112A15.87,15.87,0,0,0,240,100.68Zm-69.87,92.19L55.32,212l47.37-47.37a28,28,0,1,0-11.32-11.32L44,200.7,63.13,85.86,118,65.29,190.7,138ZM104,140a12,12,0,1,1,12,12A12,12,0,0,1,104,140Zm96-15.32L131.31,56l24-24L224,100.68Z',
    # article（參考層）
    'reference': 'M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z',
    # lock（鎖定層）
    'locked': 'M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z',
}


def get_text_pool(locale: str) -> dict:
    """取得指定語系的文字池，英文使用繁中"""
    # 英文版使用繁體中文字池
    if locale == 'en':
        locale = 'zh-Hant'
    return TEXT_POOLS.get(locale, TEXT_POOLS['zh-Hant'])


def generate_svg(locale: str, theme: str) -> str:
    """
    生成指定語系和主題的概念圖 SVG

    Args:
        locale: 語系代碼（zh-Hant, en, zh-Hans, ja, ko）
        theme: 主題（light, dark）

    Returns:
        完整的 SVG 字串
    """
    text_pool = get_text_pool(locale)
    colors = THEMES[theme]

    # 九宮格位置座標（等角投影變換後）
    # 3x3 網格，每格 52x52，間距 2
    positions = [
        (0, 0), (54, 0), (108, 0),      # 第一列
        (0, 54), (54, 54), (108, 54),   # 第二列
        (0, 108), (54, 108), (108, 108) # 第三列
    ]

    # 文字中心偏移（相對於格子左上角）
    text_offset = (26, 26)

    # 生成編輯層（底層）- 9 格都顯示中央編輯字
    edit_cells = []
    edit_texts = []
    for i, (x, y) in enumerate(positions):
        edit_cells.append(
            f'<rect class="cell cell-edit" x="{x}" y="{y}" width="52" height="52" rx="2"/>'
        )
        edit_texts.append(
            f'<text class="glyph glyph-edit" x="{x + text_offset[0]}" y="{y + text_offset[1]}">'
            f'{text_pool["center"]}</text>'
        )

    # 生成參考層（中層）- 除了中央格外的 8 格顯示參考字
    reference_positions = [0, 1, 2, 3, 5, 6, 7, 8]  # 排除位置 4（中央）
    reference_cells = []
    reference_texts = []
    for i, pos_idx in enumerate(reference_positions):
        x, y = positions[pos_idx]
        reference_cells.append(
            f'<rect class="cell cell-reference" x="{x}" y="{y}" width="52" height="52" rx="2"/>'
        )
        char = text_pool['reference'][i] if i < len(text_pool['reference']) else ''
        reference_texts.append(
            f'<text class="glyph glyph-reference" x="{x + text_offset[0]}" y="{y + text_offset[1]}">'
            f'{char}</text>'
        )

    # 生成鎖定層（頂層）- 8 個周圍格背景，十字排列 4 個鎖定字
    locked_cell_positions = [0, 1, 2, 3, 5, 6, 7, 8]  # 排除位置 4（中央）
    locked_text_positions = [1, 3, 5, 7]  # 十字排列：上、左、右、下
    locked_cells = []
    locked_texts = []
    # 先生成所有 8 個周圍格的背景
    for pos_idx in locked_cell_positions:
        x, y = positions[pos_idx]
        locked_cells.append(
            f'<rect class="cell cell-locked" x="{x}" y="{y}" width="52" height="52" rx="2"/>'
        )
    # 只在指定位置生成鎖定字文字
    for i, pos_idx in enumerate(locked_text_positions):
        x, y = positions[pos_idx]
        char = text_pool['locked'][i] if i < len(text_pool['locked']) else ''
        locked_texts.append(
            f'<text class="glyph glyph-locked" x="{x + text_offset[0]}" y="{y + text_offset[1]}">'
            f'{char}</text>'
        )

    # 組合 SVG
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-35 -80 485 330"
     role="img" aria-label="NineBoxView Pro 三層九宮格概念圖" class="concept-layers-svg">
  <title>NineBoxView Pro 等角投影概念圖</title>
  <desc>三層堆疊九宮格：編輯字、參考字、鎖定字</desc>

  <defs>
    <filter id="shadow-sm" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="{colors['shadow_sm']}"/>
    </filter>
    <filter id="shadow-md" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="{colors['shadow_md']}"/>
    </filter>
    <filter id="shadow-lg" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000" flood-opacity="{colors['shadow_lg']}"/>
    </filter>
  </defs>

  <style>
    .cell {{ stroke-width: 1.5; }}
    .cell-edit {{ fill: {colors['cell_edit'][0]}; stroke: {colors['cell_edit'][1]}; }}
    .cell-reference {{ fill: {colors['cell_reference'][0]}; stroke: {colors['cell_reference'][1]}; }}
    .cell-locked {{ fill: {colors['cell_locked'][0]}; stroke: {colors['cell_locked'][1]}; }}
    .glyph {{ font-size: 34px; text-anchor: middle; dominant-baseline: central; font-family: "Noto Serif TC", "Songti TC", Georgia, serif; }}
    .glyph-edit {{ fill: {colors['glyph_edit']}; }}
    .glyph-reference {{ fill: {colors['glyph_reference']}; }}
    .glyph-locked {{ fill: {colors['glyph_locked']}; }}
    .layer-line {{ stroke: {colors['line']}; stroke-width: 0.5; stroke-dasharray: 2, 3; opacity: 0.5; }}
    .layer-icon {{ fill: {colors['icon']}; }}
  </style>

  <g id="concept-diagram" transform="translate(225, 75)">
    <!-- 第一層：編輯層（底部） -->
    <g transform="translate(0, 0)" filter="url(#shadow-sm)">
      <g class="layer" transform="matrix(1, 0.5, -1, 0.5, 0, 0)">
        {chr(10).join('        ' + cell for cell in edit_cells)}
        {chr(10).join('        ' + text for text in edit_texts)}
      </g>
    </g>

    <!-- 第二層：參考層（中間） -->
    <g transform="translate(0, -65)" filter="url(#shadow-md)">
      <g class="layer" transform="matrix(1, 0.5, -1, 0.5, 0, 0)">
        {chr(10).join('        ' + cell for cell in reference_cells)}
        {chr(10).join('        ' + text for text in reference_texts)}
      </g>
    </g>

    <!-- 第三層：鎖定層（頂部） -->
    <g transform="translate(0, -130)" filter="url(#shadow-lg)">
      <g class="layer" transform="matrix(1, 0.5, -1, 0.5, 0, 0)">
        {chr(10).join('        ' + cell for cell in locked_cells)}
        {chr(10).join('        ' + text for text in locked_texts)}
      </g>
    </g>

    <!-- 層級標籤（只有圖示，無文字） -->
    <g class="labels">
      <!-- 編輯層標籤 -->
      <line class="layer-line" x1="-215" y1="65" x2="-105" y2="65"/>
      <svg class="layer-icon" x="-232" y="57" width="16" height="16" viewBox="0 0 256 256">
        <path d="{ICON_PATHS['edit']}"/>
      </svg>

      <!-- 參考層標籤 -->
      <line class="layer-line" x1="-215" y1="0" x2="-105" y2="0"/>
      <svg class="layer-icon" x="-232" y="-8" width="16" height="16" viewBox="0 0 256 256">
        <path d="{ICON_PATHS['reference']}"/>
      </svg>

      <!-- 鎖定層標籤 -->
      <line class="layer-line" x1="-215" y1="-65" x2="-105" y2="-65"/>
      <svg class="layer-icon" x="-232" y="-73" width="16" height="16" viewBox="0 0 256 256">
        <path d="{ICON_PATHS['locked']}"/>
      </svg>
    </g>
  </g>
</svg>
'''
    return svg


def generate_all_svgs(output_dir: Path | None = None) -> None:
    """
    生成所有語系和主題的 SVG 檔案

    Args:
        output_dir: 輸出目錄，預設為 assets/images/
    """
    if output_dir is None:
        script_dir = Path(__file__).parent
        output_dir = script_dir.parent / 'assets' / 'images'

    output_dir.mkdir(parents=True, exist_ok=True)

    locales = ['zh-Hant', 'en', 'zh-Hans', 'ja', 'ko']
    themes = ['light', 'dark']

    print("生成概念圖 SVG...")

    for locale in locales:
        for theme in themes:
            svg_content = generate_svg(locale, theme)
            filename = f'concept-layers-{locale}-{theme}.svg'
            output_path = output_dir / filename
            output_path.write_text(svg_content, encoding='utf-8')
            print(f"  ✓ {filename}")

    print(f"  共生成 {len(locales) * len(themes)} 個 SVG 檔案")


def main():
    """主程式入口"""
    generate_all_svgs()
    return 0


if __name__ == "__main__":
    exit(main())
