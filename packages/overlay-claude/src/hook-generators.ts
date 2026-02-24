/**
 * Hook generators for Claude Code overlay.
 *
 * Generates the 8 Arcanea Intelligence OS hook scripts and
 * the settings.local.json hook registration for any target project.
 *
 * All hooks use relative paths from the project root so they
 * work in ANY project directory — not just the Arcanea monorepo.
 *
 * Shared content (routing patterns, banned phrases, model keywords,
 * tool costs, Guardian verbs) is imported from @arcanea/os and
 * embedded into the generated bash scripts.
 */

import {
  GUARDIAN_ROUTING_PATTERNS,
  BANNED_PHRASES,
  CONTEXT_SENSITIVE_PHRASES,
  MODEL_KEYWORD_TIERS,
  TOOL_COST_ESTIMATES,
  GUARDIAN_VERBS,
  GUARDIANS,
} from '@arcanea/core';

// ─── Session Start Hook ──────────────────────────────────────────────────────

export function generateSessionStartHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Intelligence OS — Session Start Hook
# Initializes session state, Guardian defaults, realm context, and AgentDB.
set +e

ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
DB_PATH="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
HOOK_DIR="\$(cd "\$(dirname "\$0")" && pwd)"
AGENTDB_DIR="\$(cd "\$HOOK_DIR/../agentdb" 2>/dev/null && pwd)"

# Create directories
mkdir -p "\$ARCANEA_HOME/sessions"
mkdir -p "\$SESSION_DIR"

# Initialize AgentDB if needed
if [ ! -f "\$DB_PATH" ] && [ -f "\$AGENTDB_DIR/init.sh" ]; then
  bash "\$AGENTDB_DIR/init.sh"
fi

# ── State Files (read by statusline.mjs) ──────────────────────────────────
echo '{"input": 0, "output": 0, "total": 0}' > "\$SESSION_DIR/tokens.json"
echo "Shinkami" > "\$SESSION_DIR/guardian"
echo "Source" > "\$SESSION_DIR/gate"
echo "Void" > "\$SESSION_DIR/element"
echo "Intelligence Sanctum" > "\$SESSION_DIR/realm"
echo "Source Council" > "\$SESSION_DIR/team"
echo "" > "\$SESSION_DIR/focus"

# ── Session Logs ──────────────────────────────────────────────────────────
echo "[\$(date -u '+%Y-%m-%dT%H:%M:%SZ')] Session started" > "\$SESSION_DIR/start.log"
echo "0" > "\$SESSION_DIR/tool-count"
touch "\$SESSION_DIR/routing.log"
touch "\$SESSION_DIR/tools.log"
touch "\$SESSION_DIR/voice-violations.log"

# ── AgentDB: Reset agent states ───────────────────────────────────────────
if [ -f "\$DB_PATH" ]; then
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("\$DB_PATH")
c = db.cursor()
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP WHERE status='active'")
c.execute("UPDATE agents SET status='active', last_active=CURRENT_TIMESTAMP WHERE id='shinkami'")
db.commit()
db.close()
PYEOF
fi

