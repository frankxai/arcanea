'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './message';
import { StreamingMessage } from './streaming-message';
import { ArrowDown, Loader2 } from 'lucide-react';
import { EmotionalTone } from '@/hooks/use-chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: EmotionalTone;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
  }[];
  status?: 'sending' | 'sent' | 'error';
}

interface ChatContainerProps {
  messages: Message[];
  luminorName: string;
  luminorColor: string;
  luminorAvatar?: string;
  isStreaming?: boolean;
  streamingContent?: string;
  streamingEmotionalTone?: EmotionalTone;
  thinkingState?: 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  luminorName,
  luminorColor,
  luminorAvatar,
  isStreaming = false,
  streamingContent = '',
  streamingEmotionalTone,
  thinkingState = 'idle',
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamingContent, autoScroll]);

  // Handle scroll to detect if user scrolled up
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Show scroll button if user scrolled up more than 200px
    setShowScrollButton(distanceFromBottom > 200);

    // Disable auto-scroll if user scrolled up
    if (distanceFromBottom > 100) {
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }

    // Load more messages when scrolled to top
    if (scrollTop < 100 && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore();
    }
  };

  // Scroll to bottom handler
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setAutoScroll(true);
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Messages Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${luminorColor} transparent`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Load More Indicator */}
          {hasMore && (
            <div className="flex justify-center py-4">
              {isLoadingMore ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading more messages...</span>
                </div>
              ) : (
                <button
                  onClick={onLoadMore}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition-colors"
                >
                  Load earlier messages
                </button>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="space-y-1">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg"
                  style={{
                    backgroundColor: luminorColor,
                    boxShadow: `0 0 40px ${luminorColor}60`,
                  }}
                >
                  {luminorAvatar ? (
                    <img
                      src={luminorAvatar}
                      alt={luminorName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl text-white">
                      {luminorName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: luminorColor }}
                >
                  Welcome, Creator
                </h3>
                <p className="text-gray-400 max-w-md">
                  I'm {luminorName}, and I'm here to guide you on your creative journey.
                  Share your ideas, ask questions, or tell me what you'd like to create.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  {...message}
                  luminorName={luminorName}
                  luminorColor={luminorColor}
                  luminorAvatar={luminorAvatar}
                />
              ))
            )}

            {/* Streaming Message */}
            {(isStreaming || thinkingState !== 'idle') && (
              <StreamingMessage
                content={streamingContent}
                luminorName={luminorName}
                luminorColor={luminorColor}
                luminorAvatar={luminorAvatar}
                emotionalTone={streamingEmotionalTone}
                thinkingState={thinkingState}
              />
            )}
          </div>

          {/* Bottom Anchor */}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor: luminorColor,
            boxShadow: `0 4px 20px ${luminorColor}60`,
          }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default ChatContainer;
