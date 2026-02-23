-- =====================================================================
-- ARCANEA PROMPT BOOKS SCHEMA
-- =====================================================================
-- Version: 1.0.0
-- Date: 2026-02-23
-- Purpose: Cross-device AI prompt management with context engineering
-- =====================================================================

-- =====================================================================
-- COLLECTIONS (Notebooks / Folders)
-- =====================================================================

CREATE TABLE public.pb_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,

    guardian_id TEXT CHECK (guardian_id IN (
        'lyssandria', 'leyla', 'draconia', 'maylinn', 'alera',
        'lyria', 'aiyami', 'elara', 'ino', 'shinkami'
    )),
    element TEXT CHECK (element IN ('fire', 'water', 'earth', 'wind', 'void')),

    parent_id UUID REFERENCES pb_collections(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,

    visibility TEXT NOT NULL DEFAULT 'private'
        CHECK (visibility IN ('private', 'shared', 'public')),
    share_token TEXT UNIQUE,

    prompt_count INTEGER NOT NULL DEFAULT 0,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- PROMPTS
-- =====================================================================

CREATE TABLE public.pb_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES pb_collections(id) ON DELETE SET NULL,

    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    negative_content TEXT,
    system_prompt TEXT,

    prompt_type TEXT NOT NULL DEFAULT 'general'
        CHECK (prompt_type IN (
            'general', 'txt2img', 'img2img', 'chat', 'chain',
            'few_shot', 'code', 'writing', 'analysis'
        )),

    is_template BOOLEAN NOT NULL DEFAULT FALSE,
    template_variables JSONB NOT NULL DEFAULT '[]'::JSONB,

    context_config JSONB NOT NULL DEFAULT '{}'::JSONB,
    few_shot_examples JSONB NOT NULL DEFAULT '[]'::JSONB,
    chain_steps JSONB NOT NULL DEFAULT '[]'::JSONB,

    sort_order INTEGER NOT NULL DEFAULT 0,
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,

    use_count INTEGER NOT NULL DEFAULT 0,
    last_used_at TIMESTAMPTZ,

    version INTEGER NOT NULL DEFAULT 1,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- TAGS
-- =====================================================================

CREATE TABLE public.pb_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    category TEXT,
    color TEXT,
    icon TEXT,

    inject_text TEXT,
    inject_position TEXT NOT NULL DEFAULT 'append'
        CHECK (inject_position IN ('append', 'prepend', 'replace')),
    weight_modifier NUMERIC(5,3),

    is_global BOOLEAN NOT NULL DEFAULT FALSE,
    collection_id UUID REFERENCES pb_collections(id) ON DELETE SET NULL,

    sort_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_user_tag_per_scope UNIQUE (user_id, name, collection_id)
);

-- =====================================================================
-- PROMPT-TAG JUNCTION
-- =====================================================================

CREATE TABLE public.pb_prompt_tags (
    prompt_id UUID NOT NULL REFERENCES pb_prompts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES pb_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (prompt_id, tag_id)
);

-- =====================================================================
-- VERSION HISTORY
-- =====================================================================

CREATE TABLE public.pb_prompt_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt_id UUID NOT NULL REFERENCES pb_prompts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    version INTEGER NOT NULL,
    content TEXT NOT NULL,
    negative_content TEXT,
    system_prompt TEXT,

    change_summary TEXT,
    diff_data JSONB,

    context_config JSONB NOT NULL DEFAULT '{}'::JSONB,
    few_shot_examples JSONB NOT NULL DEFAULT '[]'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_prompt_version UNIQUE (prompt_id, version)
);

-- =====================================================================
-- TEMPLATES
-- =====================================================================

CREATE TABLE public.pb_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    negative_content TEXT,
    system_prompt TEXT,
    prompt_type TEXT NOT NULL DEFAULT 'general',

    variables JSONB NOT NULL DEFAULT '[]'::JSONB,
    context_config JSONB NOT NULL DEFAULT '{}'::JSONB,
    few_shot_examples JSONB NOT NULL DEFAULT '[]'::JSONB,
    chain_steps JSONB NOT NULL DEFAULT '[]'::JSONB,

    guardian_id TEXT,
    element TEXT,

    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    use_count INTEGER NOT NULL DEFAULT 0,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- INDEXES
