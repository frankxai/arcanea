#!/usr/bin/env bash
# =============================================================================
# Arcanea Voice Enforcement Hook
# =============================================================================
# Scans content for banned phrases and suggests Arcanea Voice Bible v2.0
# replacements. Warns but never blocks — the flow must not be interrupted.
#
# Usage:
#   echo "This is game-changing" | ./voice-check.sh
#   ./voice-check.sh "This is game-changing content"
#   ./voice-check.sh < file.md
#
# Exit: Always 0 (advisory only)
# Log:  /tmp/arcanea-session/voice-violations.log
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

LOG_DIR="/tmp/arcanea-session"
LOG_FILE="${LOG_DIR}/voice-violations.log"
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

# Ensure log directory exists
mkdir -p "${LOG_DIR}"

# ---------------------------------------------------------------------------
# Banned Phrases Map
# Format: "banned_phrase|replacement"
# Ordered longest-first to avoid partial matches on substrings
# ---------------------------------------------------------------------------

BANNED_PHRASES=(
  "consciousness evolution|intentional growth"
  "paradigm shift|new gate opening"
  "soul-aligned|purpose-driven"
  "game-changing|transformative"
  "game changer|gate opener"
  "cutting-edge|arcane"
  "rocket ship|[FORBIDDEN -- too generic, remove entirely]"
  "revolutionary|foundational"
  "disruptive|catalytic"
  "ecosystem|living universe"
  "platform|civilization"
  "leverage|channel"
  "synergy|collaboration"
  "utilize|use"
)

# Context-sensitive phrases: "ecosystem" and "platform" are only violations
# when referring to Arcanea itself. We flag them with a note.
CONTEXT_SENSITIVE=(
  "ecosystem"
  "platform"
)

# ---------------------------------------------------------------------------
# Read input: from $1 (string argument), or stdin
# ---------------------------------------------------------------------------

CONTENT=""
if [[ $# -ge 1 && -n "$1" ]]; then
  CONTENT="$1"
else
  # Read from stdin (non-blocking: if nothing on stdin, content stays empty)
  if [[ ! -t 0 ]]; then
    CONTENT="$(cat)"
  fi
fi

if [[ -z "${CONTENT}" ]]; then
  exit 0
fi

# ---------------------------------------------------------------------------
# Scan for violations
# ---------------------------------------------------------------------------

VIOLATION_COUNT=0
VIOLATIONS_OUTPUT=""

# Convert content to an indexed array of lines for line-number reporting
mapfile -t LINES <<< "${CONTENT}"

for entry in "${BANNED_PHRASES[@]}"; do
  BANNED="${entry%%|*}"
  REPLACEMENT="${entry##*|}"

  # Check if this is a context-sensitive phrase
  IS_CONTEXT_SENSITIVE=false
  for cs in "${CONTEXT_SENSITIVE[@]}"; do
    if [[ "${BANNED}" == "${cs}" ]]; then
      IS_CONTEXT_SENSITIVE=true
      break
    fi
  done

  # Scan each line (case-insensitive)
  for i in "${!LINES[@]}"; do
    LINE="${LINES[$i]}"
    LINE_NUM=$((i + 1))

    # Case-insensitive match using bash pattern
    LINE_LOWER="${LINE,,}"
    BANNED_LOWER="${BANNED,,}"

    if [[ "${LINE_LOWER}" == *"${BANNED_LOWER}"* ]]; then
      VIOLATION_COUNT=$((VIOLATION_COUNT + 1))

      if [[ "${IS_CONTEXT_SENSITIVE}" == true ]]; then
        MSG="[VOICE] \"${BANNED}\" -> \"${REPLACEMENT}\" (line ~${LINE_NUM}) [context-sensitive: only when referring to Arcanea]"
      else
        MSG="[VOICE] \"${BANNED}\" -> \"${REPLACEMENT}\" (line ~${LINE_NUM})"
      fi

      VIOLATIONS_OUTPUT+="${MSG}"$'\n'
    fi
  done
done

# ---------------------------------------------------------------------------
# Output and log
# ---------------------------------------------------------------------------

if [[ ${VIOLATION_COUNT} -gt 0 ]]; then
  # Print to stderr so it doesn't pollute stdout pipelines
  {
    echo ""
    echo "================================================================"
    echo "  ARCANEA VOICE CHECK -- ${VIOLATION_COUNT} violation(s) detected"
    echo "================================================================"
    echo ""
    echo "${VIOLATIONS_OUTPUT}"
    echo "These are warnings only. The Arcanea voice favors precision over hype."
    echo "Reference: ARCANEA_VOICE_NARRATIVE_BIBLE.html (v2.0)"
    echo ""
  } >&2

  # Log to file with timestamp
  {
    echo "--- ${TIMESTAMP} ---"
    echo "${VIOLATIONS_OUTPUT}"
  } >> "${LOG_FILE}"
fi

# Always exit 0 -- warn, never block
exit 0
