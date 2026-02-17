"""
Integration Tests for Knowledge Base
Tests knowledge storage, semantic search, pattern extraction, and knowledge sharing
"""

import pytest
import asyncio
from unittest.mock import Mock, AsyncMock, patch, MagicMock
from dataclasses import dataclass
from typing import Dict, List, Any, Optional
from datetime import datetime
import json


@dataclass
class KnowledgeEntry:
    """Knowledge entry structure"""
    id: str
    agent_id: str
    content: str
    embedding: Optional[List[float]] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: Optional[str] = None
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now().isoformat()


@dataclass
class Pattern:
    """Pattern structure"""
    type: str
    description: str
    confidence: float
    data: Dict[str, Any]


class KnowledgeBase:
    """Knowledge Base with Supabase backend"""
    
    def __init__(self, supabase_client=None, openai_client=None):
        self.supabase = supabase_client
        self.openai = openai_client
        self.local_cache = {}
    
    async def store_knowledge(
        self,
        agent_id: str,
        content: str,
        metadata: Optional[Dict] = None
    ) -> KnowledgeEntry:
        """Store knowledge with embedding"""
        # Generate embedding if OpenAI client available
        embedding = None
        if self.openai:
            try:
                embedding = await self._generate_embedding(content)
            except Exception as e:
                print(f"Embedding generation failed: {e}")
        
        entry = KnowledgeEntry(
            id=f"k_{datetime.now().timestamp()}",
            agent_id=agent_id,
            content=content,
            embedding=embedding,
            metadata=metadata or {}
        )
        
        # Store in Supabase if available
        if self.supabase:
            try:
                await self._store_in_supabase(entry)
            except Exception as e:
                print(f"Supabase storage failed: {e}")
        
        # Cache locally
        if agent_id not in self.local_cache:
            self.local_cache[agent_id] = []
        self.local_cache[agent_id].append(entry)
        
        return entry
    
    async def search_knowledge(
        self,
        query: str,
        agent_id: Optional[str] = None,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """Search knowledge using semantic similarity"""
        # Try vector search with Supabase
        if self.supabase and self.openai:
            try:
                query_embedding = await self._generate_embedding(query)
                results = await self._vector_search(query_embedding, agent_id, limit)
                if results:
                    return results
            except Exception as e:
                print(f"Vector search failed: {e}")
        
        # Fall back to text search
        return await self._text_search(query, agent_id, limit)
    
    async def share_knowledge(
        self,
        from_agent: str,
        to_agents: List[str],
        knowledge_id: str
    ) -> bool:
        """Share knowledge between agents"""
        # Find the knowledge entry
        entry = None
        if from_agent in self.local_cache:
            for k in self.local_cache[from_agent]:
                if k.id == knowledge_id:
                    entry = k
                    break
        
        if not entry:
            return False
        
        # Share with each target agent
        for agent_id in to_agents:
            shared_entry = KnowledgeEntry(
                id=f"shared_{entry.id}_{agent_id}",
                agent_id=agent_id,
                content=f"[Shared from {from_agent}] {entry.content}",
                embedding=entry.embedding,
                metadata={
                    **entry.metadata,
                    "shared_from": from_agent,
                    "original_id": entry.id
                }
            )
            
            if agent_id not in self.local_cache:
                self.local_cache[agent_id] = []
            self.local_cache[agent_id].append(shared_entry)
            
            # Store in Supabase if available
            if self.supabase:
                await self._store_in_supabase(shared_entry)
        
        return True
    
    async def extract_patterns(
        self,
        agent_id: Optional[str] = None
    ) -> List[Pattern]:
        """Extract patterns from knowledge"""
        patterns = []
        
        # Get knowledge to analyze
        knowledge_list = []
        if agent_id:
            knowledge_list = self.local_cache.get(agent_id, [])
        else:
            for entries in self.local_cache.values():
                knowledge_list.extend(entries)
        
        # Simple pattern extraction
        content_types = {}
        for entry in knowledge_list:
            content_type = entry.metadata.get("category", "general")
            content_types[content_type] = content_types.get(content_type, 0) + 1
        
        # Create patterns from type distribution
        for content_type, count in content_types.items():
            if count > 1:
                patterns.append(Pattern(
                    type="frequency",
                    description=f"{content_type} appears {count} times",
                    confidence=min(count / len(knowledge_list), 1.0) if knowledge_list else 0,
                    data={"type": content_type, "count": count}
                ))
        
        return patterns
    
    async def get_agent_stats(self, agent_id: str) -> Dict[str, Any]:
        """Get statistics for an agent"""
        entries = self.local_cache.get(agent_id, [])
        
        domains = set()
        for entry in entries:
            domains.update(entry.metadata.get("tags", []))
        
        return {
            "agent_id": agent_id,
            "total_memories": len(entries),
            "domains": list(domains),
            "last_updated": entries[-1].created_at if entries else None
        }
    
    async def _generate_embedding(self, text: str) -> List[float]:
        """Generate embedding using OpenAI"""
        if not self.openai:
            return []
        
        # Mock embedding generation
        response = await self.openai.embeddings.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response.data[0].embedding
    
    async def _store_in_supabase(self, entry: KnowledgeEntry):
        """Store entry in Supabase"""
        if not self.supabase:
            return
        
        data = {
            "id": entry.id,
            "agent_id": entry.agent_id,
            "content": entry.content,
            "embedding": entry.embedding,
            "metadata": entry.metadata,
            "created_at": entry.created_at
        }
        
        await self.supabase.table("knowledge").insert(data).execute()
    
    async def _vector_search(
        self,
        query_embedding: List[float],
        agent_id: Optional[str],
        limit: int
    ) -> List[Dict[str, Any]]:
        """Perform vector search in Supabase"""
        if not self.supabase:
            return []
        
        # Mock vector search
        query = self.supabase.table("knowledge").select("*")
        if agent_id:
            query = query.eq("agent_id", agent_id)
        
        response = await query.limit(limit).execute()
        return response.data if response.data else []
    
    async def _text_search(
        self,
        query: str,
        agent_id: Optional[str],
        limit: int
    ) -> List[Dict[str, Any]]:
        """Perform text-based search"""
        results = []
        query_lower = query.lower()
        
        search_space = self.local_cache.get(agent_id, []) if agent_id else []
        if not agent_id:
            for entries in self.local_cache.values():
                search_space.extend(entries)
        
        for entry in search_space:
            score = 0
            if query_lower in entry.content.lower():
                score += 3
            if any(query_lower in tag.lower() for tag in entry.metadata.get("tags", [])):
                score += 2
            
            if score > 0:
                results.append({
                    "id": entry.id,
                    "agent_id": entry.agent_id,
                    "content": entry.content,
                    "score": score,
                    "metadata": entry.metadata
                })
        
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:limit]


