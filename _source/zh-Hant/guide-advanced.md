# 進階功能

本章節介紹 {{NINE_BOX_VIEW}} 的進階功能，包括 {{LIGHT_TABLE}} 整合、快捷鍵總覽與輔助鍵監控。

## 目錄

- [{{LIGHT_TABLE}} 整合](#light-table-整合)
- [快捷鍵總覽](#快捷鍵總覽)
- [輔助鍵監控](#輔助鍵監控)
- [格線顯示](#格線顯示)
- [拖曳進階操作](#拖曳進階操作)
- [特殊圖層支援](#特殊圖層支援)

## {{LIGHT_TABLE}} 整合

{{NINE_BOX_VIEW}} 支援與第三方外掛 **[{{LIGHT_TABLE}}](https://formkunft.com/light-table/)** 整合，讓您在九宮格中比較不同版本的字符設計。

### 什麼是 {{LIGHT_TABLE}}？

{{LIGHT_TABLE}} 是一個獨立的 Glyphs 外掛，提供字型版本比較功能。當 {{LIGHT_TABLE}} 安裝且其工具啟用時，您可以在九宮格中查看比較版本的字符。

### 啟用條件

要在九宮格中顯示比較版本，需滿足以下條件：

1. **安裝 {{LIGHT_TABLE}}**：從 {{GLYPHS_PLUGIN_MANAGER}} 安裝 {{LIGHT_TABLE}} 外掛
2. **啟用 {{LIGHT_TABLE}} 工具**：在 Glyphs 工具列中選擇 {{LIGHT_TABLE}} 的比較工具
3. **選擇比較版本**：在 {{LIGHT_TABLE}} 面板中選擇要比較的版本
4. **按住 Shift 鍵**：按住 Shift 鍵觸發比較模式

### 使用方式

1. 確保 {{LIGHT_TABLE}} 已安裝並啟用
2. 在 {{LIGHT_TABLE}} 面板中選擇比較版本
3. 按住 **Shift** 鍵
4. 九宮格中的字符會切換為比較版本

![Light Table 比較效果](../assets/images/feature-lighttable.gif)

> [!NOTE]
> **Shift 鍵行為**：若 {{LIGHT_TABLE}} 未安裝或工具未啟用，按住 Shift 會進入 Solo 模式，暫時隱藏參考字和鎖定字。

## 快捷鍵總覽

### 九宮格內操作

| 快捷鍵 | 操作 | 說明 |
|-------|------|------|
| 點擊 | 亂數排列 | 重新隨機排列參考字 |
| Cmd + 點擊 | 鎖定/解鎖 | 切換該位置的鎖定狀態 |
| Cmd + 點擊中央格 | 清除所有鎖定 | 一次清除所有位置的鎖定 |
| Cmd + Option + 點擊 | 字符選擇器 | 開啟字符選擇器設定鎖定字 |
| Cmd + Option + 點擊中央格 | 儲存鎖定字組 | 將當前鎖定配置儲存為{{PRESETS_WINDOW_TITLE|}} |

### 拖曳操作

| 快捷鍵 | 拖曳效果 |
|-------|---------|
| 無 | 交換位置（九宮格內）/ 插入（編輯視圖） |
| Cmd | 鎖定字操作（移動或鎖定） |
| Option | 九宮格內：複製參考字；到編輯視圖：在新分頁開啟該字符 |
| Shift | 在新分頁開啟九宮格 |
| Cmd + Option | 複製鎖定字（來源保留） |

### 工具列操作

工具列按鈕可透過點擊觸發，部分按鈕在滑鼠懸停時會顯示工具提示：

| 按鈕 | 工具提示 |
|-----|---------|
| {{ICON_LOCK}}（已開啟） | {{LOCKED_PANEL_TOGGLE_HIDE|}} |
| {{ICON_LOCK}}（已關閉） | {{LOCKED_PANEL_TOGGLE_SHOW|}} |
| {{ICON_SUN}} | {{THEME_TOGGLE_LIGHT_TOOLTIP|}} |
| {{ICON_MOON}} | {{THEME_TOGGLE_DARK_TOOLTIP|}} |
| {{ICON_PRESETS}}（已開啟） | {{PRESETS_TOGGLE_HIDE_TOOLTIP|}} |
| {{ICON_PRESETS}}（已關閉） | {{PRESETS_TOGGLE_SHOW_TOOLTIP|}} |
| {{ICON_REFERENCE}}（已開啟） | {{REFERENCE_PANEL_HIDE_TOOLTIP|}} |
| {{ICON_REFERENCE}}（已關閉） | {{REFERENCE_PANEL_SHOW_TOOLTIP|}} |

## 輔助鍵監控

{{NINE_BOX_VIEW}} 會即時監控鍵盤輔助鍵的狀態，並提供相應的視覺回饋。

### 監控的輔助鍵

| 輔助鍵 | 功能 |
|-------|------|
| Shift | Solo 模式（暫時隱藏參考字和鎖定字）；若 {{LIGHT_TABLE}} 工具啟用則觸發比較模式 |
| Option | 拖曳時複製（與 macOS 標準行為一致） |
| Command | 進入鎖定字編輯模式 |

> [!TIP]
> **Option 鍵**：拖曳時按住 Option 鍵可複製而非移動，與 macOS 標準行為一致。

### Solo 模式

按住 Shift 鍵時，九宮格會暫時隱藏所有參考字和鎖定字，只顯示當前編輯的字符。這個功能方便快速對比周圍格疊加效果與當前字符本身的差異。

- **啟用條件**：滑鼠在九宮格視窗內、{{LIGHT_TABLE}} 工具未啟用
- **恢復方式**：放開 Shift 鍵，或滑鼠移出視窗

> [!TIP]
> 如果您安裝了 {{LIGHT_TABLE}} 並啟用其比較工具，Shift 鍵會優先觸發版本比較功能。

### Cmd 模式視覺提示

按住 Cmd 鍵時，工具列的鎖定按鈕會顯示視覺提示，表示您處於鎖定字編輯模式。

## 格線顯示

格線功能可在九宮格中顯示輔助線，幫助檢查字符的對齊和比例。

### 開啟方式

1. 在九宮格內容區按右鍵
2. 選擇「{{CONTEXT_MENU_SHOW_GRID_LINES|}}」

### 格線內容

格線會顯示以下參考線：

- **{{GRID_EM_BOX}}**：字符的邊界框
- **{{GRID_CENTER_LINE}}**：水平和垂直中心線

### 關閉方式

1. 在九宮格內容區按右鍵
2. 選擇「{{CONTEXT_MENU_HIDE_GRID_LINES|}}」

> [!NOTE]
> 格線設定會自動儲存，重啟後保持。

## 拖曳進階操作

### 動態圖示系統

拖曳過程中，系統會根據拖曳位置和輔助鍵狀態動態更新拖曳圖示：

| 情境 | 圖示 |
|-----|------|
| 九宮格內交換 | {{ICON_SWAP}} |
| 拖到編輯視圖 | {{ICON_INSERT}} |
| 禁止操作 | {{ICON_PROHIBIT}} |
| Shift 模式 | {{ICON_GRID}} |
| Cmd 模式 | {{ICON_PIN}} 或 {{ICON_ADD}} |
| Option 模式 | {{ICON_COPY}} |

### 多區域偵測

拖曳時系統會偵測三種區域：

1. **九宮格內**：根據目標位置決定操作
2. **Glyphs 編輯視圖**：允許插入字符
3. **其他區域**：顯示禁止圖示

### Shift + 拖曳開啟新分頁

按住 Shift 鍵拖曳時，會將整個九宮格的內容在新分頁中開啟：

1. 按住 **Shift** 鍵
2. 從九宮格內任意位置開始拖曳
3. 拖曳到 Glyphs 視窗區域
4. 放開後，九宮格的文字會在新分頁中開啟

這個功能方便快速在文字編輯視圖中預覽九宮格的排列效果。

## 特殊圖層支援

當您在 Glyphs 中編輯非主板圖層時，九宮格的周圍格會自動同步顯示對應的圖層版本，讓您即時預覽特殊圖層與周圍字符的搭配效果。

> [!TIP]
> 如果您希望周圍格保持在主板圖層而非跟隨特殊圖層，可以使用「鎖定字」或「參考字」功能。鎖定字與參考字會維持在主板圖層。

## 資料持久化

### 儲存位置

{{NINE_BOX_VIEW}} 的資料儲存在兩個位置：

**字型檔案內（隨檔案保存）**：

- 參考字輸入內容
- 鎖定字配置

**應用程式設定（全域）**：

- 視窗大小和位置（主視窗、{{REFERENCE_PANEL_TITLE|}}、{{PRESETS_WINDOW_TITLE|}}）
- {{REFERENCE_PANEL_TITLE|}}可見性
- {{PRESETS_WINDOW_TITLE|}}可見性
- 工具列可見性
- 鎖定字顯示狀態
- 主題模式
- 模糊程度
- 格線顯示狀態
- 字組資料
- 字組排序方式
- 字組分頁選擇

### 資料格式

字型檔案內的資料儲存在 `GSFont.userData` 中：

| Key | 內容 |
|-----|------|
| `com.YinTzuYuan.NineBoxViewPro.ReferenceInput` | 參考字輸入文字 |
| `com.YinTzuYuan.NineBoxViewPro.LockedGlyphs` | 鎖定字配置（位置 → 字符） |

### 跨檔案共享

- 參考字和鎖定字資料綁定在字型檔案中，不會跨檔案共享
- {{PRESETS_WINDOW_TITLE|}}儲存在應用程式設定中，可跨檔案使用
- 使用匯入匯出功能可在不同電腦間共享{{PRESETS_WINDOW_TITLE|}}

## 相關功能

- [{{REFERENCE_PANEL_TITLE|}}功能](guide-reference)
- [{{PALETTE_TAB_LOCKED|}}功能](guide-lock)
- [{{PRESETS_WINDOW_TITLE|}}功能](guide-presets)
- [返回主頁](guide)
