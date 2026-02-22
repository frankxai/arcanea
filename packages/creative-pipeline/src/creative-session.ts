import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import type { CreativeSession } from './types.js';

/**
 * CreativeSessionManager — Manages creative sessions with single-active constraint.
 * Tracks assets, prompts, lifecycle state, and emits events.
 */
export class CreativeSessionManager extends EventEmitter {
  private sessions: Map<string, CreativeSession> = new Map();
  private completedAt: Map<string, Date> = new Map();

  // ─── Lifecycle ──────────────────────────────────────────────────────────

  startSession(guardianId: string, gate?: string, element?: string): CreativeSession {
    // Enforce single active session
    const active = this.getActiveSession();
    if (active) {
      throw new Error(`A session is already active: ${active.id}. Complete or pause it first.`);
    }

    const session: CreativeSession = {
      id: randomUUID(),
      guardianId,
      gate,
      element,
      startedAt: new Date(),
      assets: [],
      prompts: [],
      status: 'active',
    };

    this.sessions.set(session.id, session);
    this.emit('session-started', session);
    return session;
  }

  getSession(id: string): CreativeSession | undefined {
    return this.sessions.get(id);
  }

  getActiveSession(): CreativeSession | undefined {
    for (const session of this.sessions.values()) {
      if (session.status === 'active') return session;
    }
    return undefined;
  }

  // ─── Assets & Prompts ───────────────────────────────────────────────────

  addAssetToSession(sessionId: string, assetId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);
    if (session.status === 'complete') throw new Error('Cannot add to a completed session.');

    session.assets.push(assetId);
    this.emit('asset-added', { sessionId, assetId });
  }

  addPromptToSession(sessionId: string, promptId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);
    if (session.status === 'complete') throw new Error('Cannot add to a completed session.');

    session.prompts.push(promptId);
  }

  // ─── State Transitions ─────────────────────────────────────────────────

  pauseSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);
    if (session.status !== 'active') throw new Error('Only active sessions can be paused.');

    session.status = 'paused';
    this.emit('session-paused', session);
  }

  resumeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);
    if (session.status !== 'paused') throw new Error('Only paused sessions can be resumed.');

    // Ensure no other active session
    const active = this.getActiveSession();
    if (active) {
      throw new Error(`Another session is already active: ${active.id}. Complete or pause it first.`);
    }

    session.status = 'active';
    this.emit('session-resumed', session);
  }

  completeSession(sessionId: string): { session: CreativeSession; summary: Record<string, unknown> } {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);
    if (session.status === 'complete') throw new Error('Session is already complete.');

    session.status = 'complete';
    const completedTime = new Date();
    this.completedAt.set(sessionId, completedTime);

    const duration = completedTime.getTime() - session.startedAt.getTime();

    const summary = {
      sessionId: session.id,
      guardianId: session.guardianId,
      gate: session.gate,
      element: session.element,
      assetsCreated: session.assets.length,
      promptsUsed: session.prompts.length,
      durationMs: duration,
      durationFormatted: this.formatDuration(duration),
      completedAt: completedTime.toISOString(),
    };

    this.emit('session-completed', { session, summary });
    return { session, summary };
  }

  // ─── Stats ──────────────────────────────────────────────────────────────

  getSessionStats(sessionId: string): {
    assetsCreated: number;
    promptsUsed: number;
    durationMs: number;
    status: string;
  } {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);

    const endTime = this.completedAt.get(sessionId) ?? new Date();
    const duration = endTime.getTime() - session.startedAt.getTime();

    return {
      assetsCreated: session.assets.length,
      promptsUsed: session.prompts.length,
      durationMs: duration,
      status: session.status,
    };
  }

  listSessions(status?: 'active' | 'paused' | 'complete'): CreativeSession[] {
    const results: CreativeSession[] = [];
    for (const session of this.sessions.values()) {
      if (!status || session.status === status) {
        results.push(session);
      }
    }
    return results;
  }

  // ─── Internals ──────────────────────────────────────────────────────────

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}
