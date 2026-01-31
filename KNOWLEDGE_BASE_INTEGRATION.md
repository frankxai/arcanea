"""
Arcanea Knowledge Base Integration Guide
========================================

This guide shows how to integrate the new ArcaneaKnowledgeBase (v2) with the
existing InfoGeniusArcaneaBridge for a seamless transition to persistent,
vector-based knowledge storage.

Migration Strategy:
------------------
1. Phase 1: Run both systems in parallel
2. Phase 2: Gradually migrate in-memory data to Supabase
3. Phase 3: Deprecate in-memory storage
4. Phase 4: Full vector-based semantic search

Setup:
------

1. Install dependencies:
   pip install -r requirements-knowledge-base.txt

2. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL from DATABASE_SETUP_SQL (in arcanea-knowledge-base-v2.py)
   - Get your Supabase URL and anon key

3. Set environment variables:
   export SUPABASE_URL="https://your-project.supabase.co"
   export SUPABASE_KEY="your-anon-key"
   export OPENAI_API_KEY="sk-..."

4. Initialize the knowledge base:
   
   from supabase import create_client
   from arcanea_knowledge_base_v2 import ArcaneaKnowledgeBase
   
   supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
   kb = ArcaneaKnowledgeBase(supabase, OPENAI_API_KEY)

Integration Example:
--------------------

# Before (v1 - in-memory only):
from arcanea_infogenius_bridge import InfoGeniusArcaneaBridge

bridge = InfoGeniusArcaneaBridge()
await bridge.initialize()

# Agent learns (stored in memory, lost on exit)
node = await bridge.agent_learn(agent_id, {
    "type": "insight",
    "content": "User prefers morning sessions",
    "tags": ["preference", "schedule"]
})

# Simple text matching search
memories = await bridge.agent_recall(agent_id, "morning preference")

# After (v2 - persistent with vectors):
from arcanea_knowledge_base_v2 import ArcaneaKnowledgeBase

kb = ArcaneaKnowledgeBase(supabase, openai_api_key)

# Agent learns (persisted to Supabase with embeddings)
entry = await kb.store_knowledge(
    agent_id="dragon-forge",
    content="User prefers morning creative sessions",
    metadata={
        "category": "user_preference",
        "tags": ["preference", "schedule", "creativity"],
        "confidence": 0.95
    }
)

# Semantic search (understands meaning, not just keywords)
results = await kb.search_knowledge(
    query="when does user like to work?",
    agent_id="dragon-forge",
    limit=5
)

# Extract patterns automatically
patterns = await kb.extract_patterns(agent_id="dragon-forge")
# Returns:
# [
#   {"type": "temporal", "description": "Peak hours: 9:00, 14:00", "confidence": 0.85},
#   {"type": "topical", "description": "Topic cluster: creativity, workflow", "confidence": 0.78}
# ]

# Share knowledge between agents
await kb.share_knowledge(
    from_agent="dragon-forge",
    to_agents=["crystal-architect", "river-storyteller"],
    knowledge_id=entry.id
)

# Get comprehensive agent stats
stats = await kb.get_agent_stats("dragon-forge")
# Returns:
# {
#   "agent_id": "dragon-forge",
#   "total_memories": 150,
#   "knowledge_categories": {"user_preference": 45, "creative_insight": 67, ...},
#   "shared_memories": 12,
#   "latest_memory": "2025-01-30T09:15:00Z",
#   "activity_span_days": 45
# }

Hybrid Approach (Recommended Migration Path):
---------------------------------------------

For smooth migration, use both systems together:

class ArcaneaKnowledgeHybrid:
    def __init__(self):
        self.bridge = InfoGeniusArcaneaBridge()  # v1 - in-memory
        self.kb = ArcaneaKnowledgeBase(supabase, openai_key)  # v2 - persistent
    
    async def learn(self, agent_id: str, knowledge: dict):
        # Store in both systems
        node = await self.bridge.agent_learn(agent_id, knowledge)  # Fast, local
        
        try:
            entry = await self.kb.store_knowledge(  # Persistent, semantic
                agent_id=agent_id,
                content=knowledge["content"],
                metadata={
                    "category": knowledge.get("type", "insight"),
                    "tags": knowledge.get("tags", []),
                    "confidence": knowledge.get("confidence", 0.8)
                }
            )
        except Exception as e:
            logger.warning(f"Failed to persist to KB: {e}")
            # Continue with in-memory only
        
        return node
    
    async def recall(self, agent_id: str, query: str):
        # Try semantic search first
        try:
            results = await self.kb.search_knowledge(
                query=query,
                agent_id=agent_id,
                limit=5
            )
            if results:
                return results
        except Exception as e:
            logger.warning(f"KB search failed, falling back: {e}")
        
        # Fall back to in-memory search
        return await self.bridge.agent_recall(agent_id, query)

Database Schema:
---------------

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create agent_memories table
CREATE TABLE IF NOT EXISTS agent_memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_id VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_agent_memories_agent_id ON agent_memories(agent_id);
CREATE INDEX idx_agent_memories_user_id ON agent_memories(user_id);
CREATE INDEX idx_agent_memories_created_at ON agent_memories(created_at);

-- Create vector similarity functions
CREATE OR REPLACE FUNCTION match_agent_memories(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    match_count INT,
    agent_filter VARCHAR(255)
)
RETURNS TABLE(id UUID, agent_id VARCHAR, content TEXT, metadata JSONB, 
              created_at TIMESTAMP WITH TIME ZONE, similarity FLOAT)
LANGUAGE SQL STABLE AS $$
    SELECT id, agent_id, content, metadata, created_at,
           1 - (embedding <=> query_embedding) AS similarity
    FROM agent_memories
    WHERE agent_id = agent_filter
      AND 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY embedding <=> query_embedding
    LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION match_memories(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    match_count INT
)
RETURNS TABLE(id UUID, agent_id VARCHAR, content TEXT, metadata JSONB,
              created_at TIMESTAMP WITH TIME ZONE, similarity FLOAT)
LANGUAGE SQL STABLE AS $$
    SELECT id, agent_id, content, metadata, created_at,
           1 - (embedding <=> query_embedding) AS similarity
    FROM agent_memories
    WHERE 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY embedding <=> query_embedding
    LIMIT match_count;
$$;
```

API Reference:
-------------

ArcaneaKnowledgeBase Methods:

1. store_knowledge(agent_id, content, metadata, user_id)
   → Store knowledge with automatic embedding generation
   
2. search_knowledge(query, agent_id, limit, threshold)
   → Semantic search using vector similarity
   
3. extract_patterns(agent_id, min_samples)
   → Extract temporal and topical patterns
   
4. share_knowledge(from_agent, to_agents, knowledge_id)
   → Share knowledge between agents
   
5. get_agent_stats(agent_id)
   → Get comprehensive statistics for an agent
   
6. get_similar_knowledge(knowledge_id, threshold, limit)
   → Find similar knowledge entries
   
7. delete_knowledge(knowledge_id)
   → Remove a knowledge entry
   
8. update_knowledge_metadata(knowledge_id, metadata_updates)
   → Update metadata for an entry

Performance Considerations:
--------------------------

- Embeddings are generated on-the-fly (OpenAI API call)
- Consider batching for high-volume operations
- pgvector uses IVFFlat index by default (good for < 100k vectors)
- For > 100k vectors, consider HNSW index
- Temporal patterns are calculated in Python (could be SQL function)
- DBSCAN clustering is in-memory (limit entries for large datasets)

Production Checklist:
--------------------

☑ Supabase project created and configured
☑ pgvector extension enabled
☑ Database schema applied
☑ Row Level Security policies configured
☑ OpenAI API key with embedding access
☑ Environment variables configured
☑ Error handling tested
☑ Backup strategy implemented
☑ Monitoring/logging configured
☑ Migration plan from v1 documented

Next Steps:
-----------

1. Test with a single agent first
2. Monitor OpenAI API costs (embeddings are cheap but add up)
3. Implement caching layer for frequently accessed knowledge
4. Add knowledge expiration/aging policies
5. Create admin dashboard for knowledge management
6. Implement knowledge conflict resolution
7. Add knowledge versioning for important insights

Questions or Issues?
-------------------

Check the logs for detailed error messages. Common issues:
- Missing pgvector extension: Run the SQL setup
- Invalid OpenAI key: Check API key and billing
- Supabase connection: Verify URL and key
- Vector dimension mismatch: Ensure 1536 dimensions

For 38 agents sharing knowledge across the Arcanean realm,
the Knowledge Base v2 is ready to serve! 🌟
"""
