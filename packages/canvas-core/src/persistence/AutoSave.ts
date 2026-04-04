'use client';

import { useEffect, useRef } from 'react';
import { useBoard } from '../graph/BoardState';
import type { Board } from '../graph/types';

interface AutoSaveOptions {
  debounceMs?: number;
  onSave?: (board: Board) => void | Promise<void>;
}

/**
 * Hook that auto-saves board state when it changes.
 * Uses debouncing to avoid excessive saves during rapid edits.
 */
export function useAutoSave({ debounceMs = 500, onSave }: AutoSaveOptions = {}) {
  const { board } = useBoard();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    const serialized = JSON.stringify(board);

    // Skip if nothing changed
    if (serialized === lastSavedRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      lastSavedRef.current = serialized;
      onSave?.(board);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [board, debounceMs, onSave]);
}
