'use client';

import React, { useState, useEffect } from 'react';
import { ChatMessage } from './message';
import { EmotionalTone } from '@/hooks/use-chat';

interface StreamingMessageProps {
  content: string;
  luminorName: string;
  luminorColor: string;
  luminorAvatar?: string;
  emotionalTone?: EmotionalTone;
  thinkingState?: 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';
  onComplete?: () => void;
}

const thinkingMessages: Record<string, string[]> = {
  thinking: [
    'Contemplating your question...',
    'Processing this thoughtfully...',
    'Taking a moment to consider...',
    'Reflecting on this...',
  ],
  generating: [
    'Weaving creative energy...',
    'Channeling the muse...',
    'Crafting something special...',
    'Bringing your vision to life...',
  ],
  analyzing: [
    'Examining the patterns...',
    'Reading between the lines...',
    'Analyzing the frequencies...',
    'Tuning into the essence...',
  ],
  creating: [
    'Manifesting your creation...',
    'Shaping the energy...',
    'Forming the essence...',
    'Building your masterpiece...',
  ],
};

export const StreamingMessage: React.FC<StreamingMessageProps> = ({
  content,
  luminorName,
  luminorColor,
  luminorAvatar,
  emotionalTone,
  thinkingState = 'idle',
  onComplete,
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');

  // Update thinking message periodically
  useEffect(() => {
    if (thinkingState !== 'idle' && !content) {
      const messages = thinkingMessages[thinkingState] || thinkingMessages.thinking;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setThinkingMessage(randomMessage);

      const interval = setInterval(() => {
        const newMessage = messages[Math.floor(Math.random() * messages.length)];
        setThinkingMessage(newMessage);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [thinkingState, content]);

  // Stream content with natural pacing
  useEffect(() => {
    if (!content) {
      setDisplayedContent('');
      setIsComplete(false);
      return;
    }

    if (content === displayedContent) {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    // Natural streaming with word-by-word reveal
    const words = content.split(' ');
    const currentWords = displayedContent.split(' ').filter(w => w);

    if (currentWords.length < words.length) {
      const nextIndex = currentWords.length;
      const delay = words[nextIndex].length > 10 ? 80 : 40; // Longer words = slight pause

      const timer = setTimeout(() => {
        const nextContent = words.slice(0, nextIndex + 1).join(' ');
        setDisplayedContent(nextContent);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setDisplayedContent(content);
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [content, displayedContent, isComplete, onComplete]);

  // Show thinking state
  if (thinkingState !== 'idle' && !content) {
    return (
      <div className="flex gap-3 px-4 py-6 justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Luminor Avatar */}
        <div className="flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shadow-lg animate-pulse"
            style={{
              backgroundColor: luminorColor,
              boxShadow: `0 0 20px ${luminorColor}40`,
            }}
          >
            {luminorAvatar ? (
              <img
                src={luminorAvatar}
                alt={luminorName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm">
                {luminorName?.charAt(0).toUpperCase() || 'L'}
              </span>
            )}
          </div>
        </div>

        {/* Thinking Indicator */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-sm font-medium" style={{ color: luminorColor }}>
              {luminorName}
            </span>
          </div>

          <div className="relative rounded-2xl px-4 py-3 bg-gray-800/60 border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* Animated Dots */}
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s]"
                  style={{ backgroundColor: luminorColor }}
                />
                <span
                  className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s]"
                  style={{ backgroundColor: luminorColor }}
                />
                <span
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: luminorColor }}
                />
              </div>

              {/* Thinking Message */}
              <span className="text-sm text-gray-400 animate-pulse">
                {thinkingMessage}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show streamed message
  return (
    <ChatMessage
      id={`streaming-${Date.now()}`}
      role="assistant"
      content={displayedContent}
      timestamp={new Date()}
      emotionalTone={emotionalTone}
      luminorName={luminorName}
      luminorColor={luminorColor}
      luminorAvatar={luminorAvatar}
      isStreaming={!isComplete}
    />
  );
};

export default StreamingMessage;
