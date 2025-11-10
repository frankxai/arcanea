'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Academy } from '@/lib/theme-utils';

export interface CosmicGradientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cosmic' | Academy;
  animated?: boolean;
  opacity?: number;
}

const CosmicGradient = React.forwardRef<HTMLDivElement, CosmicGradientProps>(
  (
    {
      className,
      variant = 'cosmic',
      animated = true,
      opacity = 0.15,
      ...props
    },
    ref
  ) => {
    const gradientVariants = {
      cosmic:
        'bg-gradient-to-br from-atlantean-teal/20 via-gold-bright/20 to-draconic-crimson/20',
      default:
        'bg-gradient-to-br from-atlantean-teal/20 via-gold-bright/20 to-draconic-crimson/20',
      atlantean:
        'bg-gradient-to-br from-atlantean-deep via-atlantean-primary to-atlantean-teal',
      draconic:
        'bg-gradient-to-br from-draconic-crimson via-draconic-gold to-draconic-sky',
      creation:
        'bg-gradient-to-br from-creation-gold via-creation-prism-blue to-creation-prism-purple',
    };

    const AnimatedWrapper = animated ? motion.div : 'div';
    const animationProps = animated
      ? {
          animate: {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          },
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }
      : {};

    return (
      <AnimatedWrapper
        ref={ref}
        className={cn(
          'absolute inset-0 -z-10',
          gradientVariants[variant],
          'bg-[length:200%_200%]',
          className
        )}
        style={{ opacity }}
        {...animationProps}
        {...props}
      />
    );
  }
);

CosmicGradient.displayName = 'CosmicGradient';

export { CosmicGradient };
