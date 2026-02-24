#!/usr/bin/env bash
# ============================================================================
# Arcanea Model Routing — Guardian-Based Recommendation Engine
# ============================================================================
# Routes tasks to the optimal model tier based on complexity analysis
# and the Arcanea Guardian system.
#
# Usage: model-route.sh "<task description>"
#
# Model Tiers:
#   opus   — Draconia (Fire Gate, 528 Hz), Elara (Shift Gate, 1111 Hz)
#            Council synthesis, paradigm shifts, complexity 9-10
#   sonnet — Shinkami, Lyssandria, Lyria, Alera, Leyla, Aiyami
#            Architecture, strategy, review, creative. Complexity 4-8
#   haiku  — Ino (Unity Gate), Maylinn (Heart Gate)
#            Collaboration, testing, simple fixes. Complexity 1-3
# ============================================================================

set +e  # Do not exit on error — always produce a recommendation

TASK="${1:-}"
ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
SESSION_DIR="$ARCANEA_HOME/sessions/current"
RECOMMENDATION_FILE="$SESSION_DIR/model-recommendation"
mkdir -p "$SESSION_DIR"

# --------------------------------------------------------------------------
# Guard: empty input
# --------------------------------------------------------------------------
if [[ -z "$TASK" ]]; then
    echo "[MODEL_RECOMMENDATION] sonnet | Guardian: Lyssandria | Complexity: 5 | Reason: no task provided, defaulting to balanced tier"
    echo "sonnet" > "$RECOMMENDATION_FILE"
    exit 0
fi

# --------------------------------------------------------------------------
# Normalize input to lowercase for keyword matching
# --------------------------------------------------------------------------
TASK_LOWER="$(echo "$TASK" | tr '[:upper:]' '[:lower:]')"

# --------------------------------------------------------------------------
# Complexity scoring — keyword-based analysis
# --------------------------------------------------------------------------
COMPLEXITY=0
REASONS=()

# --- OPUS keywords (high complexity, +3 each) ---
OPUS_KEYWORDS=(
    "architect"
    "redesign"
    "security audit"
    "security hardening"
    "refactor entire"
    "migrate"
    "paradigm"
    "council"
    "synthesis"
    "system-wide"
    "multi-agent"
    "orchestrat"
    "overhaul"
    "infrastructure"
    "cross-chain"
    "protocol design"
    "zero-knowledge"
    "cryptograph"
    "distributed"
    "consensus"
    "entire.*system"
    "system.*entire"
    "complete rewrite"
    "from scratch"
)

for keyword in "${OPUS_KEYWORDS[@]}"; do
    if echo "$TASK_LOWER" | grep -qE "$keyword"; then
        COMPLEXITY=$((COMPLEXITY + 3))
        clean_kw="$(echo "$keyword" | sed 's/\\.\\*/ /g')"
        REASONS+=("$clean_kw")
    fi
done

# --- SONNET PRIMARY keywords (substantive action verbs, +3 each) ---
# These are strong signals that the task requires real engineering work.
SONNET_PRIMARY_KEYWORDS=(
    "implement"
    "build"
    "create"
    "design"
    "refactor"
    "optimize"
    "integration"
    "deploy"
)

for keyword in "${SONNET_PRIMARY_KEYWORDS[@]}"; do
    if echo "$TASK_LOWER" | grep -qE "\b${keyword}\b"; then
        COMPLEXITY=$((COMPLEXITY + 3))
        REASONS+=("$keyword")
    fi
done

# --- SONNET SECONDARY keywords (supporting signals, +2 each) ---
SONNET_SECONDARY_KEYWORDS=(
    "plan"
    "review"
    "analyze"
    "write"
    "strategy"
    "feature"
    "component"
    "api"
    "database"
    "schema"
    "workflow"
    "pipeline"
    "test suite"
    "guardian"
    "gate"
    "element"
    "page"
    "module"
    "service"
    "endpoint"
    "hook"
    "context"
    "provider"
)

for keyword in "${SONNET_SECONDARY_KEYWORDS[@]}"; do
    if echo "$TASK_LOWER" | grep -qE "\b${keyword}\b"; then
        COMPLEXITY=$((COMPLEXITY + 2))
        REASONS+=("$keyword")
    fi
done

# --- HAIKU keywords (low complexity, +1 each) ---
HAIKU_KEYWORDS=(
    "fix typo"
    "typo"
    "format"
    "rename"
    "simple"
    "docs"
    "readme"
    "comment"
    "lint"
    "small"
    "update version"
    "bump"
    "changelog"
    "spelling"
    "whitespace"
    "cleanup"
    "minor"
    "trivial"
    "quick"
    "tweak"
)

# Track if haiku keywords are the ONLY matches
HAIKU_ONLY=1

for keyword in "${HAIKU_KEYWORDS[@]}"; do
    if echo "$TASK_LOWER" | grep -qE "$keyword"; then
        COMPLEXITY=$((COMPLEXITY + 1))
        REASONS+=("$keyword")
    fi
