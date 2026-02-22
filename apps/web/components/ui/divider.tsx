import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants ────────────────────────────────────────────────────────────────

const dividerVariants = cva('', {
  variants: {
    variant: {
      solid: 'bg-[rgba(127,255,212,0.10)]',
      gradient: 'bg-gradient-to-r from-transparent via-[rgba(127,255,212,0.20)] to-transparent',
      dotted: '',
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
  defaultVariants: {
    variant: 'solid',
    orientation: 'horizontal',
  },
});

// ─── Props ───────────────────────────────────────────────────────────────────

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string;
  labelClassName?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      variant = 'solid',
      orientation = 'horizontal',
      label,
      labelClassName,
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';
    const isDotted = variant === 'dotted';

    // Dotted uses border-style
    if (isDotted) {
      if (!isHorizontal) {
        return (
          <div
            ref={ref}
            role="separator"
            aria-orientation="vertical"
            className={cn(
              'w-px border-l border-dotted border-[rgba(127,255,212,0.15)] h-full',
              className
            )}
            {...props}
          />
        );
      }

      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-3 w-full', className)}
          {...props}
        >
          <div className="flex-1 border-t border-dotted border-[rgba(127,255,212,0.15)]" aria-hidden="true" />
          {label && (
            <span className={cn('shrink-0 text-xs text-text-muted font-sans select-none', labelClassName)}>
              {label}
            </span>
          )}
          {label && <div className="flex-1 border-t border-dotted border-[rgba(127,255,212,0.15)]" aria-hidden="true" />}
        </div>
      );
    }

    // Vertical
    if (!isHorizontal) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            'w-px self-stretch',
            dividerVariants({ variant, orientation }),
            className
          )}
          {...props}
        />
      );
    }

    // Horizontal (default)
    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            'h-px',
            dividerVariants({ variant, orientation }),
            className
          )}
          {...props}
        />
      );
    }

    // Horizontal with label
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3 w-full', className)}
        {...props}
      >
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-hidden="true"
          className={cn('flex-1 h-px', dividerVariants({ variant, orientation }))}
        />
        <span
          className={cn(
            'shrink-0 text-xs text-text-muted font-sans px-1 select-none',
            labelClassName
          )}
        >
          {label}
        </span>
        <div
          aria-hidden="true"
          className={cn('flex-1 h-px', dividerVariants({ variant, orientation }))}
        />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

export { Divider, dividerVariants };
