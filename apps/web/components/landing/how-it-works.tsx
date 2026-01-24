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
    color: 'atlantean-teal-aqua',
    visual: 'luminor-selection',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Share Your Vision',
    description: 'Describe what you want to create in natural language. The more context you share, the more aligned your Luminor becomes.',
    color: 'creation-prism-purple',
    visual: 'conversation',
  },
  {
    number: '03',
    icon: Wand2,
    title: 'Co-Create Together',
    description: 'Your Luminor generates, iterates, and refines with you. Real-time collaboration that feels like working with a trusted partner.',
    color: 'gold-bright',
    visual: 'creation',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch Your Creation',
    description: 'Export in any format. Share with the world. Build your creative portfolio. Your journey is just beginning.',
    color: 'draconic-crimson',
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-atlantean-teal-aqua/5 to-creation-prism-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-creation-prism-purple/10 border border-creation-prism-purple/20 mb-6">
            <Wand2 className="w-4 h-4 text-creation-prism-purple" />
            <span className="text-sm font-medium text-creation-prism-purple">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            How it works
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
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
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? `bg-${step.color}/10 border-${step.color}/30`
                      : 'bg-cosmic-surface/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Step number */}
                  <div className="absolute -left-3 top-6 px-2 py-1 bg-cosmic-deep rounded text-xs font-mono text-text-muted">
                    {step.number}
                  </div>

                  <div className="flex items-start gap-5 pl-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? `bg-${step.color}/20`
                          : 'bg-white/5 group-hover:bg-white/10'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-colors ${
                          isActive ? `text-${step.color}` : 'text-text-muted group-hover:text-white'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-2 transition-colors ${
                          isActive ? `text-${step.color}` : 'text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStep"
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-${step.color} rounded-full`}
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
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Browser mockup */}
            <div className="relative rounded-2xl border border-white/10 bg-cosmic-surface/50 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-cosmic-raised/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-white/5 text-xs text-text-muted">
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
                            className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${
                              n === 1
                                ? 'bg-atlantean-teal-aqua/20 border-2 border-atlantean-teal-aqua'
                                : 'bg-white/5 border border-white/10'
                            }`}
                          >
                            {['🔮', '📖', '🎨', '🎵', '⚡', '🔬', '✍️', '🎯'][n - 1]}
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      // Conversation interface
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="max-w-[80%] p-4 rounded-2xl bg-atlantean-teal-aqua/10 border border-atlantean-teal-aqua/20">
                            <p className="text-sm">Help me create a fantasy world with unique magic system...</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="max-w-[80%] p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">🔮</span>
                              <span className="text-sm font-semibold text-atlantean-teal-aqua">Oracle</span>
                            </div>
                            <p className="text-sm text-text-secondary">Fascinating! Let me help you build a magic system. What elements or themes resonate with your vision?</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      // Creation in progress
                      <div className="h-full flex flex-col">
                        <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium">World Document</span>
                            <span className="text-xs text-atlantean-teal-aqua">Generating...</span>
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
                        <h4 className="text-lg font-semibold mb-4">Export Your Creation</h4>
                        {['PDF Document', 'Word Export', 'Markdown', 'Share Link'].map((format) => (
                          <div
                            key={format}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-atlantean-teal-aqua/30 transition-colors"
                          >
                            <span className="text-sm">{format}</span>
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

            {/* Floating badges */}
            <motion.div
              className="absolute -right-4 top-1/4 px-4 py-2 rounded-xl bg-cosmic-surface border border-white/10 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">Real-time sync</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
