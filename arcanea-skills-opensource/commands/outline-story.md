---
name: outline-story
description: Create a complete story structure outline with beats, arcs, and chapters
---

# /outline-story

Create a complete story structure with plot beats, character arcs, and chapter outlines.

## Usage

```
/outline-story [story concept or title]
```

## Examples

```
/outline-story A reluctant hero discovers they are the last dragon rider
/outline-story "The Shattered Crown" - political intrigue in the Northern Kingdoms
/outline-story Trilogy: A young mage's journey from apprentice to archmage
```

## What This Command Does

1. **Fires Story Architect** to create narrative structure
2. **Consults Lore Master** to ensure world consistency
3. **Queries Archivist** for existing canon connections
4. **Optionally consults Sage** for complex structural decisions

## Output Structure

The command produces:

### Story Foundation
- **Premise**: One-sentence hook
- **Theme**: Core thematic question
- **Genre**: Genre conventions to honor
- **Tone**: Emotional register

### Character Arcs
For each major character:
- Starting state → Catalyst → Transformation → End state
- Internal vs External conflict
- Relationship dynamics

### Plot Structure
- Act breakdowns with major beats
- Scene-by-scene chapter outlines
- Subplot integration points
- Foreshadowing map

### Technical Elements
- POV strategy
- Timeline structure
- Pacing rhythm plan

## Workflow

```
User → /outline-story concept
     ↓
Story Architect analyzes concept
     ↓
Lore Master validates world fit
     ↓
Archivist checks existing canon
     ↓
Structure document created
     ↓
Ready for /write-chapter
```

## Flags

- `--trilogy` or `-t`: Plan as multi-book series
- `--short` or `-s`: Novella/short story structure
- `--detailed` or `-d`: Scene-level breakdown
- `--saga`: Epic multi-generation structure