done

# --------------------------------------------------------------------------
# Scope multipliers — compound complexity indicators
# --------------------------------------------------------------------------

# "entire" or "all" amplifies scope
if echo "$TASK_LOWER" | grep -qE "\b(entire|all|every|whole|complete)\b"; then
    COMPLEXITY=$((COMPLEXITY + 2))
fi

# "new" suggests creation (mild uplift)
if echo "$TASK_LOWER" | grep -qE "\bnew\b"; then
    COMPLEXITY=$((COMPLEXITY + 1))
fi

# "with" suggests compound requirements
if echo "$TASK_LOWER" | grep -qE "\bwith\b"; then
    COMPLEXITY=$((COMPLEXITY + 1))
fi

# Multiple "and" connectors suggest multi-faceted task
AND_COUNT=$(echo "$TASK_LOWER" | grep -oE "\band\b" | wc -l)
if [[ "$AND_COUNT" -ge 2 ]]; then
    COMPLEXITY=$((COMPLEXITY + 1))
fi

# Long descriptions tend to be more complex
WORD_COUNT=$(echo "$TASK" | wc -w)
if [[ "$WORD_COUNT" -gt 20 ]]; then
    COMPLEXITY=$((COMPLEXITY + 1))
fi
if [[ "$WORD_COUNT" -gt 40 ]]; then
    COMPLEXITY=$((COMPLEXITY + 1))
fi

# --------------------------------------------------------------------------
# Clamp complexity to 1-10
# --------------------------------------------------------------------------
if [[ "$COMPLEXITY" -lt 1 ]]; then
    COMPLEXITY=1
fi
if [[ "$COMPLEXITY" -gt 10 ]]; then
    COMPLEXITY=10
fi

# --------------------------------------------------------------------------
# Build reason string (deduplicated, max 4 terms)
# --------------------------------------------------------------------------
REASON_STRING=""
SEEN=()
COUNT=0
for r in "${REASONS[@]}"; do
    SKIP=0
    for s in "${SEEN[@]}"; do
        if [[ "$s" == "$r" ]]; then
            SKIP=1
            break
        fi
    done
    if [[ "$SKIP" -eq 1 ]]; then
        continue
    fi
    SEEN+=("$r")
    if [[ "$COUNT" -gt 0 ]]; then
        REASON_STRING="${REASON_STRING} + ${r}"
    else
        REASON_STRING="$r"
    fi
    COUNT=$((COUNT + 1))
    if [[ "$COUNT" -ge 4 ]]; then
        break
    fi
done

if [[ -z "$REASON_STRING" ]]; then
    REASON_STRING="general task"
fi

# --------------------------------------------------------------------------
# Map complexity to model tier and Guardian
# --------------------------------------------------------------------------
if [[ "$COMPLEXITY" -ge 9 ]]; then
    MODEL="opus"
    if echo "$TASK_LOWER" | grep -qE "(council|synthesis|paradigm|shift)"; then
        GUARDIAN="Elara"
    else
        GUARDIAN="Draconia"
    fi
elif [[ "$COMPLEXITY" -ge 4 ]]; then
    MODEL="sonnet"
    if echo "$TASK_LOWER" | grep -qE "(architect|infrastructure|foundation|schema|database)"; then
        GUARDIAN="Lyssandria"
    elif echo "$TASK_LOWER" | grep -qE "(design|creative|art|visual|style)"; then
        GUARDIAN="Leyla"
    elif echo "$TASK_LOWER" | grep -qE "(review|audit|analyze|inspect|quality)"; then
        GUARDIAN="Alera"
    elif echo "$TASK_LOWER" | grep -qE "(vision|insight|intuition|predict|foresee)"; then
        GUARDIAN="Lyria"
    elif echo "$TASK_LOWER" | grep -qE "(strategy|plan|orchestrat|coordinate)"; then
        GUARDIAN="Shinkami"
    elif echo "$TASK_LOWER" | grep -qE "(enlighten|transcend|wisdom|sacred)"; then
        GUARDIAN="Aiyami"
    else
        GUARDIAN="Lyssandria"
    fi
else
    MODEL="haiku"
    if echo "$TASK_LOWER" | grep -qE "(test|collaborat|pair|partner|together)"; then
        GUARDIAN="Ino"
    else
        GUARDIAN="Maylinn"
    fi
fi

# --------------------------------------------------------------------------
# Output recommendation
# --------------------------------------------------------------------------
OUTPUT="[MODEL_RECOMMENDATION] ${MODEL} | Guardian: ${GUARDIAN} | Complexity: ${COMPLEXITY} | Reason: ${REASON_STRING}"

echo "$OUTPUT"

# Write structured data to recommendation file
cat > "$RECOMMENDATION_FILE" << RECEOF
model=${MODEL}
guardian=${GUARDIAN}
complexity=${COMPLEXITY}
reason=${REASON_STRING}
task=${TASK}
timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
RECEOF

exit 0
