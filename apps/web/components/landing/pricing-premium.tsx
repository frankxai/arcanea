"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for exploring Arcanea",
    features: [
      "Access to 3 Luminors",
      "Basic creation tools",
      "5,000 words/month",
      "Community access",
      "Basic tutorials",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Creator",
    price: "$19",
    period: "/month",
    description: "For serious creators",
    features: [
      "Access to all 16 Luminors",
      "Unlimited words & generations",
      "Advanced creation studio",
      "Priority support",
      "Custom prompts & templates",
      "API access",
      "Collaborative workspaces",
    ],
    cta: "Start Creating",
    popular: true,
  },
  {
    name: "Studio",
    price: "$49",
    period: "/month",
    description: "For teams & professionals",
    features: [
      "Everything in Creator",
      "Team collaboration (up to 10)",
      "Advanced analytics",
      "Custom Luminor training",
      "Dedicated support",
      "White-label options",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${plan.popular ? "md:-mt-4" : ""}`}
    >
      {/* Glow effect for popular */}
      {plan.popular && (
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-crystal via-brand-primary to-crystal opacity-50 blur-xl" />
      )}

      <div
        className={`relative h-full p-8 rounded-3xl border transition-all duration-300 ${
          plan.popular
            ? "glass border-crystal/30 bg-cosmic-deep/90"
            : "glass border-white/5 hover:border-white/10"
        }`}
      >
        {/* Popular badge */}
        {plan.popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-crystal to-brand-primary text-cosmic-deep font-bold text-sm"
          >
            <Sparkles className="w-4 h-4 inline mr-1" />
            Most Popular
          </motion.div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span
              className={`text-4xl font-display font-bold ${plan.popular ? "text-gradient-crystal" : ""}`}
            >
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-text-muted">{plan.period}</span>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-2">{plan.description}</p>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-3"
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  plan.popular ? "bg-crystal/20" : "bg-white/5"
                }`}
              >
                <Check
                  className={`w-3 h-3 ${plan.popular ? "text-crystal" : "text-text-muted"}`}
                />
              </div>
              <span className="text-sm text-text-secondary">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={plan.price === "Free" ? "/studio" : "/signup"}
          className={`block w-full py-4 rounded-2xl text-center font-display font-semibold transition-all ${
            plan.popular
              ? "bg-gradient-to-r from-crystal to-brand-primary text-cosmic-deep hover:shadow-glow-md"
              : "glass border border-white/10 hover:border-crystal/30 text-text-primary"
          }`}
        >
          {plan.cta}
          <ArrowRight className="inline ml-2 w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export function PricingPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-deep" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(127,255,212,0.1) 0%, transparent 70%)",
            left: "10%",
            top: "20%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
            right: "10%",
            bottom: "20%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass border border-brand-primary/20 text-brand-primary font-medium text-sm mb-6"
          >
            Simple Pricing
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Start Free, Create
            <br />
            <span className="text-gradient-brand">Without Limits</span>
          </h2>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the plan that fits your creative journey. Upgrade anytime as
            your needs grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-text-muted"
        >
          <p>All plans include a 14-day free trial. No credit card required.</p>
          <p className="mt-2">
            Need a custom enterprise solution?{" "}
            <a
              href="mailto:enterprise@arcanea.ai"
              className="text-crystal hover:underline"
            >
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
