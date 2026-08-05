# Campaign — Higgsfield Global Film Festival 2026

> Two films, three repos, twenty-six days. This is the operating plan.
> **Verify every rule below against the live contest page before committing** —
> the rules were assembled from search results because
> `higgsfield.ai/contests/higgsfield-global-film-festival` returns 403 from this
> environment. Where sources disagreed, the plan uses the stricter reading.

---

## 1. The window

| Fact | Value | Confidence |
|---|---|---|
| Submissions open | **7 Aug 2026** | high |
| Submissions close | **31 Aug 2026, 23:59 PT** | high |
| Prize pool | $1,000,000 across 14 winners (1st $500k · 2nd $200k · 3rd $100k · Audience Choice $100k · 10 × $10k) | high |
| Tracks | series-episode · synopsis-based · freeform | high |
| Entries | up to 4, **max 1 per track** | medium — one source said 10; plan for 1 per track |
| Runtime | **min 3:00**, recommended ≤5:00 | medium — one source said 15s–5:00; both films target 3:40–4:10, which satisfies either |
| Team size | up to 4 | medium |
| Eligibility | 18+, active Higgsfield subscription | high |
| Winners announced | late Sept / early Oct | high |
| Judging | internal jury, five published weighted criteria. Confirmed: **Cinematic Quality 25% · Storytelling & Creativity 25% · Technical Execution 20%.** Remaining 30% across two criteria — **unconfirmed** | medium |
| Jury | includes **Ed Catmull** (Pixar co-founder, 5× Oscar, ex-President Disney Animation), plus production veterans, VFX studios, AI-native creators | high |

**Today is 5 Aug.** Two days before entry opens, twenty-six before it closes.

**Action before anything else:** open the live rules page, confirm the seven
medium-confidence rows, confirm the subscription is active, and confirm the two
unknown judging criteria. Thirty minutes that de-risks the month.

---

## 2. Who we are actually making this for

The brief said the ICP are the judges. Correct — and the composition of this
jury is unusually legible, which is a gift.

**Ed Catmull is the design constraint.** He wrote the book on why technology
never rescues a bad story, ran a studio whose entire methodology was *protect
the fragile early idea and then subject it to brutal candid review*, and has
spent forty years watching people mistake a rendering breakthrough for a movie.
Of everyone who could be on this jury, he is the least impressible by model
horsepower and the most impressible by a character you believe in.

What this jury is scored to reward, and what that means for us:

| Criterion | What it rewards | Our answer |
|---|---|---|
| Storytelling & Creativity 25% | A turn, a want, a reason to care | One reversal per film, located at a timecode, written before any generation |
| Cinematic Quality 25% | Composition, light, restraint, coherence | A declared formal rule per film that a viewer feels without naming |
| Technical Execution 20% | Consistency, control, competence | Character-ID reuse, a full generation ledger, deliberate hand shots |
| ~30% unconfirmed | likely sound, originality, or emotional impact | Designed sound in both films — the field's largest quality gap — and two premises nobody else can make |

**The competitive read.** Four thousand entries, most of them made in the last
three weeks by people with identical model access. The centre of that
distribution is: neon dystopia, a lone survivor, sweeping drone photography, an
orbital hero shot, a gravelly voiceover about what humanity lost, and a score
doing all the emotional work. A jury will watch several hundred of those.

We do not try to be a better version of that film. We submit two films that are
**structurally unable** to be that film:

- *Holdfast* — camera never leaves the ground, no visible magic, no score, and
  the climax is a sound stopping.
- *What He Left Running* — no interface in a film about a computer, the dead
  father is never heard, 4:3, no score.

Both are refusal-shaped. Refusal is the only thing in this medium that cannot be
brute-forced with more compute, and it is the thing this specific jury is
trained to recognise as authorship.

---

## 3. Track allocation

| Track | Film | Why |
|---|---|---|
| **Series episode** | **HOLDFAST** (Arcanea) | It is genuinely episode one of something. Canon exists, the turn opens rather than closes, and the last shot widens from one person to a system. The IP compounds whether or not it places. |
| **Freeform** | **WHAT HE LEFT RUNNING** (Starlight) | No brief to hide behind; wins on being unreproducible. Drawn from a real system with real invariants. |
| Synopsis-based | — | Only enter if the provided synopsis genuinely fits. Do not manufacture a third film to fill a slot; a weak third entry costs attention and adds nothing. |

