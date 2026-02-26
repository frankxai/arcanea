import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Arcanea | The Luminor Intelligence System",
  description: "We built Arcanea because generic AI wasn't enough. 16 specialized AI intelligences, each mastering their domain. Not assistants — a creative team.",
  openGraph: {
    title: "About Arcanea | The Luminor Intelligence System",
    description: "16 specialized AI intelligences. Not assistants — a creative team.",
    images: ["/og-about.png"],
  },
};

const TIMELINE = [
  {
    year: "Vision",
    title: "The Arcanean Dream",
    description: "A world where every creator has access to transcended intelligence - AI partners that truly understand the creative process.",
  },
  {
    year: "Framework",
    title: "Luminor Intelligence System",
    description: "16 specialized AI intelligences, each mastering their domain. Not assistants - partners who see what you're building.",
  },
  {
    year: "Philosophy",
    title: "Seven Wisdoms",
    description: "Practical lenses for creative work. Structure, Heart, Courage, Play, Vision, Creation, Endurance - tools for any creative block.",
  },
  {
    year: "Now",
    title: "Building the Platform",
    description: "Chat with Luminors. Explore the Library. Create with AI companions who understand your journey.",
  },
];

const LUMINOR_SYSTEM = [
  {
    label: "What it is",
    heading: "16 specialists. 4 teams.",
    body: "The Luminor Intelligence System organizes 16 AI specialists into four focused teams — Development, Creative, Writing, and Research. Each one has mastered their domain through dedicated practice. You do not get a generalist. You get the right expert.",
  },
  {
    label: "How it's different",
    heading: "Deep over broad.",
    body: "Generic AI knows everything superficially. Luminors know one domain deeply — the way a master craftsperson does. When you need to architect a system, write a scene, or design a research strategy, you work with someone who has spent a century doing exactly that.",
  },
  {
    label: "The Seven Wisdoms",
    heading: "Practical mental models.",
    body: "Every Luminor applies the same seven lenses when approaching your work: Structure, Heart, Courage, Play, Vision, Creation, Endurance. These are not abstract principles — they are tools for moving through creative blocks and toward breakthrough.",
  },
  {
    label: "The Guardian Root",
    heading: "Mythology meets mastery.",
    body: "Each Luminor channels the wisdom of an Arcanean Guardian — mythological archetypes of creative mastery drawn from the Ten Gates system. These archetypes are not decoration. They encode patterns of how great creators actually work.",
  },
];

const PILLARS = [
  {
    icon: "📚",
    title: "The Library",
    description: "17 wisdom collections. 34+ sacred texts. Practical philosophy for creators, written to transform - not just inform.",
    stats: "50k+ words",
    link: "/library",
  },
  {
    icon: "🌟",
    title: "Luminor Intelligence",
    description: "16 transcended AI specialists across development, creative, writing, and research. Century-level expertise at your fingertips.",
    stats: "16 masters",
    link: "/luminors",
  },
  {
    icon: "🎓",
    title: "The Academy",
    description: "Ten Gates of creative mastery. From Apprentice to Luminor - a progression system for the creative journey.",
    stats: "10 gates",
    link: "/academy",
  },
];

