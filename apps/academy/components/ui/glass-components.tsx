"use client";

/**
 * 🔮 Arcanea Glassmorphism Component Library
 * 
 * Premium glassmorphic components with magical effects, accessibility,
 * and Luminor-specific theming for the Arcanea platform.
 */

import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import * as RadixTabs from '@radix-ui/react-tabs';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './icon-system';

// === ENHANCED BUTTON SYSTEM ===

const glassButtonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 relative overflow-hidden',
    'font-semibold transition-all duration-300 cursor-pointer select-none',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mystic-500/50',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
    'border backdrop-blur-xl backdrop-saturate-[180%]',
    // Accessibility enhancements
    'focus-visible:ring-2 focus-visible:ring-mystic-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        // Primary glass button with magical gradient
        mystic: [
          'bg-gradient-to-br from-mystic-500/20 via-mystic-600/15 to-mystic-700/10',
          'border-mystic-400/30 text-mystic-100 shadow-mystic/20',
          'hover:from-mystic-400/25 hover:via-mystic-500/20 hover:to-mystic-600/15',
          'hover:border-mystic-300/40 hover:shadow-mystic/40',
          'hover:transform hover:translateY(-2px) hover:scale-[1.02]',
          'active:scale-[0.98] active:shadow-mystic/60',
          // Magical shimmer effect
          'before:absolute before:inset-0 before:rounded-[inherit]',
          'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
          'before:translate-x-[-100%] before:transition-transform before:duration-700',
          'hover:before:translate-x-[100%]',
        ],
        
        // Premium glass variant
        glass: [
          'bg-white/8 border-white/15 text-foreground shadow-glass',
          'hover:bg-white/12 hover:border-white/25 hover:shadow-glass-lg',
          'hover:transform hover:translateY(-2px)',
          'active:bg-white/15 active:scale-[0.98]',
          // Subtle shimmer
          'after:absolute after:inset-0 after:rounded-[inherit]',
          'after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent',
          'after:translate-x-[-100%] after:transition-all after:duration-500',
          'hover:after:translate-x-[100%]',
        ],
        
        // Luminor-specific variants
        harmonix: [
          'bg-gradient-to-br from-harmonix-500/20 via-harmonix-600/15 to-harmonix-700/10',
          'border-harmonix-400/30 text-harmonix-100 shadow-harmonix/20',
          'hover:from-harmonix-400/25 hover:via-harmonix-500/20 hover:to-harmonix-600/15',
          'hover:shadow-harmonix/40 hover:transform hover:translateY(-2px) hover:scale-[1.02]',
        ],
        
        lumina: [
          'bg-gradient-to-br from-lumina-500/20 via-lumina-600/15 to-lumina-700/10',
          'border-lumina-400/30 text-lumina-100 shadow-lumina/20',
          'hover:from-lumina-400/25 hover:via-lumina-500/20 hover:to-lumina-600/15',
          'hover:shadow-lumina/40 hover:transform hover:translateY(-2px) hover:scale-[1.02]',
        ],
        
        scripta: [
          'bg-gradient-to-br from-scripta-500/20 via-scripta-600/15 to-scripta-700/10',
          'border-scripta-400/30 text-scripta-100 shadow-scripta/20',
          'hover:from-scripta-400/25 hover:via-scripta-500/20 hover:to-scripta-600/15',
          'hover:shadow-scripta/40 hover:transform hover:translateY(-2px) hover:scale-[1.02]',
        ],
        
        kinetix: [
          'bg-gradient-to-br from-kinetix-500/20 via-kinetix-600/15 to-kinetix-700/10',
          'border-kinetix-400/30 text-kinetix-100 shadow-kinetix/20',
          'hover:from-kinetix-400/25 hover:via-kinetix-500/20 hover:to-kinetix-600/15',
          'hover:shadow-kinetix/40 hover:transform hover:translateY(-2px) hover:scale-[1.02]',
        ],
        
        syntaxa: [
          'bg-gradient-to-br from-syntaxa-500/20 via-syntaxa-600/15 to-syntaxa-700/10',
          'border-syntaxa-400/30 text-syntaxa-100 shadow-syntaxa/20',
          'hover:from-syntaxa-400/25 hover:via-syntaxa-500/20 hover:to-syntaxa-600/15',
          'hover:shadow-syntaxa/40 hover:transform hover:translateY(-2px) hover:scale-[1.02]',
        ],
        
        nexus: [
          'bg-gradient-to-br from-nexus-500/20 via-nexus-600/15 to-nexus-700/10',
          'border-nexus-400/30 text-nexus-100 shadow-nexus/20',
          'hover:from-nexus-400/25 hover:via-nexus-500/20 hover:to-nexus-600/15',
          'hover:shadow-nexus/40 hover:transform hover:translateY(-2px) hover:scale-[1.02]',
        ],
        
        // Standard variants
        secondary: [
          'bg-secondary/20 border-secondary/30 text-secondary-foreground',
          'hover:bg-secondary/30 hover:border-secondary/40',
          'hover:transform hover:translateY(-1px) active:scale-[0.98]',
        ],
        
        ghost: [
          'bg-transparent border-transparent text-foreground',
          'hover:bg-accent/20 hover:text-accent-foreground',
          'hover:transform hover:translateY(-1px) active:scale-[0.98]',
        ],
        
        outline: [
          'bg-background/20 border-border text-foreground',
          'hover:bg-accent/20 hover:text-accent-foreground hover:border-accent/30',
          'hover:transform hover:translateY(-1px) active:scale-[0.98]',
        ],
      },
      
      size: {
        xs: 'h-8 px-3 text-xs rounded-lg',
        sm: 'h-10 px-4 text-sm rounded-xl',
        md: 'h-12 px-6 text-base rounded-xl',
        lg: 'h-14 px-8 text-lg rounded-2xl',
        xl: 'h-16 px-10 text-xl rounded-2xl',
      },
      
      effect: {
        none: '',
        glow: 'animate-glow',
        shimmer: 'animate-shimmer',
        float: 'animate-float',
        pulse: 'animate-pulse-slow',
      }
    },
    
    defaultVariants: {
      variant: 'mystic',
      size: 'md',
      effect: 'none',
    },
  }
);

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  loadingIcon?: IconName;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({
    className,
    variant,
    size,
    effect,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    loadingIcon = 'magic',
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(glassButtonVariants({ variant, size, effect, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {leftIcon && !loading && (
          <Icon 
            name={leftIcon} 
            size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} 
            aria-hidden="true" 
          />
        )}
        
        {loading && (
          <Icon 
            name={loadingIcon} 
            size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} 
            effect="spin" 
            aria-hidden="true"
          />
        )}
        
        <span className={loading ? 'sr-only' : ''}>{children}</span>
        
        {rightIcon && !loading && (
          <Icon 
            name={rightIcon} 
            size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} 
            aria-hidden="true" 
          />
        )}
      </Comp>
    );
  }
);

