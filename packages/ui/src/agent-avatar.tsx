import * as React from 'react';
import { cn } from './utils';

export interface AgentAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'idle' | 'thinking' | 'speaking';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
};

export const AgentAvatar = React.forwardRef<HTMLDivElement, AgentAvatarProps>(
  ({ className, name, avatar, size = 'md', status = 'idle', ...props }, ref) => {
    const initials = name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-full flex items-center justify-center font-semibold',
          'bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-white/20',
          sizeClasses[size],
          status === 'thinking' && 'animate-pulse',
          status === 'speaking' && 'ring-2 ring-purple-500/50 ring-offset-2 ring-offset-transparent',
          className
        )}
        title={name}
        {...props}
      >
        {avatar ? (
          <img src={avatar} alt={name} className="rounded-full w-full h-full object-cover" />
        ) : (
          <span className="text-white/80">{initials}</span>
        )}
        {status !== 'idle' && (
          <span
            className={cn(
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900',
              status === 'thinking' && 'bg-amber-400',
              status === 'speaking' && 'bg-emerald-400'
            )}
          />
        )}
      </div>
    );
  }
);
AgentAvatar.displayName = 'AgentAvatar';
