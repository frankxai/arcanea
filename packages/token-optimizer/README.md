# @arcanea/token-optimizer

Token budget optimization for Arcanea AI interactions — context window management and prompt compression.

## Install

```bash
npm install @arcanea/token-optimizer
```

## Usage

```ts
import { TokenOptimizer } from "@arcanea/token-optimizer";

const optimizer = new TokenOptimizer({
  maxTokens: 128_000,
  reservedTokens: 4_096,
});

const budget = optimizer.allocate({
  system: systemPrompt,
  history: conversationHistory,
  tools: toolDefinitions,
});

const compressed = optimizer.compress(budget, {
  strategy: "semantic",
  target: 0.7,
});
```

## API

### `TokenOptimizer`

Main class for managing token budgets and compressing prompts.

- `constructor(config)` — Initialize with token limits and reserved allocation.
- `count(text)` — Return the token count for a given string.
- `allocate(sections)` — Distribute tokens across named prompt sections.
- `compress(budget, options)` — Compress sections to fit within the target ratio.
- `fit(sections)` — Shorthand: allocate and compress in a single call.

### `TokenBudget`

TypeScript interface mapping section names to their allocated token counts and content.

### `CompressionStrategy`

Union type for supported strategies: `"truncate"`, `"semantic"`, `"summarize"`.

### `OptimizerConfig`

TypeScript interface for max token limit, reserved tokens, and default compression options.

## License

MIT
