---
name: edit-chapter
description: Multi-pass editing pipeline for chapter refinement
---

# /edit-chapter

Run a complete multi-pass editing pipeline on a chapter draft.

## Usage

```
/edit-chapter [chapter number or path]
```

## Examples

```
/edit-chapter 3
/edit-chapter manuscripts/chapters/chapter-03.md
/edit-chapter 5 --deep
/edit-chapter 2 --focus voice
```

## What This Command Does

Executes a multi-pass editing pipeline:

### Pass 1: Structural (Story Architect)
- Verify scene beats hit correctly
- Check pacing and flow
- Validate chapter arc

### Pass 2: Voice (Voice Alchemist)
- Ensure character voice consistency
- Dialogue authenticity check
- POV discipline

### Pass 3: Prose (Line Editor)
- Tighten prose, cut unnecessary words
- Fix weak constructions
- Improve rhythm and flow

### Pass 4: Continuity (Continuity Guardian)
- Cross-reference against canon
- Check timeline consistency
- Validate character knowledge

### Pass 5: Final Polish (Line Editor)
- Grammar and punctuation
- Final word choice refinement
- Quality assurance

## Output Structure

```markdown
## Edit Report: Chapter [X]

### Summary
- Original word count: [X]
- Final word count: [Y]
- Major changes: [List]
- Issues resolved: [List]
- Flags for author: [Any decisions needed]

### Pass Results

**Structural**:
- [Findings and changes]

**Voice**:
- [Findings and changes]

**Prose**:
- [Findings and changes]

**Continuity**:
- [Findings and changes]

### Edited Chapter
[Full edited chapter text]

### Questions for Author
- [Any choices that need author input]
```

## Edit Intensity Levels

`--light`: Grammar, typos, obvious issues only
`--standard`: Full pipeline (default)
`--deep`: Multiple iterations, significant restructuring allowed

## Workflow

```
User → /edit-chapter X
     ↓
Story Architect: structural pass
     ↓
Voice Alchemist: voice/dialogue pass
     ↓
Line Editor: prose tightening
     ↓
Continuity Guardian: consistency check
     ↓
Line Editor: final polish
     ↓
Edited chapter + report delivered
```

## Flags

- `--light`: Light touch edit only
- `--deep`: Deep edit with restructuring
- `--focus [area]`: Prioritize specific area (structure/voice/prose/continuity)
- `--preserve-voice`: Extra caution with author voice
- `--aggressive`: More aggressive cuts and changes
- `--report-only`: Analysis without changes
