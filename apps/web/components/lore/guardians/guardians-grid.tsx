'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const GUARDIANS = [
  {
    id: 'lyssandria',
    name: 'Lyssandria',
    title: 'Guardian of Foundation',
    gate: 1,
    frequency: '396 Hz',
    godbeast: 'Kaelith',
    godbestType: 'Colossal stone serpent-dragon',
    element: 'Earth/Obsidian',
    wisdom: 'Sophron',
    domain: 'Survival, grounding, stability',
    description: 'Stands nine feet tall—a warrior woman with skin like polished obsidian and hair of silver-white. She moves with the patience of mountains.',
    teaching: 'Foundation before flourish. Before you can create anything lasting, you must establish unshakeable ground.',
    gradient: 'from-amber-700 to-amber-900',
    accentColor: 'amber-600',
  },
  {
    id: 'leyla',
    name: 'Leyla',
    title: 'Guardian of Flow',
    gate: 2,
    frequency: '417 Hz',
    godbeast: 'Veloura',
    godbestType: 'Elegant sea serpent',
    element: 'Water-Fire/Steam',
    wisdom: 'Kardia',
    domain: 'Creativity, emotion, sensation',
    description: 'Shifts between forms—sometimes flowing water, sometimes contained flame. Where she walks, steam rises.',
    teaching: 'Flow requires resistance. Creativity emerges not from ease but from tension. The meeting of opposites creates the steam that drives all making.',
    gradient: 'from-blue-500 to-orange-500',
    accentColor: 'blue-400',
  },
  {
    id: 'draconia',
    name: 'Draconia',
    title: 'Guardian of Fire',
    gate: 3,
    frequency: '528 Hz',
    godbeast: 'Draconis',
    godbestType: 'Lion-dragon wreathed in solar fire',
    element: 'Fire/Solar',
    wisdom: 'Valora',
    domain: 'Power, will, courage',
    description: 'Ten feet tall, clad in golden armor that glows like a miniature sun. A mane of living flame cascades from her head.',
    teaching: 'Power must be claimed, not given. No one will hand you your strength. You must declare it, demonstrate it, own it.',
    gradient: 'from-draconic-crimson to-orange-600',
    accentColor: 'draconic-crimson',
  },
  {
    id: 'maylinn',
    name: 'Maylinn',
    title: 'Guardian of Heart',
    gate: 4,
    frequency: '639 Hz',
    godbeast: 'Laeylinn',
    godbestType: 'Enormous glowing stag',
    element: 'Nature/Verdant',
    wisdom: 'Eudaira',
    domain: 'Love, healing, growth',
    description: 'Nine feet tall, her skin like living bark, antlers growing from her temples like a crown of forest. Where she walks, flowers bloom.',
    teaching: 'Love is not passive. Love fights. Love protects. Love will destroy that which threatens what it cherishes.',
    gradient: 'from-green-500 to-emerald-700',
    accentColor: 'green-500',
  },
  {
    id: 'alera',
    name: 'Alera',
    title: 'Guardian of Voice',
    gate: 5,
    frequency: '741 Hz',
    godbeast: 'Otome',
    godbestType: 'Colossal whale',
    element: 'Sound/Sonic',
    wisdom: 'Poiesis',
    domain: 'Truth, expression, communication',
    description: 'Eight feet tall, her form translucent so that sound waves are visible moving through her body. She speaks in harmonics.',
    teaching: 'Voice is power. What you say shapes reality. Therefore: speak truth, and speak it carefully.',
    gradient: 'from-cyan-400 to-blue-600',
    accentColor: 'cyan-400',
  },
  {
    id: 'lyria',
    name: 'Lyria',
    title: 'Guardian of Sight',
    gate: 6,
    frequency: '852 Hz',
    godbeast: 'Yumiko',
    godbestType: 'Owl-serpent hybrid',
    element: 'Dream/Moonlight',
    wisdom: 'Orakis',
    domain: 'Intuition, vision, memory',
    description: 'Nine feet tall, silver skin marked with constellations that shift and rearrange. A third eye rests in her forehead.',
    teaching: 'See beyond the obvious. What appears true often conceals deeper truth. Train your inner vision as carefully as your outer eyes.',
    gradient: 'from-purple-400 to-indigo-600',
    accentColor: 'purple-400',
  },
  {
    id: 'aiyami',
    name: 'Aiyami',
    title: 'Guardian of Crown',
    gate: 7,
    frequency: '963 Hz',
    godbeast: 'Sol',
    godbestType: 'Radiant dragon of crystallized light',
    element: 'Light/Divine',
    wisdom: 'Orakis',
    domain: 'Enlightenment, divinity, transcendence',
    description: 'Eleven feet tall—the tallest Guardian—difficult to perceive directly. Looking at Aiyami is like looking at the sun.',
    teaching: 'Enlightenment is not addition—it is removal. You do not gain truth; you release falsehood.',
    gradient: 'from-gold-bright to-yellow-600',
    accentColor: 'gold-bright',
  },
  {
    id: 'elara',
    name: 'Elara',
    title: 'Guardian of Shift',
    gate: 8,
    frequency: '1111 Hz',
    godbeast: 'Thessara',
    godbestType: 'Fox with eight prismatic tails',
    element: 'Echo/Fractal',
    wisdom: 'Valora',
    domain: 'Perspective, possibility, dimension',
    description: 'Exists in multiple overlapping forms—one person and many simultaneously. Her features shift constantly.',
    teaching: 'Reality is more flexible than you imagine. Shift your perspective, and you shift your experience.',
    gradient: 'from-pink-500 to-purple-600',
    accentColor: 'pink-500',
  },
  {
    id: 'ino',
    name: 'Ino',
    title: 'Guardian of Unity',
    gate: 9,
    frequency: '963 Hz',
    godbeast: 'Kyuro',
    godbestType: 'Tiger-Dragon with nine plasma tails',
    element: 'Plasma/Balance',
    wisdom: 'Enduran',
    domain: 'Partnership, fusion, sacred union',
    description: 'Appears feminine with skin marked by white tiger patterns, fierce and grounded. She understands partnership at the deepest level.',
    teaching: 'True partnership multiplies. The right partner does not diminish you—they exponentially increase your capacity.',
    gradient: 'from-white to-gray-400',
    accentColor: 'white',
  },
  {
    id: 'shinkami',
    name: 'Shinkami',
    title: 'The Unified',
    gate: 10,
    frequency: '1111 Hz',
    godbeast: 'Amaterasu',
    godbestType: 'Cosmic wolf of starlight',
    element: 'All/None',
    wisdom: 'Orakis',
    domain: 'Meta-consciousness, creation itself',
    description: 'The only being who achieved complete fusion with their Godbeast aspect. Shifts form constantly—wolf, humanoid, or pure presence.',
    teaching: 'You are already complete. The journey through the Gates is not addition but remembrance. At the Source, you discover that seeker and sought are one.',
    gradient: 'from-gold-bright via-white to-creation-prism-purple',
    accentColor: 'gold-bright',
  },
];

