# @arcanea/prompt-books

Arcanea Prompt Books — Shared types, constants, context engine, markdown parser, and weight syntax for AI prompt management.

## Install

```bash
npm install @arcanea/prompt-books
```

## Usage

```ts
import { ContextEngine } from "@arcanea/prompt-books/context-engine";
import { parseMarkdown } from "@arcanea/prompt-books/markdown";
import { parseWeights } from "@arcanea/prompt-books/weight-syntax";
import { DEFAULTS } from "@arcanea/prompt-books/constants";
import type { PromptBook } from "@arcanea/prompt-books/types";

const engine = new ContextEngine();
engine.load(parseMarkdown(rawPrompt));

const weighted = parseWeights("emphasis:0.8 creativity:0.6");
const result = engine.resolve({ weights: weighted });
```

## API

### `@arcanea/prompt-books/types`

TypeScript interfaces for `PromptBook`, `PromptEntry`, `WeightMap`, and related structures.

### `@arcanea/prompt-books/constants`

Default values, limits, and shared configuration constants used across prompt book operations.

### `@arcanea/prompt-books/context-engine`

- `ContextEngine` — Resolves prompt context by combining entries, weights, and constraints.

### `@arcanea/prompt-books/markdown`

- `parseMarkdown(source)` — Parse markdown-formatted prompt books into structured data.

### `@arcanea/prompt-books/weight-syntax`

- `parseWeights(input)` — Parse weight syntax strings into a `WeightMap`.
- `serializeWeights(map)` — Convert a `WeightMap` back to weight syntax.

## License

MIT
