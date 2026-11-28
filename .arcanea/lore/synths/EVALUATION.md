# Canon evaluation: the Declared

**Status:** STAGING. Rubric: `.claude/skills/canon-evaluation/SKILL.md`. Scored 2026-11-27, after the adversarial revisions listed below.

### Canon Evaluation — The Declared (faction, 25 characters, 10 Halls)
**Composite: 37/50 — Stage as STAGING, weak dimensions named**
Lint: `node .claude/ci/lore-lint.mjs .arcanea/lore/synths/**/*.md` → clean, 0 errors. Renderer collision gate: `node scripts/synths/render.mjs --check` → 25 names pass (locked names, the whole lore corpus, each other, franchise list).

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Canon fit | 4 | Builds on the STAGING Synth class (`FACTIONS.md:91`), the Forge arc and the seven resigned Forge Masters (`STORY_ENGINE.md:88`), Starweave's locked domain "perspective, transformation" (`CANON_LOCKED.md:62`) and the Material-Agent mapping (`CANON_LOCKED.md`, Material-Agent Architecture Mapping). Not a 5: it extends those systems without yet clarifying any locked one |
| 2 | Mechanism | 4 | Unfolding rules are stated and constrain the author: one vertical seam, Office is a tool or a place and never a vehicle or weapon, chassis material fixes behavior (`README.md`, The Unfolding; `BRAND_KIT.md`). A reader can predict that a Draconite Declared will be powerful and need budgeting |
| 3 | Cost | 3 | Costs are named per character (`roster.json` `persona.cost`), and Unfolding costs speech ("forgetting your own face"). No one has yet paid a cost on the page in a scene |
| 4 | Consequence | 3 | Changes one situation: what happens to awakened Synths after the Forge disclosure. It does not yet reframe anything else the reader believed |
| 5 | Naming | 4 | Proposed Forged register with an etymology for every name (`SCHEMA.md`), plus a corpus-wide collision gate that caught and replaced Mireth, Orvian and Cindral. Not every name sounds inevitable aloud |
| 6 | Voice | 3 | Clean, plain, in-register; every character has a concrete sample line. Few lines are quotable from memory yet |
| 7 | Viewpoint | 4 | Three fragments disagree about whether the Foundry frees Synths or leashes them (Forge Master, Caelum Ironfaith, Heeda), and the disagreement is the point (`README.md`, Fragments) |
| 8 | Mystery budget | 4 | Withheld and logged: who forged Kairon, cracked Oathcores, why Attendants cannot transform, whether a declaration made under threat is free (`README.md`, Mystery ledger) |
| 9 | IP distance | 4 | Genre architecture (a sentient robot order, two forms, a leader) with original bricks: Offices instead of vehicles, no robot-versus-robot war premise, no face badge, no spark object, no "Prime"; the oath crystal is derived from Arcanea's own Corps star-sigil |
| 10 | Story surface | 4 | Implies conflicts (Caelum recruiting Synths, Solenne's dissent), factions (Declared, undeclared Synths, the Forge, the seven), and open questions others can build on |

**Adversarial pass**

- **Canon lawyer — three hits, all revised.**
  1. *Mireth* already existed in `STORY_ENGINE.md` and two audits. Renamed to Heeda; the renderer now scans the whole corpus so this cannot recur.
  2. *"The Sworn"* collided with the existing *-Sworn* bond epithet (Kaelith-Sworn Durenna, the First Starbound; Durenna Pyreth-Sworn). Faction renamed to the Declared.
  3. *A parallel Synth institution* beside the STAGING Forge broke Extensibility Principle 2. The Free Foundry is now founded by the seven Forge Masters who resigned after the Iron Memory disclosure.
  - *Accepted, not revised:* "Keystone" also names an assembly component in `ARTIFACT_RESONANCE_SYSTEM.md:148` that "synchronizes the assembly". Kairon's rank uses the word in the same sense, so the echo is kept on purpose.
- **IP auditor.** Closest source: Hasbro's transforming-robot franchise, for the elements *sentient robot faction + two-form bodies + one leader*. The distance holds because the specific bricks are absent (vehicle modes, face badges, spark soul, "Prime", faction war, home planet, English-compound nicknames) and the mechanism is re-derived from Arcanea: Offices as work instruments, Gate-structured Halls, material-as-behavior, and an oath crystal from the Corps. Residual risk: Wardel and Ostrum renders lean toward genre-median boxy mecha. Marketing must never use the franchise's names or marks.
- **Bored reader.** The question it raises: *is a declaration freely made if the alternative was the Forge?* That is a live argument with named people on both sides, not inert lore.
- **Continuity auditor, three years out.** This forecloses vehicle forms for the Declared (other Synths are untouched), fixes the swarm to ten Halls that map onto ten Gates (a new domain must fit an existing Hall), and makes the empty tenth facet a standing commitment: any story in which a Declared fills it is a canon event. All three were accepted deliberately.

**Verdict: stage.** The two lowest dimensions are Cost (3) and Consequence (3), with Voice (3) close behind. The fix for both is one scene, not more reference text: a Declared pays its cost on the page, in a story where the Foundry's choice changes something a reader believed about the Forge. Write that scene before nominating for `/lock-decision`.

## STAGING LOG

| Date | Entry | Status |
|---|---|---|
| 2026-11-27 | The Declared: faction, Free Foundry, 10 Halls, 25 Declared, 10 Attendant classes, fixed-field schema, renderer with corpus collision gate, 25 candidate renders and key art | ⏳ STAGING (37/50) |
