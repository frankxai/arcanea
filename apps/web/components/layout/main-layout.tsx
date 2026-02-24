'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CosmicGradient } from '@/components/ui/cosmic-gradient';
import { type Academy } from '@/lib/theme-utils';

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  academy?: Academy;
  showGradient?: boolean;
  showGrid?: boolean;
}

export function MainLayout({
  children,
  className,
  academy = 'default',
  showGradient = true,
  showGrid = true,
}: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-cosmic-deep text-text-primary overflow-x-hidden">
      {/* Cosmic Background Effects */}
      {showGradient && (
        <CosmicGradient variant={academy} animated opacity={0.12} />
      )}

      {/* Cosmic Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Animated Particles (Optional - can be added with more components) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-bright/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.main
        className={cn('relative z-10', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
}

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function PageContainer({
  children,
  className,
  maxWidth = 'xl',
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 py-8',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}
