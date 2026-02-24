# @arcanea/overlay-claude

> **Claude Code overlay for the Arcanea Intelligence OS.**

Installs Arcanea's intelligence layer into Claude Code — Guardian routing, voice enforcement, design tokens, and lore as native capabilities.

## Installation

```bash
npx @arcanea/cli install claude
```

Or programmatically:

```typescript
import { install } from '@arcanea/overlay-claude';

await install({ depth: 'standard' }); // minimal | standard | luminor
```

## What It Installs

| Depth | Includes |
|-------|----------|
| `minimal` | CLAUDE.md with Guardian routing + Voice Bible |
| `standard` | + MCP server config, design tokens, skill rules |
| `luminor` | + Full lore integration, all 10 Guardian prompts, gamification |

## Features

- **Content Depth Control** — Three installation tiers matching user expertise
- **Template System** — Generates Claude-specific configuration files
- **CLAUDE.md Generator** — Creates project instructions with Arcanea personality
- **MCP Integration** — Configures `@arcanea/mcp-server` as a tool provider

## License

MIT