-- =====================================================================

CREATE INDEX idx_pb_collections_user_id ON pb_collections(user_id);
CREATE INDEX idx_pb_collections_parent_id ON pb_collections(parent_id);
CREATE INDEX idx_pb_collections_user_sort ON pb_collections(user_id, sort_order);

CREATE INDEX idx_pb_prompts_user_id ON pb_prompts(user_id);
CREATE INDEX idx_pb_prompts_collection_id ON pb_prompts(collection_id);
CREATE INDEX idx_pb_prompts_type ON pb_prompts(prompt_type);
CREATE INDEX idx_pb_prompts_user_favorite ON pb_prompts(user_id) WHERE is_favorite = TRUE;
CREATE INDEX idx_pb_prompts_user_pinned ON pb_prompts(user_id) WHERE is_pinned = TRUE;
CREATE INDEX idx_pb_prompts_last_used ON pb_prompts(user_id, last_used_at DESC NULLS LAST);
CREATE INDEX idx_pb_prompts_fts ON pb_prompts
    USING GIN(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(content, '')));

CREATE INDEX idx_pb_tags_user_id ON pb_tags(user_id);
CREATE INDEX idx_pb_tags_user_global ON pb_tags(user_id) WHERE is_global = TRUE;
CREATE INDEX idx_pb_tags_collection_id ON pb_tags(collection_id);

CREATE INDEX idx_pb_versions_prompt_id ON pb_prompt_versions(prompt_id, version DESC);

CREATE INDEX idx_pb_templates_category ON pb_templates(category);
CREATE INDEX idx_pb_templates_public ON pb_templates(id) WHERE is_public = TRUE;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================

ALTER TABLE pb_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE pb_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pb_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE pb_prompt_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE pb_prompt_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pb_templates ENABLE ROW LEVEL SECURITY;

-- Collections
CREATE POLICY "Users can view own collections"
    ON pb_collections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public collections are viewable"
    ON pb_collections FOR SELECT USING (visibility = 'public');
CREATE POLICY "Users can create own collections"
    ON pb_collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own collections"
    ON pb_collections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own collections"
    ON pb_collections FOR DELETE USING (auth.uid() = user_id);

-- Prompts
CREATE POLICY "Users can view own prompts"
    ON pb_prompts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public prompts via collection"
    ON pb_prompts FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pb_collections
            WHERE id = pb_prompts.collection_id AND visibility = 'public'
        )
    );
CREATE POLICY "Users can create own prompts"
    ON pb_prompts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prompts"
    ON pb_prompts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own prompts"
    ON pb_prompts FOR DELETE USING (auth.uid() = user_id);

-- Tags
CREATE POLICY "Users manage own tags"
    ON pb_tags FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Prompt-Tags
CREATE POLICY "Users can view own prompt tags"
    ON pb_prompt_tags FOR SELECT USING (
        EXISTS (SELECT 1 FROM pb_prompts WHERE id = prompt_id AND user_id = auth.uid())
    );
CREATE POLICY "Users can assign own prompt tags"
    ON pb_prompt_tags FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM pb_prompts WHERE id = prompt_id AND user_id = auth.uid())
    );
CREATE POLICY "Users can remove own prompt tags"
    ON pb_prompt_tags FOR DELETE USING (
        EXISTS (SELECT 1 FROM pb_prompts WHERE id = prompt_id AND user_id = auth.uid())
    );

-- Versions
CREATE POLICY "Users manage own versions"
    ON pb_prompt_versions FOR ALL
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Templates
CREATE POLICY "Users can view public and own templates"
    ON pb_templates FOR SELECT USING (is_public = TRUE OR user_id = auth.uid());
