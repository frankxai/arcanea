"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { Badge } from "./badge";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  period?: string;
  features: PricingFeature[];
  cta?: string;
  variant?: ButtonProps["variant"];
  popular?: boolean;
  badge?: string;
}

export interface PricingCardProps {
  tier: PricingTier;
  className?: string;
  animated?: boolean;
  loading?: boolean;
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
    },
  },
};

// ─── Feature List Component ─────────────────────────────────────────────────

interface FeatureListProps {
  features: PricingFeature[];
  compact?: boolean;
}

const FeatureList: React.FC<FeatureListProps> = ({
  features,
  compact = false,
}) => {
  return (
    <ul className={cn("space-y-2.5", compact && "space-y-1.5")}>
      {features.map((feature, index) => (
        <li
          key={index}
          className={cn(
            "flex items-start gap-2.5",
            compact ? "text-sm" : "text-base",
          )}
        >
          {feature.included ? (
            <Check
              className={cn(
                "shrink-0 mt-0.5",
                compact ? "w-4 h-4" : "w-5 h-5",
                "text-crystal",
              )}
              strokeWidth={2.5}
            />
          ) : (
            <X
              className={cn(
                "shrink-0 mt-0.5",
                compact ? "w-4 h-4" : "w-5 h-5",
                "text-text-muted/40",
              )}
              strokeWidth={2.5}
            />
          )}
          <span
            className={cn(
              feature.included ? "text-text-primary" : "text-text-muted/50",
              !feature.included && "line-through",
            )}
          >
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ tier, className, animated = false, loading = false }, ref) => {
    const isPopular = tier.popular ?? false;

    const cardClasses = cn(
      "relative rounded-2xl overflow-hidden",
      "transition-all duration-300",
      isPopular
        ? "bg-[rgba(18,24,38,0.85)] backdrop-blur-[20px] border-2 border-brand-gold/50 shadow-[0_8px_40px_rgba(255,215,0,0.15)]"
        : "bg-[rgba(18,24,38,0.65)] backdrop-blur-[16px] border border-[rgba(127,255,212,0.12)]",
      "hover:border-[rgba(127,255,212,0.25)]",
      isPopular && "hover:shadow-[0_12px_50px_rgba(255,215,0,0.2)]",
      className,
    );

    const content = (
      <div className={cn("p-6 sm:p-8", isPopular && "pt-10")}>
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 left-0 right-0">
            <div className="bg-gradient-to-r from-brand-gold/20 to-brand-gold/10 backdrop-blur-sm border-b border-brand-gold/30 px-4 py-2">
              <div className="flex items-center justify-center gap-2 text-brand-gold text-sm font-semibold">
                <Sparkles className="w-4 h-4 animate-pulse" strokeWidth={2} />
                Most Popular
              </div>
            </div>
          </div>
        )}

        {/* Custom badge */}
        {tier.badge && !isPopular && (
          <div className="mb-4">
            <Badge variant="crystal" size="sm">
              {tier.badge}
            </Badge>
          </div>
        )}

        {/* Tier name */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-text-primary font-display">
            {tier.name}
          </h3>
          {isPopular && (
            <Crown className="w-5 h-5 text-brand-gold" strokeWidth={2} />
          )}
        </div>

        {/* Description */}
        {tier.description && (
          <p className="text-sm text-text-muted mb-4">{tier.description}</p>
        )}

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-text-primary font-display">
              {typeof tier.price === "number" ? (
                <>
                  <span className="text-2xl">$</span>
                  {tier.price}
                </>
              ) : (
                tier.price
              )}
            </span>
            {tier.period && (
              <span className="text-text-muted text-sm">/{tier.period}</span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        {tier.cta && (
          <div className="mb-6">
            <Button
              variant={tier.variant ?? (isPopular ? "glow" : "cosmic")}
              className={cn(
                "w-full",
                isPopular && "animate-shimmer bg-[length:200%_100%]",
              )}
              size="lg"
            >
              {tier.cta}
              {isPopular && <Zap className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(127,255,212,0.15)] to-transparent mb-6" />

        {/* Features */}
        <FeatureList features={tier.features} />
      </div>
    );

    if (loading) {
      return (
        <div ref={ref} className={cn(cardClasses, "animate-pulse")}>
          <div className="p-6 sm:p-8 space-y-4">
            <div className="h-6 w-24 bg-text-muted/20 rounded" />
            <div className="h-10 w-32 bg-text-muted/20 rounded" />
            <div className="h-10 w-full bg-text-muted/15 rounded" />
            <div className="h-px bg-text-muted/10" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-text-muted/15 rounded" />
              <div className="h-4 w-4/5 bg-text-muted/15 rounded" />
              <div className="h-4 w-3/5 bg-text-muted/15 rounded" />
            </div>
          </div>
        </div>
      );
    }

    if (animated) {
      return (
        <motion.div
          ref={ref}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          custom={0}
        >
          {content}
        </motion.div>
      );
    }

    return <div ref={ref}>{content}</div>;
  },
);

PricingCard.displayName = "PricingCard";

// ─── Pricing Grid ───────────────────────────────────────────────────────────

export interface PricingGridProps {
  tiers: PricingTier[];
  columns?: 2 | 3 | 4;
  className?: string;
  animated?: boolean;
  loading?: boolean;
}

const PricingGrid = React.forwardRef<HTMLDivElement, PricingGridProps>(
  (
    { tiers, columns = 3, className, animated = false, loading = false },
    ref,
  ) => {
    const gridClasses = cn(
      "grid w-full",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "gap-6 lg:gap-8",
      className,
    );

    if (loading) {
      return (
        <div ref={ref} className={gridClasses}>
          {Array.from({ length: tiers.length || 3 }).map((_, index) => (
            <PricingCard
              key={index}
              tier={{
                id: `skeleton-${index}`,
                name: "",
                price: 0,
                features: [],
              }}
              loading
            />
          ))}
        </div>
      );
    }

    if (animated) {
      return (
        <div ref={ref} className={gridClasses}>
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              <PricingCard tier={tier} />
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={gridClasses}>
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    );
  },
);

PricingGrid.displayName = "PricingGrid";

// ─── Exports ───────────────────────────────────────────────────────────────

export { PricingCard, PricingGrid, FeatureList };
