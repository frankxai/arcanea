'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
  href?: string;
}

export type DropdownSection = {
  heading?: string;
  items: DropdownItem[];
};

export interface DropdownProps {
  trigger: React.ReactNode;
  sections: DropdownSection[];
  align?: 'left' | 'right' | 'center';
  width?: 'auto' | 'trigger' | string;
  className?: string;
  contentClassName?: string;
  showChevron?: boolean;
  'aria-label'?: string;
}

// ─── Menu animation variants ─────────────────────────────────────────────────

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -6,
    transformOrigin: 'top',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 28,
      mass: 0.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -4,
    transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Alignment classes ───────────────────────────────────────────────────────

const alignClasses = {
  left: 'left-0',
  right: 'right-0',
  center: 'left-1/2 -translate-x-1/2',
};

// ─── DropdownItem component ───────────────────────────────────────────────────

interface ItemProps {
  item: DropdownItem;
  onClose: () => void;
}

function DropdownItemComponent({ item, onClose }: ItemProps) {
  const handleClick = () => {
    if (item.disabled) return;
    item.onClick?.();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const Tag = item.href && !item.disabled ? 'a' : 'button';
  const tagProps = item.href && !item.disabled ? { href: item.href } : { type: 'button' as const };

  return (
    <Tag
      {...tagProps}
      role="menuitem"
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2',
        'text-sm font-sans text-left',
        'transition-colors duration-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/50 focus-visible:ring-inset',
        item.disabled
          ? 'opacity-40 cursor-not-allowed pointer-events-none'
          : item.destructive
          ? 'text-error hover:bg-error/10 hover:text-error cursor-pointer'
          : 'text-text-secondary hover:bg-cosmic-raised/70 hover:text-text-primary cursor-pointer'
      )}
    >
      {item.icon && (
        <span
          className={cn(
            'shrink-0 w-4 h-4 flex items-center justify-center',
            item.destructive
              ? 'text-error/70 group-hover:text-error'
              : 'text-text-muted group-hover:text-crystal',
            'transition-colors duration-100'
          )}
          aria-hidden="true"
        >
          {item.icon}
        </span>
      )}

      <span className="flex-1 min-w-0">
        <span className="block truncate">{item.label}</span>
        {item.description && (
          <span className="block text-xs text-text-muted mt-0.5 truncate">
            {item.description}
          </span>
        )}
      </span>
    </Tag>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function DropdownDivider() {
  return (
    <div
      role="separator"
      className="my-1 h-px bg-[rgba(127,255,212,0.08)]"
    />
  );
}

// ─── Dropdown ────────────────────────────────────────────────────────────────

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      sections,
      align = 'left',
      width = 'auto',
      className,
      contentClassName,
      showChevron = false,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const close = React.useCallback(() => setIsOpen(false), []);
    const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

    // Dismiss on outside click
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          close();
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen, close]);

    // Escape to close
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close();
          triggerRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [isOpen, close]);

    // Arrow-key navigation within menu
    const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!menuRef.current) return;

      const items = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])'
        )
      );

      if (!items.length) return;

      const current = document.activeElement;
      const index = items.indexOf(current as HTMLElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(index + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    };

    // Focus first item when opened
    React.useEffect(() => {
      if (!isOpen) return;
      const firstItem = menuRef.current?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      firstItem?.focus();
    }, [isOpen]);

    const contentWidth =
      width === 'trigger'
        ? '100%'
        : width === 'auto'
        ? undefined
        : width;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn('relative inline-flex', className)}
      >
        {/* Trigger wrapper */}
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          onClick={toggle}
          className={cn(
            'inline-flex items-center gap-1.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/50 rounded-md'
          )}
        >
          {trigger}
          {showChevron && (
            <ChevronDown
              size={14}
              className={cn(
                'text-text-muted transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="dropdown"
              ref={menuRef}
              role="menu"
              aria-label={ariaLabel ?? 'Menu'}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleMenuKeyDown}
              style={{ width: contentWidth, minWidth: '11rem' }}
              className={cn(
                'absolute top-full mt-1.5 z-50',
                'rounded-xl p-1.5',
                'bg-[rgba(18,24,38,0.95)] backdrop-blur-[20px]',
                'border border-[rgba(127,255,212,0.14)]',
                'shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_1px_rgba(255,255,255,0.06)]',
                alignClasses[align],
                contentClassName
              )}
            >
              {sections.map((section, si) => (
                <React.Fragment key={si}>
                  {si > 0 && <DropdownDivider />}

                  {section.heading && (
                    <p className="px-2.5 pt-1.5 pb-0.5 text-xs font-semibold text-text-muted uppercase tracking-widest select-none">
                      {section.heading}
                    </p>
                  )}

                  {section.items.map((item) => (
                    <DropdownItemComponent key={item.key} item={item} onClose={close} />
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
