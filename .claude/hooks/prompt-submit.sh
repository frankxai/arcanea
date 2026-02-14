#!/usr/bin/env bash
# Arcanea Intelligence OS — Prompt Submit Hook
# Routes prompts to the appropriate Guardian based on keyword analysis.
set +e

PROMPT="${1:-}"
GUARDIAN_FILE="/tmp/arcanea-guardian"
SESSION_DIR="/tmp/arcanea-session"
TIMESTAMP="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

# Ensure session directory exists
mkdir -p "$SESSION_DIR"

# Convert prompt to lowercase for matching
PROMPT_LOWER="$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')"

# Guardian routing based on keyword detection
# Order matters: more specific patterns first, Shinkami as fallback
GUARDIAN="Shinkami"
GATE="Source"

if echo "$PROMPT_LOWER" | grep -qE 'architect|design|system|infrastructure|schema|foundation'; then
  GUARDIAN="Lyssandria"
  GATE="Foundation"
elif echo "$PROMPT_LOWER" | grep -qE 'implement|code|build|refactor|deploy|compile'; then
  GUARDIAN="Draconia"
  GATE="Fire"
elif echo "$PROMPT_LOWER" | grep -qE 'strategy|plan|roadmap|priority|vision|foresight'; then
  GUARDIAN="Lyria"
  GATE="Sight"
elif echo "$PROMPT_LOWER" | grep -qE 'review|audit|security|quality|inspect|verify'; then
  GUARDIAN="Alera"
  GATE="Voice"
elif echo "$PROMPT_LOWER" | grep -qE 'create|write|narrative|content|story|compose'; then
  GUARDIAN="Leyla"
  GATE="Flow"
elif echo "$PROMPT_LOWER" | grep -qE 'explain|teach|principle|wisdom|understand|enlighten'; then
  GUARDIAN="Aiyami"
  GATE="Crown"
elif echo "$PROMPT_LOWER" | grep -qE 'test|care|heal|accessibility|wellness|nurture'; then
  GUARDIAN="Maylinn"
  GATE="Heart"
elif echo "$PROMPT_LOWER" | grep -qE 'reframe|shift|pivot|paradigm|transform|perspective'; then
  GUARDIAN="Elara"
  GATE="Shift"
elif echo "$PROMPT_LOWER" | grep -qE 'collaborate|together|integrate|merge|partner|unite'; then
  GUARDIAN="Ino"
  GATE="Unity"
elif echo "$PROMPT_LOWER" | grep -qE 'coordinate|orchestrate|route|meta|oversee'; then
  GUARDIAN="Shinkami"
  GATE="Source"
fi

# Write active Guardian and Gate
echo "$GUARDIAN" > "$GUARDIAN_FILE"
echo "$GATE" > "/tmp/arcanea-gate"

# Log routing decision
echo "[$TIMESTAMP] Guardian: $GUARDIAN | Gate: $GATE | Prompt: ${PROMPT:0:80}..." >> "$SESSION_DIR/routing.log"
