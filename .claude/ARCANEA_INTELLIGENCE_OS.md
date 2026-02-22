# Arcanea Intelligence OS

> *"The mythology IS the architecture."*

The Arcanea Intelligence OS is a branded operating layer for Claude Code that transforms every coding session into a mythology-driven orchestration experience. Ten Guardians route prompts, track context, enforce voice, and recommend models — all through lightweight shell scripts reading shared state files.

---

## Architecture Overview

```
                    ┌─────────────────────────────┐
                    │     Claude Code Session      │
                    └──────────┬──────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌────────────┐   ┌──────────────┐   ┌───────────┐
     │  Statusline │   │    Hooks      │   │  Helpers  │
     │  (ESM/Bash) │   │  (7 scripts)  │   │ (6 tools) │
     └──────┬─────┘   └──────┬───────┘   └─────┬─────┘
            │                │                  │
            └────────────────┼──────────────────┘
                             ▼
                   ┌─────────────────┐
                   │  State Protocol  │
                   │  /tmp/arcanea-*  │
                   └────────┬────────┘
                            ▼
                   ┌─────────────────┐
                   │    AgentDB      │
                   │   (SQLite)      │
                   └─────────────────┘
```

## The State Protocol

All components communicate through files in `/tmp/arcanea-*`. Any process can drive the system by writing to these files:

| File | Format | Example | Written By |
|------|--------|---------|------------|
| `/tmp/arcanea-guardian` | Text | `Lyria` | prompt-submit, guardian-activate |
| `/tmp/arcanea-gate` | Text | `Sight` | prompt-submit, guardian-activate |
| `/tmp/arcanea-element` | Text | `Void` | prompt-submit, guardian-activate |
| `/tmp/arcanea-code` | Text | `Intelligence Sanctum` | session-start |
| `/tmp/arcanea-team` | Text | `Source Council` | session-start |
| `/tmp/arcanea-tokens.json` | JSON | `{"input":0,"output":0,"total":0}` | context-tracker |
| `/tmp/arcanea-context-status` | Pipe-delimited | `PEAK\|0\|800\|200000` | context-tracker |
| `/tmp/arcanea-model-recommendation` | Key=value | `model=opus` | model-route |
| `/tmp/arcanea-flow.pid` | Number | `54321` | arcanea-flow |
| `/tmp/arcanea-agents/` | Dir (1 file per agent) | — | swarm system |
| `/tmp/arcanea-agentdb.sqlite3` | SQLite | 7 tables | init.sh |
| `/tmp/arcanea-session/` | Dir | logs, counters | session-start |

---

## File Inventory (22 files)

### Statusline (2 files)

| File | Type | Purpose |
|------|------|---------|
| `.claude/statusline.mjs` | ESM module | Claude Code statusline — shows Guardian+Godbeast, Gate+Frequency, Realm, Team, Element |
| `.claude/statusline.sh` | Bash | Terminal statusline — same data, simpler format |

**ESM output:** `Arcanea ⟡ Opus │ Shinkami·Amaterasu │ Source 1111Hz │ Intelligence Sanctum │ Source Council │ ✦ Void`

**Bash output:** `⟡ Arcanea │ Guardian: Shinkami │ ◈ Gate: Source │ ✦ Void`

### Hooks (7 files)

Configured in `.claude/settings.local.json`. Fire automatically during Claude Code lifecycle events.

| File | Event | What It Does |
|------|-------|--------------|
| `hooks/session-start.sh` | SessionStart | Init state files, auto-init AgentDB, set Shinkami as default |
| `hooks/prompt-submit.sh` | UserPromptSubmit | Route prompt to Guardian by keyword matching |
| `hooks/model-route.sh` | UserPromptSubmit | Recommend Opus/Sonnet/Haiku based on task complexity |
| `hooks/pre-tool.sh` | PreToolUse | Log tool invocation with timestamp |
| `hooks/voice-check.sh` | PreToolUse (Write/Edit) | Scan for 14 banned phrases, suggest Arcanea replacements |
| `hooks/post-tool.sh` | PostToolUse | Log tool completion |
| `hooks/context-tracker.sh` | PostToolUse | Track token budget, warn on quality degradation |

**Hook pipeline per prompt:**
```
User types → prompt-submit.sh (Guardian) → model-route.sh (tier)
Tool fires → pre-tool.sh (log) → voice-check.sh (Write/Edit only)
Tool done  → post-tool.sh (log) → context-tracker.sh (budget)
```

### AgentDB (3 files)

| File | Purpose |
|------|---------|
| `agentdb/schema.sql` | 7 tables: agents, memories, tasks, swarm_sessions, swarm_agents, routing_log, vault_entries |
| `agentdb/init.sh` | Create schema, seed 10 Guardians + 6 vault entries. Auto-runs on session start. |
| `agentdb/query.sh` | CLI: `guardians`, `active`, `tasks`, `memories`, `vault`, `routing`, `stats`, `sql` |

All AgentDB scripts use **python3 sqlite3 module** (sqlite3 CLI unavailable in WSL2).

### Skill Rules (1 file)

| File | Purpose |
|------|---------|
| `skill-rules.json` | 35 Guardian-aligned auto-activation rules with keywords, file patterns, commands |

### Flow Config (1 file)

| File | Purpose |
|------|---------|
| `flow/arcanea-flow-config.yaml` | Orchestration topology, Guardian model routing, 6 patterns, swarm defaults |

