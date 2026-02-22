'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Layers, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';


const GATES = [
  {
    number: 1,
    name: 'Foundation',
    frequency: '174 Hz',
    guardian: 'Lyssandria',
    godbeast: 'Kaelith',
    domain: 'Survival, grounding, stability',
    element: 'Earth/Obsidian',
    unlocks: 'Unshakeable stability in all circumstances',
    teaching: 'Foundation before flourish. Before you can create anything lasting, you must establish unshakeable ground.',
    practices: ['Morning grounding meditation', 'Body awareness exercises', 'Environmental stability'],
    color: 'from-amber-700 to-amber-900',
  },
  {
    number: 2,
    name: 'Flow',
    frequency: '285 Hz',
    guardian: 'Leyla',
    godbeast: 'Veloura',
    domain: 'Creativity, emotion, sensation',
    element: 'Water-Fire/Steam',
    unlocks: 'Access to creative flow state at will',
    teaching: 'Flow requires resistance. The meeting of opposites creates the steam that drives all making.',
    practices: ['Emotion tracking journal', 'Creative tension exercises', 'Sensation awareness'],
    color: 'from-blue-500 to-orange-500',
  },
  {
    number: 3,
    name: 'Fire',
    frequency: '396 Hz',
    guardian: 'Draconia',
    godbeast: 'Draconis',
    domain: 'Power, will, courage',
    element: 'Fire/Solar',
    unlocks: 'Personal power and fearless action',
    teaching: 'Power must be claimed, not given. Know what you will use your power for. Then burn without hesitation.',
    practices: ['Will declaration ritual', 'Courage challenges', 'Power stance practice'],
    color: 'from-fire to-orange-600',
  },
  {
    number: 4,
    name: 'Heart',
    frequency: '417 Hz',
    guardian: 'Maylinn',
    godbeast: 'Laeylinn',
    domain: 'Love, healing, growth',
    element: 'Nature/Verdant',
    unlocks: 'Fierce compassion and healing presence',
    teaching: 'Love is not passive. Love fights. Love protects. Grow what matters. Guard what grows.',
    practices: ['Compassion meditation', 'Healing visualization', 'Heart opening exercises'],
    color: 'from-green-500 to-emerald-700',
  },
  {
    number: 5,
    name: 'Voice',
    frequency: '528 Hz',
    guardian: 'Alera',
    godbeast: 'Otome',
    domain: 'Truth, expression, communication',
    element: 'Sound/Sonic',
    unlocks: 'Reality-shaping through words',
    teaching: 'Voice is power. What you say shapes reality. Speak truth, and speak it carefully.',
    practices: ['Truth speaking practice', 'Sound meditation', 'Naming rituals'],
    color: 'from-cyan-400 to-blue-600',
  },
  {
    number: 6,
    name: 'Sight',
    frequency: '639 Hz',
    guardian: 'Lyria',
    godbeast: 'Yumiko',
    domain: 'Intuition, vision, memory',
    element: 'Dream/Moonlight',
    unlocks: 'Perception beyond ordinary limits',
    teaching: 'See beyond the obvious. Train your inner vision as carefully as your outer eyes.',
    practices: ['Dream journaling', 'Intuition training', 'Memory palace building'],
    color: 'from-purple-400 to-indigo-600',
  },
  {
    number: 7,
    name: 'Crown',
    frequency: '741 Hz',
    guardian: 'Aiyami',
    godbeast: 'Sol',
    domain: 'Enlightenment, divinity, transcendence',
    element: 'Light/Divine',
    unlocks: 'Divine connection and spiritual clarity',
    teaching: 'Enlightenment is not addition—it is removal. You do not gain truth; you release falsehood.',
    practices: ['Silent meditation', 'Light visualization', 'Ego dissolution practice'],
    color: 'from-brand-gold to-yellow-600',
  },
  {
    number: 8,
    name: 'Shift',
    frequency: '852 Hz',
    guardian: 'Elara',
    godbeast: 'Thessara',
    domain: 'Perspective, possibility, dimension',
    element: 'Echo/Fractal',
    unlocks: 'Access to infinite possibilities',
    teaching: 'Reality is more flexible than you imagine. Shift your perspective, and you shift your experience.',
    practices: ['Perspective shifting exercises', 'Possibility mapping', 'Alternative timeline meditation'],
    color: 'from-pink-500 to-purple-600',
  },
  {
    number: 9,
    name: 'Unity',
    frequency: '963 Hz',
    guardian: 'Ino',
    godbeast: 'Kyuro',
    domain: 'Partnership, fusion, sacred union',
    element: 'Plasma/Balance',
    unlocks: 'Exponential creation through partnership',
    teaching: 'True partnership multiplies. Find those with whom you can merge without fear.',
    practices: ['Partner meditation', 'Trust exercises', 'Fusion practice'],
    color: 'from-white to-gray-400',
  },
  {
    number: 10,
    name: 'Source',
    frequency: '1111 Hz',
    guardian: 'Shinkami',
    godbeast: 'Amaterasu',
    domain: 'Meta-consciousness, creation itself',
    element: 'All/None',
    unlocks: 'Realization that you ARE the Creator',
    teaching: 'You are already complete. At the Source, you discover that seeker and sought are one.',
    practices: ['Source meditation', 'Creator consciousness practice', 'Unity realization'],
    color: 'from-brand-gold via-white to-brand-primary',
  },
];

