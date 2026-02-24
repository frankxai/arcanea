#!/usr/bin/env bash
# Arcanea Intelligence OS — Session Start Hook v2.0
# Initializes session state, Guardian defaults, realm context, and AgentDB.
set +e

ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
SESSION_DIR="/tmp/arcanea-session"
DB_PATH="${ARCANEA_DB:-/tmp/arcanea-agentdb.sqlite3}"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
AGENTDB_DIR="$(cd "$HOOK_DIR/../agentdb" 2>/dev/null && pwd)"

# Create directories
mkdir -p "$ARCANEA_HOME/sessions"
mkdir -p "$SESSION_DIR"

# Initialize AgentDB if needed
if [ ! -f "$DB_PATH" ] && [ -f "$AGENTDB_DIR/init.sh" ]; then
  bash "$AGENTDB_DIR/init.sh"
fi

# ── State Files (read by statusline.mjs) ──────────────────────────────────
echo '{"input": 0, "output": 0, "total": 0}' > /tmp/arcanea-tokens.json
echo "Shinkami" > /tmp/arcanea-guardian
echo "Source" > /tmp/arcanea-gate
echo "Void" > /tmp/arcanea-element
echo "Intelligence Sanctum" > /tmp/arcanea-realm
echo "Source Council" > /tmp/arcanea-team
echo "" > /tmp/arcanea-focus

# ── Session Logs ──────────────────────────────────────────────────────────
echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] Session started" > "$SESSION_DIR/start.log"
echo "0" > "$SESSION_DIR/tool-count"
touch "$SESSION_DIR/routing.log"
touch "$SESSION_DIR/tools.log"
touch "$SESSION_DIR/voice-violations.log"

# ── AgentDB: Reset agent states ───────────────────────────────────────────
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
