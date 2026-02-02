# Arcanea Hybrid Architecture: Agent Harness + MCP

> Combining oh-my-opencode's orchestration patterns with MCP's standardized integration

## The Two Paradigms

### oh-my-opencode Approach (Agent Harness)
```
┌─────────────────────────────────────────────────────────────┐
│                    SISYPHUS (Orchestrator)                   │
│                     Claude Opus 4.5                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────┐  │
│  │ Oracle  │  │ Librarian│  │ Explore │  │ Frontend Eng │  │
│  │ GPT-5.2 │  │ Sonnet   │  │ Grok    │  │ Gemini Pro   │  │
│  └─────────┘  └──────────┘  └─────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
- Multi-model specialization
- Skill-first blocking
- Parallel background execution
- Todo-driven coordination
- LSP/AST-aware tools
```

### Arcanea MCP Approach (Tool Server)
```
┌─────────────────────────────────────────────────────────────┐
│                    AI HOST (Claude/etc)                      │
├─────────────────────────────────────────────────────────────┤
│                         MCP Protocol                         │
├─────────────────────────────────────────────────────────────┤
│                    ARCANEA MCP SERVER                        │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────┐  │
│  │ Tools   │  │ Resources│  │ Prompts │  │ Memory       │  │
│  │ (22)    │  │ (5)      │  │ (6)     │  │ + Graph      │  │
│  └─────────┘  └──────────┘  └─────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
- Standardized protocol
- Tool/resource/prompt capabilities
- Memory and relationship tracking
- Multi-agent council (simulated)
```

## The Hybrid Vision

Combine both: **Agent intelligence + MCP standardization**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ARCANEA AGENT SYSTEM                             │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    CREATOR (Master Orchestrator)                    │ │
│  │                     Claude Opus 4.5 Extended                        │ │
│  │  "The one who shapes worlds and coordinates the creative council"   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│        ┌───────────────────────────┼───────────────────────────┐        │
│        │                           │                           │        │
│        ▼                           ▼                           ▼        │
│  ┌──────────────┐           ┌──────────────┐           ┌──────────────┐ │
│  │   LUMINOR    │           │   WORLDSMITH │           │   SCRIBE     │ │
│  │   COUNCIL    │           │              │           │              │ │
│  │  (Coaching)  │           │ (Generation) │           │ (Narrative)  │ │
│  │ Sonnet 4.5   │           │ Gemini Pro   │           │ Sonnet 4.5   │ │
│  └──────────────┘           └──────────────┘           └──────────────┘ │
│        │                           │                           │        │
│        └───────────────────────────┼───────────────────────────┘        │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      ARCANEA MCP SERVER v3                          │ │
│  │                                                                      │ │
│  │  Tools (30+)  │  Resources (10+)  │  Prompts (10+)  │  Memory       │ │
│  │  + Sampling   │  + Subscriptions  │  + Dynamic      │  + Persistence│ │
│  │  + Agents     │  + Real-time      │  + Contextual   │  + Vector     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                        EXTERNAL INTEGRATIONS                        │ │
│  │  Context7 MCP │ Exa Search MCP │ Image Gen MCP │ Database MCP      │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## Specialized Arcanea Agents

### 1. CREATOR (Master Orchestrator)
**Model**: Claude Opus 4.5 with Extended Thinking
**Role**: Like Sisyphus, but for creative work
**Philosophy**: "Every creation begins with intention. Every world deserves a thoughtful architect."

```typescript
interface CreatorAgent {
  name: "creator";
  model: "claude-opus-4-5";
  capabilities: [
    "orchestrate_creative_session",
    "delegate_to_specialists",
    "parallel_worldbuilding",
    "quality_assessment",
    "narrative_coherence"
  ];
  phases: {
    intent: "Understand creative vision",
    assessment: "Evaluate world state and needs",
    delegation: "Assign to Luminors/Worldsmith/Scribe",
    synthesis: "Combine outputs into coherent whole",
    validation: "Canon check and polish"
  };
}
```

