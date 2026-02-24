import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants ────────────────────────────────────────────────────────────────

const spinnerVariants = cva(
  [
    'inline-block rounded-full',
    'border-2',
    'border-[rgba(127,255,212,0.15)]',
    'border-t-crystal',
    'animate-spin',
  ],
  {
    variants: {
      size: {
        xs: 'w-3 h-3 border-[1.5px]',
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-[3px]',
        xl: 'w-12 h-12 border-4',
      },
      variant: {
        crystal: 'border-t-crystal',
        fire: 'border-t-fire border-[rgba(255,107,53,0.15)]',
        water: 'border-t-water border-[rgba(120,166,255,0.15)]',
        void: 'border-t-[#9966ff] border-[rgba(153,102,255,0.15)]',
        gold: 'border-t-brand-gold border-[rgba(255,215,0,0.15)]',
        brand: 'border-t-brand-primary border-[rgba(139,92,246,0.15)]',
        white: 'border-t-white border-[rgba(255,255,255,0.15)]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'crystal',
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, variant, label = 'Loading...', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(spinnerVariants({ size, variant }))}
        />
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';

// ─── Spinner with label ───────────────────────────────────────────────────────

export interface SpinnerWithLabelProps extends SpinnerProps {
  showLabel?: boolean;
  labelPosition?: 'right' | 'bottom';
}

const SpinnerWithLabel = React.forwardRef<HTMLDivElement, SpinnerWithLabelProps>(
  (
    {
      size,
      variant,
      label = 'Loading...',
      showLabel = true,
      labelPosition = 'right',
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2',
          labelPosition === 'bottom' && 'flex-col gap-1.5',
          className
        )}
        role="status"
        aria-label={label}
      >
        <Spinner size={size} variant={variant} label={label} />
        {showLabel && (
          <span className="text-sm text-text-muted font-sans" aria-hidden="true">
            {label}
          </span>
        )}
      </div>
    );
  }
);

SpinnerWithLabel.displayName = 'SpinnerWithLabel';

export { Spinner, SpinnerWithLabel, spinnerVariants };
