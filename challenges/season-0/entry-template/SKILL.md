---
name: entry-template
description: Template workflow for a Worldsmith Trials entry - replace this with a third-person description of what your world-creation workflow does and when to use it
version: 0.1.0
---

# Your Workflow Name

<!--
This is a template. Replace everything with your actual workflow.
Rules that the validator enforces:
- frontmatter `name`: lowercase-hyphenated, must equal the part of your entry
  directory after `<handle>--`
- frontmatter `description`: third person, max 1024 characters
- body: max 500 lines
-->

## What This Skill Does

Describe the workflow: how it takes a world seed and generates a complete world
(cosmology, systems, geography, factions, timeline) within Arcanea canon.

## Inputs

- A world seed (one paragraph — the season publishes these)
- `CANON_LOCKED.md` as the canon constraint reference

## Steps

1. Describe each step of your workflow precisely enough that a fresh Claude Code
   session can execute it against a seed it has never seen.
2. ...

## Outputs

Five markdown files in `world/`: `cosmology.md`, `systems.md`, `geography.md`,
`factions.md`, `timeline.md`.
