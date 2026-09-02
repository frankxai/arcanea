# Execution Backlog — Season One Build

> **Status**: STAGING
> **Executor**: Codex CLI / Grok CLI, dispatched by the Starlight Intelligence Operator.
> **Rule**: Take the next unchecked task **in order**. Work in staging files only. Self-score every artifact.
> Gate tasks `[GATE]` convene the Board — all five lenses ≥ 4 or it does not advance.

---

## Conventions

- **Staging roots:** prose → `.arcanea/lore/staging/season-one/` · world-state → `.arcanea/lore/staging/WORLDSTATE_LEDGER.md`
  · visual specs → `docs/story-progression/visual-specs/` · rendered art → `public/story-progression/season-one/`.
- **Never** edit `CANON_LOCKED.md` or any file marked `Status: CANONICAL` / `LOCKED`.
- **Every artifact ends with the score line:**
  `<!-- BOARD: Jobs N · Musk N · Buddha N · RockStar N · KPop N · VERDICT: SHIP|REVISE -->`
- **Commit message format:** `story(season-one): <task-id> <short desc>` — one task per commit where practical.
- **Concurrency:** before starting a task, mark it `[IN PROGRESS — <executor>]` in place of `[ ]`; on completion flip it to `[x]`.
  A second CLI agent skips any task already `[IN PROGRESS]`. Prevents double-execution when multiple executors share the backlog.
  *Caveat:* this is a soft signal, not an atomic lock — two agents can read the same `[ ]` before either marks it, and the
  git file is last-writer-wins. For true parallel execution, gate task claims through a separate lock/execution-log file (or one branch per executor).

---

## Phase 0 — Setup

