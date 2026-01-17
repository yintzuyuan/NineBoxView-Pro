# {{GUIDE_NAV_LOCK}}

The {{GUIDE_NAV_LOCK}} feature allows you to fix a specific glyph at a designated position, establishing a stable comparison baseline. Locked glyphs are not affected by the random arrangement of reference glyphs.

## Table of Contents

- [Basic Concepts](#basic-concepts)
- [Understanding ⌘ Mode](#understanding-mode)
- [⌘ Mode Operations](#mode-operations)
- [Center Cell Protection](#center-cell-protection)
- [Other Drag Operations](#other-drag-operations)
- [Display Control](#display-control)
- [Usage Tips](#usage-tips)

## Basic Concepts

### Grid Positions

```
| 6 | 7 | 8 |  ← Top
| 3 | 4 | 5 |  ← Center
| 0 | 1 | 2 |  ← Bottom
```

- **Position 4 (center cell)**: Displays the current editing glyph, **cannot be locked**
- **Other 8 positions**: Can lock specific glyphs

### Locked vs Reference Glyphs

| Property | Locked Glyphs | Reference Glyphs |
|----------|---------------|------------------|
| Position | Fixed at designated position | Randomly assigned to empty slots |
| Random arrangement | Not affected | Rearranged on each click |
| Storage method | Saved by position | Saved as glyph list |

## Understanding ⌘ Mode

All lock operations follow one simple rule: **hold the ⌘ (Cmd) key**.

We call this "⌘ Mode" — remember this concept and you'll master all lock operations:

| Mnemonic | Description |
|----------|-------------|
| **⌘ = Lock** | Hold ⌘ key = enter lock editing mode |
| **⌘ + click** | Lock/unlock that position |
| **⌘ + drag** | Move or create locked glyph |
| **⌘ + Option** | Advanced operations (picker, save preset) |

> [!TIP]
> When entering ⌘ mode, locked cells are highlighted with the system accent color for quick identification.

## ⌘ Mode Operations

Hold **⌘** to enter lock editing mode. All lock/unlock operations are performed in this mode.

### Click Operations

| Action | Target Position | Effect |
|--------|-----------------|--------|
| ⌘ + click | Unlocked position | Lock the reference glyph at that position |
| ⌘ + click | Locked position | Unlock that position |
| ⌘ + click | Center cell | Clear all locks |
| ⌘ + ⌥ + click | Any position | Open {{GLYPH_PICKER_TITLE_LOCK|}} picker |
| ⌘ + ⌥ + click | Center cell | Save current locks to {{PRESETS_WINDOW_TITLE|}} |

### Drag Operations

| Action | Source | Effect |
|--------|--------|--------|
| ⌘ + drag | Reference position | Lock to target position |
| ⌘ + drag | Locked position | Move locked glyph |
| ⌘ + ⌥ + drag | Any position | Copy lock (source preserved) |

## Center Cell Protection

The center cell (position 4) has special protection mechanisms:

### Cannot Be Locked

The center cell always displays the current editing glyph and cannot be locked. This ensures you can always see the glyph you're editing.

### Drag Restrictions

- **Normal drag**: Center cell glyph cannot be dragged to other grid positions
- **Drag outside**: Can drag center cell glyph to Glyphs edit view for insertion
- **⌘ mode drag**: When center cell is the source, only copy operation is supported

> [!NOTE]
> When attempting an invalid drag from the center cell, the drag icon shows a prohibition symbol ({{ICON_PROHIBIT}}).

## Other Drag Operations

Besides ⌘ mode drag operations, the following drag methods are available:

| Modifier Key | Drag Icon | Effect |
|--------------|-----------|--------|
| None | {{ICON_SWAP}} / {{ICON_INSERT}} | Swap positions / Insert to edit view |
| ⌥ | {{ICON_COPY}} | Copy reference glyph (source preserved) |
| ⇧ | {{ICON_GRID}} | Open grid in new tab |

### Normal Drag

Without any modifier keys:

- **Within grid**: Swap contents of two positions
- **To edit view**: Insert character at cursor position

### ⌥ + Drag

- Copy reference glyph to target position
- Source position retains original content

### ⇧ + Drag

- Open the entire grid content in a new tab
- Convenient for previewing in text edit view

## Display Control

### Toggle Locked Glyph Display

The lock button ({{ICON_LOCK}}) in the toolbar controls locked glyph visibility:

- **Enabled**: All locked glyphs shown, tooltip shows "{{LOCK_TOGGLE_ENABLED_TOOLTIP|}}"
- **Disabled**: Locked glyphs hidden, tooltip shows "{{LOCK_TOGGLE_DISABLED_TOOLTIP|}}"

> [!NOTE]
> Hiding locked glyphs only affects visibility; lock data is preserved.

### Lock Data Persistence

Locked glyph data is saved in the font file (`GSFont.userData`) and persists with the file:

- Lock settings are restored when reopening the font file
- Different font files have independent lock settings

## Usage Tips

### Establish Comparison Baseline

Lock a standard character (e.g., "永") to observe how other characters pair with it.

### Check Design Consistency

Lock multiple completed characters to ensure new designs maintain consistent style.

### Quick Save Configuration

1. Set up your locked glyph configuration
2. **⌘ + ⌥ + click** the center cell
3. Configuration is saved to {{PRESETS_WINDOW_TITLE|}}

## Related Features

- [{{REFERENCE_PANEL_TITLE|}} Feature](guide-reference): Enter reference glyphs
- [{{PRESETS_WINDOW_TITLE|}} Feature](guide-presets): Save locked glyph presets
- [Back to Home](guide)
