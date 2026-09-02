---
title: World Repo Standard
version: "1.0"
status: active
---

# World Repo Standard v1.0

The Arcanea Creature Atlas is an open, curated encyclopedia of creatures from fictional
universes — and the Arcanea-original variants they inspire.

This document specifies how to contribute a universe to the Atlas.

---

## What the Atlas Is

The Atlas has three layers for each universe:

| Layer | What it is | Generates imagery? |
|---|---|---|
| **Reference catalog** | Factual documentation of creatures from existing IP | No |
| **World graph** | Relationships between creatures, universes, stories | — |
| **Arcanea variants** | Wholly original Arcanea creatures inspired by (not copied from) the reference | Yes |

Arcanea variants carry no resemblance to the IP source in name, visual design, or
generated image. They are inspired by archetype, not copied from appearance.

---

## Rights Tiers

Every universe and creature carries a rights tier:

| Tier | Meaning | Image generation |
|---|---|---|
| `original_arcanea` | Arcanea-native, fully owned | Freely |
| `public_domain` | Pre-1927 or explicitly PD | With care |
| `licensed` | CC-licensed fan use | Per license |
| `factual_reference` | IP-protected; document only | Never for reference; yes for Arcanea variants |
| `blocked` | IP-holder restriction | Never |

Most major franchises (Avatar, Marvel, etc.) are `factual_reference`.

---

## How to Contribute

1. **Fork** the `frankxai/arcanea` repo
2. **Create** data files at:
   - `packages/arcanea-mcp/src/data/atlas/universes/<universe-slug>.ts`
   - `packages/arcanea-mcp/src/data/atlas/creatures/<universe-slug>.ts`
   - (optional) `packages/arcanea-mcp/src/data/atlas/arcanea-variants/<universe-slug>.ts`
3. **Follow the TypeScript interfaces** in `packages/arcanea-mcp/src/data/atlas/types.ts`
4. **Open a PR** titled `atlas: add <Universe Name>`
5. **Pass automated checks** (TypeScript, rights-tier validation)
6. **Await curator review** — Frank holds merge authority

---

## Automated Checks

Your PR will fail if:
- Any `factual_reference` or `blocked` creature has `promptable: true`
- A creature's `universeId` doesn't match a registered universe
- An Arcanea variant's `sourceCreatureId` doesn't match a registered creature
- The variant's `name` matches the source creature's `name` or `aliases[]` (no copies)
- `schemaVersion` doesn't match current `1.0`
- TypeScript compilation fails

---

## What Makes a Good Arcanea Variant

A great variant:
- Uses the source creature's **archetype** (scale, role, elemental alignment), not its visual design
- Has an Arcanea-original name, domain, and material correspondence
- Maps cleanly to the Arcanea Five Elements
- Has a `materialCorrespondence` — the Vael Crystal pattern for this creature type
- Is `canonStatus: "staging"` — only Frank's `/lock-decision` promotes to `"locked"`

---

## Example PR Structure

```
atlas: add Avatar: The Last Airbender

universes/avatar.ts         — UniverseSpec
creatures/avatar.ts         — 7 AtlasCreatureSpec entries (factual_reference, promptable: false)
arcanea-variants/avatar.ts  — 3 ArcaneaVariantSpec entries (staging, original names)
```

---

*Maintained by Frank Riemer (frankx.ai). Frank holds final merge authority.*
*The Atlas is canon-additive — contributions become STAGING until promoted.*
