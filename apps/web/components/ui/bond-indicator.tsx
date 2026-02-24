'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as Progress from '@radix-ui/react-progress';

export interface BondIndicatorProps {
  level: number; // 1-50
  maxLevel?: number;
  showLabel?: boolean;
  animated?: boolean;
  variant?: 'compact' | 'detailed';
  className?: string;
}

const BondIndicator = React.forwardRef<HTMLDivElement, BondIndicatorProps>(
  (
    {
      className,
      level,
      maxLevel = 50,
      showLabel = true,
      animated = true,
      variant = 'compact',
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = Math.min((level / maxLevel) * 100, 100);

    // Determine bond tier for coloring
    const getBondTier = (lvl: number) => {
      if (lvl >= 50) return 'legendary';
      if (lvl >= 36) return 'master';
      if (lvl >= 21) return 'expert';
      if (lvl >= 11) return 'advanced';
      if (lvl >= 6) return 'intermediate';
      return 'novice';
    };

    const tier = getBondTier(level);

    const tierStyles = {
      novice: {
        bg: 'from-text-muted to-text-secondary',
        glow: 'shadow-sm',
        text: 'text-text-secondary',
      },
      intermediate: {
        bg: 'from-atlantean-primary to-atlantean-teal',
        glow: 'shadow-atlantean',
        text: 'text-atlantean-teal',
      },
      advanced: {
        bg: 'from-draconic-sky to-atlantean-teal',
        glow: 'shadow-info',
        text: 'text-draconic-sky-bright',
      },
      expert: {
        bg: 'from-draconic-gold to-gold-bright',
        glow: 'shadow-draconic',
        text: 'text-draconic-gold-bright',
      },
      master: {
        bg: 'from-draconic-crimson to-draconic-gold',
        glow: 'shadow-glow-lg',
        text: 'text-draconic-gold-bright',
      },
      legendary: {
        bg: 'from-creation-prism-purple via-creation-gold to-creation-prism-cyan',
        glow: 'shadow-creation animate-pulse-glow',
        text: 'text-creation-gold-pure text-glow-creation',
      },
    };

    const style = tierStyles[tier];

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-3', className)}
        >
          {showLabel && (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-text-secondary">
                Bond Level
              </span>
              <span className={cn('text-xl font-bold', style.text)}>
                {level}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-[100px]">
            <Progress.Root
              className="relative h-3 overflow-hidden rounded-full bg-cosmic-border"
              value={percentage}
            >
              <Progress.Indicator
                className={cn(
                  'h-full bg-gradient-to-r transition-all duration-500 ease-out',
                  style.bg,
                  style.glow
                )}
                style={{
                  transform: `translateX(-${100 - percentage}%)`,
                }}
              />
            </Progress.Root>
            {showLabel && (
              <div className="mt-1 flex justify-between text-xs text-text-muted">
                <span>{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                <span>{percentage.toFixed(0)}%</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Detailed variant
    return (
      <motion.div
        ref={ref}
        className={cn('space-y-3', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-text-secondary">
              Guardian Bond Level
            </h4>
            <p className={cn('text-3xl font-bold', style.text)}>{level}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted uppercase tracking-wider">
              {tier}
            </p>
            <p className="text-sm text-text-secondary">
              {level}/{maxLevel}
            </p>
          </div>
        </div>

        <Progress.Root
          className="relative h-4 overflow-hidden rounded-full bg-cosmic-border"
          value={percentage}
        >
          <motion.div
            className={cn(
              'h-full bg-gradient-to-r',
              style.bg,
              style.glow
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </Progress.Root>

        <div className="flex justify-between text-xs text-text-muted">
          <span>Novice (1)</span>
          <span>Legendary (50)</span>
        </div>

        {/* Milestone markers */}
        <div className="flex justify-between relative h-2">
          {[0, 6, 11, 21, 36, 50].map((milestone) => (
            <div
              key={milestone}
              className={cn(
                'h-2 w-2 rounded-full border-2 border-cosmic-deep',
                level >= milestone
                  ? 'bg-gold-bright shadow-glow-sm'
                  : 'bg-cosmic-border'
              )}
              style={{
                left: `${(milestone / maxLevel) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }
);

BondIndicator.displayName = 'BondIndicator';

export { BondIndicator };
