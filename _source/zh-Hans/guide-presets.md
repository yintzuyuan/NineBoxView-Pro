# {{GUIDE_NAV_PRESETS}}

{{GUIDE_NAV_PRESETS}}功能让您保存常用的参考字组合或锁定字配置，快速切换不同测试情境。

## 目录

- [打开{{PRESETS_WINDOW_TITLE|}}](#打开字组面板)
- [分页说明](#分页说明)
- [搜索与排序](#搜索与排序)
- [创建字组](#创建字组)
- [管理字组](#管理字组)
- [固定功能](#固定功能)
- [导入导出](#导入导出)

## 打开{{PRESETS_WINDOW_TITLE|}}

有两种方式打开{{PRESETS_WINDOW_TITLE|}}：

1. **工具栏按钮**：点击工具栏的 **{{ICON_PRESETS}}** 按钮
2. **右键菜单**：在九宫格内按右键，选择「{{CONTEXT_MENU_SHOW_PRESETS|}}」

## 分页说明

{{PRESETS_WINDOW_TITLE|}}包含两个分页：

| 分页 | 保存内容 |
|-----|---------|
| {{PALETTE_TAB_REFERENCE|}} | 参考字的字符组合 |
| {{PALETTE_TAB_LOCKED|}} | 锁定字的位置配置 |

每个字组包含名称、内容和固定状态。

## 搜索与排序

### 搜索功能

在分页控件下方有搜索栏位，可快速筛选字组：

1. 在搜索框输入关键字
2. 字组列表会实时过滤
3. 搜索不区分大小写
4. 清空搜索框可恢复完整列表

> [!TIP]
> 当搜索无结果时，会显示「{{SEARCH_NO_RESULTS|}}」提示。

### 排序功能

点击面板底部的排序按钮，可选择排序方式：

| 排序选项 | 说明 |
|---------|------|
| {{SORT_NAME_AZ|}} | 依名称字母顺序排列 |
| {{SORT_NAME_ZA|}} | 依名称反向字母顺序排列 |
| {{SORT_DATE_NEWEST|}} | 最新加入的字组在前 |
| {{SORT_DATE_OLDEST|}} | 最早加入的字组在前 |

> [!NOTE]
> 排序状态会自动保存，重启后保持。

## 创建字组

设置好参考字或锁定字后，可通过以下方式保存为字组：

| 入口 | {{PALETTE_TAB_REFERENCE|}} | {{PALETTE_TAB_LOCKED|}} |
|-----|--------|--------|
| 专属面板 | 点击「{{SAVE_REFERENCE_BUTTON|}}」按钮 | 点击「{{SAVE_LOCKED_BUTTON|}}」按钮 |
| {{PRESETS_WINDOW_TITLE|}} | 切换到对应分页，点击 {{ICON_PLUS}} | 切换到对应分页，点击 {{ICON_PLUS}} |
| 快捷操作 | — | ⌘ + ⇧ + 点击中央格 |

> [!TIP]
> 新创建的字组会以内容自动命名，可稍后重命名。

## 管理字组

| 操作 | 快捷键 | 右键菜单 |
|-----|--------|---------|
| 加载 | 双击字组 | — |
| 重命名 | 选取后按 Enter | {{PALETTE_MENU_RENAME|}} |
| 覆盖 | — | {{PALETTE_MENU_OVERWRITE|}} |
| 删除 | 选取后按 Delete | {{PALETTE_MENU_DELETE|}} |

> [!TIP]
> 多选字组：⌘ + 点击（切换选取）或 ⇧ + 点击（范围选取）。

> [!CAUTION]
> 覆盖操作无法撤销，请确认后再执行。

## 固定功能

固定的字组会固定显示在列表顶部。

| 操作 | 右键菜单 |
|-----|---------|
| 固定 | {{PALETTE_MENU_PIN|}} |
| 批量固定 | {{PALETTE_MENU_PIN_MULTIPLE|}} |
| 取消固定 | {{PALETTE_MENU_UNPIN|}} |

已固定字组永远显示在最上方，未固定字组依照排序设置排列。

## 导入导出

点击面板底部的 **{{ICON_MORE}}** 按钮进行导入导出：

| 操作 | 菜单项目 |
|-----|---------|
| 导出选取 | {{PRESETS_MENU_EXPORT_SELECTED|}} |
| 导出全部 | {{PRESETS_MENU_EXPORT_ALL|}} |
| 导入 | {{PRESETS_MENU_IMPORT|}} |

### 文件格式

| 分页 | 扩展名 |
|-----|--------|
| {{PALETTE_TAB_REFERENCE|}} | `{{FILE_EXTENSION_REFERENCE|}}` |
| {{PALETTE_TAB_LOCKED|}} | `{{FILE_EXTENSION_LOCKED|}}` |

导入时可选择追加（{{PRESETS_IMPORT_MODE_APPEND|}}）或替换（{{PRESETS_IMPORT_MODE_REPLACE|}}）现有字组。

> [!NOTE]
> 导出时不会保留固定状态。导入对话框会自动过滤对应分页的文件类型。

## 使用技巧

### 为不同语言创建字组

创建多组测试字组，例如：

- 「简中常用」：永龙国天地玄
- 「日文假名」：あいうえお
- 「韩文」：가나다라마

### 为不同项目创建配置

使用导入导出功能在不同电脑或项目间共享字组：

1. 在一台电脑上创建常用字组
2. 导出为文件
3. 在其他电脑导入

### 搭配锁定字创建完整测试环境

1. 创建{{PALETTE_TAB_REFERENCE|}}字组：常用参考字
2. 创建{{PALETTE_TAB_LOCKED|}}字组：标准字位置配置
3. 快速加载两者，创建完整测试环境

## 相关功能

- [{{REFERENCE_PANEL_TITLE|}}功能](guide-reference)：输入参考字
- [{{PALETTE_TAB_LOCKED|}}功能](guide-lock)：锁定特定位置
- [返回主页](guide)
