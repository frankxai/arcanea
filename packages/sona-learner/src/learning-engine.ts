/**
 * @arcanea/sona-learner — Learning Engine
 *
 * Implements the 4-step SONA pipeline:
 *   RETRIEVE -> JUDGE -> DISTILL -> CONSOLIDATE
 *
 * Extracts patterns from successful trajectories,
 * reinforces existing patterns, and decays unused ones.
 * Emits events for external observability.
 */

import { EventEmitter } from 'node:events';
import type {
  Trajectory,
  Pattern,
  LearningCycle,
  SONAProfile,
  PipelineStage,
  PatternSearchResult,
} from './types.js';
import {
  SONA_PIPELINE,
  DEFAULT_PROFILES,
  GUARDIAN_PROFILES,
} from './types.js';
import { PatternStore, computeLocalSimilarity } from './pattern-store.js';
import { generateId } from './trajectory-recorder.js';

/**
 * LearningEngine — The core SONA learning pipeline.
 *
 * Events:
 *   - 'cycle-complete' (LearningCycle)
 *   - 'pattern-learned' (Pattern)
 *   - 'pattern-reinforced' ({ patternId, newConfidence })
 *   - 'profile-changed' ({ previous, current })
 */
export class LearningEngine extends EventEmitter {
  private profiles: Map<string, SONAProfile> = new Map();
  private activeProfileId: string = 'default';
  private patternStore: PatternStore;
  private cyclesCompleted: number = 0;
  private totalCycleDuration: number = 0;
  private lastCycleDate: Date | null = null;

  constructor(patternStore: PatternStore) {
    super();
    this.patternStore = patternStore;
    this.initializeProfiles();
  }

  private initializeProfiles(): void {
    // Load default profiles
    for (const profile of DEFAULT_PROFILES) {
      this.profiles.set(profile.id, { ...profile, settings: { ...profile.settings } });
    }

    // Generate Guardian-specific profiles
    for (const [guardianId, gp] of Object.entries(GUARDIAN_PROFILES)) {
      const profile: SONAProfile = {
        id: `guardian-${guardianId}`,
        name: `Guardian: ${guardianId.charAt(0).toUpperCase() + guardianId.slice(1)}`,
        mode: 'default',
        settings: {
          learningRate: this.getGuardianLearningRate(gp.specialization),
          batchSize: this.getGuardianBatchSize(gp.specialization),
          microLoraEnabled: true,
          hnswEfSearch: Math.round(gp.frequency / 10),
          patternThreshold: this.getGuardianThreshold(gp.specialization),
        },
      };
      this.profiles.set(profile.id, profile);
    }
  }

  private getGuardianLearningRate(specialization: string): number {
    switch (specialization) {
      case 'stability': return 0.0005;       // Lyssandria: slow, stable learning
      case 'creativity': return 0.005;        // Leyla: fast, exploratory
      case 'transformation': return 0.003;    // Draconia/Elara: moderate-fast
      case 'connection': return 0.001;        // Maylinn: balanced
      case 'expression': return 0.002;        // Alera: balanced-fast
      case 'intuition': return 0.004;         // Lyria: fast
      case 'enlightenment': return 0.0008;    // Aiyami: slow, considered
      case 'partnership': return 0.001;       // Ino: balanced
      case 'meta-consciousness': return 0.0003; // Shinkami: slowest, deepest
      default: return 0.001;
    }
  }

  private getGuardianBatchSize(specialization: string): number {
    switch (specialization) {
      case 'stability': return 64;
      case 'creativity': return 16;
      case 'transformation': return 32;
      case 'connection': return 32;
      case 'expression': return 24;
      case 'intuition': return 16;
      case 'enlightenment': return 48;
      case 'partnership': return 32;
      case 'meta-consciousness': return 64;
      default: return 32;
    }
  }

  private getGuardianThreshold(specialization: string): number {
    switch (specialization) {
      case 'stability': return 0.85;
      case 'creativity': return 0.5;
      case 'transformation': return 0.65;
      case 'connection': return 0.7;
      case 'expression': return 0.6;
      case 'intuition': return 0.55;
      case 'enlightenment': return 0.8;
      case 'partnership': return 0.7;
      case 'meta-consciousness': return 0.9;
      default: return 0.7;
    }
  }

