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
