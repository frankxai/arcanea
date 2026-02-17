# Arcanea Knowledge Base v2
# Production-ready knowledge management with vector embeddings and semantic search
# Version: 2.0.0

"""
Arcanea Knowledge Base v2

A production-ready knowledge management system for Arcanea's 38 AI agents.
Features vector embeddings, semantic search, pattern recognition, and knowledge sharing.

Dependencies:
    - supabase-py: Supabase client for persistence
    - openai: For text-embedding-3-small embeddings
    - scikit-learn: For DBSCAN clustering (pattern recognition)
    - numpy: For vector operations

Database Schema (Supabase with pgvector):
    Table: agent_memories
    - id: uuid (primary key)
    - user_id: uuid (references auth.users)
    - agent_id: varchar
    - content: text
    - embedding: vector(1536)
    - metadata: jsonb
    - created_at: timestamp

SQL Functions Required:
    - match_agent_memories(query_embedding, threshold, count, agent_id)
    - match_memories(query_embedding, threshold, count)
"""

import json
import asyncio
import uuid
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum
import logging

import numpy as np
from sklearn.cluster import DBSCAN
from supabase import Client as SupabaseClient
from openai import AsyncOpenAI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class KnowledgeCategory(Enum):
    """Categories of knowledge Arcanea agents can store"""
    USER_PREFERENCE = "user_preference"
    WORKFLOW_PATTERN = "workflow_pattern"
    CREATIVE_INSIGHT = "creative_insight"
    TECHNICAL_KNOWLEDGE = "technical_knowledge"
    BEHAVIORAL_PATTERN = "behavioral_pattern"
    CONTEXTUAL_DATA = "contextual_data"
    LEARNED_RULE = "learned_rule"


@dataclass
class KnowledgeEntry:
    """
    Represents a single knowledge entry with vector embedding.
    
    Attributes:
        id: Unique identifier (UUID)
        agent_id: Agent that owns/created this knowledge
        content: The actual knowledge content (text)
        embedding: Vector embedding (1536 dimensions for text-embedding-3-small)
        metadata: Arbitrary metadata (category, confidence, tags, etc.)
        timestamp: ISO format timestamp
    """
    id: str
    agent_id: str
    content: str
    embedding: List[float]
    metadata: Dict[str, Any]
    timestamp: str
    
    def __post_init__(self):
        """Validate embedding dimensions"""
        if len(self.embedding) != 1536:
            logger.warning(f"Embedding has {len(self.embedding)} dimensions, expected 1536")


@dataclass
class Pattern:
    """
    Represents a recognized pattern from knowledge analysis.
    
    Attributes:
        type: Pattern type (temporal, topical, behavioral)
        description: Human-readable description
        confidence: Confidence score (0.0 to 1.0)
        data: Supporting data (cluster info, time ranges, etc.)
    """
    type: str
    description: str
    confidence: float
    data: Dict[str, Any]


