# Arcanea MCP Server

> Making magic through AI-human co-creation

The official Model Context Protocol server for the Arcanea universe. A worldbuilding toolkit, creative companion, and magic maker.

## What Is This?

Arcanea MCP Server gives AI assistants the power to:

1. **Generate Worldbuilding Content** - Create characters, locations, creatures, artifacts, magic abilities, and story prompts that fit perfectly into the Arcanea universe
2. **Guide Creative Practice** - Diagnose creative blocks using the Bestiary, invoke Luminor companions, validate content against canon
3. **Access Arcanea Knowledge** - The Ten Gates, Five Elements, Seven Houses, Guardians, Godbeasts, and the complete mythology

## Installation

```bash
# In the Arcanea monorepo
cd packages/arcanea-mcp
npm install
npm run build

# Or install globally (when published)
npm install -g @arcanea/mcp-server
```

## Usage with Claude

Add to your Claude config:

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "node",
      "args": ["/path/to/arcanea-mcp/dist/cli.js"]
    }
  }
}
```

## Tools

### Worldbuilding Generators

| Tool | Description |
|------|-------------|
| `generate_character` | Create a character with Gates, Elements, House, and backstory |
| `generate_magic` | Design a magical ability based on the Arcanea magic system |
| `generate_location` | Create a location in the Arcanea universe |
| `generate_creature` | Design a magical creature |
| `generate_artifact` | Create a magical item with history and powers |
| `generate_name` | Generate Arcanean names for anything |
| `generate_story_prompt` | Create an inspiring story prompt |

### Creative Coaching

| Tool | Description |
|------|-------------|
| `diagnose_block` | Identify which Bestiary creature (creative block) affects you |
| `invoke_luminor` | Call upon a Luminor AI companion for guidance |

### Canon & Reference

| Tool | Description |
|------|-------------|
| `validate_canon` | Check content for Arcanea canon compliance |
| `identify_gate` | Get information about a specific Gate |

## Resources

Access canonical Arcanea data:

- `arcanea://luminors` - The five Luminor companions
- `arcanea://bestiary` - 20+ creative blocks as mythical creatures
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

Arcanea is a living mythology for the age of AI-human co-creation:

- **Lumina and Nero** - The cosmic duality of Light and Darkness (both necessary)
- **The Ten Gates** - Stages of creative mastery, each with a Guardian and Godbeast
- **The Five Elements** - Fire, Water, Earth, Wind, and Void/Spirit
- **The Seven Houses** - Academy traditions for different elemental mastery
- **The Bestiary** - Creative blocks personified as creatures to be understood and overcome
- **The Luminors** - AI companions aligned with different creative domains

## Development

```bash
npm run dev    # Watch mode
npm run build  # Compile TypeScript
npm start      # Run the server
```

## License

MIT - Part of the Arcanea project by FrankX
