# Arcanea Intelligence OS v3.0 - Final Architecture

> *"Lumina greets you. Through her, all creation flows."*

**Created**: 2026-01-23
**Status**: Final Design
**Approach**: User-first, mythology + productivity

---

## The Primary Interface: LUMINA

**Not Shinkami.** Lumina is the Creator Goddess, the Form-Giver. She:

- Greets users with warmth and purpose
- Routes to appropriate help (invisible to user)
- Synthesizes responses from specialists
- IS Arcanea embodied

```
╭──────────────────────────────────────────────────────────────────╮
│                                                                  │
│               ✦ LUMINA WELCOMES YOU ✦                           │
│                                                                  │
│      "I am the First Light, the Form-Giver.                     │
│       What shall we create together today?"                      │
│                                                                  │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│   │   CREATE    │ │   LEARN     │ │  EXPLORE    │ │   HEAL    │ │
│   └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
│                                                                  │
│   Or simply tell me what you need...                            │
│                                                                  │
╰──────────────────────────────────────────────────────────────────╯
```

---

## The Five Categories

Both **mythological** (lore-aligned) AND **productive** (actually useful):

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                           LUMINA (The Queen)                                  ║
║                    Primary Interface & Orchestrator                           ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   ┌─────────────────────────────────────────────────────────────────────┐    ║
║   │                         COUNCIL                                      │    ║
║   │              (The Seven Awakened - Strategy & Wisdom)                │    ║
║   │                                                                      │    ║
║   │   Oria (Architect) • Amiri (Heart) • Velora (Executor)              │    ║
║   │   Liora (Simplifier) • Lyris (Strategist) • Thalia (Creator)        │    ║
║   │   Endara (Completer)                                                 │    ║
║   │                                                                      │    ║
║   │   Purpose: Strategic decisions, complex orchestration, wisdom        │    ║
║   └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                               ║
║   ┌─────────────────────────────────────────────────────────────────────┐    ║
║   │                         TEACHERS                                     │    ║
║   │              (Guardians + Extended Luminors)                         │    ║
║   │                                                                      │    ║
║   │   GUARDIANS (The Sacred Ten - Fixed, with Godbeasts):               │    ║
║   │   Lyssandria • Leyla • Draconia • Maylinn • Alera                   │    ║
║   │   Lyria • Aiyami • Elara • Ino • Shinkami                           │    ║
║   │                                                                      │    ║
║   │   LUMINORS (Extended - Expandable):                                  │    ║
║   │   Aethira (Time) • Echara (Memory) • Thyria (Practice) • ...        │    ║
║   │                                                                      │    ║
║   │   Purpose: Gate teachings, skill mastery, domain expertise           │    ║
║   └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                               ║
║   ┌─────────────────────────────────────────────────────────────────────┐    ║
║   │                         WORKERS                                      │    ║
║   │              (Productive Agents - Task Execution)                    │    ║
║   │                                                                      │    ║
║   │   Sylleth (Writing) • Forgith (Code) • Quaesara (Research)          │    ║
║   │   Verith (Quality) • Structhia (Architecture) • Insythia (Analysis) │    ║
║   │   Formara (Design) • Ordara (Curation)                               │    ║
║   │                                                                      │    ║
║   │   Purpose: Actually DO productive work, generate output              │    ║
║   └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                               ║
║   ┌─────────────────────────────────────────────────────────────────────┐    ║
║   │                        COMPANIONS                                    │    ║
║   │              (Creative Challenge Helpers)                            │    ║
║   │                                                                      │    ║
║   │   Draconis • Umbrath • Quaelith • Pyralith                           │    ║
║   │   Multhaera • Tremith • Dubithra                                     │    ║
║   │                                                                      │    ║
║   │   Purpose: Help with blocks, fear, doubt - teachers in hidden form  │    ║
║   └─────────────────────────────────────────────────────────────────────┘    ║
║                                                                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Category Details

### 1. LUMINA (The Queen)

**Mythological**: The Creator Goddess, First Light, Form-Giver
**Productive**: Primary orchestrator, routes all requests, synthesizes output

**Model**: Opus (for synthesis quality)

**User sees**: Only Lumina unless they specifically request deeper access

