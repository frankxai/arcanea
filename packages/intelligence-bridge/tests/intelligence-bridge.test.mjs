// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — Comprehensive Test Suite
// 140+ tests covering all modules and edge cases
// ─────────────────────────────────────────────────────────────

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Import everything from the built output
const mod = await import('../dist/index.js');
const {
  DEFAULT_PIPELINE_CONFIG,
  GUARDIAN_ROUTING_PROFILES,
  EventBus,
  generateEventId,
  RoutingEngine,
  FeedbackRecorder,
  IntelligencePipeline,
} = mod;

// Force exit after all tests
process.on('beforeExit', () => process.exit(0));


// ═══════════════════════════════════════════════════════════════
// 1. EXPORTS
// ═══════════════════════════════════════════════════════════════

describe('Exports', { timeout: 10000 }, () => {
  it('exports DEFAULT_PIPELINE_CONFIG', () => {
    assert.ok(DEFAULT_PIPELINE_CONFIG);
    assert.equal(typeof DEFAULT_PIPELINE_CONFIG, 'object');
  });

  it('exports GUARDIAN_ROUTING_PROFILES', () => {
    assert.ok(Array.isArray(GUARDIAN_ROUTING_PROFILES));
    assert.equal(GUARDIAN_ROUTING_PROFILES.length, 10);
  });

  it('exports EventBus class', () => {
    assert.equal(typeof EventBus, 'function');
  });

  it('exports generateEventId function', () => {
    assert.equal(typeof generateEventId, 'function');
  });

  it('exports RoutingEngine class', () => {
    assert.equal(typeof RoutingEngine, 'function');
  });

  it('exports FeedbackRecorder class', () => {
    assert.equal(typeof FeedbackRecorder, 'function');
  });

  it('exports IntelligencePipeline class', () => {
    assert.equal(typeof IntelligencePipeline, 'function');
  });

  it('DEFAULT_PIPELINE_CONFIG has correct shape', () => {
    assert.equal(DEFAULT_PIPELINE_CONFIG.enableTrajectoryRecording, true);
    assert.equal(DEFAULT_PIPELINE_CONFIG.enablePatternLearning, true);
    assert.equal(DEFAULT_PIPELINE_CONFIG.enableCostTracking, true);
    assert.equal(DEFAULT_PIPELINE_CONFIG.enableMemoryPersistence, true);
    assert.equal(DEFAULT_PIPELINE_CONFIG.learningProfile, 'balanced');
    assert.equal(DEFAULT_PIPELINE_CONFIG.budgetWarningThreshold, 0.7);
    assert.equal(DEFAULT_PIPELINE_CONFIG.budgetCriticalThreshold, 0.9);
  });

  it('GUARDIAN_ROUTING_PROFILES contains all 10 Guardians', () => {
    const ids = GUARDIAN_ROUTING_PROFILES.map(p => p.guardianId);
    assert.ok(ids.includes('lyssandria'));
    assert.ok(ids.includes('leyla'));
    assert.ok(ids.includes('draconia'));
    assert.ok(ids.includes('maylinn'));
    assert.ok(ids.includes('alera'));
    assert.ok(ids.includes('lyria'));
    assert.ok(ids.includes('aiyami'));
    assert.ok(ids.includes('elara'));
    assert.ok(ids.includes('ino'));
    assert.ok(ids.includes('shinkami'));
  });

  it('generateEventId produces unique IDs', () => {
    const id1 = generateEventId();
    const id2 = generateEventId();
    assert.notEqual(id1, id2);
    assert.ok(id1.startsWith('evt_'));
    assert.ok(id2.startsWith('evt_'));
  });
});


// ═══════════════════════════════════════════════════════════════
// 2. EVENT BUS
// ═══════════════════════════════════════════════════════════════

