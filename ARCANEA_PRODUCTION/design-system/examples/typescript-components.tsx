// 🎨 Arcanea Design System - TypeScript Components
// Type-safe, premium component library with Arcanea aesthetics

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn'; // Utility for merging classnames

// === DESIGN TOKENS ===
// Type-safe design tokens matching our CSS custom properties

export const ArcanearTokens = {
  gradients: {
    aurora: 'var(--gradient-aurora-grained)',
    cosmic: 'var(--gradient-cosmic-grained)', 
    neural: 'var(--gradient-neural-grained)',
    matrix: 'var(--gradient-matrix-grained)',
    plasma: 'var(--gradient-plasma)',
    sunset: 'var(--gradient-sunset-grained)',
    ocean: 'var(--gradient-ocean-grained)',
    forest: 'var(--gradient-forest-grained)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)', 
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  }
} as const;

// === BUTTON COMPONENT ===
// Type-safe button with premium Arcanea effects

const buttonVariants = cva(
  // Base styles (always applied)
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold transition-all duration-300',
    'cursor-pointer select-none',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // PRESERVE BELOVED ROUND CORNERS!
    'border-radius: var(--radius-2xl)',
    'min-h-[48px]',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        // 🔒 LOCKED - Premium gradient with light sweep
        premium: [
          'bg-gradient-aurora text-white',
          'border border-white/15',
          'hover:transform hover:translateY(-3px)',
          'hover:shadow-[0_15px_35px_rgba(102,126,234,0.3),0_5px_15px_rgba(0,0,0,0.1)]',
          // Light sweep effect
          'before:absolute before:inset-0',
          'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
          'before:translate-x-[-100%] before:transition-transform before:duration-600',
          'hover:before:translate-x-[100%]',
        ],
        // 🔒 LOCKED - Glass morphism  
        glass: [
          'bg-white/8 backdrop-blur-[20px] backdrop-saturate-[180%]',
          'border border-white/15 text-primary',
          'hover:bg-white/12 hover:transform hover:translateY(-2px)',
          'hover:shadow-[0_10px_25px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]',
          // Shimmer effect
          'after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full',
          'after:bg-gradient-to-r after:from-transparent after:via-white/15 after:to-transparent',
          'after:transition-all after:duration-500',
          'hover:after:left-[100%]',
        ],
        // 🔧 FLEXIBLE - Customizable variants
        primary: [
          'bg-primary text-white',
          'hover:opacity-90 hover:transform hover:translateY(-1px)',
          'hover:shadow-lg',
        ],
        secondary: [
          'bg-secondary text-primary border border-primary/20',
          'hover:bg-secondary/80 hover:transform hover:translateY(-1px)',
        ],
        ghost: [
          'text-primary hover:bg-primary/10',
          'hover:transform hover:translateY(-1px)',
        ],
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-6 py-3 text-base', 
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
      },
      gradient: {
        aurora: 'bg-gradient-aurora',
        cosmic: 'bg-gradient-cosmic', 
        neural: 'bg-gradient-neural',
        plasma: 'bg-gradient-plasma',
        sunset: 'bg-gradient-sunset',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, gradient, children, isLoading, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          gradient && `bg-gradient-${gradient}`,
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {leftIcon && !isLoading && <span className="w-4 h-4">{leftIcon}</span>}
        {isLoading && (
          <span className="w-4 h-4 animate-spin">⟳</span>
        )}
        {children}
        {rightIcon && !isLoading && <span className="w-4 h-4">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';

// === CARD COMPONENT ===
// Type-safe card with premium effects

const cardVariants = cva(
  [
    'rounded-xl transition-all duration-400',
    'border border-primary/10',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-secondary p-6',
          'hover:transform hover:translateY(-2px)',
          'hover:shadow-md',
        ],
        // 🔒 LOCKED - Premium glass card
        glass: [
          'bg-white/8 backdrop-blur-[20px] backdrop-saturate-[180%]',
          'border-white/15 p-6',
          'hover:transform hover:translateY(-8px) hover:scale-[1.02]',
          'hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]',
          // Highlight overlay
          'relative after:absolute after:inset-0 after:rounded-xl',
          'after:bg-gradient-to-br after:from-white/10 after:to-transparent',
          'after:opacity-0 after:transition-all after:duration-400',
          'hover:after:opacity-100',
        ],
        gradient: [
          'p-6 text-white',
          'hover:transform hover:translateY(-6px) hover:scale-[1.02]',
          'hover:shadow-xl',
        ],
      },
      padding: {
        sm: 'p-4',
        md: 'p-6', 
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  gradient?: keyof typeof ArcanearTokens.gradients;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, gradient, children, style, ...props }, ref) => {
    const gradientStyle = gradient 
      ? { background: ArcanearTokens.gradients[gradient] }
      : {};

    return (
      <div
        className={cn(
          cardVariants({ variant, padding }),
          gradient && 'text-white',
          className
        )}
        style={{ ...gradientStyle, ...style }}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

// === INPUT COMPONENT ===
// Type-safe form inputs with premium styling

const inputVariants = cva(
  [
    'w-full px-4 py-3 transition-all duration-200',
    'border border-primary/20 rounded-lg',
    'bg-white/50 backdrop-blur-sm',
    'focus:outline-none focus:ring-2 focus:ring-primary/50',
    'focus:border-primary/40',
    'placeholder:text-gray-500',
  ],
  {
    variants: {
      variant: {
        default: '',
        glass: [
          'bg-white/8 backdrop-blur-[16px]',
          'border-white/15 text-primary',
          'focus:bg-white/12',
        ],
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              inputVariants({ variant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-300 focus:border-red-400 focus:ring-red-200',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// === BADGE COMPONENT ===
// Type-safe status badges

const badgeVariants = cva(
  [
    'inline-flex items-center px-2.5 py-0.5 text-xs font-medium',
    'rounded-full transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        premium: [
          'bg-gradient-aurora text-white',
          'shadow-sm',
        ],
        glass: [
          'bg-white/10 backdrop-blur-sm text-primary',
          'border border-white/20',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

// === PREMIUM HOVER COMPONENT ===
// Type-safe wrapper for premium hover effects

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const HoverLift: React.FC<HoverLiftProps> = ({ 
  children, 
  className, 
  intensity = 'medium' 
}) => {
  const intensityStyles = {
    subtle: 'hover:transform hover:translateY(-2px) hover:scale-[1.01]',
    medium: 'hover:transform hover:translateY(-4px) hover:scale-[1.02]', 
    strong: 'hover:transform hover:translateY(-8px) hover:scale-[1.04]',
  };

  return (
    <div
      className={cn(
        'transition-all duration-400 cursor-pointer',
        'hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)]',
        intensityStyles[intensity],
        className
      )}
    >
      {children}
    </div>
  );
};

// === TYPE EXPORTS ===
// Export all component prop types for external use

export type { ButtonProps, CardProps, InputProps, BadgeProps, HoverLiftProps };
export type ButtonVariant = NonNullable<ButtonProps['variant']>;
export type CardVariant = NonNullable<CardProps['variant']>;
export type GradientType = keyof typeof ArcanearTokens.gradients;

// === USAGE EXAMPLES ===

/*
// 🎯 TypeScript Usage Examples:

// Premium button with full type safety
<Button 
  variant="premium"
  size="lg"
  leftIcon={<StarIcon />}
  onClick={() => console.log('Clicked!')}
>
  ✨ Premium Action
</Button>

// Glass card with gradient background
<Card variant="glass" gradient="aurora">
  <h3>Premium Content</h3>
  <p>Glass morphism with aurora gradient</p>
</Card>

// Type-safe input with validation
<Input
  label="Email Address"
  type="email"
  variant="glass"
  placeholder="you@example.com"
  error={errors.email}
  leftIcon={<EmailIcon />}
/>

// Premium badges
<Badge variant="premium">🔒 Locked</Badge>
<Badge variant="glass">⚡ Premium</Badge>

// Hover effects wrapper
<HoverLift intensity="strong">
  <Card variant="glass">
    Magical hover interaction
  </Card>
</HoverLift>

*/