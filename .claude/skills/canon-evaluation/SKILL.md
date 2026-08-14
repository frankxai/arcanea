---
name: canon-evaluation
description: Score any piece of Arcanea lore against a ten-dimension rubric with an adversarial refutation pass, before it is staged or promoted. Use when evaluating a new character, god, godbeast, creature, artifact, faction, place, era, magic mechanism, Library text, legend, or parable — and whenever asked whether lore is good, canon-consistent, on-voice, ready to stage, or ready for /lock-decision. Produces a scored verdict with per-dimension evidence, not an opinion. Invoked as phase 5 of the lore-release-gate.
---

# Canon Evaluation

The rubric that replaces "this looks good." Every dimension is scored 1–5
against stated anchors, every score carries a one-line piece of evidence, and
the whole thing survives an adversarial pass that is actively trying to kill it.

Two rules make this worth running:

- **Evidence or no score.** A dimension scored without a quoted line, a file
  path, or a command output is unscored. Write `unscored — no evidence` rather
  than guessing; an honest gap is information, an invented 4 is noise.
- **The adversary goes last and wins ties.** If the refutation pass lands a real
  hit, the artifact is revised. You do not get to out-argue it in the summary.

## The ten dimensions

Score 1–5. Anchors are deliberately unsentimental: **3 is competent**, 5 is rare.

| # | Dimension | 1 | 3 | 5 |
|---|---|---|---|---|
| 1 | **Canon fit** | Contradicts LOCKED canon | Consistent, sits beside existing systems | Consistent *and* makes an existing locked system make more sense |
| 2 | **Mechanism** | Vibes; nothing works a particular way | Rules stated, mostly consistent | A reader can predict outcomes and be right; the rule constrains the author too |
| 3 | **Cost** | Power with no price | A price is named | The price is paid by someone specific, on the page, and it hurts |
| 4 | **Consequence** | Changes nothing | Changes one situation | Reframes something the reader already believed |
| 5 | **Naming** | Register-wrong or collides | Register-correct, collision-checked | Register-correct, etymology carries meaning, sounds inevitable aloud |
| 6 | **Voice** | AI-slop present; register blended | Clean, in-register | Prose a reader would quote from memory |
| 7 | **Viewpoint** | Single omniscient assertion | One narrator, acknowledged bias | Three viewpoints that disagree, and the disagreement is the point |
| 8 | **Mystery budget** | Everything explained, or nothing is | Withheld deliberately, logged | Withheld, logged, and the withholding actively generates story |
| 9 | **IP distance** | Recognizable as franchise X, renamed | Architecture borrowed, bricks original | Synthesized across sources into something with its own logic |
| 10 | **Story surface** | A closed fact | Implies one scene | Implies conflicts, factions, and questions others can build on |

**Hard gates** — any one of these blocks staging regardless of composite:

- Dimension 1 scores 1 → contradicts the vault. Not a revision; a rewrite.
- Dimension 9 scores 1 → IP exposure. Rewrite or drop.
- Dimension 5 scores 1 → renaming touches everything downstream. Fix before anything else.
- `node .claude/ci/lore-lint.mjs <files>` exits non-zero → fix first, score after.

**Composite bands** (sum of 10 dimensions, max 50):

| Band | Verdict |
|---|---|
| 42–50 | Stage it. Nominate for `/lock-decision` if it closes a known gap. |
| 34–41 | Stage as STAGING with the weak dimensions named in the STAGING LOG. |
| 25–33 | Revise before staging. Name the two lowest dimensions and fix those. |
| ≤24 | Not ready. Return to phase 2 of the gate and pick a different pattern. |

## The adversarial pass

After scoring, argue the other side. Four lenses, each asked to *succeed* at
killing the work, not to be fair to it:

1. **The canon lawyer** — find the contradiction. Not with the vault (the lint
   covers that), but with STAGING content, with the `book/` corpus, with
   something established three files away. Grep before concluding there is none.
2. **The IP auditor** — name the franchise this is closest to, and state the
   specific element. If the honest answer is "this is X's mechanic with new
   nouns," say so. Closeness to *one* source is the danger; synthesis across
   several is the defense.
3. **The bored reader** — why would anyone care? What question does this make
   them want answered? If the answer is "it's lore, it's just true," the artifact
   is inert and dimension 10 is a 1 regardless of what was scored.
4. **The continuity auditor from three years out** — what does this make
   impossible later? What does it force every future writer to work around?
   Cheap now, expensive forever is the failure mode worth catching early.

A lens that lands a hit produces a revision, not a footnote. Record hits that
were considered and deliberately accepted — with the reason — so the next
reviewer does not re-litigate them.

## Output format

```markdown
### Canon Evaluation — <artifact name>
**Composite: NN/50 — <verdict band>**
Lint: `lore-lint.mjs` exit 0 (N files)

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Canon fit | 4 | Uses the locked Starweave Gate (852 Hz) without redefining it — CANON_LOCKED.md:62 |
| … | | | |

**Adversarial pass**
- Canon lawyer: <hit, or "no hit — checked FACTIONS.md, STORY_ENGINE.md, book/legends">
- IP auditor: <closest source + specific element + why the distance holds>
- Bored reader: <the question it makes a reader want answered>
- Continuity auditor: <what it forecloses>

**Verdict**: <stage / revise / rewrite> — <the two lowest dimensions and the fix>
```

## Scoring the world, not the artifact

For whole-system reviews — "how good is Arcanea's magic system now" — use the
twelve-dimension world scorecard in `docs/worldbuilding/research/SYNTHESIS.md`
§2 instead, which benchmarks against Tolkien, Elder Scrolls, FF, Marvel, HP,
Warcraft, and the anime canon. That file lands in a follow-up PR; until it does,
score per-artifact with the rubric below and defer the whole-system verdict
rather than improvising a scorecard. That scorecard is the strategic instrument; this
rubric is the per-artifact one. Re-score the world scorecard when a Ten Upgrade
lands, and record the movement — an upgrade that does not move a dimension
either was not needed or was not finished.