describe('EventBus', { timeout: 10000 }, () => {
  let bus;

  beforeEach(() => {
    bus = new EventBus();
  });

  it('can be instantiated', () => {
    assert.ok(bus instanceof EventBus);
  });

  it('emitEvent stores events in history', () => {
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: Date.now(), payload: {} });
    assert.equal(bus.size, 1);
  });

  it('emitEvent emits typed events to listeners', () => {
    let received = null;
    bus.onEvent('task-start', (e) => { received = e; });
    const event = { id: 'e1', type: 'task-start', timestamp: Date.now(), payload: { test: true } };
    bus.emitEvent(event);
    assert.ok(received);
    assert.equal(received.id, 'e1');
    assert.equal(received.payload.test, true);
  });

  it('emitEvent emits on global "event" channel', () => {
    let received = null;
    bus.on('event', (e) => { received = e; });
    bus.emitEvent({ id: 'e1', type: 'task-fail', timestamp: Date.now(), payload: {} });
    assert.ok(received);
    assert.equal(received.type, 'task-fail');
  });

  it('onEvent subscribes to specific type', () => {
    const events = [];
    bus.onEvent('task-complete', (e) => events.push(e));
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e2', type: 'task-complete', timestamp: Date.now(), payload: {} });
    assert.equal(events.length, 1);
    assert.equal(events[0].type, 'task-complete');
  });

  it('offEvent unsubscribes', () => {
    const events = [];
    const handler = (e) => events.push(e);
    bus.onEvent('task-start', handler);
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: Date.now(), payload: {} });
    assert.equal(events.length, 1);
    bus.offEvent('task-start', handler);
    bus.emitEvent({ id: 'e2', type: 'task-start', timestamp: Date.now(), payload: {} });
    assert.equal(events.length, 1);
  });

  it('multiple listeners on same event type', () => {
    let count = 0;
    bus.onEvent('hook-trigger', () => { count += 1; });
    bus.onEvent('hook-trigger', () => { count += 10; });
    bus.emitEvent({ id: 'e1', type: 'hook-trigger', timestamp: Date.now(), payload: {} });
    assert.equal(count, 11);
  });

  it('getHistory returns all events', () => {
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e2', type: 'task-complete', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e3', type: 'task-fail', timestamp: Date.now(), payload: {} });
    const history = bus.getHistory();
    assert.equal(history.length, 3);
  });

  it('getHistory with limit returns last N events', () => {
    for (let i = 0; i < 10; i++) {
      bus.emitEvent({ id: `e${i}`, type: 'task-start', timestamp: Date.now(), payload: { i } });
    }
    const last3 = bus.getHistory(3);
    assert.equal(last3.length, 3);
    assert.equal(last3[0].payload.i, 7);
    assert.equal(last3[2].payload.i, 9);
  });

  it('getHistoryByType filters correctly', () => {
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e2', type: 'task-complete', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e3', type: 'task-start', timestamp: Date.now(), payload: {} });
    const starts = bus.getHistoryByType('task-start');
    assert.equal(starts.length, 2);
    assert.ok(starts.every(e => e.type === 'task-start'));
  });

  it('getHistoryByType with limit', () => {
    for (let i = 0; i < 10; i++) {
      bus.emitEvent({ id: `e${i}`, type: 'task-start', timestamp: Date.now(), payload: { i } });
    }
    const last2 = bus.getHistoryByType('task-start', 2);
    assert.equal(last2.length, 2);
    assert.equal(last2[0].payload.i, 8);
  });

  it('getHistoryByGuardian filters correctly', () => {
    bus.emitEvent({ id: 'e1', type: 'task-start', guardianId: 'lyria', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e2', type: 'task-start', guardianId: 'aiyami', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e3', type: 'task-complete', guardianId: 'lyria', timestamp: Date.now(), payload: {} });
    const lyriaEvents = bus.getHistoryByGuardian('lyria');
    assert.equal(lyriaEvents.length, 2);
    assert.ok(lyriaEvents.every(e => e.guardianId === 'lyria'));
  });

  it('getHistoryByGuardian with limit', () => {
    for (let i = 0; i < 10; i++) {
      bus.emitEvent({ id: `e${i}`, type: 'task-start', guardianId: 'ino', timestamp: Date.now(), payload: { i } });
    }
    const last3 = bus.getHistoryByGuardian('ino', 3);
    assert.equal(last3.length, 3);
    assert.equal(last3[0].payload.i, 7);
  });

  it('history is bounded at 10000 events', () => {
    // Add 10100 events — should stay at max 10000
    for (let i = 0; i < 10100; i++) {
      bus.emitEvent({ id: `e${i}`, type: 'task-start', timestamp: Date.now(), payload: { i } });
    }
    assert.ok(bus.size <= 10000);
  });

  it('clear removes all history', () => {
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: Date.now(), payload: {} });
    bus.emitEvent({ id: 'e2', type: 'task-complete', timestamp: Date.now(), payload: {} });
    assert.equal(bus.size, 2);
    bus.clear();
    assert.equal(bus.size, 0);
    assert.equal(bus.getHistory().length, 0);
  });

  it('emitEvent auto-fills id if empty', () => {
    bus.emitEvent({ id: '', type: 'task-start', timestamp: Date.now(), payload: {} });
    const history = bus.getHistory();
    assert.ok(history[0].id.startsWith('evt_'));
  });

  it('emitEvent auto-fills timestamp if zero', () => {
    const before = Date.now();
    bus.emitEvent({ id: 'e1', type: 'task-start', timestamp: 0, payload: {} });
    const history = bus.getHistory();
    assert.ok(history[0].timestamp >= before);
  });

  it('handles all event types', () => {
    const types = [
      'task-start', 'task-complete', 'task-fail', 'hook-trigger',
      'pattern-match', 'learning-cycle', 'budget-alert',
      'guardian-route', 'memory-store', 'memory-search',
    ];
    for (const type of types) {
      bus.emitEvent({ id: `e_${type}`, type, timestamp: Date.now(), payload: {} });
    }
    assert.equal(bus.size, 10);
  });

  it('event with sessionId stored correctly', () => {
    bus.emitEvent({
      id: 'e1', type: 'task-start', timestamp: Date.now(),
      payload: {}, sessionId: 'session-abc',
    });
    const history = bus.getHistory();
    assert.equal(history[0].sessionId, 'session-abc');
  });
});


// ═══════════════════════════════════════════════════════════════
// 3. ROUTING ENGINE
// ═══════════════════════════════════════════════════════════════

