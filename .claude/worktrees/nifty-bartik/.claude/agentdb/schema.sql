-- Arcanea AgentDB Schema v1.0
-- Persistent memory for Guardian agents and swarm coordination

CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    guardian TEXT NOT NULL,  -- Which Guardian this agent embodies
    gate TEXT,               -- Which Gate this agent serves
    element TEXT,            -- Fire/Water/Earth/Wind/Void
    model TEXT,              -- AI model used
    status TEXT DEFAULT 'idle',  -- idle/active/completed/failed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id TEXT NOT NULL,
    namespace TEXT DEFAULT 'general',
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    embedding_hash TEXT,     -- For future vector search
    ttl INTEGER,             -- Time to live in seconds
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (agent_id) REFERENCES agents(id)
);

CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    guardian TEXT,            -- Assigned Guardian
    status TEXT DEFAULT 'pending',  -- pending/in_progress/completed/failed
    priority TEXT DEFAULT 'normal', -- low/normal/high/critical
    complexity INTEGER DEFAULT 5,   -- 1-10
    pattern TEXT,            -- Orchestration pattern used
    parent_id TEXT,          -- For subtask hierarchy
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (parent_id) REFERENCES tasks(id)
);

CREATE TABLE IF NOT EXISTS swarm_sessions (
    id TEXT PRIMARY KEY,
    topology TEXT NOT NULL,   -- mesh/hierarchical/star/ring
    strategy TEXT NOT NULL,   -- adaptive/balanced/specialized/parallel
    max_agents INTEGER DEFAULT 7,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

CREATE TABLE IF NOT EXISTS swarm_agents (
    swarm_id TEXT NOT NULL,
    agent_id TEXT NOT NULL,
    role TEXT,               -- coordinator/worker/specialist
    PRIMARY KEY (swarm_id, agent_id),
    FOREIGN KEY (swarm_id) REFERENCES swarm_sessions(id),
    FOREIGN KEY (agent_id) REFERENCES agents(id)
);

CREATE TABLE IF NOT EXISTS routing_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_hash TEXT,
    detected_guardian TEXT NOT NULL,
    confidence REAL DEFAULT 0.0,
    keywords_matched TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vault_entries (
    id TEXT PRIMARY KEY,
    layer TEXT NOT NULL,     -- INTELLECT/EMOTION/ARCANA/HORIZON
    category TEXT,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_memories_agent ON memories(agent_id);
CREATE INDEX IF NOT EXISTS idx_memories_namespace ON memories(namespace);
CREATE INDEX IF NOT EXISTS idx_memories_key ON memories(key);
CREATE INDEX IF NOT EXISTS idx_tasks_guardian ON tasks(guardian);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_routing_guardian ON routing_log(detected_guardian);
CREATE INDEX IF NOT EXISTS idx_vault_layer ON vault_entries(layer);