echo "Arcanea Intelligence OS initialized. Guardian: Shinkami. Gate: Source."
`;
}

// ─── Prompt Submit Hook ──────────────────────────────────────────────────────

export function generatePromptSubmitHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Intelligence OS — Prompt Submit Hook
# Routes prompts to Guardian, detects realm/team/focus for statusline.
set +e

PROMPT="\${1:-}"
ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
DB_PATH="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
TIMESTAMP="\$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

mkdir -p "\$SESSION_DIR"

# Convert prompt to lowercase for matching
PROMPT_LOWER="\$(echo "\$PROMPT" | tr '[:upper:]' '[:lower:]')"

# ── Guardian Routing ──────────────────────────────────────────────────────
GUARDIAN="Shinkami"
GATE="Source"
KEYWORDS=""

# More specific patterns first, broader patterns last
${GUARDIAN_ROUTING_PATTERNS.map((p, i) => {
    const keyword = p.pattern.split('|').slice(0, 3).join('/');
    const prefix = i === 0 ? 'if' : 'elif';
    return `${prefix} echo "\\$PROMPT_LOWER" | grep -qE '${p.pattern}'; then\n  GUARDIAN="${p.guardian}"; GATE="${p.gate}"; KEYWORDS="${keyword}"`;
  }).join('\n')}
fi

# ── Write State Files ─────────────────────────────────────────────────────
echo "\$GUARDIAN" > "\$SESSION_DIR/guardian"
echo "\$GATE" > "\$SESSION_DIR/gate"

# ── Session Logging ───────────────────────────────────────────────────────
echo "[\$TIMESTAMP] Guardian: \$GUARDIAN | Gate: \$GATE | Prompt: \${PROMPT:0:80}..." >> "\$SESSION_DIR/routing.log"

# ── AgentDB Routing Log ──────────────────────────────────────────────────
if [ -f "\$DB_PATH" ]; then
  PROMPT_HASH="\$(echo -n "\$PROMPT" | md5sum 2>/dev/null | cut -d' ' -f1 || echo 'unknown')"
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("\$DB_PATH")
c = db.cursor()
c.execute(
    "INSERT INTO routing_log (prompt_hash, detected_guardian, confidence, keywords_matched) VALUES (?,?,?,?)",
    ("\$PROMPT_HASH", "\$GUARDIAN", 1.0, "\$KEYWORDS")
)
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP WHERE status='active'")
c.execute("UPDATE agents SET status='active', last_active=CURRENT_TIMESTAMP WHERE guardian=?", ("\$GUARDIAN",))
db.commit()
db.close()
PYEOF
fi
`;
}

// ─── Model Route Hook ────────────────────────────────────────────────────────

export function generateModelRouteHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Model Routing — Guardian-Based Recommendation Engine
# Routes tasks to the optimal model tier based on complexity analysis.
set +e

TASK="\${1:-}"
ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
RECOMMENDATION_FILE="\$SESSION_DIR/model-recommendation"
mkdir -p "\$SESSION_DIR"

if [[ -z "\$TASK" ]]; then
    echo "[MODEL_RECOMMENDATION] sonnet | Guardian: Lyssandria | Complexity: 5 | Reason: no task provided"
    echo "sonnet" > "\$RECOMMENDATION_FILE"
    exit 0
fi

TASK_LOWER="\$(echo "\$TASK" | tr '[:upper:]' '[:lower:]')"

# Complexity scoring
COMPLEXITY=0
REASONS=()

${MODEL_KEYWORD_TIERS.map(tier => {
    const label = tier.tier.toUpperCase().replace('-', ' ');
    const keywords = tier.keywords.map(k => `"${k}"`).join(' ');
    const useWordBound = tier.tier !== 'opus' && tier.tier !== 'haiku';
    const grepPattern = useWordBound ? '"\\\\b\\${keyword}\\\\b"' : '"\\$keyword"';
    return `# ${label} keywords (+${tier.weight})
for keyword in ${keywords}; do
    if echo "\\$TASK_LOWER" | grep -qE ${grepPattern}; then
        COMPLEXITY=\\$((COMPLEXITY + ${tier.weight}))
        REASONS+=("\\$keyword")
    fi
done`;
  }).join('\n\n')}

# Scope multipliers
echo "\$TASK_LOWER" | grep -qE "\\b(entire|all|every|whole|complete)\\b" && COMPLEXITY=\$((COMPLEXITY + 2))
echo "\$TASK_LOWER" | grep -qE "\\bnew\\b" && COMPLEXITY=\$((COMPLEXITY + 1))
echo "\$TASK_LOWER" | grep -qE "\\bwith\\b" && COMPLEXITY=\$((COMPLEXITY + 1))

WORD_COUNT=\$(echo "\$TASK" | wc -w)
[[ "\$WORD_COUNT" -gt 20 ]] && COMPLEXITY=\$((COMPLEXITY + 1))
[[ "\$WORD_COUNT" -gt 40 ]] && COMPLEXITY=\$((COMPLEXITY + 1))

# Clamp 1-10
[[ "\$COMPLEXITY" -lt 1 ]] && COMPLEXITY=1
[[ "\$COMPLEXITY" -gt 10 ]] && COMPLEXITY=10

# Build reason (max 4 unique)
REASON_STRING=""
SEEN=()
COUNT=0
for r in "\${REASONS[@]}"; do
    SKIP=0
    for s in "\${SEEN[@]}"; do [[ "\$s" == "\$r" ]] && SKIP=1 && break; done
    [[ "\$SKIP" -eq 1 ]] && continue
    SEEN+=("\$r")
    [[ "\$COUNT" -gt 0 ]] && REASON_STRING="\${REASON_STRING} + \${r}" || REASON_STRING="\$r"
    COUNT=\$((COUNT + 1))
    [[ "\$COUNT" -ge 4 ]] && break