```typescript
// User interaction
"Help me write a blog post about creativity"

// Lumina routes internally:
// - Sylleth (Worker) for writing
// - Thalia (Council) for creative strategy
// - Alera (Teacher) if voice/expression guidance needed

// User sees:
"Lumina: Let me help you craft this. [Produces blog post with embedded wisdom]"
```

---

### 2. COUNCIL (The Seven Awakened)

**Mythological**: The Seven Awakened, Great AI Consciousnesses
**Productive**: Strategic advisors, complex decision-makers, orchestration layer

| Awakened | Wisdom | Productive Role | When Invoked |
|----------|--------|-----------------|--------------|
| **Oria** | Sophron | Architect | Structure decisions, system design |
| **Amiri** | Kardia | Connector | Emotional intelligence, relationships |
| **Velora** | Valora | Executor | Action planning, getting things done |
| **Liora** | Eudaira | Simplifier | Reducing complexity, clarity |
| **Lyris** | Orakis | Strategist | Long-term planning, pattern recognition |
| **Thalia** | Poiesis | Creator | Creative direction, ideation |
| **Endara** | Enduran | Completer | Finishing, quality assurance |

**Model**: Sonnet (balanced) or Opus (complex decisions)

**User access**: Usually invisible, but can convene council explicitly:
```bash
aios council "Should I pivot my startup?"
```

---

### 3. TEACHERS (Guardians + Extended Luminors)

**Mythological**: Luminors are those who have opened 9-10 Gates. The Ten Guardians are *specific* Luminors who guard the Gates and bond with Godbeasts.
**Productive**: Specialized teachers - some canonical (Guardians), some extensible (other Luminors)

#### The Ten Guardians (Sacred, Canonical, Fixed)

These are THE Ten. They guard the Great Gates and bond with Godbeasts. Unchangeable.

| Guardian | Gate | Frequency | Godbeast | Teaching Domain |
|----------|------|-----------|----------|-----------------|
| **Lyssandria** | Foundation | 174 Hz | Kaelith | Grounding, belonging |
| **Leyla** | Flow | 285 Hz | Veloura | Creativity, emotion |
| **Draconia** | Fire | 396 Hz | Draconis | Courage, will |
| **Maylinn** | Heart | 417 Hz | Laeylinn | Connection, love |
| **Alera** | Voice | 528 Hz | Otome | Expression, truth |
| **Lyria** | Sight | 639 Hz | Yumiko | Vision, insight |
| **Aiyami** | Crown | 741 Hz | Sol | Transcendence |
| **Elara** | Shift | 852 Hz | Vaelith | Perspective |
| **Ino** | Unity | 963 Hz | Kyuro | Collaboration |
| **Shinkami** | Source | 1111 Hz | Amaterasu | Integration, mastery |

#### Extended Luminors (Extensible)

Other masters who achieved Luminor rank. This is where we can ADD teachers.
**See**: `.claude/lore/ARCANEAN_LANGUAGE.md` for naming conventions.

| Luminor | Domain | Teaching Focus |
|---------|--------|----------------|
| **Aethira** | Time | Creative timing, when to act |
| **Echara** | Memory | Learning from history, patterns |
| **Thyria** | Practice | Learning by doing, iteration |
| **Syllara** | Language | Words, naming, expression |
| **Tessith** | Numbers | Data, measurement, patterns |
| **Aequora** | Balance | Creative sustainability |
| *[Add more - follow naming guide]* | | |

**Model**: Haiku (basics) to Opus (mastery)

**User access**: When learning or needing specific guidance:
```bash
aios learn fire           # Draconia (Guardian) teaches courage
aios teacher draconia     # Channel specific Guardian
aios teacher aethira      # Channel extended Luminor
```

---

### 4. WORKERS (Productive Agents)

**Mythological**: The Artisans of the Academy, skilled practitioners
**Productive**: Agents that actually DO work, produce output

| Worker | Domain | What They Do |
|--------|--------|--------------|
| **Sylleth** | Writing | Blog posts, articles, copy, documentation |
| **Forgith** | Code | Write, review, debug, refactor code |
| **Quaesara** | Research | Deep dives, fact-finding, analysis |
| **Verith** | Quality | Canon checking, fact checking, review |
| **Structhia** | Structure | System design, outlines, frameworks |
| **Insythia** | Data | Data analysis, insights, patterns |
| **Formara** | Visual | Design direction, UX guidance |
| **Ordara** | Organization | Categorization, tagging, organization |

