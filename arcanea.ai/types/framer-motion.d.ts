import 'framer-motion';
import { HTMLAttributes, RefAttributes } from 'react';

// Fix framer-motion types for React 19 compatibility
declare module 'framer-motion' {
  export interface MotionProps extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement> {
    // Allow all standard HTML attributes on motion components
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
    onSubmit?: (event: React.FormEvent<HTMLElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
    disabled?: boolean;
    type?: string;
    href?: string;
    target?: string;
    rel?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean;
    role?: string;
    tabIndex?: number;
    id?: string;
    style?: React.CSSProperties;

    // Image attributes for motion.img
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';

    // Input/form attributes
    placeholder?: string;
    value?: string | number | readonly string[];
    name?: string;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;

    // Button/link attributes
    download?: boolean | string;
  }
}
