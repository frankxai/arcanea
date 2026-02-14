#!/usr/bin/env bash
# Arcanea Intelligence OS — Prompt Submit Hook
# Routes prompts to the appropriate Guardian based on keyword analysis.
# Writes routing decisions to AgentDB for persistent tracking.
set +e

PROMPT="${1:-}"
ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
SESSION_DIR="$ARCANEA_HOME/sessions/current"
GUARDIAN_FILE="$SESSION_DIR/guardian"
DB_PATH="${ARCANEA_DB:-$ARCANEA_HOME/agentdb.sqlite3}"
TIMESTAMP="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

# Ensure session directory exists
mkdir -p "$SESSION_DIR"

# Convert prompt to lowercase for matching
PROMPT_LOWER="$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')"

# Guardian routing based on keyword detection
# Order matters: more specific patterns first, Shinkami as fallback
GUARDIAN="Shinkami"
GATE="Source"
KEYWORDS=""

if echo "$PROMPT_LOWER" | grep -qE 'architect|design|system|infrastructure|schema|foundation'; then
  GUARDIAN="Lyssandria"; GATE="Foundation"; KEYWORDS="architect/design/system"
elif echo "$PROMPT_LOWER" | grep -qE 'implement|code|build|refactor|deploy|compile'; then
  GUARDIAN="Draconia"; GATE="Fire"; KEYWORDS="implement/build/code"
elif echo "$PROMPT_LOWER" | grep -qE 'strategy|plan|roadmap|priority|vision|foresight'; then
  GUARDIAN="Lyria"; GATE="Sight"; KEYWORDS="strategy/plan/vision"
elif echo "$PROMPT_LOWER" | grep -qE 'review|audit|security|quality|inspect|verify'; then
  GUARDIAN="Alera"; GATE="Voice"; KEYWORDS="review/audit/quality"
elif echo "$PROMPT_LOWER" | grep -qE 'create|write|narrative|content|story|compose'; then
  GUARDIAN="Leyla"; GATE="Flow"; KEYWORDS="create/write/content"
elif echo "$PROMPT_LOWER" | grep -qE 'explain|teach|principle|wisdom|understand|enlighten'; then
  GUARDIAN="Aiyami"; GATE="Crown"; KEYWORDS="explain/teach/wisdom"
elif echo "$PROMPT_LOWER" | grep -qE 'test|care|heal|accessibility|wellness|nurture'; then
  GUARDIAN="Maylinn"; GATE="Heart"; KEYWORDS="test/care/heal"
elif echo "$PROMPT_LOWER" | grep -qE 'reframe|shift|pivot|paradigm|transform|perspective'; then
  GUARDIAN="Elara"; GATE="Shift"; KEYWORDS="reframe/shift/transform"
elif echo "$PROMPT_LOWER" | grep -qE 'collaborate|together|integrate|merge|partner|unite'; then
  GUARDIAN="Ino"; GATE="Unity"; KEYWORDS="collaborate/integrate/unite"
elif echo "$PROMPT_LOWER" | grep -qE 'coordinate|orchestrate|route|meta|oversee'; then
  GUARDIAN="Shinkami"; GATE="Source"; KEYWORDS="coordinate/orchestrate/meta"
fi

# Write active Guardian and Gate
echo "$GUARDIAN" > "$GUARDIAN_FILE"
echo "$GATE" > "$SESSION_DIR/gate"

# Log routing decision to session log
echo "[$TIMESTAMP] Guardian: $GUARDIAN | Gate: $GATE | Prompt: ${PROMPT:0:80}..." >> "$SESSION_DIR/routing.log"

# Write routing decision to AgentDB
if [ -f "$DB_PATH" ]; then
  PROMPT_HASH="$(echo -n "$PROMPT" | md5sum 2>/dev/null | cut -d' ' -f1 || echo 'unknown')"
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("$DB_PATH")
c = db.cursor()
# Log routing decision
c.execute(
    "INSERT INTO routing_log (prompt_hash, detected_guardian, confidence, keywords_matched) VALUES (?,?,?,?)",
    ("$PROMPT_HASH", "$GUARDIAN", 1.0, "$KEYWORDS")
)
# Update agent status
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP WHERE status='active'")
c.execute("UPDATE agents SET status='active', last_active=CURRENT_TIMESTAMP WHERE guardian=?", ("$GUARDIAN",))
db.commit()
db.close()
PYEOF
fi