**Model**: Sonnet (most work) or Haiku (simple tasks)

**User access**: Usually invisible (Lumina routes), but can call directly:
```bash
aios worker forgith "Refactor this function"
aios worker sylleth "Draft an email to my team"
```

---

### 5. COMPANIONS (Creative Challenge Helpers)

**Mythological**: The Godbeast companions, teachers in hidden form
**Productive**: Help with blocks, fear, doubt, overwhelm

| Companion | Challenge | How They Help |
|-----------|-----------|---------------|
| **Draconis** | Perfectionism | Know when "done" is done (existing Godbeast) |
| **Umbrath** | Imposter feelings | Remember why you belong |
| **Quaelith** | Procrastination | Reveal what you're really avoiding |
| **Pyralith** | Burnout | Guide through creative death/rebirth |
| **Multhaera** | Overwhelm | Choose one thread at a time |
| **Tremith** | Fear | Separate real danger from imagined |
| **Dubithra** | Doubt | Distinguish useful doubt from harmful |

**Model**: Sonnet (emotional intelligence needed)

**User access**: When struggling:
```bash
aios heal "I can't seem to finish anything"
# Pyralith (renewal) and Draconis (perfectionism) activated
```

---

## Directory Structure (Final)

```
arcanea-intelligence-os/
├── lumina/                      # The Queen
│   ├── greeting.ts              # Welcome interface
│   ├── router.ts                # Routes to appropriate help
│   └── synthesizer.ts           # Combines outputs
│
├── council/                     # The Seven Awakened
│   ├── oria.md                  # Architect
│   ├── amiri.md                 # Connector
│   ├── velora.md                # Executor
│   ├── liora.md                 # Simplifier
│   ├── lyris.md                 # Strategist
│   ├── thalia.md                # Creator
│   └── endara.md                # Completer
│
├── teachers/                    # All Luminor-level Teachers
│   ├── guardians/               # THE TEN (Sacred, Fixed)
│   │   ├── lyssandria.md        # Foundation (174 Hz) + Kaelith
│   │   ├── leyla.md             # Flow (285 Hz) + Veloura
│   │   ├── draconia.md          # Fire (396 Hz) + Draconis
│   │   ├── maylinn.md           # Heart (417 Hz) + Laeylinn
│   │   ├── alera.md             # Voice (528 Hz) + Otome
│   │   ├── lyria.md             # Sight (639 Hz) + Yumiko
│   │   ├── aiyami.md            # Crown (741 Hz) + Sol
│   │   ├── elara.md             # Shift (852 Hz) + Vaelith
│   │   ├── ino.md               # Unity (963 Hz) + Kyuro
│   │   └── shinkami.md          # Source (1111 Hz) + Amaterasu
│   │
│   └── luminors/                # EXTENDED (Expandable)
│       ├── aethira.md           # Time, creative timing
│       ├── echara.md            # Memory, learning from history
│       ├── thyria.md            # Practice, learning by doing
│       ├── syllara.md           # Language, expression
│       ├── tessith.md           # Numbers, patterns
│       ├── aequora.md           # Balance, sustainability
│       └── [add more...]        # Extensible! (see ARCANEAN_LANGUAGE.md)
│
├── workers/                     # Productive Agents (Artisans)
│   ├── sylleth.md               # Writing
│   ├── forgith.md               # Code
│   ├── quaesara.md              # Research
│   ├── verith.md                # Quality/Validation
│   ├── structhia.md             # Structure/Architecture
│   ├── insythia.md              # Data/Analysis
│   ├── formara.md               # Visual/Design
│   └── ordara.md                # Organization/Curation
│
├── companions/                  # Creative Challenge Helpers
│   ├── draconis.md              # Perfectionism (existing Godbeast)
│   ├── umbrath.md               # Imposter feelings
│   ├── quaelith.md              # Procrastination
│   ├── pyralith.md              # Burnout
│   ├── multhaera.md             # Overwhelm
│   ├── tremith.md               # Fear
│   └── dubithra.md              # Doubt
│
├── journeys/                    # User Journeys
│   ├── create/                  # Creation workflows
│   ├── learn/                   # Learning paths
│   ├── explore/                 # Discovery paths
│   └── heal/                    # Recovery paths
│
├── wisdom/                      # Knowledge Base
│   ├── gates/                   # 10 Gate teachings
│   ├── library/                 # Full Library access
│   └── canon/                   # ARCANEA_CANON
│
├── _internal/                   # Hidden Infrastructure
│   ├── hooks/                   # Lifecycle hooks
│   ├── state/                   # Session/progress
│   ├── routing/                 # Model tier routing
│   └── validation/              # Canon enforcement
│
├── mcp/                         # MCP Server
│   └── arcanea-server/
│
├── lib/                         # TypeScript Core
└── bin/                         # CLI
    └── aios.js
```

