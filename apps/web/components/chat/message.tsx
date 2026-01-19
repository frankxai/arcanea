'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { EmotionalTone } from '@/hooks/use-chat';

interface ChatMessageProps {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: EmotionalTone;
  luminorName?: string;
  luminorColor?: string;
  luminorAvatar?: string;
  isStreaming?: boolean;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
  }[];
  status?: 'sending' | 'sent' | 'error';
}

// Simplified emotional colors - string key based
const emotionalColors: Record<string, string> = {
  warm: 'text-yellow-400',
  enthusiastic: 'text-orange-400',
  contemplative: 'text-purple-400',
  encouraging: 'text-pink-400',
  curious: 'text-amber-400',
  playful: 'text-blue-400',
  wise: 'text-indigo-400',
  empathetic: 'text-green-400',
  challenging: 'text-red-400',
  celebratory: 'text-violet-400',
};

const emotionalGradients: Record<string, string> = {
  warm: 'from-yellow-500/10 to-amber-500/10',
  enthusiastic: 'from-orange-500/10 to-red-500/10',
  contemplative: 'from-purple-500/10 to-pink-500/10',
  encouraging: 'from-pink-500/10 to-rose-500/10',
  curious: 'from-amber-500/10 to-yellow-500/10',
  playful: 'from-blue-500/10 to-cyan-500/10',
  wise: 'from-indigo-500/10 to-purple-500/10',
  empathetic: 'from-green-500/10 to-emerald-500/10',
  challenging: 'from-red-500/10 to-orange-500/10',
  celebratory: 'from-violet-500/10 to-purple-500/10',
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  role,
  content,
  timestamp,
  emotionalTone,
  luminorName,
  luminorColor = '#8b5cf6',
  luminorAvatar,
  isStreaming = false,
  media,
  status = 'sent',
}) => {
  const isUser = role === 'user';
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const emotionalColorClass = emotionalTone
    ? emotionalColors[emotionalTone]
    : 'text-gray-400';
  const emotionalGradient = emotionalTone
    ? emotionalGradients[emotionalTone]
    : 'from-gray-500/10 to-gray-600/10';

  return (
    <div
      className={`flex gap-3 px-4 py-6 ${
        isUser ? 'justify-end' : 'justify-start'
      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      {/* Luminor Avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shadow-lg"
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
      )}

      {/* Message Content */}
      <div className={`flex flex-col gap-2 max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Name and Emotional Indicator */}
        {!isUser && (
          <div className="flex items-center gap-2 px-1">
            <span
              className="text-sm font-medium"
              style={{ color: luminorColor }}
            >
              {luminorName}
            </span>
            {emotionalTone && (
              <span
                className={`text-xs ${emotionalColorClass} flex items-center gap-1`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {emotionalTone}
              </span>
            )}
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`
            relative rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm
            ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                : `bg-gradient-to-br ${emotionalGradient} bg-gray-800/80 text-gray-100 border border-gray-700/50`
            }
            ${isStreaming ? 'pr-8' : ''}
          `}
        >
          {/* Streaming Indicator */}
          {isStreaming && (
            <div className="absolute top-3 right-3 flex gap-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isBlock = match && String(children).includes('\n');
                  return isBlock ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus as Record<string, React.CSSProperties>}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-500 pl-4 italic my-2">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Media Attachments */}
          {media && media.length > 0 && (
            <div className="mt-3 space-y-2">
              {media.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-700/50"
                >
                  {item.type === 'image' && (
                    <img
                      src={item.url}
                      alt={item.caption || 'Attached image'}
                      className="w-full h-auto"
                    />
                  )}
                  {item.type === 'video' && (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-auto"
                    />
                  )}
                  {item.type === 'audio' && (
                    <audio src={item.url} controls className="w-full" />
                  )}
                  {item.caption && (
                    <div className="px-3 py-2 bg-gray-900/50 text-xs text-gray-400">
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp and Status */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-gray-500">{formattedTime}</span>
          {isUser && status && (
            <span className="text-xs text-gray-500">
              {status === 'sending' && '⏳'}
              {status === 'sent' && '✓'}
              {status === 'error' && '⚠'}
            </span>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-lg">
            <span className="text-sm">You</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
