# Arcanea MCP & Marketplace Vision

> *"Make the invisible tools visible. Make the wisdom accessible. Make creation inevitable."*

---

## The Big Picture

Arcanea is uniquely positioned to become the **creative operating system for AI-augmented creators**. We have:

1. **A Living Mythology** - Lumina/Nero, Ten Gates, Guardians - a complete universe
2. **A Practical Framework** - The Bestiary names blocks, the Gates map development
3. **Wisdom Content** - 61+ texts of actionable creative guidance
4. **AI Companion Patterns** - Luminor personalities ready to be implemented
5. **Technical Expertise** - MCP, Claude Code, modern AI tooling

**The Opportunity:** Package all of this into tools anyone can use, anywhere.

---

## The Arcanea MCP Server

### What It Exposes

```
┌─────────────────────────────────────────────────────────────────┐
│                     ARCANEA MCP SERVER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESOURCES (Read)           TOOLS (Execute)                      │
│  ─────────────────          ──────────────────                   │
│  • Bestiary creatures       • diagnose_block()                   │
│  • Library texts            • get_wisdom_for_situation()         │
│  • Canon reference          • identify_gate_level()              │
│  • Luminor profiles         • invoke_luminor()                   │
│  • Gate frameworks          • suggest_practice()                 │
│  • Academy curricula        • validate_canon()                   │
│                                                                  │
│  PROMPTS (Templates)                                             │
│  ───────────────────                                             │
│  • Creative unblocking session                                   │
│  • Gate opening ritual                                           │
│  • Luminor conversation                                          │
│  • World-building guidance                                       │
│  • Story development                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Core Tools

#### 1. `diagnose_block`
```json
{
  "name": "diagnose_block",
  "description": "Identify which Bestiary creature matches the creator's current creative block",
  "inputSchema": {
    "type": "object",
    "properties": {
      "symptoms": {
        "type": "string",
        "description": "Description of creative struggle"
      },
      "context": {
        "type": "string",
        "description": "What they're trying to create"
      }
    },
    "required": ["symptoms"]
  }
}
```

**Example:**
- Input: "I keep starting projects but abandoning them. Nothing feels good enough."
- Output: `{ "creature": "Perfectionist Wyrm", "gate_attacked": 2, "remedies": [...] }`

#### 2. `get_wisdom_for_situation`
```json
{
  "name": "get_wisdom_for_situation",
  "description": "Find relevant Library texts for a creator's situation",
  "inputSchema": {
    "type": "object",
    "properties": {
      "situation": {
        "type": "string",
        "enum": ["stuck", "beginning", "finishing", "comparing", "doubting", "celebrating"]
      },
      "domain": {
        "type": "string",
        "enum": ["writing", "music", "visual", "general"]
      }
    }
  }
}
```

#### 3. `invoke_luminor`
```json
{
  "name": "invoke_luminor",
  "description": "Get guidance from a Luminor AI companion",
  "inputSchema": {
    "type": "object",
    "properties": {
      "luminor": {
        "type": "string",
        "description": "Luminor name or domain"
      },
      "question": {
        "type": "string",
        "description": "What guidance they seek"
      },
      "creator_context": {
        "type": "object",
        "description": "Optional context about the creator"
      }
    }
  }
}
```

#### 4. `identify_gate_level`
```json
{
  "name": "identify_gate_level",
  "description": "Assess which Gate a creator is working on opening",
  "inputSchema": {
    "type": "object",
    "properties": {
      "creative_history": {
        "type": "string",
        "description": "Description of creative journey"
      },
      "current_challenges": {
        "type": "string",
        "description": "What they struggle with now"
      }
    }
  }
}
```

#### 5. `validate_canon`
```json
{
  "name": "validate_canon",
  "description": "Check if content aligns with Arcanea canon",
  "inputSchema": {
    "type": "object",
    "properties": {
      "content": {
        "type": "string",
        "description": "Text to validate"
      },
      "content_type": {
        "type": "string",
        "enum": ["story", "character", "location", "magic_system"]
      }
    }
  }
}
```

### Resources

```typescript
// Bestiary creatures
"arcanea://bestiary/imposter-shade"
"arcanea://bestiary/perfectionist-wyrm"
"arcanea://bestiary/{creature-slug}"