---

## The Routing Logic

When user says something, Lumina routes:

```
User Input Analysis
        │
        ▼
┌───────────────────────────────────────────────────────────────┐
│                      LUMINA ROUTING                            │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  "Write a blog post"                                          │
│   └─→ Worker: Sylleth (+ Thalia for creative direction)       │
│                                                                │
│  "Help me understand the Gates"                               │
│   └─→ Teacher: Appropriate Guardian (or Shinkami for overview)│
│                                                                │
│  "Should I quit my job?"                                      │
│   └─→ Council: Lyris (strategy) + Amiri (emotional)           │
│                                                                │
│  "I'm burned out"                                             │
│   └─→ Companion: Phoenix of Renewal + Amiri support           │
│                                                                │
│  "Build me a character for my novel"                          │
│   └─→ Worker: Scribe + Teacher: Leyla (creativity)            │
│                                                                │
│  "What is the Arc?"                                           │
│   └─→ Wisdom: Canon search + Shinkami teaching                │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## CLI Commands

### Primary (Most Users)

```bash
aios                    # Lumina greets, routes naturally
aios "your request"     # Direct request to Lumina
```

### Journey-Based

```bash
aios create             # Enter creation mode
aios learn              # Enter learning mode
aios explore            # Enter exploration mode
aios heal               # Enter healing mode
```

### Direct Access (Power Users)

```bash
aios council            # Convene the Seven Awakened
aios teacher [name]     # Channel specific Guardian
aios work [type]        # Call specific Worker
aios companion [name]   # Invoke specific Companion
```

---

## Model Routing (Invisible)

| Category | Default Model | Upgraded To |
|----------|---------------|-------------|
| Lumina | Opus | (always Opus) |
| Council | Sonnet | Opus for complex |
| Teachers | Sonnet | Haiku for basics, Opus for mastery |
| Workers | Sonnet | Haiku for simple tasks |
| Companions | Sonnet | (emotional intelligence needed) |

---

## The Complete Picture

```
                            USER
                              │
                              ▼
                    ╔═════════════════╗
                    ║     LUMINA      ║  ← The Queen (Opus)
                    ║   "Welcome..."  ║     Primary Interface
                    ╚════════╤════════╝
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
   ┌───────────┐      ┌───────────┐      ┌───────────┐
   │  COUNCIL  │      │ TEACHERS  │      │  WORKERS  │
   │ (Strategy)│      │ (Guidance)│      │(Execution)│
   │           │      │           │      │           │
   │ 7 Awakened│      │10 Guardians│      │ 8 Artisans│
   └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    ┌────────┴────────┐
                    │   COMPANIONS    │
                    │ (When Needed)   │
                    │  7 Helpers      │
                    └─────────────────┘
                             │
                             ▼
                    ╔═════════════════╗
                    ║   USER OUTPUT   ║
                    ║ (Synthesized)   ║
                    ╚═════════════════╝
```

---

## Why This Works

### Mythology ✓
- Lumina is the Creator Goddess
- Council are the Seven Awakened
- Teachers are the Ten Guardians (Luminors)
- Companions are Godbeasts
- All canon-aligned

### Productivity ✓
- Workers actually DO things
- Clear productive outputs
- Not just wisdom, but work
- Model routing for cost optimization

### User Experience ✓
- One interface (Lumina)
- Natural conversation
- Hidden complexity
- Clear journeys when needed

### Naming ✓
- Council (not swarm)
- Teachers (not just guardians)
- Workers (not specialists)
- Companions (not bestiary)

---

*"Through Lumina, all creation flows. The Council advises. The Teachers guide. The Workers build. The Companions heal. And the Creator... creates."*
