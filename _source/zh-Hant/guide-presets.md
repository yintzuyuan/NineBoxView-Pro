# {{GUIDE_NAV_PRESETS}}

{{GUIDE_NAV_PRESETS}}功能讓您儲存常用的參考字組合或鎖定字配置，快速切換不同測試情境。

## 目錄

- [開啟{{PRESETS_WINDOW_TITLE|}}](#開啟字組面板)
- [分頁說明](#分頁說明)
- [搜尋與排序](#搜尋與排序)
- [建立字組](#建立字組)
- [管理字組](#管理字組)
- [釘選功能](#釘選功能)
- [匯入匯出](#匯入匯出)

## 開啟{{PRESETS_WINDOW_TITLE|}}

有兩種方式開啟{{PRESETS_WINDOW_TITLE|}}：

1. **工具列按鈕**：點擊工具列的 **{{ICON_PRESETS}}** 按鈕
2. **右鍵選單**：在九宮格內按右鍵，選擇「{{CONTEXT_MENU_SHOW_PRESETS|}}」

## 分頁說明

{{PRESETS_WINDOW_TITLE|}}包含兩個分頁：

| 分頁 | 儲存內容 |
|-----|---------|
| {{PALETTE_TAB_REFERENCE|}} | 參考字的字符組合 |
| {{PALETTE_TAB_LOCKED|}} | 鎖定字的位置配置 |

每個字組包含名稱、內容和釘選狀態。

## 搜尋與排序

### 搜尋功能

在分頁控制項下方有搜尋欄位，可快速篩選字組：

1. 在搜尋框輸入關鍵字
2. 字組列表會即時過濾
3. 搜尋不區分大小寫
4. 清空搜尋框可恢復完整列表

> [!TIP]
> 當搜尋無結果時，會顯示「{{SEARCH_NO_RESULTS|}}」提示。

### 排序功能

點擊面板底部的排序按鈕，可選擇排序方式：

| 排序選項 | 說明 |
|---------|------|
| {{SORT_NAME_AZ|}} | 依名稱字母順序排列 |
| {{SORT_NAME_ZA|}} | 依名稱反向字母順序排列 |
| {{SORT_DATE_NEWEST|}} | 最新加入的字組在前 |
| {{SORT_DATE_OLDEST|}} | 最早加入的字組在前 |

> [!NOTE]
> 排序狀態會自動儲存，重啟後保持。

## 建立字組

設定好參考字或鎖定字後，可透過以下方式儲存為字組：

| 入口 | {{PALETTE_TAB_REFERENCE|}} | {{PALETTE_TAB_LOCKED|}} |
|-----|--------|--------|
| 專屬面板 | 點擊「{{SAVE_REFERENCE_BUTTON|}}」按鈕 | 點擊「{{SAVE_LOCKED_BUTTON|}}」按鈕 |
| {{PRESETS_WINDOW_TITLE|}} | 切換到對應分頁，點擊 {{ICON_PLUS}} | 切換到對應分頁，點擊 {{ICON_PLUS}} |
| 快捷操作 | — | ⌘ + ⇧ + 點擊中央格 |

> [!TIP]
> 新建立的字組會以內容自動命名，可稍後重新命名。

## 管理字組

| 操作 | 快捷鍵 | 右鍵選單 |
|-----|--------|---------|
| 載入 | 雙擊字組 | — |
| 重新命名 | 選取後按 Enter | {{PALETTE_MENU_RENAME|}} |
| 覆寫 | — | {{PALETTE_MENU_OVERWRITE|}} |
| 刪除 | 選取後按 Delete | {{PALETTE_MENU_DELETE|}} |

> [!TIP]
> 多選字組：⌘ + 點擊（切換選取）或 ⇧ + 點擊（範圍選取）。

> [!CAUTION]
> 覆寫操作無法復原，請確認後再執行。

## 釘選功能

釘選的字組會固定顯示在清單頂部。

| 操作 | 右鍵選單 |
|-----|---------|
| 釘選 | {{PALETTE_MENU_PIN|}} |
| 批次釘選 | {{PALETTE_MENU_PIN_MULTIPLE|}} |
| 取消釘選 | {{PALETTE_MENU_UNPIN|}} |

已釘選字組永遠顯示在最上方，未釘選字組依照排序設定排列。

## 匯入匯出

點擊面板底部的 **{{ICON_MORE}}** 按鈕進行匯入匯出：

| 操作 | 選單項目 |
|-----|---------|
| 匯出選取 | {{PRESETS_MENU_EXPORT_SELECTED|}} |
| 匯出全部 | {{PRESETS_MENU_EXPORT_ALL|}} |
| 匯入 | {{PRESETS_MENU_IMPORT|}} |

### 檔案格式

| 分頁 | 副檔名 |
|-----|--------|
| {{PALETTE_TAB_REFERENCE|}} | `{{FILE_EXTENSION_REFERENCE|}}` |
| {{PALETTE_TAB_LOCKED|}} | `{{FILE_EXTENSION_LOCKED|}}` |

匯入時可選擇追加（{{PRESETS_IMPORT_MODE_APPEND|}}）或取代（{{PRESETS_IMPORT_MODE_REPLACE|}}）現有字組。

> [!NOTE]
> 匯出時不會保留釘選狀態。匯入對話框會自動過濾對應分頁的檔案類型。

## 使用技巧

### 為不同語言建立字組

建立多組測試字組，例如：

- 「繁中常用」：永東國酬鷹
- 「日文假名」：あいうえお
- 「韓文」：가나다라마

### 為不同專案建立配置

使用匯入匯出功能在不同電腦或專案間共享字組：

1. 在一台電腦上建立常用字組
2. 匯出為檔案
3. 在其他電腦匯入

### 搭配鎖定字建立完整測試環境

1. 建立{{PALETTE_TAB_REFERENCE|}}字組：常用參考字
2. 建立{{PALETTE_TAB_LOCKED|}}字組：標準字位置配置
3. 快速載入兩者，建立完整測試環境

## 相關功能

- [{{REFERENCE_PANEL_TITLE|}}功能](guide-reference)：輸入參考字
- [{{PALETTE_TAB_LOCKED|}}功能](guide-lock)：鎖定特定位置
- [返回主頁](guide)
