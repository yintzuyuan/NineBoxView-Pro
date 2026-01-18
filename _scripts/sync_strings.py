#!/usr/bin/env python3
"""
sync_strings.py - 從 Localizable.strings 同步 UI 詞彙到 strings.yaml

用法：
    python sync_strings.py

說明：
    從 NineBoxViewPro 的 .lproj 目錄讀取 Localizable.strings，
    合併所有語言到單一 strings.yaml 檔案。

    注意：strings.yaml 中的「說明書專用變數」區塊會被保留，
    這些是不在 Localizable.strings 中但說明書需要的變數。
"""

# 說明書專用變數區塊標記
HANDBOOK_SECTION_MARKER = "# 說明書專用變數"

import os
import re
import yaml
from pathlib import Path
from collections import OrderedDict


# 設定路徑
SCRIPT_DIR = Path(__file__).parent
# 使用環境變數，fallback 到預設路徑
NINEBOXVIEW_DEV = Path(os.getenv('NINEBOXVIEW_DEV', os.path.expanduser('~/code/dev/NineBoxView-dev')))
STRINGS_DIR = NINEBOXVIEW_DEV / "NineBoxViewPro" / "NineBoxViewPro"
OUTPUT_FILE = SCRIPT_DIR.parent / "_source" / "strings.yaml"

# 支援的語言
LANGUAGES = ["en", "zh-Hant", "zh-Hans", "ja", "ko"]


def parse_strings_file(filepath: Path) -> dict:
    """
    解析 Objective-C .strings 檔案

    支援格式：
    - UTF-8 編碼
    - "key" = "value"; 格式
    - /* comment */ 註釋
    """
    strings = OrderedDict()
    current_comment = None

    try:
        # 嘗試 UTF-8 編碼
        content = filepath.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        # 嘗試 UTF-16 編碼（某些 Xcode 產生的檔案）
        content = filepath.read_text(encoding="utf-16")

    # 移除 BOM
    content = content.lstrip("\ufeff")

    # 解析註釋和字串
    lines = content.split("\n")
    for line in lines:
        line = line.strip()

        # 跳過空行
        if not line:
            continue

        # 解析單行註釋 /* ... */
        comment_match = re.match(r"/\*\s*(.+?)\s*\*/", line)
        if comment_match:
            current_comment = comment_match.group(1)
            continue

        # 解析字串 "key" = "value";
        string_match = re.match(r'"([^"]+)"\s*=\s*"(.*)"\s*;', line)
        if string_match:
            key = string_match.group(1)
            value = string_match.group(2)
            # 處理跳脫字元
            value = value.replace("\\n", "\n").replace('\\"', '"')
            strings[key] = {
                "value": value,
                "comment": current_comment,
            }
            current_comment = None

    return strings


def merge_languages(language_strings: dict) -> OrderedDict:
    """
    合併所有語言的字串到統一格式

    輸出格式：
    KEY:
      en: "English value"
      zh-Hant: "繁中值"
      zh-Hans: "简中值"
    """
    merged = OrderedDict()

    # 以英文版本為基準
    if "en" not in language_strings:
        raise ValueError("英文版本 (en) 是必要的")

    en_strings = language_strings["en"]

    # 收集所有 key 並保持順序
    all_keys = list(en_strings.keys())

    # 按 key 組織
    current_section = None
    for key in all_keys:
        en_data = en_strings.get(key, {})
        comment = en_data.get("comment")

        # 建立 entry
        entry = OrderedDict()
        for lang in LANGUAGES:
            lang_strings = language_strings.get(lang, {})
            if key in lang_strings:
                entry[lang] = lang_strings[key]["value"]

        # 只有至少有一個語言的值才加入
        if entry:
            merged[key] = entry

    return merged


def generate_yaml(merged_strings: OrderedDict) -> str:
    """
    生成 YAML 格式的字串檔案
    """
    # 自訂 YAML 輸出格式
    class OrderedDumper(yaml.SafeDumper):
        pass

    def dict_representer(dumper, data):
        return dumper.represent_mapping("tag:yaml.org,2002:map", data.items())

    OrderedDumper.add_representer(OrderedDict, dict_representer)

    # 生成 YAML 內容
    yaml_content = yaml.dump(
        merged_strings,
        Dumper=OrderedDumper,
        allow_unicode=True,
        default_flow_style=False,
        sort_keys=False,
        width=1000,  # 避免長字串換行
    )

    return yaml_content


def extract_handbook_section(filepath: Path) -> str:
    """
    從現有的 strings.yaml 中提取說明書專用變數區塊

    Returns:
        說明書專用變數區塊的內容（包含標記），如果不存在則返回空字串
    """
    if not filepath.exists():
        return ""

    content = filepath.read_text(encoding="utf-8")

    # 尋找說明書專用變數區塊
    marker_index = content.find(HANDBOOK_SECTION_MARKER)
    if marker_index == -1:
        return ""

    # 找到區塊開始的行首（往前找到換行符）
    line_start = content.rfind("\n", 0, marker_index)
    if line_start == -1:
        line_start = 0
    else:
        line_start += 1  # 跳過換行符

    # 返回從區塊開始到檔案結尾的內容
    return content[line_start:]


def main():
    print("開始同步 Localizable.strings → strings.yaml")
    print(f"來源目錄：{STRINGS_DIR}")
    print(f"輸出檔案：{OUTPUT_FILE}")
    print()

    # 提取現有的說明書專用變數區塊
    handbook_section = extract_handbook_section(OUTPUT_FILE)
    if handbook_section:
        print("📌 保留說明書專用變數區塊")

    # 讀取所有語言的字串
    language_strings = {}

    for lang in LANGUAGES:
        lproj_dir = STRINGS_DIR / f"{lang}.lproj"
        strings_file = lproj_dir / "Localizable.strings"

        if not strings_file.exists():
            print(f"⚠️  跳過 {lang}：檔案不存在 ({strings_file})")
            continue

        print(f"📖 讀取 {lang}...")
        strings = parse_strings_file(strings_file)
        language_strings[lang] = strings
        print(f"   找到 {len(strings)} 個字串")

    print()

    # 合併所有語言
    print("🔄 合併所有語言...")
    merged = merge_languages(language_strings)
    print(f"   共 {len(merged)} 個唯一 key")

    # 生成 YAML
    print("📝 生成 YAML...")
    yaml_content = generate_yaml(merged)

    # 加入標頭註釋
    header = """# UI 詞彙對照表
# 自動生成，請勿手動修改
# 來源：NineBoxViewPro/*.lproj/Localizable.strings
# 生成時間：{timestamp}
#
# 使用方式：
# 在來源 Markdown 中使用 {{{{KEY}}}} 語法引用詞彙
# 例如：{{{{REFERENCE_PANEL_TITLE}}}} → "參考字" (zh-Hant)

""".format(
        timestamp=__import__("datetime").datetime.now().isoformat()
    )

    # 確保輸出目錄存在
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    # 組合最終內容：自動生成的詞彙 + 說明書專用變數
    final_content = header + yaml_content
    if handbook_section:
        final_content += "\n" + handbook_section

    # 寫入檔案
    OUTPUT_FILE.write_text(final_content, encoding="utf-8")
    print(f"✅ 已寫入 {OUTPUT_FILE}")
    print()

    # 統計
    print("📊 統計：")
    for lang in LANGUAGES:
        count = sum(1 for v in merged.values() if lang in v)
        print(f"   {lang}: {count} 個詞彙")


if __name__ == "__main__":
    main()
