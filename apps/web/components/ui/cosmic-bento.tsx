"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BentoItem {
  id: string;
  content: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  className?: string;
}

export interface CosmicBentoProps {
  items: BentoItem[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const gapSizes = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
} as const;

const colCount = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

const colSpanClasses = {
  1: "col-span-1",
  2: "col-span-1 sm:col-span-2",
  3: "col-span-1 sm:col-span-2 lg:col-span-3",
  4: "col-span-1 sm:col-span-2 lg:col-span-4",
} as const;

const rowSpanClasses = {
  1: "row-span-1",
  2: "row-span-1 sm:row-span-2",
  3: "row-span-1 sm:row-span-2 lg:row-span-3",
} as const;

// ─── Animation ───────────────────────────────────────────────────────────────

const bentoItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

const CosmicBento = React.forwardRef<HTMLDivElement, CosmicBentoProps>(
  ({ items, columns = 3, gap = "md", className, animated = false }, ref) => {
    const gridClasses = cn(
      "grid w-full",
      colCount[columns],
      gapSizes[gap],
      className,
    );

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={gridClasses}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={bentoItemVariants}
              className={cn(
                "relative rounded-2xl overflow-hidden",
                "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
                "border border-[rgba(127,255,212,0.12)]",
                "transition-all duration-200",
                "hover:border-[rgba(127,255,212,0.25)] hover:shadow-glow-sm",
                colSpanClasses[item.colSpan ?? 1],
                rowSpanClasses[item.rowSpan ?? 1],
                item.className,
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={gridClasses}>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative rounded-2xl overflow-hidden",
              "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
              "border border-[rgba(127,255,212,0.12)]",
              "transition-all duration-200",
              "hover:border-[rgba(127,255,212,0.25)] hover:shadow-glow-sm",
              colSpanClasses[item.colSpan ?? 1],
              rowSpanClasses[item.rowSpan ?? 1],
              item.className,
            )}
          >
            {item.content}
          </div>
        ))}
      </div>
    );
  },
);

CosmicBento.displayName = "CosmicBento";

// ─── Bento Item Sub-component ─────────────────────────────────────────────

export interface BentoItemComponentProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

const BentoItem = React.forwardRef<HTMLDivElement, BentoItemComponentProps>(
  ({ children, className, glowOnHover = true }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden h-full",
        "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
        "border border-[rgba(127,255,212,0.12)]",
        "transition-all duration-200",
        glowOnHover &&
          "hover:border-[rgba(127,255,212,0.25)] hover:shadow-glow-sm",
        className,
      )}
    >
      {children}
    </div>
  ),
);

BentoItem.displayName = "BentoItem";

// ─── Bento Loading Skeleton ───────────────────────────────────────────────

export interface BentoSkeletonProps {
  columns?: 2 | 3 | 4;
  rows?: number;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const BentoSkeleton: React.FC<BentoSkeletonProps> = ({
  columns = 3,
  rows = 2,
  gap = "md",
  className,
}) => {
  const gridClasses = cn(
    "grid w-full",
    colCount[columns],
    gapSizes[gap],
    className,
  );

  const skeletonItems = Array.from({ length: columns * rows });

  return (
    <div className={gridClasses}>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={cn(
            "relative rounded-2xl overflow-hidden",
            "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
            "border border-[rgba(127,255,212,0.12)]",
            "animate-pulse",
            colSpanClasses[1],
            rowSpanClasses[1],
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(127,255,212,0.05)] to-transparent animate-shimmer" />
        </div>
      ))}
    </div>
  );
};

BentoSkeleton.displayName = "BentoSkeleton";

// ─── Exports ───────────────────────────────────────────────────────────────

export { CosmicBento, BentoItem, BentoSkeleton };
