#!/usr/bin/env bash
# Arcanea Intelligence OS — Session Start Hook
# Initializes session state, Guardian defaults, and telemetry.
set +e

SESSION_DIR="/tmp/arcanea-session"
TOKENS_FILE="/tmp/arcanea-tokens.json"
GUARDIAN_FILE="/tmp/arcanea-guardian"
GATE_FILE="/tmp/arcanea-gate"

# Create session directory
mkdir -p "$SESSION_DIR"

# Initialize token tracking
cat > "$TOKENS_FILE" << 'JSON'
{"input": 0, "output": 0, "total": 0}
JSON

# Set default Guardian and Gate
echo "Shinkami" > "$GUARDIAN_FILE"
echo "Source" > "$GATE_FILE"

# Log session start
echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] Session started" > "$SESSION_DIR/start.log"

# Initialize tool count
echo "0" > "$SESSION_DIR/tool-count"

# Initialize routing log
touch "$SESSION_DIR/routing.log"

# Initialize tools log
touch "$SESSION_DIR/tools.log"

echo "Arcanea Intelligence OS initialized. Guardian: Shinkami. Gate: Source."
