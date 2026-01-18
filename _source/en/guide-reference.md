# {{GUIDE_NAV_REFERENCE}}

The {{GUIDE_NAV_REFERENCE}} feature allows you to enter a set of characters to display around the grid, helping you observe the visual effect of the current editing glyph in different contexts.

## Table of Contents

- [Opening the {{REFERENCE_PANEL_TITLE|}}](#opening-the-reference-panel)
- [Input Formats](#input-formats)
- [Operations](#operations)
- [Context Menu](#context-menu)
- [Drag and Drop](#drag-and-drop)

## Opening the {{REFERENCE_PANEL_TITLE|}}

There are two ways to open the {{REFERENCE_PANEL_TITLE|}}:

1. **Toolbar button**: Click the {{ICON_REFERENCE}} button in the toolbar
2. **Context menu**: Right-click inside the grid and select "{{CONTEXT_MENU_SHOW_REFERENCE_INPUT|}}"

Once open, the panel displays a text input area where you can enter reference characters.

## Input Formats

The {{REFERENCE_PANEL_TITLE|}} supports multiple input formats:

### Direct Character Input

Enter characters directly; all characters will be parsed individually:

```
永東國酬鷹
```

To specify a glyph name, use `/` prefix (see below).

### Glyph Name Format

Use a forward slash `/` prefix to specify glyph names:

```
/adieresis /Agrave /uni6C38
```

### Unicode Format

Multiple Unicode input methods are supported:

| Format | Example | Description |
|--------|---------|-------------|
| `/uniXXXX` | `/uni6C38` | 4-digit hexadecimal (official format) |
| `/uXXXXX` | `/u06C38` | 5-digit hexadecimal |
| `/XXXX` | `/6C38` | Pure 4-5 digit number (shorthand) |

### Mixed Input

You can mix different formats:

```
永 /adieresis 東 /uni0041 國
```

## Operations

### Save Reference Glyphs

After entering glyphs, click the "{{SAVE_REFERENCE_BUTTON|}}" button to save to {{PRESETS_WINDOW_TITLE|}}.

### Random Arrangement

Click inside the grid area (without any modifier keys) to randomly rearrange the reference glyphs.

> [!NOTE]
> The center cell (position 4) always displays the current editing glyph and will not be replaced by reference glyphs.

## Context Menu

Right-click in the {{REFERENCE_PANEL_TITLE|}} input area to open the context menu:

| Item | Description |
|------|-------------|
| {{CONTEXT_MENU_GLYPH_PICKER|}} | Open glyph picker for multi-selection |
| {{CONTEXT_MENU_INSERT_AT_CURSOR|}} | Insert reference text at cursor in Glyphs edit view |
| {{CONTEXT_MENU_OPEN_IN_NEW_TAB|}} | Open reference text in a new tab |

## Drag and Drop

### Basic Drag

Drag a glyph from inside the grid to another location:

| Action | Effect |
|--------|--------|
| Normal drag | Swap positions |
| Option + drag | Copy reference glyph (source preserved) |

### Drag to Glyphs Edit View

Drag a glyph from the grid to Glyphs' edit view:

| Action | Effect |
|--------|--------|
| Normal drag | Insert character at cursor position |
| Option + drag | Open the glyph in a new tab |

### Drag to {{REFERENCE_PANEL_TITLE|}}

Drag a glyph from the grid to the input area to quickly add reference characters:

- Accepts glyphs from any position in the grid
- Characters are inserted at the cursor position
- Spaces are automatically added around the insertion

> [!TIP]
> For more drag operations (Cmd mode, Shift mode), see [Advanced Features](advanced.html#advanced-drag-operations).

## Usage Tips

### Quick Test Groups

1. Enter commonly used test glyphs (e.g., "永東國酬")
2. Click "{{SAVE_REFERENCE_BUTTON|}}" to save to {{PRESETS_WINDOW_TITLE|}}
3. Quickly load from {{PRESETS_WINDOW_TITLE|}} later

### Observe Different Densities

Try using characters with different stroke densities as references:

```
一二三 酬鷹鬱
```

### Check Spacing

To observe the arrangement of identical characters, simply enter a single character:

```
國今
```

The system will automatically repeat that character in each grid position, making it easy to observe spacing and visual balance.

## Related Features

- [Lock Feature](guide-lock): Lock glyphs at specific positions
- [{{PRESETS_WINDOW_TITLE|}} Feature](guide-presets): Save commonly used glyph sets
- [Back to Home](guide)
