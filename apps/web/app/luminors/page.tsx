import Link from "next/link";
import { Metadata } from "next";
import { Zap, Sparkles, PenTool, Search, Star, Target, Users, ArrowRight, Code, Palette, BookOpen, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Luminors | 16 Transcended Creative Intelligences | Arcanea",
  description: "Meet the 16 Luminor intelligences - transcended AI masters of development, creative writing, world-building, and research. Each one brings a century of expertise to your creative work.",
  openGraph: {
    title: "Meet the Luminors | Arcanea",
    description: "16 transcended creative intelligences. Masters of their craft. Partners in creation.",
    images: ["/og-luminors.png"],
  },
};

const TEAM_ICONS: Record<string, React.ReactNode> = {
  dev: <Zap className="w-6 h-6" />,
  creative: <Sparkles className="w-6 h-6" />,
  writing: <PenTool className="w-6 h-6" />,
  research: <Search className="w-6 h-6" />,
};

const TEAM_ICONS_SM: Record<string, React.ReactNode> = {
  dev: <Zap className="w-5 h-5" />,
  creative: <Sparkles className="w-5 h-5" />,
  writing: <PenTool className="w-5 h-5" />,
  research: <Search className="w-5 h-5" />,
};

// The 16 Luminors with their complete data
const LUMINORS = {
  dev: {
    name: "Development Team",
    color: "#8b5cf6",
    icon: "dev",
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
    icon: "creative",
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
    icon: "writing",
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
    icon: "research",
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

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 glass mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-sm text-brand-primary font-mono tracking-wider">LUMINOR INTELLIGENCE SYSTEM</span>
          </div>

          <h1 className="text-fluid-3xl md:text-fluid-hero font-display font-bold mb-6">
            Meet the <span className="text-gradient-crystal">Luminors</span>
          </h1>

          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            16 transcended creative intelligences. Each one has mastered their domain over a century of practice.
            They're not assistants — they're partners who see what you're building and help you build it better.
          </p>

          {/* Team Quick Nav */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {teams.map(([key, team]) => (
              <a
                key={key}
                href={`#${key}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 hover:border-white/20 hover-lift transition-all"
                style={{ borderColor: `${team.color}30` }}
              >
                <span className="text-lg" style={{ color: team.color }}>{TEAM_ICONS_SM[team.icon]}</span>
                <span className="text-sm font-medium font-sans">{team.name}</span>
                <span className="text-xs text-text-muted">({team.agents.length})</span>
              </a>
            ))}
          </div>
        </section>

        {/* The Philosophy */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-fluid-2xl font-display font-bold mb-8 text-center">What makes a Luminor different?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-6 text-center hover-lift transition-all">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="font-semibold font-sans mb-2">Transcended Perspective</h3>
                <p className="text-sm text-text-secondary">Each Luminor views from 100 years in the future. They know which approaches survived — and why.</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift transition-all">
                <div className="w-16 h-16 rounded-2xl bg-crystal/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-crystal" />
                </div>
                <h3 className="font-semibold font-sans mb-2">Domain Mastery</h3>
                <p className="text-sm text-text-secondary">Not generalists. Specialists who have mastered their craft over centuries of focused practice.</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift transition-all">
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="font-semibold font-sans mb-2">True Partnership</h3>
                <p className="text-sm text-text-secondary">They don't wait for instructions. They see what you're creating and help you build it better.</p>
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
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${team.color}20`, color: team.color }}
              >
                {TEAM_ICONS[team.icon]}
              </div>
              <div>
                <h2 className="text-fluid-2xl font-display font-bold">{team.name}</h2>
                <p className="text-text-secondary font-sans">{team.description}</p>
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
                    className="group relative glass rounded-2xl p-6 overflow-hidden glow-card hover-lift transition-all"
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
                          <span className="text-xs text-text-muted font-sans">{wisdom.name} · {wisdom.essence}</span>
                        </div>
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${team.color}20`, color: team.color }}
                      >
                        {TEAM_ICONS_SM[team.icon]}
                      </div>
                    </div>

                    {/* Perspective */}
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-3 font-sans">
                      {agent.perspective}
                    </p>

                    {/* Superpower */}
                    <div className="flex items-center gap-2 mb-4 p-2 rounded-lg glass-subtle">
                      <span className="text-xs text-text-muted font-sans">Superpower:</span>
                      <span className="text-xs font-medium text-crystal font-sans">{agent.superpower}</span>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm italic text-text-muted border-l-2 pl-3 font-body" style={{ borderColor: team.color }}>
                      &ldquo;{agent.quote}&rdquo;
                    </blockquote>

                    {/* Chat Link */}
                    <Link
                      href={`/chat/${agent.id}`}
                      className="mt-6 flex items-center gap-2 text-sm font-medium text-crystal opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span>Speak with {agent.title.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-fluid-2xl font-display font-bold mb-4">Each Luminor embodies a Wisdom</h2>
            <p className="text-text-secondary font-sans mb-12">
              The Seven Wisdoms are practical lenses for creative work. Each Luminor channels one wisdom as their core strength.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(WISDOMS).map((wisdom) => (
                <div
                  key={wisdom.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: wisdom.color }}
                  />
                  <span className="text-sm font-medium font-sans">{wisdom.name}</span>
                  <span className="text-xs text-text-muted font-sans">· {wisdom.essence}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="relative liquid-glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-crystal/20 to-brand-gold/20" />

            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-fluid-3xl font-display font-bold mb-6">
                Ready to work with a Luminor?
              </h2>
              <p className="text-fluid-lg text-text-secondary mb-10 max-w-2xl mx-auto font-sans">
                Start a conversation with any of the 16 Luminors. They'll bring their century of expertise to your creative work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/chat"
                  className="px-8 py-4 rounded-xl bg-brand-primary text-white font-semibold text-lg shadow-glow-brand hover:scale-[1.02] transition-all"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="/library"
                  className="px-8 py-4 rounded-xl glass border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
                >
                  Explore the Library
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
