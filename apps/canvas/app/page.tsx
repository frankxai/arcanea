'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface BoardPreview {
  id: string;
  title: string;
  updatedAt: string;
  nodeCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [boards, setBoards] = useState<BoardPreview[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('arcanea-boards-index');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const createBoard = useCallback(() => {
    const id = crypto.randomUUID();
    const newBoard: BoardPreview = {
      id,
      title: 'Untitled Board',
      updatedAt: new Date().toISOString(),
      nodeCount: 0,
    };
    const updated = [newBoard, ...boards];
    setBoards(updated);
    localStorage.setItem('arcanea-boards-index', JSON.stringify(updated));
    router.push(`/board/${id}`);
  }, [boards, router]);

  const deleteBoard = useCallback(
    (boardId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = boards.filter((b) => b.id !== boardId);
      setBoards(updated);
      localStorage.setItem('arcanea-boards-index', JSON.stringify(updated));
      localStorage.removeItem(`arcanea-board-${boardId}`);
    },
    [boards]
  );

  return (
    <div className="min-h-screen bg-cosmic-void">
      {/* Header */}
      <header className="border-b border-cosmic-border bg-cosmic-deep/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-semibold text-text-primary tracking-wide">
              Arcanea Canvas
            </h1>
            <p className="text-xs text-text-muted mt-0.5">Spatial Intelligence for Creators</p>
          </div>
          <button
            onClick={createBoard}
            className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-medium transition-colors"
          >
            + New Board
          </button>
        </div>
      </header>

      {/* Board Grid */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {boards.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 opacity-20">&#9672;</div>
            <h2 className="text-lg text-text-secondary mb-2">No boards yet</h2>
            <p className="text-sm text-text-muted mb-6">
              Create your first board to start building with spatial intelligence.
            </p>
            <button
              onClick={createBoard}
              className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-medium transition-colors"
            >
              Create Your First Board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {boards.map((board) => (
              <div
                key={board.id}
                onClick={() => router.push(`/board/${board.id}`)}
                className="group relative rounded-xl border border-cosmic-border bg-cosmic-surface hover:bg-cosmic-raised hover:border-brand-accent/30 transition-all cursor-pointer overflow-hidden"
              >
                {/* Preview area */}
                <div className="h-36 bg-cosmic-deep/50 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 opacity-30 p-4">
                    {Array.from({ length: Math.min(board.nodeCount, 6) || 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-6 rounded bg-brand-primary/30"
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {board.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {new Date(board.updatedAt).toLocaleDateString()} &middot; {board.nodeCount} objects
                  </p>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => deleteBoard(board.id, e)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-cosmic-void/60 text-text-muted hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-xs"
                  title="Delete board"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
