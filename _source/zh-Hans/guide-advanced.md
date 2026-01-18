# 进阶功能

本章节介绍 {{NINE_BOX_VIEW}} 的进阶功能，包括 {{LIGHT_TABLE}} 整合、快捷键总览与辅助键监控。

## 目录

- [{{LIGHT_TABLE}} 整合](#light-table-整合)
- [快捷键总览](#快捷键总览)
- [辅助键监控](#辅助键监控)
- [网格显示](#网格显示)
- [拖曳进阶操作](#拖曳进阶操作)
- [特殊图层支持](#特殊图层支持)

## {{LIGHT_TABLE}} 整合

{{NINE_BOX_VIEW}} 支持与第三方插件 **[{{LIGHT_TABLE}}](https://formkunft.com/light-table/)** 整合，让您在九宫格中比较不同版本的字符设计。

### 什么是 {{LIGHT_TABLE}}？

{{LIGHT_TABLE}} 是一个独立的 Glyphs 插件，提供字型版本比较功能。当 {{LIGHT_TABLE}} 安装且其工具启用时，您可以在九宫格中查看比较版本的字符。

### 启用条件

要在九宫格中显示比较版本，需满足以下条件：

1. **安装 {{LIGHT_TABLE}}**：从 {{GLYPHS_PLUGIN_MANAGER}} 安装 {{LIGHT_TABLE}} 插件
2. **启用 {{LIGHT_TABLE}} 工具**：在 Glyphs 工具栏中选择 {{LIGHT_TABLE}} 的比较工具
3. **选择比较版本**：在 {{LIGHT_TABLE}} 面板中选择要比较的版本
4. **按住 Shift 键**：按住 Shift 键触发比较模式

### 使用方式

1. 确保 {{LIGHT_TABLE}} 已安装并启用
2. 在 {{LIGHT_TABLE}} 面板中选择比较版本
3. 按住 **Shift** 键
4. 九宫格中的字符会切换为比较版本

![Light Table 比较效果](../assets/images/feature-lighttable.gif)

> [!NOTE]
> **Shift 键行为**：若 {{LIGHT_TABLE}} 未安装或工具未启用，按住 Shift 会进入 Solo 模式，暂时隐藏参考字和锁定字。

## 快捷键总览

### 九宫格内操作

| 快捷键 | 操作 | 说明 |
|-------|------|------|
| 点击 | 随机排列 | 重新随机排列参考字 |
| Cmd + 点击 | 锁定/解锁 | 切换该位置的锁定状态 |
| Cmd + 点击中央格 | 清除所有锁定 | 一次清除所有位置的锁定 |
| Cmd + Option + 点击 | 字符选择器 | 打开字符选择器设置锁定字 |
| Cmd + Option + 点击中央格 | 保存锁定字组 | 将当前锁定配置保存为{{PRESETS_WINDOW_TITLE|}} |

### 拖曳操作

| 快捷键 | 拖曳效果 |
|-------|---------|
| 无 | 交换位置（九宫格内）/ 插入（编辑视图） |
| Cmd | 锁定字操作（移动或锁定） |
| Option | 复制参考字（来源保留） |
| Shift | 在新标签页打开九宫格 |
| Cmd + Option | 复制锁定字（来源保留） |

### 工具栏操作

工具栏按钮可通过点击触发，部分按钮在鼠标悬停时会显示工具提示：

| 按钮 | 工具提示 |
|-----|---------|
| {{ICON_LOCK}}（已打开） | {{LOCKED_PANEL_TOGGLE_HIDE|}} |
| {{ICON_LOCK}}（已关闭） | {{LOCKED_PANEL_TOGGLE_SHOW|}} |
| {{ICON_SUN}} | {{THEME_TOGGLE_LIGHT_TOOLTIP|}} |
| {{ICON_MOON}} | {{THEME_TOGGLE_DARK_TOOLTIP|}} |
| {{ICON_PRESETS}}（已打开） | {{PRESETS_TOGGLE_HIDE_TOOLTIP|}} |
| {{ICON_PRESETS}}（已关闭） | {{PRESETS_TOGGLE_SHOW_TOOLTIP|}} |
| {{ICON_REFERENCE}}（已打开） | {{REFERENCE_PANEL_HIDE_TOOLTIP|}} |
| {{ICON_REFERENCE}}（已关闭） | {{REFERENCE_PANEL_SHOW_TOOLTIP|}} |

## 辅助键监控

{{NINE_BOX_VIEW}} 会实时监控键盘辅助键的状态，并提供相应的视觉反馈。

### 监控的辅助键

| 辅助键 | 功能 |
|-------|------|
| Shift | Solo 模式（暂时隐藏参考字和锁定字）；若 {{LIGHT_TABLE}} 工具启用则触发比较模式 |
| Option | 拖曳时复制（与 macOS 标准行为一致） |
| Command | 进入锁定字编辑模式 |

> [!TIP]
> **Option 键**：拖曳时按住 Option 键可复制而非移动，与 macOS 标准行为一致。

### Solo 模式

按住 Shift 键时，九宫格会暂时隐藏所有参考字和锁定字，只显示当前编辑的字符。这个功能方便快速对比周围格叠加效果与当前字符本身的差异。

- **启用条件**：鼠标在九宫格窗口内、{{LIGHT_TABLE}} 工具未启用
- **恢复方式**：放开 Shift 键，或鼠标移出窗口

> [!TIP]
> 如果您安装了 {{LIGHT_TABLE}} 并启用其比较工具，Shift 键会优先触发版本比较功能。

### Cmd 模式视觉提示

按住 Cmd 键时，工具栏的锁定按钮会显示视觉提示，表示您处于锁定字编辑模式。

## 网格显示

网格功能可在九宫格中显示辅助线，帮助检查字符的对齐和比例。

### 打开方式

1. 在九宫格内容区按右键
2. 选择「{{CONTEXT_MENU_SHOW_GRID_LINES|}}」

### 网格内容

网格会显示以下参考线：

- **{{GRID_EM_BOX}}**：字符的边界框
- **{{GRID_CENTER_LINE}}**：水平和垂直中心线

### 关闭方式

1. 在九宫格内容区按右键
2. 选择「{{CONTEXT_MENU_HIDE_GRID_LINES|}}」

> [!NOTE]
> 网格设置会自动保存，重启后保持。

## 拖曳进阶操作

### 动态图标系统

拖曳过程中，系统会根据拖曳位置和辅助键状态动态更新拖曳图标：

| 情境 | 图标 |
|-----|------|
| 九宫格内交换 | {{ICON_SWAP}} |
| 拖到编辑视图 | {{ICON_INSERT}} |
| 禁止操作 | {{ICON_PROHIBIT}} |
| Shift 模式 | {{ICON_GRID}} |
| Cmd 模式 | {{ICON_PIN}} 或 {{ICON_ADD}} |
| Option 模式 | {{ICON_COPY}} |

### 多区域检测

拖曳时系统会检测三种区域：

1. **九宫格内**：根据目标位置决定操作
2. **Glyphs 编辑视图**：允许插入字符
3. **其他区域**：显示禁止图标

### Shift + 拖曳打开新标签页

按住 Shift 键拖曳时，会将整个九宫格的内容在新标签页中打开：

1. 按住 **Shift** 键
2. 从九宫格内任意位置开始拖曳
3. 拖曳到 Glyphs 窗口区域
4. 放开后，九宫格的文字会在新标签页中打开

这个功能方便快速在文字编辑视图中预览九宫格的排列效果。

## 特殊图层支持

当您在 Glyphs 中编辑非主板图层时，九宫格的周围格会自动同步显示对应的图层版本，让您实时预览特殊图层与周围字符的搭配效果。

> [!TIP]
> 如果您希望周围格保持在主板图层而非跟随特殊图层，可以使用「锁定字」或「参考字」功能。锁定字与参考字会维持在主板图层。

## 数据持久化

### 保存位置

{{NINE_BOX_VIEW}} 的数据保存在两个位置：

**字型文件内（随文件保存）**：

- 参考字输入内容
- 锁定字配置

**应用程序设置（全局）**：

- 窗口大小和位置（主窗口、{{REFERENCE_PANEL_TITLE|}}、{{PRESETS_WINDOW_TITLE|}}）
- {{REFERENCE_PANEL_TITLE|}}可见性
- {{PRESETS_WINDOW_TITLE|}}可见性
- 工具栏可见性
- 锁定字显示状态
- 主题模式
- 模糊程度
- 网格显示状态
- 字组数据
- 字组排序方式
- 字组分页选择

### 数据格式

字型文件内的数据保存在 `GSFont.userData` 中：

| Key | 内容 |
|-----|------|
| `com.YinTzuYuan.NineBoxViewPro.ReferenceInput` | 参考字输入文字 |
| `com.YinTzuYuan.NineBoxViewPro.LockedGlyphs` | 锁定字配置（位置 → 字符） |

### 跨文件共享

- 参考字和锁定字数据绑定在字型文件中，不会跨文件共享
- {{PRESETS_WINDOW_TITLE|}}保存在应用程序设置中，可跨文件使用
- 使用导入导出功能可在不同电脑间共享{{PRESETS_WINDOW_TITLE|}}

## 相关功能

- [{{REFERENCE_PANEL_TITLE|}}功能](guide-reference)
- [{{PALETTE_TAB_LOCKED|}}功能](guide-lock)
- [{{PRESETS_WINDOW_TITLE|}}功能](guide-presets)
- [返回主页](guide)
