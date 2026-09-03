# Arcanea Migration Ledger — Starlight Boundary — 2026-09-03

**Status:** REVIEWABLE MIGRATION RECORD

No contradictory idea is silently deleted. This ledger records what is being superseded, why, and where the replacement lives.

## Canon authority

The authoritative Arcanea canon remains:

`.arcanea/lore/CANON_LOCKED.md`

Legacy and working files under `arcanea-lore/`, publishing surfaces, generated codices, and library content do not supersede that file merely because they contain canon-like prose.

## MIG-001 — mystical “Starlight Intelligence”

**Previous STAGING concept:** `Starlight Intelligence` as “the mythic force of cosmic awareness within Arcanea.”

**Conflict:** Starlight Intelligence is also the real-world Starlight institution and civilizational philosophy. Reusing that exact name for an in-world metaphysical state collapses fiction, brand, and worldview.

**Replacement:** `Starweave Attunement`.

**Definition:** an explicitly fictional Arcanean discipline/state in which experienced characters become unusually sensitive to stellar patterns, Gate relationships, long-horizon signals, and the systemic state of their world.

**Status:** STAGING, not locked canon.

**Preserved history:** the former wording remains visible through Git history and this migration record.

## MIG-002 — Starlight Corps

**Decision:** retain `Starlight Corps` as an Arcanean fictional proper noun unless later creative review finds a stronger original name.

The institution does not define what real-world Starlight means. Its Oath, star-sigils, ranks, crews, and institutional history remain valuable fictional work.

Where `STARLIGHT_CORPS_CODEX.md` uses “Starlight Intelligence” as the name of a mystical attainment, that interpretation is superseded by this ledger and the updated terminology in `CANON_LOCKED.md`. A future editorial pass should rename those Part VIII references to `Starweave Attunement` without removing the surrounding worldbuilding.

## MIG-003 — legacy universal metaphysics

**Legacy wording found:** `GOD — THE SOURCE — THE TAO` in `arcanea-lore/CANON.md`.

**Decision:** preserve as historical synthesis, not current authority. Arcanea may have its own fictional Source language, but it does not canonically declare God, Tao, Brahman, Ein Sof, Logos, or other real religious/philosophical concepts identical.

Any agent consulting `arcanea-lore/CANON.md` must treat it as legacy/working material subordinate to `.arcanea/lore/CANON_LOCKED.md`.

## MIG-004 — frequencies and science

Arcanean Gate frequencies, resonance materials, star-sigils, the Weave/Field, and related mechanics remain valid fiction.

They must not cross into real-world Starlight content as scientific claims unless separately supported by appropriate evidence. “Inspired by” is not “proven by.”

## MIG-005 — comparative mythology bridge

Added `.arcanea/lore/SACRED_HORIZONS_STAGING.md`.

The bridge is one-way:

`real source → documented motif → comparative question → original Arcanea transformation`

Prohibited:

`real source → secretly Arcanea`

This protects both the integrity of the source tradition and Arcanea's originality.

## Dependency note

Starlight-side enforcement and provenance live in the review branch of `frankxai/starlight-agent-config` until the dedicated `frankxai/starlight-canon` repository can be provisioned.