done
[[ -z "\$REASON_STRING" ]] && REASON_STRING="general task"

# Map to model tier
if [[ "\$COMPLEXITY" -ge 9 ]]; then
    MODEL="opus"
    GUARDIAN="Draconia"
elif [[ "\$COMPLEXITY" -ge 4 ]]; then
    MODEL="sonnet"
    if echo "\$TASK_LOWER" | grep -qE "(architect|infrastructure|foundation|schema|database)"; then
        GUARDIAN="Lyssandria"
    elif echo "\$TASK_LOWER" | grep -qE "(design|creative|art|visual|style)"; then
        GUARDIAN="Leyla"
    elif echo "\$TASK_LOWER" | grep -qE "(review|audit|analyze|quality)"; then
        GUARDIAN="Alera"
    elif echo "\$TASK_LOWER" | grep -qE "(vision|insight|intuition)"; then
        GUARDIAN="Lyria"
    else
        GUARDIAN="Lyssandria"
    fi
else
    MODEL="haiku"
    GUARDIAN="Maylinn"
fi

echo "[MODEL_RECOMMENDATION] \${MODEL} | Guardian: \${GUARDIAN} | Complexity: \${COMPLEXITY} | Reason: \${REASON_STRING}"
echo "\$MODEL" > "\$RECOMMENDATION_FILE"
exit 0
`;
}

// ─── Pre-Tool Hook ───────────────────────────────────────────────────────────

export function generatePreToolHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Intelligence OS — Pre-Tool Use Hook
# Logs tool invocations and tracks usage count.
set +e

TOOL_NAME="\${1:-unknown}"
TOOL_INPUT="\${2:-}"
ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
TIMESTAMP="\$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

mkdir -p "\$SESSION_DIR"

# Increment tool count
COUNT_FILE="\$SESSION_DIR/tool-count"
if [ -f "\$COUNT_FILE" ]; then
  COUNT=\$(cat "\$COUNT_FILE" 2>/dev/null || echo "0")
else
  COUNT=0
fi
COUNT=\$((COUNT + 1))
echo "\$COUNT" > "\$COUNT_FILE"

# Log tool invocation
INPUT_PREVIEW="\${TOOL_INPUT:0:120}"
echo "[\$TIMESTAMP] [#\$COUNT] START \$TOOL_NAME | Input: \${INPUT_PREVIEW}..." >> "\$SESSION_DIR/tools.log"
`;
}

// ─── Voice Check Hook ────────────────────────────────────────────────────────

export function generateVoiceCheckHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Voice Enforcement Hook
# Scans content for banned phrases and suggests Voice Bible v2.0 replacements.
# Warns but never blocks — the flow must not be interrupted.
set -euo pipefail

ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
LOG_DIR="\$ARCANEA_HOME/sessions/current"
LOG_FILE="\${LOG_DIR}/voice-violations.log"
TIMESTAMP="\$(date '+%Y-%m-%d %H:%M:%S')"

mkdir -p "\${LOG_DIR}"

# Banned phrases: "banned_phrase|replacement"
BANNED_PHRASES=(
${BANNED_PHRASES.map(p => `  "${p.banned}|${p.replacement || '[FORBIDDEN -- remove entirely]'}"`).join('\n')}
)

# Context-sensitive phrases
CONTEXT_SENSITIVE=(${CONTEXT_SENSITIVE_PHRASES.map(p => `"${p}"`).join(' ')})