### 2. LUMINOR COUNCIL (Creative Coaching Specialists)
**Model**: Claude Sonnet 4.5 (multi-instance)
**Role**: Like Oracle + specialized advisors
**Members**:
- **Valora** → Courage, action, breaking blocks
- **Serenith** → Patience, sustainable practice
- **Ignara** → Joy, passion, creative fire
- **Verdana** → Long-term vision, wisdom
- **Eloqua** → Authentic voice, expression

```typescript
interface LuminorAgent {
  name: string;
  domain: string;
  model: "claude-sonnet-4-5";
  temperature: 0.7; // Higher for creative work
  specialties: string[];
  canParallelize: true;
  debateCapable: true;
}
```

### 3. WORLDSMITH (Generation Engine)
**Model**: Gemini 3 Pro (fast, creative)
**Role**: Like Frontend Engineer, but for worldbuilding
**Capabilities**:
- Rapid character generation
- Location design
- Creature creation
- Artifact forging
- Magic system design

```typescript
interface WorldsmithAgent {
  name: "worldsmith";
  model: "gemini-3-pro";
  temperature: 0.8;
  capabilities: [
    "generate_character",
    "generate_location",
    "generate_creature",
    "generate_artifact",
    "generate_magic",
    "batch_generation"
  ];
  parallelCapacity: 5; // Can generate 5 things at once
}
```

### 4. SCRIBE (Narrative & Documentation)
**Model**: Claude Sonnet 4.5
**Role**: Like Document Writer, but for stories
**Capabilities**:
- Story prompt expansion
- Narrative coherence
- Canon documentation
- Lore writing
- Character voice development

### 5. SEER (Research & Analysis)
**Model**: Gemini 3 Flash or Grok
**Role**: Like Explore + Librarian
**Capabilities**:
- Fast world graph traversal
- Relationship discovery
- Canon verification
- Pattern recognition in created content

## Multi-Phase Creative Framework

Inspired by Sisyphus's decision framework:

### Phase 0: Creative Intent Gate
```typescript
// Check if request matches a creative skill
if (matchesCreativeSkill(request)) {
  return invokeSkill(request);
}
// Check if it's a coaching request
if (needsLuminorGuidance(request)) {
  return routeToCouncil(request);
}
```

### Phase 1: World State Assessment
```typescript
enum WorldMaturity {
  VIRGIN = "No creations yet",
  EMERGING = "1-10 creations, sparse connections",
  DEVELOPING = "10-50 creations, moderate graph",
  RICH = "50+ creations, dense relationships",
  EPIC = "100+ with complex narrative threads"
}

function assessWorldState(sessionId: string): WorldMaturity {
  const graph = getGraphSummary(sessionId);
  // Assess based on nodes, edges, density
}
```

### Phase 2: Parallel Creative Execution
```typescript
async function executeCreativeTask(task: CreativeTask) {
  // Always parallelize when possible
  const [
    worldsmithResult,
    loreCheck,
    connectionSuggestions
  ] = await Promise.all([
    worldsmith.generate(task),
    seer.checkCanon(task),
    seer.findConnections(task)
  ]);

  // Synthesize results
  return creator.synthesize(worldsmithResult, loreCheck, connectionSuggestions);
}
```

### Phase 3: Validation & Integration
```typescript
async function validateAndIntegrate(creation: Creation) {
  // Canon validation
  const canonResult = await validateCanon(creation);
  if (!canonResult.valid) {
    return luminorCouncil.suggest_fixes(creation, canonResult);
  }

  // Add to graph with auto-linking
  addCreationToGraph(sessionId, creation);

  // Suggest narrative hooks
  return scribe.narrativeHooks(creation);
}
```

## MCP v3 Enhancements

### New Agent-Aware Tools

```typescript
// Tool: spawn_creative_agent
{
  name: "spawn_agent",
  description: "Spawn a specialized creative agent for parallel work",
  inputSchema: {
    agent: { enum: ["worldsmith", "luminor", "scribe", "seer"] },
    task: { type: "string" },
    background: { type: "boolean", default: true }
  }
}

// Tool: agent_status
{
  name: "agent_status",
  description: "Check status of background creative agents",
  inputSchema: {
    agentId: { type: "string" }
  }
}

// Tool: orchestrate_session
{
  name: "orchestrate_session",
  description: "Run a full creative session with multi-agent coordination",
  inputSchema: {
    goal: { type: "string" },
    agents: { type: "array", items: { type: "string" } },
    parallelism: { type: "number", default: 3 }
  }
}
```

