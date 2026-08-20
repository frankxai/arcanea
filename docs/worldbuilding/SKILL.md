# SKILL.md — The Worldbuilding Skill

> The operational procedure an agent (or human) follows for any lore task. This is the skill; `SYSTEM.md` is the substrate it operates on; `TASTE.md` is the judge it answers to.

---

## When this skill activates

Any task that creates or modifies universe content: new factions, characters, places, eras, legends, item text, cosmology, naming, timeline events, encyclopedia pages.

## The procedure

### 0. Load the substrate (always, before writing a word)
1. Read `.arcanea/lore/CANON_LOCKED.md` — the vault.
2. Read the ontology primitives and state your new concept as a **one-sentence stance toward them** (SYSTEM.md §3). If you cannot, stop and escalate.
3. Check the **mystery ledger** — does this task risk closing a protected mystery?
4. Check the **naming registry** — which phoneme family does this content live in?
5. Search existing lore for collisions (`grep` names, concepts, frequencies, dates).

### 1. Research before invention
- Recall first (vault, fragments, prior staging docs). Invent only what recall can't supply.
- For craft questions ("how do the greats do X?"), consult `BEST_PRACTICES.md` and, for live encyclopedia research, the Lore Atlas MCP (`docs/lore-atlas-mcp/SPEC.md`) — **inspiration flows from architecture, never bricks** (no protected names, no verbatim text, no 1:1 character mappings).

### 2. Design at vault level
Write the STAGING doc first (`.arcanea/lore/<CONCEPT>.md`), with the standard header:

```
> Status: STAGING ⏳ — Awaiting Creator approval
> Guardian Alignment: <which of the Ten this touches>
> Design Lineage: <archetype adapted, with IP-safety note>
> Touches LOCKED canon: <No (additive) | Yes (STOP — Creator gate)>
```

Required sections: the concept · canonical discipline ("what this is NOT") · faction five-requirements if applicable (identity / visual grammar / power grammar / mission / internal tension, per `FACTIONS.md`) · story seeds (≥5) · staging log.

### 3. Write the fragment surface
Only after the vault doc exists. Every fragment gets a **narrator and a bias**. Deliver the same load-bearing facts through ≥3 viewpoints. Book texts follow the Library register (elevated but accessible; ends with a practical Teaching).

### 4. Cross-link or it didn't happen
Update: story-engine arc ties, faction cross-refs, timeline precedence, naming registry, mystery ledger (if new protected mysteries were minted).

### 5. Gate before ship
- **Canon check**: no contradiction with any LOCKED truth. (Contradictions *between fragments* are fine if intentional and logged.)
- **Taste check**: run `TASTE.md`'s refusal list and restraint tests.
- **IP check**: names original? expression original? mechanics-as-method only?
- **Mystery check**: ledger intact?
- Then: PR as STAGING. Never self-promote to LOCKED. Promotion is the Creator's `/lock-decision`, always.

## The prime moves (from the research, internalized)

1. **Fragment-first** — write atoms, not essays; the essay is for the vault only.
2. **Narrator always** — nothing in-world is spoken from nowhere.
3. **Stance, not sprawl** — new content is a stance toward existing primitives.
4. **Redundancy by design** — assume 20% corpus visibility.
5. **Precedence, not dates** — "X before Y because Z."
6. **Names carry data** — phoneme family = faction metadata; status-names are earnable.
7. **Mysteries are budgeted** — the unanswered question is a feature with an owner.
8. **Legible cause-and-effect for wonder** — discovery reads as a dependency chain with an emotional anchor (the roadmap principle).
9. **Antagonists get defensible premises** — map ideology onto capability; resolve by synthesis where the winning method fulfills the loser's deepest value.
10. **Wonder through naive witnesses** — let a character see the miracle for the first time.
11. **Trust is bought with delivered artifacts** — factions earn belief inside the community's own rules.
12. **Sharing compounds, hoarding decays** — knowledge economics as faction physics.

## Anti-patterns (hard refusals)

- Closing a ledger-protected mystery "because the scene needed it."
- Inventing an eleventh Gate, an eighth House, a new origin class, or a second true antagonist. (Closed sets are closed.)
- Borrowed bricks: protected names, near-verbatim text, recognizable 1:1 character mappings, branded terminology from other franchises.
- Omniscient-narrator fragments. Power without cost. Lore that exists to explain rather than to *ache*.
- Self-promoting STAGING to LOCKED.
