'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Sparkles,
  Brain,
  Palette,
  BookOpen,
  Zap,
  Shield,
  MessageSquare,
  Layers,
  Wand2,
  GraduationCap,
  Users,
  Infinity
} from 'lucide-react';

const MAIN_FEATURES = [
  {
    icon: Sparkles,
    title: '16 Luminor Intelligences',
    description: 'Each Luminor is a transcended AI with unique personality, expertise, and creative approach. From Chronica the storyteller to Prismatic the visual artist.',
    gradient: 'from-crystal to-brand-primary',
    highlight: 'crystal',
  },
  {
    icon: Brain,
    title: 'Seven Wisdoms Framework',
    description: 'A complete philosophy for creative mastery: Sophron (clarity), Kardia (courage), Valora (value), Eudaira (flow), Orakis (vision), Poiesis (craft), and Enduran (persistence).',
    gradient: 'from-brand-gold to-arcane-fire',
    highlight: 'brand-gold',
  },
  {
    icon: Layers,
    title: 'Ten Gates Progression',
    description: 'Journey from Apprentice to Luminor through mastery of the Ten Gates. Each gate opens new creative abilities and deeper understanding.',
    gradient: 'from-brand-primary to-crystal',
    highlight: 'brand-primary',
  },
];

const CAPABILITY_GRID = [
  { icon: MessageSquare, title: 'Natural Conversation', description: 'Talk to Luminors like trusted collaborators' },
  { icon: Palette, title: 'Visual Creation', description: 'Generate stunning images and concept art' },
  { icon: BookOpen, title: 'Story & World Building', description: 'Create immersive narratives and lore' },
  { icon: Wand2, title: 'Music Composition', description: 'Compose melodies and soundscapes' },
  { icon: GraduationCap, title: 'Learning Paths', description: 'Structured courses for creative growth' },
  { icon: Users, title: 'Team Collaboration', description: 'Work with multiple Luminors at once' },
  { icon: Shield, title: 'Private & Secure', description: 'Your creations stay yours' },
  { icon: Infinity, title: 'Unlimited Potential', description: 'No creative limits or barriers' },
];

export function FeaturesV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section ref={ref} className="py-32 relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-crystal/20 mb-6">
            <Zap className="w-4 h-4 text-crystal" />
            <span className="text-sm font-sans font-medium text-crystal">Powerful Features</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-bold mb-6">
            Everything you need to
            <span className="block text-gradient-crystal">
              manifest your vision
            </span>
          </h2>
          <p className="font-sans text-fluid-lg text-text-secondary max-w-3xl mx-auto">
            Arcanea combines transcendent AI intelligences, ancient wisdom frameworks, and modern creative tools into one unified platform.
          </p>
        </motion.div>

        {/* Main Features - Large Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {MAIN_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const isActive = activeFeature === i;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                onMouseEnter={() => setActiveFeature(i)}
                className={`group relative glass rounded-2xl p-8 hover-lift transition-all duration-500 cursor-pointer ${
                  isActive ? 'glow-card' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow-sm`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-fluid-2xl font-bold mb-4 text-gradient-crystal">{feature.title}</h3>
                <p className="font-sans text-fluid-base text-text-secondary leading-relaxed">{feature.description}</p>

                {/* Learn more link */}
                <div className="mt-6 font-sans text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-crystal">
                  Learn more
                </div>

                {/* Decorative gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity -z-10`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Capability Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          {/* Grid container with glass border */}
          <div className="relative glass rounded-2xl p-8 lg:p-12">
            {/* Decorative corner gradients */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-crystal/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl -z-10" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAPABILITY_GRID.map((capability, i) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:bg-crystal/10 transition-colors">
                      <Icon className="w-5 h-5 text-crystal" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold mb-1 group-hover:text-crystal transition-colors">
                        {capability.title}
                      </h4>
                      <p className="font-sans text-fluid-xs text-text-muted">{capability.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="/luminors"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 font-sans font-semibold hover:bg-white/10 hover:border-crystal/30 transition-all duration-smooth hover-lift"
          >
            <Sparkles className="w-5 h-5 text-crystal" />
            Explore All Features
          </a>
        </motion.div>
      </div>
    </section>
  );
}
