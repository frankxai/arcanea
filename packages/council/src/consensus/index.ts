/**
 * @arcanea/council — Council Engine Factory
 *
 * Creates the appropriate consensus engine based on the selected Council Protocol.
 * Maps Arcanea's Council terminology to the underlying consensus implementations:
 *
 *   council-vote     → Raft (leader election, log replication)
 *   shinkamis-decree → Byzantine BFT (fault-tolerant under hostile agents)
 *   whisper          → Gossip (eventual consistency via propagation)
 *   gate-quorum      → Arcanea-native frequency-weighted Guardian voting
 *   ancient-accord   → Paxos (falls back to Raft — same lineage)
 */

import { EventEmitter } from 'node:events';
import type {
  CouncilProtocol,
  CouncilConfig,
  Petition,
  Seal,
  CouncilResult,
  ConsensusProposal,
  ConsensusVote,
  ConsensusResult,
  ICouncilEngine,
} from '../types.js';
import type { GuardianName, Element } from '../external-types.js';
import { ByzantineConsensus, type ByzantineConfig } from './byzantine.js';
import { RaftConsensus, type RaftConfig } from './raft.js';
import { GossipConsensus, type GossipConfig } from './gossip.js';
import { GateQuorumConsensus, type GateQuorumOptions } from './gate-quorum.js';

// ── Internal adapter types ──────────────────────────────────────

/**
 * Loose engine interface that accepts both old (ConsensusProposal) and
 * new (Petition) field shapes. The ported consensus engines use the old
 * field names; GateQuorum uses the new names. CouncilEngine normalizes
 * at the public boundary.
 */
interface InternalEngine extends EventEmitter {
  initialize(config?: CouncilConfig): Promise<void>;
  shutdown(): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propose(value: unknown): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vote(id: string, voteOrSeal: any): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  awaitConsensus(id: string): Promise<any>;
}

/** Adapt a ConsensusProposal (old fields) to a Petition (Arcanea fields) */
function toPetition(cp: ConsensusProposal): Petition {
  return {
    id: cp.id,
    petitionerId: cp.proposerId,
    value: cp.value,
    term: cp.term,
    timestamp: cp.timestamp,
    seals: adaptVotesToSeals(cp.votes),
    status: cp.status,
  };
}

/** Adapt a votes Map<string, ConsensusVote> to seals Map<string, Seal> */
function adaptVotesToSeals(votes: Map<string, ConsensusVote>): Map<string, Seal> {
  const seals = new Map<string, Seal>();
  for (const [key, vote] of votes) {
    seals.set(key, {
      guardianId: vote.voterId,
      approve: vote.approve,
      confidence: vote.confidence,
      timestamp: vote.timestamp,
      reason: vote.reason,
    });
  }
  return seals;
}

/** Adapt a Seal (Arcanea) to ConsensusVote (old) for ported engines */
function toConsensusVote(seal: Seal): ConsensusVote {
  return {
    voterId: seal.guardianId,
    approve: seal.approve,
    confidence: seal.confidence,
    timestamp: seal.timestamp,
    reason: seal.reason,
  };
}

/** Adapt a ConsensusResult (old) to CouncilResult (Arcanea) */
function toCouncilResult(cr: ConsensusResult): CouncilResult {
  return {
    petitionId: cr.proposalId,
    approved: cr.approved,
    approvalRate: cr.approvalRate,
    participationRate: cr.participationRate,
    finalValue: cr.finalValue,
    rounds: cr.rounds,
    durationMs: cr.durationMs,
  };
}

// ── Council Engine ─────────────────────────────────────────────

export interface CouncilEngineOptions {
  protocol: CouncilProtocol;
  nodeId: string;

  // Protocol-specific options (only the relevant one is used)
  byzantine?: ByzantineConfig;
  raft?: RaftConfig;
  gossip?: GossipConfig;
  gateQuorum?: GateQuorumOptions;
}

/**
 * Unified Council Engine that wraps the selected consensus protocol.
 * Provides a consistent ICouncilEngine interface regardless of the
 * underlying algorithm. Adapts between ported claude-flow field names
 * and Arcanea's Council terminology at the boundary.
 */
export class CouncilEngine extends EventEmitter implements ICouncilEngine {
  private protocol: CouncilProtocol;
  private engine: InternalEngine;
  private usesLegacyFields: boolean;
  private addNodeFn: (nodeId: string, options?: { isPrimary?: boolean }) => void;
  private removeNodeFn: (nodeId: string) => void;