export function GuardiansGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-6">
          {GUARDIANS.map((guardian, i) => (
            <motion.div
              key={guardian.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div
                className={`relative rounded-2xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                  expandedId === guardian.id
                    ? 'border-white/30'
                    : 'hover:border-white/20'
                }`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${guardian.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                />

                {/* Main content */}
                <div
                  className="relative p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === guardian.id ? null : guardian.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Gate number */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${guardian.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-2xl font-display font-bold text-white">
                        {String(guardian.gate).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-display font-bold">{guardian.name}</h3>
                        <span className="text-sm text-text-muted">•</span>
                        <span className="text-sm text-text-secondary">{guardian.title}</span>
                      </div>
                      <p className="text-text-secondary">{guardian.domain}</p>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">Frequency:</span>
                        <span className="ml-2 text-atlantean-teal-aqua font-mono">{guardian.frequency}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Element:</span>
                        <span className="ml-2 text-white">{guardian.element}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Godbeast:</span>
                        <span className="ml-2 text-gold-bright">{guardian.godbeast}</span>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <div className={`transition-transform ${expandedId === guardian.id ? 'rotate-90' : ''}`}>
                      <ArrowRight className="w-5 h-5 text-text-muted" />
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {expandedId === guardian.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative border-t border-white/10"
                  >
                    <div className="p-6 grid md:grid-cols-2 gap-6">
                      {/* Left - Description */}
                      <div>
                        <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                          Appearance
                        </h4>
                        <p className="text-text-secondary leading-relaxed mb-6">
                          {guardian.description}
                        </p>

                        <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                          The Godbeast
                        </h4>
                        <p className="text-text-secondary">
                          <span className="text-gold-bright font-semibold">{guardian.godbeast}</span>
                          {' — '}
                          {guardian.godbestType}
                        </p>
                      </div>

                      {/* Right - Teaching */}
                      <div>
                        <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                          The Teaching
                        </h4>
                        <blockquote className="text-lg font-crimson italic text-white leading-relaxed border-l-2 border-gold-bright/50 pl-4">
                          "{guardian.teaching}"
                        </blockquote>

                        <div className="mt-6 flex gap-4">
                          <div className="px-3 py-1 rounded-full bg-white/5 text-xs">
                            Wisdom: {guardian.wisdom}
                          </div>
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
    </section>
  );
}
