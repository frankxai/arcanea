#!/usr/bin/env bash
# Arcanea Intelligence OS — AgentDB → SIS Bridge
# Extracts patterns from AgentDB and writes to SIS memory.json
# Called at session-end to create compound learning loop.
set +e

ARCANEA_HOME="${ARCANEA_HOME:-$HOME/.arcanea}"
DB_PATH="${ARCANEA_DB:-$ARCANEA_HOME/agentdb.sqlite3}"
SIS_DIR="${SIS_DIR:-/mnt/c/Users/frank/Arcanea/starlight-intelligence-system}"
MEMORY_PATH="$SIS_DIR/.starlight/memory.json"

# Ensure .starlight directory exists
mkdir -p "$SIS_DIR/.starlight"

# Initialize memory.json if it doesn't exist
if [ ! -f "$MEMORY_PATH" ]; then
  echo "[]" > "$MEMORY_PATH"
fi

# Skip if no AgentDB
if [ ! -f "$DB_PATH" ]; then
  echo "[bridge] No AgentDB found at $DB_PATH — skipping sync."
  exit 0
fi

python3 << 'PYEOF'
import sqlite3
import json
import os
import hashlib
from datetime import datetime

DB_PATH = os.environ.get("ARCANEA_DB", os.path.expanduser("~/.arcanea/agentdb.sqlite3"))
SIS_DIR = os.environ.get("SIS_DIR", "/mnt/c/Users/frank/Arcanea/starlight-intelligence-system")
MEMORY_PATH = os.path.join(SIS_DIR, ".starlight", "memory.json")

def load_memory():
    try:
        with open(MEMORY_PATH, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_memory(entries):
    os.makedirs(os.path.dirname(MEMORY_PATH), exist_ok=True)
    with open(MEMORY_PATH, "w") as f:
        json.dump(entries, f, indent=2)

def content_hash(content):
    return hashlib.md5(content.encode()).hexdigest()[:12]

def existing_hashes(entries):
    return {content_hash(e.get("content", "")) for e in entries}

def gen_id():
    import random
    return f"mem_{int(datetime.now().timestamp())}_{random.randbytes(4).hex()}"

def main():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row

    entries = load_memory()
    hashes = existing_hashes(entries)
    added = 0
    now = datetime.now(tz=__import__('datetime').timezone.utc).isoformat().replace('+00:00', 'Z')

    # 1. Extract routing patterns (top Guardians by frequency)
    rows = db.execute(
        "SELECT detected_guardian, count(*) as cnt FROM routing_log GROUP BY detected_guardian ORDER BY cnt DESC"
    ).fetchall()

    if rows:
        pattern_lines = [f"{r['detected_guardian']}: {r['cnt']} routings" for r in rows]
        content = "Guardian routing frequency: " + ", ".join(pattern_lines)
        h = content_hash(content)
        if h not in hashes:
            entries.append({
                "id": gen_id(),
                "content": content,
                "category": "pattern",
                "tags": ["routing", "guardians", "agentdb"],
                "confidence": 0.9,
                "source": "agentdb-bridge",
                "createdAt": now,
            })
            hashes.add(h)
            added += 1

    # 2. Extract session summaries from vault_entries
    rows = db.execute(
        "SELECT id, value FROM vault_entries WHERE category='session' ORDER BY created_at DESC LIMIT 5"
    ).fetchall()

    for row in rows:
        content = row["value"]
        h = content_hash(content)
        if h not in hashes:
            entries.append({
                "id": gen_id(),
                "content": content,
                "category": "insight",
                "tags": ["session", "summary", "agentdb"],
                "confidence": 0.7,
                "source": "agentdb-bridge",
                "createdAt": now,
            })
            hashes.add(h)
            added += 1

    # 3. Extract significant memories (non-tool-log entries)
    rows = db.execute(
        "SELECT agent_id, namespace, key, value FROM memories WHERE namespace != 'tool-log' ORDER BY created_at DESC LIMIT 20"
    ).fetchall()

    for row in rows:
        content = f"[{row['agent_id']}] {row['value']}"
        h = content_hash(content)
        if h not in hashes:
            entries.append({
                "id": gen_id(),
                "content": content,
                "category": "insight",
                "tags": [row["agent_id"], row["namespace"], "agentdb"],
                "confidence": 0.6,
                "source": "agentdb-bridge",
                "createdAt": now,
            })
            hashes.add(h)
            added += 1

    db.close()

    if added > 0:
        save_memory(entries)
        print(f"[bridge] Synced {added} entries from AgentDB → SIS memory ({len(entries)} total)")
    else:
        print("[bridge] No new entries to sync.")

main()
PYEOF
