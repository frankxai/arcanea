#!/usr/bin/env bash
# ============================================================================
# Arcanea Context Budget Tracker
# ============================================================================
# Monitors token usage and warns when output quality may degrade.
#
# Quality Curve (based on ACOS quality curve concept):
#   0-30%  context used: PEAK       — optimal reasoning depth
#   30-50% context used: GOOD       — high quality, acceptable
#   50-70% context used: DEGRADING  — output quality declining, suggest checkpoint
#   70%+   context used: REFRESH    — recommend session refresh
#
# Usage:
#   ./context-tracker.sh [tool_name]
#
# Arguments:
#   tool_name  — Optional. One of: Read, Write, Edit, Bash, Task, Grep, Glob,
#                WebFetch, WebSearch. Increments token estimate for that tool call.
#
# Files:
#   /tmp/arcanea-tokens.json         — Token counts (input, output, total)
#   /tmp/arcanea-context-status      — Status line: ZONE|percentage|total|max
# ============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
TOKENS_FILE="/tmp/arcanea-tokens.json"
STATUS_FILE="/tmp/arcanea-context-status"
MAX_TOKENS="${ARCANEA_MAX_TOKENS:-200000}"

# ---------------------------------------------------------------------------
# Tool token cost estimates
# ---------------------------------------------------------------------------
declare -A TOOL_COSTS=(
  [Read]=500
  [Write]=1000
  [Edit]=1000
  [Bash]=800
  [Task]=5000
  [Grep]=300
  [Glob]=300
  [WebFetch]=2000
  [WebSearch]=2000
)

# ---------------------------------------------------------------------------
# Initialize tokens file if missing or malformed
# ---------------------------------------------------------------------------
init_tokens_file() {
  if [[ ! -f "$TOKENS_FILE" ]]; then
    printf '{"input": 0, "output": 0, "total": 0}\n' > "$TOKENS_FILE"
  fi

  # Validate JSON structure — reset if corrupted
  if ! python3 -c "import json; json.load(open('$TOKENS_FILE'))" 2>/dev/null; then
    printf '{"input": 0, "output": 0, "total": 0}\n' > "$TOKENS_FILE"
  fi
}

# ---------------------------------------------------------------------------
# Read current token total from the JSON file
# ---------------------------------------------------------------------------
read_total() {
  python3 -c "
import json
with open('$TOKENS_FILE') as f:
    data = json.load(f)
print(int(data.get('total', 0)))
"
}

# ---------------------------------------------------------------------------
# Increment tokens for a tool call
# ---------------------------------------------------------------------------
increment_tokens() {
  local tool_name="$1"
  local cost="${TOOL_COSTS[$tool_name]:-0}"

  if [[ "$cost" -eq 0 ]]; then
    return 0
  fi

  python3 -c "
import json

with open('$TOKENS_FILE') as f:
    data = json.load(f)

# Split cost: ~60% input, ~40% output (rough approximation)
cost = $cost
input_add = int(cost * 0.6)
output_add = cost - input_add

data['input'] = int(data.get('input', 0)) + input_add
data['output'] = int(data.get('output', 0)) + output_add
data['total'] = int(data.get('total', 0)) + cost

with open('$TOKENS_FILE', 'w') as f:
    json.dump(data, f)
"
}

# ---------------------------------------------------------------------------
# Determine quality zone from usage percentage
# ---------------------------------------------------------------------------
get_zone() {
  local pct="$1"

  if (( pct < 30 )); then
    echo "PEAK"
  elif (( pct < 50 )); then
    echo "GOOD"
  elif (( pct < 70 )); then
    echo "DEGRADING"
  else
    echo "REFRESH"
  fi
}

# ---------------------------------------------------------------------------
# Format a token count for human readability (e.g., 140000 -> "140k")
# ---------------------------------------------------------------------------
format_tokens() {
  local n="$1"
  if (( n >= 1000 )); then
    echo "$((n / 1000))k"
  else
    echo "$n"
  fi
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
  local tool_name="${1:-}"

  # Initialize
  init_tokens_file

  # Increment if a tool name was provided
  if [[ -n "$tool_name" ]]; then
    increment_tokens "$tool_name"
  fi

  # Read current state
  local total
  total=$(read_total)

  # Calculate percentage (integer arithmetic, avoid divide-by-zero)
  local pct=0
  if (( MAX_TOKENS > 0 )); then
    pct=$(( (total * 100) / MAX_TOKENS ))
  fi

  # Determine zone
  local zone
  zone=$(get_zone "$pct")

  # Write status file
  printf '%s|%d|%d|%d\n' "$zone" "$pct" "$total" "$MAX_TOKENS" > "$STATUS_FILE"

  # Build status output
  local total_fmt max_fmt
  total_fmt=$(format_tokens "$total")
  max_fmt=$(format_tokens "$MAX_TOKENS")

  # Always print current status
  case "$zone" in
    PEAK)
      echo "[PEAK] Context: ${pct}% (${total_fmt}/${max_fmt}) — Optimal reasoning depth"
      ;;
    GOOD)
      echo "[GOOD] Context: ${pct}% (${total_fmt}/${max_fmt}) — High quality, operating well"
      ;;
    DEGRADING)
      echo ""
      echo "=== CONTEXT WARNING ==="
      echo "[DEGRADING] Context: ${pct}% (${total_fmt}/${max_fmt})"
      echo "Output quality is declining. Consider:"
      echo "  1. Checkpoint current work (commit, save notes)"
      echo "  2. Summarize remaining tasks"
      echo "  3. Start a fresh session soon"
      echo "========================"
      echo ""
      ;;
    REFRESH)
      echo ""
      echo "!!! CONTEXT CRITICAL !!!"
      echo "[REFRESH] Context: ${pct}% (${total_fmt}/${max_fmt})"
      echo "Quality is significantly degraded. Recommended actions:"
      echo "  1. STOP complex reasoning tasks immediately"
      echo "  2. Commit all work in progress"
      echo "  3. Document remaining tasks in a handoff note"
      echo "  4. Start a NEW session for continued work"
      echo "!!!!!!!!!!!!!!!!!!!!!!!!"
      echo ""
      ;;
  esac

  # Return non-zero for warning zones (useful for hook integration)
  if [[ "$zone" == "DEGRADING" || "$zone" == "REFRESH" ]]; then
    return 1
  fi

  return 0
}

main "$@"
