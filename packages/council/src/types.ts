/**
 * @arcanea/council — Type Definitions
 *
 * Rebranded from claude-flow swarm types to Arcanea Council terminology.
 * Consensus algorithms become Council protocols. Swarm topology becomes
 * Guardian Council formation. Queen becomes Shinkami.
 *
 * Backward-compatible interfaces (ConsensusProposal, ConsensusVote,
 * ConsensusResult) preserve the original claude-flow field names so
 * ported consensus implementations work without modification.
 */

import { EventEmitter } from 'node:events';
import type { GuardianName, Element } from './external-types.js';

// ── Council Protocol Types ───────────────────────────────────

/**
 * Available consensus protocols.
 * - council-vote (Raft) — Leader-based, one Guardian leads
 * - shinkamis-decree (Byzantine) — Fault-tolerant under hostile agents
 * - whisper (Gossip) — Eventual consistency via propagation
 * - gate-quorum (NEW) — Frequency-weighted voting across Guardians
 * - ancient-accord (Paxos) — Falls back to Raft
 */
export type CouncilProtocol =
  | 'council-vote'      // Raft
  | 'shinkamis-decree'  // Byzantine BFT
  | 'whisper'           // Gossip
  | 'gate-quorum'       // NEW: Arcanea-specific
  | 'ancient-accord';   // Paxos (fallback to Raft)

/** Backward-compatible alias for claude-flow code */
export type ConsensusAlgorithm = CouncilProtocol;

export interface CouncilConfig {
  protocol: CouncilProtocol;
  threshold: number;
  timeoutMs: number;
  maxRounds: number;
  requireQuorum: boolean;
}

/** Backward-compatible alias — ported code uses Partial<ConsensusConfig> */
export type ConsensusConfig = CouncilConfig;

// ── Petition & Seal Types ────────────────────────────────────

/** A proposal submitted to the Council (Arcanea naming) */
export interface Petition {
  id: string;
  petitionerId: string;
  value: unknown;
  term: number;
  timestamp: Date;
  seals: Map<string, Seal>;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

/**
 * Backward-compatible proposal type for ported consensus code.
 * Uses the original claude-flow field names (proposerId, votes).
 */
export interface ConsensusProposal {
  id: string;
  proposerId: string;
  value: unknown;
  term: number;
  timestamp: Date;
  votes: Map<string, ConsensusVote>;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

/** A Guardian's vote on a petition (Arcanea naming) */
export interface Seal {
  guardianId: string;
  approve: boolean;
  confidence: number;
  timestamp: Date;
  reason?: string;
}

/**
 * Backward-compatible vote type for ported consensus code.
 * Uses the original claude-flow field name (voterId).
 */
export interface ConsensusVote {
  voterId: string;
  approve: boolean;
  confidence: number;
  timestamp: Date;
  reason?: string;
}

/** Result of a Council deliberation (Arcanea naming) */
export interface CouncilResult {
  petitionId: string;
  approved: boolean;
  approvalRate: number;
  participationRate: number;
  finalValue: unknown;
  rounds: number;
  durationMs: number;
}

/**
 * Backward-compatible result type for ported consensus code.
 * Uses the original claude-flow field name (proposalId).
 */
export interface ConsensusResult {
  proposalId: string;
  approved: boolean;
  approvalRate: number;
  participationRate: number;
  finalValue: unknown;
  rounds: number;
  durationMs: number;
}

// ── Council Engine Interface ─────────────────────────────────

export interface ICouncilEngine extends EventEmitter {
  initialize(config?: CouncilConfig): Promise<void>;
  shutdown(): Promise<void>;
  addNode(nodeId: string, options?: { isPrimary?: boolean }): void;
  removeNode(nodeId: string): void;
  propose(value: unknown): Promise<Petition>;
  vote(petitionId: string, seal: Seal): Promise<void>;
  awaitConsensus(petitionId: string): Promise<CouncilResult>;
}

/** Backward-compatible alias */
export type IConsensusEngine = ICouncilEngine;

// ── Topology Types ───────────────────────────────────────────

export type TopologyType = 'mesh' | 'hierarchical' | 'centralized' | 'hybrid';

export interface TopologyNode {
  id: string;
  agentId: string;
  role: 'shinkami' | 'guardian' | 'servant' | 'equal';
  status: 'active' | 'inactive' | 'syncing' | 'failed';
  guardian?: GuardianName;
  connections: string[];
  metadata: Record<string, unknown>;
}

// ── Gate Quorum Types (NEW — Arcanea-specific) ───────────────

export interface GateQuorumConfig {
  /** How many Guardians must participate (1-10) */
  quorumSize: number;

  /** Weight votes by Gate frequency (higher Hz = more weight) */
  weightByFrequency: boolean;

  /** Approval threshold as fraction of total weight (0-1) */
  approvalThreshold: number;

  /** How to break ties */
  tieBreaker: 'highest-frequency' | 'element-affinity' | 'random';

  /** Prefer Guardians of this element */
  elementAffinity?: Element;

  /** Timeout per vote in ms */
  voteTimeoutMs: number;

  /** Allow Shinkami override */
  shinkamOverride: boolean;
}

export interface GateQuorumVote {
  guardian: GuardianName;
  frequency: number;
  element: Element;
  vote: 'approve' | 'reject' | 'abstain';
  weight: number;
  reason?: string;
  timestamp: number;
}

export interface GateQuorumResult {
  approved: boolean;
  totalWeight: number;
  approvalWeight: number;
  rejectionWeight: number;
  abstainWeight: number;
  votes: GateQuorumVote[];
  shinkamOverrideUsed: boolean;
  durationMs: number;
}

// ── Constants ────────────────────────────────────────────────

export const COUNCIL_CONSTANTS = {
  DEFAULT_HEARTBEAT_INTERVAL_MS: 5000,
  DEFAULT_HEALTH_CHECK_INTERVAL_MS: 10000,
  DEFAULT_TASK_TIMEOUT_MS: 300000,
  DEFAULT_CONSENSUS_TIMEOUT_MS: 30000,
  DEFAULT_MESSAGE_TTL_MS: 60000,
  DEFAULT_MAX_AGENTS: 100,
  DEFAULT_MAX_TASKS: 1000,
  DEFAULT_CONSENSUS_THRESHOLD: 0.66,
  MAX_QUEUE_SIZE: 10000,
  MAX_RETRIES: 3,
} as const;

/** Backward-compatible alias */
export const SWARM_CONSTANTS = COUNCIL_CONSTANTS;
