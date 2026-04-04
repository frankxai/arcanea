'use client';

import { useState, useCallback, useRef } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

type PreviewMode = 'url' | 'html';

/**
 * LivePreview node - renders live HTML or URL content in a sandboxed iframe.
 * Supports:
 * - Direct HTML input (srcdoc) for AI-generated UI, code output, etc.
 * - URL input (src) for embedding external pages, localhost previews, GitHub Pages
 * - Responsive resize to test different viewport sizes
 */
export function LivePreviewNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const mode = (node.metadata.previewMode as PreviewMode) || 'html';
  const [isEditingSource, setIsEditingSource] = useState(!node.content && !node.sourceUrl);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleModeSwitch = useCallback(
    (newMode: PreviewMode) => {
      updateNode(node.id, { metadata: { ...node.metadata, previewMode: newMode } });
    },
    [node.id, node.metadata, updateNode]
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // Show source editor
  if (isEditingSource) {
    return (
      <SourceEditor
        node={node}
        mode={mode}
        onModeSwitch={handleModeSwitch}
        onDone={() => setIsEditingSource(false)}
      />
    );
  }

  const hasContent = mode === 'html' ? !!node.content : !!node.sourceUrl;

  return (
    <div className="w-full h-full flex flex-col bg-[#1a1a2e] border border-cosmic-border rounded-lg overflow-hidden">
      {/* Browser chrome header */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-cosmic-border/50 bg-[#16162a] shrink-0">
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* URL bar */}
        <div className="flex-1 bg-cosmic-void/40 rounded px-2 py-0.5 text-[10px] text-text-muted truncate min-w-0">
          {mode === 'url' ? (node.sourceUrl || 'about:blank') : 'srcdoc://preview'}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            className="text-[10px] px-1.5 py-0.5 rounded text-text-muted hover:text-text-primary transition-colors"
            onClick={(e) => { e.stopPropagation(); handleRefresh(); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Refresh"
          >
            &#8635;
          </button>
          <button
            className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
              mode === 'html' ? 'text-brand-accent' : 'text-text-muted hover:text-text-primary'
            }`}
            onClick={(e) => { e.stopPropagation(); handleModeSwitch('html'); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="HTML mode"
          >
            HTML
          </button>
          <button
            className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
              mode === 'url' ? 'text-brand-accent' : 'text-text-muted hover:text-text-primary'
            }`}
            onClick={(e) => { e.stopPropagation(); handleModeSwitch('url'); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="URL mode"
          >
            URL
          </button>
          <button
            className="text-[10px] px-1.5 py-0.5 rounded text-text-muted hover:text-text-primary transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsEditingSource(true); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Edit source"
          >
            Edit
          </button>
        </div>
      </div>

      {/* iframe preview */}
      <div className="flex-1 bg-white overflow-hidden">
        {hasContent ? (
          <iframe
            key={refreshKey}
            ref={iframeRef}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            {...(mode === 'html'
              ? { srcDoc: wrapHtml(node.content || '') }
              : { src: node.sourceUrl })}
            title={node.title || 'Live Preview'}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-cosmic-void/30 text-text-muted text-xs">
            No content to preview
          </div>
        )}
      </div>
    </div>
  );
}

function SourceEditor({
  node,
  mode,
  onModeSwitch,
  onDone,
}: {
  node: { id: string; content?: string; sourceUrl?: string; metadata: Record<string, unknown> };
  mode: PreviewMode;
  onModeSwitch: (mode: PreviewMode) => void;
  onDone: () => void;
}) {
  const { updateNode } = useBoard();
  const [html, setHtml] = useState(node.content || DEFAULT_HTML);
  const [url, setUrl] = useState(node.sourceUrl || '');

  const handleSave = useCallback(() => {
    if (mode === 'html') {
      updateNode(node.id, { content: html, title: node.metadata.title as string || 'Live Preview' });
    } else {
      updateNode(node.id, { sourceUrl: url, title: node.metadata.title as string || 'Live Preview' });
    }
    onDone();
  }, [mode, html, url, node.id, node.metadata.title, updateNode, onDone]);

  return (
    <div className="w-full h-full flex flex-col bg-cosmic-surface border border-cosmic-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cosmic-border/50 bg-cosmic-raised/30 shrink-0">
        <div className="flex items-center gap-2">
          <button
            className={`text-[10px] px-2 py-0.5 rounded ${
              mode === 'html' ? 'bg-brand-accent/20 text-brand-accent' : 'text-text-muted hover:text-text-primary'
            } transition-colors`}
            onClick={() => onModeSwitch('html')}
            onMouseDown={(e) => e.stopPropagation()}
          >
            HTML
          </button>
          <button
            className={`text-[10px] px-2 py-0.5 rounded ${
              mode === 'url' ? 'bg-brand-accent/20 text-brand-accent' : 'text-text-muted hover:text-text-primary'
            } transition-colors`}
            onClick={() => onModeSwitch('url')}
            onMouseDown={(e) => e.stopPropagation()}
          >
            URL
          </button>
        </div>
        <button
          className="text-xs px-3 py-1 rounded-md bg-brand-primary text-white hover:bg-brand-primary/80 transition-colors"
          onClick={(e) => { e.stopPropagation(); handleSave(); }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Preview
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {mode === 'html' ? (
          <textarea
            className="w-full h-full resize-none bg-[#0d1117] text-[12px] text-[#c9d1d9] leading-[1.6] p-3 font-mono outline-none"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="<h1>Hello World</h1>"
            spellCheck={false}
          />
        ) : (
          <div className="p-4">
            <label className="block text-xs text-text-muted mb-2">URL to embed</label>
            <input
              className="w-full bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-accent/50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') handleSave();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="https://localhost:3000 or any URL"
              autoFocus
            />
            <p className="text-[10px] text-text-muted/60 mt-2">
              Works with localhost, GitHub Pages, deployed sites, and any public URL.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Wrap raw HTML in a basic document with Tailwind CDN for styling */
function wrapHtml(html: string): string {
  // If the HTML already has <html> or <body> tags, use as-is
  if (html.includes('<html') || html.includes('<!DOCTYPE')) {
    return html;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
}

const DEFAULT_HTML = `<div class="max-w-md mx-auto p-6">
  <h1 class="text-2xl font-bold text-gray-900 mb-4">Live Preview</h1>
  <p class="text-gray-600 mb-4">
    Edit the HTML to see live changes. Tailwind CSS is available.
  </p>
  <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
    Click me
  </button>
</div>`;
