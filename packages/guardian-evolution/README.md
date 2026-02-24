# @arcanea/guardian-evolution

Guardian Evolution — SONA learning, ReasoningBank, pattern extraction, and 7 RL algorithms for Guardian growth.

## Install

```bash
npm install @arcanea/guardian-evolution
```

## Usage

```js
const { EvolutionEngine } = require('@arcanea/guardian-evolution');
const { PPO } = require('@arcanea/guardian-evolution/algorithms');
const { SONAMode } = require('@arcanea/guardian-evolution/modes');

const engine = new EvolutionEngine({
  algorithm: new PPO({ learningRate: 0.0003 }),
  mode: SONAMode.EXPLORATORY
});

// Extract patterns from Guardian activity
const patterns = await engine.extractPatterns(guardianHistory);

// Evolve the Guardian using reinforcement learning
const evolved = await engine.evolve(guardian, patterns);
console.log(evolved.fitnessScore);
```

## API

| Export | Description |
|---|---|
| `EvolutionEngine` | Core engine driving Guardian growth cycles |
| `ReasoningBank` | Persistent store for extracted reasoning patterns |
| `PatternExtractor` | Extracts actionable patterns from Guardian logs |

### Subpath Exports

- `@arcanea/guardian-evolution/algorithms` — 7 RL algorithms: `PPO`, `DQN`, `A3C`, `SAC`, `TD3`, `REINFORCE`, `CMA_ES`
- `@arcanea/guardian-evolution/modes` — SONA learning modes: `SONAMode.EXPLORATORY`, `SONAMode.EXPLOITATIVE`, `SONAMode.BALANCED`

## License

MIT