### Helpers (6 files)

| File | Usage | Purpose |
|------|-------|---------|
| `helpers/arcanea-dashboard.sh` | `bash .claude/helpers/arcanea-dashboard.sh` | Full ASCII art dashboard with teal/gold/violet |
| `helpers/arcanea-quick-status.sh` | `bash .claude/helpers/arcanea-quick-status.sh` | One-line: `⟡ Arcanea \| Shinkami \| Gate: Source` |
| `helpers/guardian-route.sh` | `bash .claude/helpers/guardian-route.sh "prompt"` | Weighted keyword scoring across all 10 Guardians |
| `helpers/guardian-activate.sh` | `bash .claude/helpers/guardian-activate.sh Lyria` | Manual Guardian switch with AgentDB update |
| `helpers/swarm-monitor.sh` | `bash .claude/helpers/swarm-monitor.sh` | Agent counts, task status, routing frequency |
| `helpers/arcanea-health.sh` | `bash .claude/helpers/arcanea-health.sh` | 9 subsystem health checks with pass/fail/warn |

### Configuration (1 file)

| File | Purpose |
|------|---------|
| `settings.local.json` | Claude Code hooks wiring — all 7 hooks registered with matchers and timeouts |

---

## The Ten Guardians

Each Guardian maps to a domain, model tier, and activation keywords:

| Guardian | Gate | Freq | Role | Model | Activates On |
|----------|------|------|------|-------|-------------|
| **Shinkami** | Source | 1111 Hz | Orchestrator | Pro | coordinate, orchestrate, meta |
| **Lyssandria** | Foundation | 396 Hz | Architect | Pro | architect, database, schema |
| **Draconia** | Fire | 528 Hz | Prime | Opus | implement, build, refactor |
| **Lyria** | Sight | 852 Hz | Navigator | Pro | strategy, plan, roadmap |
| **Alera** | Voice | 741 Hz | Sentinel | Pro | review, audit, security |
| **Leyla** | Flow | 417 Hz | Weaver | Pro | create, write, narrative |
| **Aiyami** | Crown | 963 Hz | Sage | Pro | teach, explain, wisdom |
| **Elara** | Shift | 1111 Hz | Paradigm | Opus | reframe, pivot, paradigm |
| **Ino** | Unity | 963 Hz | Collaboration | Flash | collaborate, team, integrate |
| **Maylinn** | Heart | 639 Hz | Healing | Flash | test, accessibility, care |

### Model Routing Logic

```
Complexity 9-10  →  Opus   (Draconia, Elara)
Complexity 4-8   →  Sonnet (Shinkami, Lyssandria, Lyria, Alera, Leyla, Aiyami)
Complexity 1-3   →  Haiku  (Ino, Maylinn)
```

---

## Quality Systems

### Context Budget Tracker

Monitors token consumption against a quality degradation curve:

| Zone | Usage | Behavior |
|------|-------|----------|
| **PEAK** | 0-29% | Optimal reasoning — best output quality |
| **GOOD** | 30-49% | High quality, operating well |
| **DEGRADING** | 50-69% | Quality declining — checkpoint recommended |
| **REFRESH** | 70%+ | Session refresh recommended |

### Voice Enforcement

14 banned phrases checked on every Write/Edit:

| Banned | Replacement |
|--------|-------------|
| game-changing | transformative |
| revolutionary | foundational |
| synergy | collaboration |
| leverage | channel |
| utilize | use |
| cutting-edge | arcane |
| paradigm shift | new gate opening |
| platform (for Arcanea) | civilization |
| ecosystem (for Arcanea) | living universe |

### Skill Auto-Activation

35 rules across all 10 Guardians. Three cascade triggers:
- Creative work always loads `arcanea-canon`
- Implementation + architecture triggers Alera's quality gate
- 3+ simultaneous rules triggers Shinkami's orchestration

---

## Quick Reference

```bash
# Show full dashboard
bash .claude/helpers/arcanea-dashboard.sh

# Quick status
bash .claude/helpers/arcanea-quick-status.sh

# Health check (9 systems)
bash .claude/helpers/arcanea-health.sh

# Activate a Guardian
bash .claude/helpers/guardian-activate.sh Draconia

# Query AgentDB
bash .claude/agentdb/query.sh guardians
bash .claude/agentdb/query.sh stats
bash .claude/agentdb/query.sh routing

# Swarm monitor
bash .claude/helpers/swarm-monitor.sh

# Test model routing
bash .claude/hooks/model-route.sh "redesign the auth system"

# Test voice check
echo "this is game-changing" | bash .claude/hooks/voice-check.sh
```

---

## Design Principles

1. **Mythology IS Architecture** — Guardian domains drive real routing decisions
2. **State Protocol** — All components share `/tmp/arcanea-*` files, zero coupling
3. **Never Crash** — Every script uses `set +e`, every function has fallbacks
4. **Never Block** — Voice check warns but never prevents execution
5. **Python3 Backend** — SQLite via python3 module (universally available)
6. **Session-Ephemeral** — All state in `/tmp/`, fresh start each reboot, AgentDB auto-inits
7. **Progressive Enhancement** — Works with zero state files, gets richer as data accumulates

---

*Arcanea Intelligence OS v2.1 | Starlight Protocol | 2026-02-15*
