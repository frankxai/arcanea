'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Image, Video, Music, Download, Eye, Sparkles } from 'lucide-react';

interface GenerationIndicatorProps {
  type: 'image' | 'video' | 'music';
  status: 'queued' | 'generating' | 'completed' | 'error';
  progress?: number;
  estimatedTime?: number;
  result?: {
    url: string;
    thumbnail?: string;
    title?: string;
  };
  onView?: () => void;
  onSave?: () => void;
  luminorColor?: string;
}

const generationIcons = {
  image: Image,
  video: Video,
  music: Music,
};

const generationLabels = {
  image: 'Image',
  video: 'Video',
  music: 'Music',
};

const generationMessages = {
  queued: {
    image: 'Preparing to generate image...',
    video: 'Queued for video generation...',
    music: 'Ready to create music...',
  },
  generating: {
    image: 'Painting with pixels...',
    video: 'Weaving frames together...',
    music: 'Composing melodies...',
  },
  completed: {
    image: 'Image created successfully!',
    video: 'Video is ready!',
    music: 'Music composed!',
  },
  error: {
    image: 'Failed to generate image',
    video: 'Video generation failed',
    music: 'Music creation failed',
  },
};

export const GenerationIndicator: React.FC<GenerationIndicatorProps> = ({
  type,
  status,
  progress = 0,
  estimatedTime,
  result,
  onView,
  onSave,
  luminorColor = '#8b5cf6',
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const Icon = generationIcons[type];
  const label = generationLabels[type];
  const message = generationMessages[status][type];

  // Track elapsed time during generation
  useEffect(() => {
    if (status === 'generating') {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
    }
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${status === 'generating' ? 'animate-pulse' : ''}
          `}
          style={{
            backgroundColor: `${luminorColor}20`,
            color: luminorColor,
          }}
        >
          {status === 'generating' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-gray-200">
              {label} Generation
            </h4>
            {status === 'completed' && (
              <Sparkles className="w-4 h-4 text-yellow-400" />
            )}
          </div>
          <p className="text-xs text-gray-400">{message}</p>
        </div>
      </div>

      {/* Progress */}
      {(status === 'queued' || status === 'generating') && (
        <div className="space-y-2 mb-3">
          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: luminorColor,
                boxShadow: `0 0 10px ${luminorColor}80`,
              }}
            />
          </div>

          {/* Time Info */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {status === 'generating' && `Elapsed: ${formatTime(elapsedTime)}`}
            </span>
            {estimatedTime && (
              <span>Est: {formatTime(estimatedTime)}</span>
            )}
          </div>
        </div>
      )}

      {/* Result Preview */}
      {status === 'completed' && result && (
        <div className="space-y-3">
          {/* Preview */}
          <div className="relative rounded-lg overflow-hidden bg-gray-900 group">
            {type === 'image' && (
              <img
                src={result.url}
                alt={result.title || 'Generated image'}
                className="w-full h-auto"
              />
            )}
            {type === 'video' && (
              <video
                src={result.url}
                poster={result.thumbnail}
                controls
                className="w-full h-auto"
              />
            )}
            {type === 'music' && (
              <div className="p-4">
                <audio src={result.url} controls className="w-full" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {onView && (
                <button
                  onClick={onView}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  title="View full size"
                >
                  <Eye className="w-5 h-5 text-white" />
                </button>
              )}
              {onSave && (
                <button
                  onClick={onSave}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  title="Save to profile"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Title */}
          {result.title && (
            <p className="text-sm text-gray-300 text-center">
              {result.title}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {onView && (
              <button
                onClick={onView}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            )}
            {onSave && (
              <button
                onClick={onSave}
                className="flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:shadow-lg"
                style={{
                  backgroundColor: luminorColor,
                  boxShadow: `0 0 20px ${luminorColor}40`,
                }}
              >
                <Download className="w-4 h-4 inline mr-1" />
                Save
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerationIndicator;
