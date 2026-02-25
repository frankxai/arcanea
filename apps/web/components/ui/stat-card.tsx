"use client";

import * as React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Stat {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface StatCardProps {
  stat: Stat;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  delay?: number;
  className?: string;
  loading?: boolean;
}

// ─── Size Variants ───────────────────────────────────────────────────────────

const sizeVariants = {
  sm: {
    container: "p-4",
    value: "text-2xl",
    label: "text-xs",
    icon: "w-8 h-8",
  },
  md: {
    container: "p-5 sm:p-6",
    value: "text-3xl sm:text-4xl",
    label: "text-sm",
    icon: "w-10 h-10",
  },
  lg: {
    container: "p-6 sm:p-8",
    value: "text-4xl sm:text-5xl lg:text-6xl",
    label: "text-base",
    icon: "w-12 h-12",
  },
} as const;

// ─── Animation Variants ─────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// ─── Animated Counter Hook ───────────────────────────────────────────────────

interface UseAnimatedCounterProps {
  value: number;
  inView: boolean;
  duration?: number;
}

const useAnimatedCounter = ({
  value,
  inView,
  duration = 2,
}: UseAnimatedCounterProps): number => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out expo
      const easedProgress =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayValue(
        Math.floor(startValue + (endValue - startValue) * easedProgress),
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, inView, duration]);

  return displayValue;
};

// ─── Component ───────────────────────────────────────────────────────────────

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      stat,
      size = "md",
      animate = true,
      delay = 0,
      className,
      loading = false,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const animatedValue = useAnimatedCounter({
      value: stat.value,
      inView: animate && isInView,
    });

    const sizes = sizeVariants[size];
    const finalValue = animate ? animatedValue : stat.value;

    const formattedValue = stat.prefix
      ? `${stat.prefix}${finalValue.toLocaleString()}`
      : finalValue.toLocaleString();

    const cardContent = (
      <div
        ref={containerRef}
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
          "border border-[rgba(127,255,212,0.12)]",
          "transition-all duration-200",
          "hover:border-[rgba(127,255,212,0.25)] hover:shadow-glow-sm",
          sizes.container,
          className,
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-crystal/5 via-transparent to-brand-primary/5 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          {stat.icon && (
            <div
              className={cn(
                "mb-3 sm:mb-4 flex items-center justify-center rounded-xl",
                "bg-crystal/10 text-crystal",
                sizes.icon,
              )}
            >
              {stat.icon}
            </div>
          )}

          {/* Value */}
          <div className="flex items-baseline gap-1 mb-1 sm:mb-2">
            <span
              className={cn(
                "font-bold text-text-primary font-display tracking-tight",
                sizes.value,
              )}
            >
              {formattedValue}
            </span>
            {stat.suffix && (
              <span
                className={cn(
                  "text-text-primary font-display",
                  size === "sm"
                    ? "text-lg"
                    : size === "md"
                      ? "text-xl"
                      : "text-2xl",
                )}
              >
                {stat.suffix}
              </span>
            )}
          </div>

          {/* Label */}
          <p className={cn("text-text-muted font-medium", sizes.label)}>
            {stat.label}
          </p>

          {/* Description */}
          {stat.description && (
            <p
              className={cn(
                "text-text-muted/70 mt-2",
                size === "sm" ? "text-xs" : "text-sm",
              )}
            >
              {stat.description}
            </p>
          )}
        </div>
      </div>
    );

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-2xl overflow-hidden",
            "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
            "border border-[rgba(127,255,212,0.12)]",
            "animate-pulse",
            sizes.container,
            className,
          )}
        >
          <div className="relative z-10">
            <div
              className={cn(
                "rounded-xl bg-text-muted/20 mb-3 sm:mb-4",
                sizes.icon,
              )}
            />
            <div className="h-8 w-24 bg-text-muted/20 rounded mb-2" />
            <div className="h-4 w-20 bg-text-muted/15 rounded" />
          </div>
        </div>
      );
    }

    if (animate) {
      return (
        <motion.div
          ref={ref}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={delay}
        >
          {cardContent}
        </motion.div>
      );
    }

    return <div ref={ref}>{cardContent}</div>;
  },
);

StatCard.displayName = "StatCard";

// ─── Stat Grid ───────────────────────────────────────────────────────────────

export interface StatGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4 | "auto";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
  loading?: boolean;
}

const StatGrid = React.forwardRef<HTMLDivElement, StatGridProps>(
  (
    {
      stats,
      columns = 4,
      size = "md",
      animate = true,
      className,
      loading = false,
    },
    ref,
  ) => {
    const gridClasses = cn(
      "grid w-full",
      columns === 2 && "grid-cols-2",
      columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      columns === "auto" &&
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      "gap-4 sm:gap-6",
      className,
    );

    if (loading) {
      return (
        <div ref={ref} className={gridClasses}>
          {Array.from({ length: stats.length || 4 }).map((_, index) => (
            <StatCard
              key={index}
              stat={{
                id: `skeleton-${index}`,
                value: 0,
                label: "",
              }}
              size={size}
              loading
            />
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={gridClasses}>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            stat={stat}
            size={size}
            animate={animate}
            delay={index * 0.1}
          />
        ))}
      </div>
    );
  },
);

StatGrid.displayName = "StatGrid";

// ─── Counter Text (standalone animated number) ─────────────────────────────

export interface CounterTextProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  size?: "sm" | "md" | "lg";
}

const CounterText: React.FC<CounterTextProps> = ({
  value,
  suffix,
  prefix,
  className,
  duration = 2,
  size = "md",
}) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const animatedValue = useAnimatedCounter({
    value,
    inView: isInView,
    duration,
  });

  const formattedValue = prefix
    ? `${prefix}${animatedValue.toLocaleString()}`
    : animatedValue.toLocaleString();

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
  };

  return (
    <span
      ref={containerRef}
      className={cn(
        "font-bold text-text-primary font-display inline-flex items-baseline",
        sizeClasses[size],
        className,
      )}
    >
      {formattedValue}
      {suffix && <span className="text-inherit ml-1">{suffix}</span>}
    </span>
  );
};

CounterText.displayName = "CounterText";

// ─── Exports ───────────────────────────────────────────────────────────────

export { StatCard, StatGrid, CounterText };
