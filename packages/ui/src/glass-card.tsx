import * as React from 'react';
import { cn } from './utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tint?: 'neutral' | 'purple' | 'emerald' | 'cyan' | 'amber';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

const tintColors = {
  neutral: 'bg-white/5 border-white/10',
  purple: 'bg-purple-500/5 border-purple-500/15',
  emerald: 'bg-emerald-500/5 border-emerald-500/15',
  cyan: 'bg-cyan-500/5 border-cyan-500/15',
  amber: 'bg-amber-500/5 border-amber-500/15',
};

const blurLevels = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, tint = 'neutral', blur = 'xl', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border',
          tintColors[tint],
          blurLevels[blur],
          'transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';
