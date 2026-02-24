#!/usr/bin/env bash
# Activate a specific Guardian
# Usage: guardian-activate.sh <guardian-name>
set +e

GUARDIAN="${1:-Shinkami}"
DB_PATH="/tmp/arcanea-agentdb.sqlite3"

# Normalize name (capitalize first letter)
GUARDIAN="$(echo "${GUARDIAN:0:1}" | tr '[:lower:]' '[:upper:]')$(echo "${GUARDIAN:1}" | tr '[:upper:]' '[:lower:]')"

declare -A GATES
GATES=([Shinkami]=Source [Lyssandria]=Foundation [Draconia]=Fire [Lyria]=Sight [Alera]=Voice [Leyla]=Flow [Aiyami]=Crown [Elara]=Shift [Ino]=Unity [Maylinn]=Heart)

declare -A ELEMENTS
ELEMENTS=([Shinkami]=Void [Lyssandria]=Earth [Draconia]=Fire [Lyria]=Sight [Alera]=Voice [Leyla]=Water [Aiyami]=Crown [Elara]=Shift [Ino]=Unity [Maylinn]=Wind)

declare -A ROLES
ROLES=([Shinkami]=Orchestrator [Lyssandria]=Architect [Draconia]=Prime [Lyria]=Navigator [Alera]=Sentinel [Leyla]=Weaver [Aiyami]=Sage [Elara]=Shift [Ino]=Unity [Maylinn]=Heart)

if [ -z "${GATES[$GUARDIAN]}" ]; then
    echo "Unknown Guardian: $GUARDIAN"
    echo "Valid: Shinkami, Lyssandria, Draconia, Lyria, Alera, Leyla, Aiyami, Elara, Ino, Maylinn"
    exit 1
fi

echo "$GUARDIAN" > /tmp/arcanea-guardian
echo "${GATES[$GUARDIAN]}" > /tmp/arcanea-gate
echo "${ELEMENTS[$GUARDIAN]}" > /tmp/arcanea-element

# Update AgentDB if available
if [ -f "$DB_PATH" ]; then
    GUARDIAN_LOWER=$(echo "$GUARDIAN" | tr '[:upper:]' '[:lower:]')
    python3 -c "
import sqlite3
conn = sqlite3.connect('$DB_PATH')
conn.execute(\"UPDATE agents SET status='idle' WHERE status='active'\")
conn.execute(\"UPDATE agents SET status='active', last_active=datetime('now') WHERE id='$GUARDIAN_LOWER'\")
conn.commit()
conn.close()
" 2>/dev/null
fi

echo "⟡ Guardian Activated: $GUARDIAN (${ROLES[$GUARDIAN]}) | Gate: ${GATES[$GUARDIAN]} | Element: ${ELEMENTS[$GUARDIAN]}"
