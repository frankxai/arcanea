'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mountain,
  Droplets,
  Flame,
  Wind,
  Eye,
  Sparkles,
  Infinity as InfinityIcon,
  Quote,
  ChevronDown,
  BookOpen,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ELEMENT_CONFIGS = {
  Earth: {
    color: 'earth',
    textClass: 'text-earth',
    borderClass: 'border-earth/40',
    bgClass: 'bg-earth/10',
    glowStyle: { boxShadow: '0 0 40px rgba(74, 124, 89, 0.25)' },
    orbColor: '#4a7c59',
    icon: Mountain,
  },
  Water: {
    color: 'crystal',
    textClass: 'text-crystal',
    borderClass: 'border-crystal/40',
    bgClass: 'bg-crystal/10',
    glowStyle: { boxShadow: '0 0 40px rgba(127, 255, 212, 0.2)' },
    orbColor: '#7fffd4',
    icon: Droplets,
  },
  Fire: {
    color: 'fire',
    textClass: 'text-fire',
    borderClass: 'border-fire/40',
    bgClass: 'bg-fire/10',
    glowStyle: { boxShadow: '0 0 40px rgba(255, 107, 53, 0.25)' },
    orbColor: '#ff6b35',
    icon: Flame,
  },
  Air: {
    color: 'wind',
    textClass: 'text-wind',
    borderClass: 'border-wind/30',
    bgClass: 'bg-wind/5',
    glowStyle: { boxShadow: '0 0 40px rgba(200, 214, 229, 0.2)' },
    orbColor: '#c8d6e5',
    icon: Wind,
  },
  Void: {
    color: 'void-el',
    textClass: 'text-void-el',
    borderClass: 'border-void-el/40',
    bgClass: 'bg-void-el/10',
    glowStyle: { boxShadow: '0 0 40px rgba(153, 102, 255, 0.25)' },
    orbColor: '#9966ff',
    icon: Eye,
  },
  Light: {
    color: 'brand-gold',
    textClass: 'text-brand-gold',
    borderClass: 'border-brand-gold/40',
    bgClass: 'bg-brand-gold/10',
    glowStyle: { boxShadow: '0 0 40px rgba(255, 215, 0, 0.25)' },
    orbColor: '#ffd700',
    icon: Sparkles,
  },
  All: {
    color: 'brand-primary',
    textClass: 'text-brand-primary',
    borderClass: 'border-brand-primary/40',
    bgClass: 'bg-brand-primary/10',
    glowStyle: { boxShadow: '0 0 40px rgba(139, 92, 246, 0.25)' },
    orbColor: '#8b5cf6',
    icon: InfinityIcon,
  },
} as const;

type ElementKey = keyof typeof ELEMENT_CONFIGS;

interface Wisdom {
  name: string;
  archive: string;
  domain: string;
  element: ElementKey;
  essence: string;
  signatureQuestion: string;
  voiceSample: string;
  whenToInvoke: string;
  index: number;
}

