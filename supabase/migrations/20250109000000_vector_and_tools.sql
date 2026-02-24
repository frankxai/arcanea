-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- =====================================================================
-- LORE KNOWLEDGE BASE (THE "BRAIN")
-- =====================================================================

CREATE TABLE public.lore_fragments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Content
    category TEXT NOT NULL CHECK (category IN ('magic_system', 'geography', 'history', 'character', 'creature', 'artifact')),
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- The actual text chunk
    
    -- Vector Embedding (1536 dimensions for text-embedding-ada-002 or Gemini embedding)
    embedding vector(768), -- Gemini Text Embedding 004 is 768 dimensions
    
    -- Metadata
    source_file TEXT, -- e.g., "ARCANEA_UNIVERSE_CANON.md"
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast similarity search
CREATE INDEX idx_lore_embedding ON lore_fragments USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

-- Function to search lore
CREATE OR REPLACE FUNCTION match_lore(
    query_embedding vector(768),
    match_threshold float,
    match_count int
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        lore_fragments.id,
        lore_fragments.content,
        1 - (lore_fragments.embedding <=> query_embedding) as similarity
    FROM lore_fragments
    WHERE 1 - (lore_fragments.embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$;
