'use client';

import { useRef, useCallback, useState, type ReactNode, type MouseEvent } from 'react';
import { useBoard } from '../graph/BoardState';
import { useCanvasViewport } from './CanvasViewport';
import { CanvasNodeWrapper } from './CanvasNode';
import { ConnectorLayer } from './ConnectorLayer';
import { NodeRegistry, type NodeRendererProps } from '../nodes/NodeRegistry';

interface InfiniteCanvasProps {
  className?: string;
  children?: ReactNode;
  registry: NodeRegistry;
  onCanvasClick?: (position: { x: number; y: number }) => void;
}

export function InfiniteCanvas({ className, children, registry, onCanvasClick }: InfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { board, moveNode, resizeNode, selectedNodeIds, setSelectedNodeIds } = useBoard();
  const { viewport, handleWheel } = useCanvasViewport();

  // Pan state
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const { setViewport } = useBoard();

  // Convert screen coordinates to canvas coordinates
  const screenToCanvas = useCallback(
    (screenX: number, screenY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: (screenX - rect.left - viewport.x) / viewport.zoom,
        y: (screenY - rect.top - viewport.y) / viewport.zoom,
      };
    },
    [viewport]
  );

  // Canvas background click (deselect + create)
  const handleCanvasMouseDown = useCallback(
    (e: MouseEvent) => {
      // Only handle direct clicks on the canvas background
      if (e.target !== e.currentTarget && !(e.target as HTMLElement).dataset.canvasBackground) return;

      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        // Middle click or Alt+click = pan
        setIsPanning(true);
        panStart.current = {
          x: e.clientX,
          y: e.clientY,
          vx: viewport.x,
          vy: viewport.y,
        };
        e.preventDefault();
        return;
      }

      if (e.button === 0) {
        // Left click on background = deselect
        setSelectedNodeIds([]);
        if (onCanvasClick) {
          const pos = screenToCanvas(e.clientX, e.clientY);
          onCanvasClick(pos);
        }
      }
    },
    [viewport, screenToCanvas, setSelectedNodeIds, onCanvasClick, setViewport]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isPanning && panStart.current) {
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        setViewport({
          x: panStart.current.vx + dx,
          y: panStart.current.vy + dy,
          zoom: viewport.zoom,
        });
      }
    },
    [isPanning, setViewport, viewport.zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    panStart.current = null;
  }, []);

  const handleNodeSelect = useCallback(
    (nodeId: string, multi: boolean) => {
      if (multi) {
        setSelectedNodeIds(
          selectedNodeIds.includes(nodeId)
            ? selectedNodeIds.filter((id) => id !== nodeId)
            : [...selectedNodeIds, nodeId]
        );
      } else {
        setSelectedNodeIds([nodeId]);
      }
    },
    [selectedNodeIds, setSelectedNodeIds]
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className ?? ''}`}
      style={{ cursor: isPanning ? 'grabbing' : 'default' }}
      onWheel={handleWheel}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid background */}
      <div
        data-canvas-background="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.15) 1px, transparent 1px)`,
          backgroundSize: `${24 * viewport.zoom}px ${24 * viewport.zoom}px`,
          backgroundPosition: `${viewport.x}px ${viewport.y}px`,
        }}
      />

      {/* Transformed content layer */}
      <div
        className="absolute origin-top-left"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          willChange: 'transform',
        }}
      >
        {/* SVG connector layer */}
        <ConnectorLayer />

        {/* Canvas nodes */}
        {board.nodes.map((node) => {
          const Renderer = registry.get(node.type);
          if (!Renderer) return null;

          return (
            <CanvasNodeWrapper
              key={node.id}
              node={node}
              isSelected={selectedNodeIds.includes(node.id)}
              onSelect={handleNodeSelect}
              onMove={moveNode}
              onResize={resizeNode}
              zoom={viewport.zoom}
            >
              <Renderer node={node} isSelected={selectedNodeIds.includes(node.id)} />
            </CanvasNodeWrapper>
          );
        })}
      </div>

      {/* HUD overlay (zoom level, etc.) */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-cosmic-surface/80 px-3 py-1.5 text-xs text-text-secondary backdrop-blur-sm border border-cosmic-border">
        {Math.round(viewport.zoom * 100)}%
      </div>

      {/* Extra children (toolbar overlays, etc.) */}
      {children}
    </div>
  );
}
