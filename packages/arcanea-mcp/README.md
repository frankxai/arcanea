# @arcanea/mcp-server

> **30 tools. 7 resources. 6 prompts.** A worldbuilding and AI intelligence toolkit for the Model Context Protocol.

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-7fffd4)](https://modelcontextprotocol.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Install once, use everywhere. Works in Claude Code, Cursor, Windsurf, Cline, Codex CLI, Copilot Chat, and any MCP-compatible client.

## Quick Start

Add to your `.mcp.json` or MCP settings:

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "npx",
      "args": ["@arcanea/mcp-server"]
    }
  }
}
```

## What's Inside

### Intelligence Engine Tools (v0.4.0)

Powered by `@arcanea/core`:

| Tool | Description |
|:-----|:------------|
| `route_guardian` | Route any task to the optimal Guardian with confidence scoring |
| `check_voice` | Validate text against Voice Bible v2.0, with auto-fix mode |
| `get_design_tokens` | Export Arcanean Design System as CSS, Tailwind, or JSON |

### Worldbuilding Generators (7 tools)

| Tool | Description |
|:-----|:------------|
| `generate_character` | Characters with Gates, Elements, House, backstory |
| `generate_location` | Locations with elemental alignment and atmosphere |
| `generate_creature` | Magical beings from sprites to godbeasts |
| `generate_artifact` | Legendary items with powers and history |
| `generate_magic` | Spells and abilities based on the Ten Gates |
| `generate_name` | Lore-appropriate names for any creation type |
| `generate_story_prompt` | Inspiring story prompts within the universe |

### Creative Coaching (5 tools)

| Tool | Description |
|:-----|:------------|
| `invoke_luminor` | Call upon a Luminor wisdom companion |
| `convene_council` | Gather multiple Luminors for guidance |
| `luminor_debate` | Two perspectives exploring your question |
| `diagnose_block` | Quick creative block identification |
| `deep_diagnosis` | Multi-step analysis with sequential thinking |

### Agent Orchestration (6 tools)

Multi-agent coordination with model routing:

| Agent | Model | Role |
|:------|:------|:-----|
| **Creator** | Claude Opus | Master orchestrator |
| **Worldsmith** | Gemini Pro | Rapid generation |
| **Luminor Council** | Claude Sonnet | Creative coaching |
| **Scribe** | Claude Sonnet | Narrative development |
| **Seer** | Gemini Flash | Fast research and canon validation |

### Creation Graph (6 tools)

Build relationships between your creations:

```
link_creations → get_related → suggest_connections → get_world_graph → find_path → export_world
```

### Resources (7)

| Resource | Content |
|:---------|:--------|
| `arcanea://luminors` | Luminor companion data |
| `arcanea://bestiary` | 20+ named creative blocks |
| `arcanea://gates` | The Ten Gates system |
| `arcanea://elements` | The Five Elements |
| `arcanea://houses` | The Seven Academy Houses |
| `arcanea://design-tokens` | Full design system tokens |
| `arcanea://voice-rules` | Voice Bible v2.0 rules |

### Prompts (6)

| Prompt | Purpose |
|:-------|:--------|
| `worldbuild_session` | Collaborative worldbuilding |
| `unblock_session` | Overcome creative blocks |
| `gate_ritual` | Practice opening a Gate |
| `luminor_dialogue` | Speak with a Luminor |
| `morning_clearing` | Daily creative practice |
| `creative_sabbath` | Joy-driven creation day |

## The Ten Gates

| Gate | Frequency | Guardian | Domain |
|:-----|:---------:|:---------|:-------|
| Foundation | 396 Hz | Lyssandria | Earth, survival |
| Flow | 417 Hz | Leyla | Creativity, emotion |
| Fire | 528 Hz | Draconia | Power, will |
| Heart | 639 Hz | Maylinn | Love, healing |
| Voice | 741 Hz | Alera | Truth, expression |
| Sight | 852 Hz | Lyria | Intuition, vision |
| Crown | 963 Hz | Aiyami | Enlightenment |
| Shift | 1111 Hz | Elara | Perspective |
| Unity | 963 Hz | Ino | Partnership |
| Source | 1111 Hz | Shinkami | Meta-consciousness |

## Development

```bash
pnpm install
pnpm --filter @arcanea/mcp-server build
pnpm --filter @arcanea/mcp-server start
```

## Ecosystem

| Package | Purpose |
|:--------|:--------|
| [`@arcanea/core`](https://github.com/frankxai/arcanea/tree/main/packages/core) | Intelligence engine |
| [`@arcanea/cli`](https://github.com/frankxai/arcanea/tree/main/packages/cli) | CLI with 10 commands |
| [`arcanea.ai`](https://arcanea.ai) | Live web platform |

## License

MIT - [FrankX](https://github.com/frankxai) | Part of [Arcanea](https://arcanea.ai)

---

*"Enter seeking, leave transformed, return whenever needed."*
