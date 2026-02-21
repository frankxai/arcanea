# @arcanea/overlay-opencode

> **OpenCode overlay for the Arcanea Intelligence OS.**

Installs Arcanea's intelligence layer into OpenCode — agents, themes, commands, and MCP integration.

## Installation

```bash
npx @arcanea/cli install opencode
```

Or programmatically:

```typescript
import { install } from '@arcanea/overlay-opencode';

await install({ depth: 'standard' });
```

## What It Installs

OpenCode agent definitions, cosmic theme, custom commands (/guardian, /council, /lore, /voice-check), and MCP server config.

## License

MIT