@pytest.fixture
def mock_supabase():
    """Create mock Supabase client"""
    mock = MagicMock()
    mock.table.return_value = mock
    mock.select.return_value = mock
    mock.eq.return_value = mock
    mock.insert.return_value = mock
    mock.execute = AsyncMock(return_value=MagicMock(data=[]))
    return mock


@pytest.fixture
def mock_openai():
    """Create mock OpenAI client"""
    mock = MagicMock()
    mock.embeddings = MagicMock()
    mock.embeddings.create = AsyncMock(return_value=MagicMock(
        data=[MagicMock(embedding=[0.1, 0.2, 0.3])]
    ))
    return mock


@pytest.fixture
def knowledge_base(mock_supabase, mock_openai):
    """Create KnowledgeBase instance with mocked clients"""
    return KnowledgeBase(supabase_client=mock_supabase, openai_client=mock_openai)


class TestKnowledgeStorage:
    """Test knowledge storage operations"""
    
    @pytest.mark.asyncio
    async def test_store_knowledge_basic(self, knowledge_base):
        """Test basic knowledge storage"""
        # Act
        entry = await knowledge_base.store_knowledge(
            agent_id="dragon-forge",
            content="User prefers dark mode interface",
            metadata={"category": "preference", "tags": ["ui", "design"]}
        )
        
        # Assert
        assert entry.id is not None
        assert entry.agent_id == "dragon-forge"
        assert entry.content == "User prefers dark mode interface"
        assert entry.metadata["category"] == "preference"
        assert "dragon-forge" in knowledge_base.local_cache
    
    @pytest.mark.asyncio
    async def test_store_knowledge_with_embedding(self, knowledge_base, mock_openai):
        """Test knowledge storage with embedding generation"""
        # Act
        entry = await knowledge_base.store_knowledge(
            agent_id="crystal-arch",
            content="System architecture requires clear boundaries"
        )
        
        # Assert
        assert entry.embedding is not None
        assert len(entry.embedding) == 3
        mock_openai.embeddings.create.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_store_knowledge_supabase_failure(self, knowledge_base, mock_supabase):
        """Test storage when Supabase fails"""
        # Arrange
        mock_supabase.execute = AsyncMock(side_effect=Exception("Connection failed"))
        
        # Act
        entry = await knowledge_base.store_knowledge(
            agent_id="test-agent",
            content="Test content"
        )
        
        # Assert - Should still create local entry even if Supabase fails
        assert entry is not None
        assert "test-agent" in knowledge_base.local_cache
    
    @pytest.mark.asyncio
    async def test_store_multiple_knowledge_entries(self, knowledge_base):
        """Test storing multiple entries for same agent"""
        # Act
        for i in range(5):
            await knowledge_base.store_knowledge(
                agent_id="dragon-forge",
                content=f"Knowledge entry {i}",
                metadata={"index": i}
            )
        
        # Assert
        entries = knowledge_base.local_cache["dragon-forge"]
        assert len(entries) == 5
        assert all(e.agent_id == "dragon-forge" for e in entries)


