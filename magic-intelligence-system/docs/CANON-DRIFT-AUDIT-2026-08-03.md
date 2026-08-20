# Canon Drift Audit — 2026-08-03

## Canonicality decision

Use `.arcanea/lore/CANON_LOCKED.md` as cosmic authority and `.arcanea/lore/MAGIC_SYSTEM.md` as spell-grammar authority. Treat legacy root lore, duplicated skills, generated sync copies, and implementation types as consumers that can drift.

## Fatal defects

| Surface | Conflict | Risk | Disposition |
|---|---|---|---|
| `ARCANEA_UNIVERSE_CANON.md` | contains unresolved merge markers while declaring itself authoritative | agents can ingest mutually exclusive lore as canon | quarantine from indexing; reconcile in a dedicated canon migration |
| `.claude/skills/arcanea-canon.md` | duplicates obsolete Gate frequencies and legacy Godbeast names | every lore-writing agent can generate contradictions | replaced in this change with pointer-first invariants |
| `packages/core/src/types/mythology.ts` | retains legacy `thessara` and `amaterasu` while locked canon names the Gate Eight and Source Godbeasts `vaelith` and `source` | type-level drift can reject canonical data or preserve obsolete content | requires usage search, data migration, tests, and a separate code PR |
| `world-building.md` | contains legacy six-Guardian, realm, frequency, species, artifact, and history tables that conflict with current locked canon | search and agents can misclassify a legacy brainstorming document as truth | mark legacy, remove from canonical retrieval, then migrate reusable worldbuilding process only |

## High-priority improvements

| Surface | Issue | Action |
|---|---|---|
| `magic-intelligence-system/README.md` | says `MAGIC_SYSTEM.md` is STAGING after it was locked 2026-06-23 | corrected in this change |
| duplicated `.arcanea/lore`, `arcanea-lore`, and `sync/aios/lore` trees | unclear generated/source direction creates three-way drift | designate one authoring root, generated manifests, and content hashes |
| Gate Eight naming | `Starweave` appears in locked table while implementation types and legacy skills use `shift` | make one explicit canon decision before changing APIs or routes |
| Tier 7 materials | artifacts want to reference useful materials that remain STAGING | keep every dependent artifact STAGING until material status is decided |
| world-builder `.arc` artifact fields | only form, power level, and status are represented | use this artifact schema as an extension, then version `.arc` specification after approval |

## Retrieval exclusion rules

Until migration completes, default canon retrieval should exclude:

- files containing Git conflict markers;
- files self-declared authoritative that are older than the locked source and disagree with it;
- `sync/` copies whose source hash cannot be resolved;
- implementation types as lore authority;
- STAGING and quarantined records unless explicitly requested.

## Acceptance evidence for the follow-up migration

1. one canonical source path per lore entity;
2. generated copies carry source path, source commit, and content hash;
3. no conflict markers in indexed lore;
4. Guardian, Godbeast, Gate, frequency, Element, rank, discipline, and tier tables pass one cross-repository validator;
5. code types and runtime data agree with locked names;
6. default agent retrieval returns zero obsolete names or frequencies;
7. a human-approved migration log records every renamed or deprecated entity.

