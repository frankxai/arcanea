# @arcanea/council

Guardian Council consensus mechanics — Byzantine, Raft, Gossip, and Gate Quorum protocols for the Ten Guardians.

## Install

```bash
npm install @arcanea/council
```

## Usage

```js
const { Council } = require('@arcanea/council');
const { RaftConsensus } = require('@arcanea/council/consensus');

const council = new Council({ guardians: 10 });

// Run a Raft consensus round
const raft = new RaftConsensus(council);
const decision = await raft.propose({
  action: 'deploy:artifact',
  requiredMajority: 0.6
});

console.log(decision.accepted); // true | false
```

## API

| Export | Description |
|---|---|
| `Council` | Core council orchestrator for the Ten Guardians |
| `ByzantineConsensus` | Byzantine fault-tolerant consensus protocol |
| `RaftConsensus` | Raft leader-election and log replication |
| `GossipProtocol` | Gossip-based state dissemination |
| `GateQuorum` | Gate Quorum — threshold-based gating decisions |

### Subpath Exports

- `@arcanea/council/consensus` — all consensus protocol implementations

## License

MIT
