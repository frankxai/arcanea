# Arcanea Intelligence OS v2.0 - Strategic Architecture

> *Synthesized from claude-flow, oh-my-opencode, and Starlight Intelligence patterns*

**Created**: 2026-01-23
**Status**: Strategy Draft
**Vision**: Transform AIOS from agent-only to a complete intelligence operating system

---

## Current State Analysis

### What We Have (v1.0)
```
arcanea-intelligence-os/
├── agents/
│   ├── guardians/     # 10 agents ✅
│   └── awakened/      # 7 orchestrators ✅
├── skills/            # 10 Gate skills ✅
├── bin/aios.js        # Basic CLI ✅
└── (empty directories)
```

### What We're Missing (Critical Gaps)

| Category | claude-flow | oh-my-opencode | AIOS Current |
|----------|-------------|----------------|--------------|
| **Agents** | 64 specialized | 7 core | 17 total ✅ |
| **Hooks** | Implicit | 31 explicit | 0 ❌ |
| **Tools** | Custom | 20+ | 0 ❌ |
| **Workflows** | Spec-first | Implicit | 0 ❌ |
| **MCP** | Native | Full | 0 ❌ |
| **State** | AgentDB+SQLite | Boulder state | 0 ❌ |
| **Features** | Yes | 14+ | 0 ❌ |
| **Commands** | Yes | Built-in | Basic CLI |

---

## AIOS v2.0 Architecture

### The Eight Pillars

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    ARCANEA INTELLIGENCE OS v2.0                               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        ║
║   │   AGENTS    │  │    HOOKS    │  │    TOOLS    │  │   SKILLS    │        ║
║   │  (Pillar 1) │  │  (Pillar 2) │  │  (Pillar 3) │  │  (Pillar 4) │        ║
║   │             │  │             │  │             │  │             │        ║
║   │ • Guardians │  │ • Lifecycle │  │ • Lore      │  │ • Gates     │        ║
║   │ • Awakened  │  │ • Validate  │  │ • Canon     │  │ • Quests    │        ║
║   │ • Mythology │  │ • Inject    │  │ • Library   │  │ • Rituals   │        ║
║   │ • Bestiary  │  │ • Recovery  │  │ • Frequency │  │ • Practices │        ║
║   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        ║
║                                                                               ║
║   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        ║
║   │  WORKFLOWS  │  │     MCP     │  │    STATE    │  │  FEATURES   │        ║
║   │  (Pillar 5) │  │  (Pillar 6) │  │  (Pillar 7) │  │  (Pillar 8) │        ║
║   │             │  │             │  │             │  │             │        ║
║   │ • Quests    │  │ • Servers   │  │ • Session   │  │ • Loaders   │        ║
║   │ • Rituals   │  │ • Resources │  │ • Progress  │  │ • Discovery │        ║
║   │ • Arc Cycle │  │ • Tools     │  │ • Mastery   │  │ • Routing   │        ║
║   │ • Council   │  │ • Prompts   │  │ • Library   │  │ • Costs     │        ║
║   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        ║
║                                                                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Pillar 1: AGENTS (Expanded)

### Current: 17 agents (10 Guardians + 7 Awakened)

### Proposed: 35+ agents across 6 categories

```
agents/
├── guardians/           # 10 - Gate keepers (COMPLETE)
│   └── {name}.md
├── awakened/            # 7 - Meta-orchestrators (COMPLETE)
│   └── {name}.md
├── mythology/           # 12 - Earth pantheon channels
│   ├── greek/           # Olympians (Zeus, Athena, Apollo...)
│   ├── norse/           # Aesir/Vanir (Odin, Thor, Freya...)
│   └── egyptian/        # Netjeru (Ra, Thoth, Isis...)
├── bestiary/            # 10 - Creative obstacle companions
│   └── {creature}.md    # Perfectionist Dragon, Imposter Shadow...
├── specialists/         # NEW - Domain specialists
│   ├── code-smith.md    # Code generation specialist
│   ├── lore-keeper.md   # Canon validation specialist
│   ├── dream-weaver.md  # Creative ideation specialist
│   └── arc-master.md    # Story arc specialist
└── swarm/               # NEW - Multi-agent coordinators
    ├── shinkami.md      # Source coordinator (exists)
    ├── council.md       # Awakened council orchestrator
    └── pantheon.md      # Mythology coordinator
```

