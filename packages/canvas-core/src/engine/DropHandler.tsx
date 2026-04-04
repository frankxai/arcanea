'use client';

import { useCallback, useRef } from 'react';
import type { CanvasNodeType, Position } from '../graph/types';

interface DropResult {
  type: CanvasNodeType;
  position: Position;
  data: {
    sourceUrl?: string;
    title?: string;
    content?: string;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Detects URL type and maps to appropriate canvas node type.
 */
export function detectUrlNodeType(url: string): {
  nodeType: CanvasNodeType;
  mediaType?: string;
} {
  const lower = url.toLowerCase();

  // YouTube
  if (lower.match(/(?:youtube\.com\/(?:watch|embed|shorts)|youtu\.be\/)/)) {
    return { nodeType: 'media-embed', mediaType: 'youtube' };
  }

  // Image URLs
  if (lower.match(/\.(jpg|jpeg|png|gif|webp|svg|avif|bmp)(\?.*)?$/)) {
    return { nodeType: 'media-embed', mediaType: 'image' };
  }

  // Video URLs
  if (lower.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/)) {
    return { nodeType: 'media-embed', mediaType: 'video' };
  }

  // Audio URLs
  if (lower.match(/\.(mp3|wav|ogg|flac|aac)(\?.*)?$/)) {
    return { nodeType: 'media-embed', mediaType: 'audio' };
  }

  // GitHub URLs
  if (lower.includes('github.com')) {
    // Raw file content
    if (lower.includes('/blob/') || lower.includes('raw.githubusercontent.com')) {
      return { nodeType: 'code-block' };
    }
    return { nodeType: 'url-card' };
  }

  // Default: URL card with metadata extraction
  return { nodeType: 'url-card' };
}

/**
 * Hook for handling drag-and-drop of URLs and files onto the canvas.
 */
export function useDropHandler(
  containerRef: React.RefObject<HTMLDivElement | null>,
  viewport: { x: number; y: number; zoom: number },
  onDrop: (result: DropResult) => void
) {
  const isDragOverRef = useRef(false);

  const screenToCanvas = useCallback(
    (clientX: number, clientY: number): Position => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: (clientX - rect.left - viewport.x) / viewport.zoom,
        y: (clientY - rect.top - viewport.y) / viewport.zoom,
      };
    },
    [containerRef, viewport]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    isDragOverRef.current = true;
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    isDragOverRef.current = false;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDragOverRef.current = false;

      const position = screenToCanvas(e.clientX, e.clientY);

      // Handle text/URL drops
      const text = e.dataTransfer.getData('text/plain');
      const uri = e.dataTransfer.getData('text/uri-list');
      const url = uri || text;

      if (url && isValidUrl(url)) {
        const { nodeType, mediaType } = detectUrlNodeType(url);
        onDrop({
          type: nodeType,
          position,
          data: {
            sourceUrl: url,
            title: '',
            metadata: mediaType ? { mediaType } : {},
          },
        });
        return;
      }

      // Handle file drops
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFiles(files, position, onDrop);
        return;
      }

      // Handle plain text as sticky note
      if (text && !isValidUrl(text)) {
        onDrop({
          type: 'sticky-note',
          position,
          data: {
            content: text,
            title: text.slice(0, 50),
          },
        });
      }
    },
    [screenToCanvas, onDrop]
  );

  return {
    dropHandlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
    isDragging: isDragOverRef,
  };
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function handleFiles(
  files: File[],
  position: Position,
  onDrop: (result: DropResult) => void
) {
  let offsetY = 0;

  for (const file of files) {
    const filePosition = { x: position.x, y: position.y + offsetY };

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onDrop({
        type: 'media-embed',
        position: filePosition,
        data: {
          sourceUrl: url,
          title: file.name,
          metadata: { mediaType: 'image', fileName: file.name },
        },
      });
    } else if (file.type.startsWith('text/') || file.name.match(/\.(ts|tsx|js|jsx|py|rs|go|json|yaml|yml|md|css|html|sql)$/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const ext = file.name.split('.').pop() || 'text';
        const langMap: Record<string, string> = {
          ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
          py: 'python', rs: 'rust', go: 'go', json: 'json', yaml: 'yaml', yml: 'yaml',
          md: 'markdown', css: 'css', html: 'html', sql: 'sql',
        };

        if (file.name.endsWith('.md')) {
          onDrop({
            type: 'markdown-doc',
            position: filePosition,
            data: { content, title: file.name },
          });
        } else {
          onDrop({
            type: 'code-block',
            position: filePosition,
            data: {
              content,
              title: file.name,
              metadata: { language: langMap[ext] || 'text', fileName: file.name },
            },
          });
        }
      };
      reader.readAsText(file);
    }

    offsetY += 220;
  }
}
