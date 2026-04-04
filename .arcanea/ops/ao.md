# Arcanea Orchestrator (AO) — Shared Agent Reference

This file is readable by ALL agents (Claude, Codex, Cursor, Gemini, opencode).

## What AO Does

AO is the ops coordination layer for the Arcanea ecosystem. It enforces promotion discipline, tracks branch state, and coordinates multi-agent work.

## Subcommands

| Command | What |
|---------|------|
| `ao status` | Repo/branch/agent dashboard |
| `ao promote` | Verified promotion workflow |
| `ao digest` | Extract key fields from agent output |
| `ao coach` | Optimal ops workflow rules |
| `ao cleanup` | Clean stale worktrees/branches |
| `ao plan` | Plan sustained execution sessions |
| `ao handover` | Write durable session handover doc |
| `ao sync` | Sync shared intelligence to all connected repos |

## How to Run AO

### Claude Code
```
/ao status
/ao handover
/ao promote
```

### Codex / Other Agents
Read this file, then follow the protocol:

**Status:** Run `git status --short --branch && git log --oneline -8 --decorate && git worktree list`

**Handover:** At session end, create `docs/ops/SHORT_STATUS_AND_HANDOVER_{date}.md` with:
- What landed (commits)
- What changed (files)
- Blockers
- Recommended next stack
- Verification evidence

**Promote:** Never merge to main without:
1. Clean worktree from origin/main
2. Passing: type-check, test:projects, build, playwright
3. Staging only scoped files
4. Updating docs/ops state after merge

**Digest:** When sharing work with another agent, run:
```bash
git log --oneline -5 --decorate && git diff --stat && git status --short
```
Share ONLY that output, not the full terminal.

## Source of Truth

1. `AGENTS.md` — repo contract
2. `planning-with-files/*` — execution control plane
3. `docs/ops/*` — branch matrix, handovers, action logs
4. `.arcanea/ops/ao.md` — this file (shared agent reference)

## Anti-Patterns

- Never merge mixed integration branches wholesale
- Never create more than 2 worktrees at once
- Never skip verification
- Never paste 20K tokens of terminal — use digest
- Never work on dirty main
- Never `git add .` — stage specific files only
