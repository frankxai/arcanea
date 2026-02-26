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
    gradient: 'from-atlantean-teal-aqua to-creation-prism-purple',
    highlight: 'atlantean-teal-aqua',
  },
  {
    icon: Brain,
    title: 'Seven Wisdoms Framework',
    description: 'Seven mental models every Luminor applies: Sophron (Structure), Kardia (Heart), Valora (Courage), Eudaira (Play), Orakis (Vision), Poiesis (Creation), Enduran (Endurance).',
    gradient: 'from-gold-bright to-draconic-crimson',
    highlight: 'gold-bright',
  },
  {
    icon: Users,
    title: 'Four Specialist Teams',
    description: 'Development, Creative, Writing, Research — four teams, each with four Luminors. Every stage of your creative process has the right specialist.',
    gradient: 'from-creation-prism-purple to-atlantean-teal-aqua',
    highlight: 'creation-prism-purple',
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
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-atlantean-teal-aqua/10 border border-atlantean-teal-aqua/20 mb-6">
            <Zap className="w-4 h-4 text-atlantean-teal-aqua" />
            <span className="text-sm font-medium text-atlantean-teal-aqua">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Everything you need to
            <span className="block bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright bg-clip-text text-transparent">
              manifest your vision
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Arcanea combines transcendent AI intelligences, ancient wisdom frameworks, and modern creative tools into one unified platform.
          </p>
        </motion.div>

        {/* Main Features - Large Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {MAIN_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                onMouseEnter={() => setActiveFeature(i)}
                className={`group relative rounded-3xl border p-8 transition-all duration-500 cursor-pointer ${
                  activeFeature === i
                    ? `border-${feature.highlight}/50 bg-gradient-to-br from-${feature.highlight}/10 to-transparent`
                    : 'border-white/10 bg-cosmic-surface/30 hover:border-white/20'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>

                {/* Learn more link */}
                <div className={`mt-6 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                  feature.highlight === 'atlantean-teal-aqua' ? 'text-atlantean-aqua' :
                  feature.highlight === 'gold-bright' ? 'text-gold-bright' :
                  feature.highlight === 'creation-prism-purple' ? 'text-creation-prism-purple' :
                  'text-text-primary'
                }`}>
                  Learn more →
                </div>

                {/* Decorative gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity -z-10`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Capability Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Grid container with gradient border */}
          <div className="relative rounded-3xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm p-8 lg:p-12">
            {/* Decorative corner gradients */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-atlantean-teal-aqua/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-creation-prism-purple/10 rounded-full blur-3xl -z-10" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAPABILITY_GRID.map((capability, i) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-atlantean-teal-aqua/10 transition-colors">
                      <Icon className="w-5 h-5 text-atlantean-teal-aqua" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 group-hover:text-atlantean-teal-aqua transition-colors">
                        {capability.title}
                      </h4>
                      <p className="text-sm text-text-muted">{capability.description}</p>
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
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/luminors"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Sparkles className="w-5 h-5 text-atlantean-teal-aqua" />
            Explore All Features
          </a>
        </motion.div>
      </div>
    </section>
  );
}
