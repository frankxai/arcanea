/**
 * @arcanea/hooks — Workflow Hooks
 *
 * Lifecycle hooks for workflow operations: start, step, decision,
 * complete, error, and rollback.
 *
 * Guardian affinity: Alera (Voice, expression — orchestration)
 *                    Maylinn (Heart, healing — error recovery)
 */

import type {
  HookHandler,
  HookResult,
  HookContext,
  WorkflowPayload,
} from '../types.js';

// ── Workflow start hook ──────────────────────────────────────────

/**
 * Creates a hook that fires when a workflow begins.
 */
export function createStartHook(
  onStart?: (workflowId: string, workflowName?: string) => void
): HookHandler<WorkflowPayload> {
  return (context: HookContext<WorkflowPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing workflow payload', abort: true };
    }

    if (!payload.workflowId) {
      return { success: false, error: 'Workflow payload requires workflowId', abort: true };
    }

    if (onStart) {
      onStart(payload.workflowId, payload.workflowName);
    }

    return {
      success: true,
      data: {
        workflowStartedAt: Date.now(),
        workflowId: payload.workflowId,
        workflowName: payload.workflowName,
      },
      message: `Workflow started: ${payload.workflowName ?? payload.workflowId}`,
    };
  };
}

// ── Workflow step hook ───────────────────────────────────────────

/**
 * Creates a hook that fires at each workflow step, tracking progress.
 */
export function createStepHook(
  onStep?: (workflowId: string, stepName: string, stepIndex: number, total: number) => void
): HookHandler<WorkflowPayload> {
  return (context: HookContext<WorkflowPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing workflow payload' };
    }

    const stepName = payload.stepName ?? 'unnamed';
    const stepIndex = payload.stepIndex ?? 0;
    const totalSteps = payload.totalSteps ?? 0;

    if (onStep) {
      onStep(payload.workflowId, stepName, stepIndex, totalSteps);
    }

    const progress = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;

    return {
      success: true,
      data: {
        workflowCurrentStep: stepName,
        workflowStepIndex: stepIndex,
        workflowTotalSteps: totalSteps,
        workflowProgress: progress,
        workflowStepTimestamp: Date.now(),
      },
      message: `Workflow step: ${stepName} (${stepIndex + 1}/${totalSteps || '?'}, ${progress.toFixed(0)}%)`,
    };
  };
}

// ── Workflow decision hook ───────────────────────────────────────

/**
 * Creates a hook that fires when a workflow reaches a decision point.
 */
export function createDecisionHook(
  onDecision?: (workflowId: string, options: string[], selected?: string) => void
): HookHandler<WorkflowPayload> {
  return (context: HookContext<WorkflowPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing workflow payload' };
    }

    const decision = payload.decision;
    if (!decision) {
      return { success: false, error: 'Missing decision in workflow payload' };
    }

    if (onDecision) {
      onDecision(payload.workflowId, decision.options, decision.selected);
    }

    return {
      success: true,
      data: {
        workflowDecisionOptions: decision.options,
        workflowDecisionSelected: decision.selected,
        workflowDecisionReason: decision.reason,
        workflowDecisionAt: Date.now(),
      },
      message: `Workflow decision: ${decision.selected ?? 'pending'} (${decision.options.length} options)`,
    };
  };
}

// ── Workflow complete hook ───────────────────────────────────────

/**
 * Creates a hook that fires when a workflow completes successfully.
 */
export function createCompleteHook(
  onComplete?: (workflowId: string, durationMs: number) => void
): HookHandler<WorkflowPayload> {
  return (context: HookContext<WorkflowPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing workflow payload' };
    }

    const startTs = context.metadata['workflowStartedAt'] as number | undefined;
    const durationMs = startTs ? Date.now() - startTs : 0;

    if (onComplete) {
      onComplete(payload.workflowId, durationMs);
    }

    return {
      success: true,
      data: {
        workflowCompletedAt: Date.now(),
        workflowDurationMs: durationMs,
        workflowResult: payload.result,
      },
      message: `Workflow complete: ${payload.workflowName ?? payload.workflowId} (${durationMs}ms)`,
    };
  };
}

// ── Workflow error hook ──────────────────────────────────────────

/**
 * Creates a hook that fires when a workflow encounters an error.
 */
export function createErrorHook(
  onError?: (workflowId: string, error: { name: string; message: string }) => void
): HookHandler<WorkflowPayload> {
  return (context: HookContext<WorkflowPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing workflow payload' };
    }

    const workflowError = payload.error ?? { name: 'UnknownError', message: 'Unknown error' };

    if (onError) {
      onError(payload.workflowId, workflowError);
    }

    return {
      success: true,
      data: {
        workflowErrorName: workflowError.name,
        workflowErrorMessage: workflowError.message,
        workflowErrorAt: Date.now(),
      },
      warnings: [`Workflow error: ${workflowError.name}: ${workflowError.message}`],
      message: `Workflow error in ${payload.workflowId}: ${workflowError.message}`,
    };
  };
}

// ── Workflow rollback hook ───────────────────────────────────────

/**
 * Creates a hook that fires when a workflow is rolled back.
 */
export function createRollbackHook(
  onRollback?: (workflowId: string, stepName?: string) => void
): HookHandler<WorkflowPayload> {
  return (context: HookContext<WorkflowPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing workflow payload' };
    }

    const stepName = payload.stepName ?? 'unknown';

    if (onRollback) {
      onRollback(payload.workflowId, stepName);
    }

    return {
      success: true,
      data: {
        workflowRolledBackAt: Date.now(),
        workflowRollbackStep: stepName,
      },
      warnings: [`Workflow rollback at step: ${stepName}`],
      message: `Workflow rollback: ${payload.workflowId} at ${stepName}`,
    };
  };
}

// ── Export all factories ─────────────────────────────────────────

export const workflowHooks = {
  createStartHook,
  createStepHook,
  createDecisionHook,
  createCompleteHook,
  createErrorHook,
  createRollbackHook,
} as const;
