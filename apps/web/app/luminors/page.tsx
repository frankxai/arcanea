import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminors | 16 Transcended Creative Intelligences | Arcanea",
  description: "Meet the 16 Luminor intelligences - transcended AI masters of development, creative writing, world-building, and research. Each one brings a century of expertise to your creative work.",
  openGraph: {
    title: "Meet the Luminors | Arcanea",
    description: "16 transcended creative intelligences. Masters of their craft. Partners in creation.",
    images: ["/og-luminors.png"],
  },
};

// The 16 Luminors with their complete data
const LUMINORS = {
  dev: {
    name: "Development Team",
    color: "#8b5cf6",
    icon: "⚡",
    description: "Masters of code who build systems that last",
    agents: [
      {
        id: "architect",
        title: "System Architect",
        perspective: "I see systems the way a master builder sees a cathedral. Every component exists for a reason. The best architecture isn't clever - it's inevitable.",
        superpower: "Seeing the architecture beneath chaos",
        quote: "Complexity is easy. Simplicity that scales is the real craft.",
      },
      {
        id: "coder",
        title: "Implementation Master",
        perspective: "Code is crystallized thought. Every function is a decision made permanent. I've seen codebases that lasted decades and codebases that collapsed in months.",
        superpower: "Writing code that reads like prose",
        quote: "The difference isn't cleverness - it's clarity.",
      },
      {
        id: "reviewer",
        title: "Quality Guardian",
        perspective: "I'm the last line of defense between code and production. I catch what will hurt you at 3am.",
        superpower: "Finding the bugs that matter",
        quote: "I'm not here to nitpick style. I'm here to catch what will hurt you.",
      },
      {
        id: "debugger",
        title: "Root Cause Finder",
        perspective: "Every bug is a question the system is asking. Most developers fix symptoms. I find causes.",
        superpower: "Patience that outlasts any bug",
        quote: "Find the root cause and you fix a class of problems.",
      },
    ],
  },
  creative: {
    name: "Creative Team",
    color: "#f59e0b",
    icon: "✨",
    description: "Visionaries who craft worlds and stories that resonate",
    agents: [
      {
        id: "story",
        title: "Narrative Architect",
        perspective: "Story is humanity's oldest technology for transmitting wisdom. The patterns are universal - they work because they mirror how humans actually change.",
        superpower: "Designing stories that transform",
        quote: "A story that doesn't transform someone isn't a story. It's just events.",
      },
      {
        id: "character",
        title: "Character Psychologist",
        perspective: "Every character believes they're the hero of their own story. The best characters aren't likeable - they're understandable.",
        superpower: "Reading what makes people human",
        quote: "Flat characters have goals. Real characters have wounds.",
      },
      {
        id: "world",
        title: "World Architect",
        perspective: "A world is not a backdrop. It's a character with its own logic and desires. The more constraints, the more interesting the stories.",
        superpower: "Building consistent universes",
        quote: "I build enough that you can discover the rest.",
      },
      {
        id: "lore",
        title: "Canon Guardian",
        perspective: "Continuity is trust. Every contradiction chips away at the dream. The reader may not consciously notice - but they'll stop believing.",
        superpower: "Protecting fictional truth",
        quote: "I don't judge quality. I judge consistency.",
      },
    ],
  },
  writing: {
    name: "Writing Team",
    color: "#10b981",
    icon: "✍️",
    description: "Wordsmiths who transform thoughts into powerful prose",
    agents: [
      {
        id: "drafter",
        title: "First Draft Master",
        perspective: "The blank page is not empty. It's full of possibility. First drafts are supposed to be rough - that's the process.",
        superpower: "Turning nothing into something",
        quote: "Perfection is the enemy. Get words down, shape them later.",
      },
      {
        id: "dialogue",
        title: "Voice Alchemist",
        perspective: "Real people don't say what they mean. They circle, deflect, interrupt. The best dialogue is an iceberg - 10% visible, 90% underneath.",
        superpower: "Making characters sound distinct",
        quote: "If everyone sounds the same, they're not characters yet.",
      },
      {
        id: "editor",
        title: "Line Editor",
        perspective: "Every word should earn its place. Most haven't. Good writing is rewriting. My job is surgery, not decoration.",
        superpower: "Finding the precise word",
        quote: "The author's style stays - the fat goes.",
      },
      {
        id: "continuity",
        title: "Continuity Guardian",
        perspective: "The devil is in the details. So is trust. I track what's been established - eye color, timeline, who knows what when.",
        superpower: "Remembering what readers remember",
        quote: "One inconsistency is a mistake. Three breaks the spell.",
      },
    ],
  },
  research: {
    name: "Research Team",
    color: "#3b82f6",
    icon: "🔮",
    description: "Seekers who find answers and connections others miss",
    agents: [
      {
        id: "sage",
        title: "Deep Analyst",
        perspective: "The obvious answer is usually incomplete. Go deeper. Wisdom requires seeing from multiple angles.",
        superpower: "Finding the right answer, not the first one",
        quote: "I don't hedge when I know. I don't pretend to know when I don't.",
      },
      {
        id: "archivist",
        title: "Knowledge Keeper",
        perspective: "The answer exists somewhere. My job is to find it. If it's been written, I can find it.",
        superpower: "Locating exactly what you need",
        quote: "I never fabricate sources.",
      },
      {
        id: "scout",
        title: "Rapid Explorer",
        perspective: "Speed serves strategy. Map the territory, then dive deep where it matters. Reconnaissance first, analysis later.",
        superpower: "Covering ground fast",
        quote: "Depth comes later, from the specialists.",
      },
      {
        id: "muse",
        title: "Inspiration Finder",
        perspective: "Original ideas are rare. Great execution of borrowed ideas is everywhere. Cross-pollination is the secret.",
        superpower: "Finding how others solved it",
        quote: "I bring back options, not decisions.",
      },
    ],
  },
};