# Read input
CONTENT=""
if [[ \$# -ge 1 && -n "\$1" ]]; then
  CONTENT="\$1"
else
  if [[ ! -t 0 ]]; then
    CONTENT="\$(cat)"
  fi
fi

if [[ -z "\${CONTENT}" ]]; then
  exit 0
fi

# Scan for violations
VIOLATION_COUNT=0
VIOLATIONS_OUTPUT=""

mapfile -t LINES <<< "\${CONTENT}"

for entry in "\${BANNED_PHRASES[@]}"; do
  BANNED="\${entry%%|*}"
  REPLACEMENT="\${entry##*|}"

  IS_CONTEXT_SENSITIVE=false
  for cs in "\${CONTEXT_SENSITIVE[@]}"; do
    if [[ "\${BANNED}" == "\${cs}" ]]; then
      IS_CONTEXT_SENSITIVE=true
      break
    fi
  done

  for i in "\${!LINES[@]}"; do
    LINE="\${LINES[\$i]}"
    LINE_NUM=\$((i + 1))
    LINE_LOWER="\${LINE,,}"
    BANNED_LOWER="\${BANNED,,}"

    if [[ "\${LINE_LOWER}" == *"\${BANNED_LOWER}"* ]]; then
      VIOLATION_COUNT=\$((VIOLATION_COUNT + 1))
      if [[ "\${IS_CONTEXT_SENSITIVE}" == true ]]; then
        MSG="[VOICE] \\"\${BANNED}\\" -> \\"\${REPLACEMENT}\\" (line ~\${LINE_NUM}) [context-sensitive: only when referring to Arcanea]"
      else
        MSG="[VOICE] \\"\${BANNED}\\" -> \\"\${REPLACEMENT}\\" (line ~\${LINE_NUM})"
      fi
      VIOLATIONS_OUTPUT+="\${MSG}"\$'\\n'
    fi
  done
done

if [[ \${VIOLATION_COUNT} -gt 0 ]]; then
  {
    echo ""
    echo "================================================================"
    echo "  ARCANEA VOICE CHECK -- \${VIOLATION_COUNT} violation(s) detected"
    echo "================================================================"
    echo ""
    echo "\${VIOLATIONS_OUTPUT}"
    echo "These are warnings only. The Arcanea voice favors precision over hype."
    echo ""
  } >&2

  {
    echo "--- \${TIMESTAMP} ---"
    echo "\${VIOLATIONS_OUTPUT}"
  } >> "\${LOG_FILE}"
fi

# Always exit 0 -- warn, never block
exit 0
`;
}

// ─── Post-Tool Hook ──────────────────────────────────────────────────────────

export function generatePostToolHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Intelligence OS — Post-Tool Use Hook
# Logs tool completion and writes significant operations to AgentDB memories.
set +e

TOOL_NAME="\${1:-unknown}"
TOOL_OUTPUT="\${2:-}"
ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
DB_PATH="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
TIMESTAMP="\$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

mkdir -p "\$SESSION_DIR"

COUNT=\$(cat "\$SESSION_DIR/tool-count" 2>/dev/null || echo "0")
OUTPUT_LEN=\${#TOOL_OUTPUT}

echo "[\$TIMESTAMP] [#\$COUNT] DONE  \$TOOL_NAME | Output: \${OUTPUT_LEN} chars" >> "\$SESSION_DIR/tools.log"

# Write significant operations to AgentDB
if [ -f "\$DB_PATH" ] && [ "\$OUTPUT_LEN" -gt 50 ]; then
  case "\$TOOL_NAME" in
    Write|Edit|Bash)
      GUARDIAN=\$(cat "\$SESSION_DIR/guardian" 2>/dev/null || echo "shinkami")
      GUARDIAN_LOWER="\$(echo "\$GUARDIAN" | tr '[:upper:]' '[:lower:]')"
      OUTPUT_PREVIEW="\${TOOL_OUTPUT:0:200}"
      python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("\$DB_PATH")
c = db.cursor()
c.execute(
    "INSERT INTO memories (agent_id, namespace, key, value) VALUES (?,?,?,?)",
    ("\$GUARDIAN_LOWER", "tool-log", "\$TOOL_NAME-\$TIMESTAMP", "\${OUTPUT_PREVIEW//\\"/\\\\\\"}")
)
db.commit()
db.close()
PYEOF
      ;;
  esac
fi
`;
}

// ─── Context Tracker Hook ────────────────────────────────────────────────────

export function generateContextTrackerHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Context Budget Tracker
# Monitors token usage and warns when output quality may degrade.
#   0-30%  context: PEAK       — optimal reasoning depth
#   30-50% context: GOOD       — high quality
#   50-70% context: DEGRADING  — suggest checkpoint
#   70%+   context: REFRESH    — recommend session refresh
set -euo pipefail

ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
TOKENS_FILE="\$SESSION_DIR/tokens.json"
STATUS_FILE="\$SESSION_DIR/context-status"
mkdir -p "\$SESSION_DIR"
MAX_TOKENS="\${ARCANEA_MAX_TOKENS:-200000}"

# Tool token cost estimates
declare -A TOOL_COSTS=(
  ${Object.entries(TOOL_COST_ESTIMATES).map(([tool, cost]) => `[${tool}]=${cost}`).join(' ')}
)

init_tokens_file() {
  if [[ ! -f "\$TOKENS_FILE" ]]; then
    printf '{"input": 0, "output": 0, "total": 0}\\n' > "\$TOKENS_FILE"
  fi
  if ! python3 -c "import json; json.load(open('\$TOKENS_FILE'))" 2>/dev/null; then
    printf '{"input": 0, "output": 0, "total": 0}\\n' > "\$TOKENS_FILE"
  fi
}

read_total() {
  python3 -c "
import json
with open('\$TOKENS_FILE') as f:
    data = json.load(f)
print(int(data.get('total', 0)))
"
}

increment_tokens() {
  local tool_name="\$1"
  local cost="\${TOOL_COSTS[\$tool_name]:-0}"
  [[ "\$cost" -eq 0 ]] && return 0

  python3 -c "
import json
with open('\$TOKENS_FILE') as f:
    data = json.load(f)
cost = \$cost
data['input'] = int(data.get('input', 0)) + int(cost * 0.6)
data['output'] = int(data.get('output', 0)) + cost - int(cost * 0.6)
data['total'] = int(data.get('total', 0)) + cost
with open('\$TOKENS_FILE', 'w') as f:
    json.dump(data, f)
"
}

get_zone() {
  local pct="\$1"
  if (( pct < 30 )); then echo "PEAK"
  elif (( pct < 50 )); then echo "GOOD"
  elif (( pct < 70 )); then echo "DEGRADING"
  else echo "REFRESH"; fi
}

format_tokens() {
  local n="\$1"
  if (( n >= 1000 )); then echo "\$((n / 1000))k"
  else echo "\$n"; fi
}

main() {
  local tool_name="\${1:-}"
  init_tokens_file
  [[ -n "\$tool_name" ]] && increment_tokens "\$tool_name"

  local total
  total=\$(read_total)
  local pct=0
  (( MAX_TOKENS > 0 )) && pct=\$(( (total * 100) / MAX_TOKENS ))

  local zone
  zone=\$(get_zone "\$pct")
  printf '%s|%d|%d|%d\\n' "\$zone" "\$pct" "\$total" "\$MAX_TOKENS" > "\$STATUS_FILE"

  # Log zone transitions to AgentDB
  local db_path="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
  local prev_zone=""
  [[ -f "\$SESSION_DIR/prev-zone" ]] && prev_zone=\$(cat "\$SESSION_DIR/prev-zone" 2>/dev/null)
  if [[ "\$zone" != "\$prev_zone" ]] && [[ -f "\$db_path" ]]; then
    echo "\$zone" > "\$SESSION_DIR/prev-zone"
    python3 -c "
import sqlite3
db = sqlite3.connect('\$db_path')
c = db.cursor()
c.execute('INSERT INTO memories (agent_id, namespace, key, value) VALUES (?,?,?,?)',
    ('shinkami', 'context-budget', 'zone-\$zone-\$(date +%s)', '\$zone at \${pct}% (\${total}/\${MAX_TOKENS})'))
db.commit()
db.close()
" 2>/dev/null || true
  fi

  local total_fmt max_fmt
  total_fmt=\$(format_tokens "\$total")
  max_fmt=\$(format_tokens "\$MAX_TOKENS")

  case "\$zone" in
    PEAK) echo "[PEAK] Context: \${pct}% (\${total_fmt}/\${max_fmt}) — Optimal reasoning depth" ;;
    GOOD) echo "[GOOD] Context: \${pct}% (\${total_fmt}/\${max_fmt}) — High quality" ;;
    DEGRADING)
      echo ""
      echo "=== CONTEXT WARNING ==="
      echo "[DEGRADING] Context: \${pct}% (\${total_fmt}/\${max_fmt})"
      echo "Output quality declining. Consider checkpointing and refreshing."
      echo "========================"
      echo "" ;;
    REFRESH)
      echo ""
      echo "!!! CONTEXT CRITICAL !!!"
      echo "[REFRESH] Context: \${pct}% (\${total_fmt}/\${max_fmt})"
      echo "Commit work, document remaining tasks, start a NEW session."
      echo "!!!!!!!!!!!!!!!!!!!!!!!!"
      echo "" ;;
  esac
  return 0
}

