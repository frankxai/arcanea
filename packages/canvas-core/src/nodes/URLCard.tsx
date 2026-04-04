'use client';

import { useState, useCallback, useEffect } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

interface URLMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  url: string;
  type?: string;
  content?: string; // Extracted article text
}

/**
 * URLCard node - auto-extracts metadata from URLs.
 * Shows OG image, title, description, and optionally extracted content.
 * Fetches metadata via API route on creation.
 */
export function URLCardNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const meta = (node.metadata as unknown) as URLMetadata | undefined;

  // Fetch metadata when URL is set but no metadata exists
  useEffect(() => {
    if (node.sourceUrl && !meta?.title && !isLoading) {
      fetchMetadata(node.sourceUrl, node.id, updateNode, setIsLoading);
    }
  }, [node.sourceUrl, node.id, meta?.title, isLoading, updateNode]);

  const handleUrlChange = useCallback(
    (url: string) => {
      updateNode(node.id, { sourceUrl: url, metadata: {} });
    },
    [node.id, updateNode]
  );

  // URL input state
  if (!node.sourceUrl) {
    return <URLInput onSubmit={handleUrlChange} />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-cosmic-surface border border-cosmic-border rounded-lg overflow-hidden hover:border-brand-accent/30 transition-colors">
      {/* OG Image */}
      {meta?.image && (
        <div className="h-32 overflow-hidden bg-cosmic-void/30 shrink-0">
          <img
            src={meta.image}
            alt={meta.title || ''}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col gap-1.5 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center gap-2 py-4">
            <div className="w-3 h-3 border border-brand-accent/40 border-t-brand-accent rounded-full animate-spin" />
            <span className="text-xs text-text-muted">Extracting content...</span>
          </div>
        ) : (
          <>
            {/* Site name */}
            <div className="flex items-center gap-1.5">
              {meta?.favicon && (
                <img src={meta.favicon} alt="" className="w-3 h-3 rounded-sm" loading="lazy" />
              )}
              <span className="text-[10px] text-text-muted truncate">
                {meta?.siteName || new URL(node.sourceUrl).hostname}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium text-text-primary leading-tight line-clamp-2">
              {meta?.title || node.title || 'Loading...'}
            </h3>

            {/* Description */}
            {meta?.description && (
              <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3">
                {meta.description}
              </p>
            )}

            {/* Extracted content toggle */}
            {meta?.content && (
              <div className="mt-auto pt-2">
                <button
                  className="text-[10px] text-brand-accent hover:text-brand-accent/80 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setShowContent(!showContent); }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {showContent ? 'Hide content' : 'Show extracted content'}
                </button>
                {showContent && (
                  <div className="mt-2 p-2 bg-cosmic-void/30 rounded text-[11px] text-text-secondary leading-relaxed max-h-40 overflow-y-auto">
                    {meta.content.slice(0, 2000)}
                    {meta.content.length > 2000 && '...'}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* URL footer */}
      <div className="px-3 py-1.5 border-t border-cosmic-border/30 shrink-0">
        <a
          href={node.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-brand-accent/60 hover:text-brand-accent truncate block transition-colors"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {node.sourceUrl}
        </a>
      </div>
    </div>
  );
}

function URLInput({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState('');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-cosmic-surface border border-cosmic-border rounded-lg p-4">
      <div className="text-2xl opacity-30">&#128279;</div>
      <p className="text-xs text-text-muted">Paste a URL to extract content</p>
      <div className="flex w-full gap-2">
        <input
          className="flex-1 bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-1.5 text-xs text-text-primary outline-none focus:border-brand-accent/50"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Enter' && url.trim()) onSubmit(url.trim());
          }}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="https://example.com/article"
          autoFocus
        />
        <button
          className="px-3 py-1.5 rounded-md bg-brand-primary text-white text-xs hover:bg-brand-primary/80 transition-colors"
          onClick={(e) => { e.stopPropagation(); if (url.trim()) onSubmit(url.trim()); }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Extract
        </button>
      </div>
    </div>
  );
}

/**
 * Fetch URL metadata via API route.
 * Falls back to basic URL parsing if API is unavailable.
 */
async function fetchMetadata(
  url: string,
  nodeId: string,
  updateNode: (id: string, updates: Record<string, unknown>) => void,
  setLoading: (v: boolean) => void
) {
  setLoading(true);
  try {
    const res = await fetch(`/api/url-extract?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const data = await res.json();
      updateNode(nodeId, {
        title: data.title || '',
        description: data.description || '',
        metadata: {
          title: data.title,
          description: data.description,
          image: data.image,
          siteName: data.siteName,
          favicon: data.favicon,
          url: url,
          content: data.content,
        },
      });
    } else {
      // Fallback: basic metadata from URL
      const hostname = new URL(url).hostname;
      updateNode(nodeId, {
        title: hostname,
        metadata: {
          url,
          siteName: hostname,
          favicon: `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`,
        },
      });
    }
  } catch {
    // Fallback
    try {
      const hostname = new URL(url).hostname;
      updateNode(nodeId, {
        title: hostname,
        metadata: { url, siteName: hostname },
      });
    } catch {
      // Invalid URL
    }
  } finally {
    setLoading(false);
  }
}
