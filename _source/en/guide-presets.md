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

| Tab | Stores |
|-----|--------|
| {{PALETTE_TAB_REFERENCE|}} | Reference glyph combinations |
| {{PALETTE_TAB_LOCKED|}} | Locked glyph position configurations |

Each preset contains a name, content, and pin status.

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

After setting up reference glyphs or locked glyphs, save them as presets through:

| Entry Point | {{PALETTE_TAB_REFERENCE|}} | {{PALETTE_TAB_LOCKED|}} |
|-----|--------|--------|
| Dedicated Panel | Click "{{SAVE_REFERENCE_BUTTON|}}" button | Click "{{SAVE_LOCKED_BUTTON|}}" button |
| {{PRESETS_WINDOW_TITLE|}} | Switch to tab, click {{ICON_PLUS}} | Switch to tab, click {{ICON_PLUS}} |
| Shortcut | — | ⌘ + ⇧ + Click center cell |

> [!TIP]
> New presets are auto-named by content. You can rename them later.

## Managing Presets

| Action | Shortcut | Context Menu |
|--------|----------|--------------|
| Load | Double-click preset | — |
| Rename | Select, press Enter | {{PALETTE_MENU_RENAME|}} |
| Overwrite | — | {{PALETTE_MENU_OVERWRITE|}} |
| Delete | Select, press Delete | {{PALETTE_MENU_DELETE|}} |

> [!TIP]
> Multi-select: ⌘ + click (toggle) or ⇧ + click (range).

> [!CAUTION]
> Overwrite cannot be undone. Please confirm before proceeding.

## Pin Feature

Pinned presets are fixed at the top of the list.

| Action | Context Menu |
|--------|--------------|
| Pin | {{PALETTE_MENU_PIN|}} |
| Batch pin | {{PALETTE_MENU_PIN_MULTIPLE|}} |
| Unpin | {{PALETTE_MENU_UNPIN|}} |

Pinned presets always appear at the top; unpinned presets follow the sort settings.

## Import and Export

Click the **{{ICON_MORE}}** button at the bottom of the panel:

| Action | Menu Item |
|--------|-----------|
| Export selected | {{PRESETS_MENU_EXPORT_SELECTED|}} |
| Export all | {{PRESETS_MENU_EXPORT_ALL|}} |
| Import | {{PRESETS_MENU_IMPORT|}} |

### File Format

| Tab | Extension |
|-----|-----------|
| {{PALETTE_TAB_REFERENCE|}} | `{{FILE_EXTENSION_REFERENCE|}}` |
| {{PALETTE_TAB_LOCKED|}} | `{{FILE_EXTENSION_LOCKED|}}` |

When importing, choose append ({{PRESETS_IMPORT_MODE_APPEND|}}) or replace ({{PRESETS_IMPORT_MODE_REPLACE|}}) existing presets.

> [!NOTE]
> Pin status is not preserved during export. The import dialog automatically filters files by the current tab type.

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
