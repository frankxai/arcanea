'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Academy, getAcademyTheme } from '@/lib/theme-utils';

export interface AcademyBadgeProps {
  academy: Academy;
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  animated?: boolean;
  className?: string;
}

const AcademyBadge = React.forwardRef<HTMLDivElement, AcademyBadgeProps>(
  (
    {
      className,
      academy,
      size = 'md',
      glow = true,
      animated = true,
    },
    ref
  ) => {
    const theme = getAcademyTheme(academy);

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    const academyStyles = {
      default: {
        bg: 'bg-cosmic-surface',
        border: 'border-gold-medium',
        text: 'text-gold-bright',
        shadow: 'shadow-glow-sm',
      },
      atlantean: {
        bg: 'bg-atlantean-deep/30',
        border: 'border-atlantean-teal',
        text: 'text-atlantean-teal',
        shadow: 'shadow-atlantean',
      },
      draconic: {
        bg: 'bg-draconic-crimson-deep/30',
        border: 'border-draconic-gold',
        text: 'text-draconic-gold',
        shadow: 'shadow-draconic',
      },
      creation: {
        bg: 'bg-creation-gold-deep/20',
        border: 'border-creation-gold',
        text: 'text-creation-gold',
        shadow: 'shadow-creation',
      },
    };

    const styles = academyStyles[academy] || academyStyles.default;

    const baseClassName = cn(
      'inline-flex items-center gap-2 rounded-full border font-medium backdrop-blur-sm transition-all',
      sizeClasses[size],
      styles.bg,
      styles.border,
      styles.text,
      glow && styles.shadow,
      'hover:scale-105 cursor-default',
      className
    );

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg leading-none">{theme.icon}</span>
          <span>{theme.displayName}</span>
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClassName}>
        <span className="text-lg leading-none">{theme.icon}</span>
        <span>{theme.displayName}</span>
      </div>
    );
  }
);

AcademyBadge.displayName = 'AcademyBadge';

export { AcademyBadge };