  constructor(options: CouncilEngineOptions) {
    super();
    this.protocol = options.protocol;
    this.usesLegacyFields = options.protocol !== 'gate-quorum';

    switch (options.protocol) {
      case 'shinkamis-decree': {
        const byz = new ByzantineConsensus(options.nodeId, options.byzantine);
        this.engine = byz;
        this.addNodeFn = (id, opts) => byz.addNode(id, opts?.isPrimary ?? false);
        this.removeNodeFn = (id) => byz.removeNode(id);
        break;
      }

      case 'council-vote':
      case 'ancient-accord': {
        const raft = new RaftConsensus(options.nodeId, options.raft);
        this.engine = raft;
        this.addNodeFn = (id) => raft.addPeer(id);
        this.removeNodeFn = (id) => raft.removePeer(id);
        break;
      }

      case 'whisper': {
        const gossip = new GossipConsensus(options.nodeId, options.gossip);
        this.engine = gossip;
        this.addNodeFn = (id) => gossip.addNode(id);
        this.removeNodeFn = (id) => gossip.removeNode(id);
        break;
      }

      case 'gate-quorum': {
        const gq = new GateQuorumConsensus(options.nodeId, options.gateQuorum);
        this.engine = gq;
        this.addNodeFn = (id, opts) => gq.addNode(id, opts);
        this.removeNodeFn = (id) => gq.removeNode(id);
        break;
      }

      default: {
        const fallback = new RaftConsensus(options.nodeId);
        this.engine = fallback;
        this.usesLegacyFields = true;
        this.addNodeFn = (id) => fallback.addPeer(id);
        this.removeNodeFn = (id) => fallback.removePeer(id);
      }
    }

    // Forward all events from the underlying engine
    const originalEmit = this.engine.emit.bind(this.engine);
    this.engine.emit = (event: string | symbol, ...args: unknown[]) => {
      this.emit(event, ...args);
      return originalEmit(event, ...args);
    };
  }

  async initialize(config?: CouncilConfig): Promise<void> {
    await this.engine.initialize(config);
    this.emit('council.initialized', { protocol: this.protocol });
  }

  async shutdown(): Promise<void> {
    await this.engine.shutdown();
    this.emit('council.shutdown', { protocol: this.protocol });
  }

  addNode(nodeId: string, options?: { isPrimary?: boolean; guardian?: GuardianName }): void {
    this.addNodeFn(nodeId, options);
  }

  removeNode(nodeId: string): void {
    this.removeNodeFn(nodeId);
  }

  async propose(value: unknown): Promise<Petition> {
    const result = await this.engine.propose(value);
    return this.usesLegacyFields ? toPetition(result) : result;
  }

  async vote(petitionId: string, seal: Seal): Promise<void> {
    if (this.usesLegacyFields) {
      return this.engine.vote(petitionId, toConsensusVote(seal));
    }
    return this.engine.vote(petitionId, seal);
  }

  async awaitConsensus(petitionId: string): Promise<CouncilResult> {
    const result = await this.engine.awaitConsensus(petitionId);
    return this.usesLegacyFields ? toCouncilResult(result) : result;
  }

  getProtocol(): CouncilProtocol {
    return this.protocol;
  }
}

// ── Protocol Selection ─────────────────────────────────────────

/**
 * Element-based protocol routing.
 * Each element has a natural affinity for a Council Protocol:
 *
 *   earth → council-vote (Raft) — stable leadership
 *   fire  → shinkamis-decree (Byzantine) — adversarial resilience
 *   water → whisper (Gossip) — fluid propagation
 *   wind  → gate-quorum — dynamic, frequency-driven
 *   void  → shinkamis-decree — fault tolerance in the unknown
 *   spirit → gate-quorum — transcendent, weighted by consciousness
 */
const ELEMENT_PROTOCOL_MAP: Record<Element, CouncilProtocol> = {
  earth: 'council-vote',
  fire: 'shinkamis-decree',
  water: 'whisper',
  wind: 'gate-quorum',
  void: 'shinkamis-decree',
  spirit: 'gate-quorum',
};

export function selectCouncilProtocol(element?: Element): CouncilProtocol {
  if (!element) return 'gate-quorum'; // Arcanea's native protocol is the default
  return ELEMENT_PROTOCOL_MAP[element] ?? 'gate-quorum';
}

// ── Factory ────────────────────────────────────────────────────

export function createCouncilEngine(options: CouncilEngineOptions): CouncilEngine {
  return new CouncilEngine(options);
}

// Re-export consensus implementations
export { ByzantineConsensus, type ByzantineConfig } from './byzantine.js';
export { RaftConsensus, type RaftConfig } from './raft.js';
export { GossipConsensus, type GossipConfig } from './gossip.js';
export { GateQuorumConsensus, type GateQuorumOptions } from './gate-quorum.js';
