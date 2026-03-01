import * as React from 'react';
import { cn } from './utils';

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  variant?: 'default' | 'elevated' | 'interactive';
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, glowColor = 'rgba(124, 58, 237, 0.15)', intensity = 'medium', variant = 'default', children, ...props }, ref) => {
    const intensityMap = {
      subtle: '0 0 20px',
      medium: '0 0 40px',
      strong: '0 0 60px',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl',
          'transition-all duration-300',
          variant === 'interactive' && 'hover:border-white/20 hover:bg-white/8 cursor-pointer',
          variant === 'elevated' && 'shadow-2xl',
          className
        )}
        style={{
          boxShadow: `${intensityMap[intensity]} ${glowColor}`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlowCard.displayName = 'GlowCard';
