# Arcanea Configuration Summary

## Project Structure

| Project | Path | Type | Purpose |
|---------|------|------|---------|
| **Arcanea Core** | `/mnt/c/Users/Frank/Arcanea` | Personal | Main creative platform |
| **arcanea-opencode** | `/mnt/c/Users/Frank/arcanea-opencode` | OSS | Public fork (MIT licensed) |
| **ACOS v11** | `/mnt/c/Users/Frank/acos-intelligence-system` | Personal | Autonomous Creator OS |
| **oracle-work** | `/mnt/c/Users/Frank/oracle-work` | Oracle | Day job (separated config) |

## Model Configuration

All agents use **FREE** OpenCode models:

### Core Tier (Complex Reasoning)
- Model: `opencode/minimax-m2.1`
- Agents: Arcanea, oracle, frontend, architect, story-master, world-expander, sage, orchestrator

### Free Tier (Lightweight Tasks)
- Model: `opencode/glm-4.7-free`
- Agents: librarian, explore, document-writer, coder, reviewer, debugger, character-crafter, lore-master, prose-weaver, voice-alchemist, line-editor, continuity-guardian, archivist, scout, muse

## Configuration Files

### Main Config (Personal)
- `Arcanea/.claude/arcanea-opencode-updated.json`
- `Arcanea/.claude/settings.json`

### OSS Config (Public)
- `arcanea-opencode/config/arcanea-persona.json`

### Oracle Config (Day Job)
- `oracle-work/.claude/settings.json`
- **Separated**: Not loaded by default in Arcanea context

## Magic Words

| Command | Alias | Purpose |
|---------|-------|---------|
| `ultraworld` | ulw | World-building agents parallel |
| `ultracode` | ulc | Coding agents parallel |
| `ultrawrite` | ulwr | Writing agents parallel |
| `ultrabook` | ulb | Complete book pipeline |
| `ultrawork` | ulwk | Maximum precision mode |

## Memory Index

- Location: `.claude/memory/index.json`
- Tracks all project contexts
- Differentiates Oracle (separated) vs Personal vs OSS

## License

- **Arcanea OSS**: MIT License (public fork)
- **Arcanea Personal**: Private, Frank-specific
- **Oracle Work**: Private, Oracle-specific

---
*Last updated: 2026-02-23*