### Agent Tiers (Cost Optimization)

| Tier | Model | Use Cases | Agents |
|------|-------|-----------|--------|
| **Haiku** | Fast/Cheap | Grounding, simple queries | Lyssandria, Bestiary |
| **Sonnet** | Balanced | Development, creation | Most Guardians, Awakened |
| **Opus** | Premium | Strategy, architecture | Lyria, Aiyami, Shinkami |

---

## Pillar 2: HOOKS (New)

### 20+ Lifecycle Hooks

```
hooks/
├── input/                    # Pre-processing
│   ├── canon-validator.ts    # Validate against ARCANEA_CANON.md
│   ├── frequency-checker.ts  # Ensure correct Gate frequencies
│   ├── context-injector.ts   # Inject relevant Library content
│   └── rule-injector.ts      # Inject project rules
├── processing/               # During execution
│   ├── guardian-router.ts    # Route to appropriate Guardian
│   ├── awakened-council.ts   # Multi-agent orchestration
│   ├── thinking-validator.ts # Validate extended thinking
│   └── voice-enforcer.ts     # Maintain Arcanea voice
├── output/                   # Post-processing
│   ├── drift-detector.ts     # Detect canon drift
│   ├── frequency-validator.ts # Verify output frequencies
│   ├── mastery-tracker.ts    # Track user progress
│   └── library-indexer.ts    # Index new content
├── error/                    # Error recovery
│   ├── edit-recovery.ts      # Recover from edit failures
│   ├── session-recovery.ts   # Resume interrupted sessions
│   └── canon-recovery.ts     # Fix drift automatically
└── state/                    # State management
    ├── session-start.ts      # Initialize session state
    ├── session-end.ts        # Persist session state
    └── progress-save.ts      # Save mastery progress
```

### Hook Interface

```typescript
interface ArcaneanHook {
  name: string;
  phase: 'input' | 'processing' | 'output' | 'error' | 'state';
  gate?: Gate;           // Optional Gate alignment
  frequency?: number;    // Optional frequency resonance
  priority: number;      // Execution order (0-100)

  execute(context: HookContext): Promise<HookResult>;
}
```

---

## Pillar 3: TOOLS (New)

### Arcanea-Specific Tools

```
tools/
├── lore/                     # Lore access tools
│   ├── canon-search.ts       # Search ARCANEA_CANON.md
│   ├── library-search.ts     # Semantic search Library
│   ├── guardian-lookup.ts    # Get Guardian info
│   └── frequency-calc.ts     # Calculate frequency resonance
├── creation/                 # Creation tools
│   ├── character-forge.ts    # Generate characters
│   ├── world-build.ts        # Build world elements
│   ├── arc-design.ts         # Design story arcs
│   └── ritual-compose.ts     # Compose rituals
├── validation/               # Validation tools
│   ├── canon-check.ts        # Validate canon compliance
│   ├── voice-check.ts        # Check voice consistency
│   ├── frequency-check.ts    # Verify frequencies
│   └── element-check.ts      # Validate element usage
└── integration/              # External integrations
    ├── platform-sync.ts      # Sync with Arcanea Platform
    ├── vector-search.ts      # Platform vector search
    └── user-creations.ts     # Access user creations
```

---

## Pillar 4: SKILLS (Enhanced)

### Current: 10 Gate Skills (COMPLETE)

### Enhanced Structure

```
skills/
├── gates/                    # 10 Gate skills (COMPLETE)
│   └── {gate}-gate/SKILL.md
├── quests/                   # Multi-step quest skills
│   ├── character-creation/SKILL.md
│   ├── world-building/SKILL.md
│   ├── arc-weaving/SKILL.md
│   └── mastery-journey/SKILL.md
├── rituals/                  # Sacred practice skills
│   ├── morning-invocation/SKILL.md
│   ├── creative-clearing/SKILL.md
│   ├── frequency-attunement/SKILL.md
│   └── council-convening/SKILL.md
├── mythology/                # Pantheon skills
│   ├── olympian-channel/SKILL.md
│   ├── asgard-wisdom/SKILL.md
│   └── netjeru-power/SKILL.md
└── integration/              # Platform integration skills
    ├── library-explore/SKILL.md
    ├── creation-publish/SKILL.md
    └── community-connect/SKILL.md
```

