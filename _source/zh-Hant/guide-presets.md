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

### {{PALETTE_TAB_REFERENCE|}}分頁

儲存參考字的字符組合。每個字組包含：

- 字組名稱
- 參考字內容（字符清單）
- 釘選狀態

### {{PALETTE_TAB_LOCKED|}}

儲存鎖定字的位置配置。每個字組包含：

- 字組名稱
- 各位置的鎖定字符
- 釘選狀態

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

### 建立{{PALETTE_TAB_REFERENCE|}}字組

**方法一：從{{REFERENCE_PANEL_TITLE|}}儲存**

1. 在{{REFERENCE_PANEL_TITLE|}}輸入字符
2. 點擊「{{SAVE_REFERENCE_BUTTON|}}」按鈕
3. 字組會以參考字內容作為顯示名稱

**方法二：從{{PRESETS_WINDOW_TITLE|}}新增**

1. 切換到「{{PALETTE_TAB_REFERENCE|}}」分頁
2. 點擊面板底部的 {{ICON_PLUS}} 按鈕
3. 當前的參考字會儲存為新字組

### 建立{{PALETTE_TAB_LOCKED|}}字組

**方法一：快捷操作**

1. 設定好鎖定字配置
2. 按住 **Cmd + Option**
3. 點擊中央格
4. 當前鎖定配置會儲存為新字組

**方法二：從{{PRESETS_WINDOW_TITLE|}}新增**

1. 切換到「{{PALETTE_TAB_LOCKED|}}」分頁
2. 點擊面板底部的 {{ICON_PLUS}} 按鈕
3. 當前的鎖定字配置會儲存為新字組

## 管理字組

### 載入字組

在{{PRESETS_WINDOW_TITLE|}}中雙擊任一字組，即可載入該字組的內容。

### 重新命名

**方法一：鍵盤快捷鍵**

1. 選擇字組
2. 按下 **Enter** 鍵進入編輯模式
3. 輸入新名稱

**方法二：右鍵選單**

1. 在字組上按右鍵
2. 選擇「{{PALETTE_MENU_RENAME|}}」
3. 輸入新名稱

### 覆寫字組

1. 修改當前的參考字或鎖定字配置
2. 在要覆寫的字組上按右鍵
3. 選擇「{{PALETTE_MENU_OVERWRITE|}}」
4. 確認覆寫

> [!CAUTION]
> 覆寫操作無法復原，請確認後再執行。

### 刪除字組

**方法一：鍵盤快捷鍵**

1. 選取字組（單選或多選）
2. 按下 **Delete** 鍵

**方法二：右鍵選單**

- **單一刪除**：在字組上按右鍵，選擇「{{PALETTE_MENU_DELETE|}}」
- **批次刪除**：選取多個字組（Cmd + 點擊或 Shift + 點擊），按右鍵選擇「{{PALETTE_MENU_DELETE_MULTIPLE|}}」

### 右鍵選單

| 項目 | 說明 |
|-----|------|
| {{PALETTE_MENU_PIN|}} / {{PALETTE_MENU_UNPIN|}} | 釘選或取消釘選 |
| {{PALETTE_MENU_RENAME|}} | 重新命名字組 |
| {{PALETTE_MENU_OVERWRITE|}} | 以當前內容取代字組 |
| {{PALETTE_MENU_DELETE|}} | 刪除字組 |

## 釘選功能

釘選的字組會固定顯示在清單頂部，方便快速存取。

### 釘選操作

**單一釘選**：

1. 在字組上按右鍵
2. 選擇「{{PALETTE_MENU_PIN|}}」

**批次釘選**：

1. 選取多個字組
2. 按右鍵，選擇「{{PALETTE_MENU_PIN_MULTIPLE|}}」

### 取消釘選

1. 在已釘選的字組上按右鍵
2. 選擇「{{PALETTE_MENU_UNPIN|}}」

### 排序規則

字組清單的排序遵循以下規則：

1. **已釘選字組**：永遠顯示在最上方
2. **未釘選字組**：依照排序設定排列

使用排序按鈕可切換四種排序方式。在各分組內（已釘選/未釘選），字組依照選定的排序方式排列。

## 匯入匯出

### 匯出字組

**匯出選取的字組**：

1. 選取要匯出的字組
2. 點擊面板底部的 **{{ICON_MORE}}** 按鈕
3. 選擇「{{PRESETS_MENU_EXPORT_SELECTED|}}」
4. 選擇儲存位置

**匯出所有字組**：

1. 點擊面板底部的 **{{ICON_MORE}}** 按鈕
2. 選擇「{{PRESETS_MENU_EXPORT_ALL|}}」
3. 選擇儲存位置

### 匯出格式

匯出的檔案為 JSON 格式，依字組類型使用不同副檔名：

- **{{PALETTE_TAB_REFERENCE|}}**：`{{FILE_EXTENSION_REFERENCE|}}`
- **{{PALETTE_TAB_LOCKED|}}**：`{{FILE_EXTENSION_LOCKED|}}`

檔案內容包含：

- 格式標記
- ID 編號
- 字組資料

> [!NOTE]
> 匯出時不會保留釘選狀態。

### 匯入字組

1. 點擊面板底部的 **{{ICON_MORE}}** 按鈕
2. 選擇「{{PRESETS_MENU_IMPORT|}}」
3. 選擇要匯入的檔案
4. 選擇匯入模式：
    - **{{PRESETS_IMPORT_MODE_APPEND|}}**：追加到現有字組
    - **{{PRESETS_IMPORT_MODE_REPLACE|}}**：取代所有現有字組

### 匯入注意事項

匯入對話框會依據當前分頁自動過濾檔案類型：

- 在{{PALETTE_TAB_REFERENCE|}}分頁時，只顯示 `{{FILE_EXTENSION_REFERENCE|}}` 檔案
- 在{{PALETTE_TAB_LOCKED|}}分頁時，只顯示 `{{FILE_EXTENSION_LOCKED|}}` 檔案

### 匯入錯誤訊息

| 錯誤 | 說明 |
|-----|------|
| {{PRESETS_IMPORT_ERROR_INVALID_FORMAT|}} | 檔案格式無效 |
| {{PRESETS_IMPORT_ERROR_UNSUPPORTED_VERSION|}} | 檔案版本過新，請更新外掛 |
| {{PRESETS_IMPORT_ERROR_TYPE_MISMATCH|}} | 檔案類型與當前分頁不符 |
| {{PRESETS_IMPORT_ERROR_EMPTY|}} | 檔案中沒有有效的字組 |

## 空狀態提示

當分頁中沒有字組時，會顯示提示訊息：

- **{{PALETTE_TAB_REFERENCE|}}分頁**：「{{PALETTE_EMPTY_REFERENCE_LINE1|}} {{PALETTE_EMPTY_REFERENCE_LINE2|}}」
- **{{PALETTE_TAB_LOCKED|}}分頁**：「{{PALETTE_EMPTY_LOCKED_LINE1|}} {{PALETTE_EMPTY_LOCKED_LINE2|}}」

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
