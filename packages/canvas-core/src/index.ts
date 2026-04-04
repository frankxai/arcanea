/**
 * @arcanea/canvas-core
 *
 * DOM-based infinite canvas engine with semantic graph for Arcanea Canvas.
 * Every canvas object is a React component with semantic metadata.
 */

// Engine
export { InfiniteCanvas } from './engine/InfiniteCanvas';
export { CanvasNodeWrapper } from './engine/CanvasNode';
export { ConnectorLayer } from './engine/ConnectorLayer';
export { useCanvasViewport } from './engine/CanvasViewport';
export { useUndoManager } from './engine/UndoManager';
export { useDropHandler, detectUrlNodeType } from './engine/DropHandler';

// Graph / State
export { BoardProvider, useBoard, createEmptyBoard } from './graph/BoardState';
export {
  type Board,
  type BoardAction,
  type CanvasNode,
  type CanvasNodeType,
  type Connection,
  type ConnectionType,
  type Position,
  type Size,
  type Viewport,
  type StickyColor,
  NODE_DEFAULTS,
  STICKY_COLORS,
  createNode,
  createConnection,
} from './graph/types';

// Nodes - Phase 1
export { StickyNoteNode } from './nodes/StickyNote';
export { CardNode } from './nodes/Card';
export { FrameNode } from './nodes/Frame';

// Nodes - Phase 2
export { MarkdownDocNode } from './nodes/MarkdownDoc';
export { CodeBlockNode } from './nodes/CodeBlock';
export { MediaEmbedNode } from './nodes/MediaEmbed';
export { URLCardNode } from './nodes/URLCard';
export { LivePreviewNode } from './nodes/LivePreview';

// Node Registry
export { NodeRegistry, type NodeRendererProps } from './nodes/NodeRegistry';

// Persistence
export { LocalBoardStore } from './persistence/BoardStore';
export { useAutoSave } from './persistence/AutoSave';
