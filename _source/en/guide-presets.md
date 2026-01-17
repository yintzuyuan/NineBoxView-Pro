# {{GUIDE_NAV_PRESETS}}

The {{GUIDE_NAV_PRESETS}} feature allows you to save commonly used reference glyph combinations or locked configurations for quick switching between different testing scenarios.

## Table of Contents

- [Opening the {{PRESETS_WINDOW_TITLE|}}](#opening-the-presets-panel)
- [Tab Overview](#tab-overview)
- [Search and Sort](#search-and-sort)
- [Creating Presets](#creating-presets)
- [Managing Presets](#managing-presets)
- [Pin Feature](#pin-feature)
- [Import and Export](#import-and-export)

## Opening the {{PRESETS_WINDOW_TITLE|}}

There are two ways to open the {{PRESETS_WINDOW_TITLE|}}:

1. **Toolbar button**: Click the **{{ICON_PRESETS}}** button in the toolbar
2. **Context menu**: Right-click inside the grid and select "{{CONTEXT_MENU_SHOW_PRESETS|}}"

## Tab Overview

The {{PRESETS_WINDOW_TITLE|}} contains two tabs:

### {{PALETTE_TAB_REFERENCE|}} Tab

Stores reference glyph combinations. Each preset contains:

- Preset name
- Reference content (glyph list)
- Pin status

### {{PALETTE_TAB_LOCKED|}}

Stores locked glyph position configurations. Each preset contains:

- Preset name
- Locked glyph for each position
- Pin status

## Search and Sort

### Search Feature

Below the tab controls is a search field for quick preset filtering:

1. Enter keywords in the search box
2. The preset list filters in real-time
3. Search is case-insensitive
4. Clear the search box to restore the full list

> [!TIP]
> When no results are found, "{{SEARCH_NO_RESULTS|}}" is displayed.

### Sort Feature

Click the sort button at the bottom of the panel to choose a sort order:

| Sort Option | Description |
|-------------|-------------|
| {{SORT_NAME_AZ|}} | Sort by name alphabetically |
| {{SORT_NAME_ZA|}} | Sort by name in reverse alphabetical order |
| {{SORT_DATE_NEWEST|}} | Newest presets first |
| {{SORT_DATE_OLDEST|}} | Oldest presets first |

> [!NOTE]
> Sort settings are automatically saved and persist after restart.

## Creating Presets

### Creating {{PALETTE_TAB_REFERENCE|}} Presets

**Method 1: Save from {{REFERENCE_PANEL_TITLE|}}**

1. Enter characters in the {{REFERENCE_PANEL_TITLE|}}
2. Click the "{{SAVE_REFERENCE_BUTTON|}}" button
3. The preset is named after the reference content

**Method 2: Add from {{PRESETS_WINDOW_TITLE|}}**

1. Switch to the "{{PALETTE_TAB_REFERENCE|}}" tab
2. Click the {{ICON_PLUS}} button at the bottom of the panel
3. Current reference glyphs are saved as a new preset

### Creating {{PALETTE_TAB_LOCKED|}} Presets

**Method 1: Quick action**

1. Set up your locked glyph configuration
2. Hold **Cmd + Option**
3. Click the center cell
4. Current lock configuration is saved as a new preset

**Method 2: Add from {{PRESETS_WINDOW_TITLE|}}**

1. Switch to the "{{PALETTE_TAB_LOCKED|}}" tab
2. Click the {{ICON_PLUS}} button at the bottom of the panel
3. Current locked configuration is saved as a new preset

## Managing Presets

### Load Preset

Double-click any preset in the {{PRESETS_WINDOW_TITLE|}} to load its content.

### Rename

**Method 1: Keyboard shortcut**

1. Select a preset
2. Press **Enter** to enter edit mode
3. Type the new name

**Method 2: Context menu**

1. Right-click on a preset
2. Select "{{PALETTE_MENU_RENAME|}}"
3. Type the new name

### Overwrite Preset

1. Modify current reference or locked configuration
2. Right-click on the preset to overwrite
3. Select "{{PALETTE_MENU_OVERWRITE|}}"
4. Confirm overwrite

> [!CAUTION]
> Overwrite cannot be undone. Please confirm before proceeding.

### Delete Preset

**Method 1: Keyboard shortcut**

1. Select preset(s) (single or multiple)
2. Press **Delete** key

**Method 2: Context menu**

- **Single delete**: Right-click on a preset, select "{{PALETTE_MENU_DELETE|}}"
- **Batch delete**: Select multiple presets (Cmd + click or Shift + click), right-click and select "{{PALETTE_MENU_DELETE_MULTIPLE|}}"

### Context Menu

| Item | Description |
|------|-------------|
| {{PALETTE_MENU_PIN|}} / {{PALETTE_MENU_UNPIN|}} | Pin or unpin |
| {{PALETTE_MENU_RENAME|}} | Rename preset |
| {{PALETTE_MENU_OVERWRITE|}} | Replace with current content |
| {{PALETTE_MENU_DELETE|}} | Delete preset |

## Pin Feature

Pinned presets are fixed at the top of the list for quick access.

### Pinning

**Single pin**:

1. Right-click on a preset
2. Select "{{PALETTE_MENU_PIN|}}"

**Batch pin**:

1. Select multiple presets
2. Right-click and select "{{PALETTE_MENU_PIN_MULTIPLE|}}"

### Unpinning

1. Right-click on a pinned preset
2. Select "{{PALETTE_MENU_UNPIN|}}"

### Sort Rules

The preset list follows these sorting rules:

1. **Pinned presets**: Always displayed at the top
2. **Unpinned presets**: Sorted according to sort settings

Use the sort button to switch between four sort modes. Within each group (pinned/unpinned), presets are sorted according to the selected order.

## Import and Export

### Export Presets

**Export selected presets**:

1. Select presets to export
2. Click the **{{ICON_MORE}}** button at the bottom of the panel
3. Select "{{PRESETS_MENU_EXPORT_SELECTED|}}"
4. Choose save location

**Export all presets**:

1. Click the **{{ICON_MORE}}** button at the bottom of the panel
2. Select "{{PRESETS_MENU_EXPORT_ALL|}}"
3. Choose save location

### Export Format

Exported files are in JSON format with different extensions by preset type:

- **{{PALETTE_TAB_REFERENCE|}}**: `{{FILE_EXTENSION_REFERENCE|}}`
- **{{PALETTE_TAB_LOCKED|}}**: `{{FILE_EXTENSION_LOCKED|}}`

File contents include:

- Format marker
- ID numbers
- Preset data

> [!NOTE]
> Pin status is not preserved during export.

### Import Presets

1. Click the **{{ICON_MORE}}** button at the bottom of the panel
2. Select "{{PRESETS_MENU_IMPORT|}}"
3. Choose the file to import
4. Select import mode:
    - **{{PRESETS_IMPORT_MODE_APPEND|}}**: Append to existing presets
    - **{{PRESETS_IMPORT_MODE_REPLACE|}}**: Replace all existing presets

### Import Notes

The import dialog automatically filters file types based on the current tab:

- On {{PALETTE_TAB_REFERENCE|}} tab, only `{{FILE_EXTENSION_REFERENCE|}}` files are shown
- On {{PALETTE_TAB_LOCKED|}} tab, only `{{FILE_EXTENSION_LOCKED|}}` files are shown

### Import Error Messages

| Error | Description |
|-------|-------------|
| {{PRESETS_IMPORT_ERROR_INVALID_FORMAT|}} | Invalid file format |
| {{PRESETS_IMPORT_ERROR_UNSUPPORTED_VERSION|}} | File version too new, please update the plugin |
| {{PRESETS_IMPORT_ERROR_TYPE_MISMATCH|}} | File type doesn't match current tab |
| {{PRESETS_IMPORT_ERROR_EMPTY|}} | No valid presets found in file |

## Empty State

When a tab has no presets, a prompt message is displayed:

- **{{PALETTE_TAB_REFERENCE|}} tab**: "{{PALETTE_EMPTY_REFERENCE_LINE1|}} {{PALETTE_EMPTY_REFERENCE_LINE2|}}"
- **{{PALETTE_TAB_LOCKED|}} tab**: "{{PALETTE_EMPTY_LOCKED_LINE1|}} {{PALETTE_EMPTY_LOCKED_LINE2|}}"

## Usage Tips

### Create Presets for Different Languages

Create multiple test glyph sets, for example:

- "Traditional Chinese": 永東國酬鷹
- "Japanese Kana": あいうえお
- "Korean": 가나다라마

### Create Configurations for Different Projects

Use import/export to share presets across computers or projects:

1. Create commonly used presets on one computer
2. Export to file
3. Import on other computers

### Combine with Lock for Complete Testing

1. Create {{PALETTE_TAB_REFERENCE|}} presets: commonly used reference glyphs
2. Create {{PALETTE_TAB_LOCKED|}} presets: standard glyph position configurations
3. Quickly load both to create a complete testing environment

## Related Features

- [{{REFERENCE_PANEL_TITLE|}} Feature](guide-reference): Enter reference glyphs
- [{{PALETTE_TAB_LOCKED|}} Feature](guide-lock): Lock specific positions
- [Back to Home](guide)
