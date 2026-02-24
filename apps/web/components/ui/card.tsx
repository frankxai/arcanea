'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants ────────────────────────────────────────────────────────────────

const cardVariants = cva(
  [
    'rounded-2xl border transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/40',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]',
          'border-[rgba(127,255,212,0.12)]',
        ],
        'glass-subtle': [
          'bg-[rgba(26,35,50,0.45)] backdrop-blur-[12px]',
          'border-[rgba(127,255,212,0.08)]',
        ],
        'liquid-glass': [
          'bg-[rgba(18,24,38,0.85)] backdrop-blur-[20px]',
          'border-[rgba(127,255,212,0.18)]',
          'shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]',
        ],
        iridescent: [
          'bg-[rgba(18,24,38,0.75)] backdrop-blur-[16px]',
          'border-[rgba(127,255,212,0.15)]',
          'overflow-hidden',
          // Shimmer layer handled by after pseudo
          'relative',
          'after:absolute after:inset-0 after:pointer-events-none',
          'after:bg-gradient-to-br after:from-[rgba(127,255,212,0.04)] after:via-transparent after:to-[rgba(139,92,246,0.04)]',
          'after:animate-iridescent-shift after:opacity-60',
        ],
        bordered: [
          'bg-transparent',
          'border-[rgba(127,255,212,0.20)]',
        ],
      },
      hoverLift: {
        true: 'hover:-translate-y-1 hover:shadow-elevation-3 cursor-pointer',
        false: '',
      },
      glowOnHover: {
        true: 'hover:border-crystal/30 hover:shadow-glow-sm',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hoverLift: false,
      glowOnHover: false,
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'ref' | 'children'>,
    VariantProps<typeof cardVariants> {
  animated?: boolean;
  children?: React.ReactNode;
}

// ─── Card root ───────────────────────────────────────────────────────────────

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant,
      hoverLift,
      glowOnHover,
      animated = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(cardVariants({ variant, hoverLift, glowOnHover }), className);

    if (animated) {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 26,
            mass: 0.7,
          }}
          className={classes}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ─── Sub-components ───────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 p-6 pb-4',
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-display font-semibold text-lg text-text-primary tracking-wide leading-snug',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-muted font-sans leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pb-6 pt-0', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-6 pb-6 pt-4',
        'border-t border-[rgba(127,255,212,0.08)] mt-auto gap-3',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// ─── Image slot ───────────────────────────────────────────────────────────────

const CardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative overflow-hidden rounded-t-2xl', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardImage.displayName = 'CardImage';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  cardVariants,
};
