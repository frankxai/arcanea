"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarProps } from "./avatar";
import { Quote } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: AvatarProps;
  company?: string;
  rating?: number;
  featured?: boolean;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "featured" | "compact";
  showRating?: boolean;
  className?: string;
  animated?: boolean;
  loading?: boolean;
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants = {
  default: "p-6",
  featured: "p-8",
  compact: "p-4",
} as const;

const featuredVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// ─── Star Rating Component ─────────────────────────────────────────────────

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          className={cn(
            "w-4 h-4",
            index < rating ? "text-brand-gold" : "text-text-muted/30",
          )}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      testimonial,
      variant = "default",
      showRating = false,
      className,
      animated = false,
      loading = false,
    },
    ref,
  ) => {
    const animationVariants =
      variant === "featured" ? featuredVariants : defaultVariants;

    const cardContent = (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px]",
          "border border-[rgba(127,255,212,0.12)]",
          "transition-all duration-200",
          "hover:border-[rgba(127,255,212,0.25)]",
          variant === "featured" && "hover:shadow-glow-md",
          cardVariants[variant],
          className,
        )}
      >
        {/* Quote icon */}
        <div className="absolute top-4 right-4 text-text-muted/20">
          <Quote className="w-8 h-8" strokeWidth={1} />
        </div>

        {/* Featured glow */}
        {variant === "featured" && (
          <div className="absolute inset-0 bg-gradient-to-br from-crystal/5 via-transparent to-brand-primary/5 pointer-events-none" />
        )}

        {/* Rating */}
        {showRating && testimonial.rating && (
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>
        )}

        {/* Quote text */}
        <blockquote
          className={cn(
            "text-text-primary leading-relaxed",
            variant === "compact" ? "text-sm mb-3" : "text-base mb-5",
            variant === "featured" && "text-lg",
          )}
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <Avatar
              src={testimonial.avatar.src}
              name={testimonial.avatar.name}
              alt={testimonial.avatar.alt}
              size={variant === "compact" ? "sm" : "md"}
              ring="crystal"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-crystal/10 flex items-center justify-center">
              <span className="text-crystal text-sm font-medium">
                {testimonial.author.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "font-semibold text-text-primary truncate",
                variant === "compact" ? "text-sm" : "text-base",
              )}
            >
              {testimonial.author}
            </p>
            {(testimonial.role || testimonial.company) && (
              <p
                className={cn(
                  "text-text-muted truncate",
                  variant === "compact" ? "text-xs" : "text-sm",
                )}
              >
                {testimonial.role}
                {testimonial.role && testimonial.company && " at "}
                {testimonial.company}
              </p>
            )}
          </div>
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
            cardVariants[variant],
            className,
          )}
        >
          <div className="space-y-4">
            <div className="h-4 w-12 bg-text-muted/20 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-text-muted/15 rounded" />
              <div className="h-4 w-4/5 bg-text-muted/15 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-text-muted/20" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-text-muted/20 rounded" />
                <div className="h-2 w-32 bg-text-muted/15 rounded" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (animated) {
      return (
        <motion.div
          ref={ref}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {cardContent}
        </motion.div>
      );
    }

    return <div ref={ref}>{cardContent}</div>;
  },
);

TestimonialCard.displayName = "TestimonialCard";

// ─── Testimonial Grid ───────────────────────────────────────────────────────

export interface TestimonialGridProps {
  testimonials: Testimonial[];
  columns?: 1 | 2 | 3;
  variant?: "default" | "featured" | "compact";
  showRating?: boolean;
  className?: string;
  animated?: boolean;
  loading?: boolean;
}

const TestimonialGrid = React.forwardRef<HTMLDivElement, TestimonialGridProps>(
  (
    {
      testimonials,
      columns = 2,
      variant = "default",
      showRating = false,
      className,
      animated = false,
      loading = false,
    },
    ref,
  ) => {
    const gridClasses = cn(
      "grid w-full",
      columns === 1 && "grid-cols-1",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "gap-4 sm:gap-6",
      className,
    );

    if (loading) {
      return (
        <div ref={ref} className={gridClasses}>
          {Array.from({ length: testimonials.length || 4 }).map((_, index) => (
            <TestimonialCard
              key={index}
              testimonial={{
                id: `skeleton-${index}`,
                quote: "",
                author: "",
              }}
              variant={variant}
              showRating={showRating}
              loading
            />
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={gridClasses}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            variant={variant}
            showRating={showRating}
            animated={animated}
            className={
              testimonial.featured && columns >= 2 ? "md:col-span-2" : undefined
            }
          />
        ))}
      </div>
    );
  },
);

TestimonialGrid.displayName = "TestimonialGrid";

// ─── Exports ───────────────────────────────────────────────────────────────

export { TestimonialCard, TestimonialGrid, StarRating };
