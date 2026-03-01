import * as React from 'react';
import { cn } from './utils';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant' | 'system';
  agentName?: string;
  agentAvatar?: string;
  isStreaming?: boolean;
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, role, agentName, isStreaming, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 px-4 py-3',
          role === 'user' ? 'flex-row-reverse' : 'flex-row',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'max-w-[80%] rounded-2xl px-4 py-3',
            role === 'user'
              ? 'bg-purple-600/20 border border-purple-500/20 text-white'
              : 'bg-white/5 border border-white/10 text-gray-100',
            role === 'system' && 'bg-amber-500/10 border-amber-500/20 text-amber-100 text-sm italic'
          )}
        >
          {agentName && role === 'assistant' && (
            <div className="text-xs font-medium text-purple-400 mb-1">{agentName}</div>
          )}
          <div className="prose prose-invert prose-sm max-w-none">
            {children}
          </div>
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-purple-400 animate-pulse rounded-sm" />
          )}
        </div>
      </div>
    );
  }
);
ChatBubble.displayName = 'ChatBubble';