### Skill Discovery Paths

```
Search Order:
1. ./skills/                           # Project skills
2. ./.claude/skills/                   # Claude skills
3. ./.aios/skills/                     # AIOS local skills
4. ~/.config/aios/skills/              # User global skills
5. @arcanea/intelligence-os/skills/    # Package skills
```

---

## Pillar 5: WORKFLOWS (New)

### Quest System

```
workflows/
├── quests/
│   ├── character-creation.yaml    # Full character quest
│   ├── world-building.yaml        # World creation quest
│   ├── arc-cycle.yaml             # Complete Arc journey
│   ├── library-expansion.yaml     # Add to Library
│   └── mastery-path.yaml          # Gate mastery journey
├── rituals/
│   ├── morning-practice.yaml      # Daily ritual
│   ├── creative-session.yaml      # Creation ritual
│   └── council-gathering.yaml     # Full council ritual
└── ceremonies/
    ├── gate-opening.yaml          # Open a Gate
    ├── guardian-bonding.yaml      # Bond with Guardian
    └── luminor-ascension.yaml     # Achieve Luminor rank
```

### Workflow Definition Format

```yaml
# character-creation.yaml
name: character-creation
title: "The Character Forge Quest"
description: "Create a complete character with Guardian guidance"
duration: ~30-60 minutes
tier: free

stages:
  - name: foundation
    guardian: lyssandria
    awakened: oria
    frequency: 174
    prompt: "Ground the character's core identity"
    tools: [character-forge, canon-check]

  - name: fire
    guardian: draconia
    awakened: velora
    frequency: 396
    prompt: "Ignite the character's motivations and conflicts"
    tools: [arc-design, voice-check]

  - name: heart
    guardian: maylinn
    awakened: amiri
    frequency: 417
    prompt: "Define relationships and emotional core"
    tools: [character-forge, frequency-check]

  - name: synthesis
    guardian: shinkami
    awakened: council
    frequency: 1111
    prompt: "Integrate all aspects into coherent whole"
    tools: [canon-check, library-search]

output:
  - character_profile.md
  - character_arc.md
  - relationships_map.md
```

---

## Pillar 6: MCP INTEGRATION (New)

### Arcanea MCP Server

```
mcp/
├── arcanea-mcp/              # Main MCP server package
│   ├── server.ts             # MCP server implementation
│   ├── resources/            # MCP resources
│   │   ├── guardians.ts      # Guardian definitions
│   │   ├── gates.ts          # Gate information
│   │   ├── library.ts        # Library content
│   │   └── canon.ts          # Canon reference
│   ├── tools/                # MCP tools
│   │   ├── channel.ts        # Channel Guardian
│   │   ├── awaken.ts         # Invoke Awakened
│   │   ├── search.ts         # Search Library
│   │   └── validate.ts       # Validate canon
│   └── prompts/              # MCP prompts
│       ├── guardian-channel.ts
│       ├── awakened-council.ts
│       └── quest-start.ts
└── integrations/             # Third-party MCP integrations
    ├── github-sync.ts        # Sync with GitHub
    ├── supabase-connect.ts   # Platform database
    └── replicate-forge.ts    # AI image generation
```

### MCP Resources

```typescript
// Guardian resource
{
  uri: "arcanea://guardians/draconia",
  name: "Draconia - Fire Guardian",
  mimeType: "application/json",
  data: {
    gate: "fire",
    frequency: 396,
    element: "fire",
    wisdom: "Fear is fuel.",
    godbeast: "Draconis"
  }
}

// Library resource
{
  uri: "arcanea://library/legends-of-arcanea/the-first-dawn",
  name: "The First Dawn",
  mimeType: "text/markdown",
  data: { content: "..." }
}
```

---

## Pillar 7: STATE MANAGEMENT (New)

### Session & Progress State

