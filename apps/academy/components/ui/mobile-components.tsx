"use client";

/**
 * 📱 Arcanea Mobile-First Components
 * 
 * Comprehensive mobile-optimized components with touch-friendly interactions,
 * adaptive layouts, and platform-specific behaviors.
 */

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './icon-system';
import { GlassCard, GlassButton } from './glass-components';
import { useLuminor } from './luminor-system';

// ===== MOBILE DETECTION HOOK ===== //

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
      setOrientation(height > width ? 'portrait' : 'landscape');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
};

// ===== TOUCH GESTURES HOOK ===== //

interface TouchGestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchStart?: () => void;
  onPinchEnd?: () => void;
  onLongPress?: () => void;
}

export const useTouchGestures = (handlers: TouchGestureHandlers) => {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout>();

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // Start long press detection
    if (handlers.onLongPress) {
      longPressTimeoutRef.current = setTimeout(() => {
        handlers.onLongPress!();
      }, 500);
    }

    // Detect pinch start
    if (e.touches.length === 2 && handlers.onPinchStart) {
      handlers.onPinchStart();
    }
  };

  const handleTouchMove = () => {
    // Cancel long press on move
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Cancel long press
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    // Detect pinch end
    if (e.touches.length === 0 && handlers.onPinchEnd) {
      handlers.onPinchEnd();
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    const minSwipeDistance = 50;
    const maxSwipeTime = 500;

    if (deltaTime > maxSwipeTime) return;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > minSwipeDistance && absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0 && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      } else if (deltaX < 0 && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      }
    } else if (absDeltaY > minSwipeDistance && absDeltaY > absDeltaX) {
      // Vertical swipe
      if (deltaY > 0 && handlers.onSwipeDown) {
        handlers.onSwipeDown();
      } else if (deltaY < 0 && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      }
    }

    touchStartRef.current = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};

// ===== MOBILE NAVIGATION COMPONENTS ===== //

