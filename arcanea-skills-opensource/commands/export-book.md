---
name: export-book
description: Format and export manuscript to publishing-ready formats
---

# /export-book

Transform manuscript into professional, publishing-ready formats.

## Usage

```
/export-book [format]
```

## Examples

```
/export-book epub
/export-book print
/export-book all
/export-book kindle --preview
/export-book web --chapters 1-5
```

## What This Command Does

1. **Format Master** handles all conversion and formatting
2. **Visual Director** provides cover and interior art
3. **Archivist** supplies metadata
4. Multiple format outputs generated

## Export Formats

### `epub`
Standard ePub 3.0 format
- Reflowable text
- Embedded fonts
- Full navigation
- Compatible with most e-readers

### `kindle`
Amazon Kindle format (KF8/MOBI)
- Optimized for Kindle devices
- Enhanced typography
- Look Inside ready

### `print`
Print-ready PDF
- Professional interior layout
- Proper margins and gutters
- CMYK color space
- Bleed marks if needed

### `web`
Web-optimized HTML
- Responsive design
- Chapter navigation
- SEO optimized

### `all`
Generate all formats in one command

## Output Structure

```markdown
## Export Package: [Book Title]

### Metadata
- Title: [Title]
- Author: [Author]
- Series: [Series, Book #]
- ISBN: [If assigned]

### Formats Generated

**ePub**:
- File: exports/[title].epub
- Size: [X MB]
- Validation: [EPUBCheck status]

**Kindle**:
- File: exports/[title].mobi
- Size: [X MB]
- Preview: [link]

**Print PDF**:
- File: exports/[title]-print.pdf
- Page count: [X]
- Trim size: [6x9]

### Included Elements
- [x] Front matter (title, copyright, TOC)
- [x] All chapters
- [x] Back matter (about, also by)
- [x] Cover image
- [ ] Interior illustrations

### Quality Checks
- [x] Spell check passed
- [x] TOC links verified
- [x] Images optimized
- [x] Metadata complete
```

## Workflow

```
User → /export-book format
     ↓
Format Master gathers manuscript files
     ↓
Visual Director provides art assets
     ↓
Archivist provides metadata
     ↓
Conversion and formatting
     ↓
Validation checks
     ↓
Export package delivered
```

## Configuration

Export settings in `arcanea.json`:
```json
{
  "export": {
    "trimSize": "6x9",
    "font": "Garamond",
    "fontSize": 11,
    "lineHeight": 1.5,
    "margins": { "inside": 0.875, "outside": 0.625 }
  }
}
```

## Flags

- `--preview`: Generate preview/sample only
- `--chapters [range]`: Export specific chapters (e.g., 1-5)
- `--no-cover`: Skip cover inclusion
- `--draft`: Include "DRAFT" watermark
- `--validate-only`: Run validation without export
- `--metadata [path]`: Use custom metadata file