class TestSemanticSearch:
    """Test semantic search functionality"""
    
    @pytest.mark.asyncio
    async def test_text_search_basic(self, knowledge_base):
        """Test basic text search"""
        # Arrange
        await knowledge_base.store_knowledge(
            agent_id="dragon-forge",
            content="Creative work is best done in the morning",
            metadata={"tags": ["productivity"]}
        )
        
        # Act
        results = await knowledge_base.search_knowledge(
            query="morning work",
            agent_id="dragon-forge"
        )
        
        # Assert
        assert len(results) > 0
        assert any("morning" in r["content"].lower() for r in results)
    
    @pytest.mark.asyncio
    async def test_search_across_agents(self, knowledge_base):
        """Test searching across multiple agents"""
        # Arrange
        await knowledge_base.store_knowledge(
            agent_id="agent-1",
            content="Fire magic is powerful"
        )
        await knowledge_base.store_knowledge(
            agent_id="agent-2",
            content="Water flows freely"
        )
        
        # Act
        results = await knowledge_base.search_knowledge(query="magic")
        
        # Assert
        assert len(results) >= 1
    
    @pytest.mark.asyncio
    async def test_vector_search_with_supabase(self, knowledge_base, mock_supabase):
        """Test vector search using Supabase"""
        # Arrange
        mock_supabase.execute = AsyncMock(return_value=MagicMock(data=[
            {"id": "1", "content": "Test", "agent_id": "agent-1"}
        ]))
        
        # Act
        results = await knowledge_base.search_knowledge(
            query="test query",
            agent_id="agent-1"
        )
        
        # Assert
        assert len(results) == 1
        mock_supabase.table.assert_called_with("knowledge")
    
    @pytest.mark.asyncio
    async def test_search_limit(self, knowledge_base):
        """Test search with limit parameter"""
        # Arrange
        for i in range(10):
            await knowledge_base.store_knowledge(
                agent_id="dragon-forge",
                content=f"Knowledge {i}"
            )
        
        # Act
        results = await knowledge_base.search_knowledge(
            query="Knowledge",
            limit=3
        )
        
        # Assert
        assert len(results) <= 3


class TestPatternExtraction:
    """Test pattern extraction functionality"""
    
    @pytest.mark.asyncio
    async def test_extract_patterns_basic(self, knowledge_base):
        """Test basic pattern extraction"""
        # Arrange
        for _ in range(3):
            await knowledge_base.store_knowledge(
                agent_id="dragon-forge",
                content="Creative insight",
                metadata={"category": "creativity"}
            )
        
        # Act
        patterns = await knowledge_base.extract_patterns(agent_id="dragon-forge")
        
        # Assert
        assert len(patterns) > 0
        assert any(p.type == "frequency" for p in patterns)
    
    @pytest.mark.asyncio
    async def test_extract_patterns_across_agents(self, knowledge_base):
        """Test pattern extraction across all agents"""
        # Arrange
        for agent in ["agent-1", "agent-2"]:
            for _ in range(2):
                await knowledge_base.store_knowledge(
                    agent_id=agent,
                    content="Test content",
                    metadata={"category": "test"}
                )
        
        # Act
        patterns = await knowledge_base.extract_patterns()
        
        # Assert
        assert len(patterns) > 0
    
    @pytest.mark.asyncio
    async def test_pattern_confidence(self, knowledge_base):
        """Test pattern confidence calculation"""
        # Arrange
        for _ in range(5):
            await knowledge_base.store_knowledge(
                agent_id="dragon-forge",
                content="Content",
                metadata={"category": "dominant"}
            )
        
        # Act
        patterns = await knowledge_base.extract_patterns(agent_id="dragon-forge")
        
        # Assert
        for pattern in patterns:
            assert 0 <= pattern.confidence <= 1


