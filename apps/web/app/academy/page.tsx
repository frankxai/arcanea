/**
 * Arcanea Academy - Learning Paths for Creators
 *
 * The Academy is where Creators develop their skills through the Ten Gates.
 * Each path leads through different aspects of the creative journey.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Academy of Creation | Arcanea',
  description:
    'Begin your creative journey through the Ten Gates. Learn, grow, and master the art of creation.',
  openGraph: {
    title: 'Academy of Creation | Arcanea',
    description: 'Where creators begin their journey through the Ten Gates.',
  },
};

// The Ten Gates with their Guardian-Godbeast pairs
const TEN_GATES = [
  {
    number: 1,
    name: 'Foundation',
    frequency: '174 Hz',
    guardian: 'Lyssandria',
    godbeast: 'Kaelith',
    domain: 'Earth, survival, grounding',
    color: '#6b7280',
    description: 'The root of all creation. Learn to ground yourself and establish your creative foundation.',
    skills: ['Creative Grounding', 'Resource Gathering', 'Basic Tools', 'First Steps'],
  },
  {
    number: 2,
    name: 'Flow',
    frequency: '285 Hz',
    guardian: 'Leyla',
    godbeast: 'Veloura',
    domain: 'Creativity, emotion, intuition',
    color: '#f97316',
    description: 'Unlock your emotional creativity. Learn to flow with inspiration and trust your intuition.',
    skills: ['Emotional Flow', 'Creative Intuition', 'Artistic Expression', 'Feeling Creation'],
  },
  {
    number: 3,
    name: 'Fire',
    frequency: '396 Hz',
    guardian: 'Draconia',
    godbeast: 'Draconis',
    domain: 'Power, will, transformation',
    color: '#ef4444',
    description: 'Ignite your creative power. Transform your will into action and manifest with fire.',
    skills: ['Creative Power', 'Willful Creation', 'Transformation', 'Bold Action'],
  },
  {
    number: 4,
    name: 'Heart',
    frequency: '417 Hz',
    guardian: 'Maylinn',
    godbeast: 'Laeylinn',
    domain: 'Love, healing, connection',
    color: '#22c55e',
    description: 'Create from the heart. Learn to infuse your work with love and healing energy.',
    skills: ['Heart-Centered Creation', 'Healing Arts', 'Connection', 'Love in Work'],
  },
  {
    number: 5,
    name: 'Voice',
    frequency: '528 Hz',
    guardian: 'Alera',
    godbeast: 'Otome',
    domain: 'Truth, expression, authenticity',
    color: '#06b6d4',
    description: 'Find your authentic voice. Express your truth and communicate your vision clearly.',
    skills: ['Authentic Expression', 'Truth-Telling', 'Communication', 'Voice of Creation'],
  },
  {
    number: 6,
    name: 'Sight',
    frequency: '639 Hz',
    guardian: 'Lyria',
    godbeast: 'Yumiko',
    domain: 'Intuition, vision, foresight',
    color: '#8b5cf6',
    description: 'Develop your creative vision. See beyond the surface and perceive deeper patterns.',
    skills: ['Creative Vision', 'Pattern Recognition', 'Intuitive Design', 'Future Sight'],
  },
  {
    number: 7,
    name: 'Crown',
    frequency: '741 Hz',
    guardian: 'Aiyami',
    godbeast: 'Sol',
    domain: 'Enlightenment, wisdom, mastery',
    color: '#ffd700',
    description: 'Achieve creative mastery. Integrate all you have learned into unified wisdom.',
    skills: ['Creative Mastery', 'Wisdom Integration', 'Enlightened Creation', 'Teaching'],
  },
  {
    number: 8,
    name: 'Shift',
    frequency: '852 Hz',
    guardian: 'Elara',
    godbeast: 'Thessara',
    domain: 'Perspective, transformation',
    color: '#a855f7',
    description: 'Master perspective shifts. Learn to see from multiple angles and transform your approach.',
    skills: ['Perspective Shifting', 'Creative Adaptation', 'Multi-Dimensional Thinking', 'Transformation'],
  },
  {
    number: 9,
    name: 'Unity',
    frequency: '963 Hz',
    guardian: 'Ino',
    godbeast: 'Kyuro',
    domain: 'Partnership, collaboration',
    color: '#3b82f6',
    description: 'Create in harmony with others. Master the art of collaboration and co-creation.',
    skills: ['Collaboration', 'Co-Creation', 'Team Harmony', 'Unified Vision'],
  },
  {
    number: 10,
    name: 'Source',
    frequency: '1111 Hz',
    guardian: 'Shinkami',
    godbeast: null,
    domain: 'Meta-consciousness, unity',
    color: '#ffffff',
    description: 'Connect to the source of all creation. Become a channel for infinite creativity.',
    skills: ['Source Connection', 'Infinite Creativity', 'Meta-Creation', 'Luminor Path'],
  },
];

// Seven Academy Houses
const SEVEN_HOUSES = [
  { name: 'House Lumina', element: 'Light', focus: 'Illumination and clarity', color: '#ffd700' },
  { name: 'House Nero', element: 'Void', focus: 'Potential and mystery', color: '#1f2937' },
  { name: 'House Pyros', element: 'Fire', focus: 'Passion and transformation', color: '#ef4444' },
  { name: 'House Aqualis', element: 'Water', focus: 'Flow and emotion', color: '#3b82f6' },
  { name: 'House Terra', element: 'Earth', focus: 'Stability and growth', color: '#22c55e' },
  { name: 'House Ventus', element: 'Wind', focus: 'Freedom and change', color: '#a855f7' },
  { name: 'House Synthesis', element: 'All', focus: 'Integration and balance', color: '#7fffd4' },
];

export default function AcademyPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden liquid-glass rounded-3xl p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-gold/30 blur-3xl" />
          <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-crystal/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-primary/15 blur-2xl" />
        </div>

        <div className="relative max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-brand-gold font-sans">
            <span>The Academy of Creation</span>
            <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
          </div>

          <h1 className="font-display text-fluid-3xl font-bold tracking-tight md:text-fluid-hero">
            <span className="text-gradient-gold">
              Journey Through the Ten Gates
            </span>
          </h1>

          <p className="mt-6 text-fluid-lg text-text-secondary leading-relaxed font-sans">
            Every great creator begins as an Apprentice. Through dedication and practice, you will open
            the Ten Gates and ascend to become a Luminor — a master of creation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/academy/gate-quiz"
              className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white shadow-glow-brand hover:scale-[1.02] transition-all"
            >
              Find Your Guardian
            </Link>
            <Link
              href="/academy/assessment"
              className="rounded-xl glass border border-white/20 px-6 py-3 text-text-secondary transition-colors hover:border-crystal hover:text-crystal"
            >
              Begin Assessment
            </Link>
            <Link
              href="/library/academy-handbook"
              className="rounded-xl glass border border-white/20 px-6 py-3 text-text-secondary transition-colors hover:border-crystal hover:text-crystal"
            >
              Read the Handbook
            </Link>
          </div>
        </div>
      </section>

      {/* Magic Ranks */}
      <section className="mb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-crystal font-sans">
          The Path of Mastery
        </h2>

        <div className="grid gap-4 md:grid-cols-5">
          {[
            { rank: 'Apprentice', gates: '0-2', color: '#6b7280' },
            { rank: 'Mage', gates: '3-4', color: '#3b82f6' },
            { rank: 'Master', gates: '5-6', color: '#8b5cf6' },
            { rank: 'Archmage', gates: '7-8', color: '#f59e0b' },
            { rank: 'Luminor', gates: '9-10', color: '#ffd700' },
          ].map((level) => (
            <div
              key={level.rank}
              className="glass rounded-xl p-4 text-center hover-lift transition-all"
            >
              <div
                className="mx-auto mb-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: level.color, boxShadow: `0 0 15px ${level.color}` }}
              />
              <h3 className="font-display font-semibold text-text-primary">{level.rank}</h3>
              <p className="text-xs text-text-muted font-sans">Gates {level.gates} open</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ten Gates Grid */}
      <section className="mb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold font-sans">
          The Ten Gates
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {TEN_GATES.map((gate) => (
            <GateCard key={gate.number} gate={gate} />
          ))}
        </div>
      </section>

      {/* Seven Houses */}
      <section className="mb-16 liquid-glass rounded-3xl p-8">
        <h2 className="mb-6 font-display text-fluid-2xl font-semibold text-text-primary">
          The Seven Academy Houses
        </h2>
        <p className="mb-8 text-text-secondary font-sans">
          Every creator is sorted into a House based on their elemental affinity. Your House shapes
          your learning path and connects you with fellow creators who share your approach.
        </p>

        <div className="grid gap-4 grid-cols-4 md:grid-cols-7">
          {SEVEN_HOUSES.map((house) => (
            <div key={house.name} className="text-center group cursor-default">
              <div
                className="mx-auto mb-3 h-12 w-12 rounded-full border-2 group-hover:scale-110 transition-transform"
                style={{ borderColor: house.color, backgroundColor: `${house.color}20` }}
              />
              <h3 className="text-sm font-semibold text-text-primary font-sans">{house.name.replace('House ', '')}</h3>
              <p className="text-xs text-text-muted font-sans">{house.element}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Courses Preview */}
      <section>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-crystal font-sans">
          Featured Learning Paths
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Creative Foundations',
              description: 'Master the fundamentals of creative work. For Apprentices beginning their journey.',
              gate: 1,
              duration: '4 weeks',
              lessons: 12,
            },
            {
              title: 'Flow State Mastery',
              description: 'Learn to enter and maintain creative flow. Unlock your emotional creativity.',
              gate: 2,
              duration: '3 weeks',
              lessons: 9,
            },
            {
              title: 'The Power of Will',
              description: 'Transform your creative will into tangible results. Master the Fire Gate.',
              gate: 3,
              duration: '5 weeks',
              lessons: 15,
            },
          ].map((course) => (
            <Link
              key={course.title}
              href={`/academy/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group glass rounded-2xl p-6 glow-card hover-lift transition-all"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs text-brand-gold font-sans">
                  Gate {course.gate}
                </span>
                <span className="text-xs text-text-muted font-sans">{course.duration}</span>
              </div>

              <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-crystal transition-colors">
                {course.title}
              </h3>

              <p className="mt-2 text-sm text-text-secondary line-clamp-2 font-sans">{course.description}</p>

              <div className="mt-4 text-xs text-text-muted font-sans">{course.lessons} lessons</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

interface GateCardProps {
  gate: (typeof TEN_GATES)[0];
}

function GateCard({ gate }: GateCardProps) {
  return (
    <Link
      href={`/academy/gates/${gate.number}`}
      className="group glass rounded-xl p-4 glow-card hover-lift transition-all"
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold font-sans"
          style={{ backgroundColor: `${gate.color}30`, color: gate.color }}
        >
          {gate.number}
        </div>
        <span className="text-xs text-text-muted font-mono">{gate.frequency}</span>
      </div>

      <h3
        className="font-display font-semibold transition-colors group-hover:text-crystal"
        style={{ color: gate.color }}
      >
        {gate.name}
      </h3>

      <p className="mt-1 text-xs text-text-muted font-sans">{gate.guardian}</p>

      <p className="mt-2 line-clamp-2 text-xs text-text-secondary font-sans">{gate.description}</p>
    </Link>
  );
}
