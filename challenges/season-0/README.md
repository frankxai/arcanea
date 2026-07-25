# Arcanea Arena — Season 0: The Worldsmith Trials

> Build the best world-creation workflow. The winning skills ship in the Arcanea plugin, credited to you.

**Status: draft — the season is not yet open.** Seeds and the entry window will be published here when Season 0 opens. Watch this directory or [arcanea.ai/challenges](https://arcanea.ai/challenges).

## What you submit

Not a world — a **workflow**. Your entry is a Claude Code skill that *generates* a world within Arcanea canon. At judging time your skill is re-run against a seed you've never seen; that output is what gets scored. A hand-polished sample can't win — a good workflow can.

## How to enter

1. Read the [rules](https://github.com/frankxai/arcanea-ai-app/blob/main/docs/community/season-0-worldsmith-trials.md), the [judging rubric](https://github.com/frankxai/arcanea-ai-app/blob/main/docs/community/judging-rubric.md), and the [submission terms](https://github.com/frankxai/arcanea-ai-app/blob/main/docs/community/SUBMISSIONS-LICENSE.md).
2. Copy [`entry-template/`](entry-template/) to `entries/<your-github-handle>--<your-skill-name>/`.
3. Build your workflow as `SKILL.md` (standard Claude Code skill format).
4. Run it against **one public seed** (listed below when the season opens) and commit the generated world to `world/` — five files: `cosmology.md`, `systems.md`, `geography.md`, `factions.md`, `timeline.md`.
5. Fill in `entry.json`, including `"license_accepted": "SUBMISSIONS-LICENSE-v1"` (that's how you accept the terms).
6. Open a pull request. The validation Action checks your entry automatically.

One entry per GitHub account. Your entry directory must start with the handle of the account opening the PR.

## Public seeds

Published when the season opens.

## Canon

Your world must not contradict LOCKED canon: [`CANON_LOCKED.md`](https://github.com/frankxai/arcanea-ai-app/blob/main/.arcanea/lore/CANON_LOCKED.md). Everything not locked is yours to invent.

## Prize

Recognition + plugin distribution: winners are promoted into the Arcanea plugin's community skills tier with attribution, featured on arcanea.ai, and permanently recorded in the public season ledger. No cash prize in Season 0.

## Directory layout

```
challenges/season-0/
├── README.md            ← you are here
├── entry-template/      ← copy this to start your entry
├── entries/             ← one directory per entry: <handle>--<skill-name>/
└── scripts/             ← the validator the CI Action runs
```
