# @arcanea/sona-learner

SONA adaptive learning engine for Arcanea — pattern recognition, learning cycles, and self-optimization.

## Install

```bash
npm install @arcanea/sona-learner
```

## Usage

```ts
import { SonaLearner } from "@arcanea/sona-learner";

const learner = new SonaLearner({
  patternThreshold: 0.75,
  cycleInterval: 60_000,
});

learner.ingest(interactionData);

const patterns = await learner.recognize();
const optimized = await learner.optimize(patterns);

learner.startCycle();
```

## API

### `SonaLearner`

Core adaptive learning engine.

- `constructor(config)` — Initialize with threshold and cycle parameters.
- `ingest(data)` — Feed interaction data into the learning pipeline.
- `recognize()` — Run pattern recognition on ingested data.
- `optimize(patterns)` — Apply self-optimization based on recognized patterns.
- `startCycle()` — Begin continuous learning cycles at the configured interval.
- `stopCycle()` — Halt the active learning cycle.

### `SonaConfig`

TypeScript interface for learner configuration: pattern thresholds, cycle timing, and optimization constraints.

### `Pattern`

TypeScript interface describing a recognized pattern with confidence score, frequency, and metadata.

### `LearningCycle`

Manages the timing and execution of iterative learn-recognize-optimize loops.

## License

MIT