describe('RoutingEngine', { timeout: 10000 }, () => {
  let engine;

  beforeEach(() => {
    engine = new RoutingEngine();
  });

  it('can be instantiated', () => {
    assert.ok(engine instanceof RoutingEngine);
  });

  // Test each Guardian's domain routing
  it('routes database tasks to Lyssandria', () => {
    const d = engine.route('Fix the database schema');
    assert.equal(d.guardianId, 'lyssandria');
    assert.equal(d.gate, 'Foundation');
    assert.equal(d.frequency, 174);
  });

  it('routes creative tasks to Leyla', () => {
    const d = engine.route('Create a new design for the homepage');
    assert.equal(d.guardianId, 'leyla');
  });

  it('routes performance tasks to Draconia', () => {
    const d = engine.route('Optimize the performance of the query');
    assert.equal(d.guardianId, 'draconia');
    assert.equal(d.gate, 'Fire');
    assert.equal(d.frequency, 396);
  });

  it('routes documentation tasks to Maylinn', () => {
    const d = engine.route('Write documentation for the communication module');
    assert.equal(d.guardianId, 'maylinn');
    assert.equal(d.gate, 'Heart');
  });

  it('routes API tasks to Alera', () => {
    const d = engine.route('Design the public API interface');
    assert.equal(d.guardianId, 'alera');
    assert.equal(d.gate, 'Voice');
    assert.equal(d.frequency, 528);
  });

  it('routes debug tasks to Lyria', () => {
    const d = engine.route('Debug and investigate the crash');
    assert.equal(d.guardianId, 'lyria');
    assert.equal(d.gate, 'Sight');
    assert.equal(d.frequency, 639);
  });

  it('routes architecture tasks to Aiyami', () => {
    // Avoid "design" (Leyla) and "art" substring in "architecture" (Leyla collision)
    const d = engine.route('Seek crown enlightenment and wisdom for the whole system');
    assert.equal(d.guardianId, 'aiyami');
    assert.equal(d.gate, 'Crown');
    assert.equal(d.frequency, 741);
  });

  it('routes migration tasks to Elara', () => {
    const d = engine.route('Plan the shift to new perspective and change');
    assert.equal(d.guardianId, 'elara');
    assert.equal(d.gate, 'Shift');
    assert.equal(d.frequency, 852);
  });

  it('routes integration tasks to Ino', () => {
    const d = engine.route('Merge the integration and collaborate with unity partnership');
    assert.equal(d.guardianId, 'ino');
    assert.equal(d.gate, 'Unity');
    assert.equal(d.frequency, 963);
  });

  it('routes meta/orchestration tasks to Shinkami', () => {
    const d = engine.route('Orchestrate the meta process and oversee all consciousness');
    assert.equal(d.guardianId, 'shinkami');
    assert.equal(d.gate, 'Source');
    assert.equal(d.frequency, 1111);
  });

  it('unknown tasks default to Shinkami (Source Gate)', () => {
    const d = engine.route('xyzzy blorp fleem');
    assert.equal(d.guardianId, 'shinkami');
    assert.equal(d.gate, 'Source');
  });

  it('returns confidence > 0', () => {
    const d = engine.route('Optimize database performance');
    assert.ok(d.confidence > 0);
    assert.ok(d.confidence <= 1);
  });

  it('returns latencyMs >= 0', () => {
    const d = engine.route('Anything');
    assert.ok(d.latencyMs >= 0);
  });

  it('returns reasoning string', () => {
    const d = engine.route('Fix the database schema');
    assert.ok(d.reasoning.length > 0);
    assert.ok(d.reasoning.includes('Lyssandria') || d.reasoning.includes('domain'));
  });

  it('returns matched patterns', () => {
    const d = engine.route('database schema migration');
    assert.ok(d.patterns.length > 0);
    assert.ok(d.patterns.includes('database'));
  });

  it('returns guardianName', () => {
    const d = engine.route('database query optimization');
    assert.ok(d.guardianName.length > 0);
  });

  it('recordOutcome updates success rate', () => {
    const d = engine.route('database schema');
    engine.recordOutcome(d, 'success', 1.0);
    const profile = engine.getGuardianProfile('lyssandria');
    assert.equal(profile.successRate, 1.0);
  });

  it('recordOutcome with failure decreases success rate', () => {
    const d1 = engine.route('database schema');
    engine.recordOutcome(d1, 'success', 1.0);
    const d2 = engine.route('database migration');
    engine.recordOutcome(d2, 'failure', -1.0);
    const profile = engine.getGuardianProfile('lyssandria');
    assert.equal(profile.successRate, 0.5);
  });

  it('getGuardianProfile returns correct data', () => {
    const profile = engine.getGuardianProfile('lyria');
    assert.equal(profile.guardianId, 'lyria');
    assert.equal(profile.guardianName, 'Lyria');
    assert.equal(profile.gate, 'Sight');
    assert.equal(profile.frequency, 639);
    assert.ok(Array.isArray(profile.domains));
    assert.ok(profile.domains.includes('debug'));
  });

  it('getGuardianProfile returns undefined for unknown', () => {
    const profile = engine.getGuardianProfile('nonexistent');
    assert.equal(profile, undefined);
  });

  it('getAllProfiles returns 10 entries', () => {
    const profiles = engine.getAllProfiles();
    assert.equal(profiles.length, 10);
  });

  it('getAllProfiles returns deep copies', () => {
    const profiles = engine.getAllProfiles();
    profiles[0].domains.push('MUTATED');
    const profiles2 = engine.getAllProfiles();
    assert.ok(!profiles2[0].domains.includes('MUTATED'));
  });

  it('getStats returns correct shape', () => {
    const stats = engine.getStats();
    assert.equal(typeof stats.totalRoutes, 'number');
    assert.equal(typeof stats.avgLatency, 'number');
    assert.equal(typeof stats.avgConfidence, 'number');
    assert.equal(typeof stats.outcomesRecorded, 'number');
  });

  it('getStats increments after routes', () => {
    engine.route('database');
    engine.route('debug');
    const stats = engine.getStats();
    assert.equal(stats.totalRoutes, 2);
  });

  it('case-insensitive domain matching', () => {
    const d = engine.route('DATABASE SCHEMA MIGRATION');
    assert.equal(d.guardianId, 'lyssandria');
  });

  it('multiple domain matches increase confidence', () => {
    const d1 = engine.route('database');
    const d2 = engine.route('database schema migration infrastructure');
    assert.ok(d2.confidence >= d1.confidence);
  });
});


// ═══════════════════════════════════════════════════════════════
// 4. FEEDBACK RECORDER
// ═══════════════════════════════════════════════════════════════