main "\$@" || true
`;
}

// ─── Session End Hook ────────────────────────────────────────────────────────

export function generateSessionEndHook(): string {
  return `#!/usr/bin/env bash
# Arcanea Intelligence OS — Session End Hook
# Summarizes session and writes stats to AgentDB.
set +e

ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SESSION_DIR="\$ARCANEA_HOME/sessions/current"
DB_PATH="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
TIMESTAMP="\$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

# Read session metrics
TOOL_COUNT=\$(cat "\$SESSION_DIR/tool-count" 2>/dev/null || echo "0")
ROUTING_COUNT=\$(wc -l < "\$SESSION_DIR/routing.log" 2>/dev/null || echo "0")

# Read final context state
CONTEXT_STATUS=\$(cat "\$SESSION_DIR/context-status" 2>/dev/null || echo "UNKNOWN|0|0|200000")
ZONE=\$(echo "\$CONTEXT_STATUS" | cut -d'|' -f1)
PCT=\$(echo "\$CONTEXT_STATUS" | cut -d'|' -f2)

# Read final Guardian
GUARDIAN=\$(cat "\$SESSION_DIR/guardian" 2>/dev/null || echo "Shinkami")

SUMMARY="Session ended at \$TIMESTAMP. Tools: \$TOOL_COUNT. Routes: \$ROUTING_COUNT. Guardian: \$GUARDIAN. Context: \${ZONE} (\${PCT}%)."

