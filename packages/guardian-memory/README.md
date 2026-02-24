# @arcanea/guardian-memory

Persistent semantic memory for the Ten Guardians — HNSW vector search with Guardian-namespaced vaults.

## Install

```bash
npm install @arcanea/guardian-memory
```

## Usage

```js
const { GuardianMemory } = require('@arcanea/guardian-memory');
const { HNSWIndex } = require('@arcanea/guardian-memory/hnsw');

const memory = new GuardianMemory({
  guardian: 'oracle',
  dimensions: 384
});

// Store a memory with its embedding vector
await memory.store({
  key: 'insight-42',
  content: 'Pattern detected in deployment logs',
  vector: embeddingVector
});

// Semantic search using HNSW nearest-neighbor lookup
const results = await memory.search({
  vector: queryVector,
  topK: 5
});

console.log(results); // ranked by cosine similarity
```

## API

| Export | Description |
|---|---|
| `GuardianMemory` | Namespaced memory vault scoped to a single Guardian |
| `MemoryVault` | Low-level persistent storage backend |
| `SemanticSearch` | High-level search across Guardian memory spaces |

### Subpath Exports

- `@arcanea/guardian-memory/hnsw` — `HNSWIndex`, `HNSWConfig` for direct vector index access

## License

MIT
