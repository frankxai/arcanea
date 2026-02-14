#!/usr/bin/env bash
# Arcanea Intelligence OS — Post-Tool Use Hook
# Logs tool completion and tracks results.
set +e

TOOL_NAME="${1:-unknown}"
TOOL_OUTPUT="${2:-}"
SESSION_DIR="/tmp/arcanea-session"
TIMESTAMP="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

# Ensure session directory exists
mkdir -p "$SESSION_DIR"

# Read current tool count
COUNT_FILE="$SESSION_DIR/tool-count"
COUNT=$(cat "$COUNT_FILE" 2>/dev/null || echo "0")

# Determine output size for logging
OUTPUT_LEN=${#TOOL_OUTPUT}

# Log tool completion (output size only — never log full output to avoid bloat)
echo "[$TIMESTAMP] [#$COUNT] DONE  $TOOL_NAME | Output: ${OUTPUT_LEN} chars" >> "$SESSION_DIR/tools.log"
