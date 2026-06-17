-- World Graph MVP (Phase 1)
-- Persistent graph nodes + edges with vector embeddings for semantic lore retrieval.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS public.world_graph_nodes (
    session_id TEXT NOT NULL,
    node_id TEXT NOT NULL,
    node_type TEXT NOT NULL CHECK (node_type IN ('lore', 'character', 'location')),
    name TEXT NOT NULL,
    summary TEXT NOT NULL,
    element TEXT,
    gate INTEGER CHECK (gate IS NULL OR (gate >= 1 AND gate <= 10)),
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    embedding vector(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (session_id, node_id)
);

CREATE TABLE IF NOT EXISTS public.world_graph_edges (
    session_id TEXT NOT NULL,
    edge_id TEXT NOT NULL,
    source_node_id TEXT NOT NULL,
    target_node_id TEXT NOT NULL,
    relationship TEXT NOT NULL,
    strength DOUBLE PRECISION NOT NULL DEFAULT 0.5 CHECK (strength >= 0 AND strength <= 1),
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (session_id, edge_id),
    CONSTRAINT fk_world_graph_edges_source
      FOREIGN KEY (session_id, source_node_id)
      REFERENCES public.world_graph_nodes(session_id, node_id)
      ON DELETE CASCADE,
    CONSTRAINT fk_world_graph_edges_target
      FOREIGN KEY (session_id, target_node_id)
      REFERENCES public.world_graph_nodes(session_id, node_id)
      ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_world_graph_nodes_embedding
    ON public.world_graph_nodes
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);

CREATE INDEX IF NOT EXISTS idx_world_graph_edges_session
    ON public.world_graph_edges (session_id, source_node_id, target_node_id);

CREATE OR REPLACE FUNCTION public.match_world_graph_nodes(
    query_embedding vector(64),
    p_session_id TEXT,
    match_count INTEGER DEFAULT 10,
    match_threshold DOUBLE PRECISION DEFAULT 0.65
)
RETURNS TABLE (
    session_id TEXT,
    node_id TEXT,
    node_type TEXT,
    name TEXT,
    summary TEXT,
    similarity DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        n.session_id,
        n.node_id,
        n.node_type,
        n.name,
        n.summary,
        1 - (n.embedding <=> query_embedding) AS similarity
    FROM public.world_graph_nodes n
    WHERE n.session_id = p_session_id
      AND n.embedding IS NOT NULL
      AND 1 - (n.embedding <=> query_embedding) >= match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$;