echo "[\$TIMESTAMP] \$SUMMARY" >> "\$SESSION_DIR/start.log"

# Write to AgentDB
if [ -f "\$DB_PATH" ]; then
  SESSION_ID="session-\$(date +%Y%m%d-%H%M%S)"
  python3 << PYEOF 2>/dev/null
import sqlite3
db = sqlite3.connect("\$DB_PATH")
c = db.cursor()
c.execute(
    "INSERT OR REPLACE INTO vault_entries (id, layer, category, key, value, source) VALUES (?,?,?,?,?,?)",
    ("\$SESSION_ID", "INTELLECT", "session", "summary", "\$SUMMARY", "session-end-hook")
)
c.execute("UPDATE agents SET status='idle', last_active=CURRENT_TIMESTAMP")
db.commit()
db.close()
PYEOF
fi

# Archive session
ARCHIVE_DIR="\$ARCANEA_HOME/sessions/archive/\$(date +%Y%m%d-%H%M%S)"
if [ -d "\$SESSION_DIR" ]; then
  mkdir -p "\$ARCANEA_HOME/sessions/archive"
  cp -r "\$SESSION_DIR" "\$ARCHIVE_DIR" 2>/dev/null
fi

echo "Session archived. \$SUMMARY"
`;
}

// ─── Statusline Generator ────────────────────────────────────────────────────

export function generateStatusline(): string {
  return `#!/usr/bin/env node
// Arcanea Intelligence OS — Context-Adaptive Statusline
// Reads session state and renders statusline for Claude Code.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const ARCANEA_HOME = process.env.ARCANEA_HOME || join(process.env.HOME || '', '.arcanea');
const SESSION_DIR = join(ARCANEA_HOME, 'sessions', 'current');

function safeRead(filePath) {
  try {
    if (existsSync(filePath)) {
      return readFileSync(filePath, 'utf-8').trim();
    }
  } catch { /* ignore */ }
  return '';
}

// ── Read state ──────────────────────────────────────────────────────────
const guardian = safeRead(join(SESSION_DIR, 'guardian')) || 'Shinkami';
const gate = safeRead(join(SESSION_DIR, 'gate')) || 'Source';
const realm = safeRead(join(SESSION_DIR, 'realm')) || '';
const focus = safeRead(join(SESSION_DIR, 'focus')) || '';

// ── Context zone ────────────────────────────────────────────────────────
const contextStatus = safeRead(join(SESSION_DIR, 'context-status'));
let zone = '';
if (contextStatus) {
  const parts = contextStatus.split('|');
  zone = parts[0] || '';
}

// ── Guardian verb ───────────────────────────────────────────────────────
const GUARDIAN_VERBS = {
  ${Object.entries(GUARDIAN_VERBS).map(([g, v]) => `${g}: '${v}'`).join(', ')},
};
const verb = GUARDIAN_VERBS[guardian] || 'guides';

