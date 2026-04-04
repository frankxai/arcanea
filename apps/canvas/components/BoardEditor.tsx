'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  BoardProvider,
  InfiniteCanvas,
  useBoard,
  NodeRegistry,
  StickyNoteNode,
  CardNode,
  FrameNode,
  createEmptyBoard,
  type Board,
  type StickyColor,
} from '@arcanea/canvas-core';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';

// Create and memoize the node registry
function createRegistry(): NodeRegistry {
  return new NodeRegistry()
    .register('sticky-note', StickyNoteNode)
    .register('card', CardNode)
    .register('frame', FrameNode);
}

interface BoardEditorInnerProps {
  boardId: string;
}

function BoardEditorInner({ boardId }: BoardEditorInnerProps) {
  const { board, loadBoard } = useBoard();
  const [activeStickyColor, setActiveStickyColor] = useState<StickyColor>('yellow');
  const registry = useMemo(createRegistry, []);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isLoadedRef = useRef(false);

  // Load board from localStorage on mount
  useEffect(() => {
    if (isLoadedRef.current) return;
    isLoadedRef.current = true;

    try {
      const stored = localStorage.getItem(`arcanea-board-${boardId}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Board;
        loadBoard(parsed);
      }
    } catch {
      // Start with empty board
    }
  }, [boardId, loadBoard]);

  // Auto-save to localStorage on changes (debounced)
  useEffect(() => {
    if (!isLoadedRef.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(`arcanea-board-${boardId}`, JSON.stringify(board));

      // Update the board index
      try {
        const indexStr = localStorage.getItem('arcanea-boards-index');
        if (indexStr) {
          const index = JSON.parse(indexStr) as Array<{ id: string; title: string; updatedAt: string; nodeCount: number }>;
          const boardIndex = index.findIndex((b) => b.id === boardId);
          if (boardIndex >= 0) {
            index[boardIndex] = {
              ...index[boardIndex],
              title: board.title,
              updatedAt: board.updatedAt,
              nodeCount: board.nodes.length,
            };
            localStorage.setItem('arcanea-boards-index', JSON.stringify(index));
          }
        }
      } catch {
        // Index update failed silently
      }
    }, 500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [board, boardId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Delete is handled at node level to avoid conflicts with text editing
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-cosmic-void overflow-hidden">
      {/* Canvas */}
      <InfiniteCanvas
        className="w-full h-full"
        registry={registry}
      />

      {/* Toolbar */}
      <Toolbar
        activeStickyColor={activeStickyColor}
        onStickyColorChange={setActiveStickyColor}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Board title */}
      <BoardTitleBar boardId={boardId} />
    </div>
  );
}

function BoardTitleBar({ boardId }: { boardId: string }) {
  const { board, dispatch } = useBoard();
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = useCallback(
    (value: string) => {
      dispatch({
        type: 'LOAD_BOARD',
        board: { ...board, title: value },
      });
    },
    [board, dispatch]
  );

  return (
    <div className="absolute top-4 left-4 z-50">
      <a href="/" className="text-text-muted hover:text-text-primary text-xs transition-colors">
        &larr; Boards
      </a>
      {isEditing ? (
        <input
          className="block mt-1 bg-transparent outline-none text-sm font-display font-semibold text-text-primary border-b border-brand-accent"
          value={board.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') setIsEditing(false);
          }}
          autoFocus
        />
      ) : (
        <h1
          className="mt-1 text-sm font-display font-semibold text-text-primary cursor-text hover:text-brand-accent transition-colors"
          onClick={() => setIsEditing(true)}
        >
          {board.title}
        </h1>
      )}
    </div>
  );
}

// Wrapper with provider
interface BoardEditorProps {
  boardId: string;
}

export function BoardEditor({ boardId }: BoardEditorProps) {
  const initialBoard = useMemo(() => createEmptyBoard(boardId), [boardId]);

  return (
    <BoardProvider initialBoard={initialBoard}>
      <BoardEditorInner boardId={boardId} />
    </BoardProvider>
  );
}
