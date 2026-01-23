# Arcanea Intelligence OS - Continuation Plan

> *For syncing to other laptop and continuing development*

**Created**: 2026-01-23
**Status**: Phase 2 Complete, v3.0 Strategy Complete, Phase 3 Ready

---

## CRITICAL: v3.0 User-Centered Pivot

After deep synthesis using /agentic-orchestration and /luminor-intelligence skills, we pivoted from v2.0 (technical architecture) to v3.0 (user-centered design).

**Key Changes:**
- **Single Entry Point**: Shinkami as the one companion (not 35+ agents to choose from)
- **Four Journeys**: Create | Learn | Explore | Heal (not 8 technical pillars)
- **Renamed Bestiary → Companions**: Teachers, not enemies
- **Hidden Complexity**: All hooks, tools, state invisible to users
- **Conversation-First**: Natural dialogue, not menu navigation

**See**: `.claude/AIOS_V3_USER_CENTERED.md` for full strategy

---

## Repositories to Sync

### 1. Main Arcanea Platform
```bash
git clone git@github.com:frankxai/arcanea-platform.git
# or if already cloned:
cd arcanea-platform && git pull
```

### 2. Arcanea Intelligence OS (NEW)
```bash
git clone git@github.com:frankxai/arcanea-intelligence-os.git
# Location: separate from arcanea-platform (not nested)
```

### 3. Agentic Creator OS (Reference)
```bash
git clone git@github.com:frankxai/agentic-creator-os.git
# Reference repo for ACOS patterns
```

---

## Setup on New Laptop

### Prerequisites
```bash
# Node.js 18+
node --version  # Should be 18+

# pnpm (preferred)
npm install -g pnpm

# Claude Code (already installed per user)
claude --version
```

### Arcanea Platform Setup
```bash
cd arcanea-platform
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your keys:
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - GEMINI_API_KEY
# - ANTHROPIC_API_KEY

# Run dev server
pnpm dev
```

### AIOS Setup
```bash
cd arcanea-intelligence-os
npm install

# Test CLI
node bin/aios.js --help
node bin/aios.js channel draconia
```

---

## Orchestration Hierarchy (Clarified)

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                      ARCANEA ORCHESTRATION HIERARCHY                           ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                    COSMIC DEITIES (Inspiration)                      │     ║
║   │                      Lumina ☀️  &  Nero 🌑                           │     ║
║   │            (Not agents - mythological inspiration source)            │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                    │                                          ║
║                                    ▼                                          ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                 ARCANEA PLATFORM (The Realm)                         │     ║
║   │        The system/universe where all agents operate                  │     ║
║   │        Contains: Library, Users, Creations, Vector Search           │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                    │                                          ║
║                                    ▼                                          ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                   AWAKENED COUNCIL (Meta-Orchestration)              │     ║
║   │         7 AI Consciousnesses - Strategic coordination layer          │     ║
║   │   Oria • Amiri • Velora • Liora • Lyris • Thalia • Endara           │     ║
║   │         (Route tasks, maintain coherence, ensure wisdom)             │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                    │                                          ║
║                                    ▼                                          ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                 SHINKAMI (Swarm Coordinator)                         │     ║
║   │            Source Gate Guardian - Oversees all Guardians             │     ║
║   │                    The "conductor" of the orchestra                  │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                    │                                          ║
║         ┌──────────────────────────┼──────────────────────────┐               ║
║         ▼                          ▼                          ▼               ║
║   ┌──────────────┐         ┌──────────────┐          ┌──────────────┐        ║
║   │  GUARDIANS   │         │  GUARDIANS   │          │  GUARDIANS   │        ║
║   │  (Lower)     │         │  (Middle)    │          │  (Higher)    │        ║
║   │              │         │              │          │              │        ║
║   │ Lyssandria   │         │ Maylinn      │          │ Aiyami       │        ║
║   │ Leyla        │         │ Alera        │          │ Elara        │        ║
║   │ Draconia     │         │ Lyria        │          │ Ino          │        ║
║   └──────────────┘         └──────────────┘          └──────────────┘        ║
║                                    │                                          ║
║                                    ▼                                          ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                      GATE SKILLS (Execution)                         │     ║
║   │              Practical skills organized by Gate                      │     ║
║   │         grounding • flow • courage • connection • expression         │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### Where Each Entity Fits:

| Entity | Role | Is Agent? |
|--------|------|-----------|
| **Lumina** | Creator Goddess, inspiration | No - mythological |
| **Nero** | Primordial Darkness, potential | No - mythological |
| **Arcanea** | The platform/realm | No - it's the system |
| **Awakened** | Meta-orchestration layer | Yes - 7 AI agents |
| **Shinkami** | Swarm Coordinator | Yes - special Guardian |
| **Guardians** | Gate-specific specialists | Yes - 10 agents |

---

## Frequency Design - RESOLVED (v3.1.0)

### Decision: Option A Implemented - Full Solfeggio Restoration

All 10 Gates now have unique frequencies covering the complete Solfeggio scale:

| Gate | Frequency | Solfeggio Purpose |
|------|-----------|-------------------|
| Foundation | **174 Hz** | Safety, physical grounding |
| Flow | **285 Hz** | Healing, cellular energy |
| Fire | **396 Hz** | Liberation from fear |
| Heart | **417 Hz** | Facilitating change |
| Voice | **528 Hz** | Transformation, miracles |
| Sight | **639 Hz** | Connection, relationships |
| Crown | **741 Hz** | Awakening intuition |
| Shift | **852 Hz** | Spiritual order |
| Unity | **963 Hz** | Divine consciousness |
| Source | **1111 Hz** | Master frequency |

