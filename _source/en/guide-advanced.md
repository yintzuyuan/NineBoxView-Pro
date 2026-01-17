# Advanced Features

This section covers advanced features of {{NINE_BOX_VIEW}}, including {{LIGHT_TABLE}} integration, keyboard shortcut overview, and modifier key monitoring.

## Table of Contents

- [{{LIGHT_TABLE}} Integration](#light-table-integration)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Modifier Key Monitoring](#modifier-key-monitoring)
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
> **Shift key behavior**: If {{LIGHT_TABLE}} is not installed or its tool is not active, holding Shift enters Solo mode, temporarily hiding reference and locked glyphs.

## Keyboard Shortcuts

### Grid Operations

| Shortcut | Action | Description |
|----------|--------|-------------|
| Click | Random arrange | Randomly rearrange reference glyphs |
| Cmd + click | Lock/unlock | Toggle lock state at that position |
| Cmd + click center | Clear all locks | Clear locks at all positions |
| Cmd + Option + click | Glyph picker | Open glyph picker to set locked glyph |
| Cmd + Option + click center | Save lock preset | Save current lock configuration to {{PRESETS_WINDOW_TITLE|}} |

### Drag Operations

| Shortcut | Drag Effect |
|----------|-------------|
| None | Swap positions (within grid) / Insert (edit view) |
| Cmd | Lock operations (move or lock) |
| Option | Copy reference glyph (source preserved) |
| Shift | Open grid in new tab |
| Cmd + Option | Copy locked glyph (source preserved) |

### Toolbar Operations

Toolbar buttons are triggered by clicking. Some buttons show tooltips on hover:

| Button | Tooltip |
|--------|---------|
| {{ICON_LOCK}} (enabled) | {{LOCK_TOGGLE_ENABLED_TOOLTIP|}} |
| {{ICON_LOCK}} (disabled) | {{LOCK_TOGGLE_DISABLED_TOOLTIP|}} |
| {{ICON_SUN}} | {{THEME_TOGGLE_LIGHT_TOOLTIP|}} |
| {{ICON_MOON}} | {{THEME_TOGGLE_DARK_TOOLTIP|}} |
| {{ICON_PRESETS}} (open) | {{PRESETS_TOGGLE_HIDE_TOOLTIP|}} |
| {{ICON_PRESETS}} (closed) | {{PRESETS_TOGGLE_SHOW_TOOLTIP|}} |
| {{ICON_REFERENCE}} (open) | {{REFERENCE_PANEL_HIDE_TOOLTIP|}} |
| {{ICON_REFERENCE}} (closed) | {{REFERENCE_PANEL_SHOW_TOOLTIP|}} |

## Modifier Key Monitoring

{{NINE_BOX_VIEW}} monitors keyboard modifier key states in real-time and provides visual feedback.

### Monitored Modifier Keys

| Modifier | Function |
|----------|----------|
| Shift | Solo mode (temporarily hide reference and locked glyphs); triggers comparison mode if {{LIGHT_TABLE}} tool is active |
| Option | Copy during drag (consistent with macOS standard behavior) |
| Command | Enter locked glyph editing mode |

> [!TIP]
> **Option key**: Hold Option during drag to copy instead of move, consistent with macOS standard behavior.

### Solo Mode

When holding Shift, the grid temporarily hides all reference and locked glyphs, showing only the current editing glyph. This helps quickly compare the overlay effect with the glyph itself.

- **Activation**: Mouse inside grid window, {{LIGHT_TABLE}} tool not active
- **Deactivation**: Release Shift, or move mouse outside window

> [!TIP]
> If you have {{LIGHT_TABLE}} installed and its comparison tool active, Shift will prioritize version comparison.

### Cmd Mode Visual Feedback

When holding Cmd, the lock button in the toolbar shows visual feedback indicating you're in lock editing mode.

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

### Dynamic Icon System

During dragging, the system dynamically updates the drag icon based on position and modifier key states:

| Scenario | Icon |
|----------|------|
| Swap within grid | {{ICON_SWAP}} |
| Drag to edit view | {{ICON_INSERT}} |
| Prohibited action | {{ICON_PROHIBIT}} |
| Shift mode | {{ICON_GRID}} |
| Cmd mode | {{ICON_PIN}} or {{ICON_ADD}} |
| Option mode | {{ICON_COPY}} |

### Multi-Region Detection

During drag, the system detects three regions:

1. **Within grid**: Action determined by target position
2. **Glyphs edit view**: Character insertion allowed
3. **Other areas**: Prohibition icon shown

### Shift + Drag to Open New Tab

Holding Shift while dragging opens the entire grid content in a new tab:

1. Hold **Shift**
2. Start dragging from any position in the grid
3. Drag to the Glyphs window area
4. Release to open grid text in a new tab

This is convenient for previewing the grid arrangement in text edit view.

## Special Layer Support

When editing a non-master layer in Glyphs, surrounding grid cells automatically sync to display the corresponding layer version, allowing real-time preview of special layers alongside surrounding characters.

> [!TIP]
> If you want surrounding cells to stay on the master layer instead of following special layers, use the Lock or Reference features. Locked and reference glyphs remain on the master layer.

## Data Persistence

### Storage Locations

{{NINE_BOX_VIEW}} data is stored in two locations:

**Within font file (saved with file)**:

- Reference input content
- Locked glyph configuration

**Application settings (global)**:

- Window size and position (main window, {{REFERENCE_PANEL_TITLE|}}, {{PRESETS_WINDOW_TITLE|}})
- {{REFERENCE_PANEL_TITLE|}} visibility
- {{PRESETS_WINDOW_TITLE|}} visibility
- Toolbar visibility
- Locked glyph display state
- Theme mode
- Blur intensity
- Grid line display state
- Preset data
- Preset sort order
- Preset tab selection

### Data Format

Font file data is stored in `GSFont.userData`:

| Key | Content |
|-----|---------|
| `com.YinTzuYuan.NineBoxViewPro.ReferenceInput` | Reference input text |
| `com.YinTzuYuan.NineBoxViewPro.LockedGlyphs` | Locked configuration (position → glyph) |

### Cross-File Sharing

- Reference and locked data is bound to the font file and doesn't share across files
- {{PRESETS_WINDOW_TITLE|}} is stored in application settings and can be used across files
- Use import/export to share {{PRESETS_WINDOW_TITLE|}} between computers

## Related Features

- [{{REFERENCE_PANEL_TITLE|}} Feature](guide-reference)
- [{{PALETTE_TAB_LOCKED|}} Feature](guide-lock)
- [{{PRESETS_WINDOW_TITLE|}} Feature](guide-presets)
- [Back to Home](guide)