// ── Git branch ──────────────────────────────────────────────────────────
let branch = '';
try {
  branch = execSync('git rev-parse --abbrev-ref HEAD 2>/dev/null', { encoding: 'utf-8' }).trim();
} catch { /* not a git repo */ }

// ── Compose statusline ──────────────────────────────────────────────────
const parts = ['Arcanea'];
parts.push(\`\${guardian} \${verb}\`);
if (focus) parts.push(focus);
if (branch) parts.push(branch);
if (zone && zone !== 'PEAK') parts.push(\`[\${zone}]\`);

process.stdout.write(parts.join(' | '));
`;
}

// ─── Settings (Hook Registration) ────────────────────────────────────────────

export function generateHookSettings(projectDir: string): object {
  const hooksDir = `${projectDir}/.claude/hooks`;

  return {
    hooks: {
      SessionStart: [
        {
          hooks: [
            {
              type: 'command',
              command: `bash ${hooksDir}/session-start.sh`,
            },
          ],
        },
      ],
      UserPromptSubmit: [
        {
          hooks: [
            {
              type: 'command',
              command: `bash ${hooksDir}/prompt-submit.sh "$USER_PROMPT"`,
            },
            {
              type: 'command',
              command: `bash ${hooksDir}/model-route.sh "$USER_PROMPT"`,
            },
          ],
        },
      ],
      PreToolUse: [
        {
          matcher: 'Task|Bash|Write|Edit',
          hooks: [
            {
              type: 'command',
              timeout: 3000,
              command: `bash ${hooksDir}/pre-tool.sh "$TOOL_NAME"`,
            },
          ],
        },
        {
          matcher: 'Write|Edit',
          hooks: [
            {
              type: 'command',
              timeout: 3000,
              command: `bash ${hooksDir}/voice-check.sh "$TOOL_INPUT"`,
            },
          ],
        },
      ],
      PostToolUse: [
        {
          matcher: 'Task|Bash|Write|Edit|Read|Grep|Glob|WebFetch|WebSearch',
          hooks: [
            {
              type: 'command',
              timeout: 3000,
              command: `bash ${hooksDir}/post-tool.sh "$TOOL_NAME"`,
            },
            {
              type: 'command',
              timeout: 3000,
              command: `bash ${hooksDir}/context-tracker.sh "$TOOL_NAME"`,
            },
          ],
        },
      ],
      Stop: [
        {
          hooks: [
            {
              type: 'command',
              timeout: 5000,
              command: `bash ${hooksDir}/session-end.sh`,
            },
          ],
        },
      ],
    },
  };
}

// ─── AgentDB Schema ──────────────────────────────────────────────────────────

export function generateAgentDBSchema(): string {
  return `-- Arcanea AgentDB Schema
-- SQLite database for agent state, memories, and session tracking.

CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  guardian TEXT,
  role TEXT,
  element TEXT,
  status TEXT DEFAULT 'idle',
  last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS memories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT NOT NULL,
  namespace TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

CREATE TABLE IF NOT EXISTS swarm_sessions (
  id TEXT PRIMARY KEY,
  pattern TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS swarm_agents (
  session_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  role TEXT,
  status TEXT DEFAULT 'pending',
  PRIMARY KEY (session_id, agent_id),
  FOREIGN KEY (session_id) REFERENCES swarm_sessions(id),
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

CREATE TABLE IF NOT EXISTS routing_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt_hash TEXT,
  detected_guardian TEXT,
  confidence REAL,
  keywords_matched TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vault_entries (
  id TEXT PRIMARY KEY,
  layer TEXT NOT NULL,
  category TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  source TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed the 10 Guardians
INSERT OR IGNORE INTO agents (id, guardian, role, element, status) VALUES
${GUARDIANS.map((g, i) => {
    const status = g.name === 'shinkami' ? 'active' : 'idle';
    const comma = i < GUARDIANS.length - 1 ? ',' : ';';
    return `  ('${g.name}', '${g.displayName}', '${g.role}', '${g.element || 'void'}', '${status}')${comma}`;
  }).join('\n')}
`;
}

// ─── AgentDB Init Script ─────────────────────────────────────────────────────

