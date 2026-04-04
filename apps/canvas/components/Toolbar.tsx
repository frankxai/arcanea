'use client';

import { useCallback } from 'react';
import {
  useBoard,
  useCanvasViewport,
  type CanvasNodeType,
  type StickyColor,
} from '@arcanea/canvas-core';

const TOOLS: { type: CanvasNodeType; label: string; icon: string }[] = [
  { type: 'sticky-note', label: 'Sticky Note', icon: '&#9634;' },
  { type: 'card', label: 'Card', icon: '&#9645;' },
  { type: 'frame', label: 'Frame', icon: '&#9633;' },
];

const STICKY_COLOR_OPTIONS: { color: StickyColor; label: string; hex: string }[] = [
  { color: 'yellow', label: 'Yellow', hex: '#f59e0b' },
  { color: 'blue', label: 'Blue', hex: '#3b82f6' },
  { color: 'green', label: 'Green', hex: '#10b981' },
  { color: 'pink', label: 'Pink', hex: '#ec4899' },
  { color: 'purple', label: 'Purple', hex: '#8b5cf6' },
];

interface ToolbarProps {
  onStickyColorChange?: (color: StickyColor) => void;
  activeStickyColor?: StickyColor;
}

export function Toolbar({ onStickyColorChange, activeStickyColor = 'yellow' }: ToolbarProps) {
  const { addNode, board } = useBoard();
  const { viewport, zoomTo, resetViewport } = useCanvasViewport();

  const handleAddNode = useCallback(
    (type: CanvasNodeType) => {
      // Place in center of current viewport
      const centerX = (-viewport.x + 500) / viewport.zoom;
      const centerY = (-viewport.y + 300) / viewport.zoom;

      const overrides: Partial<Record<string, unknown>> = {};
      if (type === 'sticky-note') {
        (overrides as Record<string, unknown>).metadata = { color: activeStickyColor };
      }

      addNode(type, { x: centerX, y: centerY }, overrides as never);
    },
    [addNode, viewport, activeStickyColor]
  );

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-xl glass px-2 py-1.5 shadow-lg">
      {/* Node tools */}
      {TOOLS.map((tool) => (
        <button
          key={tool.type}
          onClick={() => handleAddNode(tool.type)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-cosmic-raised/60 transition-colors"
          title={tool.label}
        >
          <span dangerouslySetInnerHTML={{ __html: tool.icon }} className="text-sm" />
          <span>{tool.label}</span>
        </button>
      ))}

      {/* Separator */}
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
            title={opt.label}
          />
        ))}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-cosmic-border mx-1" />

      {/* Zoom controls */}
      <button
        onClick={() => zoomTo(viewport.zoom * 0.8)}
        className="px-2 py-1 rounded text-xs text-text-muted hover:text-text-primary transition-colors"
        title="Zoom out"
      >
        -
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
        +
      </button>
    </div>
  );
}
