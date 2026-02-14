#!/usr/bin/env bash
set +e
G=$(cat /tmp/arcanea-guardian 2>/dev/null || echo "Shinkami")
GATE=$(cat /tmp/arcanea-gate 2>/dev/null || echo "Source")
A=$(ls /tmp/arcanea-agents/ 2>/dev/null | wc -l || echo "0")
T=$(cat /tmp/arcanea-session/tool-count 2>/dev/null || echo "0")
echo "⟡ Arcanea | ${G} | Gate: ${GATE} | Agents: ${A} | Tools: ${T}"
