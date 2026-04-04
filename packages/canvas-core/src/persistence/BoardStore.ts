/**
 * BoardStore - Persistence layer for canvas boards
 *
 * Currently implements localStorage persistence.
 * Supabase persistence will be added when auth is wired up.
 */

import type { Board } from '../graph/types';
import { createEmptyBoard } from '../graph/BoardState';

const BOARD_PREFIX = 'arcanea-board-';
const INDEX_KEY = 'arcanea-boards-index';

interface BoardIndex {
  id: string;
  title: string;
  updatedAt: string;
  nodeCount: number;
}

// ─── Local Storage Implementation ───────────────────────────

export const LocalBoardStore = {
  async getBoard(id: string): Promise<Board | null> {
    try {
      const stored = localStorage.getItem(`${BOARD_PREFIX}${id}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async saveBoard(board: Board): Promise<void> {
    localStorage.setItem(`${BOARD_PREFIX}${board.id}`, JSON.stringify(board));
    this.updateIndex(board);
  },

  async deleteBoard(id: string): Promise<void> {
    localStorage.removeItem(`${BOARD_PREFIX}${id}`);
    const index = this.getIndex().filter((b) => b.id !== id);
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
  },

  async listBoards(): Promise<BoardIndex[]> {
    return this.getIndex();
  },

  async createBoard(title?: string): Promise<Board> {
    const board = createEmptyBoard();
    if (title) board.title = title;
    await this.saveBoard(board);
    return board;
  },

  // Internal helpers
  getIndex(): BoardIndex[] {
    try {
      const stored = localStorage.getItem(INDEX_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  updateIndex(board: Board): void {
    const index = this.getIndex();
    const existing = index.findIndex((b) => b.id === board.id);
    const entry: BoardIndex = {
      id: board.id,
      title: board.title,
      updatedAt: board.updatedAt,
      nodeCount: board.nodes.length,
    };

    if (existing >= 0) {
      index[existing] = entry;
    } else {
      index.unshift(entry);
    }

    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
  },
};