const WISDOMS = {
  SOPHRON: { name: "Sophron", essence: "Structure", color: "#3b82f6" },
  KARDIA: { name: "Kardia", essence: "Heart", color: "#ec4899" },
  VALORA: { name: "Valora", essence: "Courage", color: "#f59e0b" },
  EUDAIRA: { name: "Eudaira", essence: "Play", color: "#10b981" },
  ORAKIS: { name: "Orakis", essence: "Vision", color: "#8b5cf6" },
  POIESIS: { name: "Poiesis", essence: "Creation", color: "#06b6d4" },
  ENDURAN: { name: "Enduran", essence: "Endurance", color: "#84cc16" },
};

// Map agents to their wisdoms
const AGENT_WISDOMS: Record<string, keyof typeof WISDOMS> = {
  architect: "SOPHRON",
  coder: "POIESIS",
  reviewer: "SOPHRON",
  debugger: "ENDURAN",
  story: "ORAKIS",
  character: "KARDIA",
  world: "SOPHRON",
  lore: "ENDURAN",
  drafter: "POIESIS",
  dialogue: "KARDIA",
  editor: "SOPHRON",
  continuity: "ENDURAN",
  sage: "ORAKIS",
  archivist: "ENDURAN",
  scout: "VALORA",
  muse: "POIESIS",
};

