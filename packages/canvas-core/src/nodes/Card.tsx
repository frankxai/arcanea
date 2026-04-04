'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

export function CardNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [editingField, setEditingField] = useState<'title' | 'content' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingField === 'title' && inputRef.current) {
      inputRef.current.focus();
    }
    if (editingField === 'content' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingField]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setEditingField(null);
    e.stopPropagation();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-cosmic-surface border border-cosmic-border rounded-lg overflow-hidden hover:border-brand-accent/40 transition-colors">
      {/* Header */}
      <div className="px-4 py-3 border-b border-cosmic-border/50 bg-cosmic-raised/50">
        {editingField === 'title' ? (
          <input
            ref={inputRef}
            className="w-full bg-transparent outline-none text-sm font-semibold text-text-primary"
            value={node.title}
            onChange={(e) => updateNode(node.id, { title: e.target.value })}
            onBlur={() => setEditingField(null)}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="Card title"
          />
        ) : (
          <h3
            className="text-sm font-semibold text-text-primary truncate cursor-text"
            onDoubleClick={() => setEditingField('title')}
          >
            {node.title || (
              <span className="opacity-50 italic font-normal">Untitled card</span>
            )}
          </h3>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3 overflow-hidden">
        {editingField === 'content' ? (
          <textarea
            ref={textareaRef}
            className="w-full h-full resize-none bg-transparent outline-none text-xs text-text-secondary leading-relaxed"
            value={node.content || ''}
            onChange={(e) =>
              updateNode(node.id, { content: e.target.value, description: e.target.value.slice(0, 100) })
            }
            onBlur={() => setEditingField(null)}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="Add description..."
          />
        ) : (
          <p
            className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap break-words overflow-hidden cursor-text"
            onDoubleClick={() => setEditingField('content')}
          >
            {node.content || (
              <span className="opacity-40 italic">Double-click to add content</span>
            )}
          </p>
        )}
      </div>

      {/* Tags */}
      {node.tags.length > 0 && (
        <div className="px-4 py-2 border-t border-cosmic-border/30 flex flex-wrap gap-1">
          {node.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Provenance indicator */}
      {node.createdBy === 'agent' && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-accent" title="AI generated" />
      )}
    </div>
  );
}