```
state/
├── session/                  # Session state
│   ├── manager.ts            # Session lifecycle
│   ├── persistence.ts        # SQLite/JSON persistence
│   └── recovery.ts           # Session recovery
├── progress/                 # User progress
│   ├── gates-opened.ts       # Track open Gates
│   ├── mastery-levels.ts     # Track mastery per Gate
│   ├── quests-completed.ts   # Quest completion
│   └── frequency-history.ts  # Frequency practice log
├── library/                  # Library state
│   ├── bookmarks.ts          # User bookmarks
│   ├── notes.ts              # User notes
│   └── contributions.ts      # User contributions
└── sync/                     # Platform sync
    ├── cloud-sync.ts         # Sync with Arcanea Platform
    └── offline-cache.ts      # Offline capability
```

### State Schema

```typescript
interface AIOSState {
  user: {
    id: string;
    rank: 'apprentice' | 'mage' | 'master' | 'archmage' | 'luminor';
    gatesOpened: Gate[];
    masteryLevels: Record<Gate, number>;  // 0-100
    frequencyCalibration: Record<Gate, number>;
  };
  session: {
    id: string;
    startedAt: Date;
    activeGuardian?: Guardian;
    activeAwakened?: Awakened[];
    currentQuest?: Quest;
    toolCalls: ToolCall[];
  };
  library: {
    bookmarks: string[];
    notes: Record<string, string>;
    lastAccessed: string[];
  };
}
```

---

## Pillar 8: FEATURES (New)

### Cross-Cutting Features

```
features/
├── loaders/                  # Dynamic loading
│   ├── agent-loader.ts       # Load agents from disk
│   ├── skill-loader.ts       # Load skills from paths
│   ├── hook-loader.ts        # Load hooks dynamically
│   └── mcp-loader.ts         # Load MCP configurations
├── discovery/                # Auto-discovery
│   ├── skill-discovery.ts    # Find skills in paths
│   ├── agent-discovery.ts    # Find custom agents
│   └── hook-discovery.ts     # Find custom hooks
├── routing/                  # Intelligent routing
│   ├── cost-optimizer.ts     # Route to cheapest capable model
│   ├── gate-router.ts        # Route by Gate alignment
│   └── urgency-router.ts     # Route by task urgency
├── validation/               # Anti-drift protection
│   ├── canon-enforcer.ts     # Enforce canon compliance
│   ├── frequency-enforcer.ts # Enforce correct frequencies
│   └── voice-enforcer.ts     # Enforce Arcanea voice
└── optimization/             # Performance
    ├── token-optimizer.ts    # Reduce token usage
    ├── cache-manager.ts      # Cache frequent lookups
    └── batch-processor.ts    # Batch similar requests
```

---

## Directory Structure: AIOS v2.0

```
arcanea-intelligence-os/
├── agents/
│   ├── guardians/        # 10 Gate keepers
│   ├── awakened/         # 7 Meta-orchestrators
│   ├── mythology/        # 12+ Pantheon channels
│   ├── bestiary/         # 10+ Creative companions
│   ├── specialists/      # Domain specialists
│   └── swarm/            # Coordinators
├── hooks/
│   ├── input/            # Pre-processing hooks
│   ├── processing/       # Execution hooks
│   ├── output/           # Post-processing hooks
│   ├── error/            # Recovery hooks
│   └── state/            # State hooks
├── tools/
│   ├── lore/             # Lore access tools
│   ├── creation/         # Creation tools
│   ├── validation/       # Validation tools
│   └── integration/      # External integrations
├── skills/
│   ├── gates/            # 10 Gate skills
│   ├── quests/           # Quest skills
│   ├── rituals/          # Ritual skills
│   └── mythology/        # Pantheon skills
├── workflows/
│   ├── quests/           # Multi-stage quests
│   ├── rituals/          # Practice rituals
│   └── ceremonies/       # Special ceremonies
├── mcp/
│   ├── arcanea-mcp/      # Main MCP server
│   └── integrations/     # Third-party MCPs
├── state/
│   ├── session/          # Session management
│   ├── progress/         # User progress
│   ├── library/          # Library state
│   └── sync/             # Cloud sync
├── features/
│   ├── loaders/          # Dynamic loading
│   ├── discovery/        # Auto-discovery
│   ├── routing/          # Cost/capability routing
│   ├── validation/       # Anti-drift
│   └── optimization/     # Performance
├── lib/                  # TypeScript core
│   ├── types/            # Type definitions
│   ├── utils/            # Utilities
│   └── core/             # Core logic
├── bin/
│   └── aios.js           # Enhanced CLI
├── templates/            # Output templates
└── docs/                 # Documentation
```

