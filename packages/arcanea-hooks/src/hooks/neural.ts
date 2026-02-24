/**
 * @arcanea/hooks — Neural Hooks
 *
 * Lifecycle hooks for neural/pattern operations: pattern detection,
 * pattern learning, training start/complete, adaptation, consolidation.
 *
 * Guardian affinity: Shinkami (Source, meta-consciousness — the
 * highest Guardian, overseeing the system's self-awareness layer).
 */

import type {
  HookHandler,
  HookResult,
  HookContext,
  NeuralPayload,
} from '../types.js';

// ── Pattern detected hook ────────────────────────────────────────

/**
 * Creates a hook that fires when a new pattern is detected.
 * Validates confidence and records the detection.
 */
export function createPatternDetectedHook(
  minConfidence = 0.5,
  onDetected?: (domain: string, confidence: number) => void
): HookHandler<NeuralPayload> {
  return (context: HookContext<NeuralPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing neural payload' };
    }

    const confidence = payload.confidence ?? 0;
    if (confidence < minConfidence) {
      return {
        success: true,
        message: `Pattern confidence ${confidence} below threshold ${minConfidence}, skipping`,
        data: { neuralPatternAccepted: false },
      };
    }

    if (onDetected) {
      onDetected(payload.domain, confidence);
    }

    return {
      success: true,
      data: {
        neuralPatternAccepted: true,
        neuralPatternDomain: payload.domain,
        neuralPatternConfidence: confidence,
        neuralDetectedAt: Date.now(),
      },
      message: `Pattern detected in ${payload.domain} (confidence: ${confidence.toFixed(2)})`,
    };
  };
}

// ── Pattern learned hook ─────────────────────────────────────────

/**
 * Creates a hook that fires when a pattern is consolidated into memory.
 */
export function createPatternLearnedHook(
  onLearned?: (patternId: string, domain: string, quality: number) => void
): HookHandler<NeuralPayload> {
  return (context: HookContext<NeuralPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing neural payload' };
    }

    const patternId = payload.patternId ?? `pat_${Date.now().toString(36)}`;
    const quality = payload.quality ?? 0.5;

    if (onLearned) {
      onLearned(patternId, payload.domain, quality);
    }

    return {
      success: true,
      data: {
        neuralPatternId: patternId,
        neuralPatternQuality: quality,
        neuralLearnedAt: Date.now(),
      },
      message: `Pattern learned: ${patternId} (domain: ${payload.domain}, quality: ${quality.toFixed(2)})`,
    };
  };
}

// ── Training start hook ──────────────────────────────────────────

/**
 * Creates a hook that fires when a training cycle begins.
 */
export function createTrainingStartHook(): HookHandler<NeuralPayload> {
  return (context: HookContext<NeuralPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing neural payload' };
    }

    return {
      success: true,
      data: {
        neuralTrainingStarted: Date.now(),
        neuralTrainingDomain: payload.domain,
      },
      message: `Neural training started for domain: ${payload.domain}`,
    };
  };
}

// ── Training complete hook ───────────────────────────────────────

/**
 * Creates a hook that fires when training completes, recording duration
 * and quality metrics.
 */
export function createTrainingCompleteHook(
  onComplete?: (domain: string, durationMs: number) => void
): HookHandler<NeuralPayload> {
  return (context: HookContext<NeuralPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing neural payload' };
    }

    const startTs = context.metadata['neuralTrainingStarted'] as number | undefined;
    const durationMs = startTs ? Date.now() - startTs : 0;

    if (onComplete) {
      onComplete(payload.domain, durationMs);
    }

    return {
      success: true,
      data: {
        neuralTrainingCompleted: Date.now(),
        neuralTrainingDurationMs: durationMs,
        neuralTrainingQuality: payload.quality,
      },
      message: `Neural training complete for ${payload.domain} (${durationMs}ms)`,
    };
  };
}

// ── Adaptation hook ──────────────────────────────────────────────

/**
 * Creates a hook for tracking system adaptations (reinforcement,
 * correction, exploration).
 */
export function createAdaptationHook(
  onAdapt?: (type: string, domain: string) => void
): HookHandler<NeuralPayload> {
  return (context: HookContext<NeuralPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing neural payload' };
    }

    const adaptationType = payload.adaptationType ?? 'exploration';

    if (onAdapt) {
      onAdapt(adaptationType, payload.domain);
    }

    return {
      success: true,
      data: {
        neuralAdaptationType: adaptationType,
        neuralAdaptationDomain: payload.domain,
        neuralAdaptedAt: Date.now(),
      },
      message: `Neural adaptation (${adaptationType}) in ${payload.domain}`,
    };
  };
}

// ── Consolidation hook ───────────────────────────────────────────

/**
 * Creates a consolidation hook that merges short-term patterns
 * into long-term memory.
 */
export function createConsolidationHook(
  onConsolidate?: (domain: string, patternCount: number) => void
): HookHandler<NeuralPayload> {
  return (context: HookContext<NeuralPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing neural payload' };
    }

    const patternCount = (context.metadata['neuralConsolidationCount'] as number) ?? 1;

    if (onConsolidate) {
      onConsolidate(payload.domain, patternCount);
    }

    return {
      success: true,
      data: {
        neuralConsolidatedAt: Date.now(),
        neuralConsolidationDomain: payload.domain,
        neuralConsolidationCount: patternCount,
      },
      message: `Neural consolidation: ${patternCount} patterns in ${payload.domain}`,
    };
  };
}

// ── Export all factories ─────────────────────────────────────────

export const neuralHooks = {
  createPatternDetectedHook,
  createPatternLearnedHook,
  createTrainingStartHook,
  createTrainingCompleteHook,
  createAdaptationHook,
  createConsolidationHook,
} as const;
