'use client';

import { useCallback, useRef } from 'react';
import { useBoard } from '../graph/BoardState';
import type { Viewport } from '../graph/types';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;
const ZOOM_SENSITIVITY = 0.001;

export function useCanvasViewport() {
  const { board, setViewport } = useBoard();
  const { viewport } = board;
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const v = viewportRef.current;

      if (e.ctrlKey || e.metaKey) {
        // Pinch-zoom (or Ctrl+scroll)
        const delta = -e.deltaY * ZOOM_SENSITIVITY;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * (1 + delta)));
        const ratio = newZoom / v.zoom;

        // Zoom toward cursor position
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;

        setViewport({
          x: cursorX - (cursorX - v.x) * ratio,
          y: cursorY - (cursorY - v.y) * ratio,
          zoom: newZoom,
        });
      } else {
        // Pan
        setViewport({
          x: v.x - e.deltaX,
          y: v.y - e.deltaY,
          zoom: v.zoom,
        });
      }
    },
    [setViewport]
  );

  const handlePanStart = useCallback(() => {
    return { startX: viewportRef.current.x, startY: viewportRef.current.y };
  }, []);

  const handlePan = useCallback(
    (dx: number, dy: number, initial: { startX: number; startY: number }) => {
      setViewport({
        x: initial.startX + dx,
        y: initial.startY + dy,
        zoom: viewportRef.current.zoom,
      });
    },
    [setViewport]
  );

  const zoomTo = useCallback(
    (zoom: number, center?: { x: number; y: number }) => {
      const v = viewportRef.current;
      const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

      if (center) {
        const ratio = clampedZoom / v.zoom;
        setViewport({
          x: center.x - (center.x - v.x) * ratio,
          y: center.y - (center.y - v.y) * ratio,
          zoom: clampedZoom,
        });
      } else {
        setViewport({ ...v, zoom: clampedZoom });
      }
    },
    [setViewport]
  );

  const resetViewport = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 });
  }, [setViewport]);

  return {
    viewport,
    handleWheel,
    handlePanStart,
    handlePan,
    zoomTo,
    resetViewport,
  };
}
