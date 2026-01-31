# Arcanea-InfoGenius Integration Bridge
# Connects InfoGenius capabilities with Arcanea agents
# Version: 2.0.0

import json
import asyncio
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum

class KnowledgeType(Enum):
    """Types of knowledge Arcanea can process"""
    LORE = "lore"
    SKILL = "skill"
    AGENT = "agent"
    RITUAL = "ritual"
    PROJECT = "project"
    INSIGHT = "insight"
    PATTERN = "pattern"

@dataclass
class KnowledgeNode:
    """Represents a piece of knowledge in the system"""
    id: str
    type: KnowledgeType
    content: str
    tags: List[str]
    source: str
    created_at: str
    connections: List[str] = None
    metadata: Dict[str, Any] = None
    
    def __post_init__(self):
        if self.connections is None:
            self.connections = []
        if self.metadata is None:
            self.metadata = {}
        if self.created_at is None:
            self.created_at = datetime.now().isoformat()

class InfoGeniusArcaneaBridge:
    """
    Bridges InfoGenius knowledge management with Arcanea
    Enables agents to learn, remember, and reason
    """
    
    def __init__(self, storage_path: str = "./arcanea-knowledge"):
        self.storage_path = storage_path
        self.knowledge_graph = {}
        self.agent_memories = {}
        self.patterns = []
        self.insights = []
        
    async def initialize(self):
        """Initialize the knowledge system"""
        print("📚 Initializing InfoGenius-Arcanea Bridge...")
        await self._load_knowledge_base()
        print(f"   Loaded {len(self.knowledge_graph)} knowledge nodes")
        print(f"   Recognized {len(self.patterns)} patterns")
        print("   🔮 Knowledge bridge: ACTIVE")
        
    async def _load_knowledge_base(self):
        """Load existing knowledge from storage"""
        # Knowledge domains
        domains = [
            "elemental_arts", "agent_lore", "skill_mastery",
            "creation_rituals", "user_preferences", "project_history"
        ]
        
        for domain in domains:
            self.knowledge_graph[domain] = []
    
    # ===== AGENT KNOWLEDGE MANAGEMENT =====
    
    async def agent_learn(self, agent_id: str, knowledge: Dict) -> KnowledgeNode:
        """Agent learns something new"""
        node = KnowledgeNode(
            id=f"{agent_id}_{datetime.now().timestamp()}",
            type=KnowledgeType(knowledge.get("type", "insight")),
            content=knowledge.get("content", ""),
            tags=knowledge.get("tags", []),
            source=agent_id,
            metadata={
                "learning_context": knowledge.get("context", {}),
                "confidence": knowledge.get("confidence", 0.8),
                "verified": False
            }
        )
        
        if agent_id not in self.agent_memories:
            self.agent_memories[agent_id] = []
        
        self.agent_memories[agent_id].append(node)
        
        # Extract patterns
        await self._extract_pattern(node)
        
        return node
    
    async def agent_recall(self, agent_id: str, query: str, limit: int = 5) -> List[KnowledgeNode]:
        """Agent recalls relevant knowledge"""
        if agent_id not in self.agent_memories:
            return []
        
        memories = self.agent_memories[agent_id]
        
        # Simple relevance scoring
        scored = []
        for memory in memories:
            score = 0
            query_terms = query.lower().split()
            content_lower = memory.content.lower()
            
            for term in query_terms:
                if term in content_lower:
                    score += 1
                if term in [t.lower() for t in memory.tags]:
                    score += 2
            
            scored.append((score, memory))
        
        scored.sort(reverse=True, key=lambda x: x[0])
        return [m for _, m in scored[:limit]]
    
    async def agent_reason(self, agent_id: str, question: str) -> Dict[str, Any]:
        """Agent reasons through knowledge to answer question"""
        relevant = await self.agent_recall(agent_id, question, limit=10)
        
        # Build reasoning chain
        reasoning = {
            "question": question,
            "relevant_memories": len(relevant),
            "insights": [],
            "confidence": 0.0,
            "answer": ""
        }
        
        if not relevant:
            reasoning["answer"] = f"I don't have knowledge about '{question}' yet."
            reasoning["confidence"] = 0.0
        else:
            # Simulate reasoning
            context = " ".join([m.content for m in relevant[:3]])
            reasoning["answer"] = f"Based on my knowledge: {context[:100]}..."
            reasoning["confidence"] = sum(m.metadata.get("confidence", 0.5) for m in relevant) / len(relevant)
            reasoning["insights"] = [m.content for m in relevant]
        
        return reasoning
    
    # ===== PATTERN RECOGNITION =====
    
    async def _extract_pattern(self, node: KnowledgeNode):
        """Extract patterns from knowledge"""
        # Pattern detection
        if len(self.patterns) < 100:  # Limit storage
            pattern = {
                "type": node.type.value,
                "signature": hash(node.content[:50]),
                "frequency": 1,
                "sources": [node.source],
                "first_seen": node.created_at
            }
            self.patterns.append(pattern)
    
    async def recognize_patterns(self, domain: str = None) -> List[Dict]:
        """Recognize patterns across knowledge"""
        if domain:
            return [p for p in self.patterns if domain in p["sources"]]
        return self.patterns
    
    # ===== KNOWLEDGE SYNTHESIS =====
    
    async def synthesize_insight(self, topic: str) -> Dict[str, Any]:
        """Synthesize insight from multiple knowledge sources"""
        all_nodes = []
        for domain, nodes in self.knowledge_graph.items():
            all_nodes.extend(nodes)
        
        # Find relevant nodes
        relevant = [n for n in all_nodes if topic.lower() in n.content.lower()]
        
        if not relevant:
            return {
                "topic": topic,
                "insight": f"No knowledge found about {topic}",
                "sources": 0,
                "confidence": 0
            }
        
        # Synthesize
        combined = " ".join([n.content for n in relevant])
        insight = {
            "topic": topic,
            "insight": f"Synthesis: {combined[:200]}...",
            "sources": len(relevant),
            "confidence": sum(n.metadata.get("confidence", 0.5) for n in relevant) / len(relevant),
            "patterns": await self.recognize_patterns(topic)
        }
        
        self.insights.append(insight)
        return insight
    
    # ===== AGENT COORDINATION =====
    
    async def share_knowledge(self, from_agent: str, to_agents: List[str], knowledge_id: str):
        """Share knowledge between agents"""
        if from_agent not in self.agent_memories:
            return False
        
        source_memory = None
        for memory in self.agent_memories[from_agent]:
            if memory.id == knowledge_id:
                source_memory = memory
                break
        
        if not source_memory:
            return False
        
        for agent_id in to_agents:
            if agent_id not in self.agent_memories:
                self.agent_memories[agent_id] = []
            
            # Create copy
            shared = KnowledgeNode(
                id=f"shared_{knowledge_id}",
                type=source_memory.type,
                content=f"[Shared from {from_agent}] {source_memory.content}",
                tags=source_memory.tags + ["shared"],
                source=agent_id,
                metadata={
                    **source_memory.metadata,
                    "shared_from": from_agent,
                    "shared_at": datetime.now().isoformat()
                }
            )
            
            self.agent_memories[agent_id].append(shared)
        
        return True
    
    # ===== QUERY & SEARCH =====
    
    async def semantic_search(self, query: str, type_filter: KnowledgeType = None) -> List[KnowledgeNode]:
        """Search knowledge semantically"""
        all_nodes = []
        for memories in self.agent_memories.values():
            all_nodes.extend(memories)
        
        # Filter by type if specified
        if type_filter:
            all_nodes = [n for n in all_nodes if n.type == type_filter]
        
        # Simple text matching
        results = []
        query_lower = query.lower()
        
        for node in all_nodes:
            score = 0
            if query_lower in node.content.lower():
                score += 3
            if any(query_lower in tag.lower() for tag in node.tags):
                score += 2
            if query_lower in node.source.lower():
                score += 1
            
            if score > 0:
                results.append((score, node))
        
        results.sort(reverse=True, key=lambda x: x[0])
        return [node for _, node in results[:10]]
    
    async def get_agent_knowledge_stats(self, agent_id: str) -> Dict[str, Any]:
        """Get knowledge statistics for an agent"""
        if agent_id not in self.agent_memories:
            return {"agent": agent_id, "memories": 0, "knowledge_domains": []}
        
        memories = self.agent_memories[agent_id]
        domains = set()
        type_counts = {}
        
        for memory in memories:
            domains.update(memory.tags)
            type_counts[memory.type.value] = type_counts.get(memory.type.value, 0) + 1
        
        return {
            "agent": agent_id,
            "memories": len(memories),
            "knowledge_domains": list(domains),
            "type_distribution": type_counts,
            "latest_memory": memories[-1].created_at if memories else None
        }
    
    # ===== EXPORT & INTEGRATION =====
    
    def export_knowledge(self, format: str = "json") -> str:
        """Export knowledge for external use"""
        export_data = {
            "patterns": self.patterns,
            "insights": self.insights,
            "agent_count": len(self.agent_memories),
            "total_memories": sum(len(m) for m in self.agent_memories.values()),
            "export_time": datetime.now().isoformat()
        }
        
        if format == "json":
            return json.dumps(export_data, indent=2)
        elif format == "markdown":
            md = f"""# Arcanea Knowledge Export
Generated: {export_data['export_time']}

## Statistics
- Active Agents: {export_data['agent_count']}
- Total Memories: {export_data['total_memories']}
- Patterns Recognized: {len(export_data['patterns'])}
- Insights Generated: {len(export_data['insights'])}

## Patterns
"""
            for p in export_data['patterns'][:10]:
                md += f"- **{p['type']}**: Frequency {p['frequency']}\n"
            
            md += "\n## Latest Insights\n"
            for i in export_data['insights'][-5:]:
                md += f"- {i['topic']}: {i['insight'][:100]}...\n"
            
            return md
        
        return json.dumps(export_data, indent=2)