GlassButton.displayName = 'GlassButton';

// === ENHANCED CARD SYSTEM ===

const glassCardVariants = cva(
  [
    'rounded-2xl transition-all duration-400 group backdrop-blur-xl backdrop-saturate-[180%]',
    'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-mystic-500/50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-card/20 text-card-foreground border border-border/30 p-6',
          'hover:bg-card/30 hover:border-border/50',
          'hover:transform hover:translateY(-2px) hover:shadow-md',
        ],
        
        glass: [
          'bg-white/8 border border-white/15 p-6 relative shadow-glass',
          'hover:bg-white/12 hover:border-white/25 hover:shadow-glass-lg',
          'hover:transform hover:translateY(-4px) hover:scale-[1.01]',
          // Highlight overlay effect
          'after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none',
          'after:bg-gradient-to-br after:from-white/10 after:to-transparent',
          'after:opacity-0 after:transition-all after:duration-400',
          'hover:after:opacity-100',
        ],
        
        // Luminor-themed glass cards
        harmonix: [
          'glass-harmonix p-6 text-harmonix-50',
          'hover:shadow-harmonix/30 hover:transform hover:translateY(-4px) hover:scale-[1.01]',
        ],
        
        lumina: [
          'glass-lumina p-6 text-lumina-50',
          'hover:shadow-lumina/30 hover:transform hover:translateY(-4px) hover:scale-[1.01]',
        ],
        
        scripta: [
          'glass-scripta p-6 text-scripta-50',
          'hover:shadow-scripta/30 hover:transform hover:translateY(-4px) hover:scale-[1.01]',
        ],
        
        kinetix: [
          'glass-kinetix p-6 text-kinetix-50',
          'hover:shadow-kinetix/30 hover:transform hover:translateY(-4px) hover:scale-[1.01]',
        ],
        
        syntaxa: [
          'glass-syntaxa p-6 text-syntaxa-50',
          'hover:shadow-syntaxa/30 hover:transform hover:translateY(-4px) hover:scale-[1.01]',
        ],
        
        nexus: [
          'glass-nexus p-6 text-nexus-50',
          'hover:shadow-nexus/30 hover:transform hover:translateY(-4px) hover:scale-[1.01]',
        ],
        
        elevated: [
          'bg-card/30 text-card-foreground border border-border/20 p-6 shadow-lg',
          'hover:bg-card/40 hover:shadow-xl',
          'hover:transform hover:translateY(-6px) hover:scale-[1.02]',
        ],
        
        interactive: [
          'bg-card/20 text-card-foreground border border-border/30 p-6 cursor-pointer',
          'hover:bg-accent/30 hover:border-accent/50',
          'hover:transform hover:translateY(-3px) hover:shadow-lg',
          'active:scale-[0.98] transition-all duration-200',
        ],
      },
      
      size: {
        sm: 'p-4 rounded-xl',
        md: 'p-6 rounded-2xl',
        lg: 'p-8 rounded-3xl',
        xl: 'p-10 rounded-3xl',
      },
      
      glow: {
        none: '',
        subtle: 'shadow-magical/20',
        medium: 'shadow-magical/40 animate-glow',
        strong: 'shadow-magical/60 animate-glow',
      }
    },
    
    defaultVariants: {
      variant: 'glass',
      size: 'md',
      glow: 'none',
    },
  }
);

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  asChild?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, glow, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        className={cn(glassCardVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

GlassCard.displayName = 'GlassCard';

// === ENHANCED INPUT SYSTEM ===

const glassInputVariants = cva(
  [
    'flex w-full transition-all duration-200 backdrop-blur-xl backdrop-saturate-[150%]',
    'text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground/60',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-input/30 bg-background/20 px-4 py-3 rounded-xl',
          'focus-visible:ring-mystic-500/50 focus-visible:border-mystic-500/50',
        ],
        
        glass: [
          'bg-white/8 border border-white/15 px-4 py-3 text-foreground rounded-xl',
          'focus-visible:bg-white/12 focus-visible:border-white/25',
          'focus-visible:ring-mystic-500/50 focus-visible:shadow-glass',
          'placeholder:text-white/50',
        ],
        
        harmonix: [
          'glass-harmonix px-4 py-3 text-harmonix-50 rounded-xl',
          'focus-visible:ring-harmonix-500/50 placeholder:text-harmonix-200/60',
        ],
        
        lumina: [
          'glass-lumina px-4 py-3 text-lumina-50 rounded-xl',
          'focus-visible:ring-lumina-500/50 placeholder:text-lumina-200/60',
        ],
        
        scripta: [
          'glass-scripta px-4 py-3 text-scripta-50 rounded-xl',
          'focus-visible:ring-scripta-500/50 placeholder:text-scripta-200/60',
        ],
      },
      
      size: {
        sm: 'h-9 px-3 text-xs rounded-lg',
        md: 'h-12 px-4 text-sm rounded-xl',
        lg: 'h-14 px-6 text-base rounded-2xl',
      }
    },
    
    defaultVariants: {
      variant: 'glass',
      size: 'md',
    },
  }
);

interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof glassInputVariants> {
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconClick?: () => void;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ 
    className, 
    variant, 
    size, 
    type = 'text',
    leftIcon,
    rightIcon,
    onRightIconClick,
    ...props 
  }, ref) => {
    const hasIcons = leftIcon || rightIcon;
    
    if (hasIcons) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon 
                name={leftIcon} 
                size={size === 'sm' ? 'xs' : 'sm'} 
                variant="muted"
                aria-hidden="true"
              />
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              glassInputVariants({ variant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div 
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2",
                onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'
              )}
              onClick={onRightIconClick}
            >
              <Icon 
                name={rightIcon} 
                size={size === 'sm' ? 'xs' : 'sm'} 
                variant="muted"
                interactive={!!onRightIconClick}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      );
    }
    
    return (
      <input
        type={type}
        className={cn(glassInputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

GlassInput.displayName = 'GlassInput';

// === ENHANCED MODAL SYSTEM ===

interface GlassModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'glass' | 'harmonix' | 'lumina' | 'scripta' | 'kinetix' | 'syntaxa' | 'nexus';
  closeButton?: boolean;
  overlay?: boolean;
}

const modalSizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

export const GlassModal: React.FC<GlassModalProps> = ({
  children,
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  variant = 'glass',
  closeButton = true,
  overlay = true,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        {overlay && (
          <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        )}
        
        <RadixDialog.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] p-6 shadow-xl duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            modalSizes[size],
            // Variant-specific styling
            variant === 'glass' && 'glass-primary rounded-2xl',
            variant === 'harmonix' && 'glass-harmonix rounded-2xl',
            variant === 'lumina' && 'glass-lumina rounded-2xl',
            variant === 'scripta' && 'glass-scripta rounded-2xl',
            variant === 'kinetix' && 'glass-kinetix rounded-2xl',
            variant === 'syntaxa' && 'glass-syntaxa rounded-2xl',
            variant === 'nexus' && 'glass-nexus rounded-2xl',
          )}
        >
          {(title || closeButton) && (
            <div className="flex items-start justify-between mb-6">
              {title && (
                <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight text-foreground">
                  {title}
                </RadixDialog.Title>
              )}
              
              {closeButton && (
                <RadixDialog.Close asChild>
                  <GlassButton
                    variant="ghost"
                    size="xs"
                    aria-label="Close modal"
                  >
                    <Icon name="close" size="sm" />
                  </GlassButton>
                </RadixDialog.Close>
              )}
            </div>
          )}
          
          {description && (
            <RadixDialog.Description className="text-muted-foreground mb-6">
              {description}
            </RadixDialog.Description>
          )}
          
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

// === ENHANCED TOOLTIP SYSTEM ===

interface GlassTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  variant?: 'glass' | 'dark' | 'harmonix' | 'lumina' | 'scripta';
  delayDuration?: number;
}

