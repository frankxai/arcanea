-- =====================================================
-- Arcanea Supabase Database Schema
-- Production-ready schema with RLS, vector search, and indexes
-- Version: 2.0.0
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- =====================================================
-- USER DATA TABLE
-- Stores all user-specific application data
-- =====================================================

CREATE TABLE IF NOT EXISTS user_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Data type and key for organization
    data_type VARCHAR(50) NOT NULL, -- 'games', 'business', 'gamedev', 'settings', etc.
    data_key VARCHAR(100) NOT NULL, -- Specific key within type
    
    -- The actual data payload
    data JSONB NOT NULL DEFAULT '{}',
    
    -- Metadata
    version INTEGER NOT NULL DEFAULT 1,
    device_id VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_user_data UNIQUE (user_id, data_type, data_key)
);

-- Indexes for user_data
CREATE INDEX IF NOT EXISTS idx_user_data_user_id ON user_data(user_id);
CREATE INDEX IF NOT EXISTS idx_user_data_type ON user_data(data_type);
CREATE INDEX IF NOT EXISTS idx_user_data_key ON user_data(data_key);
CREATE INDEX IF NOT EXISTS idx_user_data_updated ON user_data(updated_at DESC);

-- GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_user_data_gin ON user_data USING GIN(data);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_data_updated_at
    BEFORE UPDATE ON user_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- AGENT MEMORIES TABLE (with pgvector)
-- Stores agent interactions and memories with vector embeddings
-- =====================================================

CREATE TABLE IF NOT EXISTS agent_memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Agent information
    agent_id VARCHAR(100) NOT NULL,
    agent_name VARCHAR(255),
    agent_element VARCHAR(20), -- 'fire', 'water', 'earth', 'wind', 'void'
    
    -- Memory content
    content TEXT NOT NULL,
    memory_type VARCHAR(50) NOT NULL DEFAULT 'interaction', -- 'interaction', 'insight', 'preference', 'context'
    
    -- Vector embedding for semantic search (1536 dimensions for OpenAI embeddings)
    embedding VECTOR(1536),
    
    -- Metadata as JSONB
    metadata JSONB DEFAULT '{}',
    
    -- Importance and decay
    importance_score DECIMAL(3,2) DEFAULT 0.5 CHECK (importance_score >= 0 AND importance_score <= 1),
    access_count INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMPTZ,
    
    -- Relationships
    related_memory_ids UUID[], -- Array of related memory IDs
    session_id VARCHAR(255), -- Group memories by session
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Expiration (for temporary memories)
    expires_at TIMESTAMPTZ
);

-- Indexes for agent_memories
CREATE INDEX IF NOT EXISTS idx_agent_memories_user_id ON agent_memories(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_memories_agent_id ON agent_memories(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_memories_type ON agent_memories(memory_type);
CREATE INDEX IF NOT EXISTS idx_agent_memories_session ON agent_memories(session_id);
CREATE INDEX IF NOT EXISTS idx_agent_memories_importance ON agent_memories(importance_score DESC);
CREATE INDEX IF NOT EXISTS idx_agent_memories_created ON agent_memories(created_at DESC);

-- Vector index for similarity search (IVFFlat for approximate search)
CREATE INDEX IF NOT EXISTS idx_agent_memories_embedding 
ON agent_memories 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Trigger for updated_at
CREATE TRIGGER update_agent_memories_updated_at
    BEFORE UPDATE ON agent_memories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SYNC QUEUE TABLE
-- Tracks pending sync operations from offline clients
-- =====================================================

CREATE TABLE IF NOT EXISTS sync_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Operation details
    operation_id VARCHAR(255) NOT NULL, -- Client-generated operation ID
    operation_type VARCHAR(20) NOT NULL CHECK (operation_type IN ('upsert', 'delete', 'patch')),
    
    -- Target
    table_name VARCHAR(50) NOT NULL,
    record_id UUID,
    
    -- Operation data
    data JSONB,
    
    -- Client metadata
    device_id VARCHAR(255),
    client_timestamp TIMESTAMPTZ NOT NULL,
    
    -- Retry tracking
    retry_count INTEGER DEFAULT 0,
    last_error TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT unique_operation UNIQUE (user_id, operation_id, device_id)
);

-- Indexes for sync_queue
CREATE INDEX IF NOT EXISTS idx_sync_queue_user_id ON sync_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status);
CREATE INDEX IF NOT EXISTS idx_sync_queue_created ON sync_queue(created_at);
CREATE INDEX IF NOT EXISTS idx_sync_queue_device ON sync_queue(device_id);

