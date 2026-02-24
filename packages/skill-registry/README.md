# @arcanea/skill-registry

Dynamic skill discovery and activation for the Arcanea Intelligence OS — capability matching, versioning, health monitoring, and Guardian-aware routing.

## Install

```bash
npm install @arcanea/skill-registry
```

## Usage

```js
import { SkillRegistry } from '@arcanea/skill-registry';

const registry = new SkillRegistry();

// Register a skill
registry.register({
  id: 'code-gen',
  name: 'Code Generator',
  version: '1.0.0',
  description: 'Generates TypeScript code from specs',
  provider: 'shinkami-agent',
  capabilities: ['code-generation', 'typescript', 'refactoring'],
  guardianAffinity: ['shinkami'],
});

// Discover skills by capability
const matches = registry.discover({
  capabilities: ['code-generation'],
  activeOnly: true,
  minHealth: 0.5,
});

// Create skill pipelines
const pipeline = registry.createPipeline('code-review', [
  { skillId: 'code-gen' },
  { skillId: 'code-review', fallbackSkillId: 'manual-review' },
]);
```

## Features

- **Runtime registration** — register and deregister skills dynamically
- **Capability matching** — semantic discovery by capability tags
- **Version compatibility** — semver-aware dependency checking
- **Health monitoring** — automatic health scoring with gradual degradation/recovery
- **Guardian affinity** — route skills to matching Guardians
- **Skill pipelines** — compose skills into multi-step chains
- **Execution tracking** — success rates, latency, and execution counts

## API

| Export | Description |
|---|---|
| `SkillRegistry` | Main registry for skill management and discovery |

## License

MIT
