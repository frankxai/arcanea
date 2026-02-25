"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { CosmicCard, CosmicCardContent } from "@/components/ui/cosmic-card";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface LandingPageProps {
  /** Page configuration */
  config: {
    title: string;
    subtitle?: string;
    description?: string;
    badge?: {
      text: string;
      icon?: React.ReactNode;
    };
  };
  /** Hero section */
  hero?: {
    headline: string;
    subheadline?: string;
    primaryCTA?: {
      text: string;
      href: string;
      variant?: "default" | "glow" | "cosmic";
    };
    secondaryCTA?: {
      text: string;
      href: string;
    };
  };
  /** Statistics to display */
  stats?: Array<{
    value: string | number;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;
  /** Feature sections */
  features?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    href?: string;
  }>;
  /** Testimonials */
  testimonials?: Array<{
    id: string;
    content: string;
    author: string;
    role?: string;
    avatar?: string;
  }>;
  /** Pricing tiers */
  pricing?: Array<{
    id: string;
    name: string;
    price: string;
    description?: string;
    features: string[];
    cta: {
      text: string;
      href: string;
      variant?: "default" | "outline" | "glow";
    };
    popular?: boolean;
  }>;
  /** Call to action section */
  cta?: {
    title: string;
    description?: string;
    button: {
      text: string;
      href: string;
      variant?: "default" | "glow";
    };
  };
  /** Loading state */
  isLoading?: boolean;
  /** Custom className */
  className?: string;
}

// ─── Skeleton Components ──────────────────────────────────────────────────────

function LandingPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Skeleton
            variant="rect"
            className="w-32 h-6 rounded-full mx-auto mb-6"
          />
          <Skeleton variant="text" className="w-3/4 h-16 mx-auto mb-4" />
          <Skeleton variant="text" className="w-1/2 h-6 mx-auto mb-8" />
          <div className="flex justify-center gap-4">
            <Skeleton className="w-40 h-12 rounded-lg" />
            <Skeleton className="w-40 h-12 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="py-16 px-6 border-t border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton variant="text" className="w-16 h-8 mx-auto mb-2" />
                <Skeleton variant="text" className="w-24 h-4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton variant="text" className="w-64 h-10 mx-auto mb-4" />
          <Skeleton variant="text" className="w-96 h-6 mx-auto mb-16" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection({
  config,
  hero,
  stats,
}: {
  config: LandingPageProps["config"];
  hero?: LandingPageProps["hero"];
  stats?: LandingPageProps["stats"];
}) {
  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(127,255,212,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        {config.badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10">
              {config.badge.icon && (
                <span className="text-brand-primary">{config.badge.icon}</span>
              )}
              <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                {config.badge.text}
              </span>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl font-display font-bold text-center mb-4"
        >
          {config.title}
        </motion.h1>

        {/* Subtitle */}
        {config.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary text-center mb-6 font-body"
          >
            {config.subtitle}
          </motion.p>
        )}

        {/* Description */}
        {config.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-text-muted text-center max-w-2xl mx-auto mb-10 font-body leading-relaxed"
          >
            {config.description}
          </motion.p>
        )}

        {/* Hero CTA */}
        {hero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {hero.primaryCTA && (
              <Link href={hero.primaryCTA.href}>
                <Button
                  size="xl"
                  variant={hero.primaryCTA.variant || "glow"}
                  className="min-w-[200px]"
                >
                  {hero.primaryCTA.text}
                </Button>
              </Link>
            )}
            {hero.secondaryCTA && (
              <Link href={hero.secondaryCTA.href}>
                <Button size="xl" variant="cosmic" className="min-w-[200px]">
                  {hero.secondaryCTA.text}
                </Button>
              </Link>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                  {stat.prefix}
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-text-muted font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

function FeaturesSection({
  features,
}: {
  features?: LandingPageProps["features"];
}) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-24 px-6 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-fluid-2xl font-display font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body">
            Everything you need to bring your creative vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href || "#"}>
                <CosmicCard glow className="h-full group cursor-pointer">
                  <CosmicCardContent>
                    {feature.icon && (
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                    )}
                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm font-body">
                      {feature.description}
                    </p>
                  </CosmicCardContent>
                </CosmicCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ────────────────────────────────────────────────────

function TestimonialsSection({
  testimonials,
}: {
  testimonials?: LandingPageProps["testimonials"];
}) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-fluid-2xl font-display font-bold mb-4">
            What Creators Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CosmicCard glass className="h-full">
                <CosmicCardContent>
                  <p className="text-text-secondary font-body leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatar && (
                      <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      {testimonial.role && (
                        <div className="text-sm text-text-muted">
                          {testimonial.role}
                        </div>
                      )}
                    </div>
                  </div>
                </CosmicCardContent>
              </CosmicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────────────

function PricingSection({
  pricing,
}: {
  pricing?: LandingPageProps["pricing"];
}) {
  if (!pricing || pricing.length === 0) return null;

  return (
    <section className="py-24 px-6 border-t border-white/5 relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom,rgba(127,255,212,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-fluid-2xl font-display font-bold mb-4">
            Simple Pricing
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body">
            Choose the plan that fits your creative journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CosmicCard
                glow={tier.popular}
                className={cn(
                  "h-full relative",
                  tier.popular && "border-brand-primary/50",
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-brand-primary text-cosmic-void">
                      POPULAR
                    </span>
                  </div>
                )}
                <CosmicCardContent>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-display font-bold mb-4">
                    {tier.price}
                  </div>
                  {tier.description && (
                    <p className="text-text-muted text-sm mb-6 font-body">
                      {tier.description}
                    </p>
                  )}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-brand-primary">&#10003;</span>
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.cta.href} className="block">
                    <Button
                      variant={tier.cta.variant || "default"}
                      className="w-full"
                    >
                      {tier.cta.text}
                    </Button>
                  </Link>
                </CosmicCardContent>
              </CosmicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection({ cta }: { cta?: LandingPageProps["cta"] }) {
  if (!cta) return null;

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-fluid-2xl font-display font-bold mb-4">
          {cta.title}
        </h2>
        {cta.description && (
          <p className="text-text-secondary mb-8 font-body max-w-xl mx-auto">
            {cta.description}
          </p>
        )}
        <Link href={cta.button.href}>
          <Button size="xl" variant={cta.button.variant || "glow"}>
            {cta.button.text}
          </Button>
        </Link>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * Premium landing page template with hero, features, stats, testimonials, pricing, and CTA sections.
 *
 * @example
 * ```tsx
 * import { LandingPage } from '@/app/templates/landing-page';
 *
 * <LandingPage
 *   config={{
 *     title: "Welcome to Arcanea",
 *     badge: { text: "New Release", icon: <Sparkles /> }
 *   }}
 *   hero={{
 *     primaryCTA: { text: "Get Started", href: "/signup" }
 *   }}
 *   stats={[
 *     { value: 16, label: "Luminors" },
 *     { value: 7, label: "Wisdoms" }
 *   ]}
 *   features={[
 *     { id: "1", title: "AI Companion", description: "Your personal AI guide" }
 *   ]}
 * />
 * ```
 */
export function LandingPage({
  config,
  hero,
  stats,
  features,
  testimonials,
  pricing,
  cta,
  isLoading = false,
  className,
}: LandingPageProps) {
  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className={cn("min-h-screen", className)}>
      <HeroSection config={config} hero={hero} stats={stats} />
      <FeaturesSection features={features} />
      <TestimonialsSection testimonials={testimonials} />
      <PricingSection pricing={pricing} />
      <CTASection cta={cta} />
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export type { LandingPageProps };
