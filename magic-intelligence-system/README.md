# Magic Intelligence System

[![Built on SIP](https://img.shields.io/badge/Built%20on-SIP-blue.svg)](https://github.com/frankxai/Starlight-Intelligence-System)

> The validated spell, resonance-domain, artifact, world-magic, and spirit-interoperability layer for Arcanea.

Arcanea's cosmology is locked in [`../.arcanea/lore/CANON_LOCKED.md`](../.arcanea/lore/CANON_LOCKED.md). Its spell grammar is locked in [`../.arcanea/lore/MAGIC_SYSTEM.md`](../.arcanea/lore/MAGIC_SYSTEM.md). This subsystem makes those truths machine-readable for the encyclopedia without inventing a parallel canon.

## Spell grammar — LOCKED

| Axis | Values |
|---|---|
| **Element** | fire · water · earth · wind · void · spirit |
| **Discipline** | attack · defense · summoning |
| **Tier** | light · advanced · greater · sacred · royal · imperial · divine |
| **Gating** | Gate 1–10 + derived rank (Apprentice → Luminor) |

The 21-spell seed corpus covers the complete discipline × tier matrix and is validated by `scripts/validate.mjs`.

## Artifact and resonance extension — STAGING

The additive proposal in [`../.arcanea/lore/ARTIFACT_RESONANCE_SYSTEM.md`](../.arcanea/lore/ARTIFACT_RESONANCE_SYSTEM.md) introduces:

- derived Expressions such as Verdance, Stormspark, Frost, Forge, Cant, Gravitas, and Radiance;
- artifact classes: Focus, Key, Vessel, Bridge, Pact, Engine, Seal, and Assembly;
- bounded capability grants that never grant rank or opened Gates;
- world profiles for shared cosmology with world-local magic ecologies;
- provenance, price, failure, counterplay, agency, rights, and creator attribution;
- signed Starlight Memory projections for agents and the encyclopedia.

All new records remain STAGING or quarantined until Frank explicitly approves them.

## Spirit interoperability — STAGING

The sibling spirit-intelligence-system defines original spirits, mutable archetypes, comparative research boundaries, world institutions, and typed spirit–artifact bonds. This subsystem keeps capability mechanics; the sibling system keeps identity, consent, ecology, and relationship state.

The crosswalk in docs/SPIRIT-ARTIFACT-CROSSWALK.md permits witness, invitation, habitat, co-stewardship, translation, channel, and seal relationships. Predation is modeled only so validators and stories can identify and quarantine it.

## Layout

| Path | Purpose |
|---|---|
| `CLAUDE.md` | operating doctrine |
| `CANON.md` | composition posture |
| `SKILL.md` | author/refusal contract |
| `docs/MAGIC-PROTOCOLS.md` | locked spell grammar |
| `docs/ARTIFACT-PROTOCOLS.md` | STAGING artifact, assembly, Gate Debt, and world rules |
| `docs/SPIRIT-ARTIFACT-CROSSWALK.md` | typed bond modes, capability boundaries, consent, repair, and release |
| `docs/INFLUENCE-AND-RIGHTS-LEDGER.md` | transferable principles and prohibited parallels |
| `docs/STARLIGHT-MEMORY-PROJECTION.md` | Git-authoritative memory and encyclopedia contract |
| `docs/CANON-DRIFT-AUDIT-2026-08-03.md` | known conflicting legacy surfaces and migration gates |
| `schemas/spell.schema.json` | spell schema |
| `schemas/domain.schema.json` | Element reference and derived Expression schema |
| `schemas/artifact.schema.json` | artifact schema |
| `schemas/world-magic-profile.schema.json` | world-local magic profile schema |
| `data/spells.json` | locked 21-spell seed corpus |
| `data/domains.json` | locked Element references + STAGING Expressions |
| `data/artifacts.json` | STAGING seed artifacts |
| `data/world-magic-profiles.json` | Arcanea inheritance, Darkenia, and community template |
| `scripts/validate.mjs` | spell validator |
| `scripts/validate-artifacts.mjs` | artifact/domain/world validator + memory event generator |
| `MEMORY.md` | durable subsystem commitments |

## Validate

```bash
node magic-intelligence-system/scripts/validate.mjs
node magic-intelligence-system/scripts/validate-artifacts.mjs
node spirit-intelligence-system/scripts/validate-spirits.mjs
```

Generate rebuildable Starlight Memory events after validation:

```bash
GITHUB_SHA="$(git rev-parse HEAD)" \
  node magic-intelligence-system/scripts/validate-artifacts.mjs \
  --emit-memory /tmp/arcanea-artifact-memory.jsonl
```

Generate the spirit and bond projection:

```bash
GITHUB_SHA="$(git rev-parse HEAD)" \
  node spirit-intelligence-system/scripts/validate-spirits.mjs \
  --emit-memory /tmp/arcanea-spirit-memory.jsonl
```

## Status

- Spell taxonomy and incantation grammar: **LOCKED**, approved 2026-06-23.
- Artifact and Resonance System: **STAGING**, proposed 2026-08-03.
- Spirit & Archetype System: **STAGING**, proposed 2026-08-04.
- Darkenia world profile: **STAGING working title**.
- Selka Hollow-Mask: **QUARANTINED / redesign required**.

Built on SIP. Git remains canon; memory remains projection.
