# {{GUIDE_NAV_REFERENCE}}

{{GUIDE_NAV_REFERENCE}}功能讓您輸入一組字符，在九宮格周圍顯示，幫助觀察當前編輯字符在不同上下文中的視覺效果。

## 目錄

- [開啟{{REFERENCE_PANEL_TITLE|}}](#開啟參考字面板)
- [輸入格式](#輸入格式)
- [操作方式](#操作方式)
- [右鍵選單](#右鍵選單)
- [拖曳功能](#拖曳功能)

## 開啟{{REFERENCE_PANEL_TITLE|}}

有兩種方式開啟{{REFERENCE_PANEL_TITLE|}}：

1. **工具列按鈕**：點擊工具列的 {{ICON_REFERENCE}} 按鈕
2. **右鍵選單**：在九宮格內按右鍵，選擇「{{CONTEXT_MENU_SHOW_REFERENCE_INPUT|}}」

面板開啟後會顯示一個文字輸入區，您可以在此輸入參考字符。

## 輸入格式

{{REFERENCE_PANEL_TITLE|}}支援多種輸入格式：

### 直接輸入字元

直接輸入字元，所有字符都會逐字拆解：

```
永東國酬鷹
```

若需指定 glyph name，請使用 `/` 開頭（見下方說明）。

### Glyph Name 格式

使用斜線 `/` 開頭指定字符名稱：

```
/adieresis /Agrave /uni6C38
```

### Unicode 格式

支援多種 Unicode 輸入方式：

| 格式 | 範例 | 說明 |
|-----|------|------|
| `/uniXXXX` | `/uni6C38` | 4 位十六進制（官方格式） |
| `/uXXXXX` | `/u06C38` | 5 位十六進制 |
| `/XXXX` | `/6C38` | 純數字 4-5 位（便利格式） |

### 混合輸入

可以混合使用不同格式：

```
永 /adieresis 東 /uni0041 國
```

## 操作方式

### 儲存參考字

輸入完成後，點擊「{{SAVE_REFERENCE_BUTTON|}}」按鈕儲存到{{PRESETS_WINDOW_TITLE|}}。

### 亂數排列

在九宮格內容區點擊（不按任何輔助鍵），參考字會隨機重新排列到周圍位置。

> [!NOTE]
> 中央格（位置 4）始終顯示當前編輯的字符，不會被參考字取代。

## 右鍵選單

在{{REFERENCE_PANEL_TITLE|}}輸入區按右鍵可開啟快捷選單：

| 項目 | 說明 |
|-----|------|
| {{CONTEXT_MENU_GLYPH_PICKER|}} | 開啟字符選擇器，可多選字符插入 |
| {{CONTEXT_MENU_INSERT_AT_CURSOR|}} | 將參考字插入到 Glyphs 編輯視圖的游標位置 |
| {{CONTEXT_MENU_OPEN_IN_NEW_TAB|}} | 將參考字在新分頁中開啟 |

## 拖曳功能

### 基本拖曳

從九宮格內的字符拖曳到其他位置：

| 操作 | 效果 |
|-----|------|
| 普通拖曳 | 交換位置 |
| Option + 拖曳 | 複製參考字（來源保留） |

### 拖曳到 Glyphs 編輯視圖

將九宮格內的字符拖曳到 Glyphs 的編輯視圖：

| 操作 | 效果 |
|-----|------|
| 普通拖曳 | 字符插入到游標位置 |
| Option + 拖曳 | 在新分頁中開啟該字符 |

### 拖曳到{{REFERENCE_PANEL_TITLE|}}

將九宮格內的字符拖曳到輸入區，可快速添加參考字：

- 接受九宮格內任何位置的字符
- 字符會插入到游標位置
- 自動在前後加入空格分隔

> [!TIP]
> 更多拖曳操作（如 Cmd 模式、Shift 模式）請參閱[進階功能](advanced.html#拖曳進階操作)。

## 使用技巧

### 快速測試字組

1. 輸入常用的測試字組（如「永東國酬」）
2. 點擊「{{SAVE_REFERENCE_BUTTON|}}」儲存到{{PRESETS_WINDOW_TITLE|}}
3. 之後可從{{PRESETS_WINDOW_TITLE|}}快速載入

### 檢查間距

想要觀察相同字符的排列效果時，只需輸入單一字符：

```
國今
```

系統會自動在九宮格的各個位置重複顯示該字符，方便觀察字距和視覺平衡。

## 相關功能

- [鎖定字功能](guide-lock)：固定特定位置的字符
- [{{PRESETS_WINDOW_TITLE|}}功能](guide-presets)：儲存常用字組
- [返回主頁](guide)
