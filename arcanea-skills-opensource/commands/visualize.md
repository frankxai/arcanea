---
name: visualize
description: Generate artwork for story elements using AI image generation
---

# /visualize

Generate visual artwork for characters, scenes, locations, and covers.

## Usage

```
/visualize [subject] --type [type]
```

## Examples

```
/visualize Kira --type portrait
/visualize "The Battle of Sunken Fields" --type scene
/visualize "Shattered Isles" --type map-concept
/visualize --type cover
/visualize Chapter 3 --type header
```

## What This Command Does

1. **Visual Director** translates narrative to visual prompts
2. **Archivist** retrieves canonical descriptions
3. **nano-banana MCP** generates the image
4. Visual assets are catalogued for consistency

## Asset Types

### `portrait`
Character portraits with consistent features
- Full reference sheet on first generation
- Subsequent images maintain consistency

### `scene`
Illustrated scenes from the narrative
- Action moments, emotional beats
- Composition focused on storytelling

### `location`
Environment and setting artwork
- Establishing shots
- Mood and atmosphere focused

### `cover`
Book cover concepts
- Includes space for title/author
- Genre-appropriate composition

### `header`
Chapter header illustrations
- Smaller, focused images
- Consistent style across book

### `map-concept`
Stylized map artwork
- Fantasy cartography style
- Region or world maps

## Output Structure

```markdown
## Visual Asset: [Subject]

### Type
[Asset type]

### Reference Text
> [Canonical description used]

### Generated Prompt
[The prompt sent to image generator]

### Result
[Generated image link/reference]

### Consistency Notes
[Features to maintain in future images]

### Variations Generated
- Variation 1: [description]
- Variation 2: [description]

### Added to Style Guide
[Yes/No - new character/location refs]
```

## Workflow

```
User → /visualize subject --type type
     ↓
Archivist retrieves canonical description
     ↓
Visual Director crafts prompt
     ↓
nano-banana generates image
     ↓
Visual Director reviews, may iterate
     ↓
Asset catalogued in style guide
```

## Style Presets

Can be combined with `--style`:
- `epic-fantasy`: Rich colors, dramatic lighting
- `dark-fantasy`: Desaturated, ominous
- `watercolor`: Soft, artistic
- `concept-art`: Professional reference style
- `vintage`: Classic illustration feel
- `minimal`: Clean, modern

## Flags

- `--type [type]`: Asset type (required for new subjects)
- `--style [style]`: Override default style
- `--variations [X]`: Generate X variations
- `--reference [path]`: Use existing image as reference
- `--aspect [ratio]`: Custom aspect ratio (e.g., 2:3)
- `--update`: Update existing character/location reference
