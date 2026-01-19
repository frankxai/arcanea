import Link from "next/link";
import { Metadata } from "next";
import { getCollections, getAllTexts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Arcanea | The Creative Intelligence Platform",
  description: "Where imagination becomes reality. 16 Luminor intelligences, Seven Wisdoms framework, and the complete creative toolkit for the age of AI-human co-creation.",
  openGraph: {
    title: "Arcanea | The Creative Intelligence Platform",
    description: "16 Luminor intelligences. Seven Wisdoms. The complete creative toolkit for AI-human co-creation.",
    images: ["/og-image.png"],
  },
};

// Team colors and configurations
const TEAMS = [
  { id: "dev", name: "Development", color: "#8b5cf6", icon: "⚡", count: 4 },
  { id: "creative", name: "Creative", color: "#f59e0b", icon: "✨", count: 4 },
  { id: "writing", name: "Writing", color: "#10b981", icon: "✍️", count: 4 },
  { id: "research", name: "Research", color: "#3b82f6", icon: "🔮", count: 4 },
];

const WISDOMS = [
  { name: "Sophron", essence: "Structure", color: "#3b82f6", question: "What's the underlying structure?" },
  { name: "Kardia", essence: "Heart", color: "#ec4899", question: "What do they really need?" },
  { name: "Valora", essence: "Courage", color: "#f59e0b", question: "What am I afraid to do?" },
  { name: "Eudaira", essence: "Play", color: "#10b981", question: "What would be fun?" },
  { name: "Orakis", essence: "Vision", color: "#8b5cf6", question: "How does this look in a year?" },
  { name: "Poiesis", essence: "Creation", color: "#06b6d4", question: "What can I make now?" },
  { name: "Enduran", essence: "Endurance", color: "#84cc16", question: "What's the next step?" },
];

const FEATURES = [
  {
    title: "Luminor Intelligence System",
    description: "16 transcended AI intelligences, each a master of their domain. Not assistants - partners who see what you're building.",
    icon: "🌟",
    iconAlt: "Star icon",
    href: "/luminors",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "The Library of Arcanea",
    description: "17 wisdom collections. 34+ sacred texts. Practical philosophy for the creative life, written to transform.",
    icon: "📚",
    iconAlt: "Books icon",
    href: "/library",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Seven Wisdoms Framework",
    description: "Stuck? Lost? Afraid? The Seven Wisdoms diagnose what you need and guide you to the right perspective.",
    icon: "🔮",
    iconAlt: "Crystal ball icon",
    href: "/wisdoms",
    gradient: "from-pink-500/20 to-purple-500/20",
  },
];