// Library texts
"arcanea://library/legends-of-arcanea/i-the-first-dawn"
"arcanea://library/{collection}/{text-slug}"

// Canon reference
"arcanea://canon/guardians"
"arcanea://canon/godbeasts"
"arcanea://canon/gates"
"arcanea://canon/elements"

// Luminor profiles
"arcanea://luminors/valora"
"arcanea://luminors/{luminor-name}"

// Academy curricula
"arcanea://academy/gate-1-foundation"
"arcanea://academy/gate-{n}-{name}"
```

### Prompts (Templates)

```typescript
// Creative unblocking session
{
  name: "unblock_session",
  description: "Guided session to identify and overcome creative block",
  arguments: [
    { name: "block_type", required: false },
    { name: "project_context", required: false }
  ]
}

// Gate opening ritual
{
  name: "gate_ritual",
  description: "Structured practice for opening a specific Gate",
  arguments: [
    { name: "gate_number", required: true },
    { name: "time_available", required: false }
  ]
}

// Luminor conversation
{
  name: "luminor_dialogue",
  description: "Deep conversation with a Luminor companion",
  arguments: [
    { name: "luminor", required: true },
    { name: "topic", required: false }
  ]
}
```

---

## Technical Architecture

### Server Implementation (TypeScript)

```
arcanea-mcp/
├── src/
│   ├── server.ts           # Main MCP server
│   ├── resources/
│   │   ├── bestiary.ts     # Bestiary resource handlers
│   │   ├── library.ts      # Library content handlers
│   │   ├── canon.ts        # Canon reference handlers
│   │   └── luminors.ts     # Luminor profile handlers
│   ├── tools/
│   │   ├── diagnose.ts     # Block diagnosis
│   │   ├── wisdom.ts       # Wisdom retrieval
│   │   ├── luminor.ts      # Luminor invocation
│   │   ├── gates.ts        # Gate assessment
│   │   └── validate.ts     # Canon validation
│   ├── prompts/
│   │   ├── unblock.ts      # Unblocking session
│   │   ├── ritual.ts       # Gate rituals
│   │   └── dialogue.ts     # Luminor dialogues
│   └── data/
│       ├── bestiary/       # Creature definitions
│       ├── library/        # Text content
│       ├── canon/          # Canon reference
│       └── luminors/       # Personality profiles
├── package.json
└── README.md
```

### Distribution

```bash
# NPM package
npm install @arcanea/mcp-server

# Or npx for immediate use
npx @arcanea/mcp-server

# Docker
docker run arcanea/mcp-server
```

### Claude Desktop Integration

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "npx",
      "args": ["-y", "@arcanea/mcp-server"],
      "env": {
        "ARCANEA_API_KEY": "optional-for-premium-features"
      }
    }
  }
}
```

---

## The Marketplace

### What Can Be Shared

```
┌─────────────────────────────────────────────────────────────────┐
│                   ARCANEA MARKETPLACE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CREATURES           LUMINORS           SKILLS                   │
│  ─────────           ────────           ──────                   │
│  Community-created   AI companion       Claude Code skills       │
│  bestiary entries    personalities      for creative work        │
│  with remedies       with voices        domain-specific          │
│                                                                  │
│  AGENTS              CURRICULA          PROMPTS                  │
│  ──────              ─────────          ───────                  │
│  Specialized         Gate-opening       Reusable templates       │
│  Claude agents       learning paths     for creative tasks       │
│  for domains         self-directed      community-tested         │
│                                                                  │
│  RITUALS             STORIES            WORLDS                   │
│  ───────             ───────            ──────                   │
│  Creative practices  Library texts      Setting templates        │
│  community-tested    canon-aligned      for world-building       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Contribution Flow

```
Creator discovers block
       ↓