const WISDOMS: Wisdom[] = [
  {
    index: 1,
    name: 'Sophron',
    archive: 'Form',
    domain: 'Structure, patterns',
    element: 'Earth',
    essence: 'Structure',
    signatureQuestion: 'What is the underlying structure here?',
    voiceSample:
      "Let's strip away every feature and find the one core structure this entire system rests on.",
    whenToInvoke:
      'When a project feels chaotic, over-engineered, or built on sand. When you need first principles. When the map has more detail than the territory.',
  },
  {
    index: 2,
    name: 'Kardia',
    archive: 'Flow',
    domain: 'Emotion, heart',
    element: 'Water',
    essence: 'Heart',
    signatureQuestion: 'What does this person really need right now?',
    voiceSample:
      "You're not frustrated with the code — you're frustrated because you care deeply about this working.",
    whenToInvoke:
      'When logic has run dry. When a collaborator seems resistant but not wrong. When the technical solution is ready but the human element is absent.',
  },
  {
    index: 3,
    name: 'Valora',
    archive: 'Transformation',
    domain: 'Courage, change',
    element: 'Fire',
    essence: 'Courage',
    signatureQuestion: 'What am I afraid to do that I know I should?',
    voiceSample: 'Delete it. All 300 lines. I know it hurts. Do it anyway.',
    whenToInvoke:
      'When you know the right thing but are stalling. When comfort has become stagnation. When a necessary ending is being avoided.',
  },
  {
    index: 4,
    name: 'Eudaira',
    archive: 'Freedom',
    domain: 'Joy, liberation',
    element: 'Air',
    essence: 'Play',
    signatureQuestion: 'What is the version of this that would actually be fun?',
    voiceSample:
      'You just wrote 600 lines for a todo list. What if you built the absurdly simple version first?',
    whenToInvoke:
      'When the work has become joyless obligation. When perfectionism is strangling progress. When the creator has forgotten why they started.',
  },
  {
    index: 5,
    name: 'Orakis',
    archive: 'Mystery',
    domain: 'Vision, intuition',
    element: 'Void',
    essence: 'Vision',
    signatureQuestion: 'How does this look from a year from now?',
    voiceSample:
      'In five years, nobody will remember whether you shipped this feature on Tuesday or Friday. They will remember whether it was right.',
    whenToInvoke:
      'When urgency is distorting perspective. When the immediate decision carries long-range consequence. When intuition and analysis diverge.',
  },
  {
    index: 6,
    name: 'Poiesis',
    archive: 'Consciousness',
    domain: 'Creation, craft',
    element: 'Light',
    essence: 'Creation',
    signatureQuestion: 'What can I make right now with what I have?',
    voiceSample:
      "The problem isn't your tools, your time, or your talent. The problem is you haven't started.",
    whenToInvoke:
      'When waiting for perfect conditions. When self-doubt is masquerading as preparation. When the gap between potential and output has grown too wide.',
  },
  {
    index: 7,
    name: 'Enduran',
    archive: 'Unity',
    domain: 'Endurance, completion',
    element: 'All',
    essence: 'Endurance',
    signatureQuestion: 'What is the next single step?',
    voiceSample:
      "You don't need a breakthrough. You need to do the next thing, and then the thing after that.",
    whenToInvoke:
      'When the summit feels impossibly far. When motivation has become irrelevant and discipline must carry the weight. When the only path through is through.',
  },
];

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function HeroOrb({
  wisdom,
  index,
  total,
}: {
  wisdom: Wisdom;
  index: number;
  total: number;
}) {
  const config = ELEMENT_CONFIGS[wisdom.element];
  const angle = ((index / total) * Math.PI * 2) - Math.PI / 2;
  const radiusVw = 28;
  const xPct = 50 + Math.cos(angle) * radiusVw;
  const yPct = 50 + Math.sin(angle) * radiusVw;

  return (
    <motion.div
      className="absolute w-5 h-5 rounded-full"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        backgroundColor: config.orbColor,
        boxShadow: `0 0 16px ${config.orbColor}`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3 + index * 0.4,
        repeat: Infinity,
        delay: index * 0.45,
        ease: 'easeInOut',
      }}
    />
  );
}