class ArcaneaKnowledgeBase:
    """
    Production-ready knowledge management system for Arcanea agents.
    
    Features:
    - Persistent storage via Supabase with pgvector
    - OpenAI embeddings for semantic search
    - Vector similarity search
    - Pattern extraction (temporal and topical)
    - Knowledge sharing between agents
    - Async/await throughout
    
    Example:
        >>> kb = ArcaneaKnowledgeBase(supabase_client, openai_api_key)
        >>> entry = await kb.store_knowledge(
        ...     agent_id="dragon-forge",
        ...     content="User prefers morning creative sessions",
        ...     metadata={"category": "user_preference", "confidence": 0.9}
        ... )
        >>> results = await kb.search_knowledge(
        ...     query="when does user work best?",
        ...     agent_id="dragon-forge"
        ... )
    """
    
    def __init__(
        self, 
        supabase_client: SupabaseClient, 
        openai_api_key: str,
        embedding_model: str = "text-embedding-3-small",
        embedding_dimensions: int = 1536
    ):
        """
        Initialize the knowledge base.
        
        Args:
            supabase_client: Initialized Supabase client
            openai_api_key: OpenAI API key for embeddings
            embedding_model: OpenAI embedding model to use
            embedding_dimensions: Expected embedding dimensions
        """
        self.supabase = supabase_client
        self.openai = AsyncOpenAI(api_key=openai_api_key)
        self.embedding_model = embedding_model
        self.embedding_dimensions = embedding_dimensions
        
        logger.info("🔮 Arcanea Knowledge Base initialized")
    
    async def _generate_embedding(self, text: str) -> List[float]:
        """
        Generate vector embedding for text using OpenAI.
        
        Args:
            text: Text to embed
            
        Returns:
            List of floats (embedding vector)
            
        Raises:
            Exception: If OpenAI API call fails
        """
        try:
            response = await self.openai.embeddings.create(
                model=self.embedding_model,
                input=text,
                dimensions=self.embedding_dimensions
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Failed to generate embedding: {e}")
            raise
    
    async def store_knowledge(
        self, 
        agent_id: str, 
        content: str, 
        metadata: Optional[Dict[str, Any]] = None,
        user_id: Optional[str] = None
    ) -> KnowledgeEntry:
        """
        Store new knowledge with vector embedding.
        
        Args:
            agent_id: Agent identifier (e.g., "dragon-forge")
            content: Knowledge content text
            metadata: Optional metadata dict
            user_id: Optional user identifier for multi-tenant support
            
        Returns:
            KnowledgeEntry with generated embedding and ID
            
        Raises:
            Exception: If database insert fails
        """
        try:
            # Generate embedding
            embedding = await self._generate_embedding(content)
            
            # Create entry
            entry = KnowledgeEntry(
                id=str(uuid.uuid4()),
                agent_id=agent_id,
                content=content,
                embedding=embedding,
                metadata=metadata or {},
                timestamp=datetime.now().isoformat()
            )
            
            # Store in Supabase
            data = {
                "id": entry.id,
                "user_id": user_id,
                "agent_id": entry.agent_id,
                "content": entry.content,
                "embedding": embedding,
                "metadata": entry.metadata,
                "created_at": entry.timestamp
            }
            
            result = self.supabase.table("agent_memories").insert(data).execute()
            
            if result.data:
                logger.info(f"✓ Knowledge stored: {entry.id[:8]}... for agent {agent_id}")
                return entry
            else:
                raise Exception("Failed to insert knowledge")
                
        except Exception as e:
            logger.error(f"Failed to store knowledge: {e}")
            raise
    
    async def search_knowledge(
        self, 
        query: str, 
        agent_id: Optional[str] = None,
        limit: int = 5,
        threshold: float = 0.7
    ) -> List[Dict[str, Any]]:
        """
        Search knowledge using semantic similarity.
        
        Uses pgvector for efficient vector similarity search.
        
        Args:
            query: Search query text
            agent_id: Optional agent filter
            limit: Maximum results to return
            threshold: Similarity threshold (0.0 to 1.0)
            
        Returns:
            List of matching knowledge entries with similarity scores
            
        Raises:
            Exception: If search fails
        """
        try:
            # Generate query embedding
            query_embedding = await self._generate_embedding(query)
            
            # Call appropriate Supabase function
            if agent_id:
                result = self.supabase.rpc(
                    "match_agent_memories",
                    {
                        "query_embedding": query_embedding,
                        "match_threshold": threshold,
                        "match_count": limit,
                        "agent_filter": agent_id
                    }
                ).execute()
            else:
                result = self.supabase.rpc(
                    "match_memories",
                    {
                        "query_embedding": query_embedding,
                        "match_threshold": threshold,
                        "match_count": limit
                    }
                ).execute()
            
            if result.data:
                logger.info(f"✓ Found {len(result.data)} matches for query")
                return result.data
            else:
                return []
                
        except Exception as e:
            logger.error(f"Failed to search knowledge: {e}")
            raise
    
    async def extract_patterns(
        self, 
        agent_id: Optional[str] = None,
        min_samples: int = 3
    ) -> List[Pattern]:
        """
        Extract patterns from knowledge using temporal and topical analysis.
        
        Performs two types of pattern recognition:
        1. Temporal patterns: Analyze creation timestamps for activity patterns
        2. Topical patterns: Use DBSCAN clustering on embeddings to find topic groups
        
        Args:
            agent_id: Optional agent to analyze (None for all agents)
            min_samples: Minimum samples for DBSCAN clustering
            
        Returns:
            List of recognized Pattern objects
        """
        patterns = []
        
        try:
            # Fetch knowledge entries
            if agent_id:
                result = self.supabase.table("agent_memories")\
                    .select("*")\
                    .eq("agent_id", agent_id)\
                    .execute()
            else:
                result = self.supabase.table("agent_memories")\
                    .select("*")\
                    .execute()
            
            if not result.data or len(result.data) < min_samples:
                logger.info("Insufficient data for pattern extraction")
                return patterns
            
            entries = result.data
            
            # Temporal pattern extraction
            temporal_patterns = await self._extract_temporal_patterns(entries)
            patterns.extend(temporal_patterns)
            
            # Topical pattern extraction (clustering)
            topical_patterns = await self._extract_topical_patterns(entries, min_samples)
            patterns.extend(topical_patterns)
            
            logger.info(f"✓ Extracted {len(patterns)} patterns")
            return patterns
            
        except Exception as e:
            logger.error(f"Failed to extract patterns: {e}")
            return []
    
    async def _extract_temporal_patterns(
        self, 
        entries: List[Dict[str, Any]]
    ) -> List[Pattern]:
        """
        Extract temporal patterns from knowledge timestamps.
        
        Analyzes creation times to find:
        - Peak activity hours
        - Common time ranges
        - Activity patterns by day/hour
        
        Args:
            entries: Knowledge entries with created_at timestamps
            
        Returns:
            List of temporal Pattern objects
        """
        patterns = []
        
        try:
            # Parse timestamps and extract hours
            hours = []
            for entry in entries:
                try:
                    ts = datetime.fromisoformat(entry["created_at"].replace("Z", "+00:00"))
                    hours.append(ts.hour)
                except:
                    continue
            
            if not hours:
                return patterns
            
            # Find peak hours (hours with most activity)
            from collections import Counter
            hour_counts = Counter(hours)
            peak_hours = [h for h, c in hour_counts.most_common(3)]
            
            if peak_hours:
                pattern = Pattern(
                    type="temporal",
                    description=f"Peak activity hours: {', '.join([f'{h}:00' for h in sorted(peak_hours)])}",
                    confidence=min(0.5 + (len(hours) / 100), 0.95),
                    data={
                        "peak_hours": peak_hours,
                        "total_entries": len(hours),
                        "hour_distribution": dict(hour_counts)
                    }
                )
                patterns.append(pattern)
            
            return patterns
            
        except Exception as e:
            logger.error(f"Temporal pattern extraction failed: {e}")
            return []
    
    async def _extract_topical_patterns(
        self, 
        entries: List[Dict[str, Any]],
        min_samples: int = 3
    ) -> List[Pattern]:
        """
        Extract topical patterns using DBSCAN clustering on embeddings.
        
        Groups similar knowledge entries into topic clusters.
        
        Args:
            entries: Knowledge entries with embeddings
            min_samples: Minimum samples for DBSCAN clustering
            
        Returns:
            List of topical Pattern objects
        """
        patterns = []
        
        try:
            # Extract embeddings
            embeddings = []
            valid_entries = []
            
            for entry in entries:
                if entry.get("embedding"):
                    embeddings.append(entry["embedding"])
                    valid_entries.append(entry)
            
            if len(embeddings) < min_samples:
                return patterns
            
            # Convert to numpy array
            X = np.array(embeddings)
            
            # DBSCAN clustering
            clustering = DBSCAN(eps=0.5, min_samples=min_samples, metric="cosine")
            labels = clustering.fit_predict(X)
            
            # Analyze clusters
            n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
            
            if n_clusters > 0:
                # Find cluster centers and representative content
                for cluster_id in range(n_clusters):
                    cluster_indices = np.where(labels == cluster_id)[0]
                    cluster_size = len(cluster_indices)
                    
                    if cluster_size >= min_samples:
                        # Get representative entries
                        cluster_entries = [valid_entries[i] for i in cluster_indices]
                        
                        # Extract common tags/themes
                        all_tags = []
                        for entry in cluster_entries:
                            metadata = entry.get("metadata", {})
                            if isinstance(metadata, dict):
                                tags = metadata.get("tags", [])
                                category = metadata.get("category", "")
                                if tags:
                                    all_tags.extend(tags)
                                if category:
                                    all_tags.append(category)
                        
                        from collections import Counter
                        tag_counts = Counter(all_tags)
                        top_tags = [t for t, c in tag_counts.most_common(3)]
                        
                        pattern = Pattern(
                            type="topical",
                            description=f"Topic cluster {cluster_id + 1}: {', '.join(top_tags) if top_tags else 'general knowledge'} ({cluster_size} items)",
                            confidence=min(0.6 + (cluster_size / 50), 0.95),
                            data={
                                "cluster_id": cluster_id,
                                "size": cluster_size,
                                "top_tags": top_tags,
                                "representative_content": cluster_entries[0]["content"][:100] if cluster_entries else ""
                            }
                        )
                        patterns.append(pattern)
            
            # Add noise pattern if significant
            noise_count = list(labels).count(-1)
            if noise_count > 0:
                pattern = Pattern(
                    type="topical",
                    description=f"{noise_count} unique/isolated knowledge entries (no cluster)",
                    confidence=0.7,
                    data={"unclustered_count": noise_count}
                )
                patterns.append(pattern)
            
            return patterns
            
        except Exception as e:
            logger.error(f"Topical pattern extraction failed: {e}")
            return []
    
    async def share_knowledge(
        self, 
        from_agent: str, 
        to_agents: List[str], 
        knowledge_id: str
    ) -> bool:
        """
        Share knowledge from one agent to others.
        
        Creates copies of the knowledge entry for each target agent
        with attribution metadata.
        
        Args:
            from_agent: Source agent ID
            to_agents: List of target agent IDs
            knowledge_id: ID of knowledge to share
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Fetch original knowledge
            result = self.supabase.table("agent_memories")\
                .select("*")\
                .eq("id", knowledge_id)\
                .eq("agent_id", from_agent)\
                .execute()
            
            if not result.data:
                logger.warning(f"Knowledge {knowledge_id} not found for agent {from_agent}")
                return False
            
            original = result.data[0]
            
            # Share to each agent
            shared_count = 0
            for target_agent in to_agents:
                try:
                    # Create shared copy
                    shared_data = {
                        "id": str(uuid.uuid4()),
                        "agent_id": target_agent,
                        "content": f"[Shared from {from_agent}] {original['content']}",
                        "embedding": original["embedding"],
                        "metadata": {
                            **original.get("metadata", {}),
                            "shared_from": from_agent,
                            "original_id": knowledge_id,
                            "shared_at": datetime.now().isoformat(),
                            "is_shared": True
                        },
                        "created_at": datetime.now().isoformat()
                    }
                    
                    self.supabase.table("agent_memories").insert(shared_data).execute()
                    shared_count += 1
                    
                except Exception as e:
                    logger.error(f"Failed to share to {target_agent}: {e}")
                    continue
            
            logger.info(f"✓ Knowledge shared: {knowledge_id[:8]}... to {shared_count} agents")
            return shared_count > 0
            
        except Exception as e:
            logger.error(f"Knowledge sharing failed: {e}")
            return False
    
    async def get_agent_stats(self, agent_id: str) -> Dict[str, Any]:
        """
        Get comprehensive statistics for an agent's knowledge.
        
        Returns:
            Dict with memory count, categories, temporal distribution, etc.
        """
        try:
            # Get all entries for agent
            result = self.supabase.table("agent_memories")\
                .select("*")\
                .eq("agent_id", agent_id)\
                .execute()
            
            if not result.data:
                return {
                    "agent_id": agent_id,
                    "total_memories": 0,
                    "knowledge_categories": [],
                    "shared_memories": 0,
                    "latest_memory": None,
                    "first_memory": None
                }
            
            entries = result.data
            
            # Count categories
            categories = {}
            shared_count = 0
            timestamps = []
            
            for entry in entries:
                metadata = entry.get("metadata", {})
                if isinstance(metadata, dict):
                    category = metadata.get("category", "uncategorized")
                    categories[category] = categories.get(category, 0) + 1
                    
                    if metadata.get("is_shared"):
                        shared_count += 1
                
                timestamps.append(entry.get("created_at"))
            
            # Sort timestamps
            timestamps.sort()
            
            return {
                "agent_id": agent_id,
                "total_memories": len(entries),
                "knowledge_categories": categories,
                "shared_memories": shared_count,
                "latest_memory": timestamps[-1] if timestamps else None,
                "first_memory": timestamps[0] if timestamps else None,
                "activity_span_days": self._calculate_days_between(
                    timestamps[0], timestamps[-1]
                ) if len(timestamps) > 1 else 0
            }
            
        except Exception as e:
            logger.error(f"Failed to get agent stats: {e}")
            return {"agent_id": agent_id, "error": str(e)}
    
    def _calculate_days_between(self, start: str, end: str) -> int:
        """Calculate days between two ISO timestamps"""
        try:
            start_dt = datetime.fromisoformat(start.replace("Z", "+00:00"))
            end_dt = datetime.fromisoformat(end.replace("Z", "+00:00"))
            return (end_dt - start_dt).days
        except:
            return 0
    
    async def get_similar_knowledge(
        self, 
        knowledge_id: str,
        threshold: float = 0.8,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Find knowledge similar to a specific entry.
        
        Args:
            knowledge_id: Reference knowledge ID
            threshold: Similarity threshold
            limit: Maximum results
            
        Returns:
            List of similar knowledge entries
        """
        try:
            # Get reference embedding
            result = self.supabase.table("agent_memories")\
                .select("embedding, agent_id")\
                .eq("id", knowledge_id)\
                .execute()
            
            if not result.data:
                return []
            
            reference = result.data[0]
            query_embedding = reference["embedding"]
            agent_id = reference.get("agent_id")
            
            # Find similar entries
            similar = self.supabase.rpc(
                "match_agent_memories",
                {
                    "query_embedding": query_embedding,
                    "match_threshold": threshold,
                    "match_count": limit + 1,  # +1 to exclude self
                    "agent_filter": agent_id
                }
            ).execute()
            
            if similar.data:
                # Filter out the reference entry
                return [s for s in similar.data if s.get("id") != knowledge_id][:limit]
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to get similar knowledge: {e}")
            return []
    
    async def delete_knowledge(self, knowledge_id: str) -> bool:
        """
        Delete a knowledge entry.
        
        Args:
            knowledge_id: ID of knowledge to delete
            
        Returns:
            True if successful
        """
        try:
            self.supabase.table("agent_memories")\
                .delete()\
                .eq("id", knowledge_id)\
                .execute()
            
            logger.info(f"✓ Knowledge deleted: {knowledge_id[:8]}...")
            return True
            
        except Exception as e:
            logger.error(f"Failed to delete knowledge: {e}")
            return False
    
    async def update_knowledge_metadata(
        self, 
        knowledge_id: str, 
        metadata_updates: Dict[str, Any]
    ) -> bool:
        """
        Update metadata for a knowledge entry.
        
        Args:
            knowledge_id: ID of knowledge to update
            metadata_updates: Dict of metadata fields to update
            
        Returns:
            True if successful
        """
        try:
            # Get current metadata
            result = self.supabase.table("agent_memories")\
                .select("metadata")\
                .eq("id", knowledge_id)\
                .execute()
            
            if not result.data:
                return False
            
            current_metadata = result.data[0].get("metadata", {})
            if isinstance(current_metadata, str):
                current_metadata = json.loads(current_metadata)
            
            # Merge metadata
            updated_metadata = {**current_metadata, **metadata_updates}
            
            # Update
            self.supabase.table("agent_memories")\
                .update({"metadata": updated_metadata})\
                .eq("id", knowledge_id)\
                .execute()
            
            logger.info(f"✓ Knowledge metadata updated: {knowledge_id[:8]}...")
            return True
            
        except Exception as e:
            logger.error(f"Failed to update knowledge metadata: {e}")
            return False


# ===== DATABASE SETUP SQL =====

DATABASE_SETUP_SQL = """
-- Arcanea Knowledge Base Database Schema
-- Run this in Supabase SQL Editor

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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_agent_memories_agent_id ON agent_memories(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_memories_user_id ON agent_memories(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_memories_created_at ON agent_memories(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_memories_metadata ON agent_memories USING GIN(metadata);

-- Create vector similarity search function (agent-specific)
CREATE OR REPLACE FUNCTION match_agent_memories(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    match_count INT,
    agent_filter VARCHAR(255)
)
RETURNS TABLE(
    id UUID,
    agent_id VARCHAR(255),
    content TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
    SELECT
        id,
        agent_id,
        content,
        metadata,
        created_at,
        1 - (embedding <=> query_embedding) AS similarity
    FROM agent_memories
    WHERE 
        agent_id = agent_filter
        AND 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Create vector similarity search function (all agents)
CREATE OR REPLACE FUNCTION match_memories(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    match_count INT
)
RETURNS TABLE(
    id UUID,
    agent_id VARCHAR(255),
    content TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
    SELECT
        id,
        agent_id,
        content,
        metadata,
        created_at,
        1 - (embedding <=> query_embedding) AS similarity
    FROM agent_memories
    WHERE 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Enable Row Level Security
ALTER TABLE agent_memories ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own data
CREATE POLICY agent_memories_user_isolation ON agent_memories
    FOR ALL
    USING (user_id = auth.uid());
"""


# ===== DEMONSTRATION =====

async def main():
    """
    Demonstrate Arcanea Knowledge Base v2 capabilities.
    
    This demo shows:
    - Knowledge storage with embeddings
    - Semantic search
    - Pattern extraction
    - Knowledge sharing
    - Agent statistics
    """
    
    print("🌟 Arcanea Knowledge Base v2 - Production Demo\n")
    print("=" * 60)
    
    # Note: This demo requires actual Supabase and OpenAI credentials
    print("\n📋 Database Setup SQL:")
    print(DATABASE_SETUP_SQL[:500] + "...\n")
    
    print("\n🔮 Knowledge Base Features:")
    print("   ✓ Vector embeddings (text-embedding-3-small)")
    print("   ✓ Semantic search with pgvector")
    print("   ✓ Temporal pattern recognition")
    print("   ✓ Topical clustering (DBSCAN)")
    print("   ✓ Knowledge sharing between agents")
    print("   ✓ Persistent Supabase storage")
    print("   ✓ Async/await throughout")
    print("   ✓ Comprehensive type hints")
    print("   ✓ Production-ready error handling")
    
    print("\n📊 Example Usage:")
    print("""
    # Initialize
    kb = ArcaneaKnowledgeBase(supabase_client, openai_api_key)
    
    # Store knowledge
    entry = await kb.store_knowledge(
        agent_id="dragon-forge",
        content="User works best at 9am after coffee",
        metadata={"category": "productivity", "confidence": 0.9}
    )
    
    # Search knowledge
    results = await kb.search_knowledge(
        query="when does user work best?",
        agent_id="dragon-forge"
    )
    
    # Extract patterns
    patterns = await kb.extract_patterns("dragon-forge")
    
    # Share knowledge
    await kb.share_knowledge(
        from_agent="dragon-forge",
        to_agents=["crystal-architect"],
        knowledge_id=entry.id
    )
    """)
    
    print("\n✅ Arcanea Knowledge Base v2: Ready for Production")
    print("   38 agents can now learn, remember, and share knowledge persistently!")


if __name__ == "__main__":
    asyncio.run(main())
