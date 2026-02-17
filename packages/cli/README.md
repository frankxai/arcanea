# @arcanea/cli

> **Overlay any AI tool with arcane intelligence.** 10 commands. One binary. Works everywhere.

[![npm version](https://badge.fury.io/js/%40arcanea%2Fcli.svg)](https://www.npmjs.com/package/@arcanea/cli)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

```bash
# Run instantly with npx
npx @arcanea/cli route "design a character creation flow"

# Or install globally
npm install -g @arcanea/cli
```

## Commands

| Command | Description |
|:--------|:------------|
| `arcanea init` | Initialize Arcanea in a project (creates `.arcanea/`) |
| `arcanea auth` | Authenticate with arcanea.ai |
| `arcanea status` | Show current Guardian, Gate, Element, and session state |
| `arcanea install <overlay>` | Install an overlay (claude, chatgpt, gemini, copilot, opencode) |
| `arcanea update` | Update Arcanea to latest version |
| `arcanea route <description>` | Route a task to the optimal Guardian |
| `arcanea voice <text> [--fix]` | Check text against Voice Bible v2.0 |
| `arcanea tokens [--format] [--colors]` | Export design tokens (CSS, Tailwind, JSON) |
| `arcanea world` | Launch worldbuilding session |
| `arcanea create` | Create a new Arcanea project |

## Examples

### Route a task to a Guardian

```bash
$ arcanea route "help me design a database schema for user profiles"

Guardian: Lyssandria (Earth)
Gate: Foundation | Frequency: 396 Hz
Confidence: 0.94
Domain: Architecture, database design, system foundations

Alternatives:
  Draconia (Fire) — 0.52 confidence
  Shinkami (Source) — 0.38 confidence
```

### Check voice compliance

```bash
$ arcanea voice "Welcome users to our platform" --fix

Violations found:
  term-user: "users" → "creators"
  term-platform: "platform" → "Arcanea"

Fixed: "Welcome creators to Arcanea"
```

### Export design tokens

```bash
$ arcanea tokens --format css --colors

:root {
  --arcane-crystal: #7fffd4;
  --arcane-fire: #ff4500;
  --arcane-water: #4169e1;
  --arcane-earth: #228b22;
  --arcane-void: #9966ff;
  --arcane-gold: #ffd700;
  --cosmic-void: #0b0e14;
  --cosmic-deep: #0d1117;
  ...
}
```

## Overlays

Install Arcanea intelligence into any AI tool:

```bash
arcanea install claude     # Claude Code / Claude Desktop
arcanea install chatgpt    # ChatGPT
arcanea install gemini     # Gemini / AI Studio
arcanea install copilot    # GitHub Copilot
arcanea install opencode   # OpenCode
```

Each overlay adds Guardian routing, voice enforcement, design tokens, and Arcanea lore to your existing AI workflow.

## Technical

- **Bundle**: Single 247KB CJS file with shebang
- **Runtime**: Node.js 18+
- **Dependencies**: `@arcanea/core` (intelligence engine), `commander`, `picocolors`
- **Tests**: 17/17 passing

## Ecosystem

| Package | Purpose |
|:--------|:--------|
| [`@arcanea/core`](https://github.com/frankxai/arcanea/tree/main/packages/core) | Intelligence engine |
| [`@arcanea/mcp-server`](https://github.com/frankxai/arcanea/tree/main/packages/arcanea-mcp) | 30 MCP tools |
| [`arcanea.ai`](https://arcanea.ai) | Live web platform |

## License

MIT - [FrankX](https://github.com/frankxai)
