# Spirit Intelligence System

The structured source for Arcanea spirits, archetypes, accords, manifestations, cross-cultural reference research, and encyclopedia projection.

> **Status:** STAGING. Nothing in this subsystem is LOCKED canon until an explicit creator decision.

## System boundary

This subsystem composes three locked authorities:

- `../.arcanea/lore/CANON_LOCKED.md`
- `../.arcanea/lore/MAGIC_SYSTEM.md`
- `../.arcanea/lore/ARTIFACT_RESONANCE_SYSTEM.md`

Its governing lore proposal is `../.arcanea/lore/SPIRIT_ARCHETYPE_SYSTEM.md`.

It does not redefine Lumina, Nero, Spirit, Void, Shadow, the Ten Gates, Gods/Guardians, Godbeasts, ranks, disciplines, or tiers.

## Data planes

| Plane | Files | Can project to Starlight Memory? |
|---|---|---|
| Arcanean ontology | `data/archetypes.json` | yes, STAGING namespace |
| Arcanean entities | `data/spirits.json` | yes when record permits |
| World behavior | `data/world-spirit-profiles.json` | yes, STAGING namespace |
| Artifact relations | `data/spirit-artifact-bonds.json` | yes when both endpoints permit |
| Comparative research | `data/sources.json`, `data/reference-entities.json` | **never** |

The reference plane stores minimal factual identifiers and transferable mechanics. It does not store copied descriptions, dialogue, art, episode text, or proprietary visual designs.

## Core grammar

`Origin × Archetype × Resonance × Memory × Manifestation × Need × Boundary × Accord × Price × Release`

A spirit record is incomplete without agency, refusal, cost, and exit behavior.

## Layout

| Path | Purpose |
|---|---|
| `schemas/` | JSON Schema contracts for all record types |
| `data/archetypes.json` | twenty-four functional archetypes |
| `data/spirits.json` | original Arcanean seed spirits |
| `data/sources.json` | source and rights registry |
| `data/reference-entities.json` | attributed comparative index |
| `data/world-spirit-profiles.json` | world-local manifestation and law |
| `data/spirit-artifact-bonds.json` | typed spirit–artifact relations |
| `docs/SPIRIT-PROTOCOLS.md` | creation, encounter, pact, and release rules |
| `docs/NAMING-AND-IDENTITY.md` | original naming and four-name model |
| `docs/REFERENCE-CORPUS.md` | ingestion, rights, coverage, and similarity gates |
| `docs/ENCYCLOPEDIA-PROJECTION.md` | Git-to-memory-to-publication contract |
| `scripts/validate-spirits.mjs` | dependency-free cross-record validator and event emitter |

## Validate

From this directory:

```bash
node scripts/validate-spirits.mjs
node scripts/validate-spirits.mjs --emit-memory /tmp/arcanea-spirit-memory.jsonl
```

Validation fails closed on borrowed names in Arcanean records, invalid canon references, missing consent/release terms, reference data marked for projection, unsafe Shadow classification, missing world policies, and broken artifact relations.

## Publication rule

Git is authoritative. Starlight Memory and the public encyclopedia are signed projections. They must be reproducible from an approved commit and may never become an independent source of canon.

