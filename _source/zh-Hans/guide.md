# {{NINE_BOX_VIEW}}

九宫格预览工具，让字型设计师在设计过程中实时预览字符与周围参考字的排列效果。

## 目录

- [安装方式](#安装方式)
- [快速开始](#快速开始)
- [核心概念：三层预览系统](#核心概念三层预览系统)
- [界面总览](#界面总览)
- [九宫格位置定义](#九宫格位置定义)
- [功能说明](#功能说明)

## 安装方式

### 通过 {{GLYPHS_PLUGIN_MANAGER}} 安装

> [!TIP]
> 建议使用{{GLYPHS_PLUGIN_MANAGER}}安装，可获得自动更新。

1. 在 Glyphs 中打开 **{{GLYPHS_WINDOW_MENU}} > {{GLYPHS_PLUGIN_MANAGER}}**
2. 搜索「{{NINE_BOX_VIEW|}}」
3. 点击「{{GLYPHS_INSTALL}}」

### 手动安装

1. 下载插件文件（.glyphsPlugin）
2. 双击文件进行安装
3. 重新启动 Glyphs

## 快速开始

1. **打开插件**：选择 **{{GLYPHS_VIEW_MENU}} > {{NINE_BOX_VIEW}}**
2. **输入参考字**：点击工具栏的 {{ICON_REFERENCE}} 按钮打开{{REFERENCE_PANEL_TITLE|}}
3. **查看预览**：九宫格会显示当前编辑字符（中央）与周围参考字

### 30 秒上手

```
1. 打开九宫格窗口
2. 输入参考字：永龙国天
3. 点击九宫格内容区，参考字会随机排列
4. 继续编辑字符，实时预览排列效果
```

> [!TIP]
> 按住 **Shift** 键可进入 Solo 模式，暂时隐藏参考字和锁定字。

## 核心概念：三层预览系统

{{NINE_BOX_VIEW}} 采用三层堆叠设计，让你同时观察字符在不同情境下的表现：

<figure class="concept-figure">
  <img src="../../assets/images/concept-layers.svg" alt="三层预览系统概念图" />
</figure>

### 编辑字（底层）

当前正在编辑的字符，实时同步显示在九宫格每一格。这是你的工作焦点。

### 参考字（中层）

随机排列的常用字符，帮助你快速发现问题搭配。点击九宫格可重新洗牌。

### 锁定字（顶层）

固定在指定位置的字符，建立稳定的比较基准。设置会随文件保存。

> [!NOTE]
> 三层由下往上叠加显示。锁定字优先于参考字，会覆盖该位置的参考字。

## 界面总览

### 主窗口

九宫格主窗口是一个浮动面板，包含：

- **九宫格显示区**：3×3 的字符预览网格
- **工具栏**：底部的操作按钮区
- **标题栏菜单**：右上角的 **{{TITLEBAR_MENU_TOOLTIP|}}** 按钮

### 工具栏按钮

| 按钮 | 功能 | 说明 |
|------|------|------|
| {{ICON_SUN}}/{{ICON_MOON}} | 主题切换 | 切换浅色/深色模式 |
| 滑块 | 模糊程度 | 调整整个九宫格窗口的模糊程度，用于检视整体灰度分布 |
| {{ICON_PRESETS}} | {{PRESETS_WINDOW_TITLE|}} | 打开/关闭字组管理面板 |
| {{ICON_LOCK}} | {{LOCKED_PANEL_TITLE|}} | 打开/关闭锁定字面板 |
| {{ICON_REFERENCE}} | {{REFERENCE_PANEL_TITLE|}} | 打开/关闭参考字输入面板 |
| {{ICON_MENU}} | {{TITLEBAR_MENU_TOOLTIP|}} | 打开信息菜单 |

### 信息菜单

点击标题栏的 **{{ICON_MENU}}** 按钮打开：

| 项目 | 说明 |
|-----|------|
| {{ABOUT_MENU_ITEM|}} | 打开{{ABOUT_WINDOW_TITLE|}} |
| {{INFO_MENU_PURCHASE|}} | 购买授权（试用期间显示） |
| {{INFO_MENU_ENTER_LICENSE|}} | 输入授权码（试用期间显示） |
| {{INFO_MENU_HELP|}} | 打开使用说明（本文档） |
| {{INFO_MENU_WEBSITE|}} | 前往官方网站 |
| {{INFO_MENU_FEEDBACK|}} | 提交意见反馈（GitHub Issues） |
| {{INFO_MENU_CONTACT_US|}} | 联系开发者（电子邮件） |

> [!NOTE]
> 试用期间，菜单会额外显示剩余天数状态以及购买/输入授权码选项。

### 右键菜单

在九宫格内容区按右键可打开快捷菜单：

| 项目 | 说明 |
|------|------|
| {{CONTEXT_MENU_INSERT_AT_CURSOR|}} | 将九宫格内容插入到 Glyphs 编辑视图的光标位置 |
| {{CONTEXT_MENU_OPEN_IN_NEW_TAB|}} | 将九宫格内容在新标签页中打开 |
| {{CONTEXT_MENU_SHOW_TOOLBAR|}} / {{CONTEXT_MENU_HIDE_TOOLBAR|}} | 切换工具栏显示 |
| {{CONTEXT_MENU_SHOW_REFERENCE_INPUT|}} / {{CONTEXT_MENU_HIDE_REFERENCE_INPUT|}} | 切换{{REFERENCE_PANEL_TITLE|}}显示 |
| {{CONTEXT_MENU_SHOW_LOCKED_PANEL|}} / {{CONTEXT_MENU_HIDE_LOCKED_PANEL|}} | 切换{{LOCKED_PANEL_TITLE|}}显示 |
| {{CONTEXT_MENU_SHOW_PRESETS|}} / {{CONTEXT_MENU_HIDE_PRESETS|}} | 切换{{PRESETS_WINDOW_TITLE|}}显示 |
| {{CONTEXT_MENU_LIGHT_MODE|}} / {{CONTEXT_MENU_DARK_MODE|}} | 切换主题模式 |
| {{CONTEXT_MENU_SHOW_GRID_LINES|}} / {{CONTEXT_MENU_HIDE_GRID_LINES|}} | 切换网格显示 |

## 九宫格位置定义

九宫格的位置编号如下：

```
| 6 | 7 | 8 |  ← 顶部
| 3 | 4 | 5 |  ← 中央
| 0 | 1 | 2 |  ← 底部
```

- **位置 4**：中央格，显示当前编辑的字符，不可锁定
- **其他位置**：可放置参考字或锁定字

## 功能说明

### 预览层功能

#### [{{REFERENCE_PANEL_TITLE|}}功能](guide-reference)

> 参考字是三层预览系统的「中层」，位于编辑字之上。

输入一组参考字符，在九宫格周围显示，帮助观察字符在不同上下文中的视觉效果。

**适用场景**：

- 观察字符与不同笔画密度字符的搭配
- 检查字符间距与视觉平衡
- 模拟真实排版情境

#### [{{PALETTE_TAB_LOCKED|}}功能](guide-lock)

> 锁定字是三层预览系统的「顶层」，优先于参考字显示。

将特定位置固定显示某个字符，建立稳定的比较基准。

**适用场景**：

- 固定标准字作为设计参考
- 建立字符配对比较
- 追踪设计一致性

### 效率工具

#### [{{PRESETS_WINDOW_TITLE|}}功能](guide-presets)

保存常用的参考字组合或锁定字配置，快速切换不同测试情境。

**适用场景**：

- 保存不同语言的测试字组
- 保存特定项目的参考配置
- 在不同字型文件间共享设置

## 更多信息

- [{{REFERENCE_PANEL_TITLE|}}功能详细说明](guide-reference)
- [{{PALETTE_TAB_LOCKED|}}功能详细说明](guide-lock)
- [{{PRESETS_WINDOW_TITLE|}}功能详细说明](guide-presets)
- [进阶功能](guide-advanced)
- [授权与试用](guide-license)
- [常见问题](guide-faq)
