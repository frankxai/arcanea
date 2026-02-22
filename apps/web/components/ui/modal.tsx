'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Focus trap ──────────────────────────────────────────────────────────────

function useFocusTrap(containerRef: React.RefObject<HTMLDivElement | null>, isOpen: boolean) {
  React.useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    // Focus first element on open
    first.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, containerRef]);
}

// ─── Size map ────────────────────────────────────────────────────────────────

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
} as const;

// ─── Animation variants ──────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 340,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Modal sub-components ────────────────────────────────────────────────────

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, title, description, onClose, showCloseButton = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start justify-between gap-4 pb-4 border-b border-[rgba(127,255,212,0.08)]', className)}
      {...props}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <h2 className="text-lg font-display font-semibold text-text-primary tracking-wide leading-snug">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-1 text-sm text-text-muted font-sans">
            {description}
          </p>
        )}
        {children}
      </div>

      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={cn(
            'shrink-0 rounded-lg p-1.5 text-text-muted',
            'hover:text-text-primary hover:bg-cosmic-raised/60',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/50'
          )}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
);
ModalHeader.displayName = 'ModalHeader';

const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('py-4 text-text-secondary font-sans text-sm leading-relaxed', className)}
      {...props}
    />
  )
);
ModalContent.displayName = 'ModalContent';

const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 pt-4 border-t border-[rgba(127,255,212,0.08)]',
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = 'ModalFooter';

// ─── Main Modal ──────────────────────────────────────────────────────────────

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: keyof typeof sizeClasses;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

function Modal({
  isOpen,
  onClose,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: ModalProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  useFocusTrap(panelRef, isOpen);

  // Escape key handler
  React.useEffect(() => {
    if (!closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEscape]);

  // Scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Portal mount guard
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden={true}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            className={cn(
              'relative z-10 w-full rounded-2xl',
              'bg-[rgba(18,24,38,0.92)] backdrop-blur-[24px]',
              'border border-[rgba(127,255,212,0.15)]',
              'shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.08)]',
              'p-6',
              sizeClasses[size],
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export { Modal, ModalHeader, ModalContent, ModalFooter };