---

## 4. Repo structure and why it is split this way

Three locations, one rule: **craft is shared, canon stays sovereign.**

```
frankxai/claude-skills-library
└── packs/film-excellence/          ← the durable craft layer
    ├── DOCTRINE.md                  five laws, refusal list, evidence rule
    ├── LANGUAGE.md                  The Spoken Law — the dialogue system
    ├── film-design.md               token contract template
    ├── film-taste.md                restraint test template
    ├── CREW.md                      seven chairs, model routing, bake-off
    ├── PIPELINE.md                  eight stages
    └── skills/film-release-gate/    the entry-point skill

frankxai/arcanea
└── films/holdfast/                  ← canon-bound, CC-BY-NC Arcanea canon
    ├── BIBLE.md  CHARACTERS.md  TREATMENT.md  LOOK-AND-SOUND.md

frankxai/Starlight-Intelligence-System
└── films/what-he-left-running/      ← canon-free, substrate register
    ├── BIBLE.md  CHARACTERS.md  TREATMENT.md  LOOK-AND-SOUND.md
```

**Why not one new `starlight-films` repo?** Because it would have to hold
Arcanea canon, and SIP § Sovereignty says the substrate does not absorb vertical
canon. Splitting craft from canon is the same boundary the protocol already
draws everywhere else, so nothing new has to be reasoned about.

**Why a pack in `claude-skills-library`?** Because `web-excellence` already
proved the shape in this estate: vendored craft, a release-gate skill, an
install script, and a one-line hook into each repo's `CLAUDE.md`. `film-excellence`
is the same contract for a different medium — `film-design.md` carries tokens,
`film-taste.md` carries refusals, `film-release-gate` sequences and defines done.
Nobody has to learn a new operating model.

**Recommend creating a dedicated repo only if** the films become a standing
production line rather than a campaign. At that point `packs/film-excellence`
subtree-splits cleanly, which is why it was built as a pack rather than as
loose files.

---

## 5. Schedule — and the honest version of it

Two films at "iconic, not slop" in 26 days is aggressive. It is achievable only
if **all writing finishes in week 1** and generation runs in parallel afterward.
The failure mode is starting generation on day 3 because the tools are fun, and
arriving at day 24 with a bin of clips and no film.

| Dates | Phase | Gate |
|---|---|---|
| **5–7 Aug** | Verify rules + subscription. Fable 5 bake-off (`CREW.md`). Canon-keeper ruling on the Kaelith question. Lock names. | Rules confirmed in writing |
| **7–12 Aug** | **Writing week.** Both scripts to lock: beats → script → subtract-three → language checklist. Sound maps written. Shot lists built. | **12 Aug: SCRIPTS LOCKED.** Hard gate. |
| **12–15 Aug** | Character references generated, character IDs captured, look tests on 6 shots per film. | Faces hold across 6 shots |
| **15–24 Aug** | **Generation.** Pipelined per shot, batches of 12, every batch screened. Sound built in parallel from day one of this phase. | Taste Gate per shot |
| **24–27 Aug** | Assembly to the sound map. Cold watch. `film-release-gate`. | Gate certifies |
| **27–29 Aug** | Fixes from the gate. Second cold watch. | Gate certifies again |
| **29–30 Aug** | Submit. Copy passes the language refusals in `film-taste.md`. | Submitted |
| **31 Aug** | Buffer. Do not use it. | — |

### The decision gate — read this on 12 August

**If both scripts are not locked on 12 August, cut to one film.** Keep *Holdfast*.

Reasons, in order: the series-episode track is the strongest fit; the Arcanea IP
compounds regardless of placement; and one certified film beats two that miss
the gate. A second entry adds an expected-value ticket, not a second chance — the
jury is scoring craft, and split attention is visible in the cut.

The bibles are the durable asset either way. *What He Left Running* survives an
unmade year unharmed; it is a better film in October than a rushed one in August.

---

## 6. Crew and model routing

Full detail in `packs/film-excellence/CREW.md`. Summary:

