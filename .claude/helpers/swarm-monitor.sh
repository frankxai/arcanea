#!/usr/bin/env bash
# Arcanea Swarm Monitor — watches agent activity
set +e

DB_PATH="/tmp/arcanea-agentdb.sqlite3"

if [ ! -f "$DB_PATH" ]; then
    echo "AgentDB not initialized. Run: bash .claude/agentdb/init.sh"
    exit 0
fi

echo ""
echo "═══ Arcanea Swarm Monitor ═══"
echo ""

# Helper: query AgentDB via python3
db_query() {
    python3 -c "
import sqlite3
conn = sqlite3.connect('$DB_PATH')
cur = conn.cursor()
cur.execute('''$1''')
rows = cur.fetchall()
for r in rows:
    print('|'.join(str(c) for c in r))
conn.close()
" 2>/dev/null
}

db_scalar() {
    python3 -c "
import sqlite3
conn = sqlite3.connect('$DB_PATH')
cur = conn.cursor()
cur.execute('''$1''')
print(cur.fetchone()[0])
conn.close()
" 2>/dev/null || echo "0"
}

# Active agents
ACTIVE=$(db_scalar "SELECT count(*) FROM agents WHERE status='active'")
TOTAL=$(db_scalar "SELECT count(*) FROM agents")
echo "Agents: $ACTIVE active / $TOTAL total"

# Active swarms
SWARMS=$(db_scalar "SELECT count(*) FROM swarm_sessions WHERE status='active'")
echo "Swarms: $SWARMS active"

# Recent tasks
PENDING=$(db_scalar "SELECT count(*) FROM tasks WHERE status='pending'")
IN_PROG=$(db_scalar "SELECT count(*) FROM tasks WHERE status='in_progress'")
DONE=$(db_scalar "SELECT count(*) FROM tasks WHERE status='completed'")
echo "Tasks: $PENDING pending, $IN_PROG in progress, $DONE completed"

# Memory stats
MEMS=$(db_scalar "SELECT count(*) FROM memories")
echo "Memories: $MEMS entries"

# Recent routing
echo ""
echo "── Recent Routing ──"
ROUTES=$(db_query "SELECT detected_guardian, count(*) as routes FROM routing_log GROUP BY detected_guardian ORDER BY routes DESC LIMIT 5")
if [ -z "$ROUTES" ]; then
    echo "No routing data yet."
else
    printf "%-20s %s\n" "Guardian" "Routes"
    printf "%-20s %s\n" "────────────────────" "──────"
    echo "$ROUTES" | while IFS='|' read -r guardian count; do
        printf "%-20s %s\n" "$guardian" "$count"
    done
fi
echo ""
