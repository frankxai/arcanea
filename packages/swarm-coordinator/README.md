# @arcanea/swarm-coordinator

Multi-agent swarm coordination with topology-aware task distribution, workflow execution, and Guardian-integrated consensus.

## Install

```bash
npm install @arcanea/swarm-coordinator
```

## Usage

```ts
import { SwarmCoordinator } from "@arcanea/swarm-coordinator";
import type { SwarmTopology, AgentNode } from "@arcanea/swarm-coordinator/types";

const swarm = new SwarmCoordinator({
  topology: "mesh",
  consensusThreshold: 0.67,
});

swarm.addAgent({ id: "analyst-1", role: "analyst" });
swarm.addAgent({ id: "writer-1", role: "writer" });

const result = await swarm.execute({
  task: "Generate and review report",
  workflow: ["analyze", "draft", "review", "finalize"],
});
```

## API

### `SwarmCoordinator`

Manages multi-agent task distribution and workflow execution.

- `constructor(config)` — Initialize with topology and consensus settings.
- `addAgent(node)` — Register an agent node in the swarm.
- `removeAgent(id)` — Remove an agent from the swarm.
- `execute(task)` — Distribute and run a task through the configured workflow.
- `consensus(proposal)` — Run Guardian-integrated consensus across active agents.

### `@arcanea/swarm-coordinator/types`

- `SwarmTopology` — Union type for supported topologies (`"mesh"`, `"star"`, `"ring"`).
- `AgentNode` — Interface describing an agent's identity, role, and capabilities.
- `SwarmTask` — Interface for task definitions including workflow steps.
- `ConsensusResult` — Interface for consensus outcomes with vote tallies.

### `GuardianConsensus`

Consensus protocol backed by Guardian verification to ensure swarm decisions meet integrity requirements.

## License

MIT
