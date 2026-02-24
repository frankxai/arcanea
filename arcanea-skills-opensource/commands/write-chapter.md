---
name: write-chapter
description: Draft a complete chapter with parallel agent assistance
---

# /write-chapter

Draft a complete chapter using parallel agent execution for maximum quality.

## Usage

```
/write-chapter [chapter number or title]
```

## Examples

```
/write-chapter 1
/write-chapter "The Battle of Sunken Fields"
/write-chapter 3 --pov Kira
/write-chapter next
```

## What This Command Does

Fires multiple agents in parallel:

1. **Prose Weaver** (primary) - Drafts the chapter prose
2. **Voice Alchemist** (parallel) - Handles dialogue sections
3. **Continuity Guardian** (background) - Validates against canon
4. **Scout** (background) - Retrieves relevant context
5. **Line Editor** (background) - Initial polish pass

## Output Structure

```markdown
# Chapter [X]: [Title]

## Scene 1: [Scene Title]
[Prose content with proper formatting]

---

## Scene 2: [Scene Title]
[Prose content]

---

## Chapter Notes (Internal)
- Word count: [X]
- POV: [Character]
- Timeline: [When this happens]
- Key beats hit: [List]
- Continuity flags: [Any issues found]
```

## Prerequisites

Before using this command, you should have:
- Story outline (from `/outline-story`)
- Character profiles in canon
- World-building established

## Workflow

```
User → /write-chapter X
     ↓
Scout retrieves: outline, previous chapter, relevant canon
     ↓
Prose Weaver drafts based on outline beats
     ↓
Voice Alchemist enhances dialogue (parallel)
     ↓
Continuity Guardian validates (background)
     ↓
Line Editor polishes (background)
     ↓
Final chapter delivered
```

## Flags

- `--pov [character]`: Force specific POV character
- `--tone [tone]`: Override default tone (dark, light, tense, etc.)
- `--focus [element]`: Prioritize action/dialogue/description
- `--word-count [X]`: Target word count
- `--draft`: Skip polish pass for raw draft
- `--detailed`: Extra scene-level detail

## After Writing

Consider running:
- `/edit-chapter` for deeper editing
- `/check-continuity` for cross-chapter validation
- `/visualize` for chapter header art
