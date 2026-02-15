#!/usr/bin/env bash
# Arcanea Intelligence OS — Prompt Submit Hook v2.0
# Routes prompts to Guardian, detects realm/team/focus for statusline.
set +e

PROMPT="${1:-}"
SESSION_DIR="/tmp/arcanea-session"
DB_PATH="${ARCANEA_DB:-/tmp/arcanea-agentdb.sqlite3}"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
TIMESTAMP="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

mkdir -p "$SESSION_DIR"

# Convert prompt to lowercase for matching
PROMPT_LOWER="$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')"

# ── Guardian Routing ──────────────────────────────────────────────────────
GUARDIAN="Shinkami"
GATE="Source"
KEYWORDS=""

# More specific patterns first, broader patterns last
if echo "$PROMPT_LOWER" | grep -qE 'coordinat|orchestrat|meta|oversee|council|starlight'; then
  GUARDIAN="Shinkami"; GATE="Source"; KEYWORDS="coordinate/orchestrate"
elif echo "$PROMPT_LOWER" | grep -qE 'debug|bug|error|fix|broken|crash|undefined'; then
  GUARDIAN="Elara"; GATE="Shift"; KEYWORDS="debug/fix/error"
elif echo "$PROMPT_LOWER" | grep -qE 'review|audit|security|quality|inspect|verify|lint'; then
  GUARDIAN="Alera"; GATE="Voice"; KEYWORDS="review/audit/quality"
elif echo "$PROMPT_LOWER" | grep -qE 'github|merge|pr\b|pull.*request|commit|push|branch'; then
  GUARDIAN="Ino"; GATE="Unity"; KEYWORDS="github/merge/pr"
elif echo "$PROMPT_LOWER" | grep -qE 'architect|schema|foundation|database|supabase|migration|data.*model'; then
  GUARDIAN="Lyssandria"; GATE="Foundation"; KEYWORDS="architect/schema/foundation"
elif echo "$PROMPT_LOWER" | grep -qE 'strategy|plan|roadmap|priority|vision|foresight|research'; then
  GUARDIAN="Lyria"; GATE="Sight"; KEYWORDS="strategy/plan/vision"
elif echo "$PROMPT_LOWER" | grep -qE 'deploy|build|implement|code|compile|component|react'; then
  GUARDIAN="Draconia"; GATE="Fire"; KEYWORDS="implement/build/code"
elif echo "$PROMPT_LOWER" | grep -qE 'refactor|migrate|restructure|transform|modernize'; then
  GUARDIAN="Elara"; GATE="Shift"; KEYWORDS="refactor/migrate/transform"
elif echo "$PROMPT_LOWER" | grep -qE 'test|accessibility|wellness|ux\b|css|tailwind|design.*system'; then
  GUARDIAN="Maylinn"; GATE="Heart"; KEYWORDS="test/ux/design"
elif echo "$PROMPT_LOWER" | grep -qE 'visual|image|world.*build|infographic|generate.*image'; then
  GUARDIAN="Aiyami"; GATE="Crown"; KEYWORDS="visual/world/image"
elif echo "$PROMPT_LOWER" | grep -qE 'write|narrative|content|story|compose|lore|create|voice'; then
  GUARDIAN="Leyla"; GATE="Flow"; KEYWORDS="write/content/creative"
elif echo "$PROMPT_LOWER" | grep -qE 'explain|teach|principle|wisdom|understand|enlighten'; then
  GUARDIAN="Aiyami"; GATE="Crown"; KEYWORDS="explain/teach/wisdom"
fi

# ── Write State Files ─────────────────────────────────────────────────────
echo "$GUARDIAN" > /tmp/arcanea-guardian
echo "$GATE" > /tmp/arcanea-gate

# ── Context Detection (realm, team, focus) ────────────────────────────────
if [ -f "$HOOK_DIR/context-detect.sh" ]; then
  bash "$HOOK_DIR/context-detect.sh" "$PROMPT" "" 2>/dev/null
fi

# ── Session Logging ───────────────────────────────────────────────────────
echo "[$TIMESTAMP] Guardian: $GUARDIAN | Gate: $GATE | Prompt: ${PROMPT:0:80}..." >> "$SESSION_DIR/routing.log"

# ── AgentDB Routing Log ──────────────────────────────────────────────────
if [ -f "$DB_PATH" ]; then
  PROMPT_HASH="$(echo -n "$PROMPT" | md5sum 2>/dev/null | cut -d' ' -f1 || echo 'unknown')"
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("$DB_PATH")
c = db.cursor()
c.execute(
    "INSERT INTO routing_log (prompt_hash, detected_guardian, confidence, keywords_matched) VALUES (?,?,?,?)",
    ("$PROMPT_HASH", "$GUARDIAN", 1.0, "$KEYWORDS")
)
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP WHERE status='active'")
c.execute("UPDATE agents SET status='active', last_active=CURRENT_TIMESTAMP WHERE guardian=?", ("$GUARDIAN",))
db.commit()
db.close()
PYEOF
fi
