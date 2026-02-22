// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — EventBus
// Typed event distribution with bounded history
// ─────────────────────────────────────────────────────────────

import { EventEmitter } from 'node:events';
import type { IntelligenceEvent, EventType } from './types.js';

const MAX_HISTORY = 10_000;

let _idCounter = 0;

/**
 * Generate a unique event ID.
 */
export function generateEventId(): string {
  _idCounter += 1;
  return `evt_${Date.now()}_${_idCounter}`;
}

/**
 * Central event bus for intelligence events.
 * Stores a bounded history and supports typed subscriptions.
 */
export class EventBus extends EventEmitter {
  private history: IntelligenceEvent[] = [];

  constructor() {
    super();
    this.setMaxListeners(100);
  }

  /**
   * Emit an intelligence event and store it in history.
   */
  emitEvent(event: IntelligenceEvent): void {
    // Ensure the event has an id
    if (!event.id) {
      event.id = generateEventId();
    }
    if (!event.timestamp) {
      event.timestamp = Date.now();
    }

    this.history.push(event);

    // Enforce bounded history
    if (this.history.length > MAX_HISTORY) {
      this.history = this.history.slice(this.history.length - MAX_HISTORY);
    }

    // Emit on the specific event type channel AND a global 'event' channel
    this.emit(event.type, event);
    this.emit('event', event);
  }

  /**
   * Subscribe to a specific event type.
   */
  onEvent(eventType: EventType, handler: (event: IntelligenceEvent) => void): void {
    this.on(eventType, handler);
  }

  /**
   * Unsubscribe from a specific event type.
   */
  offEvent(eventType: EventType, handler: (event: IntelligenceEvent) => void): void {
    this.off(eventType, handler);
  }

  /**
   * Get recent event history.
   */
  getHistory(limit?: number): IntelligenceEvent[] {
    if (limit !== undefined && limit > 0) {
      return this.history.slice(-limit);
    }
    return [...this.history];
  }

  /**
   * Get event history filtered by type.
   */
  getHistoryByType(type: EventType, limit?: number): IntelligenceEvent[] {
    const filtered = this.history.filter((e) => e.type === type);
    if (limit !== undefined && limit > 0) {
      return filtered.slice(-limit);
    }
    return filtered;
  }

  /**
   * Get event history filtered by guardianId.
   */
  getHistoryByGuardian(guardianId: string, limit?: number): IntelligenceEvent[] {
    const filtered = this.history.filter((e) => e.guardianId === guardianId);
    if (limit !== undefined && limit > 0) {
      return filtered.slice(-limit);
    }
    return filtered;
  }

  /**
   * Clear all event history.
   */
  clear(): void {
    this.history = [];
  }

  /**
   * Get the total number of events in history.
   */
  get size(): number {
    return this.history.length;
  }
}
