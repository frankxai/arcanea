'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 rounded-full font-sans font-medium',
    'transition-colors duration-150 select-none',
    'border',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]',
          'border-[rgba(127,255,212,0.12)] text-text-secondary',
        ],
        crystal: [
          'bg-crystal/10 border-crystal/30 text-crystal',
          'shadow-[0_0_8px_rgba(127,255,212,0.15)]',
        ],
        fire: [
          'bg-fire/10 border-fire/30 text-fire-bright',
          'shadow-[0_0_8px_rgba(255,107,53,0.15)]',
        ],
        water: [
          'bg-water/10 border-water/30 text-water-bright',
          'shadow-[0_0_8px_rgba(120,166,255,0.15)]',
        ],
        void: [
          'bg-[#9966ff]/10 border-[#9966ff]/30 text-[#b38cff]',
          'shadow-[0_0_8px_rgba(153,102,255,0.15)]',
        ],
        gold: [
          'bg-brand-gold/10 border-brand-gold/30 text-brand-gold',
          'shadow-[0_0_8px_rgba(255,215,0,0.15)]',
        ],
        outline: [
          'bg-transparent border-white/10 text-text-muted',
          'hover:border-crystal/30 hover:text-text-secondary',
        ],
        brand: [
          'bg-brand-primary/10 border-brand-primary/30 text-[#a78bfa]',
          'shadow-[0_0_8px_rgba(139,92,246,0.15)]',
        ],
      },
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      onDismiss,
      dismissLabel = 'Remove',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className="shrink-0 leading-none" aria-hidden="true">
            {icon}
          </span>
        )}

        <span>{children}</span>

        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            aria-label={dismissLabel}
            className={cn(
              'shrink-0 rounded-full p-0.5 -mr-0.5',
              'opacity-60 hover:opacity-100 transition-opacity',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crystal/60'
            )}
          >
            <X size={10} aria-hidden="true" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
