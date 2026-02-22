'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'w-full rounded-lg px-4 py-2.5 text-sm font-sans',
    'text-text-primary placeholder:text-text-muted',
    'border transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-crystal/40 focus:ring-offset-0 focus:border-crystal/60',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    'bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px] border-[rgba(127,255,212,0.12)]',
    'hover:border-crystal/25',
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
      inputSize: {
        sm: 'h-8 px-3 py-1.5 text-xs',
        md: 'h-10 px-4 py-2.5 text-sm',
        lg: 'h-12 px-5 py-3 text-base',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  variant?: 'default' | 'search';
  inputSize?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      variant = 'default',
      inputSize = 'md',
      state,
      id,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;
    const resolvedState = errorMessage ? 'error' : state;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {variant === 'search' && (
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              size={16}
              aria-hidden="true"
            />
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-describedby={
              errorId ?? helperTextId
            }
            aria-invalid={resolvedState === 'error' ? true : undefined}
            className={cn(
              inputVariants({ state: resolvedState, inputSize }),
              variant === 'search' && 'pl-9',
              className
            )}
            {...props}
          />
        </div>

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

Input.displayName = 'Input';

export { Input, inputVariants };