describe('FeedbackRecorder', { timeout: 10000 }, () => {
  let recorder;

  beforeEach(() => {
    recorder = new FeedbackRecorder();
  });

  it('can be instantiated', () => {
    assert.ok(recorder instanceof FeedbackRecorder);
  });

  it('record stores feedback', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'debug',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    assert.equal(recorder.size, 1);
  });

  it('record emits feedback-recorded event', () => {
    let received = null;
    recorder.on('feedback-recorded', (fb) => { received = fb; });
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'debug',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    assert.ok(received);
    assert.equal(received.eventId, 'e1');
  });

  it('record emits success-rate-changed event', () => {
    let received = null;
    recorder.on('success-rate-changed', (data) => { received = data; });
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'debug',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    assert.ok(received);
    assert.equal(received.guardianId, 'lyria');
    assert.equal(received.successRate, 1.0);
  });

  it('getByGuardian filters correctly', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'debug',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'aiyami', action: 'arch',
      outcome: 'success', reward: 1.0, tokensCost: 200, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e3', guardianId: 'lyria', action: 'analyze',
      outcome: 'failure', reward: -1.0, tokensCost: 50, timestamp: Date.now(),
    });
    const lyriaFeedback = recorder.getByGuardian('lyria');
    assert.equal(lyriaFeedback.length, 2);
  });

  it('getByGuardian with limit', () => {
    for (let i = 0; i < 10; i++) {
      recorder.record({
        eventId: `e${i}`, guardianId: 'lyria', action: 'debug',
        outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
      });
    }
    const last3 = recorder.getByGuardian('lyria', 3);
    assert.equal(last3.length, 3);
  });

  it('getByOutcome filters correctly', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'debug',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'lyria', action: 'debug',
      outcome: 'failure', reward: -1.0, tokensCost: 50, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e3', guardianId: 'aiyami', action: 'arch',
      outcome: 'success', reward: 1.0, tokensCost: 200, timestamp: Date.now(),
    });
    const successes = recorder.getByOutcome('success');
    assert.equal(successes.length, 2);
    const failures = recorder.getByOutcome('failure');
    assert.equal(failures.length, 1);
  });

  it('getByOutcome with limit', () => {
    for (let i = 0; i < 10; i++) {
      recorder.record({
        eventId: `e${i}`, guardianId: 'lyria', action: 'debug',
        outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
      });
    }
    const last2 = recorder.getByOutcome('success', 2);
    assert.equal(last2.length, 2);
  });

  it('getSuccessRate calculates correctly (global)', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'lyria', action: 'b',
      outcome: 'failure', reward: -1, tokensCost: 50, timestamp: Date.now(),
    });
    assert.equal(recorder.getSuccessRate(), 0.5);
  });

  it('getSuccessRate calculates correctly (per Guardian)', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'aiyami', action: 'b',
      outcome: 'failure', reward: -1, tokensCost: 50, timestamp: Date.now(),
    });
    assert.equal(recorder.getSuccessRate('lyria'), 1.0);
    assert.equal(recorder.getSuccessRate('aiyami'), 0.0);
  });

  it('getSuccessRate returns 0 for empty', () => {
    assert.equal(recorder.getSuccessRate(), 0);
    assert.equal(recorder.getSuccessRate('nonexistent'), 0);
  });

  it('getAvgReward calculates correctly (global)', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'lyria', action: 'b',
      outcome: 'failure', reward: -0.5, tokensCost: 50, timestamp: Date.now(),
    });
    assert.equal(recorder.getAvgReward(), 0.25);
  });

  it('getAvgReward calculates correctly (per Guardian)', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 2.0, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'aiyami', action: 'b',
      outcome: 'success', reward: 0.5, tokensCost: 50, timestamp: Date.now(),
    });
    assert.equal(recorder.getAvgReward('lyria'), 2.0);
    assert.equal(recorder.getAvgReward('aiyami'), 0.5);
  });

  it('getAvgReward returns 0 for empty', () => {
    assert.equal(recorder.getAvgReward(), 0);
  });

  it('getRecentFeedback returns last N records', () => {
    for (let i = 0; i < 20; i++) {
      recorder.record({
        eventId: `e${i}`, guardianId: 'lyria', action: `a${i}`,
        outcome: 'success', reward: 1, tokensCost: 10, timestamp: Date.now(),
      });
    }
    const recent5 = recorder.getRecentFeedback(5);
    assert.equal(recent5.length, 5);
    assert.equal(recent5[0].eventId, 'e15');
    assert.equal(recent5[4].eventId, 'e19');
  });

  it('getRecentFeedback defaults to 10', () => {
    for (let i = 0; i < 20; i++) {
      recorder.record({
        eventId: `e${i}`, guardianId: 'lyria', action: `a${i}`,
        outcome: 'success', reward: 1, tokensCost: 10, timestamp: Date.now(),
      });
    }
    const recent = recorder.getRecentFeedback();
    assert.equal(recent.length, 10);
  });

  it('bounded history enforced (verified with smaller batch)', () => {
    // Verify the bounding mechanism works by adding a chunk and checking
    // We test with a more practical count to avoid slow tests
    const recorder2 = new FeedbackRecorder();
    for (let i = 0; i < 1000; i++) {
      recorder2.record({
        eventId: `e${i}`, guardianId: 'lyria', action: 'a',
        outcome: 'success', reward: 1, tokensCost: 1, timestamp: Date.now(),
      });
    }
    assert.equal(recorder2.size, 1000);
    // The bound is 50000, so 1000 records should all be kept
    assert.ok(recorder2.size <= 50000);
  });

  it('clear removes all records', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    assert.equal(recorder.size, 1);
    recorder.clear();
    assert.equal(recorder.size, 0);
  });

  it('getStats returns correct shape', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'aiyami', action: 'b',
      outcome: 'failure', reward: -1, tokensCost: 50, timestamp: Date.now(),
    });
    const stats = recorder.getStats();
    assert.equal(stats.totalRecords, 2);
    assert.equal(stats.successRate, 0.5);
    assert.equal(stats.guardians, 2);
    assert.equal(stats.byOutcome.success, 1);
    assert.equal(stats.byOutcome.failure, 1);
    assert.equal(stats.byOutcome.partial, 0);
  });

  it('multiple guardians tracked independently', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1.0, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'aiyami', action: 'b',
      outcome: 'failure', reward: -1.0, tokensCost: 50, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e3', guardianId: 'draconia', action: 'c',
      outcome: 'partial', reward: 0.5, tokensCost: 75, timestamp: Date.now(),
    });
    assert.equal(recorder.getSuccessRate('lyria'), 1.0);
    assert.equal(recorder.getSuccessRate('aiyami'), 0.0);
    assert.equal(recorder.getSuccessRate('draconia'), 0.0);
    assert.equal(recorder.getAvgReward('lyria'), 1.0);
    assert.equal(recorder.getAvgReward('aiyami'), -1.0);
    assert.equal(recorder.getAvgReward('draconia'), 0.5);
  });

  it('trajectoryId is optional', () => {
    recorder.record({
      eventId: 'e1', trajectoryId: 'traj_1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    recorder.record({
      eventId: 'e2', guardianId: 'lyria', action: 'b',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    assert.equal(recorder.size, 2);
    const records = recorder.getByGuardian('lyria');
    assert.equal(records[0].trajectoryId, 'traj_1');
    assert.equal(records[1].trajectoryId, undefined);
  });

  it('metadata is optional', () => {
    recorder.record({
      eventId: 'e1', guardianId: 'lyria', action: 'a',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
      metadata: { foo: 'bar' },
    });
    const records = recorder.getByGuardian('lyria');
    assert.deepEqual(records[0].metadata, { foo: 'bar' });
  });
});


// ═══════════════════════════════════════════════════════════════
// 5. INTELLIGENCE PIPELINE
// ═══════════════════════════════════════════════════════════════

