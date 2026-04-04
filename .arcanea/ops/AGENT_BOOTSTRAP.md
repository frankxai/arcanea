# Arcanea Agent Bootstrap

Every coding agent in this repo MUST read this file at session start.

## Read Order

1. `AGENTS.md` — repo contract
2. `planning-with-files/CURRENT_STATE_*` (newest)
3. `planning-with-files/CURRENT_BACKLOG_*` (newest)
4. `.arcanea/ops/ao.md` — ops protocol

## Product Context

Arcanea is a BYOK-first creative intelligence workspace.
- Next.js 16 + React 19 + TypeScript strict
- Supabase + Postgres for workspace and graph state
- Vercel AI SDK 6 for provider integration

## Commands (All Agents)

These commands live in `.arcanea/ops/commands/`. Every agent should support them:

| Command | File | What |
|---------|------|------|
| `status` | `.arcanea/ops/commands/status.md` | Git state dashboard |
| `handover` | `.arcanea/ops/commands/handover.md` | Write session handover doc |
| `digest` | `.arcanea/ops/commands/digest.md` | Process pasted agent output |
| `cleanup` | `.arcanea/ops/commands/cleanup.md` | Clean stale worktrees |

For the full orchestrator with promote/coach/plan modes, read `.arcanea/ops/ao.md`.

## Rules (All Agents)

- Never work directly on dirty `main`
- Verify with exact commands, not intuition
- Use task contracts for substantial work
- Never `git add .` — stage specific files only
- Max 2 worktrees at a time
- End every session with a handover (create `docs/ops/SHORT_STATUS_AND_HANDOVER_{date}.md`)
- Start every session by reading the latest handover doc

## Shared Intelligence

All shared Arcanea knowledge lives in `.arcanea/`:
- `lore/` — canon, guardians, mythology
- `config/` — design tokens, model routing, voice
- `ops/` — orchestrator, commands, agent bootstrap
- `prompts/` — luminor engineering kernel, session prompts

## Agent Config Map

| Agent | Config dir | Format | Connected repo |
|-------|-----------|--------|----------------|
| Claude Code | `.claude/` | commands/*.md, skills/*/SKILL.md | `frankxai/claude-arcanea` |
| Codex | `.codex/` | instructions.md | (uses this repo) |
| Cursor | `.cursor/` | rules/*.mdc | (uses this repo) |
| Gemini | `.gemini/` | instructions.md, GEMINI.md | (uses this repo) |
| OpenCode | `.opencode/` | commands/*.md, agents/*.md | `frankxai/oh-my-arcanea` |
| Antigravity | `.antigravity/` | (TBD) | (planned) |

All configs should be thin shims pointing to `.arcanea/ops/AGENT_BOOTSTRAP.md`.