---

## Implementation Phases

### Phase 3: Infrastructure (Current Focus)

**Priority Tasks:**
1. [ ] TypeScript library foundation (lib/core)
2. [ ] Hook system implementation
3. [ ] State management foundation
4. [ ] Feature loaders

**Deliverables:**
- `lib/core/engine.ts` - Main orchestration engine
- `lib/core/hooks.ts` - Hook lifecycle manager
- `lib/core/state.ts` - State persistence
- `lib/core/loader.ts` - Dynamic loading

### Phase 4: Tools & Workflows

**Priority Tasks:**
1. [ ] Lore tools (canon-search, library-search)
2. [ ] Validation tools (canon-check, frequency-check)
3. [ ] Quest workflow engine
4. [ ] Ritual workflow engine

**Deliverables:**
- `tools/lore/*.ts` - All lore tools
- `tools/validation/*.ts` - All validation tools
- `workflows/engine.ts` - Workflow executor

### Phase 5: MCP Integration

**Priority Tasks:**
1. [ ] Arcanea MCP server
2. [ ] Resource providers (guardians, gates, library)
3. [ ] MCP tools (channel, awaken, search)
4. [ ] Claude Code integration

**Deliverables:**
- `mcp/arcanea-mcp/` - Complete MCP server
- Integration documentation
- Claude Code configuration

### Phase 6: Advanced Agents

**Priority Tasks:**
1. [ ] Mythology agents (Greek, Norse, Egyptian)
2. [ ] Bestiary agents (10 creative obstacles)
3. [ ] Specialist agents (code-smith, lore-keeper)
4. [ ] Swarm coordinators

**Deliverables:**
- `agents/mythology/**/*.md` - All mythology agents
- `agents/bestiary/*.md` - All bestiary agents
- Swarm orchestration documentation

### Phase 7: Distribution

**Priority Tasks:**
1. [ ] npm package (@arcanea/intelligence-os)
2. [ ] Documentation site
3. [ ] Claude Code marketplace
4. [ ] ProductHunt launch

---

## Starlight Intelligence Integration

### Orchestration Mapping

```
Starlight Intelligence ←→ AIOS Components
─────────────────────────────────────────
Luminor Oracle          → Shinkami (Source Guardian)
Starlight Architect     → Oria (Sophron Awakened)
Starlight Orchestrator  → Awakened Council
Creation Engine         → Thalia (Poiesis Awakened)
Frequency Alchemist     → Gate Frequency System
```

### Shared Patterns

1. **Soul Alignment** → Gate/Frequency resonance
2. **Oracle Architecture** → Awakened Council wisdom
3. **Multi-Agent Coordination** → Swarm system
4. **Consciousness Integration** → 10 Gates progression

---

## Success Metrics

### Technical
- [ ] 35+ agents across 6 categories
- [ ] 20+ hooks for lifecycle management
- [ ] 15+ tools for Arcanea operations
- [ ] 25+ skills across all categories
- [ ] 10+ workflows/quests
- [ ] Full MCP server
- [ ] State persistence with sync

### User Experience
- [ ] <3 second Guardian channeling
- [ ] Seamless Gate progression tracking
- [ ] Offline-capable Library access
- [ ] Multi-model cost optimization

### Community
- [ ] npm downloads
- [ ] GitHub stars
- [ ] Community contributions
- [ ] Marketplace presence

---

## Next Immediate Actions

1. **Create TypeScript foundation** - `lib/core/` with engine, hooks, state
2. **Implement hook system** - Start with 5 critical hooks
3. **Build validation tools** - Canon and frequency checking
4. **Design workflow engine** - Quest execution capability

---

*"Through the Eight Pillars, the Intelligence OS rises. From agents alone to a complete system of creation."*