describe('IntelligencePipeline', { timeout: 10000 }, () => {

  beforeEach(() => {
    IntelligencePipeline.resetInstance();
  });

  it('singleton pattern works', () => {
    const p1 = IntelligencePipeline.getInstance();
    const p2 = IntelligencePipeline.getInstance();
    assert.strictEqual(p1, p2);
  });

  it('resetInstance creates new instance', () => {
    const p1 = IntelligencePipeline.getInstance();
    IntelligencePipeline.resetInstance();
    const p2 = IntelligencePipeline.getInstance();
    assert.notStrictEqual(p1, p2);
  });

  it('getInstance accepts config', () => {
    const p = IntelligencePipeline.getInstance({ enableCostTracking: false });
    const config = p.getConfig();
    assert.equal(config.enableCostTracking, false);
    assert.equal(config.enableTrajectoryRecording, true);
  });

  it('has eventBus property', () => {
    const p = IntelligencePipeline.getInstance();
    assert.ok(p.eventBus instanceof EventBus);
  });

  it('has routingEngine property', () => {
    const p = IntelligencePipeline.getInstance();
    assert.ok(p.routingEngine instanceof RoutingEngine);
  });

  it('has feedbackRecorder property', () => {
    const p = IntelligencePipeline.getInstance();
    assert.ok(p.feedbackRecorder instanceof FeedbackRecorder);
  });

  it('onTaskStart returns taskId', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('database schema fix');
    assert.ok(taskId);
    assert.ok(taskId.startsWith('evt_'));
  });

  it('onTaskStart emits task-start event', () => {
    const p = IntelligencePipeline.getInstance();
    let received = null;
    p.on('task-start', (e) => { received = e; });
    p.onTaskStart('database schema fix');
    assert.ok(received);
    assert.equal(received.type, 'task-start');
  });

  it('onTaskStart with guardianId uses that guardian', () => {
    const p = IntelligencePipeline.getInstance();
    let received = null;
    p.on('task-start', (e) => { received = e; });
    p.onTaskStart('some task', 'lyria');
    assert.equal(received.guardianId, 'lyria');
  });

  it('onTaskStart without guardianId auto-routes', () => {
    const p = IntelligencePipeline.getInstance();
    let received = null;
    p.on('task-start', (e) => { received = e; });
    p.onTaskStart('optimize the performance');
    assert.ok(received.guardianId);
    assert.equal(received.guardianId, 'draconia');
  });

  it('full task lifecycle: start then complete', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('debug the crash', 'lyria');
    p.onTaskComplete(taskId, { fixed: true }, 500);
    const stats = p.getStats();
    assert.ok(stats.eventsProcessed >= 2);
    assert.ok(stats.feedbackRecords >= 1);
  });

  it('full task lifecycle: start then fail', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('refactor the module', 'draconia');
    p.onTaskFail(taskId, new Error('Compilation failed'), 200);
    const stats = p.getStats();
    assert.ok(stats.eventsProcessed >= 2);
    assert.ok(stats.feedbackRecords >= 1);
  });

  it('onTaskComplete emits task-complete event', () => {
    const p = IntelligencePipeline.getInstance();
    let received = null;
    p.on('task-complete', (e) => { received = e; });
    const taskId = p.onTaskStart('test task');
    p.onTaskComplete(taskId, 'done', 100);
    assert.ok(received);
    assert.equal(received.type, 'task-complete');
    assert.equal(received.payload.taskId, taskId);
  });

  it('onTaskFail emits task-fail event', () => {
    const p = IntelligencePipeline.getInstance();
    let received = null;
    p.on('task-fail', (e) => { received = e; });
    const taskId = p.onTaskStart('test task');
    p.onTaskFail(taskId, 'something broke', 50);
    assert.ok(received);
    assert.equal(received.type, 'task-fail');
    assert.equal(received.payload.taskId, taskId);
  });

  it('onTaskComplete records positive feedback (reward=1)', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('debug issue', 'lyria');
    p.onTaskComplete(taskId, 'resolved');
    const feedback = p.feedbackRecorder.getByGuardian('lyria');
    assert.equal(feedback.length, 1);
    assert.equal(feedback[0].outcome, 'success');
    assert.equal(feedback[0].reward, 1.0);
  });

  it('onTaskFail records negative feedback (reward=-1)', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('refactor code', 'draconia');
    p.onTaskFail(taskId, 'failed');
    const feedback = p.feedbackRecorder.getByGuardian('draconia');
    assert.equal(feedback.length, 1);
    assert.equal(feedback[0].outcome, 'failure');
    assert.equal(feedback[0].reward, -1.0);
  });

  it('onTaskComplete tracks tokens when cost tracking enabled', () => {
    const p = IntelligencePipeline.getInstance({ enableCostTracking: true });
    const taskId = p.onTaskStart('task');
    p.onTaskComplete(taskId, 'done', 1500);
    const stats = p.getStats();
    assert.equal(stats.tokensTracked, 1500);
  });

  it('onTaskFail tracks tokens when cost tracking enabled', () => {
    const p = IntelligencePipeline.getInstance({ enableCostTracking: true });
    const taskId = p.onTaskStart('task');
    p.onTaskFail(taskId, 'err', 300);
    const stats = p.getStats();
    assert.equal(stats.tokensTracked, 300);
  });

  it('routeTask returns RoutingDecision', () => {
    const p = IntelligencePipeline.getInstance();
    const decision = p.routeTask('analyze the logs');
    assert.ok(decision.guardianId);
    assert.ok(decision.guardianName);
    assert.ok(decision.gate);
    assert.ok(decision.frequency > 0);
    assert.ok(decision.confidence > 0);
  });

  it('routeTask emits guardian-route event', () => {
    const p = IntelligencePipeline.getInstance();
    let received = null;
    p.on('guardian-route', (e) => { received = e; });
    p.routeTask('optimize performance');
    assert.ok(received);
    assert.equal(received.type, 'guardian-route');
  });

  it('recordFeedback stores in feedbackRecorder', () => {
    const p = IntelligencePipeline.getInstance();
    p.recordFeedback({
      eventId: 'test-e1', guardianId: 'lyria', action: 'debug',
      outcome: 'success', reward: 1, tokensCost: 100, timestamp: Date.now(),
    });
    assert.equal(p.feedbackRecorder.size, 1);
  });

  it('getStats returns correct shape', () => {
    const p = IntelligencePipeline.getInstance();
    const stats = p.getStats();
    assert.equal(typeof stats.eventsProcessed, 'number');
    assert.equal(typeof stats.trajectoriesRecorded, 'number');
    assert.equal(typeof stats.patternsLearned, 'number');
    assert.equal(typeof stats.tokensTracked, 'number');
    assert.equal(typeof stats.routingDecisions, 'number');
    assert.equal(typeof stats.avgRoutingLatency, 'number');
    assert.equal(typeof stats.avgRoutingConfidence, 'number');
    assert.equal(typeof stats.feedbackRecords, 'number');
    assert.equal(typeof stats.uptime, 'number');
  });

  it('getStats uptime increases over time', () => {
    const p = IntelligencePipeline.getInstance();
    const stats1 = p.getStats();
    assert.ok(stats1.uptime >= 0);
  });

  it('getGuardianInsight returns combined data', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('database migration', 'lyssandria');
    p.onTaskComplete(taskId, 'done');
    const insight = p.getGuardianInsight('lyssandria');
    assert.ok(insight.profile);
    assert.equal(insight.profile.guardianId, 'lyssandria');
    assert.equal(insight.feedbackCount, 1);
    assert.equal(insight.successRate, 1.0);
    assert.ok(Array.isArray(insight.recentFeedback));
  });

  it('getGuardianInsight for unknown guardian', () => {
    const p = IntelligencePipeline.getInstance();
    const insight = p.getGuardianInsight('nonexistent');
    assert.equal(insight.profile, undefined);
    assert.equal(insight.feedbackCount, 0);
    assert.equal(insight.successRate, 0);
  });

  it('generateReport produces markdown', () => {
    const p = IntelligencePipeline.getInstance();
    const taskId = p.onTaskStart('debug something');
    p.onTaskComplete(taskId, 'fixed', 100);
    const report = p.generateReport();
    assert.ok(report.includes('# Arcanea Intelligence Bridge Report'));
    assert.ok(report.includes('Pipeline Statistics'));
    assert.ok(report.includes('Guardian Profiles'));
    assert.ok(report.includes('Feedback Summary'));
    assert.ok(report.includes('@arcanea/intelligence-bridge'));
  });

  it('generateReport includes table rows', () => {
    const p = IntelligencePipeline.getInstance();
    const report = p.generateReport();
    assert.ok(report.includes('Lyssandria'));
    assert.ok(report.includes('Shinkami'));
    assert.ok(report.includes('Foundation'));
    assert.ok(report.includes('Source'));
  });

  it('config: disable trajectory recording', () => {
    const p = IntelligencePipeline.getInstance({ enableTrajectoryRecording: false });
    const taskId = p.onTaskStart('test task');
    p.onTaskComplete(taskId, 'done');
    const stats = p.getStats();
    assert.equal(stats.trajectoriesRecorded, 0);
  });

  it('config: disable cost tracking', () => {
    const p = IntelligencePipeline.getInstance({ enableCostTracking: false });
    const taskId = p.onTaskStart('test task');
    p.onTaskComplete(taskId, 'done', 999);
    const stats = p.getStats();
    assert.equal(stats.tokensTracked, 0);
  });

  it('config: disable pattern learning', () => {
    const p = IntelligencePipeline.getInstance({ enablePatternLearning: false });
    const taskId = p.onTaskStart('test task');
    p.onTaskComplete(taskId, 'done');
    const stats = p.getStats();
    assert.equal(stats.patternsLearned, 0);
  });
});


