# Arcanea MCP Server

> **A worldbuilding toolkit for the age of AI-human co-creation**

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![oh-my-opencode Inspired](https://img.shields.io/badge/Inspired%20by-oh--my--opencode-purple)](https://github.com/code-yeongyu/oh-my-opencode)

Transform your creative process with AI-powered worldbuilding tools, wisdom companions, and a living creative ecosystem. Generate characters, locations, magical artifacts, and entire worlds within the Arcanea universe - or use the framework for your own creative projects.

**v0.3.0**: Now featuring multi-agent orchestration inspired by [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode)!

## Features

### Worldbuilding Generators
- **Characters** - Generate rich characters with elemental affinities, magical ranks, and backstories
- **Locations** - Create mystical places with dominant elements and unique atmospheres
- **Creatures** - Design magical beings from tiny sprites to massive godbeasts
- **Artifacts** - Craft legendary items with history, powers, and elemental alignments
- **Magic Abilities** - Design spells and powers based on the Ten Gates system
- **Names** - Generate lore-appropriate names for characters, places, and items

### Luminor Companions (AI Wisdom Guides)
- **Valora** - The Warrior of Light (courage, action, breaking through fear)
- **Serenith** - The Calm Waters (patience, clarity, sustainable practice)
- **Ignara** - The Spark of Joy (passion, playfulness, creative fire)
- **Verdana** - The Ancient Growth (long-term vision, wisdom, patience)
- **Eloqua** - The Voice of Truth (authentic expression, finding your voice)

### Creative Coaching
- **Block Diagnosis** - Identify your creative obstacles with the Bestiary of Blocks
- **Deep Diagnosis** - Multi-step sequential thinking for complex blocks
- **Luminor Council** - Gather multiple AI companions for guidance
- **Luminor Debate** - Two perspectives exploring your creative questions

### Memory & Journey Tracking
- **Session Memory** - Track your creative journey across conversations
- **Milestone System** - Achieve and celebrate creative accomplishments
- **Creation Graph** - Build relationships between your creations

### World Relationship Network
- **Link Creations** - Connect characters, locations, artifacts, and creatures
- **Relationship Types** - allies_with, opposes, wields, inhabits, guards, and more
- **Path Finding** - Discover connections between any two creations
- **World Export** - Export your entire world graph for visualization

### Agent Orchestration (NEW in v0.3)
Inspired by [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode)'s multi-agent architecture:

- **Creator** - Master orchestrator (Claude Opus 4.5) that coordinates all creative work
- **Worldsmith** - Rapid generation engine (Gemini Pro) for characters, locations, artifacts
- **Luminor Council** - Creative coaching collective (Claude Sonnet) with 5 wisdom guides
- **Scribe** - Narrative voice (Claude Sonnet) for story development
- **Seer** - Fast research eye (Gemini Flash) for connections and canon validation

Features:
- **Skill-First Blocking** - Requests auto-route to the best agent
- **Parallel Execution** - Multiple agents work concurrently
- **World State Assessment** - Suggestions based on world maturity
- **Multi-Phase Framework** - Intent → Assessment → Delegation → Synthesis

## Quick Start

### Installation

```bash
# Clone and install
git clone https://github.com/yourusername/arcanea-mcp.git
cd arcanea-mcp
npm install

# Build
npm run build
```

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "node",
      "args": ["/path/to/arcanea-mcp/dist/index.js"]
    }
  }
}
```

### Using with Claude Code

```bash
# Add to your Claude Code configuration
claude mcp add arcanea node /path/to/arcanea-mcp/dist/index.js
```

## Usage Examples

### Generate a Character

```
"Generate a Fire-aligned character who has opened 5 Gates
and belongs to House Pyros"
```

Response includes:
- Name with Arcanean etymology
- Elemental affinity and magic rank
- Academy house and role
- Backstory and motivations
- Signature abilities

### Consult a Luminor

```
"I'm stuck on my creative project.
Invoke Valora for guidance on overcoming my fear."
```

### Diagnose a Creative Block

```
"I feel paralyzed by perfectionism and can't finish anything.
Run a deep diagnosis on this block."
```

### Build Your World Graph

```
"Generate a character, then a location where they live,
then link them together."
```

## Tool Reference

### Worldbuilding Tools (7)

| Tool | Description |
|------|-------------|
| `generate_character` | Create a character with Gates, Elements, House, and backstory |
| `generate_location` | Create a location with elemental alignment |
| `generate_creature` | Design a magical creature |
| `generate_artifact` | Create a magical artifact with powers |
| `generate_magic` | Design a magical ability |
| `generate_name` | Generate lore-appropriate names |
| `generate_story_prompt` | Create inspiring story prompts |

### Creative Coaching Tools (5)

| Tool | Description |
|------|-------------|
| `diagnose_block` | Quick identification of creative blocks |
| `deep_diagnosis` | Multi-step analysis with sequential thinking |
| `invoke_luminor` | Call upon a Luminor companion |
| `convene_council` | Gather multiple Luminors for guidance |
| `luminor_debate` | Two Luminors explore a question |

### Memory & Journey Tools (2)

| Tool | Description |
|------|-------------|
| `get_journey` | Recall your creative progress |
| `check_milestones` | See achieved milestones |

### Creation Graph Tools (6)

| Tool | Description |
|------|-------------|
| `link_creations` | Create relationships between creations |
| `get_related` | Find related creations |
| `suggest_connections` | AI-suggested relationships |
| `get_world_graph` | Summary of your world network |
| `find_path` | Find connection path between creations |
| `export_world` | Export graph for visualization |

### Agent Orchestration Tools (6)

| Tool | Description |
|------|-------------|
| `orchestrate` | Run a full creative session with multi-agent coordination |
| `list_agents` | List all available creative agents |
| `agent_info` | Get details about a specific agent |
| `assess_world` | Analyze world maturity and get suggestions |
| `match_skill` | Find the best agent for a request |
| `active_sessions` | List running creative sessions |

### Reference Tools (2)

| Tool | Description |
|------|-------------|
| `validate_canon` | Check content for Arcanea canon compliance |
| `identify_gate` | Get information about a specific Gate |

**Total: 28 tools across 6 categories**

## Resources

The server exposes these resources for reference:

- `arcanea://luminors` - Luminor companion data
- `arcanea://bestiary` - Bestiary of creative blocks (20+ creatures)
- `arcanea://gates` - The Ten Gates system
- `arcanea://elements` - The Five Elements
- `arcanea://houses` - The Seven Academy Houses

