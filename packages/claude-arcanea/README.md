# claude-arcanea

> Arcanea Intelligence OS for Claude Code - Mythology-infused AI agent orchestration

[![npm version](https://badge.fury.io/js/claude-arcanea.svg)](https://www.npmjs.com/package/claude-arcanea)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Part of Arcanea](https://img.shields.io/badge/Powered%20by-Arcanea-purple)](https://github.com/frankxai/arcanea)

## Installation

```bash
npm install -g claude-arcanea
# or
npx claude-arcanea
```

## Usage

### Launch Claude with Arcanea

```bash
claude-arcanea
```

This launches Claude Code with the full Arcanea Intelligence OS context, including:
- 10 Guardians and their Gates
- 77+ mythology-organized skills
- The Luminor AI companions
- Canonical lore and worldbuilding

### As a Package

```typescript
import { GUARDIANS, GATES, allSkills } from 'claude-arcanea';

// Get all skills for a gate
const fireSkills = getSkillsByGate('fire');

// Find a skill by trigger
const skill = getSkillByTrigger('/refactor');
```

## The Ten Gates

| Gate | Frequency | Guardian | Domain |
|------|-----------|----------|--------|
| Foundation | 396 Hz | Lyssandria | Stability, security |
| Flow | 417 Hz | Leyla | Creativity, emotion |
| Fire | 528 Hz | Draconia | Power, transformation |
| Heart | 639 Hz | Maylinn | Love, healing |
| Voice | 741 Hz | Alera | Truth, expression |
| Sight | 852 Hz | Lyria | Intuition, vision |
| Crown | 963 Hz | Aiyami | Enlightenment |
| Shift | 1111 Hz | Elara | Perspective |
| Unity | 963 Hz | Ino | Partnership |
| Source | 1111 Hz | Shinkami | Meta-consciousness |

## Available Skills

### Development
- `/scaffold` - Create project structure
- `/refactor` - Clean and improve code
- `/optimize` - Performance optimization
- `/docs` - Generate documentation
- `/review` - Code review
- `/debug` - Debug with insight
- `/architect` - System design

### Creative
- `/write` - Creative writing assistance
- `/story` - Narrative development

## Part of the Arcanea Ecosystem

- [`@arcanea/core`](https://github.com/frankxai/arcanea/tree/main/packages/core) - Core types and constants
- [`arcanea-intelligence-os`](https://github.com/frankxai/arcanea-intelligence-os) - Unified CLI
- [`arcanea`](https://github.com/frankxai/arcanea) - Main platform

## License

MIT © [FrankX](https://frankx.ai)