Seven chairs — Showrunner (human + Opus 5), Canon Keeper (Opus 5), Dramatist
(Opus 5), **Voice-Smith (Fable 5)**, Shot Wright (Opus 5 → Fable 5), Wrangler
(Sonnet 5), Sound Designer (Sonnet 5 → Opus 5). Two gates — Taste (Opus 5,
adversarial, may only be overruled by the human Showrunner on the record) and
Continuity (Sonnet 5).

### Where Fable 5 goes, and why

**Fable 5 runs the two high-volume creative-variance chairs: dialogue variants
and shot-prompt variants.** Both have the same job shape — produce eight to
twelve meaningfully different candidates, a human picks one. The value comes
from the *spread* of the candidate set and the quality of the human's pick, not
from any single candidate being right first time. That is a throughput-and-
diversity problem, which is where a fast model beats a slow one, and it is
exactly the wrong place to spend a reasoning premium.

Judgment stays on Opus 5: the turn, the scene order, the refusals, the cut.
Those are low-volume and irreversible.

**This routing is a hypothesis, not a fact.** Verify it with the 30-minute blind
bake-off in `CREW.md` § before committing the pipeline — score twelve variants
per model on four binaries plus spread, strip attribution, count 4/4s. Half a
day of measurement beats a month of a wrong assumption, and the estate's own
doctrine says not to take capability claims on faith.

### Workflows

Eight commands, one artifact each, in order:
`/film-bible → /film-cast → /film-beats → /film-script → /film-look →
/film-shotlist → /film-generate → /film-cut`, then `film-release-gate`.

**Writing is serial** — fanning it out produces four incompatible films.
**Generation is a pipeline, not a barrier** — each shot runs
`variants → generate → taste-check → keep or retry` on its own clock; never wait
for all shots at one stage before starting the next. **Sound runs parallel to
picture from the beat sheet onward**, which is the discipline that produces
designed sound instead of laid-on music.

---

## 7. What "done" means

`film-release-gate` refuses to certify without: the turn in one line · the
formal rule plus the two shots where it hurt · the sound map · three timecoded
hand shots · three timecoded imperfections · a logged language pass · measured
silence ≥ 20% · a complete generation ledger · and a **cold watch** — one person
who did not make it, at 1×, no scrubbing, who can answer *what did she want* and
*what changed*.

No self-assigned scores. The gate is pass/fail on evidence, for the same reason
the web gate is: the person who made the thing is the worst available judge of it.

---

## 8. Open items

- [ ] Confirm the seven medium-confidence rules on the live page
- [ ] Confirm the two unpublished judging criteria (30% of the score)
- [ ] Confirm the Higgsfield subscription is active and covers the entry
- [ ] Canon-keeper ruling: can a mortal hold a Gate closed? (`holdfast/BIBLE.md`)
- [ ] Canon fix: `arcanea/.claude/CLAUDE.md` lists Foundation at 396 Hz;
      `CANON_LOCKED.md` L55 says 174 Hz and is authoritative. Flagged, not fixed here.
- [ ] Names `Kess Andal` / `Orin Vesk` need Arcanean-quality sign-off per
      `CANON_LOCKED.md` § naming rules
- [ ] Decide whether the synopsis track is worth a third entry (default: no)
- [ ] Study the open-sourced reference builds (*Hell Grind*, *Zephyr*, *Mork*) —
      full prompts and breakdowns were published with the festival. Read them for
      **pipeline mechanics**, not for style. Their aesthetic is the centre of the
      distribution we are deliberately leaving.

---

Sources for the rules above: [Higgsfield Global Film Festival](https://higgsfield.ai/contests/higgsfield-global-film-festival) ·
[Higgsfield announcement](https://x.com/higgsfield_ai/status/2084359051627131074) ·
[AI News Blitz](https://www.ainewsblitz.com/brief/oRGjTWuOPmRv) ·
[RuntimeWire](https://runtimewire.com/article/higgsfield-1-million-ai-film-festival-public-prompts) ·
[TipRanks](https://www.tipranks.com/news/private-companies/higgsfield-uses-record-setting-ai-film-contest-to-cement-role-in-global-production-ecosystem)

Built on SIP.
