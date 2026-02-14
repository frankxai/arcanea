#!/usr/bin/env bash
set +e

DB_PATH="${ARCANEA_DB:-$HOME/.arcanea/agentdb.sqlite3}"
mkdir -p "$(dirname "$DB_PATH")"
SCHEMA_PATH="$(dirname "$0")/schema.sql"

python3 << PYEOF
import sqlite3

db = sqlite3.connect("$DB_PATH")
cursor = db.cursor()

# Execute schema
with open("$SCHEMA_PATH", "r") as f:
    cursor.executescript(f.read())

# Seed the 10 Guardians as agents
guardians = [
    ('shinkami', 'Orchestrator', 'Shinkami', 'Source', 'Void', 'google/gemini-2.5-pro', 'idle'),
    ('lyssandria', 'Architect', 'Lyssandria', 'Foundation', 'Earth', 'google/gemini-2.5-pro', 'idle'),
    ('draconia', 'Prime', 'Draconia', 'Fire', 'Fire', 'anthropic/claude-opus-4-6', 'idle'),
    ('lyria', 'Navigator', 'Lyria', 'Sight', None, 'google/gemini-2.5-pro', 'idle'),
    ('alera', 'Sentinel', 'Alera', 'Voice', None, 'google/gemini-2.5-pro', 'idle'),
    ('leyla', 'Weaver', 'Leyla', 'Flow', 'Water', 'google/gemini-2.5-pro', 'idle'),
    ('aiyami', 'Sage', 'Aiyami', 'Crown', None, 'google/gemini-2.5-pro', 'idle'),
    ('elara', 'Shift', 'Elara', 'Shift', None, 'anthropic/claude-opus-4-6', 'idle'),
    ('ino', 'Unity', 'Ino', 'Unity', None, 'google/gemini-2.5-flash', 'idle'),
    ('maylinn', 'Heart', 'Maylinn', 'Heart', 'Wind', 'google/gemini-2.5-flash', 'idle'),
]
cursor.executemany(
    "INSERT OR IGNORE INTO agents (id, name, guardian, gate, element, model, status) VALUES (?,?,?,?,?,?,?)",
    guardians
)

# Seed vault layers
vault = [
    ('intellect-stack', 'INTELLECT', 'tech', 'stack', 'Next.js 16 + React 19 + TypeScript + Supabase + Vercel AI SDK 6', 'VAULT_TECH'),
    ('intellect-ai', 'INTELLECT', 'ai', 'gateway', 'Vercel AI Gateway with OIDC auth', 'VAULT_TECH'),
    ('emotion-voice', 'EMOTION', 'voice', 'pillars', 'Arcane+Authoritative, Superintelligent+Accessible, Universe Not Platform, Creator Sovereignty, Antidote Principle', 'Voice Bible v2.0'),
    ('arcana-elements', 'ARCANA', 'cosmology', 'elements', 'Fire, Water, Earth, Wind, Void/Spirit', 'ARCANEA_CANON'),
    ('arcana-gates', 'ARCANA', 'cosmology', 'gates', 'Foundation, Flow, Fire, Heart, Voice, Sight, Crown, Shift, Unity, Source', 'ARCANEA_CANON'),
    ('horizon-vision', 'HORIZON', 'vision', 'premise', 'The antidote to a terrible future is imagining a good one', 'Voice Bible v2.0'),
]
cursor.executemany(
    "INSERT OR IGNORE INTO vault_entries (id, layer, category, key, value, source) VALUES (?,?,?,?,?,?)",
    vault
)

db.commit()
db.close()
print("AgentDB initialized at $DB_PATH")
PYEOF
