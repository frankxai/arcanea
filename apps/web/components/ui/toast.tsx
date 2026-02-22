'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  onDismiss?: () => void;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

// ─── Config maps ─────────────────────────────────────────────────────────────

const variantConfig = {
  default: {
    borderColor: 'border-l-crystal/60',
    iconColor: 'text-crystal',
    Icon: Info,
  },
  success: {
    borderColor: 'border-l-[#20cc73]/80',
    iconColor: 'text-[#20cc73]',
    Icon: CheckCircle,
  },
  warning: {
    borderColor: 'border-l-[#ffa500]/80',
    iconColor: 'text-[#ffa500]',
    Icon: AlertTriangle,
  },
  error: {
    borderColor: 'border-l-error/80',
    iconColor: 'text-error',
    Icon: AlertCircle,
  },
  info: {
    borderColor: 'border-l-[#26b8e6]/80',
    iconColor: 'text-[#26b8e6]',
    Icon: Info,
  },
} as const;

// ─── Individual Toast ─────────────────────────────────────────────────────────

const DEFAULT_DURATION = 5000;

interface ToastCardProps extends ToastItem {
  onDismissInternal: (id: string) => void;
}

function ToastCard({
  id,
  variant = 'default',
  title,
  description,
  duration = DEFAULT_DURATION,
  onDismissInternal,
  onDismiss,
}: ToastCardProps) {
  const { borderColor, iconColor, Icon } = variantConfig[variant];
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDismiss = React.useCallback(() => {
    onDismiss?.();
    onDismissInternal(id);
  }, [id, onDismiss, onDismissInternal]);

  React.useEffect(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(handleDismiss, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, handleDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{
        type: 'spring',
        stiffness: 340,
        damping: 28,
        mass: 0.7,
      }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'pointer-events-auto relative flex w-full max-w-sm overflow-hidden rounded-xl',
        'bg-[rgba(18,24,38,0.92)] backdrop-blur-[16px]',
        'border border-[rgba(127,255,212,0.12)]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        'border-l-4',
        borderColor,
        'p-4 gap-3 items-start'
      )}
      onMouseEnter={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        if (duration > 0) {
          timerRef.current = setTimeout(handleDismiss, duration);
        }
      }}
    >
      {/* Icon */}
      <Icon
        size={18}
        className={cn('shrink-0 mt-0.5', iconColor)}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary font-sans leading-snug">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-xs text-text-muted font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        className={cn(
          'shrink-0 rounded-md p-1 text-text-muted',
          'hover:text-text-primary hover:bg-cosmic-raised/50',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/50'
        )}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// ─── Toast Container ──────────────────────────────────────────────────────────

function ToastContainer({ toasts, onDismiss }: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-label="Notifications"
      className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {toasts.map((t) => (
          <ToastCard
            key={t.id}
            {...t}
            onDismissInternal={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

// ─── Provider ────────────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const toast = React.useCallback(
    (item: Omit<ToastItem, 'id'>): string => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => {
        const next = [{ ...item, id }, ...prev];
        return next.slice(0, maxToasts);
      });
      return id;
    },
    [maxToasts]
  );

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss, dismissAll }),
    [toasts, toast, dismiss, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ─── Convenience re-export ────────────────────────────────────────────────────

export { ToastContext };
