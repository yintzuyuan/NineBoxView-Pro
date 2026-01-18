# Advanced Features

This section covers advanced features of {{NINE_BOX_VIEW}}, including {{LIGHT_TABLE}} integration, keyboard shortcuts, and grid lines.

## Table of Contents

- [{{LIGHT_TABLE}} Integration](#light-table-integration)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Grid Lines](#grid-lines)
- [Advanced Drag Operations](#advanced-drag-operations)
- [Special Layer Support](#special-layer-support)

## {{LIGHT_TABLE}} Integration

{{NINE_BOX_VIEW}} supports integration with the third-party plugin **[{{LIGHT_TABLE}}](https://formkunft.com/light-table/)**, allowing you to compare different versions of glyph designs within the grid.

### What is {{LIGHT_TABLE}}?

{{LIGHT_TABLE}} is an independent Glyphs plugin that provides font version comparison functionality. When {{LIGHT_TABLE}} is installed and its tool is active, you can view comparison version glyphs in the grid.

### Requirements

To display comparison versions in the grid, the following conditions must be met:

1. **Install {{LIGHT_TABLE}}**: Install the {{LIGHT_TABLE}} plugin from {{GLYPHS_PLUGIN_MANAGER}}
2. **Activate {{LIGHT_TABLE}} tool**: Select the {{LIGHT_TABLE}} comparison tool in the Glyphs toolbar
3. **Select comparison version**: Choose a comparison version in the {{LIGHT_TABLE}} panel
4. **Hold Shift key**: Hold Shift to trigger comparison mode

### Usage

1. Ensure {{LIGHT_TABLE}} is installed and activated
2. Select a comparison version in the {{LIGHT_TABLE}} panel
3. Hold the **Shift** key
4. Glyphs in the grid will switch to the comparison version

![Light Table comparison effect](../assets/images/feature-lighttable.gif)

> [!NOTE]
> **Shift key behavior**: If {{LIGHT_TABLE}} is not installed or its tool is not active, holding Shift enters **Solo mode**, temporarily hiding reference and locked glyphs, showing only the current editing glyph to help quickly compare the overlay effect with the glyph itself.

## Keyboard Shortcuts

### Grid Operations

| Shortcut | Action | Description |
|----------|--------|-------------|
| Click | Random arrange | Randomly rearrange reference glyphs |
| Cmd + click | Lock/unlock | Toggle lock state at that position |
| Cmd + click center | Toggle lock feature | Enable/disable the lock feature |
| Cmd + Option + click | Glyph picker | Open glyph picker to set locked glyph |
| Cmd + Option + click center | Clear all locks | Clear locks at all positions |
| Cmd + Shift + click center | Save lock preset | Save current lock configuration to {{PRESETS_WINDOW_TITLE|}} |

### Drag Operations

| Shortcut | Drag Effect |
|----------|-------------|
| None | Swap positions (within grid) / Insert (edit view) |
| Cmd | Lock operations (move or lock) |
| Option | Within grid: Copy reference glyph; To edit view: Open glyph in new tab |
| Shift | Open grid in new tab |
| Cmd + Option | Copy locked glyph (source preserved) |

### Toolbar Operations

Toolbar buttons are triggered by clicking. Some buttons show tooltips on hover:

| Button | Function |
|--------|----------|
| {{ICON_SUN}} / {{ICON_MOON}} | Toggle dark/light mode |
| {{ICON_PRESETS}} | Show/hide {{PRESETS_WINDOW_TITLE|}} panel |
| {{ICON_LOCK}} | Show/hide {{LOCKED_PANEL_TITLE|}} panel |
| {{ICON_REFERENCE}} | Show/hide {{REFERENCE_PANEL_TITLE|}} panel |

## Grid Lines

The grid lines feature displays guides in the grid to help check glyph alignment and proportions.

### Enable

1. Right-click inside the grid area
2. Select "{{CONTEXT_MENU_SHOW_GRID_LINES|}}"

### Grid Content

Grid lines show the following guides:

- **{{GRID_EM_BOX}}**: Character bounding box
- **{{GRID_CENTER_LINE}}**: Horizontal and vertical center lines

### Disable

1. Right-click inside the grid area
2. Select "{{CONTEXT_MENU_HIDE_GRID_LINES|}}"

> [!NOTE]
> Grid line settings are automatically saved and persist after restart.

## Advanced Drag Operations

### Shift + Drag to Open New Tab

Holding **Shift** while dragging from the grid to a Glyphs window opens the entire grid content in a new tab, convenient for quickly previewing the arrangement in edit view.

## Special Layer Support

When editing a non-master layer in Glyphs, surrounding grid cells automatically sync to display the corresponding layer version, allowing real-time preview of special layers alongside surrounding characters.

> [!TIP]
> If you want surrounding cells to stay on the master layer instead of following special layers, use the Lock or Reference features. Locked and reference glyphs remain on the master layer.

## Data Persistence

{{NINE_BOX_VIEW}} data is stored in two locations:

| Storage Location | Content | Description |
|------------------|---------|-------------|
| Font file | Reference glyphs, locked glyphs | Saved with file, not shared across files |
| Application settings | Window configuration, {{PRESETS_WINDOW_TITLE|}}, theme, etc. | Global settings, usable across files |

> [!TIP]
> Use the import/export feature to share {{PRESETS_WINDOW_TITLE|}} between computers.

## Related Features

- [{{REFERENCE_PANEL_TITLE|}} Feature](guide-reference)
- [{{PALETTE_TAB_LOCKED|}} Feature](guide-lock)
- [{{PRESETS_WINDOW_TITLE|}} Feature](guide-presets)
- [Back to Home](guide)
