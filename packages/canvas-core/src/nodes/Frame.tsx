'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

export function FrameNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingTitle]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsEditingTitle(false);
    if (e.key === 'Enter') setIsEditingTitle(false);
    e.stopPropagation();
  }, []);

  const frameColor = (node.metadata.color as string) || 'rgba(139, 92, 246, 0.15)';

  return (
    <div
      className="w-full h-full rounded-xl border-2 border-dashed transition-colors"
      style={{
        borderColor: isSelected ? 'rgb(127, 255, 212)' : 'rgba(139, 92, 246, 0.3)',
        backgroundColor: frameColor,
      }}
    >
      {/* Frame label */}
      <div className="absolute -top-7 left-2 flex items-center gap-2">
        {isEditingTitle ? (
          <input
            ref={inputRef}
            className="bg-cosmic-surface/80 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold text-text-primary outline-none border border-brand-accent"
            value={node.title}
            onChange={(e) => updateNode(node.id, { title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="Frame name"
          />
        ) : (
          <span
            className="bg-cosmic-surface/80 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold text-text-secondary cursor-text hover:text-text-primary transition-colors"
            onDoubleClick={() => setIsEditingTitle(true)}
          >
            {node.title || 'Frame'}
          </span>
        )}
      </div>
    </div>
  );
}
