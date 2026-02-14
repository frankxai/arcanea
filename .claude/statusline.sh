#!/usr/bin/env bash
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Arcanea Statusline for Claude Code
# A living universe statusbar — fast, resilient, branded.
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

set -euo pipefail

# ── Symbols ──────────────────────────────────────────────────────────────────
readonly SYM_BRAND="⟡"
readonly SYM_SEP="│"
readonly SYM_GATE="◈"
readonly SYM_AGENT="◉"
readonly SYM_MEM="▣"
readonly SYM_ELEM="✦"

# ── Guardian ─────────────────────────────────────────────────────────────────
# The active Guardian identity. Defaults to Shinkami (Source, meta-consciousness).
guardian="Shinkami"
if [[ -f /tmp/arcanea-guardian ]]; then
    read -r guardian < /tmp/arcanea-guardian 2>/dev/null || guardian="Shinkami"
    # Sanitize: strip whitespace, cap length
    guardian="${guardian%%[[:space:]]*}"
    guardian="${guardian:0:20}"
    [[ -z "$guardian" ]] && guardian="Shinkami"
fi

# ── Gate ─────────────────────────────────────────────────────────────────────
# The Ten Gates: Foundation, Flow, Fire, Heart, Voice, Sight, Crown, Shift, Unity, Source
gate=""
if [[ -f /tmp/arcanea-gate ]]; then
    read -r gate < /tmp/arcanea-gate 2>/dev/null || gate=""
    gate="${gate%%[[:space:]]*}"
    gate="${gate:0:16}"
fi

# ── Active Agents ────────────────────────────────────────────────────────────
agent_count=0
if [[ -d /tmp/arcanea-agents ]]; then
    # Count regular files only, fast glob
    shopt -s nullglob
    agent_files=(/tmp/arcanea-agents/*)
    agent_count=${#agent_files[@]}
    shopt -u nullglob
fi

# ── Memory Usage ─────────────────────────────────────────────────────────────
memory=""
if [[ -f /tmp/arcanea-memory-usage ]]; then
    read -r memory < /tmp/arcanea-memory-usage 2>/dev/null || memory=""
    memory="${memory%%[[:space:]]*}"
    memory="${memory:0:12}"
fi

# ── Element ──────────────────────────────────────────────────────────────────
# Determine active element. Read from file, or derive from Guardian mapping.
element=""
if [[ -f /tmp/arcanea-element ]]; then
    read -r element < /tmp/arcanea-element 2>/dev/null || element=""
    element="${element%%[[:space:]]*}"
fi

if [[ -z "$element" ]]; then
    # Derive element from Guardian if no explicit override
    case "$guardian" in
        Lyssandria)  element="Earth" ;;
        Leyla)       element="Water" ;;
        Draconia)    element="Fire"  ;;
        Maylinn)     element="Earth" ;;
        Alera)       element="Wind"  ;;
        Lyria)       element="Void"  ;;
        Aiyami)      element="Void"  ;;
        Elara)       element="Wind"  ;;
        Ino)         element="Water" ;;
        Shinkami)    element="Void"  ;;
        *)           element="Void"  ;;
    esac
fi

# ── Assemble ─────────────────────────────────────────────────────────────────
parts=()
parts+=("${SYM_BRAND} Arcanea")
parts+=("Guardian: ${guardian}")

if [[ -n "$gate" ]]; then
    parts+=("${SYM_GATE} Gate: ${gate}")
fi

if (( agent_count > 0 )); then
    parts+=("${SYM_AGENT} Agents: ${agent_count}")
fi

if [[ -n "$memory" ]]; then
    parts+=("${SYM_MEM} Memory: ${memory}")
fi

parts+=("${SYM_ELEM} ${element}")

# Join with separator
output=""
for i in "${!parts[@]}"; do
    if (( i > 0 )); then
        output+=" ${SYM_SEP} "
    fi
    output+="${parts[$i]}"
done

printf '%s\n' "$output"
