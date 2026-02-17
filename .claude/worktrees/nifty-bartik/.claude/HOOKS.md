# Arcanea Intelligence OS — Hook Pipeline

## Architecture

All state persists at `~/.arcanea/` (survives reboots). Session state lives in `~/.arcanea/sessions/current/`.

```
~/.arcanea/
  agentdb.sqlite3              # Persistent SQLite database (10 Guardians, vaults, routing logs, memories)
  sessions/
    current/                   # Active session state
      tokens.json              # Token budget tracking
      guardian                 # Active Guardian name
      gate                     # Active Gate name
      routing.log              # Session routing decisions
      tools.log                # Tool invocation log
      tool-count               # Cumulative tool count
      context-status           # ZONE|pct|total|max
      model-recommendation     # Current model tier recommendation
      voice-violations.log     # Voice Bible violations
      start.log                # Session start/end timestamps
      prev-zone                # Previous context zone (for transition detection)
    archive/                   # Archived sessions (timestamped copies)
```

## Hook Pipeline

### 1. SessionStart
**File:** `hooks/session-start.sh`
- Creates `~/.arcanea/sessions/current/`
- Auto-initializes AgentDB if missing (calls `agentdb/init.sh`)
- Resets all agents to idle, activates Shinkami
- Initializes token tracking, tool count, log files

### 2. UserPromptSubmit
**Files:** `hooks/prompt-submit.sh`, `hooks/model-route.sh`

**prompt-submit.sh:**
- Keyword-based Guardian routing (10 Guardians, pattern-matched)
- Writes active Guardian/Gate to session files
- INSERTs routing decision into AgentDB `routing_log` table
- Updates agent status in AgentDB (previous → idle, matched → active)

**model-route.sh:**
- Complexity scoring (keywords → 1-10 scale)
- Maps complexity to model tier: opus (9-10), sonnet (4-8), haiku (1-3)
- Writes structured recommendation to session file

### 3. PreToolUse
**Files:** `hooks/pre-tool.sh`, `hooks/voice-check.sh`

**pre-tool.sh** (matcher: Task|Bash|Write|Edit):
- Increments tool count
- Logs tool start to `tools.log`

**voice-check.sh** (matcher: Write|Edit):
- Scans content for 14 banned phrases per Voice Bible v2.0
- Suggests replacements (advisory only, never blocks)
- Logs violations to `voice-violations.log`

### 4. PostToolUse
**Files:** `hooks/post-tool.sh`, `hooks/context-tracker.sh`

**post-tool.sh** (matcher: Task|Bash|Write|Edit|Read|Grep|Glob|WebFetch|WebSearch):
- Logs tool completion with output size
- For Write/Edit/Bash with substantial output: INSERTs to AgentDB `memories` table

**context-tracker.sh:**
- Estimates token cost per tool type
- Tracks cumulative usage against 200K budget
- Determines quality zone: PEAK (<30%), GOOD (30-50%), DEGRADING (50-70%), REFRESH (70%+)
- On zone transitions: writes snapshot to AgentDB memories

### 5. Stop
**File:** `hooks/session-end.sh`
- Summarizes session (tool count, routing count, final Guardian, context zone)
- INSERTs session summary into AgentDB `vault_entries`
- Resets all agents to idle
- Archives session to `~/.arcanea/sessions/archive/`

## AgentDB Schema

| Table | Purpose |
|-------|---------|
| `agents` | 10 Guardians with status, model, element |
| `memories` | Tool logs, context snapshots, per-agent knowledge |
| `tasks` | Task tracking with Guardian assignment |
| `vault_entries` | Persistent knowledge layers (INTELLECT/EMOTION/ARCANA/HORIZON) |
| `routing_log` | Every prompt → Guardian routing decision |
| `swarm_sessions` | Multi-agent coordination sessions |
| `swarm_agents` | Agent-to-swarm membership |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `ARCANEA_HOME` | `~/.arcanea` | Root directory for all persistent state |
| `ARCANEA_DB` | `~/.arcanea/agentdb.sqlite3` | AgentDB path |
| `ARCANEA_MAX_TOKENS` | `200000` | Context budget ceiling |

## Query Tool

```bash
# Quick commands
bash .claude/agentdb/query.sh guardians    # All 10 Guardians
bash .claude/agentdb/query.sh active       # Currently active Guardian
bash .claude/agentdb/query.sh routing      # Routing frequency by Guardian
bash .claude/agentdb/query.sh stats        # Full stats overview
bash .claude/agentdb/query.sh memories     # Recent memories
bash .claude/agentdb/query.sh vault        # Vault entries
bash .claude/agentdb/query.sh tasks        # Recent tasks
bash .claude/agentdb/query.sh sql 'SELECT ...'  # Custom SQL
```
