# FAQ

This page compiles the most frequently asked questions and answers when using {{NINE_BOX_VIEW}}.

## Table of Contents

- [Installation & Compatibility](#installation--compatibility)
- [Reference Glyphs](#reference-glyphs)
- [Locked Glyphs](#locked-glyphs)
- [Presets](#presets)
- [Licensing](#licensing)
- [Other Questions](#other-questions)

## Installation & Compatibility

### Which Glyphs versions are supported?

{{NINE_BOX_VIEW}} supports Glyphs 3 and requires macOS 12.0 or later.

### Can't find the plugin after installation?

Please confirm you restarted Glyphs after installation, then look for {{NINE_BOX_VIEW}} in the **{{GLYPHS_VIEW_MENU}}** menu.

### Can I install both free and Pro versions?

Yes, data from both versions is stored separately and won't interfere with each other.

## Reference Glyphs

### Entered characters not showing?

Possible reasons:

1. **Glyph doesn't exist**: Confirm the glyph exists in the current font file
2. **Wrong input format**: When using glyph names, prefix with `/`, e.g., `/adieresis`

### How to enter Unicode characters?

The following formats are supported:

| Format | Example |
|--------|---------|
| `/uniXXXX` | `/uni6C38` (official format) |
| `/uXXXXX` | `/u06C38` (5-digit) |
| `/XXXX` | `/6C38` (pure 4-5 digit number) |

### Is there a pattern to random arrangement?

Random arrangement distributes reference glyphs randomly to non-locked empty positions. The center cell (position 4) always displays the current editing glyph and won't be replaced by reference glyphs.

## Locked Glyphs

### Why can't the center cell be locked?

The center cell (position 4) always displays the current editing glyph — this is a core feature of {{NINE_BOX_VIEW}}. Keeping the center cell showing the editing glyph allows you to see design changes in the grid context in real-time.

### How to clear all locks at once?

Hold **Cmd+Opt** and click the center cell to clear all position locks.

### Where is locked glyph data stored?

Locked glyph data is stored in the font file (`GSFont.userData`) and saved with the file. Lock settings are restored when reopening the font file.

## Presets

### What's the difference between reference and lock presets?

| Type | Stored Content | Purpose |
|------|----------------|---------|
| {{PALETTE_TAB_REFERENCE|}} | Reference input text | Quickly switch between different test glyph sets |
| {{PALETTE_TAB_LOCKED|}} | Locked position configuration | Save specific grid arrangements |

### Can presets be used across files?

Yes. Presets are stored in application settings (NSUserDefaults) and can be shared across different font files.

### How to share presets between computers?

Use the import/export feature:

1. On the source computer, click "{{PRESETS_MENU_EXPORT_ALL|}}" to export a JSON file
2. Transfer the JSON file to the target computer
3. On the target computer, click "{{PRESETS_MENU_IMPORT|}}" to import

> [!NOTE]
> Pin status is not preserved during export.

### Should I choose "Append" or "Replace All" when importing?

| Option | Effect |
|--------|--------|
| {{PRESETS_IMPORT_MODE_APPEND|}} | Keep existing presets, add imported presets |
| {{PRESETS_IMPORT_MODE_REPLACE|}} | Clear existing presets, keep only imported presets |

> [!TIP]
> If unsure, we recommend choosing "{{PRESETS_IMPORT_MODE_APPEND|}}" first, then manually delete unwanted presets.

## Licensing

### Are there any restrictions during trial?

During the trial period (14 days), you have access to all features of {{NINE_BOX_VIEW}} without any restrictions.

### Can I use the license on multiple computers?

Yes, you can use the same license key on multiple computers you own.

### What if I lose my license key?

Contact the developer via "{{INFO_MENU_CONTACT_US|}}" with the email address used for purchase, and we'll help you recover your license key.

### Do I need to reactivate after changing computers?

Yes, you need to re-enter the license key on a new computer. The license key never expires and can be used unlimited times.

## Other Questions

### What is the blur feature for?

The blur feature applies a blur effect to the entire grid window, allowing you to check the overall gray distribution of all characters without being distracted by individual stroke details.

### Reference glyphs disappeared when holding Shift?

This is normal behavior (Solo mode). Release Shift to restore.

If you have [{{LIGHT_TABLE}}](https://formkunft.com/light-table/) installed and its comparison tool active, Shift will instead trigger version comparison.

### How to report issues?

Click "{{INFO_MENU_FEEDBACK|}}" in the info menu, describe the issue along with your macOS and Glyphs versions.

## Related Features

- [Back to Home](guide)
- [{{REFERENCE_PANEL_TITLE|}} Feature](guide-reference)
- [{{PALETTE_TAB_LOCKED|}} Feature](guide-lock)
- [{{PRESETS_WINDOW_TITLE|}} Feature](guide-presets)
- [Advanced Features](guide-advanced)
- [License & Trial](guide-license)