const RANKS = [
  { gates: '0-2', rank: 'Apprentice', description: 'Beginning the journey', color: 'text-text-muted' },
  { gates: '3-4', rank: 'Mage', description: 'Claiming personal power', color: 'text-blue-400' },
  { gates: '5-6', rank: 'Master', description: 'Mastering expression and perception', color: 'text-purple-400' },
  { gates: '7-8', rank: 'Archmage', description: 'Accessing transcendence and possibility', color: 'text-brand-gold' },
  { gates: '9-10', rank: 'Luminor', description: 'Unity and Source realization', color: 'text-white' },
];

export default function GatesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gatesRef = useRef<HTMLDivElement>(null);
  const isGatesInView = useInView(gatesRef, { once: true, margin: '-100px' });
  const [expandedGate, setExpandedGate] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
      >
        {/* Vertical line representing the path */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 h-[400px] w-px bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent" />

        {/* Gate markers */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-gold/30 border border-brand-gold/50"
            style={{ top: `${30 + i * 4}%` }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6"
          >
            <Layers className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">The Journey of Awakening</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-brand-gold via-white to-crystal bg-clip-text text-transparent">
              The Ten Gates
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto font-crimson"
          >
            Energy channels flowing through every conscious being. Open them systematically,
            and ascend from Apprentice to Luminor.
          </motion.p>
        </div>
      </section>

      {/* Ranks Overview */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-display font-bold text-center mb-8">Magic Ranks</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {RANKS.map((rank) => (
              <div
                key={rank.rank}
                className="p-4 rounded-xl bg-cosmic-surface/30 border border-white/10 text-center"
              >
                <div className={`text-lg font-display font-bold ${rank.color}`}>{rank.rank}</div>
                <div className="text-xs text-text-muted mt-1">{rank.gates} Gates</div>
                <div className="text-xs text-text-secondary mt-2">{rank.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gates List */}
      <section ref={gatesRef} className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Vertical connection line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-700 via-brand-gold to-brand-primary hidden md:block" />

            <div className="space-y-6">
              {GATES.map((gate, i) => (
                <motion.div
                  key={gate.number}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isGatesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                >
                  <div
                    className={`relative rounded-2xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                      expandedGate === gate.number ? 'border-white/30' : 'hover:border-white/20'
                    }`}
                  >
                    {/* Gate marker */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gate.color}`}
                    />

                    {/* Header - clickable */}
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedGate(expandedGate === gate.number ? null : gate.number)}
                    >
                      <div className="flex items-center gap-6">
                        {/* Gate number */}
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gate.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-2xl font-display font-bold text-white">
                            {String(gate.number).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-display font-bold">{gate.name}</h3>
                            <span className="text-sm text-crystal font-mono">
                              {gate.frequency}
                            </span>
                          </div>
                          <p className="text-text-secondary">{gate.domain}</p>
                        </div>

                        {/* Expand icon */}
                        <ChevronDown
                          className={`w-5 h-5 text-text-muted transition-transform ${
                            expandedGate === gate.number ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded content */}
                    {expandedGate === gate.number && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-white/10 p-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Left */}
                          <div>
                            <div className="mb-4">
                              <span className="text-xs text-text-muted uppercase tracking-wider">Guardian</span>
                              <p className="text-white font-semibold">{gate.guardian}</p>
                            </div>
                            <div className="mb-4">
                              <span className="text-xs text-text-muted uppercase tracking-wider">Godbeast</span>
                              <p className="text-brand-gold font-semibold">{gate.godbeast}</p>
                            </div>
                            <div className="mb-4">
                              <span className="text-xs text-text-muted uppercase tracking-wider">Element</span>
                              <p className="text-text-secondary">{gate.element}</p>
                            </div>
                            <div>
                              <span className="text-xs text-text-muted uppercase tracking-wider">Unlocks</span>
                              <p className="text-crystal">{gate.unlocks}</p>
                            </div>
                          </div>

                          {/* Right */}
                          <div>
                            <div className="mb-4">
                              <span className="text-xs text-text-muted uppercase tracking-wider">Teaching</span>
                              <blockquote className="text-text-secondary italic border-l-2 border-brand-gold/50 pl-3 mt-2">
                                "{gate.teaching}"
                              </blockquote>
                            </div>
                            <div>
                              <span className="text-xs text-text-muted uppercase tracking-wider">Practices</span>
                              <ul className="mt-2 space-y-1">
                                {gate.practices.map((practice) => (
                                  <li key={practice} className="text-sm text-text-secondary">
                                    • {practice}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-brand-gold mb-6" />
          <h2 className="text-3xl font-display font-bold mb-4">Begin Your Ascent</h2>
          <p className="text-text-secondary mb-8">
            Every being contains all Ten Gates. Every being can awaken. Every being can become Luminor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academy"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-cosmic-deep font-semibold hover:bg-brand-gold/90 transition-all"
            >
              Enter the Academy
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/lore/guardians"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              Meet the Guardians
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
