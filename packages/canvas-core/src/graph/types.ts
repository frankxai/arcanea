/**
 * Arcanea Canvas - Domain Types
 *
 * Every visual node on the canvas has both visual properties (position, size)
 * and semantic metadata (title, tags, relations, provenance).
 */

// ─── Node Types ────────────��────────────────────────────────

export type CanvasNodeType =
  | 'sticky-note'
  | 'card'
  | 'frame'
  | 'markdown-doc'
  | 'code-block'
  | 'media-embed'
  | 'url-card'
  | 'live-preview'
  | 'mind-map'
  | 'infographic'
  | 'workflow-block'
  | 'ui-preview';

// ─── Core Interfaces ─────────────��──────────────────────────

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface CanvasNode {
  id: string;
  type: CanvasNodeType;
  position: Position;
  size: Size;

  // Semantic metadata
  title: string;
  description?: string;
  content?: string;
  tags: string[];

  // Relations
  parentId?: string;

  // Provenance
  createdBy: 'human' | 'agent';
  agentId?: string;
  sourceUrl?: string;

  // Extensible
  metadata: Record<string, unknown>;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ─── Connection ──────────���──────────────────────────────────

export type ConnectionType = 'arrow' | 'line' | 'dashed';

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  type: ConnectionType;
  label?: string;
}

// ─── Board ─────────────────────────��──────────────────────���─

export interface Board {
  id: string;
  title: string;
  description?: string;
  userId: string;
  nodes: CanvasNode[];
  connections: Connection[];
  viewport: Viewport;
  createdAt: string;
  updatedAt: string;
}

// ─── State Actions ──────────────────────────────────────────

export type BoardAction =
  | { type: 'ADD_NODE'; node: CanvasNode }
  | { type: 'REMOVE_NODE'; nodeId: string }
  | { type: 'UPDATE_NODE'; nodeId: string; updates: Partial<CanvasNode> }
  | { type: 'MOVE_NODE'; nodeId: string; position: Position }
  | { type: 'RESIZE_NODE'; nodeId: string; size: Size }
  | { type: 'ADD_CONNECTION'; connection: Connection }
  | { type: 'REMOVE_CONNECTION'; connectionId: string }
  | { type: 'SET_VIEWPORT'; viewport: Viewport }
  | { type: 'LOAD_BOARD'; board: Board }
  | { type: 'CLEAR_BOARD' };

// ─── Node Defaults ──────────────���───────────────────────────

export const NODE_DEFAULTS: Record<CanvasNodeType, { width: number; height: number }> = {
  'sticky-note': { width: 200, height: 200 },
  'card': { width: 280, height: 180 },
  'frame': { width: 600, height: 400 },
  'markdown-doc': { width: 400, height: 300 },
  'code-block': { width: 400, height: 250 },
  'media-embed': { width: 480, height: 320 },
  'url-card': { width: 320, height: 200 },
  'live-preview': { width: 640, height: 480 },
  'mind-map': { width: 600, height: 400 },
  'infographic': { width: 500, height: 400 },
  'workflow-block': { width: 300, height: 200 },
  'ui-preview': { width: 640, height: 480 },
};

// ─── Sticky Note Colors ─────────────────────────────────────

export const STICKY_COLORS = {
  yellow: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  blue: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  green: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  pink: { bg: '#fce7f3', border: '#ec4899', text: '#9d174d' },
  purple: { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
} as const;

export type StickyColor = keyof typeof STICKY_COLORS;

// ─── Utility ────────────────────────────────────────────────

export function createNode(
  type: CanvasNodeType,
  position: Position,
  overrides?: Partial<CanvasNode>
): CanvasNode {
  const defaults = NODE_DEFAULTS[type];
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    type,
    position,
    size: { width: defaults.width, height: defaults.height },
    title: '',
    tags: [],
    createdBy: 'human',
    metadata: {},
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function createConnection(
  sourceId: string,
  targetId: string,
  type: ConnectionType = 'arrow',
  label?: string
): Connection {
  return {
    id: crypto.randomUUID(),
    sourceId,
    targetId,
    type,
    label,
  };
}
