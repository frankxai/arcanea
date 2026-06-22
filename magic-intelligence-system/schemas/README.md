# Schemas

JSON Schema (draft 2020-12) for the Arcanea magic taxonomy. The corpus in
[`../data/spells.json`](../data/spells.json) validates against `spell.schema.json`.

## Index

| Schema | Models | Status |
|---|---|---|
| [`spell.schema.json`](spell.schema.json) | A discrete magical effect on the four axes | v0.1 |

`enchantment`, `ward`, and `summon` are specializations of a spell (via `discipline` + `tags`) in
v0.1; they graduate to their own schemas only if their fields diverge.

## The four required axes

Every spell carries `element`, `discipline`, `tier`, and `gate` (+ derived `rank`). The
tier↔gate↔rank mapping is fixed in [`../docs/MAGIC-PROTOCOLS.md`](../docs/MAGIC-PROTOCOLS.md) §1.

## Example (valid)

```json
{
  "schemaVersion": "0.1.0",
  "id": "ignis-frange",
  "name": "Sundering Flame",
  "incantation": "Ignis Frange!",
  "element": "fire",
  "discipline": "attack",
  "tier": "light",
  "gate": 3,
  "rank": "mage",
  "description": "A focused lance of fire that cracks what it strikes.",
  "effect": "Single-target fire damage; ignores light cover.",
  "manaCost": 8,
  "castTime": "1 action",
  "range": "30m",
  "cooldownRounds": 0,
  "tags": ["bolt"],
  "counters": ["summoning"],
  "icon": "Fire",
  "color": "#ff6b35"
}
```

## Validation

```bash
node scripts/validate.mjs        # validates data/spells.json against spell.schema.json
```

Built on SIP.
