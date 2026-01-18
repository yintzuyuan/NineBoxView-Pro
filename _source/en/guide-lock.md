# {{GUIDE_NAV_LOCK}}

The {{GUIDE_NAV_LOCK}} feature allows you to fix a specific glyph at a designated position, establishing a stable comparison baseline. Locked glyphs are not affected by the random arrangement of reference glyphs.

## Table of Contents

- [Basic Concepts](#basic-concepts)
- [⌘ Mode Operations](#mode-operations)
- [Center Cell](#center-cell)
- [Locked Glyph Panel](#locked-glyph-panel)
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

## ⌘ Mode Operations

Hold **⌘** to enter lock editing mode. All lock/unlock operations are performed in this mode. When entering, locked cells are highlighted with the system accent color.

### Click Operations

| Action | Target Position | Effect |
|--------|-----------------|--------|
| ⌘ + click | Unlocked position | Lock the reference glyph at that position |
| ⌘ + click | Locked position | Unlock that position |
| ⌘ + click | Center cell | Toggle lock feature on/off |
| ⌘ + ⌥ + click | Any position | Open {{GLYPH_PICKER_TITLE_LOCK|}} picker |
| ⌘ + ⌥ + click | Center cell | Clear all locks |
| ⌘ + ⇧ + click | Center cell | Save current locks to {{PRESETS_WINDOW_TITLE|}} |

### Drag Operations

| Action | Source | Effect |
|--------|--------|--------|
| ⌘ + drag | Reference position | Lock to target position |
| ⌘ + drag | Locked position | Move locked glyph |
| ⌘ + ⌥ + drag | Any position | Copy lock (source preserved) |

## Center Cell

The center cell (position 4) always displays the current editing glyph and **cannot be locked**.

> [!TIP]
> Use **⌘ + drag** to copy the center cell glyph to another position, creating a locked glyph of the current editing character.

## Locked Glyph Panel

The Locked Glyph Panel is an independent floating window dedicated to displaying and managing locked glyphs.

### Opening the Panel

- **Toolbar**: Click the lock button ({{ICON_LOCK}})
- **Context menu**: Right-click in the grid content area and select "{{CONTEXT_MENU_SHOW_LOCKED_PANEL|}}"

### Panel Operations

The panel displays all locked glyph configurations in a 3×3 grid:

| Action | Effect |
|--------|--------|
| Click | Select the cell |
| Double-click | Open glyph picker to modify that position |
| ⌘ + click | Multi-select (toggle selection) |
| ⇧ + click | Rectangle selection |
| ⌘ + A | Select all locked positions |
| Delete | Remove all selected locked glyphs |
| Enter | Open glyph picker to batch modify selected positions |

### Center Cell Toggle

The panel's center cell shows a lock icon. Click to toggle the lock feature on/off:

- **Enabled**: Shows locked icon ({{ICON_LOCK}})
- **Disabled**: Shows unlocked icon ({{ICON_LOCK_OPEN}})

## Display Control

### Toggle Locked Glyph Panel

The lock button ({{ICON_LOCK}}) in the toolbar controls the Locked Glyph Panel visibility:

- **Open**: Panel is shown, tooltip displays "{{LOCKED_PANEL_TOGGLE_HIDE|}}"
- **Closed**: Panel is hidden, tooltip displays "{{LOCKED_PANEL_TOGGLE_SHOW|}}"

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

After setting up your locked glyph configuration, save to {{PRESETS_WINDOW_TITLE|}} via:

- **⌘ + ⇧ + click** the grid center cell
- Click the **save button** in the Locked Glyph Panel

## Related Features

- [{{REFERENCE_PANEL_TITLE|}} Feature](guide-reference): Enter reference glyphs
- [{{PRESETS_WINDOW_TITLE|}} Feature](guide-presets): Save locked glyph presets
- [Back to Home](guide)
