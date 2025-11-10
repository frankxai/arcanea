'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Academy } from '@/lib/theme-utils';

export interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Academy | 'cosmic';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

const GlowEffect = React.forwardRef<HTMLDivElement, GlowEffectProps>(
  (
    {
      className,
      variant = 'cosmic',
      intensity = 'medium',
      animated = true,
      children,
      ...props
    },
    ref
  ) => {
    const glowColors = {
      cosmic: 'rgba(255, 204, 51, 0.4)',
      default: 'rgba(255, 204, 51, 0.4)',
      atlantean: 'rgba(38, 204, 204, 0.4)',
      draconic: 'rgba(255, 198, 26, 0.4)',
      creation: 'rgba(255, 230, 128, 0.4)',
    };

    const intensityValues = {
      low: { blur: 20, spread: 0 },
      medium: { blur: 30, spread: 5 },
      high: { blur: 40, spread: 10 },
    };

    const { blur, spread } = intensityValues[intensity];
    const color = glowColors[variant];

    const AnimatedWrapper = animated ? motion.div : 'div';
    const animationProps = animated
      ? {
          animate: {
            boxShadow: [
              `0 0 ${blur}px ${spread}px ${color}`,
              `0 0 ${blur * 1.5}px ${spread * 1.5}px ${color}`,
              `0 0 ${blur}px ${spread}px ${color}`,
            ],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }
      : {
          style: {
            boxShadow: `0 0 ${blur}px ${spread}px ${color}`,
          },
        };

    return (
      <AnimatedWrapper
        ref={ref}
        className={cn('relative', className)}
        {...animationProps}
        {...props}
      >
        {children}
      </AnimatedWrapper>
    );
  }
);

GlowEffect.displayName = 'GlowEffect';

export { GlowEffect };
