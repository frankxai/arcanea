---
name: ultrabook
description: Complete book pipeline from concept to publish-ready
---

# ultrabook / ulb

**THE ULTIMATE MAGIC WORD**

Complete book creation pipeline - from concept to publish-ready manuscript with artwork and music.

## Usage

```
ultrabook [book concept]
ulb [book concept]
```

Just include `ultrabook` or `ulb` in your prompt.

## Examples

```
ultrabook A complete novel set in the Shattered Isles about a reluctant hero
ulb "The Crimson Dawn" - Book 1 of the Shadowfire Trilogy
ultrabook A standalone novella exploring the fall of the Arcane Order
```

## What Happens

When you invoke `ultrabook`, Arcanea orchestrates the ENTIRE creative pipeline:

### Phase 1: World Foundation
```
┌─────────────────────────────────────────────────────────────┐
│  WORLD BUILDING (if needed)                                 │
│  ├── World Architect → Geography, cosmology                 │
│  ├── Archmage → Magic systems                               │
│  ├── Character Creator → Key figures                        │
│  └── Narrative Director → Conflicts, stakes                 │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2: Story Structure
```
┌─────────────────────────────────────────────────────────────┐
│  STORY PLANNING                                             │
│  ├── Story Architect → Complete outline                     │
│  ├── Character arcs across narrative                        │
│  ├── Chapter breakdown                                      │
│  └── Subplot integration                                    │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Chapter Writing (Parallel)
```
┌─────────────────────────────────────────────────────────────┐
│  CHAPTER DRAFTING (for each chapter)                        │
│  ├── Prose Weaver → Draft                                   │
│  ├── Voice Alchemist → Dialogue                             │
│  ├── Line Editor → Polish                                   │
│  └── Continuity Guardian → Validate                         │
└─────────────────────────────────────────────────────────────┘
```

### Phase 4: Editing Pipeline
```
┌─────────────────────────────────────────────────────────────┐
│  EDITING                                                    │
│  ├── Full continuity check                                  │
│  ├── Voice consistency pass                                 │
│  ├── Line editing                                           │
│  └── Final polish                                           │
└─────────────────────────────────────────────────────────────┘
```

### Phase 5: Production (Parallel)
```
┌─────────────────────────────────────────────────────────────┐
│  PRODUCTION                                                 │
│  ├── Visual Director → Cover art, character refs            │
│  ├── Sound Designer → Theme music                           │
│  └── Format Master → Export all formats                     │
└─────────────────────────────────────────────────────────────┘
```

## Output

Complete book package including:
- Full manuscript (all chapters)
- Cover artwork
- Character portraits
- Title theme music
- ePub, Kindle, and Print PDF
- Complete canon documentation

## Configuration

Control scope in `arcanea.json`:
```json
{
  "ultrabook": {
    "targetWordCount": 80000,
    "chaptersTarget": 25,
    "includeVisuals": true,
    "includeMusic": true,
    "exportFormats": ["epub", "kindle", "print"]
  }
}
```

## Flags

Override defaults with flags:
- `--chapters [X]`: Target chapter count
- `--words [X]`: Target word count
- `--no-visuals`: Skip art generation
- `--no-music`: Skip music generation
- `--outline-only`: Stop after outline phase
- `--draft-only`: Stop after drafting (skip production)

## Typical Timeline

For a ~80,000 word novel:
- World Building: If needed
- Outlining: ~30 minutes
- Drafting: ~2-4 hours (parallel chapters)
- Editing: ~1 hour
- Production: ~30 minutes

## Example Session

```
User: ultrabook "The Last Dragon Rider" - An epic fantasy about Kira, 
      a farm girl who discovers she can bond with dragons, in a world 
      where dragons have been extinct for a thousand years. First of 
      a planned trilogy. Dark but hopeful tone.

Arcanea: [Orchestrates complete pipeline]
         [24 hours later...]
         Complete book package delivered:
         - 82,000 word manuscript (26 chapters)
         - Cover art + 5 character portraits
         - Main theme + 3 character themes
         - ePub, Kindle, Print PDF ready
         - Full canon database
```
