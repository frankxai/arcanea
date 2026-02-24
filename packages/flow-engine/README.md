# @arcanea/flow-engine

Advanced workflow orchestration for the Arcanea Intelligence OS — conditional branching, parallel execution, loops, saga compensation, and state persistence.

## Install

```bash
npm install @arcanea/flow-engine
```

## Usage

```js
import { FlowEngine } from '@arcanea/flow-engine';

const engine = new FlowEngine();

engine.registerFlow({
  id: 'deploy',
  name: 'Deploy Pipeline',
  enableCompensation: true,
  steps: [
    {
      id: 'build',
      name: 'Build',
      type: 'task',
      execute: async (ctx) => {
        ctx.log('Building...');
        ctx.data.artifact = 'dist.tar.gz';
        return 'built';
      },
      compensate: async (ctx) => {
        ctx.log('Rolling back build artifacts');
      },
    },
    {
      id: 'test',
      name: 'Test',
      type: 'task',
      dependsOn: ['build'],
      retry: { maxAttempts: 3, delayMs: 1000, backoffMultiplier: 2 },
      execute: async (ctx) => {
        ctx.log('Running tests...');
        return 'passed';
      },
    },
    {
      id: 'deploy-check',
      name: 'Deploy Check',
      type: 'condition',
      dependsOn: ['test'],
      condition: async (ctx) => ctx.data.env === 'prod' ? 'prod' : 'staging',
      branches: {
        prod: ['deploy-prod'],
        staging: ['deploy-staging'],
      },
    },
    {
      id: 'deploy-prod',
      name: 'Deploy Production',
      type: 'task',
      execute: async (ctx) => ctx.log('Deploying to production'),
    },
    {
      id: 'deploy-staging',
      name: 'Deploy Staging',
      type: 'task',
      execute: async (ctx) => ctx.log('Deploying to staging'),
    },
  ],
});

const run = await engine.execute('deploy', { env: 'prod' });
console.log(run.status); // 'completed'
```

## Features

- **Conditional branching** — if/else/switch with dynamic branch selection
- **Parallel execution** — run multiple steps concurrently
- **Loops** — iterate over data arrays with body steps
- **Subflows** — nested workflow composition
- **Saga compensation** — automatic rollback of completed steps on failure
- **Retry strategies** — configurable retries with exponential backoff
- **Wait steps** — timed delays with dynamic duration
- **State persistence** — snapshot and restore flow runs
- **Dependency ordering** — topological sort with dependency resolution
- **Tracing** — built-in trace log for debugging

## Step Types

| Type | Description |
|---|---|
| `task` | Execute a function |
| `condition` | Branch based on runtime evaluation |
| `parallel` | Execute multiple steps concurrently |
| `loop` | Iterate over a data array |
| `subflow` | Execute a nested flow |
| `wait` | Pause for a duration |

## API

| Export | Description |
|---|---|
| `FlowEngine` | Main orchestration engine |

## License

MIT
