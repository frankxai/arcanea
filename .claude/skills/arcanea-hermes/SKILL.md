---
name: arcanea-hermes
description: Intake + conversion pipeline for inbound Arcanea creative captures. Classifies a capture (lore note, monster concept, character sketch, concept art, Guardian voice memo, music seed, world fragment), grades its canon fit, and fans it to the right producers in parallel. Auto-activates on "intake this", "convert this concept", "run hermes on", "classify this capture", or when files land under _inbox/arcanea/**. Never auto-publishes — outputs go to a review queue. Composes the arcanea-canon gate before any new entity lands.
---

# Arcanea Hermes

> *"Route to every mind that needs to know. Synthesize before you speak — and never speak canon into stone without the lock."*

Hermes is the messenger between raw creative capture and finished production. It composes two proven patterns: the **L2 classify → L3 parallel-dispatch** intake architecture and the **synthesis lifecycle** of a search swarm. It does one thing well — turn one capture into N producer dispatches, canon-gated, with nothing published automatically.

## When this skill activates

- User says "intake this", "convert this concept", "run hermes on X", "classify this capture", "fan this out"
- A file lands under `_inbox/arcanea/**`
- The `/hermes` command fires
- The `arcanea-hermes` agent is dispatched

Do NOT activate for:
- Pure canon-consistency checks with no conversion (use the `arcanea-canon` skill directly)
- A single producer call where the routing is already known (call the producer directly — orchestrator overhead is not justified for one dispatch)
- Re-running an already-shipped batch (the pipeline is forward-only by design)

## Substrate (read first)

Read in order before any classification:

1. `.arcanea/intake/capture-types.ts` — 7 capture types, mime + extension matchers, `defaultCanonTier`
2. `.arcanea/intake/canon-spectrum.ts` — the canon ↔ tech axis + `classifyCanonFit(signals)` tier guesser
3. `.arcanea/intake/producers.ts` — 5 producers, accepted capture types, `producersAcceptingCaptureType(type)`
4. `.arcanea/lore/creatures/MONSTER_SYSTEM.md` — the T0–T4 ladder the tiers map to
5. `.arcanea/lore/CANON_LOCKED.md` — the locked mythology any new entity must not contradict

If the substrate conflicts with anything below, the substrate wins.

Workflow context: the three intake/conversion loops are documented at `.arcanea/WORKFLOWS.md`.

---

## The 4-phase loop

### Phase 1 — Intake

For each capture in the batch:

1. **Identify the capture type.** Run `inferCaptureType(mime, extension)` from `capture-types.ts`. If it returns nothing, surface it to the operator — never guess silently.
2. **Read the capture multimodally.** Image → subject + element(s) + named entity (if any). Audio → transcribe first (Guardian wisdom + music seed). Text → read directly.
3. **Extract canon signals** and run `classifyCanonFit(signals)` from `canon-spectrum.ts`. This returns `{ spectrum, canonTier, requiresCanonGate }`. New T3/T4 entities always come back `requiresCanonGate: true`.
4. **Suggest producers** via `producersAcceptingCaptureType(captureType)`. Note each producer's `status` — defer dispatch to `planned` producers and say so.
5. **Write the batch manifest** to `_inbox/arcanea/<batch>/manifest.json`:

```jsonc
{
  "id": "<YYYY-MM-DD-slug>",
  "createdAt": "<iso>",
  "state": "classified",            // classified → dispatched → ready-for-review
  "captures": [
    {
      "path": "_inbox/arcanea/<batch>/<file>",
      "captureType": "monster-concept",
      "spectrum": "canon",
      "canonTier": "T3",
      "requiresCanonGate": true,
      "suggestedProducers": ["world-builder", "vis-producer"],
      "rationale": "<one line — direct, no AI-slop>"
    }
  ],
  "dominantSpectrum": "canon"
}
```

Do NOT dispatch in Phase 1. Classification only.

### Phase 2 — Orchestrate

Dispatch every validated producer **in parallel, in ONE message** via the Task tool (the repo's concurrency rule: one message = all related agent calls).

- Map each `suggestedProducer` to its producer in `producers.ts`. Skip + note any `planned` producer.
- Pass each producer: the capture paths it consumes, the canon fit, and its output directory `_inbox/arcanea/<batch>/<producer-id>/`.
- Producers that are independent (e.g. `vis-producer` + `lore-producer`) run concurrently. Where one feeds another (a Guardian-wisdom memo must be transcribed before `prose-producer` works it), order them.
- Each producer writes its own outputs under its subfolder and a `manifest.json`. It publishes nothing.

### Phase 3 — Canon-gate

Before any new entity is considered done:

1. Run the **`arcanea-canon`** skill on every capture where `requiresCanonGate` is true (all new T3/T4 entities, plus any new entity referencing locked canon).
2. A new T3/T4 entity lands as **STAGING** in `CANON_LOCKED.md` — appended to the staging section, clearly marked, **never** written into the locked tiers.
3. **LOCKED status requires `lock-decision` by Frank.** Hermes never promotes STAGING → LOCKED on its own. A creature stays a proposal until the human locks it.
4. If the canon check finds a contradiction with locked mythology, mark the capture `canon-blocked` in the manifest and surface the reason in one actionable line.

This phase is non-waivable. Hermes can fan out freely, but the mythology only changes by Frank's hand.

### Phase 4 — Synthesize

1. Collate every producer's output into a batch-level ship note at `_inbox/arcanea/<batch>/SHIP-NOTE.md`: captures in, producers run (and deferred, with reasons), canon-gate verdicts, what is ready for review, what is `canon-blocked`.
2. Hand off finished assets to the **DAM / image registry** entry (for visual output) and to the relevant `book/` or `.arcanea/lore` review path (for text). Handoff = a pointer in the ship note, not a live write.
3. Mark the manifest `state: ready-for-review`. Stop. The operator advances it.

---

## Critical invariants

- **NEVER auto-publishes.** Every output lands in the `_inbox/arcanea/<batch>/` review queue. Nothing touches the live site, `book/` proper, or the locked canon without human review.
- **New T3/T4 entities are STAGING, never LOCKED.** Only `lock-decision` by Frank locks canon.
- **No silent drops.** Every capture produces a manifest entry, even when classified as unknown — surface it.
- **Substrate is truth.** If `producers.ts` says a producer is `planned`, defer; don't improvise a dispatch.
- **Voice gate on text.** Prose + lore output passes the `arcanea-voice` brand-voice check (arcane + authoritative; never AI-slop — no "delve", "tapestry", "it's worth noting").
- **Parallel where safe, sequential where required.** Transcription before prose; canon-check before any entity is called done.

## Composition

| When you need… | Use |
|---|---|
| Canon consistency check on a new entity | `arcanea-canon` skill |
| Lock a STAGING entity into canon | `lock-decision` (Frank only) |
| Brand-voice gate on generated prose | `arcanea-voice` skill |
| Deep mythology reference | `arcanea-lore` skill |
| The producer registry + dispatch lookup | `.arcanea/intake/producers.ts` |

## Anti-patterns

- ❌ Auto-publishing producer output (handoff to the review queue only)
- ❌ Writing a new creature straight into a locked Monster tier (STAGING only, T3/T4 gated)
- ❌ Promoting STAGING → LOCKED without `lock-decision`
- ❌ Dispatching a `planned` producer (defer, don't try)
- ❌ Guessing a capture type when `inferCaptureType` returns nothing (surface it)
- ❌ Running producers sequentially when they're independent (one parallel message)
