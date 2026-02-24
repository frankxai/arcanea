# @arcanea/intelligence-bridge

Bridge layer connecting Arcanea intelligence systems with external AI providers.

## Install

```bash
npm install @arcanea/intelligence-bridge
```

## Usage

```ts
import { IntelligenceBridge } from "@arcanea/intelligence-bridge";

const bridge = new IntelligenceBridge({
  provider: "openai",
  model: "gpt-4",
});

const response = await bridge.query({
  prompt: "Analyze this dataset",
  context: localIntelligenceContext,
});
```

## API

### `IntelligenceBridge`

Main class for establishing connections between Arcanea internals and external AI providers.

- `constructor(config)` — Initialize with provider configuration.
- `query(request)` — Send a request through the bridge and return the provider response.
- `registerProvider(name, adapter)` — Register a custom provider adapter.
- `disconnect()` — Tear down the active provider connection.

### `createBridge(config)`

Factory function that returns a configured `IntelligenceBridge` instance.

### `BridgeConfig`

TypeScript interface defining provider, model, and connection options.

### `BridgeResponse`

TypeScript interface for standardized responses returned from any provider.

## Configuration

Provider adapters can be registered at runtime or supplied via the config object at construction. The bridge normalizes all provider responses into a unified `BridgeResponse` format.

## License

MIT
