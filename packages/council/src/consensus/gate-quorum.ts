/**
 * @arcanea/council — Gate Quorum Consensus
 *
 * Arcanea-specific consensus protocol where the Ten Guardians vote
 * with weights determined by their Gate frequency (174-1111 Hz).
 *
 * Higher-frequency Guardians have more voting weight:
 *   Lyssandria (174 Hz) = 1.0x weight (broad acceptance, foundation)
 *   Shinkami (1111 Hz)   = 6.38x weight (selective, source)
 *
 * Element affinity boosts votes from Guardians whose element matches the task.
 * Shinkami can override any decision (Source authority).
 */

import { EventEmitter } from 'node:events';
import {
  GUARDIANS,
  type GuardianName,
  type Element,
} from '../external-types.js';
import type {
  GateQuorumConfig,
  GateQuorumVote,
  GateQuorumResult,
  Petition,
  Seal,
  CouncilResult,
  CouncilConfig,
} from '../types.js';

const BASE_FREQUENCY = 174; // Foundation Gate — lowest frequency

export interface GateQuorumOptions {
  quorumSize?: number;
  weightByFrequency?: boolean;
  approvalThreshold?: number;
  tieBreaker?: 'highest-frequency' | 'element-affinity' | 'random';
  elementAffinity?: Element;
  voteTimeoutMs?: number;
  shinkamOverride?: boolean;
}

export class GateQuorumConsensus extends EventEmitter {
  private config: GateQuorumConfig;
  private nodeId: string;
  private nodes = new Map<string, { guardian?: GuardianName; frequency: number; element: Element }>();
  private proposals = new Map<string, Petition>();
  private proposalVotes = new Map<string, GateQuorumVote[]>();
  private initialized = false;

  constructor(nodeId: string, options: GateQuorumOptions = {}) {
    super();
    this.nodeId = nodeId;
    this.config = {
      quorumSize: options.quorumSize ?? 5,
      weightByFrequency: options.weightByFrequency ?? true,
      approvalThreshold: options.approvalThreshold ?? 0.6,
      tieBreaker: options.tieBreaker ?? 'highest-frequency',
      elementAffinity: options.elementAffinity,
      voteTimeoutMs: options.voteTimeoutMs ?? 30000,
      shinkamOverride: options.shinkamOverride ?? true,
    };
  }

  async initialize(config?: CouncilConfig): Promise<void> {
    if (config) {
      this.config = {
        ...this.config,
        approvalThreshold: config.threshold,
        voteTimeoutMs: config.timeoutMs,
      };
    }
    this.initialized = true;
    this.emit('initialized', { nodeId: this.nodeId, protocol: 'gate-quorum' });
  }

  async shutdown(): Promise<void> {
    this.proposals.clear();
    this.proposalVotes.clear();
    this.emit('shutdown');
  }

  /**
   * Add a Guardian node to the quorum.
   */
  addNode(nodeId: string, options?: { guardian?: GuardianName; isPrimary?: boolean }): void {
    const guardian = options?.guardian;
    if (guardian && GUARDIANS[guardian]) {
      const profile = GUARDIANS[guardian];
      this.nodes.set(nodeId, {
        guardian,
        frequency: profile.frequency,
        element: profile.element,
      });
    } else {
      this.nodes.set(nodeId, {
        frequency: BASE_FREQUENCY,
        element: 'void',
      });
    }
  }

  removeNode(nodeId: string): void {
    this.nodes.delete(nodeId);
  }

