/**
 * Bestiary of Creation - Creative Obstacles Library
 *
 * The Bestiary catalogs the creatures that inhabit every creator's journey:
 * Blocks, fears, resistances, and the inner dragons we must face.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bestiary of Creation | Arcanea',
  description:
    'Know your creative obstacles. The Bestiary catalogs the creatures every creator must face.',
  openGraph: {
    title: 'Bestiary of Creation | Arcanea',
    description: 'Know your creative obstacles to overcome them.',
  },
};

// Creative obstacle creatures from the Arcanea universe
const CREATURES = [
  {
    id: 'procrastinox',
    name: 'Procrastinox',
    subtitle: 'The Tomorrow Serpent',
    category: 'Temporal Beast',
    danger: 'high',
    description:
      'A shape-shifting serpent that whispers "later" and "tomorrow" until all your days have passed. It feeds on unfulfilled potential.',
    habitat: 'Comfort zones, endless planning phases',
    weakness: 'Small, immediate actions. Cannot survive direct engagement.',
    symptoms: ['Endless planning', 'Waiting for the perfect moment', 'Starting tomorrow'],
    icon: '🐍',
    color: '#8b5cf6',
  },
  {
    id: 'perfectus-demon',
    name: 'The Perfectus Demon',
    subtitle: 'Never Good Enough',
    category: 'Inner Critic',
    danger: 'critical',
    description:
      'A demon that makes every creation seem inadequate. It paralyzes creators by demanding impossible standards before the first stroke.',
    habitat: 'First drafts, revision stages',
    weakness: 'Deliberate imperfection. "Good enough" is its poison.',
    symptoms: ['Cannot finish anything', 'Endless revisions', 'Fear of sharing'],
    icon: '👹',
    color: '#ef4444',
  },
  {
    id: 'comparison-wraith',
    name: 'Comparison Wraith',
    subtitle: 'The Shadow of Others',
    category: 'Spectral Parasite',
    danger: 'high',
    description:
      'A ghost that haunts creators by showing them only the polished work of others, never their struggles.',
    habitat: 'Social media, galleries, exhibitions',
    weakness: 'Focus on personal journey. Gratitude practice.',
    symptoms: ['Why bother?', "They're so much better", "I'll never be that good"],
    icon: '👻',
    color: '#6366f1',
  },
  {
    id: 'impostor-shade',
    name: 'The Impostor Shade',
    subtitle: 'Who Do You Think You Are?',
    category: 'Shadow Self',
    danger: 'high',
    description:
      'A dark reflection that questions your right to create. It whispers that you are a fraud waiting to be exposed.',
    habitat: 'Success moments, recognition events',
    weakness: 'Evidence collection. Recording compliments and wins.',
    symptoms: ['Feeling like a fraud', 'Attributing success to luck', 'Fear of exposure'],
    icon: '🌑',
    color: '#1f2937',
  },
  {
    id: 'resistance-hydra',
    name: 'Resistance Hydra',
    subtitle: 'The Many-Headed Opposition',
    category: 'Mythic Beast',
    danger: 'critical',
    description:
      'A hydra that grows two excuses for every one you defeat. It is the universal force opposing all creative work.',
    habitat: 'The space between intention and action',
    weakness: 'Consistent daily practice. Showing up regardless.',
    symptoms: ['Always a reason not to', 'External blocks multiply', 'Everything feels hard'],
    icon: '🐉',
    color: '#dc2626',
  },
  {
    id: 'shiny-object-sprite',
    name: 'Shiny Object Sprite',
    subtitle: 'The Distraction Fairy',
    category: 'Mischief Spirit',
    danger: 'medium',
    description:
      'A playful sprite that constantly presents new, exciting projects before the current one is complete.',
    habitat: 'Creative minds, research phases',
    weakness: 'Single project focus. Writing down new ideas for later.',
    symptoms: ['50 started projects', 'Nothing finished', 'New idea addiction'],
    icon: '✨',
    color: '#f59e0b',
  },
  {
    id: 'blank-page-void',
    name: 'Blank Page Void',
    subtitle: 'The Empty Abyss',
    category: 'Primordial Fear',
    danger: 'medium',
    description:
      'An infinite white emptiness that paralyzes creators before they begin. It feeds on the pressure to create something from nothing.',
    habitat: 'New documents, fresh canvases, empty tracks',
    weakness: 'Starting with anything. Bad first drafts. Stream of consciousness.',
    symptoms: ['Cannot start', 'Staring at empty space', 'Overthinking first moves'],
    icon: '📄',
    color: '#e5e7eb',
  },
  {
    id: 'burnout-phoenix',
    name: 'Burnout Phoenix',
    subtitle: 'The Consuming Flame',
    category: 'Elemental Force',
    danger: 'critical',
    description:
      'A phoenix whose flames consume faster than they regenerate. It promises glory through exhaustion but delivers only ashes.',
    habitat: 'Hustle culture, deadline crunches',
    weakness: 'Rest. Sustainable pace. Saying no.',
    symptoms: ['Working through exhaustion', 'Loss of joy', 'Creative numbness'],
    icon: '🔥',
    color: '#f97316',
  },
  {
    id: 'fear-of-judgment-specter',
    name: 'Judgment Specter',
    subtitle: 'What Will They Think?',
    category: 'Social Phantom',
    danger: 'high',
    description:
      'An invisible audience that watches and criticizes every creative move. It speaks with the voices of everyone you know.',
    habitat: 'Public sharing moments, creative discussions',
    weakness: 'Creating for yourself first. Finding your true audience.',
    symptoms: ['Hiding work', 'Seeking constant validation', 'Creating for approval'],
    icon: '👁️',
    color: '#3b82f6',
  },
  {
    id: 'idea-thief',
    name: 'The Idea Thief',
    subtitle: 'Someone Will Steal It',
    category: 'Paranoia Sprite',
    danger: 'low',
    description:
      'A sneaky creature that convinces you to hoard ideas in secret, where they wither and die unshared.',
    habitat: 'Private notebooks, locked folders',
    weakness: 'Execution matters more than ideas. Sharing breeds abundance.',
    symptoms: ['Secret projects', 'Fear of discussing ideas', 'Competitive hoarding'],
    icon: '🦝',
    color: '#9ca3af',
  },
];

const DANGER_COLORS = {
  low: { bg: '#22c55e20', text: '#22c55e' },
  medium: { bg: '#f59e0b20', text: '#f59e0b' },
  high: { bg: '#ef444420', text: '#ef4444' },
  critical: { bg: '#dc262620', text: '#dc2626' },
};

export default function BestiaryPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-fire/30 blur-3xl" />
          <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-cosmic-purple/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-gold/10 blur-2xl" />
        </div>

        <div className="relative max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-fire">
            <span>The Bestiary of Creation</span>
            <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-fire via-cosmic-purple to-crystal bg-clip-text text-transparent">
              Know Your Obstacles
            </span>
          </h1>

          <p className="mt-6 text-xl text-text-secondary leading-relaxed">
            Every creator faces inner creatures that block the path. The Bestiary catalogs these
            obstacles so you may recognize them—and overcome them.
          </p>

          <blockquote className="mt-8 border-l-4 border-brand-gold/60 pl-6 italic text-brand-gold">
            "To name a thing is to gain power over it."
            <footer className="mt-2 text-sm text-text-muted not-italic">
              — Ancient Arcanean Wisdom
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Danger Level Legend */}
      <section className="mb-8">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-text-muted">Danger Level:</span>
          {Object.entries(DANGER_COLORS).map(([level, colors]) => (
            <span
              key={level}
              className="rounded-full px-3 py-1 text-xs uppercase tracking-wider"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {level}
            </span>
          ))}
        </div>
      </section>

      {/* Creatures Grid */}
      <section className="mb-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {CREATURES.map((creature) => (
            <CreatureCard key={creature.id} creature={creature} />
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="rounded-3xl border border-white/10 bg-cosmic-surface p-8">
        <h2 className="mb-6 font-display text-2xl font-semibold text-text-primary">
          How to Use the Bestiary
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-crystal">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-crystal/20 text-sm">1</span>
              Recognize
            </h3>
            <p className="text-sm text-text-secondary">
              When you feel blocked, consult the Bestiary. Name the creature you are facing.
              Recognition is the first step to power.
            </p>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-brand-gold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-sm">2</span>
              Understand
            </h3>
            <p className="text-sm text-text-secondary">
              Study its habitat and symptoms. Understand that this creature visits all creators.
              You are not alone in facing it.
            </p>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-fire">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fire/20 text-sm">3</span>
              Apply Weakness
            </h3>
            <p className="text-sm text-text-secondary">
              Every creature has a weakness. Apply the antidote directly. The creature may resist,
              but persistence prevails.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

