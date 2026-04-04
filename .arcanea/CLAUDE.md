# Arcanea Shared Intelligence Hub

Arcanea is a **creative multiverse** — six coexisting layers: Chat/Imagine (creation surface), Worlds (framework for building YOUR universe), Feed (social discovery), OSS (27 repos, 35 packages), Community (co-creation + governance), Academy (world-building education). arcanea.ai is BOTH a working product AND the reference world showing what the framework can build. See `Arcanea Command Center/WHAT-ARCANEA-IS (1).md` for the canonical identity document.

This directory is the **tool-agnostic brain** of the Arcanea ecosystem. Any AI coding tool (Claude Code, Cursor, Codex, Gemini, opencode, arcanea-code) reads from here.

Execution control lives in `planning-with-files/`. Shared intelligence lives in `.arcanea/`.

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
| `MASTER_PLAN.md` | **Central orchestrator — single source of truth for all pages, milestones, priorities** |
| `projects/` | Git-native PM system (.arc milestones, sprints, logs) |
| `projects/milestones/` | M001-M004 task-level tracking |
| `projects/sprints/` | Weekly sprint capacity and burndown |
| `projects/log/` | Progress narrative logs |
| `prompts/` | Session handoff prompts |

## Central Orchestrator

Read order for all agents:
1. `AGENTS.md`
2. newest `planning-with-files/CURRENT_STATE_*`
3. newest `planning-with-files/CURRENT_BACKLOG_*`
4. newest `planning-with-files/CURRENT_CHANGELOG_*`
5. newest `planning-with-files/AGENT_EXECUTION_PROTOCOL_*`
6. `.arcanea/MASTER_PLAN.md`

`MASTER_PLAN.md` remains the strategic orchestrator. `planning-with-files/` is the live execution layer.

The Master Plan contains:
- Current state of all 111 pages (LIVE/PARTIAL/STUB/PLANNED)
- 4 active milestones with task-level tracking
- 20-item priority queue (P0-P3)
- Agent routing table (which specialist for which domain)
- Cross-cutting concerns (security, design, repo sync)

**Skill**: `.claude/skills/arcanea-orchestrator.md` — auto-activates on architecture decisions

## Architecture Principle

`.arcanea/` = shared knowledge (brain). Tool-specific directories = execution (hands).

- `.claude/` — Claude Code hooks, commands, orchestration
- `.cursorrules` — Cursor thin pointer
- `.codex/` — Codex thin pointer
- `.gemini/` — Gemini thin pointer

## CRITICAL: WSL2 Storage Reality

**WSL2 does NOT have independent storage.** The VHDX file lives on `C:\`. `df -h /` inside WSL reports virtual disk capacity — this is misleading. Real available space = C: drive free space (check with `df -h /mnt/c/`).

- C: must stay above 5 GB free or WSL writes fail (EIO errors, git corruption, build breaks)
- Never report "WSL has Xn GB free" as independent from Windows disk space
- All agents (Claude Code, opencode, Cursor, Codex) must apply this constraint when estimating storage

## For Project-Level Instructions

See `AGENTS.md`, the root `CLAUDE.md`, and `.claude/CLAUDE.md` for project instructions, branch discipline, task contracts, and current execution state.
