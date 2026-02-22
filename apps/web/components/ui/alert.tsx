'use client';

import * as React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variant config ──────────────────────────────────────────────────────────

const variantConfig = {
  info: {
    border: 'border-l-[#26b8e6]/70',
    icon: Info,
    iconClass: 'text-[#26b8e6]',
    bg: 'bg-[rgba(38,184,230,0.05)]',
  },
  success: {
    border: 'border-l-[#20cc73]/70',
    icon: CheckCircle,
    iconClass: 'text-[#20cc73]',
    bg: 'bg-[rgba(32,204,115,0.05)]',
  },
  warning: {
    border: 'border-l-[#ffa500]/70',
    icon: AlertTriangle,
    iconClass: 'text-[#ffa500]',
    bg: 'bg-[rgba(255,165,0,0.05)]',
  },
  error: {
    border: 'border-l-error/70',
    icon: AlertCircle,
    iconClass: 'text-error',
    bg: 'bg-[rgba(245,41,82,0.05)]',
  },
} as const;

// ─── CVA ─────────────────────────────────────────────────────────────────────

const alertVariants = cva(
  [
    'relative flex gap-3 rounded-xl p-4',
    'border border-[rgba(127,255,212,0.10)]',
    'backdrop-blur-[16px]',
    'border-l-4',
  ],
  {
    variants: {
      variant: {
        info: [variantConfig.info.border, variantConfig.info.bg],
        success: [variantConfig.success.border, variantConfig.success.bg],
        warning: [variantConfig.warning.border, variantConfig.warning.bg],
        error: [variantConfig.error.border, variantConfig.error.bg],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      dismissLabel = 'Dismiss',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const config = variantConfig[variant ?? 'info'];
    const IconComponent = config.icon;
    const resolvedIcon = icon ?? (
      <IconComponent size={18} aria-hidden="true" className={config.iconClass} />
    );

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {/* Icon */}
        <span className="shrink-0 mt-0.5">{resolvedIcon}</span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold text-text-primary font-sans leading-snug mb-1">
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-text-secondary font-sans leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Dismiss */}
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className={cn(
              'shrink-0 self-start rounded-md p-1 text-text-muted',
              'hover:text-text-primary hover:bg-cosmic-raised/60',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/50'
            )}
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert, alertVariants };
