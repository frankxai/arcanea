'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cosmicFadeIn, cosmicGlow } from '@/lib/animations';

export interface CosmicCardProps {
  glow?: boolean;
  shimmer?: boolean;
  glass?: boolean;
  academy?: 'atlantean' | 'draconic' | 'creation';
  children: React.ReactNode;
  className?: string;
}

const CosmicCard = React.forwardRef<HTMLDivElement, CosmicCardProps>(
  (
    {
      className,
      glow = false,
      shimmer = false,
      glass = false,
      academy,
      children,
    },
    ref
  ) => {
    const academyClasses = {
      atlantean: 'border-atlantean-teal/30 hover:border-atlantean-teal/60',
      draconic: 'border-draconic-gold/30 hover:border-draconic-gold/60',
      creation: 'border-creation-gold/30 hover:border-creation-gold/60',
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={cosmicFadeIn}
        whileHover={glow ? 'hover' : undefined}
        className={cn(
          'rounded-lg border p-6 transition-all',
          glass
            ? 'glass'
            : 'bg-cosmic-surface border-cosmic-border hover:bg-cosmic-raised',
          shimmer && 'shimmer',
          academy && academyClasses[academy],
          glow && 'hover:shadow-glow-md',
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

CosmicCard.displayName = 'CosmicCard';

const CosmicCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CosmicCardHeader.displayName = 'CosmicCardHeader';

const CosmicCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
));
CosmicCardTitle.displayName = 'CosmicCardTitle';

const CosmicCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
CosmicCardDescription.displayName = 'CosmicCardDescription';

const CosmicCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-4', className)} {...props} />
));
CosmicCardContent.displayName = 'CosmicCardContent';

const CosmicCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
CosmicCardFooter.displayName = 'CosmicCardFooter';

export {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardTitle,
  CosmicCardDescription,
  CosmicCardContent,
  CosmicCardFooter,
};