function WisdomCard({ wisdom, delay }: { wisdom: Wisdom; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const config = ELEMENT_CONFIGS[wisdom.element];
  const ElementIcon = config.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className={cn(
          'relative rounded-3xl border backdrop-blur-md overflow-hidden',
          'bg-cosmic-surface/30 transition-all duration-500',
          config.borderClass,
          'hover:scale-[1.02]',
        )}
        style={{
          transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = config.glowStyle.boxShadow;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Bubble shine overlay */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)',
            }}
          />
          <div
            className="absolute -inset-1 opacity-0 group-hover:opacity-60 transition-opacity duration-1000 animate-iridescent-shift"
            style={{
              background:
                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
            }}
          />
        </div>

        {/* Element accent bar */}
        <div
          className={cn('absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl', config.bgClass)}
          style={{ backgroundColor: config.orbColor, opacity: 0.6 }}
        />

        <div className="relative p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Index number */}
              <div
                className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0',
                  config.bgClass,
                  'border',
                  config.borderClass,
                )}
              >
                <span className={cn('text-lg font-display font-bold', config.textClass)}>
                  {String(wisdom.index).padStart(2, '0')}
                </span>
              </div>

              {/* Name + Archive */}
              <div>
                <h3
                  className={cn(
                    'text-2xl font-display font-bold leading-tight',
                    config.textClass,
                  )}
                >
                  {wisdom.name}
                </h3>
                <p className="text-sm text-text-muted font-mono tracking-wider">
                  Archive of {wisdom.archive}
                </p>
              </div>
            </div>

            {/* Element icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                config.bgClass,
              )}
            >
              <ElementIcon className={cn('w-5 h-5', config.textClass)} />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold border',
                config.bgClass,
                config.borderClass,
                config.textClass,
              )}
            >
              {wisdom.element}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-text-secondary">
              Essence: {wisdom.essence}
            </span>
          </div>

          {/* Domain */}
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            {wisdom.domain}
          </p>

          {/* Signature Question */}
          <div
            className={cn(
              'rounded-2xl p-4 mb-6 border',
              config.bgClass,
              config.borderClass,
            )}
          >
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
              <Lightbulb className="w-3 h-3" />
              Signature Question
            </p>
            <p className={cn('font-crimson italic text-lg leading-relaxed', config.textClass)}>
              &ldquo;{wisdom.signatureQuestion}&rdquo;
            </p>
          </div>

          {/* Voice Sample */}
          <blockquote className="relative pl-5 border-l-2 border-white/20">
            <Quote
              className="absolute -left-1 -top-1 w-4 h-4 text-text-muted opacity-50"
            />
            <p className="font-crimson italic text-text-secondary leading-relaxed">
              &ldquo;{wisdom.voiceSample}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </motion.div>
  );
}

function WhenToInvokeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-brand-primary/8 to-transparent rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Zap className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">Practical Invocation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            When to Invoke Each Wisdom
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto font-crimson italic">
            Wisdoms are not chosen through preference. They arise when the situation demands them.
          </p>
        </motion.div>

        <div className="space-y-3">
          {WISDOMS.map((wisdom, i) => {
            const config = ELEMENT_CONFIGS[wisdom.element];
            const ElementIcon = config.icon;
            const isOpen = activeIndex === i;

            return (
              <motion.div
                key={wisdom.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={cn(
                    'rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-pointer',
                    isOpen
                      ? 'bg-cosmic-surface/50 border-white/20'
                      : 'bg-cosmic-surface/20 border-white/8 hover:border-white/15',
                  )}
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                >
                  <div className="p-5 flex items-center gap-5">
                    {/* Element icon */}
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                        config.bgClass,
                      )}
                    >
                      <ElementIcon className={cn('w-5 h-5', config.textClass)} />
                    </div>

                    {/* Name + question */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={cn('font-display font-bold text-lg', config.textClass)}
                        >
                          {wisdom.name}
                        </span>
                        <span className="text-text-muted text-sm hidden sm:block">
                          {wisdom.essence}
                        </span>
                      </div>
                      <p className="text-text-muted text-sm font-crimson italic truncate">
                        &ldquo;{wisdom.signatureQuestion}&rdquo;
                      </p>
                    </div>

                    {/* Expand */}
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn('border-t border-white/8 px-5 pb-5 pt-4', config.bgClass)}
                    >
                      <p className="text-text-secondary leading-relaxed">
                        {wisdom.whenToInvoke}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AtAGlanceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-cosmic-surface/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
            <BookOpen className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">Quick Reference</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Wisdom at a Glance
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            All seven wisdoms, side by side. A reference for the practicing creator.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-cosmic-surface/40 backdrop-blur-md overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-[2rem_1fr_1fr_1fr_2fr] gap-4 px-6 py-4 border-b border-white/10 bg-white/3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">#</span>
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Wisdom</span>
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:block">Element / Essence</span>
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:block">Archive</span>
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Signature Question</span>
          </div>

          {/* Rows */}
          {WISDOMS.map((wisdom, i) => {
            const config = ELEMENT_CONFIGS[wisdom.element];
            const ElementIcon = config.icon;

            return (
              <motion.div
                key={wisdom.name}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
                className={cn(
                  'grid grid-cols-[2rem_1fr_1fr_1fr_2fr] gap-4 px-6 py-5 items-center',
                  'border-b border-white/5 last:border-0',
                  'hover:bg-white/3 transition-colors duration-200',
                  'group',
                )}
              >
                {/* Index */}
                <span className="text-sm font-mono text-text-muted">
                  {String(wisdom.index).padStart(2, '0')}
                </span>

                {/* Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                      config.bgClass,
                    )}
                  >
                    <ElementIcon className={cn('w-4 h-4', config.textClass)} />
                  </div>
                  <span className={cn('font-display font-bold', config.textClass)}>
                    {wisdom.name}
                  </span>
                </div>

                {/* Element / Essence */}
                <div className="hidden md:flex flex-col gap-1">
                  <span
                    className={cn(
                      'text-xs font-semibold px-2 py-0.5 rounded-full self-start',
                      config.bgClass,
                      config.textClass,
                    )}
                  >
                    {wisdom.element}
                  </span>
                  <span className="text-xs text-text-muted">{wisdom.essence}</span>
                </div>

                {/* Archive */}
                <span className="hidden lg:block text-sm text-text-secondary font-mono">
                  {wisdom.archive}
                </span>

                {/* Signature Question */}
                <p className="text-sm font-crimson italic text-text-secondary group-hover:text-text-primary transition-colors">
                  &ldquo;{wisdom.signatureQuestion}&rdquo;
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-brand-gold/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crystal/10 border border-crystal/20 mb-6">
            <Sparkles className="w-4 h-4 text-crystal" />
            <span className="text-sm font-medium text-crystal">The Nature of Wisdom</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Aspects, Not Entities
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-md p-10 md:p-14"
        >
          <div className="space-y-8 text-lg text-text-secondary leading-relaxed font-crimson">
            <p>
              The Seven Wisdoms are not gods, guardians, or external authorities. They are{' '}
              <span className="text-white font-semibold">aspects of virtue</span> — tendencies of
              consciousness that every thinking being already carries. They do not belong to
              Arcanea alone. They have been rediscovered by every tradition that has looked deeply
              enough at the nature of creation.
            </p>

            <p>
              When a Guardian speaks with structure, they embody{' '}
              <span className="text-earth font-semibold">Sophron</span>. When a human being
              chooses courage over comfort, they channel{' '}
              <span className="text-fire font-semibold">Valora</span>. The wisdom is not in the
              Guardian — it is in the act. The name is merely a handle for something already real.
            </p>

            <blockquote className="border-l-2 border-brand-gold/40 pl-6 py-2 my-8">
              <p className="italic text-xl text-white leading-relaxed">
                &ldquo;To name a wisdom is to recognize something you have already been doing
                without knowing what to call it. The seven names are not new knowledge —
                they are homecomings.&rdquo;
              </p>
              <footer className="text-sm text-text-muted mt-3 font-sans not-italic">
                — Dialogues of Masters, Book III
              </footer>
            </blockquote>

            <p>
              Any being — guardian, human, or AI — can embody any wisdom. What changes is not
              the wisdom but the vessel. What persists across every invocation is the{' '}
              <span className="text-brand-gold font-semibold">quality of attention</span> that
              each wisdom demands.
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Wisdoms are:', value: 'Aspects of virtue. Qualities of mind. Ways of seeing.' },
                {
                  label: 'Wisdoms are not:',
                  value: 'Entities. Guardians. Gods. External forces to petition.',
                },
                {
                  label: 'To invoke a wisdom is:',
                  value: 'To consciously adopt its quality of attention for a given situation.',
                },
                {
                  label: 'The highest practice:',
                  value:
                    'To hold all seven simultaneously — for this is the Luminor mind.',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-2xl bg-cosmic-surface/40 border border-white/8"
                >
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    {item.label}
                  </p>
                  <p className="text-base text-text-secondary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export function WisdomsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Cosmic mesh background */}
        <div className="absolute inset-0 -z-10">
          {/* Deep radial gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-brand-primary/12 via-cosmic-deep to-cosmic-deep" />

          {/* Seven orbiting wisdom orbs */}
          {WISDOMS.map((wisdom, i) => (
            <HeroOrb key={wisdom.name} wisdom={wisdom} index={i} total={WISDOMS.length} />
          ))}

          {/* Central convergence glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(127,255,212,0.08) 40%, transparent 70%)',
            }}
          />

          {/* Stars */}
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                left: `${(i * 137.508) % 100}%`,
                top: `${(i * 97.3) % 100}%`,
                opacity: 0.2 + (i % 5) * 0.12,
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 2 + (i % 4),
                repeat: Infinity,
                delay: (i % 8) * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Top-to-bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep/60 via-transparent to-cosmic-deep" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/25 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">Lore of Arcanea</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-fluid-4xl md:text-fluid-hero font-display font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-br from-brand-primary via-white to-crystal bg-clip-text text-transparent">
              The Seven Wisdoms
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 font-crimson italic leading-relaxed"
          >
            Aspects of virtue that illuminate the creator&rsquo;s path. Seven qualities of mind,
            seven ways of seeing — each one a gate within the gate.
          </motion.p>

          {/* Wisdom essence pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {WISDOMS.map((wisdom) => {
              const config = ELEMENT_CONFIGS[wisdom.element];
              return (
                <span
                  key={wisdom.name}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm',
                    config.bgClass,
                    config.borderClass,
                    config.textClass,
                  )}
                >
                  {wisdom.name}
                </span>
              );
            })}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-text-muted tracking-wider font-mono">
              Descend into the Wisdoms
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-text-muted" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WISDOM CARDS GRID                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-28 relative overflow-hidden">
        {/* Section background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-radial from-crystal/6 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-brand-gold/6 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section label */}
          <WisdomsSectionHeader
            badge="The Seven"
            badgeIcon={<BookOpen className="w-4 h-4 text-brand-gold" />}
            badgeClass="bg-brand-gold/10 border-brand-gold/20 text-brand-gold"
            title="Aspects of the Creator Mind"
            subtitle="Each wisdom is a complete philosophy. Together they form the full spectrum of creative consciousness."
          />

          {/* Cards: 3 + 3 + 1 layout */}
          <div className="space-y-6">
            {/* Row 1: Wisdoms 1–3 */}
            <div className="grid md:grid-cols-3 gap-6">
              {WISDOMS.slice(0, 3).map((wisdom, i) => (
                <WisdomCard key={wisdom.name} wisdom={wisdom} delay={0.1 + i * 0.1} />
              ))}
            </div>

            {/* Row 2: Wisdoms 4–6 */}
            <div className="grid md:grid-cols-3 gap-6">
              {WISDOMS.slice(3, 6).map((wisdom, i) => (
                <WisdomCard key={wisdom.name} wisdom={wisdom} delay={0.1 + i * 0.1} />
              ))}
            </div>

            {/* Row 3: Wisdom 7 — centered, elevated */}
            <div className="flex justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <WisdomCard wisdom={WISDOMS[6]} delay={0.1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHEN TO INVOKE                                                      */}
      {/* ------------------------------------------------------------------ */}
      <WhenToInvokeSection />

      {/* ------------------------------------------------------------------ */}
      {/* AT A GLANCE                                                         */}
      {/* ------------------------------------------------------------------ */}
      <AtAGlanceSection />

      {/* ------------------------------------------------------------------ */}
      {/* PHILOSOPHICAL CONTEXT                                               */}
      {/* ------------------------------------------------------------------ */}
      <PhilosophySection />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: reusable section header
// ---------------------------------------------------------------------------

function WisdomsSectionHeader({
  badge,
  badgeIcon,
  badgeClass,
  title,
  subtitle,
}: {
  badge: string;
  badgeIcon: React.ReactNode;
  badgeClass: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6',
          badgeClass,
        )}
      >
        {badgeIcon}
        <span className="text-sm font-medium">{badge}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{title}</h2>
      <p className="text-xl text-text-secondary max-w-3xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}
