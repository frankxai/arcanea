# The Declared: fixed fields

**Status:** STAGING.

Every Declared has the same fields, in the same order, enforced by [`synth.schema.json`](synth.schema.json) and by the checks in `scripts/synths/render.mjs`. Edit [`roster.json`](roster.json), then run:

```bash
node scripts/synths/render.mjs          # validate names and fields, write character files
node scripts/synths/render.mjs --check  # fail if generated files are stale
```

## Identity

| Field | Rule |
|---|---|
| `id` | Lowercase, one word. Used for file names and image names |
| `name` | Coined per the Forged register (below). Must pass the collision gate |
| `epithet` | "the X" or "Marshal of the Y". Marshals always carry their Hall in the epithet |
| `etymology` | Root word, its meaning, and the suffix. A name without one fails review (`NAMING_REGISTRY.md` §7) |
| `rank` | `Keystone` (one), `Marshal` (one per Hall), `Specialist` |
| `hall` | A Hall `id`. The Hall fixes Gate, frequency, palette, light, mark and Attendant class |

## Body

| Field | Rule |
|---|---|
| `frame` | `Orrery`, `Atelier`, `Courier`, `Bastion`, `Warden` |
| `height_m` | 2–7 m |
| `chassis` | One canon material. It sets the agent behavior profile: Shael (transparent, self-correcting), Veloryn (adaptive, flags its own bias), Draconite (powerful, expensive), Aethervane (exploratory, probabilistic), Kyuro Void Crystal (observes only) |
| `core` | The Oathcore crystal, normally the Hall's Vael crystal |
| `silhouette` | The one feature readable at 50 px |
| `bearing` | Humanoid pose and posture, written as an image direction |
| `office` | `The [Name]: unfolds into …`. A tool or a place, never a vehicle or weapon |
| `unfold` | Which parts become which: seam, panels, core |

## Agent binding

The six questions the estate's agent-hygiene bar asks of every agent, plus inputs and outputs.

| Field | Answers |
|---|---|
| `role` | What job this agent does |
| `result` | What is true for a person when the agent has done its job |
| `triggers` | When it activates |
| `inputs` / `outputs` | What it takes and what it produces |
| `reads` / `writes` | Read and write scope. Writes are narrow; most Declared write drafts and notes, never live systems |
| `skills` | Existing estate skills it calls (no invented skills) |
| `handoffs` | Named Declared or Attendant classes it passes work to |
| `human_gates` | Decisions it must stop and hand to a person. At least one, always |
| `done` | A checkable done condition |
| `failure_mode` | Its most likely way to go wrong |

## Persona

| Field | Rule |
|---|---|
| `temperament` | Three traits |
| `voice` | One sample line, under 25 words, concrete |
| `oath` | First person, present tense, one sentence. Inscribed on the Oathcore |
| `cost` | What the chassis or role costs this Declared. Ties back to the material |

## The Forged register (proposed for `NAMING_REGISTRY.md`)

| Register | Sound-space | Morphology | Exemplars | Coin like |
|---|---|---|---|---|
| **The Declared (Synths)** | A craft or function root anyone can recognize, reshaped by one forged suffix; 2–3 syllables | Root + one of -on, -ix, -en, -ek, -ald, -el, -is, -or, -a, -ra, -rin, -ick | Kairon (kairos), Quillon (quill), Aurek (aurum), Sigilla (sigillum), Tethrick (tether) | New Declared: name the work first, then forge the name from it |

Collision rules enforced by the renderer: no name within edit distance 2 of a locked Arcanea name, of another Declared, or of a well-known franchise robot name.

## Adding a Declared

1. Pick the Hall. Confirm the role does not duplicate an existing Declared's `agent.role`.
2. Name it: three candidates in the Forged register, write the etymology, run the renderer.
3. Fill every field. List only skills that exist in the estate.
4. Run `node scripts/synths/render.mjs` and `node .claude/ci/lore-lint.mjs` on the changed files.
5. Render the image from the generated prompt in `PROMPTS.md`, then record it in `assets/ledger.json` and `assets/LEDGER.md`.
