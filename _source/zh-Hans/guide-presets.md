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

### {{PALETTE_TAB_REFERENCE|}}分页

保存参考字的字符组合。每个字组包含：

- 字组名称
- 参考字内容（字符列表）
- 固定状态

### {{PALETTE_TAB_LOCKED|}}

保存锁定字的位置配置。每个字组包含：

- 字组名称
- 各位置的锁定字符
- 固定状态

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

### 创建{{PALETTE_TAB_REFERENCE|}}字组

**方法一：从{{REFERENCE_PANEL_TITLE|}}保存**

1. 在{{REFERENCE_PANEL_TITLE|}}输入字符
2. 点击「{{SAVE_REFERENCE_BUTTON|}}」按钮
3. 字组会以参考字内容作为显示名称

**方法二：从{{PRESETS_WINDOW_TITLE|}}新增**

1. 切换到「{{PALETTE_TAB_REFERENCE|}}」分页
2. 点击面板底部的 {{ICON_PLUS}} 按钮
3. 当前的参考字会保存为新字组

### 创建{{PALETTE_TAB_LOCKED|}}字组

**方法一：快捷操作**

1. 设置好锁定字配置
2. 按住 **Cmd + Option**
3. 点击中央格
4. 当前锁定配置会保存为新字组

**方法二：从{{PRESETS_WINDOW_TITLE|}}新增**

1. 切换到「{{PALETTE_TAB_LOCKED|}}」分页
2. 点击面板底部的 {{ICON_PLUS}} 按钮
3. 当前的锁定字配置会保存为新字组

## 管理字组

### 加载字组

在{{PRESETS_WINDOW_TITLE|}}中双击任一字组，即可加载该字组的内容。

### 重命名

**方法一：键盘快捷键**

1. 选择字组
2. 按下 **Enter** 键进入编辑模式
3. 输入新名称

**方法二：右键菜单**

1. 在字组上按右键
2. 选择「{{PALETTE_MENU_RENAME|}}」
3. 输入新名称

### 覆盖字组

1. 修改当前的参考字或锁定字配置
2. 在要覆盖的字组上按右键
3. 选择「{{PALETTE_MENU_OVERWRITE|}}」
4. 确认覆盖

> [!CAUTION]
> 覆盖操作无法撤销，请确认后再执行。

### 删除字组

**方法一：键盘快捷键**

1. 选取字组（单选或多选）
2. 按下 **Delete** 键

**方法二：右键菜单**

- **单一删除**：在字组上按右键，选择「{{PALETTE_MENU_DELETE|}}」
- **批量删除**：选取多个字组（Cmd + 点击或 Shift + 点击），按右键选择「{{PALETTE_MENU_DELETE_MULTIPLE|}}」

### 右键菜单

| 项目 | 说明 |
|-----|------|
| {{PALETTE_MENU_PIN|}} / {{PALETTE_MENU_UNPIN|}} | 固定或取消固定 |
| {{PALETTE_MENU_RENAME|}} | 重命名字组 |
| {{PALETTE_MENU_OVERWRITE|}} | 以当前内容替换字组 |
| {{PALETTE_MENU_DELETE|}} | 删除字组 |

## 固定功能

固定的字组会固定显示在列表顶部，方便快速存取。

### 固定操作

**单一固定**：

1. 在字组上按右键
2. 选择「{{PALETTE_MENU_PIN|}}」

**批量固定**：

1. 选取多个字组
2. 按右键，选择「{{PALETTE_MENU_PIN_MULTIPLE|}}」

### 取消固定

1. 在已固定的字组上按右键
2. 选择「{{PALETTE_MENU_UNPIN|}}」

### 排序规则

字组列表的排序遵循以下规则：

1. **已固定字组**：永远显示在最上方
2. **未固定字组**：依照排序设置排列

使用排序按钮可切换四种排序方式。在各分组内（已固定/未固定），字组依照选定的排序方式排列。

## 导入导出

### 导出字组

**导出选取的字组**：

1. 选取要导出的字组
2. 点击面板底部的 **{{ICON_MORE}}** 按钮
3. 选择「{{PRESETS_MENU_EXPORT_SELECTED|}}」
4. 选择保存位置

**导出所有字组**：

1. 点击面板底部的 **{{ICON_MORE}}** 按钮
2. 选择「{{PRESETS_MENU_EXPORT_ALL|}}」
3. 选择保存位置

### 导出格式

导出的文件为 JSON 格式，依字组类型使用不同扩展名：

- **{{PALETTE_TAB_REFERENCE|}}**：`{{FILE_EXTENSION_REFERENCE|}}`
- **{{PALETTE_TAB_LOCKED|}}**：`{{FILE_EXTENSION_LOCKED|}}`

文件内容包含：

- 格式标记
- ID 编号
- 字组数据

> [!NOTE]
> 导出时不会保留固定状态。

### 导入字组

1. 点击面板底部的 **{{ICON_MORE}}** 按钮
2. 选择「{{PRESETS_MENU_IMPORT|}}」
3. 选择要导入的文件
4. 选择导入模式：
    - **{{PRESETS_IMPORT_MODE_APPEND|}}**：追加到现有字组
    - **{{PRESETS_IMPORT_MODE_REPLACE|}}**：替换所有现有字组

### 导入注意事项

导入对话框会依据当前分页自动过滤文件类型：

- 在{{PALETTE_TAB_REFERENCE|}}分页时，只显示 `{{FILE_EXTENSION_REFERENCE|}}` 文件
- 在{{PALETTE_TAB_LOCKED|}}分页时，只显示 `{{FILE_EXTENSION_LOCKED|}}` 文件

### 导入错误信息

| 错误 | 说明 |
|-----|------|
| {{PRESETS_IMPORT_ERROR_INVALID_FORMAT|}} | 文件格式无效 |
| {{PRESETS_IMPORT_ERROR_UNSUPPORTED_VERSION|}} | 文件版本过新，请更新插件 |
| {{PRESETS_IMPORT_ERROR_TYPE_MISMATCH|}} | 文件类型与当前分页不符 |
| {{PRESETS_IMPORT_ERROR_EMPTY|}} | 文件中没有有效的字组 |

## 空状态提示

当分页中没有字组时，会显示提示信息：

- **{{PALETTE_TAB_REFERENCE|}}分页**：「{{PALETTE_EMPTY_REFERENCE_LINE1|}} {{PALETTE_EMPTY_REFERENCE_LINE2|}}」
- **{{PALETTE_TAB_LOCKED|}}分页**：「{{PALETTE_EMPTY_LOCKED_LINE1|}} {{PALETTE_EMPTY_LOCKED_LINE2|}}」

## 使用技巧

### 为不同语言创建字组

创建多组测试字组，例如：

- 「繁中常用」：永东国酬鹰
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
