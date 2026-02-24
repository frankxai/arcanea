# @arcanea/creative-pipeline

Creative asset pipeline with session management and asset vault.

## Install

```bash
npm install @arcanea/creative-pipeline
```

## Usage

```js
const { Pipeline, AssetVault } = require('@arcanea/creative-pipeline');

const vault = new AssetVault({ storagePath: './assets' });

const pipeline = new Pipeline({ vault });

// Start a creative session
const session = await pipeline.createSession({ name: 'album-artwork' });

// Process an asset through the pipeline
const result = await session.process({
  input: './raw/cover.png',
  transforms: ['resize', 'optimize', 'watermark']
});

console.log(result.output); // path to processed asset in vault
await session.close();
```

## API

| Export | Description |
|---|---|
| `Pipeline` | Orchestrates asset transforms end-to-end |
| `AssetVault` | Persistent storage and retrieval for creative assets |
| `Session` | Scoped creative session with history and rollback |
| `Transform` | Base class for defining custom asset transforms |
| `TransformChain` | Composable chain of sequential transforms |

## License

MIT