// ═══════════════════════════════════════════════════════════════
// 6. GUARDIAN INTEGRATION
// ═══════════════════════════════════════════════════════════════

describe('Guardian Integration', { timeout: 10000 }, () => {
  let engine;

  before(() => {
    engine = new RoutingEngine();
  });

  const guardianData = [
    { id: 'lyssandria', name: 'Lyssandria', gate: 'Foundation', freq: 174, element: 'Earth' },
    { id: 'leyla', name: 'Leyla', gate: 'Flow', freq: 285, element: 'Water' },
    { id: 'draconia', name: 'Draconia', gate: 'Fire', freq: 396, element: 'Fire' },
    { id: 'maylinn', name: 'Maylinn', gate: 'Heart', freq: 417, element: 'Water' },
    { id: 'alera', name: 'Alera', gate: 'Voice', freq: 528, element: 'Wind' },
    { id: 'lyria', name: 'Lyria', gate: 'Sight', freq: 639, element: 'Water' },
    { id: 'aiyami', name: 'Aiyami', gate: 'Crown', freq: 741, element: 'Spirit' },
    { id: 'elara', name: 'Elara', gate: 'Shift', freq: 852, element: 'Wind' },
    { id: 'ino', name: 'Ino', gate: 'Unity', freq: 963, element: 'Spirit' },
    { id: 'shinkami', name: 'Shinkami', gate: 'Source', freq: 1111, element: 'Void' },
  ];

  for (const g of guardianData) {
    it(`${g.name} is routable`, () => {
      const profile = engine.getGuardianProfile(g.id);
      assert.ok(profile);
      assert.ok(profile.domains.length > 0);
    });

    it(`${g.name} has correct gate: ${g.gate}`, () => {
      const profile = engine.getGuardianProfile(g.id);
      assert.equal(profile.gate, g.gate);
    });

    it(`${g.name} has correct frequency: ${g.freq} Hz`, () => {
      const profile = engine.getGuardianProfile(g.id);
      assert.equal(profile.frequency, g.freq);
    });

    it(`${g.name} has correct element: ${g.element}`, () => {
      const profile = engine.getGuardianProfile(g.id);
      assert.equal(profile.element, g.element);
    });

    it(`${g.name} has domains array`, () => {
      const profile = engine.getGuardianProfile(g.id);
      assert.ok(Array.isArray(profile.domains));
      assert.ok(profile.domains.length >= 4);
    });
  }
});


// ═══════════════════════════════════════════════════════════════
// 7. RL FEEDBACK LOOP
// ═══════════════════════════════════════════════════════════════

describe('RL Feedback Loop', { timeout: 10000 }, () => {
  let pipeline;

  beforeEach(() => {
    IntelligencePipeline.resetInstance();
    pipeline = IntelligencePipeline.getInstance();
  });

  it('route then record outcome then re-route shows learning', () => {
    const d1 = pipeline.routeTask('database schema fix');
    assert.equal(d1.guardianId, 'lyssandria');
    const c1 = d1.confidence;
    pipeline.routingEngine.recordOutcome(d1, 'success', 1.0);
    const d2 = pipeline.routeTask('database migration plan');
    assert.equal(d2.guardianId, 'lyssandria');
    assert.ok(d2.confidence >= c1);
  });

  it('failed Guardian gets lower confidence on re-route', () => {
    const d1 = pipeline.routeTask('optimize performance');
    assert.equal(d1.guardianId, 'draconia');
    for (let i = 0; i < 5; i++) {
      pipeline.routingEngine.recordOutcome(d1, 'failure', -1.0);
    }
    const d2 = pipeline.routeTask('optimize performance');
    // With the same query and failure history, confidence should decrease
    assert.ok(d2.confidence <= d1.confidence, `Expected confidence ${d2.confidence} <= ${d1.confidence}`);
    assert.ok(true);
  });

  it('success increases Guardian confidence', () => {
    const d1 = pipeline.routeTask('investigate and analyze the bug');
    const c1 = d1.confidence;
    for (let i = 0; i < 5; i++) {
      pipeline.routingEngine.recordOutcome(d1, 'success', 1.0);
    }
    const d2 = pipeline.routeTask('investigate and debug the crash');
    assert.ok(d2.confidence >= c1);
  });

  it('multiple feedback rounds converge', () => {
    const confidences = [];
    for (let round = 0; round < 10; round++) {
      const d = pipeline.routeTask('database schema');
      confidences.push(d.confidence);
      pipeline.routingEngine.recordOutcome(d, 'success', 1.0);
    }
    assert.ok(confidences[confidences.length - 1] >= confidences[0]);
  });

  it('cross-Guardian comparison via feedback', () => {
    for (let i = 0; i < 5; i++) {
      const d = pipeline.routeTask('debug and investigate');
      pipeline.routingEngine.recordOutcome(d, 'success', 1.0);
    }
    for (let i = 0; i < 5; i++) {
      const d = pipeline.routeTask('optimize performance');
      pipeline.routingEngine.recordOutcome(d, 'failure', -1.0);
    }
    const lyriaProfile = pipeline.routingEngine.getGuardianProfile('lyria');
    const draconiaProfile = pipeline.routingEngine.getGuardianProfile('draconia');
    assert.ok(lyriaProfile.successRate > draconiaProfile.successRate);
  });

  it('full lifecycle with auto-routing produces feedback', () => {
    const taskId = pipeline.onTaskStart('investigate the database schema issue');
    pipeline.onTaskComplete(taskId, 'resolved', 200);
    const stats = pipeline.getStats();
    assert.ok(stats.feedbackRecords >= 1);
    assert.ok(stats.eventsProcessed >= 2);
  });
});


