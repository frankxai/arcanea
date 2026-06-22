# Magic Intelligence System

[![Built on SIP](https://img.shields.io/badge/Built%20on-SIP-blue.svg)](https://github.com/frankxai/Starlight-Intelligence-System)

> The structured spell layer for the Arcanea universe. Canon-faithful, schema-validated, and the
> source of truth the magic **encyclopedia** consumes.

Arcanea's cosmology (Five Elements, Ten Gates, Guardians, Ranks) is locked in
[`../.arcanea/lore/CANON_LOCKED.md`](../.arcanea/lore/CANON_LOCKED.md). This subsystem adds the layer
that was missing: a **spell taxonomy** — every magical effect classified on four canon-reusing axes.

## The four axes

| Axis | Values |
|---|---|
| **Element** | fire · water · earth · wind · void · spirit |
| **Discipline** | attack (Evocation) · defense (Abjuration: wards + restoration) · summoning (Conjuration) |
| **Tier** | light · advanced · greater · sacred · royal · imperial · divine |
| **Gating** | gate 1–10 + derived rank (Apprentice → Luminor) |

German source terms → canon: *leichte→light, fortgeschritten→advanced, schwere→greater,
heilige→sacred, königliche→royal, kaiserliche→imperial, göttliche→divine*; *Angriffs-→attack,
Verteidigungs-→defense, Beschwörungs-→summoning*.

## Layout

| Path | Purpose |
|---|---|
| `CLAUDE.md` | Operating doctrine (canon-faithful prime directive) |
| `CANON.md` | Composition posture (composes SIP + Arcanea canon) |
| `SKILL.md` | When to author / when to refuse |
| `docs/MAGIC-PROTOCOLS.md` | Disciplines, tiers, gating, incantation grammar, interactions |
| `schemas/spell.schema.json` | The spell schema (draft 2020-12) |
| `data/spells.json` | Canonical spell corpus (21-spell seed, full 3×7 matrix) |
| `scripts/validate.mjs` | Dependency-free validator (enums + tier↔gate↔rank + coverage) |
| `MEMORY.md` | Durable state + commitments |

## Validate

```bash
node scripts/validate.mjs
```

## Status

v0.1 scaffold. The canon doc [`../.arcanea/lore/MAGIC_SYSTEM.md`](../.arcanea/lore/MAGIC_SYSTEM.md)
is **STAGING**, pending Frank's approval before it is treated as LOCKED.

Built on SIP. For builders, not consumers.
