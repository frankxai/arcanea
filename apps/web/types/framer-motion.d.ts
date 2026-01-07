/**
 * Framer Motion Type Fix for React 19
 *
 * React 19's event handler types conflict with Framer Motion's.
 * This declaration merges the types to make them compatible.
 */

import { HTMLMotionProps as OriginalHTMLMotionProps } from 'framer-motion';
import { DragEventHandler, HTMLAttributes } from 'react';

declare module 'framer-motion' {
  // Override HTMLMotionProps to be more permissive with React 19 event handlers
  export interface HTMLMotionProps<TagName extends keyof JSX.IntrinsicElements>
    extends Omit<OriginalHTMLMotionProps<TagName>, 'onDrag' | 'onDragStart' | 'onDragEnd'>,
      Omit<HTMLAttributes<Element>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    // Allow both framer-motion and React drag handlers
    onDrag?: OriginalHTMLMotionProps<TagName>['onDrag'] | DragEventHandler<Element>;
    onDragStart?: OriginalHTMLMotionProps<TagName>['onDragStart'] | DragEventHandler<Element>;
    onDragEnd?: OriginalHTMLMotionProps<TagName>['onDragEnd'] | DragEventHandler<Element>;
  }
}