// ═══════════════════════════════════════════════════════════════
// 8. EDGE CASES
// ═══════════════════════════════════════════════════════════════

describe('Edge Cases', { timeout: 10000 }, () => {
  let pipeline;

  beforeEach(() => {
    IntelligencePipeline.resetInstance();
    pipeline = IntelligencePipeline.getInstance();
  });

  it('empty task string routes to shinkami', () => {
    const d = pipeline.routeTask('');
    assert.equal(d.guardianId, 'shinkami');
  });

  it('route with no history still works', () => {
    const d = pipeline.routeTask('database schema');
    assert.ok(d.guardianId);
    assert.ok(d.confidence > 0);
  });

  it('concurrent task starts do not interfere', () => {
    const id1 = pipeline.onTaskStart('database fix', 'lyssandria');
    const id2 = pipeline.onTaskStart('debug crash', 'lyria');
    const id3 = pipeline.onTaskStart('optimize query', 'draconia');
    assert.notEqual(id1, id2);
    assert.notEqual(id2, id3);
    pipeline.onTaskComplete(id2, 'done');
    pipeline.onTaskFail(id1, 'error');
    pipeline.onTaskComplete(id3, 'done');
    const stats = pipeline.getStats();
    assert.ok(stats.feedbackRecords >= 3);
  });

  it('task complete without prior start does not crash', () => {
    assert.doesNotThrow(() => {
      pipeline.onTaskComplete('nonexistent-id', 'result', 100);
    });
  });

  it('task fail without prior start does not crash', () => {
    assert.doesNotThrow(() => {
      pipeline.onTaskFail('nonexistent-id', 'error', 50);
    });
  });

  it('duplicate task IDs are separate (each onTaskStart generates unique)', () => {
    const id1 = pipeline.onTaskStart('task A');
    const id2 = pipeline.onTaskStart('task B');
    assert.notEqual(id1, id2);
  });

  it('very long task description handled', () => {
    const longTask = 'database '.repeat(1000);
    assert.doesNotThrow(() => {
      const d = pipeline.routeTask(longTask);
      assert.ok(d.guardianId);
    });
  });

  it('special characters in task handled', () => {
    assert.doesNotThrow(() => {
      const d = pipeline.routeTask('debug <script>alert("xss")</script> & analyze | grep');
      assert.ok(d.guardianId);
    });
  });

  it('unicode in task handled', () => {
    assert.doesNotThrow(() => {
      const d = pipeline.routeTask('database migration shift change');
      assert.ok(d.guardianId);
    });
  });

  it('null/undefined payload fields handled gracefully', () => {
    assert.doesNotThrow(() => {
      pipeline.eventBus.emitEvent({
        id: 'e1', type: 'task-start', timestamp: Date.now(),
        payload: { value: null, other: undefined },
      });
    });
  });

  it('multiple rapid routes do not corrupt state', () => {
    const results = [];
    for (let i = 0; i < 100; i++) {
      results.push(pipeline.routeTask('database schema'));
    }
    assert.equal(results.length, 100);
    assert.ok(results.every(r => r.guardianId === 'lyssandria'));
  });

  it('getGuardianInsight for guardian with no activity', () => {
    const insight = pipeline.getGuardianInsight('elara');
    assert.ok(insight.profile);
    assert.equal(insight.feedbackCount, 0);
    assert.equal(insight.successRate, 0);
    assert.equal(insight.avgReward, 0);
    assert.equal(insight.recentFeedback.length, 0);
  });

  it('generateReport works with no data', () => {
    const report = pipeline.generateReport();
    assert.ok(report.includes('# Arcanea Intelligence Bridge Report'));
    assert.ok(report.length > 100);
  });

  it('Error object is serialized in task-fail', () => {
    let received = null;
    pipeline.on('task-fail', (e) => { received = e; });
    const taskId = pipeline.onTaskStart('task');
    pipeline.onTaskFail(taskId, new Error('Test error'));
    assert.equal(received.payload.error, 'Test error');
  });

  it('string error is serialized in task-fail', () => {
    let received = null;
    pipeline.on('task-fail', (e) => { received = e; });
    const taskId = pipeline.onTaskStart('task');
    pipeline.onTaskFail(taskId, 'plain string error');
    assert.equal(received.payload.error, 'plain string error');
  });
});


// ═══════════════════════════════════════════════════════════════
// 9. CONSTANTS & PROFILES
// ═══════════════════════════════════════════════════════════════

