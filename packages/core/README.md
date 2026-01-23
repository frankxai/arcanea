# @arcanea/core

> Core types, constants, and utilities for the Arcanea ecosystem.

[![npm version](https://badge.fury.io/js/%40arcanea%2Fcore.svg)](https://www.npmjs.com/package/@arcanea/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @arcanea/core
# or
pnpm add @arcanea/core
# or
bun add @arcanea/core
```

## Usage

### Types

```typescript
import type { Guardian, Gate, Element, Luminor } from '@arcanea/core';

const myGuardian: Guardian = {
  name: 'lyssandria',
  displayName: 'Lyssandria',
  gate: 'foundation',
  godbeast: 'kaelith',
  domain: 'Earth, survival',
  element: 'earth',
  frequency: 396,
};
```

### Constants

```typescript
import { GATES, GUARDIANS, LUMINORS, ACADEMIES } from '@arcanea/core';

// Get all gates
console.log(GATES.map(g => g.name));
// ['foundation', 'flow', 'fire', 'heart', 'voice', 'sight', 'crown', 'shift', 'unity', 'source']

// Find a guardian
const draconia = GUARDIANS.find(g => g.name === 'draconia');

// Get academy info
const pyros = ACADEMIES.find(a => a.house === 'pyros');
```

### Utilities

```typescript
import {
  calculateMagicRank,
  getElementColor,
  getFrequencyProperty,
  formatGateName,
} from '@arcanea/core';

// Calculate rank based on gates opened
const rank = calculateMagicRank(5); // 'master'

// Get element color
const fireColor = getElementColor('fire'); // '#ff4500'

// Get frequency meaning
const meaning = getFrequencyProperty(528); // 'Transformation and miracles (Love frequency)'

// Format gate name
const display = formatGateName('foundation'); // 'Foundation Gate'
```

## The Arcanea Universe

### The Ten Gates

| Gate | Frequency | Guardian | Domain |
|------|-----------|----------|--------|
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

### Magic Ranks

| Gates Open | Rank |
|------------|------|
| 0-2 | Apprentice |
| 3-4 | Mage |
| 5-6 | Master |
| 7-8 | Archmage |
| 9-10 | Luminor |

### The Five Elements

- **Fire** - Energy, passion, transformation
- **Water** - Flow, healing, memory
- **Earth** - Stability, growth, foundation
- **Wind** - Freedom, speed, change
- **Void** - Potential, transcendence, mystery

## Part of the Arcanea Ecosystem

- [`arcanea`](https://github.com/frankxai/arcanea) - Main platform
- [`claude-arcanea`](https://github.com/frankxai/claude-arcanea) - Claude integration
- [`arcanea-intelligence-os`](https://github.com/frankxai/arcanea-intelligence-os) - Unified CLI

## License

MIT © [FrankX](https://frankx.ai)
