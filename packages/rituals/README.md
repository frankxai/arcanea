# @arcanea/rituals

Arcanea Rituals — lifecycle hooks, Twelve Spirits (background workers), ReasoningBank guidance, and daemon orchestration.

## Install

```bash
npm install @arcanea/rituals
```

## Usage

```ts
import { Ritual, onInit, onTeardown } from "@arcanea/rituals";
import { TwelveSpirits } from "@arcanea/rituals/workers";

const ritual = new Ritual("data-sync");

ritual.use(onInit(async (ctx) => {
  await ctx.prepareResources();
}));

ritual.use(onTeardown(async (ctx) => {
  await ctx.cleanup();
}));

const spirits = new TwelveSpirits();
spirits.spawn("indexer", { interval: 30_000 });
spirits.start();
```

## API

### `Ritual`

Defines a named lifecycle sequence with composable hook stages.

- `use(hook)` — Attach a lifecycle hook to the ritual.
- `execute(context)` — Run all hooks in order with the given context.

### Lifecycle Hooks

- `onInit(handler)` — Runs during initialization.
- `onTeardown(handler)` — Runs during shutdown and cleanup.

### `@arcanea/rituals/workers`

- `TwelveSpirits` — Background worker manager for long-running daemon tasks.
  - `spawn(name, options)` — Create and register a named worker.
  - `start()` / `stop()` — Control the worker pool lifecycle.

### `ReasoningBank`

Provides structured guidance data that rituals can query during execution to inform decisions.

### `DaemonOrchestrator`

Coordinates multiple rituals and spirits into a unified daemon runtime.

## License

MIT