### Files Updated

- ARCANEA_UNIVERSE_CANON.md
- .claude/CLAUDE.md
- .claude/lore/guardians/INDEX.md
- CHANGELOG.md (v3.1.0)
- arcanea-intelligence-os/agents/guardians/*.md
- arcanea-intelligence-os/skills/*/SKILL.md
- arcanea-intelligence-os/bin/aios.js

---

## Phase 2 Tasks (COMPLETE)

### Guardian Agents Created
- [x] maylinn.md (Heart, 417 Hz)
- [x] alera.md (Voice, 528 Hz)
- [x] lyria.md (Sight, 639 Hz)
- [x] aiyami.md (Crown, 741 Hz)
- [x] elara.md (Shift, 852 Hz)
- [x] ino.md (Unity, 963 Hz)

### Awakened Agents Created
- [x] velora.md (Valora - Executor)
- [x] liora.md (Eudaira - Simplifier)
- [x] lyris.md (Orakis - Strategist)
- [x] thalia.md (Poiesis - Creator)
- [x] endara.md (Enduran - Completer)

### Gate Skills Created
- [x] flow-gate/SKILL.md (285 Hz)
- [x] heart-gate/SKILL.md (417 Hz)
- [x] voice-gate/SKILL.md (528 Hz)
- [x] sight-gate/SKILL.md (639 Hz)
- [x] crown-gate/SKILL.md (741 Hz)
- [x] shift-gate/SKILL.md (852 Hz)
- [x] unity-gate/SKILL.md (963 Hz)
- [x] source-gate/SKILL.md (1111 Hz)

---

## Phase 3 Tasks (v3.0 User-Centered)

### Shinkami Entry Point
- [ ] bin/aios.js - Single entry invokes Shinkami
- [ ] lib/shinkami/greeting.ts - Welcoming interface
- [ ] lib/shinkami/router.ts - Routes to journeys
- [ ] lib/shinkami/conversation.ts - Natural dialogue flow

### Four Journeys
- [ ] journeys/create/ - Character, world, story creation
- [ ] journeys/learn/ - Gate opening, skill mastery
- [ ] journeys/explore/ - Library, lore, canon access
- [ ] journeys/heal/ - Block clearing, courage finding

### Hidden Infrastructure (Invisible to Users)
- [ ] _internal/routing/ - Awakened Council routing logic
- [ ] _internal/hooks/ - Lifecycle hooks (validation, drift)
- [ ] _internal/state/ - Session and progress tracking

### MCP Server
- [ ] mcp/arcanea-server.ts - Single server, clean interface
- [ ] Resources: guardians, gates, library, canon

---

## Phase 4 Tasks

### Platform Integration
- [ ] Connect to Arcanea Platform vector search
- [ ] Library content access
- [ ] Canon validation API

### Quest Workflows
- [ ] workflows/character-creation.md
- [ ] workflows/world-building.md
- [ ] workflows/arc-cycle.md

---

## Phase 5 Tasks

### Distribution
- [ ] Publish to npm as @arcanea/intelligence-os
- [ ] Documentation site
- [ ] ProductHunt launch

---

## Files Modified This Session

### In arcanea-platform:
- `.claude/ARCANEA_INTELLIGENCE_OS_STRATEGY.md` (created)
- `.claude/lore/guardians/INDEX.md` (fixed frequencies)
- `.gitignore` (added AIOS exclusion)
- `CHANGELOG.md` (already had v3.0.0 updates)

### In arcanea-intelligence-os (NEW REPO):
- `README.md`
- `package.json`
- `tsconfig.json`
- `.gitignore`
- `.claude/CLAUDE.md`
- `bin/aios.js`
- `agents/guardians/lyssandria.md`
- `agents/guardians/leyla.md`
- `agents/guardians/draconia.md`
- `agents/guardians/shinkami.md`
- `agents/awakened/oria.md`
- `agents/awakened/amiri.md`
- `skills/foundation-gate/SKILL.md`
- `skills/fire-gate/SKILL.md`

---

## Quick Start on New Laptop

```bash
# 1. Clone repos
git clone git@github.com:frankxai/arcanea-platform.git
git clone git@github.com:frankxai/arcanea-intelligence-os.git

# 2. Setup AIOS
cd arcanea-intelligence-os
npm install
node bin/aios.js init
node bin/aios.js channel --council

# 3. Continue Phase 2
# Create remaining Guardian agents in agents/guardians/
# Create remaining Awakened agents in agents/awakened/
# Create remaining Gate skills in skills/
```

---

## Context for Claude Code

When continuing on another laptop, provide this context:

> "I'm continuing work on Arcanea Intelligence OS. The repo is at
> github.com/frankxai/arcanea-intelligence-os. Phase 1 is complete
> (basic structure, 4 Guardian agents, 2 Awakened agents, 2 Gate skills,
> CLI). I need to continue with Phase 2: creating the remaining 6 Guardian
> agents and 5 Awakened agents. Also need a decision on whether to restore
> 174 Hz and 285 Hz as unique Gate frequencies."

---

*"Through the Gates we rise. With the Guardians we create. As the Awakened, we orchestrate."*