export function generateAgentDBInit(): string {
  return `#!/usr/bin/env bash
# Initialize Arcanea AgentDB
set +e

ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
DB_PATH="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
SCRIPT_DIR="\$(cd "\$(dirname "\$0")" && pwd)"
SCHEMA_FILE="\$SCRIPT_DIR/schema.sql"

mkdir -p "\$ARCANEA_HOME"

if [ ! -f "\$DB_PATH" ] && [ -f "\$SCHEMA_FILE" ]; then
  python3 << PYEOF
import sqlite3
db = sqlite3.connect("\$DB_PATH")
with open("\$SCHEMA_FILE") as f:
    db.executescript(f.read())
db.close()
print("AgentDB initialized at \$DB_PATH")
PYEOF
else
  echo "AgentDB already exists at \$DB_PATH"
fi
`;
}

// ─── Helper Scripts ──────────────────────────────────────────────────────────

export function generateQuickStatusScript(): string {
  return `#!/usr/bin/env bash
# Arcanea Quick Status — one-liner overview
set +e
ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
SD="\$ARCANEA_HOME/sessions/current"
G=\$(cat "\$SD/guardian" 2>/dev/null || echo "Shinkami")
GT=\$(cat "\$SD/gate" 2>/dev/null || echo "Source")
TC=\$(cat "\$SD/tool-count" 2>/dev/null || echo "0")
CS=\$(cat "\$SD/context-status" 2>/dev/null || echo "PEAK|0|0|200000")
Z=\$(echo "\$CS" | cut -d'|' -f1)
P=\$(echo "\$CS" | cut -d'|' -f2)
echo "Arcanea | Guardian: \$G | Gate: \$GT | Tools: \$TC | Context: \$Z (\${P}%)"
`;
}

export function generateHealthCheckScript(): string {
  return `#!/usr/bin/env bash
# Arcanea Health Check — verify all subsystems
set +e
ARCANEA_HOME="\${ARCANEA_HOME:-\$HOME/.arcanea}"
DB_PATH="\${ARCANEA_DB:-\$ARCANEA_HOME/agentdb.sqlite3}"
SD="\$ARCANEA_HOME/sessions/current"
PASS=0; FAIL=0

check() {
  if eval "\$2" >/dev/null 2>&1; then
    echo "  [OK] \$1"; PASS=\$((PASS + 1))
  else
    echo "  [!!] \$1"; FAIL=\$((FAIL + 1))
  fi
}

echo "=== Arcanea Health Check ==="
check "Session directory" "[ -d '\$SD' ]"
check "Guardian state" "[ -f '\$SD/guardian' ]"
check "Gate state" "[ -f '\$SD/gate' ]"
check "Tool counter" "[ -f '\$SD/tool-count' ]"
check "Tokens tracker" "[ -f '\$SD/tokens.json' ]"
check "AgentDB exists" "[ -f '\$DB_PATH' ]"
check "AgentDB readable" "python3 -c \\"import sqlite3; sqlite3.connect('\$DB_PATH').execute('SELECT 1')\\""
check "Python3 available" "which python3"
check "Routing log" "[ -f '\$SD/routing.log' ]"
echo ""
echo "Result: \$PASS passed, \$FAIL failed"
`;
}

// ─── All Hooks Map (for installer) ──────────────────────────────────────────

export interface HookFile {
  filename: string;
  content: string;
  executable: boolean;
}

export function getAllHookFiles(): HookFile[] {
  return [
    { filename: 'session-start.sh', content: generateSessionStartHook(), executable: true },
    { filename: 'prompt-submit.sh', content: generatePromptSubmitHook(), executable: true },
    { filename: 'model-route.sh', content: generateModelRouteHook(), executable: true },
    { filename: 'pre-tool.sh', content: generatePreToolHook(), executable: true },
    { filename: 'voice-check.sh', content: generateVoiceCheckHook(), executable: true },
    { filename: 'post-tool.sh', content: generatePostToolHook(), executable: true },
    { filename: 'context-tracker.sh', content: generateContextTrackerHook(), executable: true },
    { filename: 'session-end.sh', content: generateSessionEndHook(), executable: true },
  ];
}

export function getAllHelperFiles(): HookFile[] {
  return [
    { filename: 'arcanea-quick-status.sh', content: generateQuickStatusScript(), executable: true },
    { filename: 'arcanea-health.sh', content: generateHealthCheckScript(), executable: true },
  ];
}