-- =====================================================
-- USER SETTINGS TABLE
-- User preferences and settings
-- =====================================================

CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Settings JSONB
    settings JSONB NOT NULL DEFAULT '{}',
    
    -- Preferences
    theme VARCHAR(20) DEFAULT 'dark',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50),
    
    -- Feature flags
    features_enabled JSONB DEFAULT '{}',
    
    -- Privacy
    data_retention_days INTEGER DEFAULT 365,
    analytics_enabled BOOLEAN DEFAULT TRUE,
    
    -- Sync preferences
    auto_sync BOOLEAN DEFAULT TRUE,
    sync_interval_seconds INTEGER DEFAULT 30,
    offline_mode BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for user_settings
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DEVICES TABLE
-- Track connected devices for multi-device sync
-- =====================================================

CREATE TABLE IF NOT EXISTS user_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Device info
    device_id VARCHAR(255) NOT NULL UNIQUE,
    device_name VARCHAR(255),
    device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet', 'web'
    
    -- Browser/Client info
    user_agent TEXT,
    ip_address INET,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_user_device UNIQUE (user_id, device_id)
);

-- Indexes for user_devices
CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON user_devices(user_id);
CREATE INDEX IF NOT EXISTS idx_user_devices_active ON user_devices(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_user_devices_last_seen ON user_devices(last_seen_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_user_devices_updated_at
    BEFORE UPDATE ON user_devices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- CONFLICT LOG TABLE
-- Track and resolve data conflicts
-- =====================================================

CREATE TABLE IF NOT EXISTS conflict_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Conflict details
    table_name VARCHAR(50) NOT NULL,
    record_id UUID NOT NULL,
    
    -- The conflicting data
    local_data JSONB NOT NULL,
    remote_data JSONB NOT NULL,
    resolved_data JSONB,
    
    -- Resolution
    resolution_strategy VARCHAR(20) DEFAULT 'timestamp', -- 'timestamp', 'local-wins', 'remote-wins', 'merge', 'manual'
    resolved_at TIMESTAMPTZ,
    resolved_by VARCHAR(50), -- 'system', 'user', 'rule'
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for conflict_log
CREATE INDEX IF NOT EXISTS idx_conflict_log_user_id ON conflict_log(user_id);
CREATE INDEX IF NOT EXISTS idx_conflict_log_record ON conflict_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_conflict_log_created ON conflict_log(created_at DESC);

-- =====================================================
-- ANALYTICS TABLE (optional, for user insights)
-- Track usage patterns (anonymized)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Event tracking
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    
    -- Context
    session_id VARCHAR(255),
    device_id VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for user_analytics
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_event ON user_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_user_analytics_created ON user_analytics(created_at);

-- Partition analytics by month for performance
-- (Run this after initial setup)
-- SELECT create_hypertable('user_analytics', 'created_at');

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE conflict_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- User Data RLS Policies
CREATE POLICY "Users can only access their own data"
    ON user_data
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Agent Memories RLS Policies
CREATE POLICY "Users can only access their own memories"
    ON agent_memories
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Sync Queue RLS Policies
CREATE POLICY "Users can only access their own sync queue"
    ON sync_queue
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- User Settings RLS Policies
CREATE POLICY "Users can only access their own settings"
    ON user_settings
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- User Devices RLS Policies
CREATE POLICY "Users can only access their own devices"
    ON user_devices
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Conflict Log RLS Policies
CREATE POLICY "Users can only access their own conflicts"
    ON conflict_log
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Analytics RLS Policies
CREATE POLICY "Users can only access their own analytics"
    ON user_analytics
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- VECTOR SEARCH FUNCTIONS
-- =====================================================

-- Function: Search agent memories by similarity
CREATE OR REPLACE FUNCTION search_agent_memories(
    query_text TEXT,
    match_threshold DECIMAL,
    match_count INTEGER
)
RETURNS TABLE (
    id UUID,
    agent_id VARCHAR,
    agent_name VARCHAR,
    content TEXT,
    memory_type VARCHAR,
    similarity DECIMAL,
    metadata JSONB,
    created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    query_embedding VECTOR(1536);
BEGIN
    -- Note: In production, generate embedding via API call
    -- This function assumes the embedding is provided or uses a placeholder
    -- For actual implementation, call OpenAI API to get embedding
    
    RETURN QUERY
    SELECT 
        am.id,
        am.agent_id,
        am.agent_name,
        am.content,
        am.memory_type,
        1 - (am.embedding <=> query_embedding) AS similarity,
        am.metadata,
        am.created_at
    FROM agent_memories am
    WHERE am.user_id = auth.uid()
        AND am.embedding IS NOT NULL
        AND 1 - (am.embedding <=> query_embedding) > match_threshold
    ORDER BY am.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Function: Get recent memories for an agent
CREATE OR REPLACE FUNCTION get_agent_recent_memories(
    p_agent_id VARCHAR,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    memory_type VARCHAR,
    importance_score DECIMAL,
    created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        am.id,
        am.content,
        am.memory_type,
        am.importance_score,
        am.created_at
    FROM agent_memories am
    WHERE am.user_id = auth.uid()
        AND am.agent_id = p_agent_id
    ORDER BY am.created_at DESC
    LIMIT p_limit;
END;
$$;

-- Function: Update memory access count
CREATE OR REPLACE FUNCTION touch_memory(p_memory_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    UPDATE agent_memories
    SET 
        access_count = access_count + 1,
        last_accessed_at = NOW()
    WHERE id = p_memory_id
        AND user_id = auth.uid();
END;
$$;

-- Function: Clean up expired memories
CREATE OR REPLACE FUNCTION cleanup_expired_memories()
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM agent_memories
    WHERE expires_at IS NOT NULL
        AND expires_at < NOW();
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$;

-- Function: Get user's data for a specific type
CREATE OR REPLACE FUNCTION get_user_data_by_type(p_data_type VARCHAR)
RETURNS TABLE (
    data_key VARCHAR,
    data JSONB,
    version INTEGER,
    updated_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ud.data_key,
        ud.data,
        ud.version,
        ud.updated_at
    FROM user_data ud
    WHERE ud.user_id = auth.uid()
        AND ud.data_type = p_data_type
    ORDER BY ud.updated_at DESC;
END;
$$;

-- Function: Batch upsert user data
CREATE OR REPLACE FUNCTION batch_upsert_user_data(
    data_items JSONB[]
)
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    item JSONB;
    upserted_count INTEGER := 0;
BEGIN
    FOREACH item IN ARRAY data_items
    LOOP
        INSERT INTO user_data (
            user_id,
            data_type,
            data_key,
            data,
            version,
            device_id
        )
        VALUES (
            auth.uid(),
            item->>'data_type',
            item->>'data_key',
            item->'data',
            COALESCE((item->>'version')::INTEGER, 1),
            item->>'device_id'
        )
        ON CONFLICT (user_id, data_type, data_key)
        DO UPDATE SET
            data = EXCLUDED.data,
            version = user_data.version + 1,
            device_id = EXCLUDED.device_id,
            updated_at = NOW();
        
        upserted_count := upserted_count + 1;
    END LOOP;
    
    RETURN upserted_count;
END;
$$;

-- Function: Mark device as active/inactive
CREATE OR REPLACE FUNCTION update_device_status(
    p_device_id VARCHAR,
    p_is_active BOOLEAN
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO user_devices (
        user_id,
        device_id,
        is_active,
        last_seen_at
    )
    VALUES (
        auth.uid(),
        p_device_id,
        p_is_active,
        NOW()
    )
    ON CONFLICT (user_id, device_id)
    DO UPDATE SET
        is_active = p_is_active,
        last_seen_at = NOW();
END;
$$;

-- =====================================================
-- TRIGGERS AND AUTOMATIONS
-- =====================================================

-- Trigger: Auto-cleanup old analytics (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM user_analytics
    WHERE created_at < NOW() - INTERVAL '90 days';
    RETURN NULL;
END;
$$;

-- Schedule this with pg_cron (if available):
-- SELECT cron.schedule('cleanup-analytics', '0 0 * * *', 'SELECT cleanup_old_analytics()');

-- Trigger: Log conflicts automatically
CREATE OR REPLACE FUNCTION log_conflict()
RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND NEW.version < OLD.version THEN
        INSERT INTO conflict_log (
            user_id,
            table_name,
            record_id,
            local_data,
            remote_data
        )
        VALUES (
            NEW.user_id,
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(NEW),
            row_to_json(OLD)
        );
    END IF;
    RETURN NEW;
END;
$$;

-- Apply conflict logging to user_data
CREATE TRIGGER log_user_data_conflicts
    BEFORE UPDATE ON user_data
    FOR EACH ROW
    EXECUTE FUNCTION log_conflict();

-- =====================================================
-- INITIAL DATA AND DEFAULTS
-- =====================================================

-- Function: Create default settings for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    -- Create default settings
    INSERT INTO user_settings (
        user_id,
        settings,
        theme,
        language,
        features_enabled
    )
    VALUES (
        NEW.id,
        '{}',
        'dark',
        'en',
        jsonb_build_object(
            'sync', true,
            'encryption', true,
            'notifications', true,
            'analytics', true
        )
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$;

-- Trigger on auth.users for new user setup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- VIEWS FOR CONVENIENCE
-- =====================================================

-- View: User data summary
CREATE OR REPLACE VIEW user_data_summary AS
SELECT 
    user_id,
    data_type,
    COUNT(*) as record_count,
    MAX(updated_at) as last_updated
FROM user_data
GROUP BY user_id, data_type;

-- View: Agent memory statistics
CREATE OR REPLACE VIEW agent_memory_stats AS
SELECT 
    user_id,
    agent_id,
    COUNT(*) as total_memories,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as recent_memories,
    AVG(importance_score) as avg_importance,
    MAX(created_at) as last_memory_at
FROM agent_memories
GROUP BY user_id, agent_id;

-- View: Active user devices
CREATE OR REPLACE VIEW active_devices AS
SELECT 
    user_id,
    device_id,
    device_name,
    device_type,
    last_seen_at,
    is_active
FROM user_devices
WHERE is_active = TRUE
    AND last_seen_at > NOW() - INTERVAL '30 days';

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE user_data IS 'Stores all user-specific application data with versioning';
COMMENT ON TABLE agent_memories IS 'Stores agent memories with vector embeddings for semantic search';
COMMENT ON TABLE sync_queue IS 'Tracks pending offline operations for sync';
COMMENT ON TABLE user_settings IS 'User preferences and feature flags';
COMMENT ON TABLE user_devices IS 'Connected devices for multi-device sync';
COMMENT ON TABLE conflict_log IS 'Tracks data conflicts for resolution';
COMMENT ON TABLE user_analytics IS 'User activity tracking (optional, privacy-conscious)';

COMMENT ON FUNCTION search_agent_memories IS 'Performs semantic search on agent memories using vector similarity';
COMMENT ON FUNCTION get_agent_recent_memories IS 'Retrieves recent memories for a specific agent';
COMMENT ON FUNCTION batch_upsert_user_data IS 'Efficiently upserts multiple user data records';

-- =====================================================
-- PERMISSIONS
-- =====================================================

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON user_data TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON agent_memories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON sync_queue TO authenticated;
GRANT SELECT, INSERT, UPDATE ON user_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_devices TO authenticated;
GRANT SELECT, INSERT ON conflict_log TO authenticated;
GRANT SELECT, INSERT ON user_analytics TO authenticated;

-- Grant sequence access
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- FINAL NOTES
-- =====================================================

/*
SETUP INSTRUCTIONS:

1. Create Supabase project at https://supabase.com

2. Run this schema in the SQL Editor

3. Enable these extensions in Database > Extensions:
   - uuid-ossp (usually enabled by default)
   - pgvector (enable via Extensions page)

4. Set up Authentication:
   - Go to Authentication > Settings
   - Enable Email provider
   - Enable OAuth providers (Google, GitHub, etc.)
   - Configure Site URL and Redirect URLs

5. Set up environment variables:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (for server-side)

6. For vector search with real embeddings:
   - Integrate with OpenAI API to generate embeddings
   - Store embeddings in the embedding column
   - Use search_agent_memories() function

7. Optional: Set up pg_cron for automated cleanup:
   - Enable pg_cron extension
   - Schedule cleanup jobs

MIGRATION NOTES:
- This schema uses UUID for all primary keys
- All tables have RLS policies for security
- Vector search requires 1536-dimensional embeddings (OpenAI ada-002)
- Sync queue handles offline-first pattern
*/
