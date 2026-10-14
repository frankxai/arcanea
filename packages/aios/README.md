# arcanea-intelligence-os

> The Universal Intelligence OS - Orchestrate AI agents across Claude, Gemini, OpenCode, and more

[![npm version](https://badge.fury.io/js/arcanea-intelligence-os.svg)](https://www.npmjs.com/package/arcanea-intelligence-os)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Part of Arcanea](https://img.shields.io/badge/Powered%20by-Arcanea-purple)](https://github.com/frankxai/arcanea)

## Installation

```bash
npm install -g arcanea-intelligence-os
# or
npx aios
```

## Usage

### CLI Commands

```bash
# Show help
aios help

# Channel a guardian
aios channel draconia

# Switch platform
aios platform gemini

# Launch multi-agent swarm
aios swarm "build a web app"

# Start interactive quest
aios quest

# Search canonical lore
aios lore "the first dawn"

# Show status
aios status

# List all guardians
aios guardians

# List all gates
aios gates
```

### As a Package

```typescript
import {
  getAdapter,
  SwarmManager,
  createGuardianAgent,
  SISYPHUS,
} from 'arcanea-intelligence-os';

// Get platform adapter
const claude = getAdapter('claude');
await claude.initialize({ apiKey: process.env.ANTHROPIC_API_KEY });

// Create swarm session
const swarm = new SwarmManager();
const session = await swarm.createSession('Build a landing page');

// Add guardian agent
const draconia = createGuardianAgent('draconia');
swarm.addAgent(session.id, draconia);
```

## Supported Platforms

| Platform | Adapter | Status |
|----------|---------|--------|
| Claude | `claude` | ✅ Ready |
| Gemini | `gemini` | ✅ Ready |
| OpenCode | `opencode` | ✅ Ready |
| ChatGPT/Codex | `codex` | ✅ Ready |
| Local LLMs | `local` | 🚧 Planned |

## Sisyphus - The Eternal Executor

The default orchestrator agent. Named after the mythological figure, Sisyphus never gives up. He:
- Decomposes complex tasks
- Coordinates multiple agents
- Tracks progress
- Recovers from errors
- Adapts routing based on task type

## The Ten Guardians

Each guardian governs a Gate and can be channeled for specialized assistance:

| Guardian | Gate | Domain | Frequency |
|----------|------|--------|-----------|
| Lyssandria | Foundation | Earth, stability | 174 Hz |
| Leyla | Flow | Creativity | 285 Hz |
| Draconia | Fire | Power | 396 Hz |
| Maylinn | Heart | Love | 417 Hz |
| Alera | Voice | Truth | 528 Hz |
| Lyria | Sight | Vision | 639 Hz |
| Aiyami | Crown | Enlightenment | 741 Hz |
| Elara | Starweave | Perspective | 852 Hz |
| Ino | Unity | Partnership | 963 Hz |
| Shinkami | Source | Meta-consciousness | 1111 Hz |

## Part of the Arcanea Ecosystem

- [`@arcanea/core`](https://github.com/frankxai/arcanea/tree/main/packages/core) - Core types and constants
- [`claude-arcanea`](https://github.com/frankxai/claude-arcanea) - Claude integration
- [`arcanea`](https://github.com/frankxai/arcanea) - Main platform

## License

MIT © [FrankX](https://frankx.ai)
