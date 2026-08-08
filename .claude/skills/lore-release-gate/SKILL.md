---
name: lore-release-gate
description: The sequencing contract for any Arcanea lore, canon, or worldbuilding work — new character, god, godbeast, creature, artifact, faction, place, era, magic mechanism, Library text, legend, parable, or any edit under .arcanea/lore/, arcanea-lore/, book/, or lore/. Use whenever a task will add to, change, or reason about what is true in Arcanea. Routes to the right research and pattern libraries for each phase, defines the cross-checks that must run, and states what "done" requires. Read this before writing lore, not after.
---

# Lore Release Gate

Arcanea has 21,000 words of researched worldbuilding method (`docs/worldbuilding/`),
a naming system (`.arcanea/lore/NAMING_REGISTRY.md`), a taste doctrine
(`docs/worldbuilding/TASTE.md`), and a locked canon vault
(`.arcanea/lore/CANON_LOCKED.md`). None of it reads itself. This is the contract
that puts it in front of the work, in order, and says when the work is finished.

Three failure modes it exists to prevent:

1. **Writing from fantasy defaults.** A model asked for "a legendary artifact"
   produces the median of every fantasy artifact it has read. That is the origin
   of lore slop — not bad taste, but no decision. The pattern libraries exist so
   the decision is made deliberately.
2. **Silent canon drift.** In August 2026 a reviewer found two locked godbeast
   renames had never propagated: ~15 files still named superseded entities as
   current, including an active chapter of a published Library text
   (issue #98). Nobody introduced that in one bad commit. It accumulated because
   nothing checked.
3. **Self-certifying.** Declaring lore "canon-consistent," "on-voice," or
   "excellent" with no check run, no score, and no evidence. A claim is not
   evidence.

## The seven phases

Run them in order. Skip a phase only by saying which one and why.

### 1. Ground — read canon before writing canon

Never write Arcanea lore from memory, including your own memory of this
conversation. Memory is authoritative for intent and strategy; it is never
authoritative for what is currently true in the world.

Read, every time:

- `.arcanea/lore/CANON_LOCKED.md` — the vault. **Read-only.** Agents never edit it.
- `.arcanea/lore/NAMING_REGISTRY.md` — registers, collision rules, superseded inventory
- The existing files your subject touches (`FACTIONS.md`, `MAGIC_SYSTEM.md`,
  `STORY_ENGINE.md`, the relevant `book/` collection)

Beware mirrors. `arcanea-lore/` and `sync/aios/lore/` contain stale copies whose
frequency tables and godbeast names diverge from the vault. The vault at
`.arcanea/lore/CANON_LOCKED.md` wins, always.

### 2. Choose — pick the pattern, don't inherit the default

Open the horizontal library for your craft problem in `docs/worldbuilding/patterns/`
and name the specific pattern you are applying and the specific one you are
rejecting. "I'm using the object-that-chooses-its-bearer pattern, not the
stat-block pattern" is a decision. Reaching for whatever comes first is not.

| Working on | Read |
|---|---|
| Artifacts, relics, weapons, materials | `patterns/ARTIFACTS.md` |
| Magic mechanisms, cost, limits, escalation | `patterns/MAGIC_MECHANISMS.md` |
| Wiki structure, entity schemas, canon tiers | `patterns/ENCYCLOPEDIA_IA.md` |
| Prose, registers, naming sound, dialogue | `patterns/LANGUAGE_CRAFT.md` |
| Anything — the cross-world benchmark and the Ten Upgrades | `research/SYNTHESIS.md` |
| Method, fragments, mystery ledgers, IP doctrine | `BEST_PRACTICES.md`, `SYSTEM.md` |

The per-world knowledgebases in `research/` are the source material behind those
libraries. Go to them when you need the full case, not the extracted rule.

### 3. Draft — in register, at the right layer

Three layers, three voices (`SYSTEM.md`):

- **Vault** — terse, declarative, machine-readable. What is true.
- **Fragment surface** — in-world, narrated, biased. A named person saying it,
  who may be wrong. Prefer three viewpoints on a contested fact.
- **Encyclopedia** — out-of-universe, neutral, cited. What the reader can look up.

Do not blend them in one file. `LANGUAGE_CRAFT.md` carries the register
specifications and the AI-slop repair list; run its checklist before you call a
draft done.

### 4. Cross-check — the part that is not optional

Four checks, all of them, every time:

```bash
# Canon: superseded names, Gate frequencies, godbeast pairings, tier banners
node .claude/ci/lore-lint.mjs <your files>
```

- **Naming** — every coined name runs the `NAMING_REGISTRY.md` §7 procedure:
  register identified, three candidates, collision rules applied, G-test read
  aloud, superseded list checked, **etymology note written**. A name without an
  etymology note fails review.
- **IP** — `BEST_PRACTICES.md` §IV. Architecture, never bricks. If the thing you
  wrote would be recognizable as a specific franchise's element with the name
  changed, it fails — and the closer the mechanic sits to a single source, the
  higher the bar (see the U3 note in `research/SYNTHESIS.md`).
- **Continuity** — does this contradict any existing STAGING content, not just
  locked canon? Grep the lore directory for the entities you touched.

### 5. Evaluate — score it, don't vouch for it

Run the `canon-evaluation` skill. It produces a ten-dimension score with
evidence per dimension and an adversarial pass that actively tries to refute the
work. Attach the score to the artifact or the PR.

A score you assigned yourself without running the rubric is not a score. If the
adversarial pass finds a real contradiction, fix it and re-score — do not argue
with it in the summary.

### 6. Stage — everything new is STAGING

All new lore ships as STAGING ⏳. Every file gets:

- a status banner in the first 15 lines (status, date, purpose, and an explicit
  line stating whether it touches LOCKED canon)
- a `## STAGING LOG` table at the bottom, with a row per revision
- mystery-ledger entries for anything deliberately left unanswered, marked
  *oblique only* or *never answer*

### 7. Promote — Frank only

Promotion from STAGING to LOCKED happens through `/lock-decision`, by the
Creator, never by an agent. An agent proposing promotion is fine. An agent
performing one is a canon violation.

## What "done" requires

Not one of these is optional, and none of them is a claim:

- [ ] Vault read this session, not recalled
- [ ] Pattern named — the one applied and the one rejected
- [ ] `lore-lint.mjs` run, output shown, exit 0
- [ ] Every coined name carries its etymology note
- [ ] IP red lines checked against `BEST_PRACTICES.md` §IV
- [ ] `canon-evaluation` score attached, adversarial pass survived
- [ ] STAGING banner + STAGING LOG present
- [ ] Mystery ledger updated if anything was deliberately withheld

## Reference

Method and research: `docs/worldbuilding/` (README, SYSTEM, SKILL, AGENTS,
TASTE, COLLABORATIONS, BEST_PRACTICES, `research/`, `patterns/`).
Canon vault: `.arcanea/lore/CANON_LOCKED.md`. Naming: `.arcanea/lore/NAMING_REGISTRY.md`.
Machine checks: `.claude/ci/lore-lint.mjs`. Open canon debt: issues #98, #99.
