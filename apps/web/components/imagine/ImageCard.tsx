'use client';

import { useState } from 'react';

interface ImageCardProps {
  id: string;
  imageData?: string;
  imageUrl?: string;
  mimeType: string;
  prompt: string;
  onAnimate?: (id: string, imageUrl: string) => void;
  isAnimating?: boolean;
  videoUrl?: string;
}

export function ImageCard({
  id,
  imageData,
  imageUrl,
  mimeType,
  prompt,
  onAnimate,
  isAnimating,
  videoUrl,
}: ImageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const imageSrc = imageUrl || (imageData ? `data:${mimeType};base64,${imageData}` : '');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `arcanea-imagine-${id}.png`;
    link.click();
  };

  const handleAnimate = () => {
    if (onAnimate) {
      onAnimate(id, imageSrc);
    }
  };

  return (
    <>
      <div
        className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--gold-bright)/0.15)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
      >
        {/* Image or Video */}
        {showVideo && videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-square object-cover"
            onClick={(e) => {
              e.stopPropagation();
              setShowVideo(false);
            }}
          />
        ) : (
          <img
            src={imageSrc}
            alt={prompt}
            className="w-full aspect-square object-cover"
            loading="lazy"
          />
        )}

        {/* Video badge */}
        {videoUrl && !showVideo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowVideo(true);
            }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-600/90 text-white backdrop-blur-sm flex items-center gap-1 hover:bg-purple-500 transition-colors"
          >
            <span className="w-2.5 h-2.5 bg-white rounded-full" />
            Video
          </button>
        )}

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[hsl(var(--cosmic-void))]/90 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Prompt text */}
            <p className="text-xs text-[hsl(var(--text-secondary))] line-clamp-2 font-[family-name:var(--font-crimson-pro)]">
              {prompt}
            </p>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnimate();
                }}
                disabled={isAnimating || !!videoUrl}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-600/80 to-fuchsia-600/80 text-white hover:from-purple-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 backdrop-blur-sm"
              >
                {isAnimating ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Animating
                  </span>
                ) : videoUrl ? (
                  'Animated'
                ) : (
                  'Animate'
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-[hsl(var(--cosmic-raised))]/80 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-all backdrop-blur-sm"
                title="Download"
              >
                ↓
              </button>
            </div>
          </div>
        </div>

        {/* Generating animation overlay */}
        {isAnimating && (
          <div className="absolute inset-0 bg-[hsl(var(--cosmic-void))]/60 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
              <span className="text-xs text-purple-300">Bringing to life...</span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded lightbox */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--cosmic-void))]/95 backdrop-blur-xl"
          onClick={() => setIsExpanded(false)}
        >
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            {showVideo && videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                loop
                controls
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
              />
            ) : (
              <img
                src={imageSrc}
                alt={prompt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(var(--cosmic-void))]/90 to-transparent rounded-b-xl">
              <p className="text-sm text-[hsl(var(--text-secondary))] font-[family-name:var(--font-crimson-pro)]">
                {prompt}
              </p>
              <div className="flex gap-2 mt-3">
                {videoUrl && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-purple-600/80 text-white hover:bg-purple-500 transition-all"
                  >
                    {showVideo ? 'Show Image' : 'Play Video'}
                  </button>
                )}
                {!videoUrl && (
                  <button
                    onClick={handleAnimate}
                    disabled={isAnimating}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500 transition-all disabled:opacity-50"
                  >
                    {isAnimating ? 'Animating...' : 'Animate'}
                  </button>
                )}
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--cosmic-raised))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-all"
                >
                  ↓ Download
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="ml-auto px-4 py-2 rounded-lg text-sm text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
