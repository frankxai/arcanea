# Arcanea Story Progression — Mission Control

> **Status**: STAGING — build plan for autonomous CLI execution. Nothing here modifies `CANON_LOCKED.md`.
> **Branch**: `claude/arcanea-story-progression-15x460`
> **Operator**: Starlight Intelligence Operator (see [`STARLIGHT_GOVERNANCE.md`](./STARLIGHT_GOVERNANCE.md))
> **Enforcer**: The Starlight Queen + her Board of Five
> **Executors**: Codex CLI / Grok CLI (build agents)

---

## What this is

A **build-ready plan** that takes Arcanea's first staged arc — *The Founding* ("Seven Impossible People",
`/.arcanea/lore/STORY_ENGINE.md` Arc 1) — and progresses it from synopsis into shippable Season One:
written episodes, canonical world-state deltas, and a franchise-grade visual key-art set.

It is written so a **headless CLI agent** (Codex or Grok) can pick up the backlog, do the work, and gate
its own output against an explicit quality bar before anything is proposed for canon.

## The four documents

| File | Purpose | Who reads it |
|---|---|---|
| [`STARLIGHT_GOVERNANCE.md`](./STARLIGHT_GOVERNANCE.md) | The operator role, the Queen's enforcement loop, the Board's five-lens excellence rubric (each lens a veto). | Every agent, every commit |
| [`WORLD_PROGRESSION_EPOCH.md`](./WORLD_PROGRESSION_EPOCH.md) | The actual story + world progression. Season One episode map and the canonical **world-state deltas** *The Founding* causes. | Lore/story agents |
| [`VISUAL_PLAN.md`](./VISUAL_PLAN.md) | The visual asset manifest — shot list, prompts, and pipeline, locked to `VISUAL_DOCTRINE.md`. | Visual/gen agents |
| [`EXECUTION_BACKLOG.md`](./EXECUTION_BACKLOG.md) | Discrete, ordered tasks with file paths, acceptance criteria, and Board sign-off checkboxes. | The CLI executor |

## The one rule above all rules

**`CANON_LOCKED.md` is immutable here.** Every output of this plan lands in *staging* (new files under
`.arcanea/lore/staging/` or `docs/story-progression/`), marked `Status: STAGING`, and waits for Creator
(Frank) approval before promotion. Agents propose; the Creator promotes. No exceptions.

## How to run it (CLI executor)

```
1. Read STARLIGHT_GOVERNANCE.md   → internalize the role + the 5-lens rubric.
2. Read WORLD_PROGRESSION_EPOCH.md → load the canon-consistent target state.
3. Open EXECUTION_BACKLOG.md       → take the next unchecked task in order.
4. Do the work in a staging file.  → never edit a LOCKED file.
5. Self-score against the Board.   → any lens scoring <4/5 = revise, do not ship.
6. Commit with the task ID.        → check the box, record the score line.
7. Repeat until the gate task (T-09) passes all five lenses.
```
