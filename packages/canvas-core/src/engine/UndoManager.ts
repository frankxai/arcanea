'use client';

import { useCallback, useRef } from 'react';
import type { Board } from '../graph/types';

const MAX_HISTORY = 50;

interface UndoState {
  past: string[];
  future: string[];
}

/**
 * Undo/Redo manager for board state.
 * Stores serialized board snapshots for efficient comparison.
 */
export function useUndoManager() {
  const history = useRef<UndoState>({ past: [], future: [] });
  const lastSnapshot = useRef<string>('');

  const pushState = useCallback((board: Board) => {
    const snapshot = JSON.stringify({
      nodes: board.nodes,
      connections: board.connections,
    });

    // Skip if nothing changed
    if (snapshot === lastSnapshot.current) return;

    history.current.past.push(lastSnapshot.current);
    if (history.current.past.length > MAX_HISTORY) {
      history.current.past.shift();
    }
    history.current.future = [];
    lastSnapshot.current = snapshot;
  }, []);

  const initState = useCallback((board: Board) => {
    lastSnapshot.current = JSON.stringify({
      nodes: board.nodes,
      connections: board.connections,
    });
    history.current = { past: [], future: [] };
  }, []);

  const undo = useCallback((): { nodes: Board['nodes']; connections: Board['connections'] } | null => {
    const { past, future } = history.current;
    if (past.length === 0) return null;

    const previous = past.pop()!;
    future.push(lastSnapshot.current);
    lastSnapshot.current = previous;

    return previous ? JSON.parse(previous) : null;
  }, []);

  const redo = useCallback((): { nodes: Board['nodes']; connections: Board['connections'] } | null => {
    const { past, future } = history.current;
    if (future.length === 0) return null;

    const next = future.pop()!;
    past.push(lastSnapshot.current);
    lastSnapshot.current = next;

    return next ? JSON.parse(next) : null;
  }, []);

  const canUndo = history.current.past.length > 0;
  const canRedo = history.current.future.length > 0;

  return { pushState, initState, undo, redo, canUndo, canRedo };
}
