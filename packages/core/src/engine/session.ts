/**
 * Session Manager
 *
 * Tracks session state across interactions:
 * - Active Guardian and Gate
 * - Interaction history
 * - Element affinity
 * - Context accumulation
 */

import type { GuardianName, GateName, Element } from '../types/mythology.js';
import type { Guardian } from '../types/mythology.js';
import { GUARDIANS, GATES } from '../constants/mythology.js';

// ============================================
// SESSION TYPES
// ============================================

export interface SessionEvent {
  timestamp: number;
  type: 'route' | 'channel' | 'create' | 'query' | 'generate';
  guardian: GuardianName;
  gate: GateName;
  element: Element;
  input: string;
  confidence: number;
}

export interface SessionState {
  id: string;
  startedAt: number;
  activeGuardian: GuardianName;
  activeGate: GateName;
  activeElement: Element;
  events: SessionEvent[];
  elementAffinity: Record<Element, number>;
  guardianUsage: Record<GuardianName, number>;
  metadata: Record<string, unknown>;
}

// ============================================
// SESSION MANAGER
// ============================================

export class SessionManager {
  private state: SessionState;

  constructor(sessionId?: string) {
    this.state = {
      id: sessionId || this.generateId(),
      startedAt: Date.now(),
      activeGuardian: 'shinkami',
      activeGate: 'source',
      activeElement: 'void',
      events: [],
      elementAffinity: { fire: 0, water: 0, earth: 0, wind: 0, void: 0 },
      guardianUsage: {} as Record<GuardianName, number>,
      metadata: {},
    };
  }

  /**
   * Record a routing event and update session state.
   */
  recordEvent(event: Omit<SessionEvent, 'timestamp'>): void {
    const fullEvent: SessionEvent = { ...event, timestamp: Date.now() };
    this.state.events.push(fullEvent);

    // Update active state
    this.state.activeGuardian = event.guardian;
    this.state.activeGate = event.gate;
    this.state.activeElement = event.element;

    // Update affinity
    this.state.elementAffinity[event.element] += 1;

    // Update usage
    this.state.guardianUsage[event.guardian] =
      (this.state.guardianUsage[event.guardian] || 0) + 1;
  }

  /**
   * Get the current active Guardian object.
   */
  getActiveGuardian(): Guardian {
    return GUARDIANS.find(g => g.name === this.state.activeGuardian) || GUARDIANS[9]; // Shinkami default
  }

  /**
   * Get the dominant element based on session affinity.
   */
  getDominantElement(): Element {
    const entries = Object.entries(this.state.elementAffinity) as [Element, number][];
    const sorted = entries.sort(([, a], [, b]) => b - a);
    return sorted[0][1] > 0 ? sorted[0][0] : 'void';
  }

  /**
   * Get the most-used Guardian in this session.
   */
  getMostUsedGuardian(): Guardian {
    const entries = Object.entries(this.state.guardianUsage) as [GuardianName, number][];
    if (entries.length === 0) return GUARDIANS[9]; // Shinkami default
    const sorted = entries.sort(([, a], [, b]) => b - a);
    return GUARDIANS.find(g => g.name === sorted[0][0]) || GUARDIANS[9];
  }

  /**
   * Get session summary for statusline display.
   */
  getStatusLine(): string {
    const guardian = this.getActiveGuardian();
    const gate = GATES.find(g => g.name === this.state.activeGate);
    const element = this.getDominantElement();
    const eventCount = this.state.events.length;

    return `Guardian: ${guardian.displayName} | Gate: ${gate?.name || 'source'} | Element: ${element} | Events: ${eventCount}`;
  }

  /**
   * Export session state (for persistence).
   */
  export(): SessionState {
    return { ...this.state };
  }

  /**
   * Import session state (for restoration).
   */
  import(state: SessionState): void {
    this.state = { ...state };
  }

  /**
   * Set metadata on the session.
   */
  setMeta(key: string, value: unknown): void {
    this.state.metadata[key] = value;
  }

  /**
   * Get metadata from the session.
   */
  getMeta<T = unknown>(key: string): T | undefined {
    return this.state.metadata[key] as T | undefined;
  }

  /**
   * Get the full session state.
   */
  getState(): Readonly<SessionState> {
    return this.state;
  }

  private generateId(): string {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).substring(2, 8);
    return `arc-${ts}-${rand}`;
  }
}