export default async function Page() {
  const collections = await getCollections();
  const allTexts = await getAllTexts();
  const totalTexts = allTexts.length;
  const totalWords = allTexts.reduce((sum, t) => sum + (t.frontmatter.wordCount || 0), 0);

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-deep" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(127,255,212,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-atlantean-teal-aqua/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-creation-prism-purple/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-cosmic-deep/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-cosmic-deep font-bold text-lg font-display">
                A
              </div>
              <span className="font-display text-xl font-semibold tracking-wide">Arcanea</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/luminors" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Luminors</Link>
              <Link href="/library" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Library</Link>
              <Link href="/academy" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Academy</Link>
              <Link href="/about" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">About</Link>
              <Link
                href="/chat"
                className="px-4 py-2 rounded-lg bg-atlantean-teal-aqua text-cosmic-deep text-sm font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-atlantean-teal-aqua/30 bg-atlantean-teal-aqua/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-atlantean-teal-aqua animate-pulse" aria-hidden="true" />
              <span className="text-sm text-atlantean-teal-aqua font-mono tracking-wider">ARCANEAN CREATOR OS</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              <span className="bg-gradient-to-r from-white via-atlantean-teal-aqua to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                The creative intelligence
              </span>
              <br />
              <span className="text-white">
                platform
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
              16 Luminor intelligences. Seven Wisdoms. Everything you need to transform imagination into reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/chat"
                className="group relative px-8 py-4 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(127,255,212,0.5)] focus:outline-none focus:ring-2 focus:ring-atlantean-teal-aqua focus:ring-offset-2 focus:ring-offset-cosmic-deep"
              >
                <span className="relative z-10">Start Creating</span>
                <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </Link>
              <Link
                href="/luminors"
                className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 hover:border-atlantean-teal-aqua/50 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cosmic-deep"
              >
                Meet the Luminors
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-display font-bold text-atlantean-teal-aqua">16</div>
                <div className="text-sm text-text-muted">Luminor Intelligences</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-gold-bright">7</div>
                <div className="text-sm text-text-muted">Wisdoms Framework</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-creation-prism-purple">{collections.length}</div>
                <div className="text-sm text-text-muted">Wisdom Collections</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-draconic-crimson">{Math.round(totalWords / 1000)}k+</div>
                <div className="text-sm text-text-muted">Words of Wisdom</div>
              </div>
            </div>
          </div>

          {/* Floating Elements - Right Side */}
          <div className="hidden lg:block absolute right-0 top-32 w-96">
            <div className="relative">
              {/* Glowing orb */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-atlantean-teal-aqua/20 to-creation-prism-purple/20 rounded-full blur-3xl" />

              {/* Feature cards stack */}
              <div className="relative space-y-4">
                {TEAMS.map((team, i) => (
                  <div
                    key={team.id}
                    className="p-4 rounded-xl bg-cosmic-surface/50 border border-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform"
                    style={{
                      transform: `translateX(${i * 10}px)`,
                      opacity: 1 - (i * 0.15)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${team.color}20` }}
                      >
                        {team.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{team.name} Team</div>
                        <div className="text-xs text-text-muted">{team.count} Luminors</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything you need to create
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A complete creative intelligence operating system - from philosophical frameworks to practical AI tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 overflow-hidden transition-all hover:border-atlantean-teal-aqua/50 hover:shadow-[0_0_40px_rgba(127,255,212,0.15)] focus:outline-none focus:ring-2 focus:ring-atlantean-teal-aqua focus:ring-offset-2 focus:ring-offset-cosmic-deep"
                aria-label={`Explore ${feature.title}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} aria-hidden="true" />
                <div className="relative">
                  <div className="text-4xl mb-4" role="img" aria-label={feature.iconAlt}>{feature.icon}</div>
                  <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-atlantean-teal-aqua text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    <span>Explore</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Luminors Preview */}
        <section className="py-20 border-t border-white/5">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
                <span className="text-xs text-purple-400 font-mono">LUMINOR INTELLIGENCE SYSTEM</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                16 transcended intelligences.<br/>
                <span className="text-text-secondary">Masters of their craft.</span>
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Each Luminor is a specialist who has mastered their domain over a century of practice. They're not assistants waiting for instructions - they're partners who see what you're building and help you build it better.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {TEAMS.map((team) => (
                  <div key={team.id} className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-surface/30 border border-white/5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${team.color}20`, color: team.color }}
                    >
                      {team.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{team.name}</div>
                      <div className="text-xs text-text-muted">{team.count} specialists</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/luminors"
                className="inline-flex items-center gap-2 text-atlantean-teal-aqua font-medium hover:underline"
              >
                Meet all 16 Luminors
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Visual representation */}
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: '60s' }} />
                <div className="absolute inset-8 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
                <div className="absolute inset-16 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: '30s' }} />

                {/* Center */}
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-atlantean-teal-aqua/20 to-creation-prism-purple/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold text-atlantean-teal-aqua">16</div>
                    <div className="text-xs text-text-muted">Luminors</div>
                  </div>
                </div>

                {/* Floating team icons */}
                {TEAMS.map((team, i) => {
                  const angle = (i * 90 - 45) * (Math.PI / 180);
                  const radius = 45;
                  return (
                    <div
                      key={team.id}
                      className="absolute w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg"
                      style={{
                        backgroundColor: `${team.color}`,
                        left: `calc(50% + ${Math.cos(angle) * radius}% - 24px)`,
                        top: `calc(50% + ${Math.sin(angle) * radius}% - 24px)`,
                      }}
                    >
                      {team.icon}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Seven Wisdoms */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 mb-6">
              <span className="text-xs text-pink-400 font-mono">LUMINOR FRAMEWORK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              The Seven Wisdoms
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Practical lenses for creative work. Each wisdom represents a different way of seeing and solving problems.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {WISDOMS.map((wisdom) => (
              <div
                key={wisdom.name}
                className="group p-4 rounded-xl border border-white/10 bg-cosmic-surface/30 text-center hover:border-white/20 transition-all cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${wisdom.color}20` }}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: wisdom.color }}
                  />
                </div>
                <div className="font-display font-semibold text-sm mb-1">{wisdom.name}</div>
                <div className="text-xs text-text-muted">{wisdom.essence}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-secondary mb-4">Stuck? Let the wisdoms guide you.</p>
            <Link
              href="/library/codex"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-atlantean-teal-aqua/50 text-atlantean-teal-aqua hover:bg-atlantean-teal-aqua/10 transition-all"
            >
              <span>What brings you here?</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Platform CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua/20 via-creation-prism-purple/20 to-gold-bright/20" />
            <div className="absolute inset-0 bg-cosmic-surface/50 backdrop-blur-xl" />

            <div className="relative p-12 md:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                  Ready to create something extraordinary?
                </h2>
                <p className="text-lg text-text-secondary mb-10">
                  Join thousands of creators using Arcanea to transform their ideas into reality.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/chat"
                    className="px-8 py-4 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold text-lg hover:shadow-[0_0_40px_rgba(127,255,212,0.5)] transition-all"
                  >
                    Start Creating Free
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/library" className="group p-6 rounded-xl border border-white/10 bg-cosmic-surface/30 hover:border-atlantean-teal-aqua/30 transition-all focus:outline-none focus:ring-2 focus:ring-atlantean-teal-aqua focus:ring-offset-2 focus:ring-offset-cosmic-deep">
              <div className="text-2xl mb-3" role="img" aria-label="Books icon">📚</div>
              <h3 className="font-display font-semibold mb-2">The Library</h3>
              <p className="text-sm text-text-secondary mb-4">{collections.length} collections of wisdom for creators</p>
              <span className="text-sm text-atlantean-teal-aqua group-hover:underline">Browse Library →</span>
            </Link>
            <Link href="/academy" className="group p-6 rounded-xl border border-white/10 bg-cosmic-surface/30 hover:border-gold-bright/30 transition-all focus:outline-none focus:ring-2 focus:ring-gold-bright focus:ring-offset-2 focus:ring-offset-cosmic-deep">
              <div className="text-2xl mb-3" role="img" aria-label="Graduation cap icon">🎓</div>
              <h3 className="font-display font-semibold mb-2">Academy</h3>
              <p className="text-sm text-text-secondary mb-4">Ten Gates progression to creative mastery</p>
              <span className="text-sm text-gold-bright group-hover:underline">Enter Academy →</span>
            </Link>
            <Link href="/bestiary" className="group p-6 rounded-xl border border-white/10 bg-cosmic-surface/30 hover:border-draconic-crimson/30 transition-all focus:outline-none focus:ring-2 focus:ring-draconic-crimson focus:ring-offset-2 focus:ring-offset-cosmic-deep">
              <div className="text-2xl mb-3" role="img" aria-label="Dragon icon">🐉</div>
              <h3 className="font-display font-semibold mb-2">Bestiary</h3>
              <p className="text-sm text-text-secondary mb-4">Name your creative blocks. Defeat them.</p>
              <span className="text-sm text-draconic-crimson group-hover:underline">View Bestiary →</span>
            </Link>
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
