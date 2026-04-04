'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  BoardProvider,
  InfiniteCanvas,
  useBoard,
  useCanvasViewport,
  useUndoManager,
  useDropHandler,
  NodeRegistry,
  StickyNoteNode,
  CardNode,
  FrameNode,
  MarkdownDocNode,
  CodeBlockNode,
  MediaEmbedNode,
  URLCardNode,
  LivePreviewNode,
  createEmptyBoard,
  type Board,
  type CanvasNodeType,
  type StickyColor,
} from '@arcanea/canvas-core';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';

// Create and memoize the full node registry
function createRegistry(): NodeRegistry {
  return new NodeRegistry()
    // Phase 1
    .register('sticky-note', StickyNoteNode)
    .register('card', CardNode)
    .register('frame', FrameNode)
    // Phase 2
    .register('markdown-doc', MarkdownDocNode)
    .register('code-block', CodeBlockNode)
    .register('media-embed', MediaEmbedNode)
    .register('url-card', URLCardNode)
    .register('live-preview', LivePreviewNode);
}

interface BoardEditorInnerProps {
  boardId: string;
}

function BoardEditorInner({ boardId }: BoardEditorInnerProps) {
  const { board, loadBoard, addNode, removeNode, selectedNodeIds } = useBoard();
  const { viewport } = useCanvasViewport();
  const [activeStickyColor, setActiveStickyColor] = useState<StickyColor>('yellow');
  const registry = useMemo(createRegistry, []);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isLoadedRef = useRef(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Undo/Redo
  const { pushState, initState, undo, redo, canUndo, canRedo } = useUndoManager();

  // Load board from localStorage on mount
  useEffect(() => {
    if (isLoadedRef.current) return;
    isLoadedRef.current = true;

    try {
      const stored = localStorage.getItem(`arcanea-board-${boardId}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Board;
        loadBoard(parsed);
        initState(parsed);
      }
    } catch {
      // Start with empty board
    }
  }, [boardId, loadBoard, initState]);

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

      // Push to undo stack
      pushState(board);
    }, 500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [board, boardId, pushState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isEditing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable;

      if (isEditing) return;

      // Delete selected nodes
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        for (const id of selectedNodeIds) {
          removeNode(id);
        }
        return;
      }

      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        const state = undo();
        if (state) {
          loadBoard({ ...board, nodes: state.nodes, connections: state.connections });
        }
        return;
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl + Y
      if ((e.ctrlKey || e.metaKey) && (e.key === 'Z' || e.key === 'y')) {
        e.preventDefault();
        const state = redo();
        if (state) {
          loadBoard({ ...board, nodes: state.nodes, connections: state.connections });
        }
        return;
      }

      // Quick add shortcuts
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey) {
        const cx = (-viewport.x + window.innerWidth / 2) / viewport.zoom;
        const cy = (-viewport.y + window.innerHeight / 2) / viewport.zoom;
        addNode('sticky-note', { x: cx, y: cy }, { metadata: { color: activeStickyColor } });
        return;
      }

      if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const cx = (-viewport.x + window.innerWidth / 2) / viewport.zoom;
        const cy = (-viewport.y + window.innerHeight / 2) / viewport.zoom;
        addNode('card', { x: cx, y: cy });
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeIds, removeNode, undo, redo, loadBoard, board, addNode, viewport, activeStickyColor]);

  // Drop handler for URLs and files
  const { dropHandlers } = useDropHandler(
    canvasContainerRef,
    viewport,
    useCallback(
      (result) => {
        addNode(result.type, result.position, {
          sourceUrl: result.data.sourceUrl,
          title: result.data.title || '',
          content: result.data.content,
          metadata: result.data.metadata || {},
        });
      },
      [addNode]
    )
  );

  return (
    <div
      ref={canvasContainerRef}
      className="relative w-screen h-screen bg-cosmic-void overflow-hidden"
      {...dropHandlers}
    >
      {/* Canvas */}
      <InfiniteCanvas className="w-full h-full" registry={registry} />

      {/* Toolbar */}
      <Toolbar
        activeStickyColor={activeStickyColor}
        onStickyColorChange={setActiveStickyColor}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={() => {
          const state = undo();
          if (state) loadBoard({ ...board, nodes: state.nodes, connections: state.connections });
        }}
        onRedo={() => {
          const state = redo();
          if (state) loadBoard({ ...board, nodes: state.nodes, connections: state.connections });
        }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Board title */}
      <BoardTitleBar boardId={boardId} />

      {/* Drop zone indicator */}
      <DropZoneOverlay />
    </div>
  );
}

function DropZoneOverlay() {
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const handleDragEnter = () => setIsDragOver(true);
    const handleDragLeave = (e: DragEvent) => {
      if (e.relatedTarget === null) setIsDragOver(false);
    };
    const handleDrop = () => setIsDragOver(false);

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  if (!isDragOver) return null;

  return (
    <div className="absolute inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-4 border-2 border-dashed border-brand-accent/40 rounded-2xl bg-brand-accent/5 flex items-center justify-center">
        <div className="bg-cosmic-surface/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-brand-accent/30">
          <p className="text-sm text-brand-accent font-medium">Drop URL, file, or text here</p>
          <p className="text-[10px] text-text-muted mt-1">YouTube, images, code, articles, and more</p>
        </div>
      </div>
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