- [ ] **T-00** Create staging dirs (`.arcanea/lore/staging/season-one/`, `docs/story-progression/visual-specs/`,
      `public/story-progression/season-one/`) and `.arcanea/lore/staging/WORLDSTATE_LEDGER.md` with the D1–D6 table from
      `WORLD_PROGRESSION_EPOCH.md` marked `Status: STAGING`. Ledger columns: `# | Delta | Cause (episode) | Source | Status`.
      Then run a **read-only canon sanity check**: compare the 10 Gate frequencies (174 Hz → 1111 Hz) and the Guardian/Godbeast
      names exactly as they appear in `.arcanea/lore/CANON_LOCKED.md` against their use in the staged episodes + `WORLD_PROGRESSION_EPOCH.md`,
      **emitting a diff (not just pass/fail)** so any drift is visible. Run before any writing begins (catches drift at T-00, not T-09).
      Also **pre-flight the toolchain**: confirm the source lore files exist (`STORY_ENGINE.md`, `FLAGSHIP_TEAM_V2.md`, `STARLIGHT_CORPS_CODEX.md`,
      `VOID_ASCENDANTS.md`, `GATE_TOUCHED_UNDERGROUND.md`, `VISUAL_DOCTRINE.md`), and that `generate-arcanea-img.mjs` + `GEMINI_API_KEY`
      are present before Phase 2 (so T-10/T-11 don't fail silently). Also note whether the optional
      `mcp__Higgsfield__generate_image` tool is available — its absence is non-blocking (native Gemini fallback).
      **Accept:** dirs exist; ledger lists D1–D6 with the column schema above; canon check reports zero mismatches; pre-flight passes (or missing items are listed for the operator).

## Phase 1 — Story (the eight episodes)

> Each episode: target ~2,500 words (never exceed 3,000 unless a scene demands it — verify with `wc -w`), prose,
> cites its canon hooks, ends with the score line. Must move world-state.

- [ ] **T-01** Write **E01 "Wrong Place, Wrong Hour"** → `.arcanea/lore/staging/season-one/E01.md`.
      **Accept:** all seven established in-class; canon names/frequencies exact; the score line is present as an HTML comment
      on the **last line of the file** (`<!-- BOARD: ... -->`); self-score ≥4 all lenses. *(This is the canonical pattern for E02–E08.)*
- [ ] **T-02** Write **E02 "The Cascade"**. **Accept:** strike lands, seven collide; cascade mechanics canon-true.
- [ ] **T-03** Write **E03 "The Architect's Reason"** (Selvyn). **Accept:** enemy is *persuasive, partly right* (D6 seeded), not a cartoon.
- [ ] **T-04** Write **E04 "Seven Disagreements"**. **Accept:** conflict is character-true; Solenne chosen-name device present.
- [ ] **T-05** Write **E05 "What Mireth Knew"**. **Accept:** mystery seeded, *not resolved* (Buddha restraint); no Arc-4 spoilers.
- [ ] **T-06** Write **E06 "The Haven Holds"**. **Accept:** stages **D5** in the ledger; Ironhold Stance canon-true.
- [ ] **T-07** Write **E07 "The Debrief in the Ruin"**. **Accept:** first-crew-briefing beat; seeds **D4**.
- [ ] **T-08** Write **E08 "Amended"** (finale). **Accept:** stages **D1, D2, D3** in the ledger; Cassiel dissent has real cost.

- [ ] **T-09 `[GATE]` — Story gate.** Board convenes on the full eight-episode set + the world-state ledger.
      **Accept:** a reader of E01→E08 can name what changed (D1–D6); zero canon breaches; all five lenses ≥4;
      Queen verdict `SHIP`. Record verdict here:
      `> T-09 VERDICT: ____ (Jobs _ · Musk _ · Buddha _ · RockStar _ · KPop _)`

## Phase 2 — Visual (the ten-asset set)

> Locked to `VISUAL_PLAN.md` + `VISUAL_DOCTRINE.md`. Generate V1 first; pin its palette/particle language into V2–V10.

- [ ] **T-10** Author the 10 JSON specs in `docs/story-progression/visual-specs/V1.json`…`V10.json` (prompt, aspect, negative, seed, doctrine-anchor).
      **Accept:** every spec uses the prompt scaffold; negatives include the banned-look list.
- [ ] **T-11** Generate **V1 season key art**; extract palette + particle language into a shared `docs/story-progression/visual-specs/_lock.json`.
      **Accept:** V1 self-scores ≥4 all lenses; `_lock.json` written.
- [ ] **T-12** Generate **V2–V7** (character plates), pinned to `_lock.json`.
      **Accept:** each plate on-model; silhouettes distinct at 50px; consistent with V1.
- [ ] **T-13** Generate **V8** (Selvyn antagonist) + **V9** (haven establishing) + **V10** (crew emblem).
      **Accept:** V8 = corrupted-Void elegance not cartoon-evil; V10 reads at 50px (multi-pointed star logic).

- [ ] **T-14 `[GATE]` — Visual gate.** Board convenes on all ten assets *as one set*.
      **Accept:** set reads as one season (shared palette/light/grammar); no off-model asset; all five lenses ≥4;
      Queen verdict `SHIP`. Record verdict here:
      `> T-14 VERDICT: ____ (Jobs _ · Musk _ · Buddha _ · RockStar _ · KPop _)`

## Phase 3 — Integration & handoff

- [ ] **T-15** Update `docs/story-progression/README.md` index with links to all staged episodes + the rendered set.
      **Accept:** every deliverable is one click from Mission Control.
- [ ] **T-16** Write `.arcanea/lore/staging/season-one/PROMOTION_REQUEST.md` — a one-page Creator brief: what's staged, the D1–D6
      deltas proposed for canon, the Board verdicts, and the explicit ask: *promote to canon?*
      **Accept:** Creator can approve/reject from this one page. **No self-promotion to canon — Frank decides.**

---

## Board verdict log

| Gate | Date | Jobs | Musk | Buddha | RockStar | KPop | Queen verdict |
|---|---|---|---|---|---|---|---|
| T-09 Story |  |  |  |  |  |  |  |
| T-14 Visual |  |  |  |  |  |  |  |

---

## Definition of done (the whole epoch)

1. Eight episodes staged, each moving world-state, all passing T-09.
2. Ten-asset visual set staged, reading as one season, passing T-14.
3. World-state ledger (D1–D6) staged with sources.
4. Promotion request written and waiting on the Creator.
5. Nothing in `CANON_LOCKED.md` was touched. Everything is reversible until Frank says otherwise.