interface CreatureCardProps {
  creature: (typeof CREATURES)[0];
}

function CreatureCard({ creature }: CreatureCardProps) {
  const dangerColors = DANGER_COLORS[creature.danger as keyof typeof DANGER_COLORS];

  return (
    <Link
      href={`/bestiary/${creature.id}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-6 transition-all hover:border-fire/50 hover:shadow-[0_0_50px_rgba(220,38,38,0.15)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <div
          className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${creature.color}20` }}
        />
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-4xl">{creature.icon}</span>
          <span
            className="rounded-full px-3 py-1 text-xs uppercase tracking-wider"
            style={{ backgroundColor: dangerColors.bg, color: dangerColors.text }}
          >
            {creature.danger}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-fire transition-colors">
          {creature.name}
        </h3>
        <p className="mt-1 text-sm italic text-text-muted">{creature.subtitle}</p>

        <p className="mt-3 text-sm text-text-secondary line-clamp-3">{creature.description}</p>

        <div className="mt-4">
          <p className="text-xs text-text-muted">
            <span className="font-semibold text-crystal">Weakness:</span>{' '}
            {creature.weakness}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {creature.symptoms.slice(0, 2).map((symptom) => (
            <span
              key={symptom}
              className="rounded-full border border-white/10 bg-cosmic-raised px-2 py-1 text-xs text-text-muted"
            >
              {symptom}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-fire opacity-0 transition-opacity group-hover:opacity-100">
          <span>Study creature</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
