'use client';

import { useState, useCallback } from 'react';
import { useBoard } from '../graph/BoardState';
import type { NodeRendererProps } from './NodeRegistry';

/**
 * MediaEmbed node - embeds YouTube videos, images, and other media.
 * Supports:
 * - YouTube URLs (rendered as embedded player)
 * - Image URLs (rendered inline)
 * - Video URLs (HTML5 video)
 * - Audio URLs (HTML5 audio with waveform-style UI)
 */
export function MediaEmbedNode({ node, isSelected }: NodeRendererProps) {
  const { updateNode } = useBoard();
  const [isSettingUrl, setIsSettingUrl] = useState(!node.sourceUrl);
  const mediaType = detectMediaType(node.sourceUrl || '');

  const handleUrlSubmit = useCallback(
    (url: string) => {
      const type = detectMediaType(url);
      updateNode(node.id, {
        sourceUrl: url,
        metadata: { ...node.metadata, mediaType: type.type },
        title: node.title || type.label,
      });
      setIsSettingUrl(false);
    },
    [node.id, node.title, node.metadata, updateNode]
  );

  if (isSettingUrl || !node.sourceUrl) {
    return <MediaUrlInput onSubmit={handleUrlSubmit} currentUrl={node.sourceUrl} />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-cosmic-surface border border-cosmic-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-cosmic-border/50 bg-cosmic-raised/30 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs">{mediaType.icon}</span>
          <span className="text-[10px] text-text-secondary truncate">{node.title || mediaType.label}</span>
        </div>
        <button
          className="text-[10px] px-2 py-0.5 rounded text-text-muted hover:text-text-primary transition-colors shrink-0"
          onClick={(e) => { e.stopPropagation(); setIsSettingUrl(true); }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Change
        </button>
      </div>

      {/* Media content */}
      <div className="flex-1 overflow-hidden">
        {mediaType.type === 'youtube' && (
          <iframe
            className="w-full h-full"
            src={getYouTubeEmbedUrl(node.sourceUrl)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={node.title || 'YouTube Video'}
          />
        )}

        {mediaType.type === 'image' && (
          <img
            src={node.sourceUrl}
            alt={node.title || 'Image'}
            className="w-full h-full object-contain bg-cosmic-void/30"
            loading="lazy"
          />
        )}

        {mediaType.type === 'video' && (
          <video
            src={node.sourceUrl}
            className="w-full h-full object-contain bg-cosmic-void/30"
            controls
            preload="metadata"
          />
        )}

        {mediaType.type === 'audio' && (
          <div className="flex items-center justify-center h-full p-6 bg-cosmic-void/30">
            <audio src={node.sourceUrl} controls className="w-full" preload="metadata" />
          </div>
        )}

        {mediaType.type === 'unknown' && (
          <div className="flex items-center justify-center h-full text-text-muted text-xs">
            Unsupported media type
          </div>
        )}
      </div>
    </div>
  );
}

function MediaUrlInput({ onSubmit, currentUrl }: { onSubmit: (url: string) => void; currentUrl?: string }) {
  const [url, setUrl] = useState(currentUrl || '');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-cosmic-surface border border-cosmic-border rounded-lg p-4">
      <div className="text-2xl opacity-30">&#127909;</div>
      <p className="text-xs text-text-muted">Paste a media URL</p>
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
          placeholder="https://youtube.com/watch?v=..."
          autoFocus
        />
        <button
          className="px-3 py-1.5 rounded-md bg-brand-primary text-white text-xs hover:bg-brand-primary/80 transition-colors"
          onClick={(e) => { e.stopPropagation(); if (url.trim()) onSubmit(url.trim()); }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Embed
        </button>
      </div>
      <p className="text-[10px] text-text-muted/60">YouTube, images, video, audio</p>
    </div>
  );
}

// ─── Utility Functions ────────────────────────────────────────

function detectMediaType(url: string): { type: string; label: string; icon: string } {
  if (!url) return { type: 'unknown', label: 'Media', icon: '&#128247;' };

  // YouTube
  if (url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)/)) {
    return { type: 'youtube', label: 'YouTube Video', icon: '&#9654;' };
  }

  // Images
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|avif|bmp|ico)(\?.*)?$/i)) {
    return { type: 'image', label: 'Image', icon: '&#128444;' };
  }

  // Video
  if (url.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i)) {
    return { type: 'video', label: 'Video', icon: '&#127909;' };
  }

  // Audio
  if (url.match(/\.(mp3|wav|ogg|flac|aac|m4a)(\?.*)?$/i)) {
    return { type: 'audio', label: 'Audio', icon: '&#127925;' };
  }

  return { type: 'unknown', label: 'Media', icon: '&#128279;' };
}

function getYouTubeEmbedUrl(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }

  return url;
}