CREATE POLICY "Users can create own templates"
    ON pb_templates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own templates"
    ON pb_templates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own templates"
    ON pb_templates FOR DELETE USING (auth.uid() = user_id);

-- =====================================================================
-- TRIGGERS
-- =====================================================================

CREATE TRIGGER pb_collections_updated_at BEFORE UPDATE ON pb_collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER pb_prompts_updated_at BEFORE UPDATE ON pb_prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER pb_tags_updated_at BEFORE UPDATE ON pb_tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER pb_templates_updated_at BEFORE UPDATE ON pb_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-version on content change
CREATE OR REPLACE FUNCTION pb_auto_version()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.content IS DISTINCT FROM NEW.content
       OR OLD.negative_content IS DISTINCT FROM NEW.negative_content
       OR OLD.system_prompt IS DISTINCT FROM NEW.system_prompt
    THEN
        NEW.version := OLD.version + 1;
        INSERT INTO pb_prompt_versions (
            prompt_id, user_id, version,
            content, negative_content, system_prompt,
            context_config, few_shot_examples
        ) VALUES (
            NEW.id, NEW.user_id, OLD.version,
            OLD.content, OLD.negative_content, OLD.system_prompt,
            OLD.context_config, OLD.few_shot_examples
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pb_prompts_auto_version
    BEFORE UPDATE ON pb_prompts
    FOR EACH ROW EXECUTE FUNCTION pb_auto_version();

-- Auto-update collection prompt count
CREATE OR REPLACE FUNCTION pb_update_collection_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.collection_id IS NOT NULL THEN
        UPDATE pb_collections SET prompt_count = prompt_count + 1
            WHERE id = NEW.collection_id;
    ELSIF TG_OP = 'DELETE' AND OLD.collection_id IS NOT NULL THEN
        UPDATE pb_collections SET prompt_count = prompt_count - 1
            WHERE id = OLD.collection_id;
    ELSIF TG_OP = 'UPDATE'
          AND OLD.collection_id IS DISTINCT FROM NEW.collection_id THEN
        IF OLD.collection_id IS NOT NULL THEN
            UPDATE pb_collections SET prompt_count = prompt_count - 1
                WHERE id = OLD.collection_id;
        END IF;
        IF NEW.collection_id IS NOT NULL THEN
            UPDATE pb_collections SET prompt_count = prompt_count + 1
                WHERE id = NEW.collection_id;
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pb_prompts_count_trigger
    AFTER INSERT OR UPDATE OR DELETE ON pb_prompts
    FOR EACH ROW EXECUTE FUNCTION pb_update_collection_count();

-- =====================================================================
-- FULL-TEXT SEARCH FUNCTION
-- =====================================================================

CREATE OR REPLACE FUNCTION pb_search_prompts(
    p_user_id UUID,
    p_query TEXT,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    content TEXT,
    prompt_type TEXT,
    collection_id UUID,
    is_favorite BOOLEAN,
    use_count INTEGER,
    updated_at TIMESTAMPTZ,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id, p.title, p.content, p.prompt_type,
        p.collection_id, p.is_favorite, p.use_count,
        p.updated_at,
        ts_rank(
            to_tsvector('english', COALESCE(p.title, '') || ' ' || COALESCE(p.content, '')),
            plainto_tsquery('english', p_query)
        ) AS rank
    FROM pb_prompts p
    WHERE p.user_id = p_user_id
        AND p.is_archived = FALSE
        AND (
            to_tsvector('english', COALESCE(p.title, '') || ' ' || COALESCE(p.content, ''))
            @@ plainto_tsquery('english', p_query)
            OR p.title ILIKE '%' || p_query || '%'
        )
    ORDER BY rank DESC, p.updated_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- ENABLE REALTIME
-- =====================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE pb_collections;
ALTER PUBLICATION supabase_realtime ADD TABLE pb_prompts;
ALTER PUBLICATION supabase_realtime ADD TABLE pb_tags;
ALTER PUBLICATION supabase_realtime ADD TABLE pb_prompt_tags;
