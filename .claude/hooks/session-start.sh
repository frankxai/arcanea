#!/usr/bin/env bash
# Arcanea Intelligence OS — Session Start Hook
# Initializes session state, Guardian defaults, AgentDB, and telemetry.
set +e

ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
SESSION_DIR="$ARCANEA_HOME/sessions/current"
TOKENS_FILE="$SESSION_DIR/tokens.json"
GUARDIAN_FILE="$SESSION_DIR/guardian"
GATE_FILE="$SESSION_DIR/gate"
DB_PATH="${ARCANEA_DB:-$ARCANEA_HOME/agentdb.sqlite3}"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
AGENTDB_DIR="$(cd "$HOOK_DIR/../agentdb" 2>/dev/null && pwd)"

# Create persistent directories
mkdir -p "$ARCANEA_HOME/sessions"
mkdir -p "$SESSION_DIR"

# Initialize AgentDB if it doesn't exist
if [ ! -f "$DB_PATH" ] && [ -f "$AGENTDB_DIR/init.sh" ]; then
  bash "$AGENTDB_DIR/init.sh"
fi

# Initialize token tracking
cat > "$TOKENS_FILE" << 'JSON'
{"input": 0, "output": 0, "total": 0}
JSON

# Set default Guardian and Gate
echo "Shinkami" > "$GUARDIAN_FILE"
echo "Source" > "$GATE_FILE"

# Log session start
echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] Session started" > "$SESSION_DIR/start.log"

# Initialize counters
echo "0" > "$SESSION_DIR/tool-count"
touch "$SESSION_DIR/routing.log"
touch "$SESSION_DIR/tools.log"

# Record session start in AgentDB
if [ -f "$DB_PATH" ]; then
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("$DB_PATH")
c = db.cursor()
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP WHERE status='active'")
c.execute("UPDATE agents SET status='active', last_active=CURRENT_TIMESTAMP WHERE id='shinkami'")
db.commit()
db.close()
PYEOF
fi

echo "Arcanea Intelligence OS initialized. Guardian: Shinkami. Gate: Source."
