'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MessageSquare, Sparkles, Wand2, Rocket, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Choose Your Luminor',
    description: 'Select from 16 transcended AI intelligences, each with unique expertise. From Oracle the researcher to Chronica the storyteller.',
    colorClass: 'text-crystal',
    bgClass: 'bg-crystal/20',
    borderClass: 'border-crystal/30',
    activeBg: 'bg-crystal/10',
    activeBar: 'bg-crystal',
    visual: 'luminor-selection',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Share Your Vision',
    description: 'Describe what you want to create in natural language. The more context you share, the more aligned your Luminor becomes.',
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/20',
    borderClass: 'border-brand-primary/30',
    activeBg: 'bg-brand-primary/10',
    activeBar: 'bg-brand-primary',
    visual: 'conversation',
  },
  {
    number: '03',
    icon: Wand2,
    title: 'Co-Create Together',
    description: 'Your Luminor generates, iterates, and refines with you. Real-time collaboration that feels like working with a trusted partner.',
    colorClass: 'text-brand-gold',
    bgClass: 'bg-brand-gold/20',
    borderClass: 'border-brand-gold/30',
    activeBg: 'bg-brand-gold/10',
    activeBar: 'bg-brand-gold',
    visual: 'creation',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch Your Creation',
    description: 'Export in any format. Share with the world. Build your creative portfolio. Your journey is just beginning.',
    colorClass: 'text-arcane-fire',
    bgClass: 'bg-arcane-fire/20',
    borderClass: 'border-arcane-fire/30',
    activeBg: 'bg-arcane-fire/10',
    activeBar: 'bg-arcane-fire',
    visual: 'export',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-crystal/5 to-brand-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-primary/20 mb-6">
            <Wand2 className="w-4 h-4 text-brand-primary" />
            <span className="font-sans text-sm font-medium text-brand-primary">Simple Process</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-bold mb-6">
            How it works
          </h2>
          <p className="font-sans text-fluid-lg text-text-secondary max-w-2xl mx-auto">
            From idea to creation in four simple steps. No learning curve, no complicated tools.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Step list */}
          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`group relative glass rounded-2xl p-6 cursor-pointer transition-all duration-smooth hover-lift ${
                    isActive ? `${step.activeBg} ${step.borderClass}` : 'hover:border-white/20'
                  }`}
                >
                  {/* Step number bubble */}
                  <div className={`absolute -left-3 top-6 bubble-shine rounded-full w-8 h-8 flex items-center justify-center font-display text-xs font-semibold ${isActive ? step.colorClass : 'text-text-muted'}`}>
                    {step.number}
                  </div>

                  <div className="flex items-start gap-5 pl-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-smooth ${
                        isActive ? step.bgClass : 'glass group-hover:bg-white/10'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-colors ${
                          isActive ? step.colorClass : 'text-text-muted group-hover:text-white'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className={`font-display text-fluid-xl font-semibold mb-2 transition-colors ${
                          isActive ? step.colorClass : 'text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="font-sans text-fluid-base text-text-secondary leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStep"
                      className={`absolute left-0 top-0 bottom-0 w-1 ${step.activeBar} rounded-full`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Browser mockup */}
            <div className="relative glass rounded-2xl overflow-hidden shadow-elevation-3">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 glass">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg glass font-sans text-xs text-text-muted">
                    arcanea.ai
                  </div>
                </div>
              </div>

              {/* Preview content */}
              <div className="aspect-[4/3] p-8 relative">
                {/* Step-specific visuals */}
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.number}
                    className="absolute inset-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {i === 0 && (
                      // Luminor selection grid
                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <div
                            key={n}
                            className={`aspect-square rounded-xl flex items-center justify-center font-display text-sm font-semibold ${
                              n === 1
                                ? 'bg-crystal/20 border-2 border-crystal text-crystal'
                                : 'glass border border-white/10 text-text-muted'
                            }`}
                          >
                            {['OR', 'CH', 'PR', 'ME', 'LO', 'AN', 'VE', 'FU'][n - 1]}
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      // Conversation interface
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="max-w-[80%] p-4 rounded-2xl bg-crystal/10 border border-crystal/20">
                            <p className="font-sans text-sm text-text-primary">Help me create a fantasy world with unique magic system...</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="max-w-[80%] p-4 rounded-2xl glass border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-5 h-5 rounded-full bg-crystal/30 flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-crystal" />
                              </div>
                              <span className="font-sans text-sm font-semibold text-crystal">Oracle</span>
                            </div>
                            <p className="font-sans text-sm text-text-secondary">Fascinating! Let me help you build a magic system. What elements or themes resonate with your vision?</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      // Creation in progress
                      <div className="h-full flex flex-col">
                        <div className="flex-1 rounded-xl glass border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-sans text-sm font-medium text-text-primary">World Document</span>
                            <span className="font-sans text-xs text-crystal">Generating...</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-white/10 rounded w-full animate-pulse" />
                            <div className="h-3 bg-white/10 rounded w-4/5 animate-pulse" />
                            <div className="h-3 bg-white/10 rounded w-3/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 3 && (
                      // Export options
                      <div className="space-y-3">
                        <h4 className="font-display text-lg font-semibold mb-4 text-text-primary">Export Your Creation</h4>
                        {['PDF Document', 'Word Export', 'Markdown', 'Share Link'].map((format) => (
                          <div
                            key={format}
                            className="p-4 rounded-xl glass border border-white/10 flex items-center justify-between hover:border-crystal/30 transition-colors duration-smooth"
                          >
                            <span className="font-sans text-sm text-text-secondary">{format}</span>
                            <ArrowRight className="w-4 h-4 text-text-muted" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Decorative gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cosmic-surface/80 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -right-4 top-1/4 px-4 py-2 rounded-xl glass border border-white/10 shadow-elevation-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-sans text-sm text-text-primary">Real-time sync</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
