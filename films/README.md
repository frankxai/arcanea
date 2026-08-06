# films/

Narrative film work for the Arcanea universe.

| | |
|---|---|
| [`CAMPAIGN-HGFF-2026.md`](CAMPAIGN-HGFF-2026.md) | The Higgsfield Global Film Festival plan — window, jury read, track allocation, schedule, decision gate |
| [`holdfast/`](holdfast) | **HOLDFAST** — series-episode. Foundation Gate. An apprentice who has never opened a Gate is holding one shut. |

The companion film, canon-free and in the substrate register, lives in the repo
that owns that canon: `frankxai/Starlight-Intelligence-System` →
`films/what-he-left-running/`.

## How film work runs here

Through the `film-excellence` pack in
[`frankxai/claude-skills-library`](https://github.com/frankxai/claude-skills-library)
`packs/film-excellence` — the film counterpart to `web-excellence`, and the same
contract shape:

- `film-design.md` carries **tokens** — palette, lens, light, texture, sound map, cast locks
- `film-taste.md` carries **refusals** — what the film will not be
- `film-release-gate` **sequences** the eight stages and defines done
- This film's own `LOOK-AND-SOUND.md` and local refusals **outrank every skill**

Start any film work with the `film-release-gate` skill, before writing a script
or generating a frame.

### The pack is not vendored here yet

**The eight-stage pipeline and its `/film-*` commands are not runnable from this
repo today.** Unlike `web-excellence`, `film-excellence` has not been installed
into `.claude/skills/` — it currently lives only in
[`frankxai/claude-skills-library`](https://github.com/frankxai/claude-skills-library)
on an open PR (#23). Invoking `/film-bible` or `/film-script` here will find
nothing.

That is deliberate for now: vendoring from an unmerged branch would create a
copy that drifts from its source before the source is settled. Once #23 merges:

```bash
packs/film-excellence/install.sh /path/to/arcanea
```

Until then the pack is a **reference** for how this bible was built, not tooling
you can run. The documents in `holdfast/` stand on their own — they are the
output of the first six stages, produced by hand against the doctrine.

## Canon

`.arcanea/lore/CANON_LOCKED.md` is authoritative. Films bind to canon and do not
extend it — any extension needs a canon-keeper ruling recorded in the film's
`BIBLE.md` before the script locks.

## Why this sits at the repo root

The root `CLAUDE.md` says markdown belongs under `/docs`. `films/` deliberately
does not, for the same reason `book/` does not: this is **creative source
material**, not documentation about the project.

- `docs/` describes how the system works. A story bible is the work itself.
- `book/` holds the Library's seventeen text collections — a different creative
  form, already at the root on the same logic.
- `lore/`, `design/`, and `games/` follow the same pattern.

A film bible read as documentation gets treated as reference and drifts. Read as
source, it gets versioned, reviewed, and locked — which is what the eight-stage
pipeline assumes.

Raised in review as a convention question; recorded here so the next person
doesn't have to re-derive it. If a maintainer prefers `book/films/`, the move is
one `git mv` and a link fix — nothing in the pipeline depends on the path.

---

Built on SIP.
