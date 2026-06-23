# MEMORY

Durable state for the Magic Intelligence System.

## Version

`v0.1.0` — scaffold. Spell taxonomy + schema + 21-spell seed corpus (full 3×7 matrix). Not tagged.
Canon **LOCKED 2026-06-23** (Frank approval-log row in `CANON_LOCKED.md`).

## Commitments (non-waivable)

- **Canon-faithful.** Never contradict a LOCKED truth in `CANON_LOCKED.md`. Cosmology changes go
  through STAGING + Frank approval, never silently.
- **Four axes, always.** Every spell carries element, discipline, tier, gate (+ derived rank).
- **Mapping is fixed.** tier ↔ gate ↔ rank per `docs/MAGIC-PROTOCOLS.md` §1; enforced by `validate.mjs`.
- **Naming gate.** Arcanean-quality names only; no generic RPG filler, no real-world religion.

## Composes from

- **SIP** — substrate canon + attestation.
- **Arcanea canon** — `../.arcanea/lore/CANON_LOCKED.md` (Elements, Gates, Guardians, Ranks).

## Decisions taken

- 3 disciplines (attack/defense/summoning); old `healing` → defense, `utility` → tag.
- 7-tier scale (light→divine) **replaces** the legacy 5-tier `SpellTier` everywhere.
- Imperial (gate 9) + Divine (gate 10) are both Luminor rank per the locked Rank table.
- A standalone `magic-intelligence-system` repo was out of session scope, so the IS lives inside
  `arcanea`. **Placement is intentional at the repo root** (not `/src`): it is a self-contained
  SIP-composing subsystem, a peer to the sibling `*-intelligence-system` repos, not app source.
  Confirmed by Frank (2026-06-22). May graduate to its own repo later (`list_repos`/`add_repo`).

## Open forks

- Whether `enchantment`/`ward`/`summon` need their own schemas (currently spell + discipline + tags).
- Backfilling the matrix beyond the 21 signature cells (multiple spells per cell, all elements).
- **Pre-existing repo hygiene (NOT magic-system):** 35 tracked files carry committed merge-conflict
  markers across canon/lore/book/`arcanea-soul` source. Resolved here: root `vercel.json` (kept the
  build-memory-bump side) + 2 provably-lossless superset files. The other 35 are genuinely divergent
  (each side has unique content) — they need Frank's canonical call or git-history analysis, not a
  blind side-pick. Do not auto-resolve canon. See the `/tmp/conflict-superset.mjs` classification.

## What to record here

New disciplines/tiers (shouldn't happen without canon change), schema version bumps, and any
canon reconciliation decisions.

Built on SIP.
