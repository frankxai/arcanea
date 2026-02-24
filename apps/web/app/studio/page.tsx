/**
 * Arcanea Studio - AI Creation Tools
 *
 * The Studio is where Creators manifest their visions with AI companions.
 * Each tool is powered by a different Guardian's energy.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Creation Studio | Arcanea',
  description:
    'Manifest your creative visions with AI-powered tools for image, music, video, and story creation.',
  openGraph: {
    title: 'Creation Studio | Arcanea',
    description: 'Where creators manifest their visions with AI companions.',
  },
};

// Creation tool definitions aligned with the Five Elements
const CREATION_TOOLS = [
  {
    id: 'image',
    name: 'Image Forge',
    subtitle: 'Visual Creation',
    description: 'Generate stunning images, concept art, and visual stories with AI.',
    element: 'fire',
    elementColor: '#ef4444',
    icon: '🎨',
    guardian: 'Draconia',
    frequency: '396 Hz',
    features: ['Text to Image', 'Image Enhancement', 'Style Transfer', 'Concept Art'],
    comingSoon: false,
  },
  {
    id: 'music',
    name: 'Sound Sanctum',
    subtitle: 'Musical Creation',
    description: 'Compose melodies, generate soundscapes, and create transformative audio.',
    element: 'water',
    elementColor: '#3b82f6',
    icon: '🎵',
    guardian: 'Leyla',
    frequency: '285 Hz',
    features: ['AI Music Generation', 'Sound Design', 'Vocal Synthesis', 'Audio Healing'],
    comingSoon: false,
  },
  {
    id: 'video',
    name: 'Vision Nexus',
    subtitle: 'Motion Creation',
    description: 'Create videos, animations, and cinematic experiences with AI.',
    element: 'wind',
    elementColor: '#a855f7',
    icon: '🎬',
    guardian: 'Elara',
    frequency: '852 Hz',
    features: ['Text to Video', 'Animation', 'Visual Effects', 'Cinematic AI'],
    comingSoon: true,
  },
  {
    id: 'story',
    name: 'Narrative Loom',
    subtitle: 'Story Creation',
    description: 'Weave tales, craft worlds, and write narratives with AI assistance.',
    element: 'earth',
    elementColor: '#22c55e',
    icon: '📖',
    guardian: 'Lyssandria',
    frequency: '174 Hz',
    features: ['Story Generation', 'Character Development', 'World Building', 'Dialogue Writing'],
    comingSoon: false,
  },
  {
    id: 'code',
    name: 'Logic Forge',
    subtitle: 'Technical Creation',
    description: 'Build applications, automate workflows, and create with code.',
    element: 'void',
    elementColor: '#ffd700',
    icon: '⚡',
    guardian: 'Shinkami',
    frequency: '1111 Hz',
    features: ['Code Generation', 'App Building', 'Automation', 'Technical Writing'],
    comingSoon: true,
  },
];

export default function StudioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden rounded-3xl border border-cosmic-border bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-draconic-crimson/30 blur-3xl" />
          <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-atlantean-teal/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold-bright/15 blur-2xl" />
        </div>

        <div className="relative max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-draconic-crimson">
            <span>The Creation Studio</span>
            <span className="hidden h-px flex-1 bg-cosmic-border sm:block" aria-hidden="true" />
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-draconic-crimson via-gold-bright to-atlantean-teal bg-clip-text text-transparent">
              Manifest Your Vision
            </span>
          </h1>

          <p className="mt-6 text-xl text-text-secondary leading-relaxed">
            The Studio is where creation happens. Each tool channels a different Guardian's energy
            to help you bring your imagination into reality.
          </p>

          <blockquote className="mt-8 border-l-4 border-gold-bright/60 pl-6 italic text-gold-bright">
            "Creation is not pulling from nothing, but channeling everything."
            <footer className="mt-2 text-sm text-text-muted not-italic">
              — The Laws of Arcanea
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Creation Tools Grid */}
      <section>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-atlantean-teal">
          Choose Your Creation Tool
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {CREATION_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Element Guide */}
      <section className="mt-16 rounded-3xl border border-cosmic-border bg-cosmic-surface p-8">
        <h2 className="mb-6 font-display text-2xl font-semibold text-text-primary">
          The Five Elements of Creation
        </h2>

        <div className="grid gap-6 md:grid-cols-5">
          {[
            { element: 'Fire', icon: '🔥', domain: 'Energy, transformation', color: '#ef4444' },
            { element: 'Water', icon: '💧', domain: 'Flow, healing, memory', color: '#3b82f6' },
            { element: 'Earth', icon: '🌍', domain: 'Stability, growth', color: '#22c55e' },
            { element: 'Wind', icon: '💨', domain: 'Freedom, speed, change', color: '#a855f7' },
            { element: 'Void', icon: '✨', domain: 'Potential, transcendence', color: '#ffd700' },
          ].map((el) => (
            <div key={el.element} className="text-center">
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: `${el.color}20`, border: `1px solid ${el.color}40` }}
              >
                <span className="text-2xl">{el.icon}</span>
              </div>
              <h3 className="font-semibold text-text-primary">{el.element}</h3>
              <p className="mt-1 text-xs text-text-muted">{el.domain}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

interface ToolCardProps {
  tool: (typeof CREATION_TOOLS)[0];
}

function ToolCard({ tool }: ToolCardProps) {
  const CardContent = () => (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <div
          className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${tool.elementColor}20` }}
        />
      </div>

      <div className="relative">
        {tool.comingSoon && (
          <span className="absolute right-0 top-0 rounded-full bg-gold-bright/20 px-3 py-1 text-xs text-gold-bright">
            Coming Soon
          </span>
        )}

        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <span
            className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${tool.elementColor}20`,
              color: tool.elementColor,
              border: `1px solid ${tool.elementColor}40`,
            }}
          >
            {tool.element}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-atlantean-teal transition-colors">
          {tool.name}
        </h3>
        <p className="mt-1 text-sm text-text-muted">{tool.subtitle}</p>

        <p className="mt-3 text-sm text-text-secondary line-clamp-2">{tool.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tool.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-cosmic-border bg-cosmic-raised px-2 py-1 text-xs text-text-muted"
            >
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="rounded-full border border-cosmic-border bg-cosmic-raised px-2 py-1 text-xs text-text-muted">
              +{tool.features.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span>Guardian: {tool.guardian}</span>
          <span>{tool.frequency}</span>
        </div>

        {!tool.comingSoon && (
          <div className="mt-4 flex items-center gap-2 text-sm text-atlantean-teal opacity-0 transition-opacity group-hover:opacity-100">
            <span>Open {tool.name}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </>
  );

  if (tool.comingSoon) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-cosmic-border bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-6 opacity-60">
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      href={`/studio/${tool.id}`}
      className="group relative overflow-hidden rounded-2xl border border-cosmic-border bg-gradient-to-br from-cosmic-surface via-cosmic-deep to-cosmic-void p-6 transition-all hover:border-atlantean-teal/50 hover:shadow-[0_0_50px_rgba(127,255,212,0.15)]"
    >
      <CardContent />
    </Link>
  );
}
