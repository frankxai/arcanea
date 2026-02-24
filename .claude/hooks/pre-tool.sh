#!/usr/bin/env bash
# Arcanea Intelligence OS — Pre-Tool Use Hook
# Logs tool invocations and tracks usage count.
set +e

TOOL_NAME="${1:-unknown}"
TOOL_INPUT="${2:-}"
ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
SESSION_DIR="$ARCANEA_HOME/sessions/current"
TIMESTAMP="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

# Ensure session directory exists
mkdir -p "$SESSION_DIR"

# Increment tool count
COUNT_FILE="$SESSION_DIR/tool-count"
if [ -f "$COUNT_FILE" ]; then
  COUNT=$(cat "$COUNT_FILE" 2>/dev/null || echo "0")
else
  COUNT=0
fi
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNT_FILE"

# Log tool invocation (truncate input to prevent huge logs)
INPUT_PREVIEW="${TOOL_INPUT:0:120}"
echo "[$TIMESTAMP] [#$COUNT] START $TOOL_NAME | Input: ${INPUT_PREVIEW}..." >> "$SESSION_DIR/tools.log"