# ===== ENHANCED AGENT CLASS =====

class KnowledgeableAgent:
    """Arcanea agent enhanced with InfoGenius knowledge capabilities"""
    
    def __init__(self, agent_id: str, bridge: InfoGeniusArcaneaBridge, elemental_affinity: str = "void"):
        self.agent_id = agent_id
        self.bridge = bridge
        self.elemental_affinity = elemental_affinity
        self.learning_rate = 0.8
        self.knowledge_domains = []
        
    async def observe(self, observation: str, context: Dict = None):
        """Agent observes and learns from experience"""
        knowledge = {
            "type": "insight",
            "content": observation,
            "tags": context.get("tags", []) if context else [],
            "context": context or {},
            "confidence": self.learning_rate
        }
        
        node = await self.bridge.agent_learn(self.agent_id, knowledge)
        return node
    
    async def remember(self, query: str) -> List[str]:
        """Agent recalls relevant memories"""
        memories = await self.bridge.agent_recall(self.agent_id, query)
        return [m.content for m in memories]
    
    async def reason(self, question: str) -> str:
        """Agent reasons through knowledge"""
        reasoning = await self.bridge.agent_reason(self.agent_id, question)
        return reasoning["answer"]
    
    async def teach(self, other_agents: List[str], knowledge_id: str):
        """Agent teaches other agents"""
        return await self.bridge.share_knowledge(self.agent_id, other_agents, knowledge_id)
    
    async def stats(self) -> Dict:
        """Get agent knowledge stats"""
        return await self.bridge.get_agent_knowledge_stats(self.agent_id)

