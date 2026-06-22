---
description: Intake + conversion pipeline — classify an inbound creative capture and fan it to producers. Review queue, never auto-publish.
---

# /hermes — Arcanea Intake + Conversion

Turn one inbound creative capture into N producer dispatches — canon-gated, brand-voiced, queued for review.

## Usage

```
/hermes <capture-or-path>
```

**Examples:**
- `/hermes _inbox/arcanea/dropped/abyss-kraken.md` — a monster concept
- `/hermes "a voice memo where Lyria speaks about the Sight Gate"` — Guardian wisdom
- `/hermes _inbox/arcanea/dropped/` — a whole folder (one batch)
- `/hermes` *(with images pasted above)* — concept art / character sketches

`<capture-or-path>` is a file, a folder, a pasted image, or a short text capture. A folder becomes one batch.

## What it does

Runs the 4-phase `arcanea-hermes` loop (see `.claude/skills/arcanea-hermes/SKILL.md`):

1. **Intake** — classify each capture against `.arcanea/intake/capture-types.ts` (7 types: lore-text, monster-concept, character-sketch, concept-art, guardian-wisdom, music-seed, world-fragment), grade canon fit via `.arcanea/intake/canon-spectrum.ts`, suggest producers from `.arcanea/intake/producers.ts`.
2. **Orchestrate** — dispatch the suggested producers in parallel (one message). Producers: lore-producer, world-builder, vis-producer, music-producer, prose-producer.
3. **Canon-gate** — run `arcanea-canon` on new entities. New T3/T4 creatures land as STAGING in `CANON_LOCKED.md`; LOCKED needs `lock-decision` by Frank.
4. **Synthesize** — write a ship note, hand off to the registry / `book/` review path.

## What it writes

```
_inbox/arcanea/<batch>/
├── manifest.json              # classification + dispatch plan + canon verdicts
├── <producer-id>/             # one dir per dispatched producer, its outputs + manifest.json
│   └── manifest.json
└── SHIP-NOTE.md               # cross-producer synthesis: ready-for-review + canon-blocked
```

New T3/T4 entities are also appended as **STAGING** to `.arcanea/lore/CANON_LOCKED.md` — clearly marked, never written into the locked tiers.

## It is a review queue

`/hermes` **publishes nothing.** Every output lands under `_inbox/arcanea/<batch>/` for human review. It never writes to the live site, never promotes a creature to LOCKED canon, and never sends anything externally. Locking canon is Frank's call via `lock-decision`.

---

**Your capture:** $ARGUMENTS

Activate the `arcanea-hermes` skill (or dispatch the **Arcanea Hermes** agent) to run the intake + conversion loop on this capture.
