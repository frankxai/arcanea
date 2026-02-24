# @starlight/runtime

The Universal Runtime for Starlight Protocol context files. Load structured context (identity, intellect, protocol, agency, arcana layers) and generate system prompts for AI agents.

## Install

```bash
npm install @starlight/runtime
```

## Quick Start

```typescript
import { StarlightRuntime } from '@starlight/runtime';

const runtime = new StarlightRuntime();
await runtime.loadFromDirectory('./starlight-protocol');
const prompt = runtime.generateSystemPrompt();
```

## What It Does

- Parses Starlight Protocol vault files (Markdown + YAML frontmatter)
- Validates context structure with Zod schemas
- Generates coherent system prompts from layered context
- Supports 5 layers: Identity, Intellect, Protocol, Agency, Arcana

## Part of the Arcanea Ecosystem

Built by [FrankX](https://frankx.ai) | [GitHub](https://github.com/frankxai/arcanea)
