'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Tab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'pill';
  className?: string;
  tabsClassName?: string;
  panelsClassName?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue: string;
}

// ─── TabPanel ────────────────────────────────────────────────────────────────

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, activeValue, className, children, ...props }, ref) => {
    const isActive = value === activeValue;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        hidden={!isActive}
        tabIndex={0}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/40 rounded-lg',
          className
        )}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isActive && (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
TabPanel.displayName = 'TabPanel';

// ─── Tabs ────────────────────────────────────────────────────────────────────

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      value,
      onChange,
      variant = 'underline',
      className,
      tabsClassName,
      children,
      'aria-label': ariaLabel = 'Navigation tabs',
    },
    ref
  ) => {
    const tabListRef = React.useRef<HTMLDivElement>(null);

    // Arrow-key navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      const currentEnabledIndex = enabledTabs.findIndex((t) => t.value === tabs[index].value);

      let nextEnabledIndex = currentEnabledIndex;

      if (e.key === 'ArrowRight') {
        nextEnabledIndex = (currentEnabledIndex + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextEnabledIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
      } else if (e.key === 'Home') {
        nextEnabledIndex = 0;
      } else if (e.key === 'End') {
        nextEnabledIndex = enabledTabs.length - 1;
      } else {
        return;
      }

      e.preventDefault();
      const nextTab = enabledTabs[nextEnabledIndex];
      onChange(nextTab.value);

      // Focus the newly active tab button
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      const nextTabIndex = tabs.findIndex((t) => t.value === nextTab.value);
      buttons?.[nextTabIndex]?.focus();
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Tab list */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label={ariaLabel}
          className={cn(
            variant === 'underline'
              ? 'flex gap-0 border-b border-[rgba(127,255,212,0.12)]'
              : 'flex gap-1 p-1 rounded-xl bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px] border border-[rgba(127,255,212,0.10)] w-fit',
            tabsClassName
          )}
        >
          {tabs.map((tab, i) => {
            const isActive = tab.value === value;

            return (
              <button
                key={tab.value}
                role="tab"
                id={`tab-${tab.value}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.value}`}
                aria-disabled={tab.disabled}
                disabled={tab.disabled}
                tabIndex={isActive ? 0 : -1}
                onClick={() => !tab.disabled && onChange(tab.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  'relative flex items-center gap-1.5 font-sans text-sm font-medium',
                  'transition-colors duration-150 select-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/50 focus-visible:ring-offset-0',
                  'disabled:pointer-events-none disabled:opacity-40',
                  variant === 'underline'
                    ? cn(
                        'px-4 py-2.5 rounded-t-md',
                        isActive ? 'text-crystal' : 'text-text-muted hover:text-text-secondary'
                      )
                    : cn(
                        'px-3.5 py-1.5 rounded-lg z-10',
                        isActive
                          ? 'text-cosmic-void'
                          : 'text-text-muted hover:text-text-secondary'
                      )
                )}
              >
                {/* Pill active background */}
                {variant === 'pill' && isActive && (
                  <motion.span
                    layoutId="pill-bg"
                    className="absolute inset-0 rounded-lg bg-crystal"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                      mass: 0.6,
                    }}
                    aria-hidden={true}
                  />
                )}

                {tab.icon && (
                  <span className="shrink-0 relative z-10" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}

                <span className="relative z-10">{tab.label}</span>

                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      'relative z-10 min-w-[18px] h-[18px] px-1 rounded-full text-xs flex items-center justify-center font-mono',
                      isActive && variant === 'pill'
                        ? 'bg-cosmic-void/20 text-cosmic-void'
                        : 'bg-crystal/15 text-crystal'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* Underline active indicator */}
                {variant === 'underline' && isActive && (
                  <motion.span
                    layoutId="underline-indicator"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-crystal rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                    }}
                    aria-hidden={true}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export { Tabs, TabPanel };
