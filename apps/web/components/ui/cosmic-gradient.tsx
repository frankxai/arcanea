'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Academy } from '@/lib/theme-utils';

export interface CosmicGradientProps {
  variant?: 'cosmic' | Academy;
  animated?: boolean;
  opacity?: number;
  className?: string;
}

const CosmicGradient = React.forwardRef<HTMLDivElement, CosmicGradientProps>(
  (
    {
      className,
      variant = 'cosmic',
      animated = true,
      opacity = 0.15,
    },
    ref
  ) => {
    const gradientVariants = {
      cosmic:
        'bg-gradient-to-br from-crystal/20 via-brand-gold/20 to-fire/20',
      default:
        'bg-gradient-to-br from-crystal/20 via-brand-gold/20 to-fire/20',
      atlantean:
        'bg-gradient-to-br from-atlantean-deep via-atlantean-primary to-crystal',
      draconic:
        'bg-gradient-to-br from-fire via-draconic-gold to-draconic-sky',
      creation:
        'bg-gradient-to-br from-creation-gold via-creation-prism-blue to-brand-primary',
    };

    const baseClassName = cn(
      'absolute inset-0 -z-10',
      gradientVariants[variant],
      'bg-[length:200%_200%]',
      className
    );

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          style={{ opacity }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      );
    }

    return (
      <div ref={ref} className={baseClassName} style={{ opacity }} />
    );
  }
);

CosmicGradient.displayName = 'CosmicGradient';

export { CosmicGradient };