  /**
   * Submit a petition to the Gate Quorum.
   */
  async propose(value: unknown): Promise<Petition> {
    const petition: Petition = {
      id: `gq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      petitionerId: this.nodeId,
      value,
      term: 1,
      timestamp: new Date(),
      seals: new Map(),
      status: 'pending',
    };

    this.proposals.set(petition.id, petition);
    this.proposalVotes.set(petition.id, []);

    this.emit('consensus.proposed', {
      proposalId: petition.id,
      protocol: 'gate-quorum',
      quorumSize: this.config.quorumSize,
    });

    return petition;
  }

  /**
   * Cast a vote (seal) on a petition. Weight is calculated from Guardian frequency.
   */
  async vote(petitionId: string, seal: Seal): Promise<void> {
    const petition = this.proposals.get(petitionId);
    if (!petition || petition.status !== 'pending') return;

    petition.seals.set(seal.guardianId, seal);

    // Calculate weight from Guardian data
    const nodeData = this.nodes.get(seal.guardianId);
    const frequency = nodeData?.frequency ?? BASE_FREQUENCY;
    const element = nodeData?.element ?? 'void';
    const guardian = nodeData?.guardian;

    let weight = this.config.weightByFrequency
      ? frequency / BASE_FREQUENCY
      : 1.0;

    // Element affinity bonus
    if (this.config.elementAffinity && this.config.elementAffinity === element) {
      weight *= 1.25; // 25% bonus for matching element
    }

    const quorumVote: GateQuorumVote = {
      guardian: guardian ?? 'shinkami',
      frequency,
      element,
      vote: seal.approve ? 'approve' : 'reject',
      weight,
      reason: seal.reason,
      timestamp: Date.now(),
    };

    this.proposalVotes.get(petitionId)?.push(quorumVote);

    // Check if quorum reached
    if (petition.seals.size >= this.config.quorumSize) {
      await this.resolveQuorum(petitionId);
    }
  }

  /**
   * Wait for consensus on a petition.
   */
  async awaitConsensus(petitionId: string): Promise<CouncilResult> {
    const petition = this.proposals.get(petitionId);
    if (!petition) {
      throw new Error(`Petition ${petitionId} not found`);
    }

    const startTime = Date.now();

    // Wait for resolution or timeout
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        const p = this.proposals.get(petitionId);
        if (!p) {
          clearInterval(checkInterval);
          reject(new Error('Petition removed'));
          return;
        }

        if (p.status !== 'pending') {
          clearInterval(checkInterval);
          const votes = this.proposalVotes.get(petitionId) ?? [];
          resolve({
            petitionId,
            approved: p.status === 'accepted',
            approvalRate: this.calculateApprovalRate(votes),
            participationRate: votes.length / Math.max(this.nodes.size, 1),
            finalValue: p.value,
            rounds: 1,
            durationMs: Date.now() - startTime,
          });
          return;
        }

        if (Date.now() - startTime > this.config.voteTimeoutMs) {
          clearInterval(checkInterval);
          p.status = 'expired';
          resolve({
            petitionId,
            approved: false,
            approvalRate: 0,
            participationRate: (p.seals.size) / Math.max(this.nodes.size, 1),
            finalValue: p.value,
            rounds: 1,
            durationMs: Date.now() - startTime,
          });
        }
      }, 100);
    });
  }

  // ── Private ──────────────────────────────────────────────

  private async resolveQuorum(petitionId: string): Promise<void> {
    const petition = this.proposals.get(petitionId);
    const votes = this.proposalVotes.get(petitionId);
    if (!petition || !votes) return;

    let totalWeight = 0;
    let approvalWeight = 0;
    let rejectionWeight = 0;
    let abstainWeight = 0;
    let shinkamOverrideUsed = false;

    for (const v of votes) {
      totalWeight += v.weight;
      if (v.vote === 'approve') approvalWeight += v.weight;
      else if (v.vote === 'reject') rejectionWeight += v.weight;
      else abstainWeight += v.weight;
    }

    // Check for Shinkami override
    if (this.config.shinkamOverride) {
      const shinkamVote = votes.find((v) => v.guardian === 'shinkami');
      if (shinkamVote && shinkamVote.vote !== 'abstain') {
        // Shinkami at 1111 Hz has overwhelming weight
        petition.status = shinkamVote.vote === 'approve' ? 'accepted' : 'rejected';
        shinkamOverrideUsed = true;
        this.emit('consensus.achieved', {
          petitionId,
          approved: petition.status === 'accepted',
          override: 'shinkami',
        });
        return;
      }
    }

    // Standard weighted vote resolution
    const effectiveTotal = totalWeight - abstainWeight;
    if (effectiveTotal <= 0) {
      petition.status = 'expired';
      return;
    }

    const approvalRatio = approvalWeight / effectiveTotal;

    if (approvalRatio >= this.config.approvalThreshold) {
      petition.status = 'accepted';
    } else if ((1 - approvalRatio) >= this.config.approvalThreshold) {
      petition.status = 'rejected';
    } else {
      // Tie — use tiebreaker
      petition.status = this.resolveTie(votes);
    }

    const result: GateQuorumResult = {
      approved: petition.status === 'accepted',
      totalWeight,
      approvalWeight,
      rejectionWeight,
      abstainWeight,
      votes,
      shinkamOverrideUsed,
      durationMs: Date.now() - petition.timestamp.getTime(),
    };

    this.emit('consensus.achieved', {
      petitionId,
      ...result,
    });
  }

  private resolveTie(votes: GateQuorumVote[]): 'accepted' | 'rejected' {
    switch (this.config.tieBreaker) {
      case 'highest-frequency': {
        // Guardian with highest frequency wins
        const sorted = [...votes].sort((a, b) => b.frequency - a.frequency);
        return sorted[0]?.vote === 'approve' ? 'accepted' : 'rejected';
      }
      case 'element-affinity': {
        // Guardians matching the element affinity win
        if (this.config.elementAffinity) {
          const matching = votes.filter((v) => v.element === this.config.elementAffinity);
          const approvals = matching.filter((v) => v.vote === 'approve').length;
          return approvals > matching.length / 2 ? 'accepted' : 'rejected';
        }
        return 'rejected';
      }
      case 'random':
      default:
        return Math.random() > 0.5 ? 'accepted' : 'rejected';
    }
  }

  private calculateApprovalRate(votes: GateQuorumVote[]): number {
    const nonAbstain = votes.filter((v) => v.vote !== 'abstain');
    if (nonAbstain.length === 0) return 0;
    const approvals = nonAbstain.filter((v) => v.vote === 'approve');
    return approvals.length / nonAbstain.length;
  }
}

export function createGateQuorumConsensus(
  nodeId: string,
  options?: GateQuorumOptions
): GateQuorumConsensus {
  return new GateQuorumConsensus(nodeId, options);
}
