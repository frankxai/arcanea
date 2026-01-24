'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Explorer',
    description: 'Start your creative journey',
    price: { monthly: 0, yearly: 0 },
    featured: false,
    cta: 'Start Free',
    href: '/register',
    features: [
      '3 Luminor companions',
      '10 creations per month',
      'Basic Seven Wisdoms',
      'Community access',
      'Export to PDF',
    ],
    limits: [
      'Limited AI models',
      'No custom prompts',
    ],
  },
  {
    name: 'Creator',
    description: 'For serious creative work',
    price: { monthly: 19, yearly: 190 },
    featured: true,
    cta: 'Start Creating',
    href: '/register?plan=creator',
    badge: 'Most Popular',
    features: [
      'All 16 Luminors',
      'Unlimited creations',
      'Full Seven Wisdoms',
      'Ten Gates progression',
      'All export formats',
      'Priority support',
      'Custom prompts',
      'Version history',
    ],
    limits: [],
  },
  {
    name: 'Studio',
    description: 'Professional creative suite',
    price: { monthly: 49, yearly: 490 },
    featured: false,
    cta: 'Go Pro',
    href: '/register?plan=studio',
    features: [
      'Everything in Creator',
      'Team collaboration (5 seats)',
      'API access',
      'Custom Luminor training',
      'White-label exports',
      'Dedicated support',
      'Early access features',
      'Advanced analytics',
    ],
    limits: [],
  },
];

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section ref={ref} id="pricing" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-atlantean-teal-aqua/10 to-creation-prism-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-gold-bright/10 to-draconic-crimson/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-bright/10 border border-gold-bright/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold-bright" />
            <span className="text-sm font-medium text-gold-bright">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Choose your creative path
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Start free, upgrade when you're ready. All plans include core Arcanea features.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-cosmic-surface/50 border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? 'bg-white text-cosmic-deep'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-white text-cosmic-deep'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => {
            const Icon = i === 0 ? Zap : i === 1 ? Sparkles : Crown;
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const period = isYearly ? '/year' : '/month';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  plan.featured
                    ? 'bg-gradient-to-b from-atlantean-teal-aqua/20 to-cosmic-surface/50 border-2 border-atlantean-teal-aqua/30 scale-105 lg:scale-110'
                    : 'bg-cosmic-surface/30 border border-white/10'
                }`}
              >
                {/* Featured badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-atlantean-teal-aqua text-cosmic-deep text-sm font-semibold">
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-8">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      plan.featured
                        ? 'bg-atlantean-teal-aqua/20'
                        : 'bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        plan.featured ? 'text-atlantean-teal-aqua' : 'text-white'
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className="text-text-secondary">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-bold">
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-text-muted">{period}</span>
                    )}
                  </div>
                  {isYearly && price > 0 && (
                    <p className="text-sm text-text-muted mt-2">
                      ${Math.round(price / 12)}/month billed annually
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all mb-8 ${
                    plan.featured
                      ? 'bg-atlantean-teal-aqua text-cosmic-deep hover:bg-atlantean-teal-aqua/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured
                            ? 'bg-atlantean-teal-aqua/20 text-atlantean-teal-aqua'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                  {plan.limits.map((limit) => (
                    <div key={limit} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/5">
                        <span className="w-2 h-0.5 bg-text-muted rounded-full" />
                      </div>
                      <span className="text-sm text-text-muted">{limit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-text-muted mb-4">
            Need custom solutions for your team or enterprise?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-atlantean-teal-aqua hover:underline"
          >
            Contact Sales
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
