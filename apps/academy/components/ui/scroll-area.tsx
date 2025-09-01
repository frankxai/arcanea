import * as React from "react";
import { cn } from "./utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Set a max height for the scroll area (e.g. 'calc(100vh - 200px)' or '600px').
   * If not provided, the container will flex to fill available space.
   */
  maxHeight?: string;
}

/**
 * Lightweight scroll container to avoid bringing in a heavy dependency.
 * Applies smooth scrolling and styled scrollbar via Tailwind classes.
 */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, style, maxHeight, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-y-auto overflow-x-hidden",
          // Subtle scrollbar styling (works in modern browsers)
          "scroll-smooth",
          "scrollbar-thin scrollbar-thumb-arcanean-aurora/40 scrollbar-track-transparent",
          className
        )}
        style={{
          maxHeight,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";