  /**
   * Run a full learning cycle on a trajectory.
   * Executes the 4-step pipeline: RETRIEVE -> JUDGE -> DISTILL -> CONSOLIDATE
   */
  learn(trajectory: Trajectory): LearningCycle {
    const startedAt = new Date();
    const stagesExecuted: PipelineStage[] = [];
    let patternsLearned = 0;
    let patternsReinforced = 0;
    let patternsEvaluated = 0;

    // 1. RETRIEVE — find similar existing patterns
    const existingPatterns: PatternSearchResult[] = [];
    for (const step of trajectory.steps) {
      const results = this.patternStore.find(step.action, {
        guardianId: trajectory.guardianId,
        threshold: this.getActiveProfile().settings.patternThreshold * 0.5,
        topK: 3,
      });
      for (const r of results) {
        if (!existingPatterns.some(ep => ep.pattern.id === r.pattern.id)) {
          existingPatterns.push(r);
        }
      }
      patternsEvaluated += results.length;
    }
    stagesExecuted.push('RETRIEVE');

    // 2. JUDGE — evaluate the trajectory verdict
    const isSuccessful = trajectory.verdict === 'success';
    const isPartial = trajectory.verdict === 'partial';
    stagesExecuted.push('JUDGE');

    // 3. DISTILL — extract new patterns from successful/partial trajectories
    if (isSuccessful || isPartial) {
      const confidenceMultiplier = isSuccessful ? 1.0 : 0.5;

      for (const step of trajectory.steps) {
        // Skip steps with negative rewards
        if (step.reward !== undefined && step.reward < 0) continue;

        // Check if a very similar pattern already exists
        const similar = this.patternStore.find(step.action, {
          guardianId: trajectory.guardianId,
          threshold: 0.8,
          topK: 1,
        });

        if (similar.length === 0) {
          // Extract a new pattern from this step
          const reward = step.reward ?? (isSuccessful ? 0.5 : 0.25);
          const confidence = Math.min(1.0, reward * confidenceMultiplier);

          const pattern = this.patternStore.store({
            content: step.observation
              ? `${step.action}: ${step.observation}`
              : step.action,
            category: trajectory.guardianId
              ? GUARDIAN_PROFILES[trajectory.guardianId]?.specialization ?? 'general'
              : 'general',
            confidence,
            guardianId: trajectory.guardianId,
            gateFrequency: trajectory.guardianId
              ? GUARDIAN_PROFILES[trajectory.guardianId]?.frequency
              : undefined,
          });

          patternsLearned++;
          this.emit('pattern-learned', pattern);
        }
      }
    }
    stagesExecuted.push('DISTILL');

    // 4. CONSOLIDATE — reinforce existing patterns, decay unused
    for (const { pattern, similarity } of existingPatterns) {
      const stored = this.patternStore.get(pattern.id);
      if (!stored) continue;

      if (isSuccessful) {
        // Reinforce: increase confidence
        const lr = this.getActiveProfile().settings.learningRate;
        const newConfidence = Math.min(1.0, stored.confidence + lr * similarity);
        this.patternStore.update(pattern.id, { confidence: newConfidence });
        patternsReinforced++;
        this.emit('pattern-reinforced', { patternId: pattern.id, newConfidence });
      } else if (trajectory.verdict === 'failure') {
        // Decay: decrease confidence slightly
        const lr = this.getActiveProfile().settings.learningRate;
        const newConfidence = Math.max(0, stored.confidence - lr * 0.5);
        this.patternStore.update(pattern.id, { confidence: newConfidence });
      }
    }
    stagesExecuted.push('CONSOLIDATE');

    const completedAt = new Date();
    const duration = completedAt.getTime() - startedAt.getTime();

    const cycle: LearningCycle = {
      id: generateId('cycle'),
      trajectoryIds: [trajectory.id],
      patternsLearned,
      patternsReinforced,
      startedAt,
      completedAt,
      metrics: {
        duration,
        stagesExecuted,
        patternsEvaluated,
      },
    };

    this.cyclesCompleted++;
    this.totalCycleDuration += duration;
    this.lastCycleDate = completedAt;

    this.emit('cycle-complete', cycle);
    return cycle;
  }

  /**
   * Force an immediate learning cycle on all completed, un-learned trajectories.
   * This is a batch operation. Since we don't have a persistent "learned" flag,
   * callers provide the trajectories to learn from.
   */
  forceLearn(trajectories: Trajectory[]): LearningCycle[] {
    return trajectories
      .filter(t => t.verdict !== undefined)
      .map(t => this.learn(t));
  }

  /**
   * Get a profile by ID. Defaults to the active profile.
   */
  getProfile(id?: string): SONAProfile {
    const profileId = id || this.activeProfileId;
    const profile = this.profiles.get(profileId);
    if (!profile) {
      throw new Error(`Profile ${profileId} not found`);
    }
    return profile;
  }

  /**
   * Get the currently active profile.
   */
  getActiveProfile(): SONAProfile {
    return this.getProfile(this.activeProfileId);
  }

  /**
   * Switch the active profile.
   */
  setProfile(id: string): void {
    if (!this.profiles.has(id)) {
      throw new Error(`Profile ${id} not found`);
    }
    const previous = this.activeProfileId;
    this.activeProfileId = id;
    this.emit('profile-changed', { previous, current: id });
  }

  /**
   * List all available profiles.
   */
  listProfiles(): SONAProfile[] {
    return Array.from(this.profiles.values());
  }

  /**
   * Get learning engine statistics.
   */
  getStats(): {
    cyclesCompleted: number;
    lastCycle: string | null;
    avgCycleDuration: number;
    activeProfile: string;
    totalProfiles: number;
  } {
    return {
      cyclesCompleted: this.cyclesCompleted,
      lastCycle: this.lastCycleDate?.toISOString() ?? null,
      avgCycleDuration: this.cyclesCompleted > 0
        ? this.totalCycleDuration / this.cyclesCompleted
        : 0,
      activeProfile: this.activeProfileId,
      totalProfiles: this.profiles.size,
    };
  }
}
