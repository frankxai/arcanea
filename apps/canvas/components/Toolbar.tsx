'use client';

import { useCallback, useState } from 'react';
import {
  useBoard,
  useCanvasViewport,
  type CanvasNodeType,
  type StickyColor,
} from '@arcanea/canvas-core';

const TOOL_GROUPS = [
  {
    label: 'Basic',
    tools: [
      { type: 'sticky-note' as CanvasNodeType, label: 'Note', shortcut: 'N' },
      { type: 'card' as CanvasNodeType, label: 'Card', shortcut: 'C' },
      { type: 'frame' as CanvasNodeType, label: 'Frame', shortcut: '' },
    ],
  },
  {
    label: 'Content',
    tools: [
      { type: 'markdown-doc' as CanvasNodeType, label: 'Document', shortcut: '' },
      { type: 'code-block' as CanvasNodeType, label: 'Code', shortcut: '' },
      { type: 'live-preview' as CanvasNodeType, label: 'Preview', shortcut: '' },
    ],
  },
  {
    label: 'Media',
    tools: [
      { type: 'media-embed' as CanvasNodeType, label: 'Media', shortcut: '' },
      { type: 'url-card' as CanvasNodeType, label: 'URL', shortcut: '' },
    ],
  },
];

const STICKY_COLOR_OPTIONS: { color: StickyColor; hex: string }[] = [
  { color: 'yellow', hex: '#f59e0b' },
  { color: 'blue', hex: '#3b82f6' },
  { color: 'green', hex: '#10b981' },
  { color: 'pink', hex: '#ec4899' },
  { color: 'purple', hex: '#8b5cf6' },
];

// SVG icon paths for each node type
const TOOL_ICONS: Record<string, string> = {
  'sticky-note': 'M4 4h16v16H4V4zm2 2v12h12V6H6z',
  'card': 'M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v3h14V5H5zm0 5v9h14v-9H5z',
  'frame': 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2z',
  'markdown-doc': 'M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h14V5H5zm3 3h8v1H8V8zm0 3h8v1H8v-1zm0 3h5v1H8v-1z',
  'code-block': 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  'live-preview': 'M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3v12h14V7H5zm1.5-2.5a.75.75 0 100-1.5.75.75 0 000 1.5zm2 0a.75.75 0 100-1.5.75.75 0 000 1.5zm2 0a.75.75 0 100-1.5.75.75 0 000 1.5z',
  'media-embed': 'M4 4h16v16H4V4zm8 4l5 4-5 4V8z',
  'url-card': 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
};

interface ToolbarProps {
  onStickyColorChange?: (color: StickyColor) => void;
  activeStickyColor?: StickyColor;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

export function Toolbar({
  onStickyColorChange,
  activeStickyColor = 'yellow',
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
}: ToolbarProps) {
  const { addNode, board } = useBoard();
  const { viewport, zoomTo, resetViewport } = useCanvasViewport();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const handleAddNode = useCallback(
    (type: CanvasNodeType) => {
      const centerX = (-viewport.x + window.innerWidth / 2) / viewport.zoom;
      const centerY = (-viewport.y + window.innerHeight / 2) / viewport.zoom;

      const overrides: Record<string, unknown> = {};
      if (type === 'sticky-note') {
        overrides.metadata = { color: activeStickyColor };
      }
      if (type === 'code-block') {
        overrides.metadata = { language: 'typescript' };
      }

      addNode(type, { x: centerX, y: centerY }, overrides as never);
      setExpandedGroup(null);
    },
    [addNode, viewport, activeStickyColor]
  );

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-xl glass px-2 py-1.5 shadow-lg border border-cosmic-border/30">
      {/* Undo/Redo */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
          canUndo ? 'text-text-secondary hover:text-text-primary hover:bg-cosmic-raised/60' : 'text-text-muted/30 cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h13a4 4 0 010 8H9" />
          <path d="M3 10l4-4M3 10l4 4" />
        </svg>
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
          canRedo ? 'text-text-secondary hover:text-text-primary hover:bg-cosmic-raised/60' : 'text-text-muted/30 cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Shift+Z)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10H8a4 4 0 000 8h6" />
          <path d="M21 10l-4-4M21 10l-4 4" />
        </svg>
      </button>

      <div className="w-px h-6 bg-cosmic-border mx-1" />

      {/* Tool groups */}
      {TOOL_GROUPS.map((group) => (
        <div key={group.label} className="relative">
          <div className="flex items-center gap-0.5">
            {group.tools.map((tool) => (
              <button
                key={tool.type}
                onClick={() => handleAddNode(tool.type)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-cosmic-raised/60 transition-colors"
                title={`${tool.label}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={TOOL_ICONS[tool.type] || TOOL_ICONS['card']} />
                </svg>
                <span className="hidden sm:inline">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="w-px h-6 bg-cosmic-border mx-1" />

      {/* Sticky note colors */}
      <div className="flex items-center gap-1 px-1">
        {STICKY_COLOR_OPTIONS.map((opt) => (
          <button
            key={opt.color}
            onClick={() => onStickyColorChange?.(opt.color)}
            className={`w-4 h-4 rounded-full border transition-transform ${
              activeStickyColor === opt.color
                ? 'border-white scale-125'
                : 'border-transparent hover:scale-110'
            }`}
            style={{ backgroundColor: opt.hex }}
            title={opt.color}
          />
        ))}
      </div>

      <div className="w-px h-6 bg-cosmic-border mx-1" />

      {/* Zoom controls */}
      <button
        onClick={() => zoomTo(viewport.zoom * 0.8)}
        className="px-2 py-1 rounded text-xs text-text-muted hover:text-text-primary transition-colors"
        title="Zoom out"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35M8 11h6" />
        </svg>
      </button>
      <button
        onClick={resetViewport}
        className="px-2 py-1 rounded text-xs text-text-muted hover:text-text-primary transition-colors min-w-[3rem] text-center"
        title="Reset zoom"
      >
        {Math.round(viewport.zoom * 100)}%
      </button>
      <button
        onClick={() => zoomTo(viewport.zoom * 1.25)}
        className="px-2 py-1 rounded text-xs text-text-muted hover:text-text-primary transition-colors"
        title="Zoom in"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
        </svg>
      </button>

      {/* Node count badge */}
      <div className="hidden sm:block w-px h-6 bg-cosmic-border mx-1" />
      <span className="hidden sm:inline text-[10px] text-text-muted/50 px-1">
        {board.nodes.length} nodes
      </span>
    </div>
  );
}
