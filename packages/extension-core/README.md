# @arcanea/extension-core

> **Shared foundation for all Arcanea browser extensions** — Guardian definitions, routing, voice enforcement, and subscription tiers.

[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @arcanea/extension-core
# or
pnpm add @arcanea/extension-core
```

## Guardian Routing

Route tasks to the optimal Guardian based on keywords:

```typescript
import { routeToGuardian, scoreGuardians } from '@arcanea/extension-core';

const result = routeToGuardian("design a database schema");
// → { guardian: "lyssandria", confidence: 0.85, gate: "Foundation", element: "Earth" }

// Get ranked scores for all Guardians
const scores = scoreGuardians("write poetry about the ocean");
// → [{ id: "leyla", score: 0.9 }, { id: "alera", score: 0.7 }, ...]
```

## Voice Enforcement

Ensure text follows the Arcanea Voice Bible:

```typescript
import { enforceVoice, postProcessResponse, getVoiceTokens } from '@arcanea/extension-core';

const result = enforceVoice("Welcome users to our platform");
// → { passed: false, violations: [...], suggestions: [...] }

const fixed = postProcessResponse("Hello user, welcome to the platform");
// → "Hello creator, welcome to Arcanea"

const tokens = getVoiceTokens();
// → { prefer: ["creator", "manifest", ...], avoid: ["user", "platform", ...] }
```

## Subscription Tiers

Manage feature access across subscription levels:

```typescript
import { getTierLimits, isFeatureAvailable, meetsMinimumTier } from '@arcanea/extension-core';

const limits = getTierLimits('creator');
// → { messagesPerDay: 100, guardians: 3, models: ["gemini-flash"], ... }

isFeatureAvailable('creator', 'councilMode'); // → false (luminor+ only)
meetsMinimumTier('luminor', 'creator');       // → true
```

## Guardian Definitions

All 10 canonical Guardians with full metadata:

```typescript
import { GUARDIANS, getGuardianById } from '@arcanea/extension-core';

const leyla = getGuardianById('leyla');
// → { id: "leyla", name: "Leyla", gate: "Flow", element: "Water",
//     frequency: "417 Hz", domain: "Creativity, emotion", ... }
```

| Guardian | Gate | Element | Domain |
|:---------|:-----|:--------|:-------|
| Lyssandria | Foundation | Earth | Survival, stability |
| Leyla | Flow | Water | Creativity, emotion |
| Draconia | Fire | Fire | Power, will |
| Maylinn | Heart | Wind | Love, healing |
| Alera | Voice | Void | Truth, expression |
| Lyria | Sight | Spirit | Intuition, vision |
| Aiyami | Crown | Spirit | Enlightenment |
| Elara | Shift | Void | Perspective |
| Ino | Unity | Spirit | Partnership |
| Shinkami | Source | All | Meta-consciousness |

## Used By

- [`arcanea-chrome-extension`](../chrome-extension) — Chrome extension with AI chat
- [`arcanea-realm`](../vscode) — VS Code extension
- Future: Firefox, Safari, Edge extensions

## License

MIT - [FrankX](https://github.com/frankxai)
