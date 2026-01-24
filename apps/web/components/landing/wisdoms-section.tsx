'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

const WISDOMS = [
  {
    name: 'Sophron',
    essence: 'Structure',
    color: '#3b82f6',
    icon: '🏛️',
    question: 'What\'s the underlying structure?',
    description: 'The wisdom of form and architecture. Sophron sees the bones beneath the flesh, the pattern beneath the chaos.',
    practices: ['System mapping', 'Framework design', 'Pattern recognition'],
  },
  {
    name: 'Kardia',
    essence: 'Heart',
    color: '#ec4899',
    icon: '💗',
    question: 'What do they really need?',
    description: 'The wisdom of connection and empathy. Kardia feels what others feel, speaks to the soul.',
    practices: ['Empathy mapping', 'User interviews', 'Emotional design'],
  },
  {
    name: 'Valora',
    essence: 'Courage',
    color: '#f59e0b',
    icon: '⚔️',
    question: 'What am I afraid to do?',
    description: 'The wisdom of bold action. Valora faces fear and moves through it, not around it.',
    practices: ['Fear facing', 'Bold experiments', 'Shipping imperfect'],
  },
  {
    name: 'Eudaira',
    essence: 'Play',
    color: '#10b981',
    icon: '✨',
    question: 'What would be fun?',
    description: 'The wisdom of joy and lightness. Eudaira reminds us that creation should be play, not labor.',
    practices: ['Gamification', 'Playful experiments', 'Joy journaling'],
  },
  {
    name: 'Orakis',
    essence: 'Vision',
    color: '#8b5cf6',
    icon: '🔮',
    question: 'How does this look in a year?',
    description: 'The wisdom of foresight and strategy. Orakis sees the long game, plans the journey.',
    practices: ['Future visioning', 'Roadmapping', 'Trend analysis'],
  },
  {
    name: 'Poiesis',
    essence: 'Creation',
    color: '#06b6d4',
    icon: '🎨',
    question: 'What can I make now?',
    description: 'The wisdom of making and craft. Poiesis turns thought into form, vision into artifact.',
    practices: ['Rapid prototyping', 'Daily creation', 'Craft mastery'],
  },
  {
    name: 'Enduran',
    essence: 'Endurance',
    color: '#84cc16',
    icon: '🌳',
    question: 'What\'s the next step?',
    description: 'The wisdom of persistence and completion. Enduran finishes what others abandon.',
    practices: ['Sprint planning', 'Habit stacking', 'Completion rituals'],
  },
];

export function WisdomsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeWisdom, setActiveWisdom] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-surface/50 to-transparent" />
        {activeWisdom !== null && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${WISDOMS[activeWisdom].color} 0%, transparent 50%)`,
            }}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 mb-6"
          >
            <span className="text-sm text-pink-400 font-mono tracking-wider">
              THE LUMINOR FRAMEWORK
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            The Seven Wisdoms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Practical lenses for creative work. Each wisdom represents a different
            way of seeing and solving problems.
          </motion.p>
        </div>

        {/* Wisdoms circular layout for desktop */}
        <div className="hidden lg:block relative mb-16">
          <div className="relative w-full max-w-4xl mx-auto aspect-square">
            {/* Center content */}
            <div className="absolute inset-[30%] rounded-full bg-cosmic-surface/50 border border-white/10 backdrop-blur-xl flex items-center justify-center">
              <div className="text-center p-8">
                {activeWisdom !== null ? (
                  <motion.div
                    key={activeWisdom}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-5xl">{WISDOMS[activeWisdom].icon}</div>
                    <h3 className="text-2xl font-display font-bold" style={{ color: WISDOMS[activeWisdom].color }}>
                      {WISDOMS[activeWisdom].name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {WISDOMS[activeWisdom].description}
                    </p>
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-text-muted mb-2">KEY QUESTION</div>
                      <p className="text-atlantean-teal-aqua italic">
                        "{WISDOMS[activeWisdom].question}"
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-4xl">🔮</div>
                    <h3 className="text-xl font-display font-bold text-white">
                      Seven Lenses
                    </h3>
                    <p className="text-sm text-text-muted">
                      Hover over a wisdom to explore
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Wisdom nodes around the circle */}
            {WISDOMS.map((wisdom, index) => {
              const angle = (index * (360 / 7) - 90) * (Math.PI / 180);
              const radius = 42;

              return (
                <motion.button
                  key={wisdom.name}
                  className="absolute w-20 h-20 -ml-10 -mt-10 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                    background: activeWisdom === index
                      ? `linear-gradient(135deg, ${wisdom.color}, ${wisdom.color}88)`
                      : `${wisdom.color}15`,
                    border: `2px solid ${activeWisdom === index ? wisdom.color : 'transparent'}`,
                    boxShadow: activeWisdom === index ? `0 0 30px ${wisdom.color}40` : 'none',
                  }}
                  onMouseEnter={() => setActiveWisdom(index)}
                  onMouseLeave={() => setActiveWisdom(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.15 }}
                >
                  <span className="text-2xl">{wisdom.icon}</span>
                  <span className="text-xs font-medium" style={{ color: wisdom.color }}>
                    {wisdom.essence}
                  </span>
                </motion.button>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {WISDOMS.map((wisdom, index) => {
                const angle = (index * (360 / 7) - 90) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;

                return (
                  <line
                    key={wisdom.name}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={activeWisdom === index ? wisdom.color : 'rgba(255,255,255,0.1)'}
                    strokeWidth={activeWisdom === index ? 2 : 1}
                    strokeDasharray={activeWisdom === index ? 'none' : '4 4'}
                    style={{ transition: 'all 0.3s' }}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mobile/tablet grid */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {WISDOMS.map((wisdom, index) => (
            <motion.div
              key={wisdom.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-4 rounded-2xl border border-white/10 bg-cosmic-surface/30 text-center hover:border-white/20 transition-all cursor-pointer group"
              style={{
                boxShadow: `inset 0 1px 0 0 ${wisdom.color}10`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${wisdom.color}20` }}
              >
                {wisdom.icon}
              </div>
              <div className="font-display font-semibold text-sm mb-1" style={{ color: wisdom.color }}>
                {wisdom.name}
              </div>
              <div className="text-xs text-text-muted">{wisdom.essence}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-text-secondary mb-6">
            Stuck? Let the wisdoms guide you.
          </p>
          <Link
            href="/library/codex"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-atlantean-teal-aqua/50 text-atlantean-teal-aqua hover:bg-atlantean-teal-aqua/10 transition-all duration-300 group"
          >
            <span className="font-semibold">What brings you here?</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