# ===== DEMONSTRATION =====

async def main():
    """Demonstrate InfoGenius-Arcanea Integration"""
    
    print("🌟 InfoGenius-Arcanea Integration Demo\n")
    
    # Initialize bridge
    bridge = InfoGeniusArcaneaBridge()
    await bridge.initialize()
    
    # Create knowledgeable agents
    print("\n🧠 Creating knowledgeable agents...")
    agents = {
        "dragon-forge": KnowledgeableAgent("dragon-forge", bridge, "fire"),
        "river-storyteller": KnowledgeableAgent("river-storyteller", bridge, "water"),
        "crystal-architect": KnowledgeableAgent("crystal-architect", bridge, "earth")
    }
    
    # Agents observe and learn
    print("\n📚 Agents learning from experience...")
    
    observations = [
        ("dragon-forge", "Creative blocks can be broken by intense focus sessions of 90 minutes", ["creativity", "technique"]),
        ("dragon-forge", "Fire rituals work best in the morning when energy is highest", ["ritual", "optimization"]),
        ("river-storyteller", "Stories flow better when following emotional currents rather than rigid structures", ["storytelling", "emotion"]),
        ("crystal-architect", "System design requires clear foundations before adding complexity", ["architecture", "methodology"]),
        ("river-storyteller", "Narrative arcs mirror water flow - tension builds then releases", ["storytelling", "pattern"])
    ]
    
    for agent_id, content, tags in observations:
        node = await agents[agent_id].observe(content, {"tags": tags})
        print(f"   ✓ {agent_id} learned: {content[:50]}...")
    
    # Agents recall knowledge
    print("\n🔍 Testing agent recall...")
    for agent_id, query in [("dragon-forge", "creative"), ("river-storyteller", "story"), ("crystal-architect", "system")]:
        memories = await agents[agent_id].remember(query)
        print(f"   {agent_id} recalls {len(memories)} memories about '{query}'")
        for m in memories[:2]:
            print(f"      - {m[:60]}...")
    
    # Pattern recognition
    print("\n🌊 Recognizing patterns across agents...")
    patterns = await bridge.recognize_patterns()
    print(f"   Total patterns recognized: {len(patterns)}")
    
    # Knowledge sharing
    print("\n📤 Teaching between agents...")
    # Get a knowledge ID from dragon-forge
    dragon_memories = bridge.agent_memories.get("dragon-forge", [])
    if dragon_memories:
        knowledge_id = dragon_memories[0].id
        success = await agents["dragon-forge"].teach(["river-storyteller"], knowledge_id)
        print(f"   ✓ Knowledge shared: {success}")
    
    # Insight synthesis
    print("\n💡 Synthesizing insights...")
    insight = await bridge.synthesize_insight("creativity")
    print(f"   Topic: {insight['topic']}")
    print(f"   Insight: {insight['insight']}")
    print(f"   Confidence: {insight['confidence']:.2%}")
    
    # Agent stats
    print("\n📊 Agent knowledge statistics:")
    for agent_id, agent in agents.items():
        stats = await agent.stats()
        print(f"   {agent_id}: {stats['memories']} memories, {len(stats['knowledge_domains'])} domains")
    
    # Export
    print("\n💾 Exporting knowledge base...")
    markdown_export = bridge.export_knowledge("markdown")
    print(f"   Export size: {len(markdown_export)} characters")
    print(f"   Preview:\n{markdown_export[:500]}...")
    
    print("\n✅ InfoGenius-Arcanea Integration: ACTIVE")
    print("   Agents now learn, remember, and reason through knowledge!")

if __name__ == "__main__":
    asyncio.run(main())
