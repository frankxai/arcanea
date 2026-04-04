# Arcanea Shared Intelligence Hub

This directory is the **tool-agnostic brain** of the Arcanea ecosystem. Any AI coding tool (Claude Code, Cursor, Codex, Gemini, arcanea-code) reads from here.

## Directory Map

| Path | Purpose |
|------|---------|
| `lore/CANON_LOCKED.md` | Immutable mythology reference |
| `lore/godbeasts/` | 10 Godbeast profiles |
| `lore/gods-goddesses/` | 10 God/Goddess profiles |
| `lore/guardians/` | Guardian system (staging/production) |
| `config/models.yaml` | Adaptive model routing per tool |
| `config/voice.yaml` | Writing voice and tone rules |
| `config/design-tokens.yaml` | Portable design system tokens |
| `skills/` | Creative and universe knowledge skills |
| `agents/` | Guardian and department agent profiles |
| `installer/manifest.yaml` | Multi-tool installation registry |
| `config.json` | Workspace repository registry |

## Architecture Principle

`.arcanea/` = shared knowledge (brain). Tool-specific directories = execution (hands).

- `.claude/` — Claude Code hooks, commands, orchestration
- `.cursorrules` — Cursor thin pointer
- `.codex/` — Codex thin pointer
- `.gemini/` — Gemini thin pointer

## For Project-Level Instructions

See the root `CLAUDE.md` and `.claude/CLAUDE.md` for project instructions, tech stack, and development workflow.

## Ops Layer (AO - Arcanea Orchestrator)

| Path | Purpose |
|------|---------|
| `ops/AGENT_BOOTSTRAP.md` | Universal agent bootstrap — read order, rules, command list |
| `ops/ao.md` | Orchestrator protocol — promote, digest, coach, cleanup, plan, handover |
| `ops/commands/status.md` | Quick git state dashboard |
| `ops/commands/handover.md` | Session handover doc writer |
| `ops/commands/digest.md` | Token-efficient agent output processor |
| `ops/commands/cleanup.md` | Stale worktree/branch cleaner |

### Bootstrap

New machine setup: `bash .arcanea/scripts/ao-init.sh` or `powershell .arcanea/scripts/ao-init.ps1`

This creates thin config shims for Claude, Codex, Gemini, Cursor, and bootstraps Starlight vaults.

### How Repos Connect

| Repo | What | Relationship |
|------|------|-------------|
| `frankxai/arcanea` | OSS framework — canonical `.arcanea/` | **source of truth** for shared intelligence |
| `frankxai/arcanea-ai-app` | Product webapp — Next.js, Supabase | consumes `.arcanea/`, adds product-specific state |
| `frankxai/claude-arcanea` | Claude Code overlay — commands, skills | distributes Claude-specific agent configs |
| `frankxai/oh-my-arcanea` | OpenCode overlay — Guardian agents | distributes OpenCode-specific agent configs |
| `frankxai/arcanea-orchestrator` | Standalone CLI (Phase 2) | will wrap AO protocol as shell commands |
| `frankxai/arcanea-flow` | Multi-agent routing | Guardian-based agent coordination |
