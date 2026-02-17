#!/usr/bin/env bash
# Arcanea Health Check — verify all systems are operational
set +e

GREEN='\033[32m'
RED='\033[31m'
YELLOW='\033[33m'
RESET='\033[0m'

pass() { echo -e "  ${GREEN}✓${RESET} $1"; }
fail() { echo -e "  ${RED}✗${RESET} $1"; }
warn() { echo -e "  ${YELLOW}!${RESET} $1"; }

echo ""
echo "═══ Arcanea Health Check ═══"
echo ""

# Check AgentDB
if [ -f /tmp/arcanea-agentdb.sqlite3 ]; then
    COUNT=$(python3 -c "
import sqlite3
conn = sqlite3.connect('/tmp/arcanea-agentdb.sqlite3')
print(conn.cursor().execute('SELECT count(*) FROM agents').fetchone()[0])
conn.close()
" 2>/dev/null)
    if [ "$COUNT" = "10" ]; then
        pass "AgentDB: $COUNT Guardians loaded"
    else
        warn "AgentDB: $COUNT agents (expected 10)"
    fi
else
    fail "AgentDB: Not initialized (run .claude/agentdb/init.sh)"
fi

# Check session
if [ -d /tmp/arcanea-session ]; then
    pass "Session: Active"
else
    warn "Session: Not started (hooks not triggered yet)"
fi

# Check hooks (in settings.local.json, not standalone hooks.json)
if [ -f /mnt/c/Users/frank/Arcanea/.claude/settings.local.json ]; then
    HOOK_COUNT=$(python3 -c "
import json
with open('/mnt/c/Users/frank/Arcanea/.claude/settings.local.json') as f:
    data = json.load(f)
hooks = data.get('hooks', {})
print(len(hooks))
" 2>/dev/null)
    if [ "$HOOK_COUNT" -gt 0 ] 2>/dev/null; then
        pass "Hooks: $HOOK_COUNT event types wired in settings.local.json"
    else
        warn "Hooks: settings.local.json exists but no hooks configured"
    fi
else
    fail "Hooks: Missing settings.local.json"
fi

# Check statusline
if [ -f /mnt/c/Users/frank/Arcanea/.claude/statusline.sh ]; then
    pass "Statusline (bash): Installed"
else
    fail "Statusline (bash): Missing"
fi

if [ -f /mnt/c/Users/frank/Arcanea/.claude/statusline.mjs ]; then
    pass "Statusline (ESM): Installed"
else
    fail "Statusline (ESM): Missing"
fi

# Check flow config
if [ -f /mnt/c/Users/frank/Arcanea/.claude/flow/arcanea-flow-config.yaml ]; then
    pass "Flow Config: Present"
else
    fail "Flow Config: Missing"
fi

# Check Guardian state
GUARDIAN=$(cat /tmp/arcanea-guardian 2>/dev/null)
if [ -n "$GUARDIAN" ]; then
    pass "Guardian State: $GUARDIAN"
else
    warn "Guardian State: Not set (awaiting first prompt)"
fi

# Check arcanea-flow
if [ -d /mnt/c/Users/frank/Arcanea/arcanea-flow ]; then
    pass "Arcanea Flow: Installed"
else
    warn "Arcanea Flow: Not found locally"
fi

# Check starlight-protocol
if [ -d /mnt/c/Users/frank/Arcanea/starlight-protocol ]; then
    pass "Starlight Protocol: Present"
else
    warn "Starlight Protocol: Not found"
fi

echo ""
echo "═══ Health Check Complete ═══"
echo ""
