# 詞彙變數使用指南

## 使用原則

1. **只對 UI 元素名稱使用變數**：按鈕、選單、面板名稱、工具提示
2. **一般描述文字不使用變數**：由 AI 翻譯處理
3. **變數語法**：`{{KEY_NAME}}`

## 常用變數對照表

### 面板與視窗

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{NINE_BOX_VIEW}}` | 九宮格預覽 Pro | NineBoxView Pro |
| `{{REFERENCE_PANEL_TITLE}}` | 參考字 | Reference |
| `{{PRESETS_WINDOW_TITLE}}` | 字組 | Presets |
| `{{PALETTE_TAB_REFERENCE}}` | 參考字 | Reference |
| `{{PALETTE_TAB_LOCKED}}` | 鎖定字 | Locked |

### 按鈕與操作

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{PASTE_AND_REPLACE_BUTTON}}` | 取代貼上 | Replace |
| `{{SAVE_REFERENCE_BUTTON}}` | 儲存 | Save |

### 右鍵選單

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{CONTEXT_MENU_GLYPH_PICKER}}` | 字符選擇器… | Glyph Picker… |
| `{{CONTEXT_MENU_APPEND_TO_END}}` | 插入到尾端 | Append to End |
| `{{CONTEXT_MENU_PASTE_AND_REPLACE}}` | 取代貼上 | Replace |
| `{{CONTEXT_MENU_CLEAR_ALL}}` | 清空全部 | Clear All |
| `{{CONTEXT_MENU_SHOW_REFERENCE_INPUT}}` | 顯示參考字輸入區 | Show Reference Input |
| `{{CONTEXT_MENU_HIDE_REFERENCE_INPUT}}` | 隱藏參考字輸入區 | Hide Reference Input |
| `{{CONTEXT_MENU_SHOW_PRESETS}}` | 顯示字組面板 | Show Presets Panel |
| `{{CONTEXT_MENU_HIDE_PRESETS}}` | 隱藏字組面板 | Hide Presets Panel |
| `{{CONTEXT_MENU_SHOW_TOOLBAR}}` | 顯示工具列 | Show Toolbar |
| `{{CONTEXT_MENU_HIDE_TOOLBAR}}` | 隱藏工具列 | Hide Toolbar |
| `{{CONTEXT_MENU_LIGHT_MODE}}` | 淺色模式 | Light Mode |
| `{{CONTEXT_MENU_DARK_MODE}}` | 深色模式 | Dark Mode |
| `{{CONTEXT_MENU_SHOW_GRID_LINES}}` | 顯示格線 | Show Grid Lines |
| `{{CONTEXT_MENU_HIDE_GRID_LINES}}` | 隱藏格線 | Hide Grid Lines |

### 字組面板選單

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{PALETTE_MENU_PIN}}` | 釘選 | Pin |
| `{{PALETTE_MENU_UNPIN}}` | 取消釘選 | Unpin |
| `{{PALETTE_MENU_RENAME}}` | 重新命名… | Rename… |
| `{{PALETTE_MENU_OVERWRITE}}` | 以當前取代 | Replace with Current |
| `{{PALETTE_MENU_DELETE}}` | 刪除 | Delete |

### 匯入匯出

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{PRESETS_MENU_IMPORT}}` | 匯入⋯ | Import… |
| `{{PRESETS_MENU_EXPORT_SELECTED}}` | 匯出選取字組⋯ | Export Selected… |
| `{{PRESETS_MENU_EXPORT_ALL}}` | 匯出所有字組⋯ | Export All… |
| `{{PRESETS_IMPORT_MODE_APPEND}}` | 追加 | Append |
| `{{PRESETS_IMPORT_MODE_REPLACE}}` | 全部取代 | Replace All |

### 字組面板搜尋與排序

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{SEARCH_PRESETS_PLACEHOLDER}}` | 搜尋字組⋯ | Search presets… |
| `{{SEARCH_NO_RESULTS}}` | 找不到結果 | No results |
| `{{SORT_BUTTON_TOOLTIP}}` | 排序方式 | Sort Order |
| `{{SORT_NAME_AZ}}` | 名稱 A → Z | Name A → Z |
| `{{SORT_NAME_ZA}}` | 名稱 Z → A | Name Z → A |
| `{{SORT_DATE_NEWEST}}` | 加入日期（新→舊） | Date Added (Newest) |
| `{{SORT_DATE_OLDEST}}` | 加入日期（舊→新） | Date Added (Oldest) |

### 授權相關

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{LICENSE_INPUT_TITLE}}` | 啟用授權 | Activate License |
| `{{LICENSE_EXPIRED_PURCHASE}}` | 購買授權 | Purchase License |
| `{{LICENSE_EXPIRED_ENTER_KEY}}` | 輸入序號 | Enter License Key |
| `{{LICENSE_EXPIRED_FREE_VERSION}}` | 使用免費版 | Use Free Version |
| `{{LICENSE_WELCOME_START_TRIAL}}` | 開始 14 天試用 | Start 14-Day Trial |

### 工具提示

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{REFERENCE_PANEL_SHOW_TOOLTIP}}` | 顯示參考字面板 | Show Reference Panel |
| `{{REFERENCE_PANEL_HIDE_TOOLTIP}}` | 隱藏參考字面板 | Hide Reference Panel |
| `{{PRESETS_TOGGLE_SHOW_TOOLTIP}}` | 顯示字組面板 | Show Presets Panel |
| `{{PRESETS_TOGGLE_HIDE_TOOLTIP}}` | 隱藏字組面板 | Hide Presets Panel |
| `{{LOCK_TOGGLE_ENABLED_TOOLTIP}}` | 鎖定字符已顯示（按住 Cmd 編輯） | Locked glyphs shown (Cmd to edit) |
| `{{LOCK_TOGGLE_DISABLED_TOOLTIP}}` | 鎖定字符已隱藏（按住 Cmd 編輯） | Locked glyphs hidden (Cmd to edit) |

### 資訊選單

| 變數 | 繁中 | 英文 |
|-----|------|------|
| `{{INFO_MENU_HELP}}` | 使用說明 | User Guide |
| `{{INFO_MENU_WEBSITE}}` | 官方網站 | Website |
| `{{INFO_MENU_FEEDBACK}}` | 意見回饋… | Feedback… |
| `{{INFO_MENU_CONTACT_US}}` | 聯絡我們… | Contact Us… |
| `{{INFO_MENU_PURCHASE}}` | 購買… | Purchase… |
| `{{INFO_MENU_ENTER_LICENSE}}` | 輸入授權碼… | Enter License… |

## 不使用變數的內容

以下內容由 AI 翻譯處理，不使用變數：

- 功能說明段落
- 操作步驟描述
- 設計理念說明
- 適用場景描述
- FAQ 問答內容
- 技術規格說明（如 UserDefaults key、userData key）
