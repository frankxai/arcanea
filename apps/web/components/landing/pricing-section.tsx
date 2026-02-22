'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Sparkles, Zap, Crown, ArrowRight, Star } from 'lucide-react';
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
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-crystal/10 to-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-brand-gold/10 to-arcane-fire/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="font-sans text-sm font-medium text-brand-gold">Simple Pricing</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-bold mb-6">
            Choose your creative path
          </h2>
          <p className="font-sans text-fluid-lg text-text-secondary max-w-2xl mx-auto mb-10">
            Start free, upgrade when you're ready. All plans include core Arcanea features.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full glass border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-smooth ${
                !isYearly
                  ? 'bg-white text-cosmic-void'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-smooth flex items-center gap-2 ${
                isYearly
                  ? 'bg-white text-cosmic-void'
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
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, i) => {
            const Icon = i === 0 ? Zap : i === 1 ? Sparkles : Crown;
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const period = isYearly ? '/year' : '/month';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className={`relative ${plan.featured ? 'lg:-mt-4' : ''}`}
              >
                {/* Crystal POPULAR badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-crystal to-brand-primary text-cosmic-void text-sm font-sans font-semibold shadow-glow-sm">
                    <Star className="w-3.5 h-3.5 fill-cosmic-void" />
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`rounded-3xl p-8 h-full ${
                    plan.featured
                      ? 'liquid-glass-elevated border-gradient shadow-glow-md'
                      : 'glass'
                  }`}
                >
                  {/* Plan header */}
                  <div className="mb-8">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        plan.featured
                          ? 'bg-crystal/20'
                          : 'glass'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          plan.featured ? 'text-crystal' : 'text-text-secondary'
                        }`}
                      />
                    </div>
                    <h3 className="font-display text-fluid-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="font-sans text-text-secondary">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-fluid-3xl font-bold">
                        {price === 0 ? 'Free' : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="font-sans text-text-muted">{period}</span>
                      )}
                    </div>
                    {isYearly && price > 0 && (
                      <p className="font-sans text-sm text-text-muted mt-2">
                        ${Math.round(price / 12)}/month billed annually
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-sans font-semibold transition-all duration-smooth mb-8 ${
                      plan.featured
                        ? 'bg-gradient-to-r from-crystal to-brand-primary text-cosmic-void shadow-glow-brand hover:shadow-glow-lg'
                        : 'glass border border-white/10 text-white hover:bg-white/10'
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
                              ? 'bg-crystal/20 text-crystal'
                              : 'bg-white/10 text-text-secondary'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-sans text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                    {plan.limits.map((limit) => (
                      <div key={limit} className="flex items-start gap-3 opacity-50">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 glass">
                          <span className="w-2 h-0.5 bg-text-muted rounded-full" />
                        </div>
                        <span className="font-sans text-sm text-text-muted">{limit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-sans text-text-muted mb-4">
            Need custom solutions for your team or enterprise?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-crystal hover:underline transition-colors"
          >
            Contact Sales
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