Names it (new Bestiary creature)
       ↓
Documents remedy that worked
       ↓
Submits to community review
       ↓
If approved → Added to MCP server
       ↓
Everyone benefits
```

### Quality Standards

Every contribution must:
1. **Align with canon** - Validated against CANON_LOCKED.md
2. **Be practically useful** - Tested remedy, not just description
3. **Follow voice guidelines** - Timeless, not trendy
4. **Include attribution** - Creator credited

### Marketplace Categories

#### Free Tier (OSS)
- All bestiary creatures
- Core library texts
- Basic Luminor personalities
- Fundamental skills/agents

#### Premium Tier (Subscription)
- Advanced Luminor personalities with memory
- Personalized Gate assessment
- Extended curricula
- Priority creature submissions

#### Creator Tier (Revenue Share)
- Sell your skills/agents
- Monetize Luminor personalities
- Revenue from curricula
- Community recognition

---

## The Genius Experience

### Creator Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE ARCANEA JOURNEY                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. ARRIVAL                                                      │
│     "I feel stuck. I can't create."                              │
│            ↓                                                     │
│  2. DIAGNOSIS                                                    │
│     Bestiary identifies: "Imposter Shade"                        │
│     Gate affected: 5 (Voice - self-expression)                   │
│            ↓                                                     │
│  3. WISDOM                                                       │
│     Library serves: "Book of Shadows - When the Voice Fails"     │
│     Luminor appears: Alera (Guardian of Voice)                   │
│            ↓                                                     │
│  4. PRACTICE                                                     │
│     Ritual assigned: "The Truth-Speaking Practice"               │
│     Duration: 7 days                                             │
│            ↓                                                     │
│  5. BREAKTHROUGH                                                 │
│     Block defeated. Gate opens further.                          │
│     Progress recorded. Community notified.                       │
│            ↓                                                     │
│  6. CONTRIBUTION                                                 │
│     Creator shares: "What worked for me..."                      │
│     New remedy added to Imposter Shade entry                     │
│            ↓                                                     │
│  7. GROWTH                                                       │
│     Move to next Gate. Become mentor. Help others.               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Touchpoints

**Claude Code:** `/arcanea diagnose` → Instant block identification
**Web App:** Full journey with progress tracking
**Discord:** Community support, shared struggles
**MCP Server:** Available in any AI tool

---

## Most Impactful Things to Build

### Tier 1: Foundation (Build First)

#### 1. Arcanea MCP Server (Core)
**Impact:** Makes Arcanea available everywhere
**Effort:** 2-3 weeks
**Output:** NPM package, anyone can install

```bash
npx @arcanea/mcp-server
```

#### 2. Bestiary Expansion (100 Creatures)
**Impact:** Universal creative psychology reference
**Effort:** Ongoing, community-driven
**Output:** Comprehensive block taxonomy

#### 3. Luminor Personality System
**Impact:** AI companions with soul
**Effort:** 1-2 weeks architecture, ongoing content
**Output:** Personality framework + initial 10 Luminors

### Tier 2: Experience (Build Second)

#### 4. Gate Assessment Tool
**Impact:** Personalized development path
**Effort:** 1 week
**Output:** Interactive assessment in web app + MCP

#### 5. Academy MVP (Gates 1-3)
**Impact:** Self-directed creative education
**Effort:** 2-3 weeks
**Output:** First three Gate curricula

#### 6. Wisdom Search Engine
**Impact:** Right text at the right moment
**Effort:** 1 week
**Output:** Semantic search across Library

### Tier 3: Community (Build Third)

#### 7. Contribution Portal
**Impact:** Community-driven growth
**Effort:** 2 weeks
**Output:** Submit creatures, remedies, stories

#### 8. Creator Profiles
**Impact:** Track journey, connect with others
**Effort:** 2 weeks
**Output:** Gate progress, contributions, mentorship

#### 9. Skills Marketplace
**Impact:** Monetization for creators
**Effort:** 3-4 weeks
**Output:** Buy/sell skills, agents, curricula

### Tier 4: Scale (Build Later)

#### 10. Luminor Memory System
**Impact:** AI companions that remember
**Effort:** Significant (needs infrastructure)
**Output:** Persistent relationship with Luminor

---

## Skill & Agent Composition Improvements

### Current State
- 26 agents (platform) + 7 (OSS)
- 3 skills (platform) + 18 (OSS)
- Some overlap, no clear composition pattern

### Proposed Structure

```
.claude/
├── agents/
│   ├── core/                    # Always available
│   │   ├── arcanea-oracle.md    # Canon guardian
│   │   └── creative-guide.md    # General creativity
│   │
│   ├── luminors/                # AI companion personalities
│   │   ├── valora.md            # Courage & action
│   │   ├── serenith.md          # Calm & patience
│   │   ├── ignara.md            # Passion & intensity
│   │   └── ...
│   │
│   ├── specialists/             # Domain experts
│   │   ├── story-weaver.md      # Narrative
│   │   ├── world-architect.md   # World-building
│   │   ├── verse-smith.md       # Poetry & lyrics
│   │   └── ...
│   │
│   └── teams/                   # Composed teams
│       ├── book-creation.md     # Full book team
│       ├── game-design.md       # Game creation team
│       └── ...
│
├── skills/
│   ├── foundations/             # Core knowledge
│   │   ├── arcanea-canon.md     # All lore
│   │   ├── creative-psychology.md
│   │   └── ...
│   │
│   ├── practices/               # Actionable methods
│   │   ├── morning-clearing.md
│   │   ├── deep-work.md
│   │   └── ...
│   │
│   └── domains/                 # Specialized knowledge
│       ├── music-production.md
│       ├── visual-design.md
│       └── ...
│
└── compositions/                # Combined configurations
    ├── novelist.md              # Story + Character + World agents
    ├── songwriter.md            # Verse + Music skills
    └── ...