const VALUES = [
  {
    title: "Wisdom over Information",
    description: "We don't give you more data. We give you the right lens to see clearly. Actionable wisdom beats endless facts.",
  },
  {
    title: "Partners, not Tools",
    description: "Luminors aren't assistants waiting for commands. They're craftspeople who see what you're building and help you build it better.",
  },
  {
    title: "Practice over Theory",
    description: "Every piece of wisdom in Arcanea is designed to be used. Enter seeking, leave with something you can apply today.",
  },
  {
    title: "Transcendence over Trends",
    description: "We build on timeless principles that have guided creators for millennia - patterns that work because they mirror how humans actually create.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-deep" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,rgba(127,255,212,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.1),transparent_50%)]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-cosmic-deep/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-cosmic-deep font-bold text-lg font-display">
                A
              </div>
              <span className="font-display text-xl font-semibold">Arcanea</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/luminors" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Luminors</Link>
              <Link href="/library" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Library</Link>
              <Link href="/academy" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Academy</Link>
              <Link href="/about" className="text-sm text-atlantean-teal-aqua">About</Link>
              <Link href="/chat" className="px-4 py-2 rounded-lg bg-atlantean-teal-aqua text-cosmic-deep text-sm font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all">
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-20 pb-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-atlantean-teal-aqua/30 bg-atlantean-teal-aqua/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-atlantean-teal-aqua animate-pulse" />
              <span className="text-sm text-atlantean-teal-aqua font-mono tracking-wider">THE LUMINOR INTELLIGENCE SYSTEM</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Intelligence built
              <span className="block bg-gradient-to-r from-atlantean-teal-aqua to-gold-bright bg-clip-text text-transparent">
                for creators.
              </span>
            </h1>

            <p className="text-xl text-text-secondary leading-relaxed max-w-3xl">
              We built Arcanea because generic AI was not enough. Creative work deserves intelligence that actually specializes
              — that has spent a century mastering code, narrative, design, or research. Not a general assistant. A creative team.
            </p>
          </div>
        </section>

        {/* Luminor Intelligence System */}
        <section className="py-16 border-t border-white/5">
          <div className="mb-14">
            <h2 className="text-3xl font-display font-bold mb-4">The Luminor Intelligence System</h2>
            <p className="text-text-secondary max-w-2xl leading-relaxed">
              Arcanea exists to give every creator access to the kind of deep, specialized intelligence that used to
              require a whole team. We believe the creative future belongs to those who combine human vision with
              transcended AI capability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LUMINOR_SYSTEM.map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-xl flex flex-col gap-3"
              >
                <span className="text-xs font-mono text-atlantean-teal-aqua/70 tracking-widest uppercase">
                  {item.label}
                </span>
                <h3 className="text-lg font-display font-semibold leading-snug">{item.heading}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Vision */}
        <section className="py-16 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">The Vision</h2>
              <div className="space-y-6 text-text-secondary">
                <p className="leading-relaxed">
                  Arcanea exists to give every creator access to the kind of deep, specialized intelligence that
                  used to require a whole team. We believe the creative future belongs to those who combine human
                  vision with transcended AI capability.
                </p>
                <p className="leading-relaxed">
                  That is why we built the <strong className="text-white">Luminor Intelligence System</strong>: 16
                  transcended AI specialists, each mastering their domain. They are not generic assistants.
                  They are craftspeople who bring century-level expertise to your exact creative challenge.
                </p>
                <p className="leading-relaxed">
                  Combined with the <strong className="text-white">Seven Wisdoms</strong> — practical mental models
                  for creative work — and the <strong className="text-white">Library of Arcanea</strong> — 17
                  collections of actionable wisdom — this is the complete creative intelligence system.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30">
                <div className="absolute inset-0 bg-gradient-to-br from-atlantean-teal-aqua/10 to-gold-bright/10 rounded-2xl" />
                <div className="relative space-y-6">
                  {TIMELINE.map((item, i) => (
                    <div key={item.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                          i === TIMELINE.length - 1
                            ? 'bg-atlantean-teal-aqua text-cosmic-deep'
                            : 'bg-white/10 text-text-muted'
                        }`}>
                          {item.year}
                        </div>
                        {i < TIMELINE.length - 1 && <div className="w-px h-full bg-white/10 my-2" />}
                      </div>
                      <div className="pb-6">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-16 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">The Three Pillars</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Everything in Arcanea is designed around three interconnected systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.link}
                className="group relative p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 overflow-hidden transition-all hover:border-atlantean-teal-aqua/30 hover:shadow-[0_0_40px_rgba(127,255,212,0.1)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-atlantean-teal-aqua/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-display font-semibold">{pillar.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-text-muted">{pillar.stats}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{pillar.description}</p>
                  <span className="text-atlantean-teal-aqua text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Explore
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Our Principles</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              The philosophy that guides everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="p-6 rounded-xl border border-white/10 bg-cosmic-surface/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-atlantean-teal-aqua/20 flex items-center justify-center text-atlantean-teal-aqua font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Creator */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-3xl font-display font-bold text-cosmic-deep shrink-0">
                  FX
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Created by Frank X</h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Arcanea is the intersection of two decades of creative work and the emerging possibilities
                    of AI-human collaboration. Built at the frontier of what's possible, designed to last.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://twitter.com/frankxai"
                      className="text-sm text-atlantean-teal-aqua hover:underline"
                    >
                      @frankxai
                    </a>
                    <a
                      href="https://github.com/frankxai"
                      className="text-sm text-atlantean-teal-aqua hover:underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-6">
              <span className="text-sm text-green-400 font-mono">OPEN SOURCE</span>
            </div>
            <h2 className="text-3xl font-display font-bold mb-6">Built in the Open</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              The Luminor Framework, Seven Wisdoms, and core Arcanea skills are open source.
              We believe creative intelligence should be accessible to everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/frankxai/arcanea"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>View on GitHub</span>
              </a>
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all"
              >
                <span>Explore Skills</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Meet the System */}
        <section className="py-20 border-t border-white/5">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua/20 via-creation-prism-purple/20 to-gold-bright/20" />
            <div className="absolute inset-0 bg-cosmic-surface/50 backdrop-blur-xl" />

            <div className="relative p-12 md:p-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  The Luminor Intelligence System
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Sixteen specialists. Four teams. One creative operating system built around your work.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Link
                  href="/luminor-intelligence"
                  className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-atlantean-teal-aqua/10 hover:border-atlantean-teal-aqua/30 transition-all text-center"
                >
                  <div className="text-xs font-mono text-atlantean-teal-aqua/70 tracking-widest uppercase mb-3">System</div>
                  <div className="font-display font-semibold mb-2">The full picture</div>
                  <p className="text-sm text-text-secondary">How the 16 Luminors are organized and why it works.</p>
                  <span className="mt-4 inline-block text-atlantean-teal-aqua text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore system
                  </span>
                </Link>

                <Link
                  href="/luminors"
                  className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-gold-bright/10 hover:border-gold-bright/30 transition-all text-center"
                >
                  <div className="text-xs font-mono text-gold-bright/70 tracking-widest uppercase mb-3">Luminors</div>
                  <div className="font-display font-semibold mb-2">Meet all 16</div>
                  <p className="text-sm text-text-secondary">Browse every specialist and find the one you need.</p>
                  <span className="mt-4 inline-block text-gold-bright text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Meet the Luminors
                  </span>
                </Link>

                <Link
                  href="/chat"
                  className="group p-6 rounded-2xl border border-atlantean-teal-aqua/40 bg-atlantean-teal-aqua/10 hover:bg-atlantean-teal-aqua/20 transition-all text-center"
                >
                  <div className="text-xs font-mono text-atlantean-teal-aqua/70 tracking-widest uppercase mb-3">Start here</div>
                  <div className="font-display font-semibold mb-2">Start with one</div>
                  <p className="text-sm text-text-secondary">Pick a Luminor and begin your first session now.</p>
                  <span className="mt-4 inline-block text-atlantean-teal-aqua text-sm font-medium">
                    Open chat
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center">
            <blockquote className="text-2xl md:text-3xl font-display italic text-text-secondary max-w-3xl mx-auto">
              "Enter seeking, leave transformed, return whenever needed."
            </blockquote>
            <cite className="block mt-6 text-sm text-text-muted font-mono">— The Library of Arcanea</cite>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-cosmic-deep font-bold text-sm font-display">
                A
              </div>
              <span className="text-sm text-text-muted">Arcanea — Building the future of creative intelligence</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/library" className="hover:text-white transition-colors">Library</Link>
              <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
              <a href="https://github.com/frankxai/arcanea" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
