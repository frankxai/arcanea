# @arcanea/os

> **The intelligence engine powering Arcanea** — Guardian routing, voice enforcement, design tokens, and session management for AI creation tools.

[![npm version](https://badge.fury.io/js/%40arcanea%2Fos.svg)](https://www.npmjs.com/package/@arcanea/os)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @arcanea/os
# or
pnpm add @arcanea/os
```

## Intelligence Engine (v0.2.0)

### Guardian Routing

Route any creative task to the optimal Guardian based on keyword analysis:

```typescript
import { routeToGuardian } from '@arcanea/os';

const route = routeToGuardian("design a flowing water-themed UI");
// → {
//     guardian: "Leyla",
//     confidence: 0.92,
//     element: "Water",
//     gate: "Flow",
//     frequency: 417,
//     alternatives: [{ guardian: "Lyria", confidence: 0.65, ... }]
//   }
```

### Voice Enforcement

Validate text against the Arcanea Voice Bible v2.0:

```typescript
import { VoiceEnforcer } from '@arcanea/os';

const voice = new VoiceEnforcer();
const check = voice.check("Welcome users to our platform");
// → {
//     passed: false,
//     violations: [{ rule: "term-user", suggestion: "creator" }],
//     score: 0.6
//   }

const fixed = voice.fix("Welcome users to our platform");
// → "Welcome creators to Arcanea"
```

### Design Tokens

Export the full Arcanean Design System:

```typescript
import { toCSSVariables, toTailwindConfig, toJSON } from '@arcanea/os';

// CSS custom properties
const css = toCSSVariables();
// → "--arcane-crystal: #7fffd4; --arcane-fire: #ff4500; ..."

// Tailwind theme extension
const tailwind = toTailwindConfig();
// → { colors: { arcane: { crystal: "#7fffd4", ... } }, ... }

// Raw JSON tokens
const tokens = toJSON();
```

### Session Management

Track Guardian state, Gate progression, and element resonance:

```typescript
import { SessionManager } from '@arcanea/os';

const session = new SessionManager();
session.activateGuardian("Leyla");
session.setGate("Flow");

console.log(session.getState());
// → { guardian: "Leyla", gate: "Flow", element: "Water", rank: "Apprentice" }
```

## Types & Constants

```typescript
import type { Guardian, Gate, Element, Luminor } from '@arcanea/os';
import { GATES, GUARDIANS, LUMINORS, ACADEMIES } from '@arcanea/os';

// Calculate rank based on gates opened
import { calculateMagicRank, getElementColor, formatGateName } from '@arcanea/os';

const rank = calculateMagicRank(7); // → "Archmage"
const color = getElementColor('water'); // → "#4169e1"
```

## The Ten Gates

| Gate | Frequency | Guardian | Element | Domain |
|:-----|:---------:|:---------|:--------|:-------|
| Foundation | 396 Hz | Lyssandria | Earth | Survival, stability |
| Flow | 417 Hz | Leyla | Water | Creativity, emotion |
| Fire | 528 Hz | Draconia | Fire | Power, will |
| Heart | 639 Hz | Maylinn | Wind | Love, healing |
| Voice | 741 Hz | Alera | Void | Truth, expression |
| Sight | 852 Hz | Lyria | Spirit | Intuition, vision |
| Crown | 963 Hz | Aiyami | Spirit | Enlightenment |
| Shift | 1111 Hz | Elara | Void | Perspective |
| Unity | 963 Hz | Ino | Spirit | Partnership |
| Source | 1111 Hz | Shinkami | Source | Meta-consciousness |

## Ecosystem

| Package | Purpose |
|:--------|:--------|
| [`@arcanea/os`](https://github.com/frankxai/arcanea/tree/main/packages/core) | Intelligence engine (this package) |
| [`@arcanea/cli`](https://github.com/frankxai/arcanea/tree/main/packages/cli) | CLI with 10 commands |
| [`@arcanea/mcp-server`](https://github.com/frankxai/arcanea/tree/main/packages/arcanea-mcp) | 30 MCP tools for any AI client |
| [`arcanea.ai`](https://arcanea.ai) | Live web platform |
| [`arcanea-realm`](https://github.com/frankxai/arcanea-realm) | Standalone AI CLI (OpenCode fork) |

## License

MIT - [FrankX](https://github.com/frankxai)