class TestKnowledgeSharing:
    """Test knowledge sharing between agents"""
    
    @pytest.mark.asyncio
    async def test_share_knowledge_success(self, knowledge_base):
        """Test successful knowledge sharing"""
        # Arrange
        entry = await knowledge_base.store_knowledge(
            agent_id="source-agent",
            content="Important insight",
            metadata={"priority": "high"}
        )
        
        # Act
        success = await knowledge_base.share_knowledge(
            from_agent="source-agent",
            to_agents=["target-1", "target-2"],
            knowledge_id=entry.id
        )
        
        # Assert
        assert success is True
        assert "target-1" in knowledge_base.local_cache
        assert "target-2" in knowledge_base.local_cache
    
    @pytest.mark.asyncio
    async def test_shared_knowledge_metadata(self, knowledge_base):
        """Test shared knowledge has correct metadata"""
        # Arrange
        entry = await knowledge_base.store_knowledge(
            agent_id="source-agent",
            content="Original content"
        )
        
        # Act
        await knowledge_base.share_knowledge(
            from_agent="source-agent",
            to_agents=["target-agent"],
            knowledge_id=entry.id
        )
        
        # Assert
        shared_entries = knowledge_base.local_cache["target-agent"]
        assert len(shared_entries) == 1
        assert shared_entries[0].metadata["shared_from"] == "source-agent"
        assert "[Shared from" in shared_entries[0].content
    
    @pytest.mark.asyncio
    async def test_share_nonexistent_knowledge(self, knowledge_base):
        """Test sharing knowledge that doesn't exist"""
        # Act
        success = await knowledge_base.share_knowledge(
            from_agent="source-agent",
            to_agents=["target-agent"],
            knowledge_id="nonexistent-id"
        )
        
        # Assert
        assert success is False


class TestAgentStats:
    """Test agent statistics"""
    
    @pytest.mark.asyncio
    async def test_get_agent_stats_basic(self, knowledge_base):
        """Test basic agent stats"""
        # Arrange
        await knowledge_base.store_knowledge(
            agent_id="dragon-forge",
            content="Knowledge 1",
            metadata={"tags": ["tag1", "tag2"]}
        )
        
        # Act
        stats = await knowledge_base.get_agent_stats("dragon-forge")
        
        # Assert
        assert stats["agent_id"] == "dragon-forge"
        assert stats["total_memories"] == 1
        assert "tag1" in stats["domains"]
        assert "tag2" in stats["domains"]
    
    @pytest.mark.asyncio
    async def test_get_stats_empty_agent(self, knowledge_base):
        """Test stats for agent with no knowledge"""
        # Act
        stats = await knowledge_base.get_agent_stats("new-agent")
        
        # Assert
        assert stats["agent_id"] == "new-agent"
        assert stats["total_memories"] == 0
        assert stats["last_updated"] is None


class TestErrorHandling:
    """Test error handling scenarios"""
    
    @pytest.mark.asyncio
    async def test_embedding_generation_failure(self, knowledge_base, mock_openai):
        """Test handling of embedding generation failure"""
        # Arrange
        mock_openai.embeddings.create = AsyncMock(side_effect=Exception("API Error"))
        
        # Act
        entry = await knowledge_base.store_knowledge(
            agent_id="test-agent",
            content="Test content"
        )
        
        # Assert - Should still create entry without embedding
        assert entry is not None
        assert entry.embedding is None
    
    @pytest.mark.asyncio
    async def test_supabase_query_failure(self, knowledge_base, mock_supabase):
        """Test handling of Supabase query failure"""
        # Arrange
        mock_supabase.execute = AsyncMock(side_effect=Exception("Query failed"))
        
        # Act
        results = await knowledge_base.search_knowledge(query="test")
        
        # Assert - Should fall back to text search
        assert isinstance(results, list)


@pytest.mark.integration
@pytest.mark.knowledge
class TestKnowledgeIntegration:
    """Integration tests requiring actual services"""
    
    @pytest.mark.skip(reason="Requires actual Supabase and OpenAI credentials")
    @pytest.mark.asyncio
    async def test_real_knowledge_storage(self):
        """Test with real Supabase connection"""
        pass
    
    @pytest.mark.skip(reason="Requires actual services")
    @pytest.mark.asyncio
    async def test_end_to_end_workflow(self):
        """Test complete knowledge workflow"""
        pass
