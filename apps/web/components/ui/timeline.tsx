"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: "completed" | "current" | "upcoming";
  category?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  orientation?: "left" | "center" | "right";
  variant?: "default" | "minimal" | "card";
  className?: string;
  animated?: boolean;
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const linePosition = {
  left: "left-[19px] sm:left-[19px]",
  center: "left-1/2 -translate-x-1/2",
  right: "right-[19px] sm:right-[19px]",
} as const;

const contentAlignment = {
  left: "pl-10 sm:pl-10 pr-0 text-left",
  center: "pl-10 sm:pl-0 pr-0 sm:pr-8 sm:text-right",
  right: "pl-10 sm:pl-10 pr-0 text-left",
} as const;

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// ─── Status Styles ───────────────────────────────────────────────────────────

const statusStyles = {
  completed: {
    dot: "bg-crystal shadow-[0_0_8px_rgba(127,255,212,0.5)]",
    line: "bg-gradient-to-b from-crystal/40 to-transparent",
    icon: "text-crystal",
  },
  current: {
    dot: "bg-brand-gold shadow-[0_0_12px_rgba(255,215,0,0.6)] animate-pulse",
    line: "bg-brand-gold/30",
    icon: "text-brand-gold",
  },
  upcoming: {
    dot: "bg-text-muted/40",
    line: "bg-text-muted/20",
    icon: "text-text-muted",
  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      events,
      orientation = "center",
      variant = "default",
      className,
      animated = false,
    },
    ref,
  ) => {
    const containerClasses = cn("relative w-full", className);

    const lineClasses = cn(
      "absolute top-0 bottom-0 w-px",
      orientation === "center" ? "hidden sm:block" : "",
      "bg-gradient-to-b from-crystal/30 via-[rgba(127,255,212,0.1)] to-transparent",
    );

    const showLine = orientation !== "center";

    return (
      <div ref={ref} className={containerClasses}>
        {/* Vertical line */}
        {showLine && (
          <div className={cn(lineClasses, linePosition[orientation])} />
        )}

        {/* Timeline events */}
        <div className="space-y-8">
          {events.map((event, index) => {
            const status = event.status ?? "upcoming";
            const styles = statusStyles[status];
            const isLast = index === events.length - 1;

            const eventClasses = cn("relative", contentAlignment[orientation]);

            const cardClasses = variant === "card" && "rounded-xl";

            if (animated) {
              return (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delayChildren: index * 0.1 }}
                  className={eventClasses}
                >
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={cn(
                        "absolute w-px bg-gradient-to-b from-crystal/30 to-transparent",
                        orientation === "left"
                          ? "left-[19px]"
                          : orientation === "right"
                            ? "right-[19px]"
                            : "left-1/2 -translate-x-1/2 hidden sm:block",
                        "top-10 bottom-[-2rem]",
                      )}
                    />
                  )}

                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute top-1.5 w-4 h-4 rounded-full z-10",
                      styles.dot,
                      orientation === "left"
                        ? "left-[15px]"
                        : orientation === "right"
                          ? "right-[15px]"
                          : "left-1/2 -translate-x-1/2 hidden sm:block",
                    )}
                  />

                  {/* Content */}
                  <div className={cn("pt-0.5", cardClasses)}>
                    {variant === "card" && (
                      <div
                        className={cn(
                          "p-4 sm:p-5",
                          "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
                          "border border-[rgba(127,255,212,0.12)]",
                          "hover:border-[rgba(127,255,212,0.25)] transition-colors",
                        )}
                      >
                        {event.category && (
                          <span className="text-xs text-crystal font-medium tracking-wide uppercase">
                            {event.category}
                          </span>
                        )}
                        {event.icon && (
                          <div className={cn("mb-2", styles.icon)}>
                            {event.icon}
                          </div>
                        )}
                        <h3 className="text-base font-semibold text-text-primary mb-1">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-sm text-text-muted leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        {event.date && (
                          <p className="text-xs text-text-muted/70 mt-2 font-sans">
                            {event.date}
                          </p>
                        )}
                      </div>
                    )}

                    {variant !== "card" && (
                      <>
                        {event.category && (
                          <span className="text-xs text-crystal font-medium tracking-wide uppercase">
                            {event.category}
                          </span>
                        )}
                        {event.icon && (
                          <div className={cn("mb-1.5", styles.icon)}>
                            {event.icon}
                          </div>
                        )}
                        <h3 className="text-base font-semibold text-text-primary">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-sm text-text-muted leading-relaxed mt-1">
                            {event.description}
                          </p>
                        )}
                        {event.date && (
                          <p className="text-xs text-text-muted/70 mt-2 font-sans">
                            {event.date}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            }

            return (
              <div key={event.id} className={eventClasses}>
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute w-px bg-gradient-to-b from-crystal/30 to-transparent",
                      orientation === "left"
                        ? "left-[19px]"
                        : orientation === "right"
                          ? "right-[19px]"
                          : "left-1/2 -translate-x-1/2 hidden sm:block",
                      "top-10 bottom-[-2rem]",
                    )}
                  />
                )}

                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute top-1.5 w-4 h-4 rounded-full z-10",
                    styles.dot,
                    orientation === "left"
                      ? "left-[15px]"
                      : orientation === "right"
                        ? "right-[15px]"
                        : "left-1/2 -translate-x-1/2 hidden sm:block",
                  )}
                />

                {/* Content */}
                <div className={cn("pt-0.5", cardClasses)}>
                  {variant === "card" && (
                    <div
                      className={cn(
                        "p-4 sm:p-5",
                        "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
                        "border border-[rgba(127,255,212,0.12)]",
                        "hover:border-[rgba(127,255,212,0.25)] transition-colors",
                      )}
                    >
                      {event.category && (
                        <span className="text-xs text-crystal font-medium tracking-wide uppercase">
                          {event.category}
                        </span>
                      )}
                      {event.icon && (
                        <div className={cn("mb-2", styles.icon)}>
                          {event.icon}
                        </div>
                      )}
                      <h3 className="text-base font-semibold text-text-primary mb-1">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-text-muted leading-relaxed">
                          {event.description}
                        </p>
                      )}
                      {event.date && (
                        <p className="text-xs text-text-muted/70 mt-2 font-sans">
                          {event.date}
                        </p>
                      )}
                    </div>
                  )}

                  {variant !== "card" && (
                    <>
                      {event.category && (
                        <span className="text-xs text-crystal font-medium tracking-wide uppercase">
                          {event.category}
                        </span>
                      )}
                      {event.icon && (
                        <div className={cn("mb-1.5", styles.icon)}>
                          {event.icon}
                        </div>
                      )}
                      <h3 className="text-base font-semibold text-text-primary">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-text-muted leading-relaxed mt-1">
                          {event.description}
                        </p>
                      )}
                      {event.date && (
                        <p className="text-xs text-text-muted/70 mt-2 font-sans">
                          {event.date}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Timeline.displayName = "Timeline";

// ─── Timeline Loading Skeleton ─────────────────────────────────────────────

export interface TimelineSkeletonProps {
  items?: number;
  variant?: "default" | "card";
  className?: string;
}

const TimelineSkeleton: React.FC<TimelineSkeletonProps> = ({
  items = 4,
  variant = "default",
  className,
}) => {
  return (
    <div className={cn("relative w-full space-y-8", className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="relative">
          {/* Timeline dot skeleton */}
          <div
            className={cn(
              "absolute top-1.5 w-4 h-4 rounded-full",
              "bg-text-muted/20",
              "left-[15px]",
            )}
          />

          {/* Content skeleton */}
          <div className="pl-10">
            {variant === "card" ? (
              <div className="animate-pulse">
                <div className="h-4 w-16 bg-text-muted/20 rounded mb-2" />
                <div className="h-5 w-3/4 bg-text-muted/20 rounded mb-2" />
                <div className="h-4 w-full bg-text-muted/15 rounded mb-1" />
                <div className="h-4 w-2/3 bg-text-muted/15 rounded" />
              </div>
            ) : (
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-16 bg-text-muted/20 rounded" />
                <div className="h-5 w-3/4 bg-text-muted/20 rounded" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

TimelineSkeleton.displayName = "TimelineSkeleton";

// ─── Exports ───────────────────────────────────────────────────────────────

export { Timeline, TimelineSkeleton };
