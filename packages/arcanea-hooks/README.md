# @arcanea/hooks

Operational hooks system for the Arcanea Intelligence OS — self-optimizing lifecycle hooks with Guardian integration.

## Install

```bash
npm install @arcanea/hooks
```

## Usage

```js
const { HookManager } = require('@arcanea/hooks');

const hooks = new HookManager();

// Register a lifecycle hook with file pattern matching
hooks.register('build:before', {
  pattern: 'src/**/*.ts',
  handler: async (context) => {
    console.log('Pre-build hook fired for:', context.files);
  }
});

// Trigger hooks
await hooks.run('build:before', { files: changedFiles });
```

File pattern matching uses [minimatch](https://github.com/isaacs/minimatch) glob syntax.

## API

| Export | Description |
|---|---|
| `HookManager` | Core manager for registering and running hooks |
| `defineHook` | Helper to define a typed lifecycle hook |
| `matchFiles` | Utility for minimatch-based file pattern matching |
| `GuardianHookAdapter` | Adapter for wiring hooks into Guardian pipelines |

### Lifecycle Phases

- `build:before` / `build:after`
- `deploy:before` / `deploy:after`
- `guardian:activate` / `guardian:deactivate`

## License

MIT
