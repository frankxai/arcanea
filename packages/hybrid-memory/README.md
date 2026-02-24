# @arcanea/hybrid-memory

Hybrid memory system bridging in-memory and persistent storage for Arcanea agents.

## Install

```bash
npm install @arcanea/hybrid-memory
```

## Usage

```js
const { HybridMemory } = require('@arcanea/hybrid-memory');

const memory = new HybridMemory({
  hotCapacity: 1000,        // max entries in fast in-memory tier
  persistPath: './data/mem', // path for durable storage
  evictionPolicy: 'lru'
});

// Write — automatically promoted to hot tier
await memory.set('task:alpha', { status: 'active', score: 0.95 });

// Read — served from memory when hot, disk when cold
const entry = await memory.get('task:alpha');

// Flush hot tier to persistent storage
await memory.flush();
```

## API

| Export | Description |
|---|---|
| `HybridMemory` | Unified interface across in-memory and persistent tiers |
| `HotTier` | Fast in-memory cache with configurable eviction |
| `ColdTier` | Durable on-disk storage backend |
| `EvictionPolicy` | Enum of supported policies: `LRU`, `LFU`, `TTL` |
| `migrate` | Utility to migrate data between storage backends |

## License

MIT
