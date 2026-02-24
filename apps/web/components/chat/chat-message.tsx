'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cosmicSlideUp } from '@/lib/animations';
import { type Academy, getAcademyClasses } from '@/lib/theme-utils';
import { User, Sparkles } from 'lucide-react';

export interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  academy?: Academy;
  luminorName?: string;
  timestamp?: Date;
  isStreaming?: boolean;
  className?: string;
}

const ChatMessage = React.memo<ChatMessageProps>(React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      className,
      role,
      content,
      academy = 'default',
      luminorName,
      timestamp,
      isStreaming = false,
    },
    ref
  ) => {
    const academyClasses = React.useMemo(() => getAcademyClasses(academy), [academy]);
    const isUser = role === 'user';

    return (
      <motion.div
        ref={ref}
        variants={cosmicSlideUp}
        initial="hidden"
        animate="visible"
        className={cn(
          'flex gap-3',
          isUser ? 'flex-row-reverse' : 'flex-row',
          className
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            isUser
              ? 'bg-cosmic-surface border border-cosmic-border'
              : cn(academyClasses.bg, 'border', academyClasses.border)
          )}
        >
          {isUser ? (
            <User className="h-4 w-4 text-text-primary" />
          ) : (
            <Sparkles className={cn('h-4 w-4', academyClasses.text)} />
          )}
        </div>

        {/* Message Content */}
        <div className={cn('flex flex-col gap-1 max-w-[75%]')}>
          {/* Header with name and timestamp */}
          {!isUser && luminorName && (
            <div className="flex items-center gap-2 px-1">
              <span className={cn('text-sm font-medium', academyClasses.text)}>
                {luminorName}
              </span>
              {timestamp && (
                <span className="text-xs text-text-muted">
                  {timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              )}
            </div>
          )}

          {/* Message bubble */}
          <div
            className={cn(
              'rounded-lg px-4 py-3 text-sm',
              isUser
                ? 'bg-cosmic-surface border border-cosmic-border text-text-primary'
                : cn(
                    academyClasses.bg,
                    'border',
                    academyClasses.border,
                    'text-text-primary backdrop-blur-sm'
                  )
            )}
          >
            {content}
            {isStreaming && (
              <motion.span
                className={cn('ml-1', academyClasses.text)}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ▊
              </motion.span>
            )}
          </div>

          {/* User timestamp */}
          {isUser && timestamp && (
            <span className="text-xs text-text-muted px-1 text-right">
              {timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
      </motion.div>
    );
  }
));

ChatMessage.displayName = 'ChatMessage';

export { ChatMessage };
