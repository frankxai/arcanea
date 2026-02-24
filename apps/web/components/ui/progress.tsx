import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants ────────────────────────────────────────────────────────────────

const progressTrackVariants = cva(
  [
    'relative w-full overflow-hidden rounded-full',
    'bg-cosmic-raised border border-[rgba(127,255,212,0.08)]',
  ],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressFillVariants = cva(
  [
    'h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        crystal: [
          'bg-gradient-to-r from-crystal-deep via-crystal to-crystal-bright',
          'shadow-[0_0_8px_rgba(127,255,212,0.5)]',
        ],
        fire: [
          'bg-gradient-to-r from-fire-deep via-fire to-fire-bright',
          'shadow-[0_0_8px_rgba(255,107,53,0.5)]',
        ],
        water: [
          'bg-gradient-to-r from-water-deep via-water to-water-bright',
          'shadow-[0_0_8px_rgba(120,166,255,0.5)]',
        ],
        void: [
          'bg-gradient-to-r from-[#7a4dcc] via-[#9966ff] to-[#b38cff]',
          'shadow-[0_0_8px_rgba(153,102,255,0.5)]',
        ],
        gold: [
          'bg-gradient-to-r from-[#b8860b] via-brand-gold to-[#ffe44d]',
          'shadow-[0_0_8px_rgba(255,215,0,0.5)]',
        ],
        brand: [
          'bg-gradient-to-r from-[#7c3aed] via-brand-primary to-[#a78bfa]',
          'shadow-[0_0_8px_rgba(139,92,246,0.5)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'crystal',
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressFillVariants>,
    VariantProps<typeof progressTrackVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'crystal',
      size = 'md',
      showLabel = false,
      label,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = Math.round((clampedValue / max) * 100);
    const labelText = label ?? `${percentage}%`;

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-text-muted font-sans">{labelText}</span>
            <span className="text-xs text-text-muted font-mono tabular-nums">
              {percentage}%
            </span>
          </div>
        )}

        <div
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label ?? `Progress: ${percentage}%`}
          className={cn(progressTrackVariants({ size }))}
        >
          <div
            className={cn(
              progressFillVariants({ variant }),
              animated && 'after:absolute after:inset-0 after:animate-shimmer',
              'after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress, progressTrackVariants, progressFillVariants };
