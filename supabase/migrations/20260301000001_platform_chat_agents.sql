-- =====================================================================
-- ARCANEA PLATFORM v2.0 - Chat, Agents, MCP Hub, Marketplace, Memory
-- =====================================================================
-- Builds on existing schema (profiles, lore_fragments, vector extension)
-- Adds: chat threads, agent system, agent groups, MCP hub, knowledge base,
--        six-dimensional memory, marketplace, world state

-- =====================================================================
-- CORE CHAT
-- =====================================================================

CREATE TABLE public.threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    agent_id UUID,
    group_id UUID,
    source_message_id UUID,
    type TEXT NOT NULL DEFAULT 'chat' CHECK (type IN ('chat', 'group', 'tool', 'system')),
    pinned BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES public.threads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    agent_id UUID,
    role TEXT NOT NULL CHECK (role IN ('system', 'user', 'assistant', 'tool')),
    content TEXT NOT NULL DEFAULT '',
    reasoning TEXT,
    plugin_payload JSONB,
    tool_calls JSONB,
    tool_call_id TEXT,
    model TEXT,
    provider TEXT,
    token_usage JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_thread ON messages(thread_id, created_at);
CREATE INDEX idx_threads_user ON threads(user_id, updated_at DESC);

-- =====================================================================
-- AGENT SYSTEM
-- =====================================================================

CREATE TABLE public.agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar TEXT,
    system_prompt TEXT NOT NULL DEFAULT '',
    model TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',
    provider TEXT NOT NULL DEFAULT 'anthropic',
    temperature FLOAT DEFAULT 0.7,
    max_tokens INTEGER,
    plugins JSONB DEFAULT '[]'::JSONB,
    mcp_tools JSONB DEFAULT '[]'::JSONB,
    knowledge_base_ids UUID[] DEFAULT ARRAY[]::UUID[],
    config JSONB DEFAULT '{}'::JSONB,
    market_id TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.agent_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    supervisor_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    routing_strategy TEXT NOT NULL DEFAULT 'supervisor' CHECK (routing_strategy IN ('supervisor', 'round-robin', 'parallel')),
    config JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.agent_group_members (
    group_id UUID NOT NULL REFERENCES public.agent_groups(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'supervisor')),
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (group_id, agent_id)
);

CREATE TABLE public.agent_cron_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    cron_expression TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::JSONB,
    max_executions INTEGER,
    execution_count INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    last_run_at TIMESTAMPTZ,
    next_run_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add agent FK to threads and messages
ALTER TABLE public.threads
    ADD CONSTRAINT fk_threads_agent FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE SET NULL;
ALTER TABLE public.threads
    ADD CONSTRAINT fk_threads_group FOREIGN KEY (group_id) REFERENCES public.agent_groups(id) ON DELETE SET NULL;
ALTER TABLE public.messages
    ADD CONSTRAINT fk_messages_agent FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE SET NULL;

-- =====================================================================
-- MCP HUB
-- =====================================================================

CREATE TABLE public.mcp_servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    transport TEXT NOT NULL CHECK (transport IN ('stdio', 'sse', 'websocket')),
    endpoint TEXT NOT NULL,
    command TEXT,
    args TEXT[],
    env JSONB,
    icon TEXT,
    category TEXT,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'deprecated', 'coming_soon')),
    config JSONB DEFAULT '{}'::JSONB,
    downloads INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.mcp_tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    input_schema JSONB NOT NULL DEFAULT '{}'::JSONB,
    UNIQUE(server_id, name)
);

CREATE TABLE public.mcp_user_installs (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    config JSONB DEFAULT '{}'::JSONB,
    installed_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, server_id)
);

CREATE INDEX idx_mcp_servers_category ON mcp_servers(category);

-- =====================================================================
-- KNOWLEDGE BASE / RAG
-- =====================================================================