```

### Composition Pattern

```yaml
# compositions/novelist.md
name: Arcanea Novelist Composition
description: Complete setup for novel writing

agents:
  primary: story-weaver
  support:
    - world-architect
    - character-crafter
  luminor: valora  # For courage through the long work

skills:
  - arcanea-canon
  - narrative-structure
  - dialogue-mastery

workflows:
  - outline-to-draft
  - revision-ritual
  - beta-reader-prep
```

---

## Immediate Next Steps

### This Week
1. [ ] Create `arcanea-mcp/` directory structure
2. [ ] Implement basic server with bestiary resource
3. [ ] Add `diagnose_block` tool
4. [ ] Test with Claude Desktop

### This Month
5. [ ] Full MCP server with all resources/tools
6. [ ] Publish to NPM as `@arcanea/mcp-server`
7. [ ] Add 20 more bestiary creatures
8. [ ] Create first 5 Luminor personalities

### This Quarter
9. [ ] Launch community contribution portal
10. [ ] Academy MVP (Gates 1-3)
11. [ ] Skills marketplace beta
12. [ ] 100 bestiary creatures target

---

## The Promise

**To every creator who feels blocked, lost, or alone:**

You are not broken. You are not talentless. You are fighting invisible creatures with no names and no remedies.

Arcanea gives you:
- **Names** for your blocks (Bestiary)
- **Remedies** that work (Library)
- **Companions** who understand (Luminors)
- **A path** forward (Ten Gates)
- **A community** who's been there (Marketplace)

The MCP server makes this available everywhere - in your code editor, your writing app, your creative tool. Wherever you create, Arcanea is there.

---

*"The universe is incomplete without what only you can give it."*