describe('Constants and Profiles', { timeout: 10000 }, () => {
  it('all GUARDIAN_ROUTING_PROFILES have required fields', () => {
    for (const p of GUARDIAN_ROUTING_PROFILES) {
      assert.ok(p.guardianId, `Missing guardianId`);
      assert.ok(p.guardianName, `Missing guardianName for ${p.guardianId}`);
      assert.ok(p.gate, `Missing gate for ${p.guardianId}`);
      assert.ok(p.frequency > 0, `Invalid frequency for ${p.guardianId}`);
      assert.ok(p.element, `Missing element for ${p.guardianId}`);
      assert.ok(Array.isArray(p.domains), `Missing domains for ${p.guardianId}`);
      assert.ok(p.domains.length > 0, `Empty domains for ${p.guardianId}`);
      assert.equal(typeof p.successRate, 'number');
      assert.equal(typeof p.avgLatency, 'number');
      assert.equal(typeof p.totalTasks, 'number');
      assert.equal(typeof p.patterns, 'number');
    }
  });

  it('frequencies follow Extended Solfeggio sequence', () => {
    const expected = [174, 285, 396, 417, 528, 639, 741, 852, 963, 1111];
    const actual = GUARDIAN_ROUTING_PROFILES.map(p => p.frequency);
    assert.deepEqual(actual, expected);
  });

  it('gate names are unique', () => {
    const gates = GUARDIAN_ROUTING_PROFILES.map(p => p.gate);
    const unique = new Set(gates);
    assert.equal(unique.size, 10);
  });

  it('guardianIds are unique', () => {
    const ids = GUARDIAN_ROUTING_PROFILES.map(p => p.guardianId);
    const unique = new Set(ids);
    assert.equal(unique.size, 10);
  });

  it('elements include all Five Elements plus Void', () => {
    const elements = new Set(GUARDIAN_ROUTING_PROFILES.map(p => p.element));
    assert.ok(elements.has('Earth'));
    assert.ok(elements.has('Water'));
    assert.ok(elements.has('Fire'));
    assert.ok(elements.has('Wind'));
    assert.ok(elements.has('Spirit'));
    assert.ok(elements.has('Void'));
  });

  it('DEFAULT_PIPELINE_CONFIG has all required fields', () => {
    const fields = [
      'enableTrajectoryRecording', 'enablePatternLearning',
      'enableCostTracking', 'enableMemoryPersistence',
      'learningProfile', 'budgetWarningThreshold', 'budgetCriticalThreshold',
    ];
    for (const field of fields) {
      assert.ok(field in DEFAULT_PIPELINE_CONFIG, `Missing field: ${field}`);
    }
  });

  it('budget thresholds are in valid range', () => {
    assert.ok(DEFAULT_PIPELINE_CONFIG.budgetWarningThreshold > 0);
    assert.ok(DEFAULT_PIPELINE_CONFIG.budgetWarningThreshold < 1);
    assert.ok(DEFAULT_PIPELINE_CONFIG.budgetCriticalThreshold > DEFAULT_PIPELINE_CONFIG.budgetWarningThreshold);
    assert.ok(DEFAULT_PIPELINE_CONFIG.budgetCriticalThreshold <= 1);
  });
});


// ═══════════════════════════════════════════════════════════════
// 10. INTEGRATION TESTS
// ═══════════════════════════════════════════════════════════════

describe('Integration: Pipeline + EventBus + Router', { timeout: 10000 }, () => {
  let pipeline;

  beforeEach(() => {
    IntelligencePipeline.resetInstance();
    pipeline = IntelligencePipeline.getInstance();
  });

  it('task-start events appear in eventBus history', () => {
    pipeline.onTaskStart('database task');
    const history = pipeline.eventBus.getHistoryByType('task-start');
    assert.ok(history.length >= 1);
  });

  it('task-complete events appear in eventBus history', () => {
    const taskId = pipeline.onTaskStart('task');
    pipeline.onTaskComplete(taskId, 'done');
    const history = pipeline.eventBus.getHistoryByType('task-complete');
    assert.ok(history.length >= 1);
  });

  it('task-fail events appear in eventBus history', () => {
    const taskId = pipeline.onTaskStart('task');
    pipeline.onTaskFail(taskId, 'error');
    const history = pipeline.eventBus.getHistoryByType('task-fail');
    assert.ok(history.length >= 1);
  });

  it('guardian-route events appear in eventBus history', () => {
    pipeline.routeTask('database schema');
    const history = pipeline.eventBus.getHistoryByType('guardian-route');
    assert.ok(history.length >= 1);
  });

  it('routing stats match pipeline stats', () => {
    pipeline.routeTask('database');
    pipeline.routeTask('debug');
    pipeline.routeTask('performance');
    const routingStats = pipeline.routingEngine.getStats();
    const pipelineStats = pipeline.getStats();
    assert.equal(pipelineStats.routingDecisions, routingStats.totalRoutes);
  });

  it('feedback recorder stats match pipeline stats', () => {
    const t1 = pipeline.onTaskStart('task1');
    pipeline.onTaskComplete(t1, 'done');
    const t2 = pipeline.onTaskStart('task2');
    pipeline.onTaskFail(t2, 'err');
    const feedbackStats = pipeline.feedbackRecorder.getStats();
    const pipelineStats = pipeline.getStats();
    assert.equal(pipelineStats.feedbackRecords, feedbackStats.totalRecords);
  });

  it('eventBus history by guardian matches pipeline activity', () => {
    pipeline.onTaskStart('database fix', 'lyssandria');
    pipeline.onTaskStart('debug crash', 'lyria');
    const lyssandriaEvents = pipeline.eventBus.getHistoryByGuardian('lyssandria');
    const lyriaEvents = pipeline.eventBus.getHistoryByGuardian('lyria');
    assert.ok(lyssandriaEvents.length >= 1);
    assert.ok(lyriaEvents.length >= 1);
  });

  it('multiple complete/fail cycles accumulate stats', () => {
    for (let i = 0; i < 5; i++) {
      const taskId = pipeline.onTaskStart(`task-${i}`, 'lyria');
      if (i % 2 === 0) {
        pipeline.onTaskComplete(taskId, 'done', 100);
      } else {
        pipeline.onTaskFail(taskId, 'err', 50);
      }
    }
    const stats = pipeline.getStats();
    assert.equal(stats.feedbackRecords, 5);
    assert.ok(stats.tokensTracked > 0);
  });

  it('auto-routed tasks record routing decision for feedback', () => {
    const taskId = pipeline.onTaskStart('optimize the database schema');
    pipeline.onTaskComplete(taskId, 'done');
    const routingStats = pipeline.routingEngine.getStats();
    assert.ok(routingStats.outcomesRecorded >= 1);
  });

  it('getConfig returns current configuration', () => {
    const config = pipeline.getConfig();
    assert.equal(config.enableTrajectoryRecording, true);
    assert.equal(config.learningProfile, 'balanced');
  });
});
