'use client';

import { useRef, useCallback, useState, type ReactNode, type MouseEvent } from 'react';
import type { CanvasNode, Position, Size } from '../graph/types';

interface CanvasNodeWrapperProps {
  node: CanvasNode;
  isSelected: boolean;
  onSelect: (nodeId: string, multi: boolean) => void;
  onMove: (nodeId: string, position: Position) => void;
  onResize: (nodeId: string, size: Size) => void;
  zoom: number;
  children: ReactNode;
}

export function CanvasNodeWrapper({
  node,
  isSelected,
  onSelect,
  onMove,
  onResize,
  zoom,
  children,
}: CanvasNodeWrapperProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef<{ x: number; y: number; nodeX: number; nodeY: number } | null>(null);
  const resizeStart = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).dataset.resizeHandle) return;
      e.stopPropagation();
      onSelect(node.id, e.shiftKey || e.metaKey);

      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        nodeX: node.position.x,
        nodeY: node.position.y,
      };

      const handleMove = (me: globalThis.MouseEvent) => {
        if (!dragStart.current) return;
        const dx = (me.clientX - dragStart.current.x) / zoom;
        const dy = (me.clientY - dragStart.current.y) / zoom;
        onMove(node.id, {
          x: dragStart.current.nodeX + dx,
          y: dragStart.current.nodeY + dy,
        });
      };

      const handleUp = () => {
        setIsDragging(false);
        dragStart.current = null;
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    },
    [node.id, node.position, onSelect, onMove, zoom]
  );

  const handleResizeMouseDown = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setIsResizing(true);
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        w: node.size.width,
        h: node.size.height,
      };

      const handleMove = (me: globalThis.MouseEvent) => {
        if (!resizeStart.current) return;
        const dx = (me.clientX - resizeStart.current.x) / zoom;
        const dy = (me.clientY - resizeStart.current.y) / zoom;
        onResize(node.id, {
          width: Math.max(100, resizeStart.current.w + dx),
          height: Math.max(60, resizeStart.current.h + dy),
        });
      };

      const handleUp = () => {
        setIsResizing(false);
        resizeStart.current = null;
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    },
    [node.id, node.size, onResize, zoom]
  );

  return (
    <div
      className={`absolute group ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: node.size.width,
        height: node.size.height,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Selection ring */}
      {isSelected && (
        <div className="absolute -inset-1 rounded-lg border-2 border-brand-accent pointer-events-none" />
      )}

      {/* Node content */}
      <div className="w-full h-full overflow-hidden rounded-lg">{children}</div>

      {/* Resize handle (bottom-right) */}
      <div
        data-resize-handle="true"
        className="absolute -bottom-1 -right-1 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={handleResizeMouseDown}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-text-secondary">
          <path d="M14 14L8 14L14 8Z" fill="currentColor" opacity="0.5" />
          <path d="M14 14L11 14L14 11Z" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
