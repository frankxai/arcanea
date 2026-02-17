---
name: compose-theme
description: Generate music and soundscapes for story elements
---

# /compose-theme

Generate thematic music for characters, locations, and scenes.

## Usage

```
/compose-theme [subject] --type [type]
```

## Examples

```
/compose-theme Kira --type character
/compose-theme "The Northern Kingdoms" --type location
/compose-theme "The Final Battle" --type action
/compose-theme --type title
/compose-theme "love theme" --type motif
```

## What This Command Does

1. **Sound Designer** translates narrative to musical direction
2. **Archivist** retrieves character/location essence
3. **suno MCP** generates the music
4. Leitmotifs are catalogued for consistency

## Theme Types

### `character`
Personal leitmotif for a character
- Reflects personality, journey, essence
- Multiple variations (heroic, vulnerable, dark)

### `location`
Realm or place theme
- Captures atmosphere and culture
- Can include ambient elements

### `action`
Battle or action sequence music
- High energy, dramatic
- Builds and releases tension

### `title`
Main theme / title music
- Represents the overall story
- Memorable, iconic hook

### `motif`
Abstract concept theme
- Love, danger, hope, etc.
- Recurring musical idea

### `ambient`
Background atmosphere
- Environmental soundscape
- Mood setting

## Output Structure

```markdown
## Audio Asset: [Subject]

### Type
[Theme type]

### Narrative Context
> [Character/location essence or scene context]

### Musical Direction
- Genre: [Style]
- Tempo: [BPM]
- Mood: [Emotional tone]
- Key instruments: [List]

### Generated Prompt
[The prompt sent to Suno]

### Result
[Generated audio link/reference]

### Leitmotif Notes
[Melodic/harmonic elements to maintain]

### Variations
- Standard version
- [Emotional variation 1]
- [Emotional variation 2]

### Related Themes
[Connections to other themes in the score]
```

## Workflow

```
User → /compose-theme subject --type type
     ↓
Archivist retrieves character/location essence
     ↓
Sound Designer crafts musical direction
     ↓
suno MCP generates track
     ↓
Sound Designer reviews, may iterate
     ↓
Leitmotif catalogued in audio guide
```

## Genre Presets

- `epic-orchestra`: Full orchestral, cinematic
- `dark-ambient`: Atmospheric, unsettling
- `celtic-folk`: Traditional instruments, folksy
- `electronic-hybrid`: Modern/orchestral blend
- `intimate-piano`: Solo piano, emotional
- `world-fusion`: Multi-cultural blend

## Flags

- `--type [type]`: Theme type (required for new subjects)
- `--genre [genre]`: Override default genre
- `--duration [seconds]`: Target length
- `--instrumental`: No vocals (default for most)
- `--vocal`: Include vocals
- `--lyrics [text]`: Provide lyrics for vocal piece
- `--energy [low/medium/high]`: Energy level
- `--variation [mood]`: Generate specific variation
