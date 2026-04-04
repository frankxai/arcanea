'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

const LANGUAGES = [
  'typescript', 'javascript', 'python', 'rust', 'go', 'html', 'css', 'json',
  'sql', 'bash', 'yaml', 'markdown', 'text',
] as const;

type Language = (typeof LANGUAGES)[number];

/**
 * CodeBlock node - syntax-highlighted code display with language selector.
 * Uses CSS-based highlighting for zero-dependency rendering.
 */
export function CodeBlockNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const language = (node.metadata.language as Language) || 'typescript';

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNode(node.id, {
        content: e.target.value,
        title: node.title || `Code (${language})`,
      });
    },
    [node.id, node.title, language, updateNode]
  );

  const handleLanguageChange = useCallback(
    (lang: string) => {
      updateNode(node.id, {
        metadata: { ...node.metadata, language: lang },
        title: node.title || `Code (${lang})`,
      });
    },
    [node.id, node.title, node.metadata, updateNode]
  );

  const handleCopy = useCallback(() => {
    if (node.content) {
      navigator.clipboard.writeText(node.content);
    }
  }, [node.content]);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] border border-cosmic-border rounded-lg overflow-hidden font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-cosmic-border/50 bg-[#161b22]">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Language selector */}
          <select
            className="bg-transparent text-[10px] text-text-muted outline-none cursor-pointer hover:text-text-primary"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang} className="bg-cosmic-deep">
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="text-[10px] px-2 py-0.5 rounded text-text-muted hover:text-text-primary hover:bg-cosmic-raised/50 transition-colors"
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Copy code"
          >
            Copy
          </button>
          <button
            className={`text-[10px] px-2 py-0.5 rounded ${
              isEditing ? 'bg-brand-accent/20 text-brand-accent' : 'text-text-muted hover:text-text-primary'
            } transition-colors`}
            onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="w-full h-full resize-none bg-transparent outline-none text-[12px] text-[#c9d1d9] leading-[1.6] p-3 font-mono"
            value={node.content || ''}
            onChange={handleChange}
            onKeyDown={(e) => {
              e.stopPropagation();
              // Tab indentation
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const val = e.currentTarget.value;
                const newVal = val.substring(0, start) + '  ' + val.substring(end);
                handleChange({ target: { value: newVal } } as React.ChangeEvent<HTMLTextAreaElement>);
                // Restore cursor position
                requestAnimationFrame(() => {
                  if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 2;
                    textareaRef.current.selectionEnd = start + 2;
                  }
                });
              }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="// Paste or type code here"
            spellCheck={false}
          />
        ) : (
          <pre
            className="p-3 text-[12px] leading-[1.6] overflow-auto h-full"
            onDoubleClick={() => setIsEditing(true)}
          >
            <code className="text-[#c9d1d9]">
              <SyntaxHighlight code={node.content || ''} language={language} />
            </code>
          </pre>
        )}
      </div>

      {/* Line count footer */}
      <div className="px-3 py-1 border-t border-cosmic-border/30 text-[10px] text-text-muted bg-[#161b22]">
        {(node.content || '').split('\n').length} lines &middot; {language}
      </div>
    </div>
  );
}

/**
 * Zero-dependency syntax highlighting using regex patterns.
 * Covers keywords, strings, comments, numbers for common languages.
 */
function SyntaxHighlight({ code, language }: { code: string; language: string }) {
  if (!code) {
    return <span className="text-text-muted/40 italic">// Double-click to edit</span>;
  }

  const lines = code.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="inline-block w-8 text-right mr-4 text-text-muted/30 select-none text-[11px]">
            {i + 1}
          </span>
          <span>
            <HighlightLine line={line} language={language} />
          </span>
        </div>
      ))}
    </>
  );
}

