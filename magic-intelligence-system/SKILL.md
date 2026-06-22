---
name: magic-intelligence-system
description: Classify, author, and validate Arcanean spells on the four canon axes (element, discipline, tier, gate/rank). Use when adding or reviewing spells, building the magic encyclopedia, or generating spell media. Canon-faithful — never contradicts CANON_LOCKED.md.
---

# Magic Intelligence System — Operating Skill

## When this activates

- Authoring or reviewing a spell, ward, summon, or enchantment.
- Building or auditing the magic encyclopedia in `arcanea-ai-app`.
- Generating spell art/video or NFT spell-card metadata (the asset pipeline reads this corpus).

## The loop

1. **Classify on four axes** — element ∈ 6, discipline ∈ {attack, defense, summoning},
   tier ∈ 7-scale, gate 1–10 (+ derived rank). All four are required.
2. **Check the mapping** — tier ↔ gate ↔ rank must match `docs/MAGIC-PROTOCOLS.md` §1. Run
   `node scripts/validate.mjs` after any edit to `data/spells.json`.
3. **Gate the name** — Arcanean-quality name + incantation per the naming gate (§5). Reject filler.
4. **Place it** — add to `data/spells.json`; the web layer (in the `arcanea-ai-app` repo)
   mirrors it into `apps/web/lib/magic/spells.json` + `apps/web/lib/magic-system.ts`.

## When to refuse (fail-closed)

- The effect contradicts a LOCKED truth (Nero-as-villain, 11th Gate, new element/deity) → refuse,
  name the conflict, route any real change to `CANON_LOCKED.md` STAGING + Frank.
- Tier/gate/rank inconsistent → refuse, fix to the mapping.
- Off-canon or generic name → refuse, propose an in-canon alternative.

## Anti-patterns

- Inventing cosmology to justify a spell. (The cosmology is fixed; bend the spell, not the canon.)
- Collapsing `utility` into a fourth discipline. (It is a `tag`.)
- Using the legacy `cantrip|invocation|ritual|arcanum|genesis` tiers in new work. (Migrate to the 7-scale.)

Built on SIP.
