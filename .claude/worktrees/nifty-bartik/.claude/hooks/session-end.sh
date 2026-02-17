#!/usr/bin/env bash
# Arcanea Intelligence OS — Session End Hook
# Summarizes the session and writes stats to AgentDB vault_entries.
set +e

ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
SESSION_DIR="$ARCANEA_HOME/sessions/current"
DB_PATH="${ARCANEA_DB:-$ARCANEA_HOME/agentdb.sqlite3}"
TIMESTAMP="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

# Read session metrics
TOOL_COUNT=$(cat "$SESSION_DIR/tool-count" 2>/dev/null || echo "0")
ROUTING_COUNT=$(wc -l < "$SESSION_DIR/routing.log" 2>/dev/null || echo "0")
START_TIME=$(cat "$SESSION_DIR/start.log" 2>/dev/null | head -1 | sed 's/\[//' | sed 's/\].*//')

# Read final context state
CONTEXT_STATUS=$(cat "$SESSION_DIR/context-status" 2>/dev/null || echo "UNKNOWN|0|0|200000")
ZONE=$(echo "$CONTEXT_STATUS" | cut -d'|' -f1)
PCT=$(echo "$CONTEXT_STATUS" | cut -d'|' -f2)

# Read final Guardian
GUARDIAN=$(cat "$SESSION_DIR/guardian" 2>/dev/null || echo "Shinkami")

# Build session summary
SUMMARY="Session ended at $TIMESTAMP. Tools used: $TOOL_COUNT. Routing decisions: $ROUTING_COUNT. Final Guardian: $GUARDIAN. Context: ${ZONE} (${PCT}%)."

# Log session end
echo "[$TIMESTAMP] Session ended. $SUMMARY" >> "$SESSION_DIR/start.log"

# Write session summary to AgentDB
if [ -f "$DB_PATH" ]; then
  SESSION_ID="session-$(date +%Y%m%d-%H%M%S)"
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("$DB_PATH")
c = db.cursor()

# Write session summary to vault
c.execute(
    "INSERT OR REPLACE INTO vault_entries (id, layer, category, key, value, source) VALUES (?,?,?,?,?,?)",
    ("$SESSION_ID", "INTELLECT", "session", "summary", "$SUMMARY", "session-end-hook")
)

# Reset all agents to idle
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP")

db.commit()
db.close()
PYEOF
fi

# Bridge: AgentDB → SIS Memory (compound learning loop)
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$HOOK_DIR/bridge-agentdb-to-sis.sh" ]; then
  bash "$HOOK_DIR/bridge-agentdb-to-sis.sh" 2>/dev/null
fi

# Archive current session
ARCHIVE_DIR="$ARCANEA_HOME/sessions/archive/$(date +%Y%m%d-%H%M%S)"
if [ -d "$SESSION_DIR" ]; then
  mkdir -p "$ARCANEA_HOME/sessions/archive"
  cp -r "$SESSION_DIR" "$ARCHIVE_DIR" 2>/dev/null
fi

echo "Session archived. $SUMMARY"