function HighlightLine({ line, language }: { line: string; language: string }) {
  // Simple keyword-based highlighting
  const keywords = getKeywords(language);
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    // Single-line comment
    const commentIdx = findComment(remaining, language);
    if (commentIdx === 0) {
      parts.push(<span key={key++} className="text-[#8b949e] italic">{remaining}</span>);
      break;
    }
    if (commentIdx > 0) {
      parts.push(...tokenize(remaining.slice(0, commentIdx), keywords, key));
      key += 100;
      parts.push(<span key={key++} className="text-[#8b949e] italic">{remaining.slice(commentIdx)}</span>);
      break;
    }

    // String
    const strMatch = remaining.match(/^(['"`])(?:[^\\]|\\.)*?\1/);
    if (strMatch) {
      parts.push(<span key={key++} className="text-[#a5d6ff]">{strMatch[0]}</span>);
      remaining = remaining.slice(strMatch[0].length);
      continue;
    }

    // Single char
    const wordMatch = remaining.match(/^[\w$]+/);
    if (wordMatch) {
      const word = wordMatch[0];
      if (keywords.includes(word)) {
        parts.push(<span key={key++} className="text-[#ff7b72]">{word}</span>);
      } else if (/^\d/.test(word)) {
        parts.push(<span key={key++} className="text-[#79c0ff]">{word}</span>);
      } else if (word[0] === word[0].toUpperCase() && /[a-z]/.test(word)) {
        parts.push(<span key={key++} className="text-[#ffa657]">{word}</span>);
      } else {
        parts.push(<span key={key++}>{word}</span>);
      }
      remaining = remaining.slice(word.length);
      continue;
    }

    // Operators and other chars
    parts.push(<span key={key++}>{remaining[0]}</span>);
    remaining = remaining.slice(1);
  }

  return <>{parts}</>;
}

function tokenize(text: string, keywords: string[], startKey: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = startKey;

  while (remaining.length > 0) {
    const wordMatch = remaining.match(/^[\w$]+/);
    if (wordMatch) {
      const word = wordMatch[0];
      if (keywords.includes(word)) {
        parts.push(<span key={key++} className="text-[#ff7b72]">{word}</span>);
      } else {
        parts.push(<span key={key++}>{word}</span>);
      }
      remaining = remaining.slice(word.length);
    } else {
      parts.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }
  }
  return parts;
}

function findComment(line: string, language: string): number {
  if (['python', 'bash', 'yaml'].includes(language)) {
    const idx = line.indexOf('#');
    return idx >= 0 ? idx : -1;
  }
  const idx = line.indexOf('//');
  return idx >= 0 ? idx : -1;
}

function getKeywords(language: string): string[] {
  switch (language) {
    case 'typescript':
    case 'javascript':
      return ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'super', 'extends', 'implements', 'interface', 'type', 'enum', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'switch', 'case', 'break', 'continue', 'of', 'in', 'as', 'readonly', 'private', 'public', 'protected', 'static', 'abstract', 'void', 'never', 'any', 'string', 'number', 'boolean', 'object', 'keyof', 'infer'];
    case 'python':
      return ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'raise', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'self', 'lambda', 'yield', 'async', 'await', 'global', 'nonlocal'];
    case 'rust':
      return ['fn', 'let', 'mut', 'const', 'struct', 'enum', 'impl', 'trait', 'pub', 'use', 'mod', 'crate', 'self', 'super', 'return', 'if', 'else', 'for', 'while', 'loop', 'match', 'where', 'type', 'async', 'await', 'move', 'ref', 'true', 'false', 'Some', 'None', 'Ok', 'Err', 'unsafe'];
    case 'go':
      return ['func', 'package', 'import', 'var', 'const', 'type', 'struct', 'interface', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break', 'continue', 'go', 'chan', 'defer', 'select', 'map', 'nil', 'true', 'false', 'make', 'new', 'append', 'len', 'cap'];
    case 'sql':
      return ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'NULL', 'TRUE', 'FALSE', 'DEFAULT', 'PRIMARY', 'KEY', 'REFERENCES', 'FOREIGN', 'UNIQUE', 'CHECK', 'SET', 'VALUES', 'INTO'];
    case 'html':
      return ['div', 'span', 'p', 'h1', 'h2', 'h3', 'a', 'img', 'input', 'button', 'form', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'section', 'header', 'footer', 'nav', 'main', 'article', 'aside'];
    case 'css':
      return ['display', 'flex', 'grid', 'position', 'width', 'height', 'margin', 'padding', 'border', 'color', 'background', 'font', 'text', 'align', 'justify', 'items', 'content', 'gap', 'overflow', 'transition', 'transform', 'opacity', 'none', 'auto', 'inherit', 'initial'];
    default:
      return [];
  }
}
