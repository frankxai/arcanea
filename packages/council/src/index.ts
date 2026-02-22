/**
 * @arcanea/council
 *
 * Guardian Council consensus mechanics for the Ten Guardians.
 * Provides four consensus protocols mapped to Arcanea's mythology:
 *
 *   council-vote     — Leader-based (Raft). One Guardian leads.
 *   shinkamis-decree — Byzantine fault tolerance. Resilient under hostile agents.
 *   whisper          — Gossip protocol. Eventual consistency via propagation.
 *   gate-quorum      — Arcanea-native. Frequency-weighted Guardian voting.
 *   ancient-accord   — Paxos lineage. Falls back to council-vote.
 *
 * @example
 * ```typescript
 * import { createCouncilEngine, selectCouncilProtocol } from '@arcanea/council';
 *
 * // Auto-select protocol by element affinity
 * const protocol = selectCouncilProtocol('fire'); // → 'shinkamis-decree'
 *
 * // Create the Council Engine
 * const council = createCouncilEngine({
 *   protocol,
 *   nodeId: 'draconia-prime',
 * });
 *
 * // Add Guardian nodes
 * council.addNode('lyssandria-node', { guardian: 'lyssandria' });
 * council.addNode('leyla-node', { guardian: 'leyla' });
 *
 * // Submit a petition and await consensus
 * await council.initialize();
 * const petition = await council.propose({ action: 'deploy-v2' });
 * const result = await council.awaitConsensus(petition.id);
 * console.log(result.approved ? 'Council approves' : 'Council rejects');
 * ```
 */

// ── Types ────────────────────────────────────────────────────
export type {
  CouncilProtocol,
  ConsensusAlgorithm,
  CouncilConfig,
  ConsensusConfig,
  Petition,
  ConsensusProposal,
  Seal,
  ConsensusVote,
  CouncilResult,
  ConsensusResult,
  ICouncilEngine,
  IConsensusEngine,
  TopologyType,
  TopologyNode,
  GateQuorumConfig,
  GateQuorumVote,
  GateQuorumResult,
} from './types.js';

export { COUNCIL_CONSTANTS, SWARM_CONSTANTS } from './types.js';

// ── Consensus Engines ────────────────────────────────────────
export {
  CouncilEngine,
  createCouncilEngine,
  selectCouncilProtocol,
  type CouncilEngineOptions,
} from './consensus/index.js';

export {
  ByzantineConsensus,
  type ByzantineConfig,
} from './consensus/byzantine.js';

export {
  RaftConsensus,
  type RaftConfig,
} from './consensus/raft.js';

export {
  GossipConsensus,
  type GossipConfig,
} from './consensus/gossip.js';

export {
  GateQuorumConsensus,
  type GateQuorumOptions,
} from './consensus/gate-quorum.js';
