"""
Arcanea InfoGenius Bridge Integration Layer
Smooth migration from in-memory to vector-based knowledge base

This module provides a compatibility layer between the existing 
InfoGeniusArcaneaBridge and the new ArcaneaKnowledgeBase v2.
"""

import asyncio
import logging
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

# Import both systems
from arcanea_infogenius_bridge import InfoGeniusArcaneaBridge, KnowledgeNode, KnowledgeableAgent
from arcanea_knowledge_base_v2 import ArcaneaKnowledgeBase, KnowledgeEntry

logger = logging.getLogger(__name__)


@dataclass
class UnifiedKnowledgeEntry:
    """Unified entry that works with both systems"""
    id: str
    agent_id: str
    content: str
    source: str  # 'memory' or 'persistent'
    embedding: Optional[List[float]] = None
    metadata: Optional[Dict[str, Any]] = None
    timestamp: Optional[str] = None


class ArcaneaUnifiedKnowledgeSystem:
    """
    Unified knowledge system combining v1 (in-memory) and v2 (persistent).
    
    Provides smooth migration path with fallback capabilities.
    
    Features:
    - Dual storage: Fast in-memory + persistent vector storage
    - Graceful degradation: Falls back to memory if Supabase fails
    - Semantic search: Vector-based similarity when available
    - Pattern extraction: Temporal and topical analysis
    - Knowledge sharing: Between all 38 Arcanean agents
    
    Usage:
        system = ArcaneaUnifiedKnowledgeSystem(
            supabase_client=supabase,
            openai_api_key=api_key,
            enable_persistent=True
        )
        
        # Learn (stores in both systems)
        entry = await system.learn(
            agent_id="dragon-forge",
            content="User prefers morning creative sessions",
            metadata={"category": "preference", "confidence": 0.95}
        )
        
        # Recall (semantic search with fallback)
        results = await system.recall(
            agent_id="dragon-forge",
            query="when does user work best?"
        )
    """
    
    def __init__(
        self,
        supabase_client=None,
        openai_api_key: Optional[str] = None,
        enable_persistent: bool = True,
        storage_path: str = "./arcanea-knowledge"
    ):
        """
        Initialize unified knowledge system.
        
        Args:
            supabase_client: Supabase client (required for persistent mode)
            openai_api_key: OpenAI API key (required for persistent mode)
            enable_persistent: Enable Supabase vector storage
            storage_path: Path for in-memory bridge storage
        """
        # Initialize v1 (in-memory bridge)
        self.bridge = InfoGeniusArcaneaBridge(storage_path=storage_path)
        
        # Initialize v2 (persistent KB)
        self.kb: Optional[ArcaneaKnowledgeBase] = None
        self.enable_persistent = enable_persistent
        
        if enable_persistent and supabase_client and openai_api_key:
            try:
                self.kb = ArcaneaKnowledgeBase(supabase_client, openai_api_key)
                logger.info("✓ Persistent knowledge base enabled")
            except Exception as e:
                logger.warning(f"Failed to initialize KB: {e}. Using memory-only mode.")
                self.enable_persistent = False
        else:
            logger.info("ℹ Running in memory-only mode")
    
    async def initialize(self):
        """Initialize both systems"""
        await self.bridge.initialize()
        logger.info("🔮 Arcanea Unified Knowledge System: ACTIVE")
    
    async def learn(
        self,
        agent_id: str,
        content: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> UnifiedKnowledgeEntry:
        """
        Learn new knowledge (stores in both systems).
        
        Args:
            agent_id: Agent identifier
            content: Knowledge content
            metadata: Additional metadata
            
        Returns:
            UnifiedKnowledgeEntry
        """
        # Store in v1 (in-memory) - always works
        v1_knowledge = {
            "type": metadata.get("category", "insight") if metadata else "insight",
            "content": content,
            "tags": metadata.get("tags", []) if metadata else [],
            "context": metadata or {},
            "confidence": metadata.get("confidence", 0.8) if metadata else 0.8
        }
        
        v1_node = await self.bridge.agent_learn(agent_id, v1_knowledge)
        
        # Store in v2 (persistent) - if enabled
        v2_entry = None
        if self.enable_persistent and self.kb:
            try:
                v2_entry = await self.kb.store_knowledge(
                    agent_id=agent_id,
                    content=content,
                    metadata=metadata or {}
                )
            except Exception as e:
                logger.warning(f"Failed to persist to KB: {e}")
        
        # Return unified entry
        return UnifiedKnowledgeEntry(
            id=v1_node.id,
            agent_id=agent_id,
            content=content,
            source="persistent" if v2_entry else "memory",
            embedding=v2_entry.embedding if v2_entry else None,
            metadata=metadata,
            timestamp=v1_node.created_at
        )
    
    async def recall(
        self,
        agent_id: str,
        query: str,
        limit: int = 5,
        use_semantic: bool = True
    ) -> List[UnifiedKnowledgeEntry]:
        """
        Recall knowledge (semantic search with fallback).
        
        Args:
            agent_id: Agent identifier
            query: Search query
            limit: Max results
            use_semantic: Try semantic search first
            
        Returns:
            List of UnifiedKnowledgeEntry
        """
        results = []
        
        # Try semantic search first (if enabled)
        if use_semantic and self.enable_persistent and self.kb:
            try:
                kb_results = await self.kb.search_knowledge(
                    query=query,
                    agent_id=agent_id,
                    limit=limit
                )
                
                for r in kb_results:
                    results.append(UnifiedKnowledgeEntry(
                        id=r.get("id"),
                        agent_id=r.get("agent_id"),
                        content=r.get("content"),
                        source="persistent",
                        metadata=r.get("metadata"),
                        timestamp=r.get("created_at")
                    ))
                
                if results:
                    return results
                    
            except Exception as e:
                logger.warning(f"Semantic search failed: {e}")
        
        # Fall back to v1 (text-based search)
        try:
            v1_results = await self.bridge.agent_recall(agent_id, query, limit)
            
            for node in v1_results:
                results.append(UnifiedKnowledgeEntry(
                    id=node.id,
                    agent_id=node.source,
                    content=node.content,
                    source="memory",
                    metadata=node.metadata,
                    timestamp=node.created_at
                ))
                
        except Exception as e:
            logger.error(f"Memory recall failed: {e}")
        
        return results
    
    async def share_knowledge(
        self,
        from_agent: str,
        to_agents: List[str],
        knowledge_id: str
    ) -> bool:
        """
        Share knowledge between agents (both systems).
        
        Args:
            from_agent: Source agent
            to_agents: Target agents
            knowledge_id: Knowledge ID to share
            
        Returns:
            True if successful
        """
        # Share in v1
        v1_success = await self.bridge.share_knowledge(from_agent, to_agents, knowledge_id)
        
        # Share in v2 (if enabled)
        v2_success = False
        if self.enable_persistent and self.kb:
            try:
                v2_success = await self.kb.share_knowledge(from_agent, to_agents, knowledge_id)
            except Exception as e:
                logger.warning(f"KB share failed: {e}")
        
        return v1_success or v2_success
    
    async def extract_patterns(
        self,
        agent_id: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Extract patterns (v2 only).
        
        Returns:
            List of pattern dicts
        """
        if self.enable_persistent and self.kb:
            try:
                patterns = await self.kb.extract_patterns(agent_id)
                return [
                    {
                        "type": p.type,
                        "description": p.description,
                        "confidence": p.confidence,
                        "data": p.data
                    }
                    for p in patterns
                ]
            except Exception as e:
                logger.warning(f"Pattern extraction failed: {e}")
        
        # Fallback to v1 patterns
        v1_patterns = await self.bridge.recognize_patterns(agent_id)
        return v1_patterns
    
    async def get_stats(self, agent_id: str) -> Dict[str, Any]:
        """
        Get comprehensive stats (combined from both systems).
        
        Args:
            agent_id: Agent identifier
            
        Returns:
            Stats dict
        """
        # Get v1 stats
        v1_stats = await self.bridge.get_agent_knowledge_stats(agent_id)
        
        # Get v2 stats (if enabled)
        v2_stats = {}
        if self.enable_persistent and self.kb:
            try:
                v2_stats = await self.kb.get_agent_stats(agent_id)
            except Exception as e:
                logger.warning(f"KB stats failed: {e}")
        
        # Combine
        return {
            "agent_id": agent_id,
            "in_memory": {
                "memories": v1_stats.get("memories", 0),
                "domains": v1_stats.get("knowledge_domains", []),
                "type_distribution": v1_stats.get("type_distribution", {})
            },
            "persistent": v2_stats if v2_stats else {"error": "Not available"},
            "total_accessible": v1_stats.get("memories", 0) + v2_stats.get("total_memories", 0)
        }
    
    async def sync_to_persistent(self, agent_id: Optional[str] = None) -> int:
        """
        Sync in-memory knowledge to persistent storage.
        
        One-time migration helper.
        
        Args:
            agent_id: Specific agent to sync, or None for all
            
        Returns:
            Number of entries synced
        """
        if not self.enable_persistent or not self.kb:
            logger.warning("Persistent storage not available")
            return 0
        
        synced = 0
        
        try:
            # Get all v1 memories
            if agent_id:
                agents_to_sync = [agent_id]
            else:
                agents_to_sync = list(self.bridge.agent_memories.keys())
            
            for aid in agents_to_sync:
                memories = self.bridge.agent_memories.get(aid, [])
                
                for memory in memories:
                    try:
                        await self.kb.store_knowledge(
                            agent_id=aid,
                            content=memory.content,
                            metadata={
                                **(memory.metadata or {}),
                                "migrated_from_v1": True,
                                "original_tags": memory.tags,
                                "original_type": memory.type.value
                            }
                        )
                        synced += 1
                    except Exception as e:
                        logger.error(f"Failed to sync memory {memory.id}: {e}")
            
            logger.info(f"✓ Synced {synced} entries to persistent storage")
            return synced
            
        except Exception as e:
            logger.error(f"Sync failed: {e}")
            return synced


class EnhancedKnowledgeableAgent(KnowledgeableAgent):
    """
    Enhanced agent with unified knowledge capabilities.
    
    Extends the original KnowledgeableAgent to work with both
    in-memory and persistent knowledge systems.
    """
    
    def __init__(
        self,
        agent_id: str,
        unified_system: ArcaneaUnifiedKnowledgeSystem,
        elemental_affinity: str = "void"
    ):
        """
        Initialize enhanced agent.
        
        Args:
            agent_id: Unique agent identifier
            unified_system: Unified knowledge system instance
            elemental_affinity: Elemental type (fire, water, earth, wind, void)
        """
        # Don't call parent init - we use unified_system instead
        self.agent_id = agent_id
        self.unified_system = unified_system
        self.elemental_affinity = elemental_affinity
        self.learning_rate = 0.8
        self.knowledge_domains = []
    
    async def observe(self, observation: str, context: Dict = None):
        """Agent observes and learns"""
        return await self.unified_system.learn(
            agent_id=self.agent_id,
            content=observation,
            metadata=context or {}
        )
    
    async def remember(self, query: str) -> List[str]:
        """Agent recalls relevant memories"""
        results = await self.unified_system.recall(
            agent_id=self.agent_id,
            query=query
        )
        return [r.content for r in results]
    
    async def reason(self, question: str) -> str:
        """Agent reasons through knowledge"""
        # Get relevant knowledge
        relevant = await self.remember(question)
        
        if not relevant:
            return f"I don't have knowledge about '{question}' yet."
        
        # Simple reasoning simulation
        context = " ".join(relevant[:3])
        return f"Based on my knowledge: {context[:150]}..."
    
    async def teach(self, other_agents: List[str], knowledge_id: str):
        """Agent teaches other agents"""
        return await self.unified_system.share_knowledge(
            from_agent=self.agent_id,
            to_agents=other_agents,
            knowledge_id=knowledge_id
        )
    
    async def patterns(self) -> List[Dict[str, Any]]:
        """Get patterns for this agent"""
        return await self.unified_system.extract_patterns(self.agent_id)
    
    async def stats(self) -> Dict[str, Any]:
        """Get comprehensive stats"""
        return await self.unified_system.get_stats(self.agent_id)


# ===== DEMONSTRATION =====

async def demo():
    """Demonstrate the unified knowledge system"""
    
    print("🌟 Arcanea Unified Knowledge System Demo\n")
    print("=" * 60)
    
    # Initialize in memory-only mode (no credentials needed for demo)
    system = ArcaneaUnifiedKnowledgeSystem(
        supabase_client=None,
        openai_api_key=None,
        enable_persistent=False
    )
    
    await system.initialize()
    
    # Create enhanced agents
    agents = {
        "dragon-forge": EnhancedKnowledgeableAgent(
            "dragon-forge", system, "fire"
        ),
        "crystal-architect": EnhancedKnowledgeableAgent(
            "crystal-architect", system, "earth"
        ),
        "river-storyteller": EnhancedKnowledgeableAgent(
            "river-storyteller", system, "water"
        )
    }
    
    # Agents observe and learn
    print("\n📚 Agents learning...")
    observations = [
        ("dragon-forge", "User works best at 9am after coffee", {"category": "productivity"}),
        ("crystal-architect", "System design requires clear foundations", {"category": "methodology"}),
        ("river-storyteller", "Stories flow better with emotional currents", {"category": "creativity"}),
    ]
    
    learned_entries = []
    for agent_id, content, metadata in observations:
        entry = await agents[agent_id].observe(content, metadata)
        learned_entries.append(entry)
        print(f"   ✓ {agent_id} learned: {content[:40]}...")
    
    # Agents recall
    print("\n🔍 Testing recall...")
    for agent_id in agents:
        results = await agents[agent_id].remember("work best")
        print(f"   {agent_id}: {len(results)} relevant memories")
    
    # Knowledge sharing
    print("\n📤 Knowledge sharing...")
    if learned_entries:
        success = await agents["dragon-forge"].teach(
            ["crystal-architect"],
            learned_entries[0].id
        )
        print(f"   ✓ Shared knowledge: {success}")
    
    # Get stats
    print("\n📊 Agent statistics:")
    for agent_id in agents:
        stats = await agents[agent_id].stats()
        print(f"   {agent_id}:")
        print(f"      In-memory: {stats['in_memory']['memories']} memories")
        print(f"      Domains: {', '.join(stats['in_memory']['domains'][:3])}")
    
    print("\n✅ Unified Knowledge System Demo Complete!")
    print("   Add Supabase + OpenAI credentials for full semantic search!")


if __name__ == "__main__":
    asyncio.run(demo())
