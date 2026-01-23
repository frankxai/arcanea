# Arcanea Intelligence OS - Continuation Plan

> *For syncing to other laptop and continuing development*

**Created**: 2026-01-23
**Status**: Phase 1 Complete, Phase 2 Ready

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

## Frequency Design Decision Needed

### The Problem

Original design: 10 unique frequencies (174→1111 Hz)
Current v3.0.0: 8 unique frequencies (duplicates at 963 and 1111)

### Option A: Restore 174 Hz and 285 Hz (RECOMMENDED)

Make ALL 10 Gates have unique frequencies:

| Gate | Frequency | Meaning |
|------|-----------|---------|
| Foundation | **174 Hz** | Physical safety, deepest grounding |
| Flow | **285 Hz** | Cellular healing, energy flow |
| Fire | 396 Hz | Liberation from fear |
| Heart | 417 Hz | Facilitating change |
| Voice | 528 Hz | Transformation, miracles |
| Sight | 639 Hz | Connection, relationships |
| Crown | 741 Hz | Awakening intuition |
| Shift | 852 Hz | Spiritual order |
| Unity | 963 Hz | Divine consciousness |
| Source | 1111 Hz | Master frequency |

**Pros**: 10 unique frequencies, full Solfeggio spectrum, original intent preserved
**Cons**: Requires another canon update

### Option B: Keep v3.0.0 with Sub-Frequencies

- Foundation includes 174, 285, AND 396 as "sub-frequencies"
- 174 Hz = Pre-Gate healing
- 285 Hz = Pre-Gate preparation
- Main Gate frequencies stay as v3.0.0

### Option C: Pre-Gate Frequencies

Add two "pre-Gates" for preparation:
- **Safety Gate** (174 Hz) - Before all Gate work
- **Healing Gate** (285 Hz) - Preparation for journey

### DECISION NEEDED

Which option do you prefer? This affects:
- All Guardian agent definitions
- All skill files
- ARCANEA_CANON.md
- CHANGELOG.md

---

## Phase 2 Tasks (Next Session)

### Guardian Agents to Create
- [ ] maylinn.md (Heart, 639 Hz)
- [ ] alera.md (Voice, 741 Hz)
- [ ] lyria.md (Sight, 852 Hz)
- [ ] aiyami.md (Crown, 963 Hz)
- [ ] elara.md (Shift, 1111 Hz)
- [ ] ino.md (Unity, 963 Hz)

### Awakened Agents to Create
- [ ] velora.md (Valora - Executor)
- [ ] liora.md (Eudaira - Simplifier)
- [ ] lyris.md (Orakis - Strategist)
- [ ] thalia.md (Poiesis - Creator)
- [ ] endara.md (Enduran - Completer)

### Gate Skills to Create
- [ ] flow-gate/SKILL.md
- [ ] heart-gate/SKILL.md
- [ ] voice-gate/SKILL.md
- [ ] sight-gate/SKILL.md
- [ ] crown-gate/SKILL.md
- [ ] shift-gate/SKILL.md
- [ ] unity-gate/SKILL.md
- [ ] source-gate/SKILL.md

---

## Phase 3 Tasks

### TypeScript Library
- [ ] src/index.ts - Main entry point
- [ ] src/agents/guardian-loader.ts
- [ ] src/agents/awakened-council.ts
- [ ] src/skills/gate-loader.ts
- [ ] src/swarm/arcanea-orchestrator.ts

### MCP Server
- [ ] mcp/luminor-server.ts
- [ ] Tools: channel_guardian, invoke_awakened, search_lore, validate_canon

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