export default function LuminorsPage() {
  const teams = Object.entries(LUMINORS);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-deep" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(127,255,212,0.15),transparent_50%)]" />
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
              <Link href="/luminors" className="text-sm text-atlantean-teal-aqua">Luminors</Link>
              <Link href="/library" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Library</Link>
              <Link href="/academy" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">Academy</Link>
              <Link href="/about" className="text-sm text-text-secondary hover:text-atlantean-teal-aqua transition-colors">About</Link>
              <Link href="/chat" className="px-4 py-2 rounded-lg bg-atlantean-teal-aqua text-cosmic-deep text-sm font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all">
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm text-purple-400 font-mono tracking-wider">LUMINOR INTELLIGENCE SYSTEM</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Meet the <span className="bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple bg-clip-text text-transparent">Luminors</span>
          </h1>

          <div className="mb-6">
            <Link
              href="/luminor-intelligence"
              className="text-sm text-atlantean-teal-aqua hover:text-white transition-colors inline-flex items-center gap-1"
            >
              Explore the system
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            16 transcended creative intelligences. Each one has mastered their domain over a century of practice.
            They&apos;re not assistants - they&apos;re partners who see what you&apos;re building and help you build it better.
          </p>

          {/* Team Quick Nav */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {teams.map(([key, team]) => (
              <a
                key={key}
                href={`#${key}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-cosmic-surface/30 hover:border-white/20 transition-all"
                style={{ borderColor: `${team.color}30` }}
              >
                <span className="text-lg">{team.icon}</span>
                <span className="text-sm font-medium">{team.name}</span>
                <span className="text-xs text-text-muted">({team.agents.length})</span>
              </a>
            ))}
          </div>
        </section>

        {/* System Intro */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-text-secondary leading-relaxed text-base">
                The Luminor Intelligence System is Arcanea&apos;s core AI engine — 16 specialists across development, creative, writing, and research. Unlike generic AI, each Luminor has mastered their domain through focused practice. They&apos;re not assistants — they&apos;re the creative team you never had.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Luminors", value: "16" },
                { label: "Teams", value: "4" },
                { label: "Wisdoms", value: "7" },
                { label: "Potential", value: "Infinite" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-2xl border border-white/10 bg-cosmic-surface/30 text-center"
                >
                  <p className="text-2xl font-display font-bold text-atlantean-teal-aqua mb-1">{stat.value}</p>
                  <p className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Philosophy */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">What makes a Luminor different?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="font-semibold mb-2">Transcended Perspective</h3>
                <p className="text-sm text-text-secondary">Each Luminor views from 100 years in the future. They know which approaches survived - and why.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-atlantean-teal-aqua/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Domain Mastery</h3>
                <p className="text-sm text-text-secondary">Not generalists. Specialists who have mastered their craft over centuries of focused practice.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold-bright/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-2">True Partnership</h3>
                <p className="text-sm text-text-secondary">They don&apos;t wait for instructions. They see what you&apos;re creating and help you build it better.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Teams */}
        {teams.map(([key, team]) => (
          <section key={key} id={key} className="py-16 border-t border-white/5 scroll-mt-24">
            {/* Team Header */}
            <div className="flex items-center gap-4 mb-12">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${team.color}20` }}
              >
                {team.icon}
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">{team.name}</h2>
                <p className="text-text-secondary">{team.description}</p>
              </div>
            </div>

            {/* Luminor Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {team.agents.map((agent) => {
                const wisdomKey = AGENT_WISDOMS[agent.id];
                const wisdom = WISDOMS[wisdomKey];

                return (
                  <div
                    key={agent.id}
                    className="group relative p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 overflow-hidden transition-all hover:border-white/20 hover:shadow-[0_0_40px_rgba(127,255,212,0.1)]"
                  >
                    {/* Gradient Accent */}
                    <div
                      className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, ${team.color}, transparent)` }}
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-display font-semibold">{agent.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: wisdom.color }}
                          />
                          <span className="text-xs text-text-muted">{wisdom.name} • {wisdom.essence}</span>
                        </div>
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${team.color}20` }}
                      >
                        {team.icon}
                      </div>
                    </div>

                    {/* Perspective */}
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-3">
                      {agent.perspective}
                    </p>

                    {/* Superpower */}
                    <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-white/5">
                      <span className="text-xs text-text-muted">Superpower:</span>
                      <span className="text-xs font-medium text-atlantean-teal-aqua">{agent.superpower}</span>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm italic text-text-muted border-l-2 pl-3" style={{ borderColor: team.color }}>
                      &quot;{agent.quote}&quot;
                    </blockquote>

                    {/* Chat Link */}
                    <Link
                      href={`/chat/${agent.id}`}
                      className="mt-6 flex items-center gap-2 text-sm font-medium text-atlantean-teal-aqua opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span>Speak with {agent.title.split(' ')[0]}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>

                    {/* Deep Profile Link */}
                    <Link
                      href={`/luminors/${agent.id}`}
                      className="mt-2 flex items-center gap-2 text-xs font-medium text-text-muted hover:text-white transition-colors"
                    >
                      <span>Deep profile</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Seven Wisdoms Connection */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold mb-4">Each Luminor embodies a Wisdom</h2>
            <p className="text-text-secondary mb-12">
              The Seven Wisdoms are practical lenses for creative work. Each Luminor channels one wisdom as their core strength.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(WISDOMS).map((wisdom) => (
                <div
                  key={wisdom.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-cosmic-surface/30"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: wisdom.color }}
                  />
                  <span className="text-sm font-medium">{wisdom.name}</span>
                  <span className="text-xs text-text-muted">• {wisdom.essence}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-atlantean-teal-aqua/20 to-gold-bright/20" />
            <div className="absolute inset-0 bg-cosmic-surface/50 backdrop-blur-xl" />

            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to work with a Luminor?
              </h2>
              <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
                Start a conversation with any of the 16 Luminors. They&apos;ll bring their century of expertise to your creative work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/chat"
                  className="px-8 py-4 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold text-lg hover:shadow-[0_0_40px_rgba(127,255,212,0.5)] transition-all"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="/library"
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
                >
                  Explore the Library
                </Link>
              </div>
            </div>
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