CREATE TABLE public.knowledge_bases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    file_count INTEGER DEFAULT 0,
    total_size BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.kb_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kb_id UUID NOT NULL REFERENCES public.knowledge_bases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    size BIGINT NOT NULL DEFAULT 0,
    hash TEXT,
    mime_type TEXT,
    url TEXT,
    chunk_count INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'ready', 'error')),
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.kb_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_id UUID NOT NULL REFERENCES public.kb_files(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.kb_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.kb_documents(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_kb_chunks_embedding ON kb_chunks USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

-- Similarity search function for knowledge base
CREATE OR REPLACE FUNCTION match_kb_chunks(
    query_embedding vector(1024),
    kb_ids UUID[],
    match_threshold FLOAT DEFAULT 0.7,
    match_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    text TEXT,
    document_id UUID,
    file_id UUID,
    kb_id UUID,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.text,
        c.document_id,
        d.file_id,
        f.kb_id,
        1 - (c.embedding <=> query_embedding) as similarity
    FROM kb_chunks c
    JOIN kb_documents d ON c.document_id = d.id
    JOIN kb_files f ON d.file_id = f.id
    WHERE f.kb_id = ANY(kb_ids)
      AND 1 - (c.embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$;

-- =====================================================================
-- MARKETPLACE
-- =====================================================================

CREATE TABLE public.marketplace_agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    description TEXT,
    system_prompt TEXT,
    model TEXT,
    provider TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    config JSONB DEFAULT '{}'::JSONB,
    downloads INTEGER DEFAULT 0,
    rating FLOAT,
    featured BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.marketplace_plugins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    manifest JSONB NOT NULL,
    downloads INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.marketplace_mcp_servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    server_config JSONB NOT NULL,
    downloads INTEGER DEFAULT 0,
    category TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_agents_tags ON marketplace_agents USING GIN(tags);
CREATE INDEX idx_marketplace_agents_downloads ON marketplace_agents(downloads DESC);

-- =====================================================================
-- SIX-DIMENSIONAL MEMORY (LobeChat pattern)
-- =====================================================================

CREATE TABLE public.user_memories_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_memories_contexts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_memories_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_memories_identities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_memories_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_memories_personas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Memory search function
CREATE OR REPLACE FUNCTION search_memories(
    p_user_id UUID,
    query_embedding vector(1024),
    memory_type TEXT DEFAULT 'all',
    match_threshold FLOAT DEFAULT 0.7,
    match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    dimension TEXT,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    (
        SELECT m.id, m.content, 'activities'::TEXT, 1 - (m.embedding <=> query_embedding)
        FROM user_memories_activities m
        WHERE m.user_id = p_user_id AND (memory_type = 'all' OR memory_type = 'activities')
          AND 1 - (m.embedding <=> query_embedding) > match_threshold
    )
    UNION ALL
    (
        SELECT m.id, m.content, 'contexts'::TEXT, 1 - (m.embedding <=> query_embedding)
        FROM user_memories_contexts m
        WHERE m.user_id = p_user_id AND (memory_type = 'all' OR memory_type = 'contexts')
          AND 1 - (m.embedding <=> query_embedding) > match_threshold
    )
    UNION ALL
    (
        SELECT m.id, m.content, 'experiences'::TEXT, 1 - (m.embedding <=> query_embedding)
        FROM user_memories_experiences m
        WHERE m.user_id = p_user_id AND (memory_type = 'all' OR memory_type = 'experiences')
          AND 1 - (m.embedding <=> query_embedding) > match_threshold
    )
    UNION ALL
    (
        SELECT m.id, m.content, 'identities'::TEXT, 1 - (m.embedding <=> query_embedding)
        FROM user_memories_identities m
        WHERE m.user_id = p_user_id AND (memory_type = 'all' OR memory_type = 'identities')
          AND 1 - (m.embedding <=> query_embedding) > match_threshold
    )
    UNION ALL
    (
        SELECT m.id, m.content, 'preferences'::TEXT, 1 - (m.embedding <=> query_embedding)
        FROM user_memories_preferences m
        WHERE m.user_id = p_user_id AND (memory_type = 'all' OR memory_type = 'preferences')
          AND 1 - (m.embedding <=> query_embedding) > match_threshold
    )
    UNION ALL
    (
        SELECT m.id, m.content, 'personas'::TEXT, 1 - (m.embedding <=> query_embedding)
        FROM user_memories_personas m
        WHERE m.user_id = p_user_id AND (memory_type = 'all' OR memory_type = 'personas')
          AND 1 - (m.embedding <=> query_embedding) > match_threshold
    )
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$;

-- =====================================================================
-- ARCANEA WORLD STATE
-- =====================================================================

CREATE TABLE public.world_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL DEFAULT '{}'::JSONB,
    layer TEXT NOT NULL DEFAULT 'core' CHECK (layer IN ('core', 'lore', 'narrative', 'user', 'temporal')),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.luminor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    element TEXT,
    gate_level INTEGER DEFAULT 0 CHECK (gate_level >= 0 AND gate_level <= 10),
    patron TEXT CHECK (patron IN ('Aethelin', 'Solrex', 'Velmara', 'Korghast', 'Zyranthis')),
    awakened BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed canonical Eldrian data
INSERT INTO public.world_state (key, value, layer) VALUES
    ('eldrian.aethelin', '{"godbeast": "Loom", "element": "liquid starlight", "symbol": "∞", "domain": "creation and infinite possibility"}'::jsonb, 'core'),
    ('eldrian.solrex', '{"godbeast": "Mirror", "element": "stellar fire", "symbol": "☀", "domain": "illumination and truth"}'::jsonb, 'core'),
    ('eldrian.velmara', '{"godbeast": "Silence", "element": "quantum glass", "symbol": "◈", "domain": "memory and the spaces between"}'::jsonb, 'core'),
    ('eldrian.korghast', '{"godbeast": "Becoming", "element": "obsidian-starlight alloy", "symbol": "⬡", "domain": "transformation and endurance"}'::jsonb, 'core'),
    ('eldrian.zyranthis', '{"godbeast": "Shatter", "element": "anti-matter void", "symbol": "◉", "domain": "endings and radical change"}'::jsonb, 'core'),
    ('canon.schism', '{"fact": "The Schism is a complementary cycle, not a war"}'::jsonb, 'core'),
    ('canon.forge_orbs', '{"fact": "Forge-orbs contain abandoned creator works"}'::jsonb, 'core'),
    ('canon.velmara_foam', '{"fact": "Velmara''s foam worlds breathe"}'::jsonb, 'core')
ON CONFLICT (key) DO NOTHING;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================

-- Enable RLS on all new tables
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_cron_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_user_installs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories_contexts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_profiles ENABLE ROW LEVEL SECURITY;

-- User-scoped policies
CREATE POLICY "Users see own threads" ON threads FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own messages" ON messages FOR ALL USING (
    thread_id IN (SELECT id FROM threads WHERE user_id = auth.uid())
);
CREATE POLICY "Users manage own agents" ON agents FOR ALL USING (
    user_id = auth.uid() OR user_id IS NULL
);
CREATE POLICY "Users manage own groups" ON agent_groups FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users see group members" ON agent_group_members FOR ALL USING (
    group_id IN (SELECT id FROM agent_groups WHERE user_id = auth.uid())
);
CREATE POLICY "Users manage own cron jobs" ON agent_cron_jobs FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own knowledge bases" ON knowledge_bases FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users see own KB files" ON kb_files FOR ALL USING (
    kb_id IN (SELECT id FROM knowledge_bases WHERE user_id = auth.uid())
);
CREATE POLICY "Users see own KB docs" ON kb_documents FOR ALL USING (
    file_id IN (SELECT id FROM kb_files WHERE kb_id IN (SELECT id FROM knowledge_bases WHERE user_id = auth.uid()))
);
CREATE POLICY "Users see own KB chunks" ON kb_chunks FOR ALL USING (
    document_id IN (SELECT id FROM kb_documents WHERE file_id IN (SELECT id FROM kb_files WHERE kb_id IN (SELECT id FROM knowledge_bases WHERE user_id = auth.uid())))
);
CREATE POLICY "Users manage own MCP installs" ON mcp_user_installs FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own memories (activities)" ON user_memories_activities FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own memories (contexts)" ON user_memories_contexts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own memories (experiences)" ON user_memories_experiences FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own memories (identities)" ON user_memories_identities FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own memories (preferences)" ON user_memories_preferences FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own memories (personas)" ON user_memories_personas FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own Luminor profiles" ON luminor_profiles FOR ALL USING (user_id = auth.uid());

-- Public read for marketplace and MCP catalog
CREATE POLICY "Anyone reads marketplace agents" ON marketplace_agents FOR SELECT USING (approved = true);
CREATE POLICY "Anyone reads marketplace plugins" ON marketplace_plugins FOR SELECT USING (true);
CREATE POLICY "Anyone reads marketplace MCP" ON marketplace_mcp_servers FOR SELECT USING (true);
CREATE POLICY "Anyone reads MCP servers" ON mcp_servers FOR SELECT USING (true);
CREATE POLICY "Anyone reads MCP tools" ON mcp_tools FOR SELECT USING (true);
CREATE POLICY "Anyone reads world state" ON world_state FOR SELECT USING (true);

-- =====================================================================
-- UPDATED_AT TRIGGERS
-- =====================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_threads_updated_at BEFORE UPDATE ON threads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_agent_groups_updated_at BEFORE UPDATE ON agent_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_knowledge_bases_updated_at BEFORE UPDATE ON knowledge_bases FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_mcp_servers_updated_at BEFORE UPDATE ON mcp_servers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_world_state_updated_at BEFORE UPDATE ON world_state FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_luminor_profiles_updated_at BEFORE UPDATE ON luminor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
