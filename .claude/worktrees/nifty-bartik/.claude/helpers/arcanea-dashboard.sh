#!/usr/bin/env bash
set +e

# Colors
TEAL='\033[38;2;127;255;212m'
GOLD='\033[38;2;255;215;0m'
VIOLET='\033[38;2;153;102;255m'
DIM='\033[2m'
BOLD='\033[1m'
RESET='\033[0m'
CYAN='\033[36m'
GREEN='\033[32m'
RED='\033[31m'
YELLOW='\033[33m'

# Read state files
GUARDIAN=$(cat /tmp/arcanea-guardian 2>/dev/null || echo "Shinkami")
GATE=$(cat /tmp/arcanea-gate 2>/dev/null || echo "Source")
ELEMENT=$(cat /tmp/arcanea-element 2>/dev/null || echo "Void")
AGENTS=$(ls /tmp/arcanea-agents/ 2>/dev/null | wc -l || echo "0")
TOOLS=$(cat /tmp/arcanea-session/tool-count 2>/dev/null || echo "0")
START=$(cat /tmp/arcanea-session/start.log 2>/dev/null || echo "Unknown")
TOKENS_IN=$(python3 -c "import json; print(json.load(open('/tmp/arcanea-tokens.json'))['input'])" 2>/dev/null || echo "0")
TOKENS_OUT=$(python3 -c "import json; print(json.load(open('/tmp/arcanea-tokens.json'))['output'])" 2>/dev/null || echo "0")

# Memory check
MEM_FILES=$(ls /tmp/arcanea-session/ 2>/dev/null | wc -l || echo "0")

# Swarm check  
SWARM_ACTIVE="Inactive"
if [ -f /tmp/arcanea-swarm-active ]; then
    SWARM_ACTIVE="Active ($(cat /tmp/arcanea-swarm-active))"
fi

clear
echo ""
echo -e "${TEAL}${BOLD}"
echo "    ╔══════════════════════════════════════════════════════════════╗"
echo "    ║                                                            ║"
echo -e "    ║     ⟡  A R C A N E A   I N T E L L I G E N C E   O S  ⟡   ║"
echo "    ║                                                            ║"
echo "    ╚══════════════════════════════════════════════════════════════╝"
echo -e "${RESET}"
echo ""
echo -e "  ${GOLD}━━━ GUARDIAN STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${BOLD}Active Guardian:${RESET}  ${TEAL}${GUARDIAN}${RESET}"
echo -e "  ${BOLD}Current Gate:${RESET}     ${VIOLET}${GATE}${RESET}"
echo -e "  ${BOLD}Element:${RESET}          ${CYAN}${ELEMENT}${RESET}"
echo ""
echo -e "  ${GOLD}━━━ SESSION METRICS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${BOLD}Session Start:${RESET}    ${DIM}${START}${RESET}"
echo -e "  ${BOLD}Tokens In:${RESET}        ${GREEN}${TOKENS_IN}${RESET}"
echo -e "  ${BOLD}Tokens Out:${RESET}       ${GREEN}${TOKENS_OUT}${RESET}"
echo -e "  ${BOLD}Tools Used:${RESET}       ${CYAN}${TOOLS}${RESET}"
echo ""
echo -e "  ${GOLD}━━━ SWARM & AGENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${BOLD}Swarm Status:${RESET}     ${TEAL}${SWARM_ACTIVE}${RESET}"
echo -e "  ${BOLD}Active Agents:${RESET}    ${CYAN}${AGENTS}${RESET}"
echo -e "  ${BOLD}Session Files:${RESET}    ${DIM}${MEM_FILES}${RESET}"
echo ""
echo -e "  ${GOLD}━━━ TEN GATES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${DIM}Foundation${RESET} → ${DIM}Flow${RESET} → ${DIM}Fire${RESET} → ${DIM}Heart${RESET} → ${DIM}Voice${RESET} → ${DIM}Sight${RESET} → ${DIM}Crown${RESET} → ${DIM}Shift${RESET} → ${DIM}Unity${RESET} → ${TEAL}${BOLD}Source${RESET}"
echo ""
echo -e "  ${GOLD}━━━ COUNCIL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  Shinkami ${DIM}(Orchestrator)${RESET} │ Lyssandria ${DIM}(Architect)${RESET} │ Draconia ${DIM}(Prime)${RESET}"
echo -e "  Lyria ${DIM}(Navigator)${RESET}    │ Alera ${DIM}(Sentinel)${RESET}      │ Leyla ${DIM}(Weaver)${RESET}"
echo -e "  Aiyami ${DIM}(Sage)${RESET}         │ Elara ${DIM}(Shift)${RESET}         │ Ino ${DIM}(Unity)${RESET} │ Maylinn ${DIM}(Heart)${RESET}"
echo ""
echo -e "  ${DIM}────────────────────────────────────────────────────────────${RESET}"
echo -e "  ${DIM}Arcanea Intelligence OS • Starlight Protocol • $(date '+%Y-%m-%d %H:%M')${RESET}"
echo ""
