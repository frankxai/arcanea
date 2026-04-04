'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

/**
 * MarkdownDoc node - renders markdown content with live preview.
 * Double-click to edit raw markdown, click away to preview rendered output.
 * Uses basic markdown rendering (bold, italic, headers, lists, code, links).
 */
export function MarkdownDocNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNode(node.id, {
        content: e.target.value,
        title: e.target.value.split('\n')[0]?.replace(/^#+\s*/, '').slice(0, 60) || 'Document',
      });
    },
    [node.id, updateNode]
  );

  return (
    <div className="w-full h-full flex flex-col bg-cosmic-surface border border-cosmic-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cosmic-border/50 bg-cosmic-raised/30">
        <div className="flex items-center gap-2">
          <span className="text-brand-accent text-xs">&#9998;</span>
          <span className="text-xs font-medium text-text-secondary truncate max-w-[200px]">
            {node.title || 'Markdown Document'}
          </span>
        </div>
        <button
          className={`text-[10px] px-2 py-0.5 rounded ${
            isEditing
              ? 'bg-brand-accent/20 text-brand-accent'
              : 'bg-cosmic-raised text-text-muted hover:text-text-primary'
          } transition-colors`}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="w-full h-full resize-none bg-transparent outline-none text-xs text-text-primary leading-relaxed font-mono"
            value={node.content || ''}
            onChange={handleChange}
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="# Write markdown here\n\nSupports **bold**, *italic*, `code`, and more."
            spellCheck={false}
          />
        ) : (
          <div
            className="prose prose-invert prose-xs max-w-none text-text-primary"
            onDoubleClick={() => setIsEditing(true)}
          >
            <SimpleMarkdownRenderer content={node.content || ''} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Lightweight markdown renderer - no external dependency needed for Phase 2 MVP.
 * Handles: headers, bold, italic, code, code blocks, links, lists, blockquotes.
 */
function SimpleMarkdownRenderer({ content }: { content: string }) {
  if (!content) {
    return <p className="text-text-muted/50 italic text-xs">Double-click to add content</p>;
  }

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent = '';
  let codeBlockLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={i} className="bg-cosmic-void/50 rounded-md p-2 my-2 overflow-x-auto">
            <code className="text-[11px] text-brand-accent/80 font-mono">{codeBlockContent}</code>
          </pre>
        );
        codeBlockContent = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += (codeBlockContent ? '\n' : '') + line;
      continue;
    }

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={i} className="h-2" />);
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const sizes = ['text-lg font-bold', 'text-base font-bold', 'text-sm font-semibold', 'text-xs font-semibold', 'text-xs font-medium', 'text-xs'];
      elements.push(
        <div key={i} className={`${sizes[level - 1]} text-text-primary mt-2 mb-1`}>
          <InlineMarkdown text={text} />
        </div>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <div key={i} className="border-l-2 border-brand-accent/40 pl-3 my-1 text-xs text-text-secondary italic">
          <InlineMarkdown text={line.slice(2)} />
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s/)) {
      elements.push(
        <div key={i} className="flex gap-2 text-xs text-text-primary ml-2">
          <span className="text-brand-accent/60">&#8226;</span>
          <span><InlineMarkdown text={line.replace(/^[-*]\s/, '')} /></span>
        </div>
      );
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\d+)\.\s(.+)/);
    if (olMatch) {
      elements.push(
        <div key={i} className="flex gap-2 text-xs text-text-primary ml-2">
          <span className="text-text-muted min-w-[1rem] text-right">{olMatch[1]}.</span>
          <span><InlineMarkdown text={olMatch[2]} /></span>
        </div>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="text-xs text-text-primary leading-relaxed">
        <InlineMarkdown text={line} />
      </p>
    );
  }

  return <>{elements}</>;
}

/** Renders inline markdown: bold, italic, code, links */
function InlineMarkdown({ text }: { text: string }) {
  // Process inline elements with regex
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+?)\*(?!\*)/);
    // Inline code
    const codeMatch = remaining.match(/`([^`]+?)`/);
    // Link
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find earliest match
    const matches = [
      boldMatch && { type: 'bold', match: boldMatch },
      italicMatch && { type: 'italic', match: italicMatch },
      codeMatch && { type: 'code', match: codeMatch },
      linkMatch && { type: 'link', match: linkMatch },
    ].filter(Boolean) as { type: string; match: RegExpMatchArray }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    // Sort by position
    matches.sort((a, b) => (a.match.index ?? 0) - (b.match.index ?? 0));
    const earliest = matches[0];
    const idx = earliest.match.index ?? 0;

    // Text before match
    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }

    // Render match
    switch (earliest.type) {
      case 'bold':
        parts.push(<strong key={key++} className="font-semibold">{earliest.match[1]}</strong>);
        break;
      case 'italic':
        parts.push(<em key={key++} className="italic">{earliest.match[1]}</em>);
        break;
      case 'code':
        parts.push(
          <code key={key++} className="px-1 py-0.5 rounded bg-cosmic-void/50 text-brand-accent text-[11px] font-mono">
            {earliest.match[1]}
          </code>
        );
        break;
      case 'link':
        parts.push(
          <a key={key++} href={earliest.match[2]} className="text-brand-accent underline decoration-brand-accent/30 hover:decoration-brand-accent" target="_blank" rel="noopener noreferrer">
            {earliest.match[1]}
          </a>
        );
        break;
    }

    remaining = remaining.slice(idx + earliest.match[0].length);
  }

  return <>{parts}</>;
}
