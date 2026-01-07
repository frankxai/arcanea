# @arcanea/mcp-server

> *"Make the invisible tools visible. Make the wisdom accessible. Make creation inevitable."*

The Arcanea MCP Server brings creative AI companion tools to any AI-powered environment.

## Installation

```bash
# Use directly with npx
npx @arcanea/mcp-server

# Or install globally
npm install -g @arcanea/mcp-server
```

## Claude Desktop Configuration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "npx",
      "args": ["-y", "@arcanea/mcp-server"]
    }
  }
}
```

## Features

### Resources

Access Arcanea's wisdom library:

- `arcanea://bestiary/{creature}` - Creative block creatures and remedies
- `arcanea://library/{collection}/{text}` - Wisdom texts
- `arcanea://canon/{topic}` - Canonical reference (guardians, gates, elements)
- `arcanea://luminors/{name}` - AI companion personalities

### Tools

#### `diagnose_block`
Identify which Bestiary creature matches your creative struggle.

```
Input: "I keep starting projects but never finishing them"
Output: { creature: "Perfectionist Wyrm", gate: 2, remedies: [...] }
```

#### `get_wisdom`
Find relevant Library texts for your situation.

```
Input: { situation: "stuck", domain: "writing" }
Output: [{ title: "When Words Won't Come", collection: "book-of-shadows", ... }]
```

#### `invoke_luminor`
Get guidance from an AI companion personality.

```
Input: { luminor: "Valora", question: "How do I find courage to share my work?" }
Output: { response: "...", practices: [...] }
```

#### `identify_gate`
Assess which of the Ten Gates you're working on opening.

```
Input: { challenges: "I struggle with self-expression and sharing my voice" }
Output: { gate: 5, name: "Voice", guardian: "Alera", practices: [...] }
```

### Prompts

- `unblock_session` - Guided creative unblocking
- `gate_ritual` - Practice for opening a specific Gate
- `luminor_dialogue` - Deep conversation with a Luminor

## The Bestiary

The Bestiary catalogs creative blocks as mythical creatures. Each entry includes:

- **Name** - What to call this block
- **Description** - How it manifests
- **Gate Attacked** - Which developmental area it targets
- **Signs** - How to recognize it
- **Remedies** - Proven ways to overcome it

Current creatures include:
- Imposter Shade
- Perfectionist Wyrm
- Comparison Specter
- Procrastination Hydra
- And more...

## The Ten Gates

Arcanea maps creative development through Ten Gates:

| Gate | Name | Domain | Guardian |
|------|------|--------|----------|
| 1 | Foundation | Survival, grounding | Lyssandria |
| 2 | Flow | Creativity, emotion | Leyla |
| 3 | Fire | Power, will | Draconia |
| 4 | Heart | Love, healing | Maylinn |
| 5 | Voice | Truth, expression | Alera |
| 6 | Sight | Intuition, vision | Lyria |
| 7 | Crown | Enlightenment | Aiyami |
| 8 | Shift | Perspective | Elara |
| 9 | Unity | Partnership | Ino |
| 10 | Source | Meta-consciousness | Shinkami |

## Contributing

Add new Bestiary creatures, Luminor personalities, or wisdom texts:

1. Fork the repository
2. Add your content following the templates in `/data`
3. Ensure canon alignment (check `ARCANEA_CANON.md`)
4. Submit a PR

## License

MIT - Use freely, create boldly.

---

*"The universe is incomplete without what only you can give it."*