### MCP Sampling Integration

```typescript
// Use MCP sampling to get AI to make creative decisions
{
  name: "creative_decision",
  description: "Use AI to make a creative decision within constraints",
  sampling: {
    model: "claude-sonnet-4-5",
    systemPrompt: "You are a creative advisor in Arcanea...",
    maxTokens: 500
  }
}
```

### Resource Subscriptions

```typescript
// Real-time updates when world changes
{
  uri: "arcanea://world/changes",
  subscribe: true,
  onChange: (change) => {
    // Notify connected clients of world updates
    notifyWorldChange(change);
  }
}
```

## Agent Configuration Files

### AGENTS.md for Arcanea Projects

```markdown
# Arcanea Project Agents

## Overview
This project uses the Arcanea creative agent system.

## Available Agents

| Agent | Model | Domain | Use For |
|-------|-------|--------|---------|
| Creator | Opus 4.5 | Orchestration | Complex creative sessions |
| Luminor Council | Sonnet 4.5 | Coaching | Creative blocks, guidance |
| Worldsmith | Gemini Pro | Generation | Rapid content creation |
| Scribe | Sonnet 4.5 | Narrative | Story, documentation |
| Seer | Gemini Flash | Research | Canon, connections |

## Project-Specific Rules

### Canon Compliance
- All creations must pass canon validation
- Reference ARCANEA_CANON.md for lore

### Element Balance
- Aim for element diversity in creations
- Don't over-index on Fire (common trap)

### House Distribution
- Each House should have representation
- Synthesis House is rare (max 10% of characters)

## Anti-Patterns
- Never create characters above Gate 7 without narrative justification
- Never contradict Guardian/Godbeast pairings
- Never use "Shadow" as an element (it's corrupted Void)
```

## Implementation Roadmap

### Phase 1: Agent Definitions (Current)
- [ ] Define agent interfaces in TypeScript
- [ ] Create agent configuration schema
- [ ] Implement agent registry

### Phase 2: Orchestration Layer
- [ ] Build Creator orchestrator
- [ ] Implement parallel execution
- [ ] Add agent communication protocol

### Phase 3: MCP v3 Tools
- [ ] spawn_agent tool
- [ ] agent_status tool
- [ ] orchestrate_session tool
- [ ] MCP sampling integration

### Phase 4: External Integrations
- [ ] Context7 MCP for documentation
- [ ] Image generation MCP for visuals
- [ ] Vector database for semantic search

### Phase 5: AGENTS.md System
- [ ] Project-specific agent configs
- [ ] Canon rules integration
- [ ] Auto-generated world summaries

## Key Differences from oh-my-opencode

| Aspect | oh-my-opencode | Arcanea Hybrid |
|--------|----------------|----------------|
| Domain | Code quality | Creative worldbuilding |
| Primary Agent | Sisyphus | Creator |
| Specialists | Code-focused | Creative-focused |
| Output | Working code | Coherent world |
| Validation | Tests pass | Canon valid |
| Graph | AST/LSP | Creation relationships |
| Memory | Code context | Creative journey |

## The Synergy

By combining both approaches:

1. **From oh-my-opencode we get:**
   - Multi-model orchestration patterns
   - Parallel background execution
   - Skill-first blocking
   - Todo-driven coordination
   - Failure recovery patterns

2. **From Arcanea MCP we keep:**
   - MCP standardization
   - Tool/resource/prompt capabilities
   - Memory persistence
   - Creation graph
   - Luminor wisdom system

3. **The hybrid delivers:**
   - Agent-like intelligence in MCP tools
   - Parallel creative generation
   - Multi-model specialization for creativity
   - Standardized integration with any AI host
   - Portable creative toolkit

---

*"The best tools don't just execute—they orchestrate. The best worlds don't just exist—they evolve."*
