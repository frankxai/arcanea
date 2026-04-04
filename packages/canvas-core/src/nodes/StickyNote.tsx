'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { STICKY_COLORS, type StickyColor } from '../graph/types';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

export function StickyNoteNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const color = (node.metadata.color as StickyColor) || 'yellow';
  const colors = STICKY_COLORS[color];

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNode(node.id, { content: e.target.value, title: e.target.value.slice(0, 50) });
    },
    [node.id, updateNode]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
      }
      // Prevent canvas shortcuts while editing
      e.stopPropagation();
    },
    []
  );

  return (
    <div
      className="w-full h-full flex flex-col p-3 shadow-md transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
        color: colors.text,
      }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="w-full h-full resize-none bg-transparent outline-none text-sm leading-relaxed"
          style={{ color: colors.text }}
          value={node.content || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Type something..."
        />
      ) : (
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
          {node.content || (
            <span className="opacity-50 italic">Double-click to edit</span>
          )}
        </p>
      )}
    </div>
  );
}