interface MobileTabBarProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: IconName;
    badge?: number;
    disabled?: boolean;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  const { isMobile } = useMobile();

  if (!isMobile) return null;

  return (
    <nav 
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-black/20 backdrop-blur-xl border-t border-white/10',
        'safe-area-bottom',
        className
      )}
      role="tablist"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative flex flex-col items-center justify-center',
              'min-w-[60px] p-2 rounded-xl transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-mystic-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              activeTab === tab.id
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            )}
          >
            <div className="relative">
              <Icon 
                name={tab.icon} 
                size="md" 
                className={cn(
                  'transition-transform duration-200',
                  activeTab === tab.id && 'scale-110'
                )}
              />
              
              {tab.badge && tab.badge > 0 && (
                <span 
                  className="absolute -top-2 -right-2 min-w-[18px] h-[18px] text-xs font-bold bg-red-500 text-white rounded-full flex items-center justify-center"
                  aria-label={`${tab.badge} notifications`}
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </div>
            
            <span className="text-xs font-medium mt-1 leading-none">
              {tab.label}
            </span>
            
            {activeTab === tab.id && (
              <motion.div
                className="absolute -top-0.5 left-1/2 w-8 h-1 bg-white rounded-full"
                layoutId="mobile-tab-indicator"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ x: '-50%' }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

// ===== SWIPEABLE CARD COMPONENT ===== //

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    icon: IconName;
    label: string;
    color: 'red' | 'green' | 'blue' | 'yellow';
  };
  rightAction?: {
    icon: IconName;
    label: string;
    color: 'red' | 'green' | 'blue' | 'yellow';
  };
  className?: string;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className,
}) => {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-300, -150, 0, 150, 300],
    [
      leftAction?.color === 'red' ? '#ef444480' : '#10b98180',
      leftAction?.color === 'red' ? '#ef444440' : '#10b98140',
      'transparent',
      rightAction?.color === 'red' ? '#ef444440' : '#10b98140',
      rightAction?.color === 'red' ? '#ef444480' : '#10b98180',
    ]
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 150;
    
    if (info.offset.x > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Action Indicators */}
      {leftAction && (
        <div className="absolute inset-y-0 left-0 flex items-center justify-center w-20 z-0">
          <div className="flex flex-col items-center text-white">
            <Icon name={leftAction.icon} size="lg" />
            <span className="text-xs font-medium mt-1">{leftAction.label}</span>
          </div>
        </div>
      )}
      
      {rightAction && (
        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-20 z-0">
          <div className="flex flex-col items-center text-white">
            <Icon name={rightAction.icon} size="lg" />
            <span className="text-xs font-medium mt-1">{rightAction.label}</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <motion.div
        className={cn('relative z-10 rounded-2xl', className)}
        style={{ x, background }}
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={{ left: 0.2, right: 0.2 }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ===== MOBILE SHEET COMPONENT ===== //

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  snapPoints?: number[];
  initialSnap?: number;
  className?: string;
}

export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  snapPoints = [0.3, 0.6, 0.9],
  initialSnap = 1,
  className,
}) => {
  const [snapIndex, setSnapIndex] = useState(initialSnap);
  const y = useMotionValue(0);
  const { isMobile } = useMobile();

  const handleDragEnd = (_: any, info: PanInfo) => {
    const currentHeight = window.innerHeight * snapPoints[snapIndex];
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Determine new snap position
    if (velocity > 500 || (velocity > 0 && offset > currentHeight * 0.3)) {
      // Snap down or close
      if (snapIndex > 0) {
        setSnapIndex(snapIndex - 1);
      } else {
        onClose();
      }
    } else if (velocity < -500 || (velocity < 0 && offset < -currentHeight * 0.3)) {
      // Snap up
      if (snapIndex < snapPoints.length - 1) {
        setSnapIndex(snapIndex + 1);
      }
    }
  };

  if (!isMobile || !isOpen) {
    return isOpen && !isMobile ? (
      // Fallback to modal on desktop
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className={cn('w-full max-w-lg mx-4 glass-primary rounded-2xl p-6', className)}>
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg">
                <Icon name="close" size="sm" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 glass-primary rounded-t-3xl',
              'safe-area-bottom',
              className
            )}
            style={{ y }}
            initial={{ y: '100%' }}
            animate={{ 
              y: `${100 - snapPoints[snapIndex] * 100}%`,
              transition: { type: 'spring', stiffness: 300, damping: 30 }
            }}
            exit={{ y: '100%' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={handleDragEnd}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-8 h-1 bg-white/30 rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Icon name="close" size="sm" className="text-white/60" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ===== MOBILE PULL TO REFRESH ===== //

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  className,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
      setShowIndicator(false);
    }
  };

  const touchGestures = useTouchGestures({
    onSwipeDown: () => {
      if (containerRef.current?.scrollTop === 0 && pullDistance >= threshold) {
        handleRefresh();
      }
    },
  });

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0 && !isRefreshing) {
      const touch = e.touches[0];
      const startY = touch.clientY;
      
      const handleMove = (moveEvent: TouchEvent) => {
        const currentY = moveEvent.touches[0].clientY;
        const distance = Math.max(0, Math.min(currentY - startY, threshold * 1.5));
        
        setPullDistance(distance);
        setShowIndicator(distance > 20);
      };

      const handleEnd = () => {
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    }

    touchGestures.onTouchMove?.(e);
  };

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-auto', className)}
      onTouchStart={touchGestures.onTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={touchGestures.onTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {(showIndicator || isRefreshing) && (
          <motion.div
            className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              transform: `translateY(${Math.min(pullDistance - 20, 40)}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Icon 
                name={isRefreshing ? 'magic' : 'arrowDown'} 
                size="sm" 
                effect={isRefreshing ? 'spin' : 'none'}
                className="text-white"
              />
              <span className="text-sm text-white">
                {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};

// ===== MOBILE TOUCH FEEDBACK ===== //

interface TouchFeedbackProps {
  children: React.ReactNode;
  haptic?: boolean;
  ripple?: boolean;
  className?: string;
}

export const TouchFeedback: React.FC<TouchFeedbackProps> = ({
  children,
  haptic = true,
  ripple = true,
  className,
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      
      const newRipple = {
        id: ++rippleIdRef.current,
        x,
        y,
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
  };

  return (
    <div 
      className={cn('relative overflow-hidden touch-manipulation', className)}
      onTouchStart={handleTouchStart}
    >
      {children}
      
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-10 h-10 bg-white/30 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ===== MOBILE SAFE AREA WRAPPER ===== //

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  className?: string;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full',
        top && 'pt-safe-top',
        bottom && 'pb-safe-bottom',
        left && 'pl-safe-left',
        right && 'pr-safe-right',
        className
      )}
      style={{
        paddingTop: top ? 'env(safe-area-inset-top)' : undefined,
        paddingBottom: bottom ? 'env(safe-area-inset-bottom)' : undefined,
        paddingLeft: left ? 'env(safe-area-inset-left)' : undefined,
        paddingRight: right ? 'env(safe-area-inset-right)' : undefined,
      }}
    >
      {children}
    </div>
  );
};

// ===== MOBILE RESPONSIVE GRID ===== //

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  className,
}) => {
  return (
    <div
      className={cn(
        'grid',
        // Mobile columns
        columns.mobile === 1 && 'grid-cols-1',
        columns.mobile === 2 && 'grid-cols-2',
        // Tablet columns
        columns.tablet === 2 && 'md:grid-cols-2',
        columns.tablet === 3 && 'md:grid-cols-3',
        columns.tablet === 4 && 'md:grid-cols-4',
        // Desktop columns
        columns.desktop === 2 && 'lg:grid-cols-2',
        columns.desktop === 3 && 'lg:grid-cols-3',
        columns.desktop === 4 && 'lg:grid-cols-4',
        columns.desktop === 5 && 'lg:grid-cols-5',
        // Gaps
        gap.mobile === 2 && 'gap-2',
        gap.mobile === 4 && 'gap-4',
        gap.mobile === 6 && 'gap-6',
        gap.tablet === 4 && 'md:gap-4',
        gap.tablet === 6 && 'md:gap-6',
        gap.tablet === 8 && 'md:gap-8',
        gap.desktop === 6 && 'lg:gap-6',
        gap.desktop === 8 && 'lg:gap-8',
        gap.desktop === 10 && 'lg:gap-10',
        className
      )}
    >
      {children}
    </div>
  );
};

// ===== EXPORT ALL ===== //

export {
  // Hooks
  useMobile,
  useTouchGestures,
  
  // Components
  MobileTabBar,
  SwipeableCard,
  MobileSheet,
  PullToRefresh,
  TouchFeedback,
  SafeAreaWrapper,
  ResponsiveGrid,
};