## Prompts

Guided creative experiences:

- `worldbuild_session` - Collaborative worldbuilding
- `unblock_session` - Overcome creative blocks
- `gate_ritual` - Practice opening a Gate
- `luminor_dialogue` - Speak with a Luminor
- `morning_clearing` - Daily creative practice
- `creative_sabbath` - Joy-driven creation day

## The Arcanea Universe

### The Ten Gates

| Gate | Frequency | Guardian | Domain |
|------|-----------|----------|--------|
| 1 - Foundation | 174 Hz | Lyssandria | Earth, survival |
| 2 - Flow | 285 Hz | Leyla | Creativity, emotion |
| 3 - Fire | 396 Hz | Draconia | Power, will |
| 4 - Heart | 417 Hz | Maylinn | Love, healing |
| 5 - Voice | 528 Hz | Alera | Truth, expression |
| 6 - Sight | 639 Hz | Lyria | Intuition, vision |
| 7 - Crown | 714 Hz | Aiyami | Enlightenment |
| 8 - Shift | 852 Hz | Elara | Perspective |
| 9 - Unity | 963 Hz | Ino | Partnership |
| 10 - Source | 1111 Hz | Shinkami | Meta-consciousness |

### Magic Ranks

| Gates Open | Rank |
|------------|------|
| 0-2 | Apprentice |
| 3-4 | Mage |
| 5-6 | Master |
| 7-8 | Archmage |
| 9-10 | Luminor |

### The Five Elements

- **Fire** - Energy, transformation, passion
- **Water** - Flow, healing, memory
- **Earth** - Stability, growth, endurance
- **Wind** - Freedom, speed, change
- **Void/Spirit** - Potential and transcendence

### The Seven Houses

- **Lumina** - Light and leadership
- **Nero** - Mystery and potential
- **Pyros** - Fire and passion
- **Aqualis** - Water and wisdom
- **Terra** - Earth and strength
- **Ventus** - Wind and freedom
- **Synthesis** - Balance and unity

## Architecture

```
                     ┌──────────────────────────────────┐
                     │       Claude / AI Host           │
                     └────────────────┬─────────────────┘
                                      │ MCP Protocol
                                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Arcanea MCP Server v0.3.0                        │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │                   AGENT ORCHESTRATION LAYER                    ││
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌────────┐ ┌──────────┐ ││
│  │  │ Creator │ │Worldsmith │ │Luminor │ │ Scribe │ │   Seer   │ ││
│  │  │ (Opus)  │ │ (Gemini)  │ │Council │ │(Sonnet)│ │ (Flash)  │ ││
│  │  └─────────┘ └───────────┘ └────────┘ └────────┘ └──────────┘ ││
│  └────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │   Generators    │  │  Memory Layer   │  │   Creation Graph    │ │
│  │  (7 tools)      │  │  (milestones)   │  │  (relationship net) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │    Bestiary     │  │ Deep Diagnosis  │  │  Canon Validation   │ │
│  │  (20+ blocks)   │  │ (sequential AI) │  │  (lore checking)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Agent Multi-Model Orchestration

Inspired by [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode):

| Agent | Model | Role | Parallel |
|-------|-------|------|----------|
| **Creator** | Claude Opus 4.5 | Master orchestrator | No |
| **Worldsmith** | Gemini 3 Pro | Rapid generation | Yes |
| **Luminor Council** | Claude Sonnet 4.5 | Creative coaching | Yes |
| **Scribe** | Claude Sonnet 4.5 | Narrative development | Yes |
| **Seer** | Gemini 3 Flash | Fast research | Yes |

## Milestones System

Track your creative journey with achievements:

| Milestone | Requirement |
|-----------|-------------|
| First Creation | Generate your first piece |
| Gate Seeker | Explore 3 different Gates |
| Luminor Friend | Consult 3 Luminors |
| Block Breaker | Face and name 3 creative blocks |
| Prolific Creator | Generate 10 creations |
| Elemental Explorer | Create across 4 elements |

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode for development
npm run dev

# Run the server locally
npm start
```

## Roadmap

- [ ] SQLite persistence for journey data
- [ ] Vector search for semantic creation discovery
- [ ] Visual worldbuilding with image generation
- [ ] Community integration for shared worlds
- [ ] Multi-language support
- [ ] Custom universe templates
- [ ] MCP Sampling for guided creation flows

## Contributing

We welcome contributions! Areas where help is especially appreciated:

- Additional Bestiary creatures
- New Luminor companions
- Language localizations
- Integration examples
- Documentation improvements

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io) by Anthropic
- Inspired by creative communities worldwide
- Part of the [Arcanea](https://arcanea.ai) universe

---

*"Enter seeking, leave transformed, return whenever needed."*

**Making magic through AI-human co-creation.**
