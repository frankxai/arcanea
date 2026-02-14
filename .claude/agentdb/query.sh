#!/usr/bin/env bash
set +e
DB_PATH="/tmp/arcanea-agentdb.sqlite3"

run_query() {
    local query="$1"
    local header="${2:-1}"
    python3 << PYEOF
import sqlite3

db = sqlite3.connect("$DB_PATH")
db.row_factory = sqlite3.Row
cursor = db.cursor()
cursor.execute("""$query""")
rows = cursor.fetchall()
if not rows:
    print("(no results)")
    db.close()
    exit(0)
if $header:
    cols = [desc[0] for desc in cursor.description]
    widths = [max(len(str(col)), max(len(str(row[i])) if row[i] is not None else 4 for row in rows)) for i, col in enumerate(cols)]
    header_line = "  ".join(str(c).ljust(w) for c, w in zip(cols, widths))
    print(header_line)
    print("  ".join("-" * w for w in widths))
    for row in rows:
        print("  ".join(str(v if v is not None else "NULL").ljust(w) for v, w in zip(row, widths)))
db.close()
PYEOF
}

case "$1" in
    guardians)
        run_query "SELECT id, name, guardian, gate, element, model, status FROM agents"
        ;;
    active)
        run_query "SELECT id, name, guardian, status FROM agents WHERE status = 'active'"
        ;;
    tasks)
        run_query "SELECT id, title, guardian, status, priority FROM tasks ORDER BY created_at DESC LIMIT 20"
        ;;
    memories)
        run_query "SELECT agent_id, namespace, key, substr(value,1,60) as value_preview FROM memories ORDER BY created_at DESC LIMIT 20"
        ;;
    vault)
        run_query "SELECT layer, category, key, substr(value,1,80) as value FROM vault_entries"
        ;;
    routing)
        run_query "SELECT detected_guardian, count(*) as count FROM routing_log GROUP BY detected_guardian ORDER BY count DESC"
        ;;
    stats)
        python3 << PYEOF
import sqlite3
db = sqlite3.connect("$DB_PATH")
c = db.cursor()
print("=== AgentDB Stats ===")
c.execute("SELECT count(*) FROM agents"); print(f"Agents: {c.fetchone()[0]}")
c.execute("SELECT count(*) FROM agents WHERE status='active'"); print(f"Active: {c.fetchone()[0]}")
c.execute("SELECT count(*) FROM tasks"); print(f"Tasks: {c.fetchone()[0]}")
c.execute("SELECT count(*) FROM memories"); print(f"Memories: {c.fetchone()[0]}")
c.execute("SELECT count(*) FROM vault_entries"); print(f"Vault: {c.fetchone()[0]}")
c.execute("SELECT count(*) FROM routing_log"); print(f"Routings: {c.fetchone()[0]}")
db.close()
PYEOF
        ;;
    sql)
        shift
        run_query "$1"
        ;;
    *)
        echo "Usage: query.sh {guardians|active|tasks|memories|vault|routing|stats|sql 'QUERY'}"
        ;;
esac
