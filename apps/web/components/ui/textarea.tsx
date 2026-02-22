'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  [
    'w-full rounded-lg px-4 py-3 text-sm font-sans',
    'text-text-primary placeholder:text-text-muted',
    'border transition-all duration-150 resize-none',
    'focus:outline-none focus:ring-2 focus:ring-crystal/40 focus:ring-offset-0 focus:border-crystal/60',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    'bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px] border-[rgba(127,255,212,0.12)]',
    'hover:border-crystal/25',
    'scrollbar-thin',
  ],
  {
    variants: {
      state: {
        default: '',
        error: [
          'border-error/60 focus:ring-error/40 focus:border-error/80',
          'hover:border-error/60',
        ],
        success: [
          'border-success/60 focus:ring-success/40 focus:border-success/80',
        ],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  state?: 'default' | 'error' | 'success';
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      state,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      id,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id ?? React.useId();
    const helperTextId = helperText ? `${textareaId}-helper` : undefined;
    const errorId = errorMessage ? `${textareaId}-error` : undefined;
    const resolvedState = errorMessage ? 'error' : state;

    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleRef = (node: HTMLTextAreaElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    };

    const adjustHeight = React.useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoResize) return;

      // Reset to auto to allow shrinking
      el.style.height = 'auto';

      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20;
      const paddingTop = parseInt(getComputedStyle(el).paddingTop, 10) || 12;
      const paddingBottom = parseInt(getComputedStyle(el).paddingBottom, 10) || 12;
      const minHeight = minRows * lineHeight + paddingTop + paddingBottom;
      const maxHeight = maxRows * lineHeight + paddingTop + paddingBottom;

      const newHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
      el.style.height = `${newHeight}px`;

      // Enable manual scroll if content exceeds maxRows
      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }, [autoResize, minRows, maxRows]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      onChange?.(e);
    };

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <textarea
          ref={handleRef}
          id={textareaId}
          disabled={disabled}
          rows={minRows}
          aria-describedby={errorId ?? helperTextId}
          aria-invalid={resolvedState === 'error' ? true : undefined}
          className={cn(
            textareaVariants({ state: resolvedState }),
            autoResize && 'overflow-hidden',
            className
          )}
          onChange={handleChange}
          {...props}
        />

        {errorMessage && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-error font-sans"
          >
            {errorMessage}
          </p>
        )}

        {helperText && !errorMessage && (
          <p id={helperTextId} className="text-xs text-text-muted font-sans">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
