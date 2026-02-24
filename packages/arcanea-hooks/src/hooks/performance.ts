/**
 * @arcanea/hooks — Performance Hooks
 *
 * Lifecycle hooks for performance monitoring: metric recording,
 * threshold alerts, bottleneck detection, optimization application,
 * and health checks.
 *
 * Guardian affinity: Draconia (Fire, power — raw performance)
 *                    Ino (Unity, partnership — system harmony)
 */

import type {
  HookHandler,
  HookResult,
  HookContext,
  PerformancePayload,
} from '../types.js';

// ── Metric recorded hook ─────────────────────────────────────────

/**
 * Creates a hook that fires when a metric is recorded.
 */
export function createMetricRecordedHook(
  onMetric?: (name: string, value: number, unit?: string) => void
): HookHandler<PerformancePayload> {
  return (context: HookContext<PerformancePayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing performance payload' };
    }

    if (onMetric) {
      onMetric(payload.metricName, payload.value, payload.unit);
    }

    return {
      success: true,
      data: {
        perfMetricName: payload.metricName,
        perfMetricValue: payload.value,
        perfMetricUnit: payload.unit,
        perfRecordedAt: Date.now(),
      },
      message: `Metric recorded: ${payload.metricName} = ${payload.value}${payload.unit ? ` ${payload.unit}` : ''}`,
    };
  };
}

// ── Threshold exceeded hook ──────────────────────────────────────

/**
 * Creates a hook that fires when a metric exceeds its threshold.
 * Returns a warning and optionally triggers alerts.
 */
export function createThresholdExceededHook(
  onExceeded?: (name: string, value: number, threshold: number) => void
): HookHandler<PerformancePayload> {
  return (context: HookContext<PerformancePayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing performance payload' };
    }

    const threshold = payload.threshold ?? Infinity;
    const exceeded = payload.value > threshold;

    if (exceeded && onExceeded) {
      onExceeded(payload.metricName, payload.value, threshold);
    }

    return {
      success: true,
      data: {
        perfThresholdExceeded: exceeded,
        perfExceededBy: exceeded ? payload.value - threshold : 0,
      },
      warnings: exceeded
        ? [`Threshold exceeded: ${payload.metricName} = ${payload.value} (threshold: ${threshold})`]
        : undefined,
      message: exceeded
        ? `ALERT: ${payload.metricName} exceeded threshold by ${(payload.value - threshold).toFixed(2)}`
        : `${payload.metricName} within threshold`,
    };
  };
}

// ── Bottleneck detected hook ─────────────────────────────────────

/**
 * Creates a hook that fires when a performance bottleneck is detected.
 */
export function createBottleneckDetectedHook(
  onBottleneck?: (component: string, metricName: string, value: number) => void
): HookHandler<PerformancePayload> {
  return (context: HookContext<PerformancePayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing performance payload' };
    }

    const component = payload.component ?? 'unknown';

    if (onBottleneck) {
      onBottleneck(component, payload.metricName, payload.value);
    }

    return {
      success: true,
      data: {
        perfBottleneckComponent: component,
        perfBottleneckMetric: payload.metricName,
        perfBottleneckValue: payload.value,
        perfBottleneckDetectedAt: Date.now(),
      },
      warnings: [`Bottleneck detected in ${component}: ${payload.metricName} = ${payload.value}`],
      message: `Bottleneck: ${component} (${payload.metricName} = ${payload.value})`,
    };
  };
}

// ── Optimization applied hook ────────────────────────────────────

/**
 * Creates a hook that records when an optimization is applied.
 */
export function createOptimizationAppliedHook(
  onOptimized?: (optimization: string, component: string) => void
): HookHandler<PerformancePayload> {
  return (context: HookContext<PerformancePayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing performance payload' };
    }

    const optimization = payload.optimization ?? 'unspecified';
    const component = payload.component ?? 'system';

    if (onOptimized) {
      onOptimized(optimization, component);
    }

    return {
      success: true,
      data: {
        perfOptimization: optimization,
        perfOptimizedComponent: component,
        perfOptimizedAt: Date.now(),
      },
      message: `Optimization applied: ${optimization} on ${component}`,
    };
  };
}

// ── Health check hook ────────────────────────────────────────────

/**
 * Creates a health-check hook that evaluates system health status.
 */
export function createHealthCheckHook(
  onHealth?: (status: string, component: string) => void
): HookHandler<PerformancePayload> {
  return (context: HookContext<PerformancePayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing performance payload' };
    }

    const status = payload.healthStatus ?? 'healthy';
    const component = payload.component ?? 'system';

    if (onHealth) {
      onHealth(status, component);
    }

    const warnings: string[] = [];
    if (status === 'degraded') {
      warnings.push(`Health degraded: ${component}`);
    } else if (status === 'critical') {
      warnings.push(`CRITICAL: ${component} health check failed`);
    }

    return {
      success: true,
      data: {
        perfHealthStatus: status,
        perfHealthComponent: component,
        perfHealthCheckedAt: Date.now(),
      },
      warnings: warnings.length > 0 ? warnings : undefined,
      message: `Health check: ${component} = ${status}`,
    };
  };
}

// ── Export all factories ─────────────────────────────────────────

export const performanceHooks = {
  createMetricRecordedHook,
  createThresholdExceededHook,
  createBottleneckDetectedHook,
  createOptimizationAppliedHook,
  createHealthCheckHook,
} as const;
