# The Arcanea Worldbuilding OS

> How a living universe is built, organized, and evolved by human + AI teams — extracted from the best worldbuilding ever shipped (FromSoftware's fragment method, shonen narrative engines, franchise bibles) and operationalized for agent swarms.

This directory is both **Arcanea's own operating system** for lore work and a **reusable method** any world-builder can adopt (it powers the Season 0 Worldsmith Trials entry pattern and the OSS worlds framework).

## The five documents

| File | What it governs | Read when |
|---|---|---|
| [`SYSTEM.md`](./SYSTEM.md) | The knowledgebase architecture — ontology, canon tiers, fragments, timeline, naming registry, mystery ledger | Setting up or restructuring any lore corpus |
| [`SKILL.md`](./SKILL.md) | The operational skill — how an agent actually executes a lore task, step by step, with gates | Before any lore-writing session |
| [`AGENTS.md`](./AGENTS.md) | The swarm — roles, dispatch order, and boundaries for multi-agent lore work | Orchestrating parallel worldbuilding |
| [`TASTE.md`](./TASTE.md) | Judgment the rules can't capture — the refusal list, the restraint tests, what "good" feels like | Before shipping anything |
| [`COLLABORATIONS.md`](./COLLABORATIONS.md) | Human + AI + community co-creation protocol — who proposes, who gates, who locks | Any cross-party lore work |
| [`BEST_PRACTICES.md`](./BEST_PRACTICES.md) | The extracted research — what Elden Ring, Dr. Stone, and the great fan encyclopedias teach, and the IP-safety doctrine | Studying the craft; onboarding new agents |

## The one-paragraph method

Keep a **tiny ontology** and a **locked canon vault** that is never shipped verbatim. Author lore as **fragments with narrators**, redundant across viewpoints, anchored to a **precedence timeline**, named from **faction phoneme families**, with a **budgeted mystery ledger** guarding what must never be answered. Propose in STAGING; promote only through the Creator's lock gate. Steal architecture from the greats, never bricks. The answer is usually less.

## Related

- Canon vault: `.arcanea/lore/CANON_LOCKED.md` (LOCKED — Creator gate only)
- Faction engine: `.arcanea/lore/FACTIONS.md` · Narrative engine: `.arcanea/lore/STORY_ENGINE.md`
- Research tooling: [`../lore-atlas-mcp/SPEC.md`](../lore-atlas-mcp/SPEC.md) — the Lore Atlas MCP (agent access to the world's lore encyclopedias)