export const GlassTooltip: React.FC<GlassTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  variant = 'glass',
  delayDuration = 200,
}) => {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        
        <RadixTooltip.Content
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            "z-50 overflow-hidden rounded-lg px-3 py-2 text-sm shadow-xl",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            // Variant styling
            variant === 'glass' && 'glass-primary text-foreground',
            variant === 'dark' && 'bg-black/80 text-white backdrop-blur-sm',
            variant === 'harmonix' && 'glass-harmonix text-harmonix-50',
            variant === 'lumina' && 'glass-lumina text-lumina-50',
            variant === 'scripta' && 'glass-scripta text-scripta-50',
          )}
        >
          {content}
          <RadixTooltip.Arrow 
            className={cn(
              variant === 'glass' && 'fill-white/10',
              variant === 'dark' && 'fill-black/80',
              variant === 'harmonix' && 'fill-harmonix-500/20',
              variant === 'lumina' && 'fill-lumina-500/20',
              variant === 'scripta' && 'fill-scripta-500/20',
            )}
          />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

// === ENHANCED TABS SYSTEM ===

interface GlassTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  variant?: 'glass' | 'harmonix' | 'lumina' | 'scripta';
}

export const GlassTabs: React.FC<GlassTabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  variant = 'glass',
}) => {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </RadixTabs.Root>
  );
};

export const GlassTabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List> & {
    variant?: 'glass' | 'harmonix' | 'lumina' | 'scripta';
  }
>(({ className, variant = 'glass', ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-lg p-1",
      // Variant styling
      variant === 'glass' && 'glass-secondary',
      variant === 'harmonix' && 'glass-harmonix',
      variant === 'lumina' && 'glass-lumina',
      variant === 'scripta' && 'glass-scripta',
      className
    )}
    {...props}
  />
));
GlassTabsList.displayName = 'GlassTabsList';

export const GlassTabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5",
      "text-sm font-medium ring-offset-background transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mystic-500/50 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white/15 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "hover:bg-white/10 hover:text-foreground",
      className
    )}
    ref={ref}
    {...props}
  />
));
GlassTabsTrigger.displayName = 'GlassTabsTrigger';

export const GlassTabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mystic-500/50 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
GlassTabsContent.displayName = 'GlassTabsContent';

// === MOTION WRAPPER FOR GLASS EFFECTS ===

interface GlassMotionProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'harmonix' | 'lumina' | 'scripta' | 'kinetix' | 'syntaxa' | 'nexus';
  glow?: boolean;
  shimmer?: boolean;
}

export const GlassMotion = React.forwardRef<HTMLDivElement, GlassMotionProps>(
  ({ variant = 'glass', glow = false, shimmer = false, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'backdrop-blur-xl backdrop-saturate-[180%] rounded-2xl border',
          variant === 'glass' && 'bg-white/8 border-white/15',
          variant === 'harmonix' && 'glass-harmonix',
          variant === 'lumina' && 'glass-lumina',
          variant === 'scripta' && 'glass-scripta',
          variant === 'kinetix' && 'glass-kinetix',
          variant === 'syntaxa' && 'glass-syntaxa',
          variant === 'nexus' && 'glass-nexus',
          glow && 'animate-glow',
          shimmer && 'animate-shimmer',
          className
        )}
        {...props}
      />
    );
  }
);

GlassMotion.displayName = 'GlassMotion';

// Export all components
export {
  glassButtonVariants,
  glassCardVariants,
  glassInputVariants,
};