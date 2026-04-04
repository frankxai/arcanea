'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type Dispatch,
  type ReactNode,
} from 'react';
import {
  type Board,
  type BoardAction,
  type CanvasNode,
  type CanvasNodeType,
  type Connection,
  type ConnectionType,
  type Position,
  type Size,
  type Viewport,
  createNode,
  createConnection,
} from './types';

// ─── Reducer ────────────────────────────────────────────────

function boardReducer(state: Board, action: BoardAction): Board {
  const now = new Date().toISOString();

  switch (action.type) {
    case 'ADD_NODE':
      return { ...state, nodes: [...state.nodes, action.node], updatedAt: now };

    case 'REMOVE_NODE': {
      const nodes = state.nodes.filter((n) => n.id !== action.nodeId);
      const connections = state.connections.filter(
        (c) => c.sourceId !== action.nodeId && c.targetId !== action.nodeId
      );
      return { ...state, nodes, connections, updatedAt: now };
    }

    case 'UPDATE_NODE':
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.nodeId ? { ...n, ...action.updates, updatedAt: now } : n
        ),
        updatedAt: now,
      };

    case 'MOVE_NODE':
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.nodeId ? { ...n, position: action.position, updatedAt: now } : n
        ),
        updatedAt: now,
      };

    case 'RESIZE_NODE':
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.nodeId ? { ...n, size: action.size, updatedAt: now } : n
        ),
        updatedAt: now,
      };

    case 'ADD_CONNECTION':
      return {
        ...state,
        connections: [...state.connections, action.connection],
        updatedAt: now,
      };

    case 'REMOVE_CONNECTION':
      return {
        ...state,
        connections: state.connections.filter((c) => c.id !== action.connectionId),
        updatedAt: now,
      };

    case 'SET_VIEWPORT':
      return { ...state, viewport: action.viewport };

    case 'LOAD_BOARD':
      return action.board;

    case 'CLEAR_BOARD':
      return createEmptyBoard(state.id, state.userId);

    default:
      return state;
  }
}

// ─── Empty Board Factory ────────────────────────────────────

export function createEmptyBoard(id?: string, userId?: string): Board {
  const now = new Date().toISOString();
  return {
    id: id ?? crypto.randomUUID(),
    title: 'Untitled Board',
    userId: userId ?? '',
    nodes: [],
    connections: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    createdAt: now,
    updatedAt: now,
  };
}

// ─── Context ────────────────────────────────────────────────

interface BoardContextValue {
  board: Board;
  dispatch: Dispatch<BoardAction>;
  // Convenience helpers
  addNode: (type: CanvasNodeType, position: Position, overrides?: Partial<CanvasNode>) => CanvasNode;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<CanvasNode>) => void;
  moveNode: (nodeId: string, position: Position) => void;
  resizeNode: (nodeId: string, size: Size) => void;
  addConnection: (sourceId: string, targetId: string, type?: ConnectionType, label?: string) => Connection;
  removeConnection: (connectionId: string) => void;
  setViewport: (viewport: Viewport) => void;
  loadBoard: (board: Board) => void;
  selectedNodeIds: string[];
  setSelectedNodeIds: (ids: string[]) => void;
}

const BoardContext = createContext<BoardContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────────

interface BoardProviderProps {
  initialBoard?: Board;
  children: ReactNode;
}

export function BoardProvider({ initialBoard, children }: BoardProviderProps) {
  const [board, dispatch] = useReducer(boardReducer, initialBoard ?? createEmptyBoard());
  const [selectedNodeIds, setSelectedNodeIds] = useReducer(
    (_: string[], action: string[]) => action,
    []
  );

  const addNode = useCallback(
    (type: CanvasNodeType, position: Position, overrides?: Partial<CanvasNode>) => {
      const node = createNode(type, position, overrides);
      dispatch({ type: 'ADD_NODE', node });
      return node;
    },
    []
  );

  const removeNode = useCallback((nodeId: string) => {
    dispatch({ type: 'REMOVE_NODE', nodeId });
  }, []);

  const updateNode = useCallback((nodeId: string, updates: Partial<CanvasNode>) => {
    dispatch({ type: 'UPDATE_NODE', nodeId, updates });
  }, []);

  const moveNode = useCallback((nodeId: string, position: Position) => {
    dispatch({ type: 'MOVE_NODE', nodeId, position });
  }, []);

  const resizeNode = useCallback((nodeId: string, size: Size) => {
    dispatch({ type: 'RESIZE_NODE', nodeId, size });
  }, []);

  const addConnection = useCallback(
    (sourceId: string, targetId: string, type?: ConnectionType, label?: string) => {
      const connection = createConnection(sourceId, targetId, type, label);
      dispatch({ type: 'ADD_CONNECTION', connection });
      return connection;
    },
    []
  );

  const removeConnection = useCallback((connectionId: string) => {
    dispatch({ type: 'REMOVE_CONNECTION', connectionId });
  }, []);

  const setViewport = useCallback((viewport: Viewport) => {
    dispatch({ type: 'SET_VIEWPORT', viewport });
  }, []);

  const loadBoard = useCallback((newBoard: Board) => {
    dispatch({ type: 'LOAD_BOARD', board: newBoard });
  }, []);

  const value: BoardContextValue = {
    board,
    dispatch,
    addNode,
    removeNode,
    updateNode,
    moveNode,
    resizeNode,
    addConnection,
    removeConnection,
    setViewport,
    loadBoard,
    selectedNodeIds,
    setSelectedNodeIds,
  };

  return <BoardContext value={value}>{children}</BoardContext>;
}

// ─── Hook ───────────────────────────────────────────────────

export function useBoard(): BoardContextValue {
  const ctx = useContext(BoardContext);
  if (!ctx) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return ctx;
}
