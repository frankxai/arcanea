import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Plan | Arcanea",
  description:
    "Arcanea's vision: a global creative intelligence platform where anyone can create anything through magic. The plan for how we get there.",
};

// ─── Pillar Data ────────────────────────────────────────────────────────────────

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  principles: string[];
  color: string;
  element: string;
}

const PILLARS: Pillar[] = [
  {
    number: "I",
    title: "Open-Source First",
    subtitle: "The tools belong to the creators",
    description:
      "Everything that makes Arcanea powerful — the skills, agents, commands, Luminors, and the creative intelligence layer — is open source. Creators can fork, extend, and contribute freely. We build trust through transparency, not lock-in.",
    principles: [
      "All 41+ agents, 23+ skills, and 28 commands are MIT-licensed",
      "The CLI installs across 5 platforms — no vendor lock-in",
      "Community contributions become part of the shared intelligence",
      "Every creator can build their own Arcanea locally with their coding agents",
    ],
    color: "#7fffd4",
    element: "Earth",
  },
  {
    number: "II",
    title: "Creator Intelligence",
    subtitle: "AI that learns to create with you",
    description:
      "Arcanea is not another AI wrapper. It is an intelligence layer that transforms any coding agent into a creative partner. The Seven Luminors, the Creative Bestiary, the Arcanean Prompt Language — these are frameworks that compound with use. The more you create, the smarter your companion becomes.",
    principles: [
      "Seven Luminor perspectives for any creative challenge",
      "Creative Bestiary: taxonomy of blocks with navigation protocols",
      "Self-optimizing agents that learn from creative patterns",
      "Intelligence bridge connecting all AI subsystems",
    ],
    color: "#9966ff",
    element: "Void",
  },
  {
    number: "III",
    title: "Living Mythology",
    subtitle: "A universe that grows with its community",
    description:
      "Arcanea is not set dressing. It is a living mythology — the Ten Guardians, Lumina and Nero's cosmic duality, the Five Elements, the Academy of Creation. This narrative architecture gives creators a shared language, a sense of belonging, and a framework for growth that transcends any single tool.",
    principles: [
      "17 Library collections with 34+ texts of creator wisdom",
      "Ten Gates progression from Apprentice to Luminor",
      "Seven Academy Houses for different creative paths",
      "Community-expanded lore and canonical contributions",
    ],
    color: "#ffd700",
    element: "Fire",
  },
  {
    number: "IV",
    title: "Multi-Agent Orchestration",
    subtitle: "Swarms of specialists, not single assistants",
    description:
      "The future of creative AI is not a single chatbot — it is orchestrated teams of specialist agents working in parallel. Arcanea's magic words fire entire agent swarms: ultraworld spawns 5 world-building agents simultaneously, ultracode launches architect + coder + reviewer in parallel. This is how ambitious creative work gets done.",
    principles: [
      "8 agent teams: coding, creative, writing, production, research, development, teacher, visionary",
      "Magic words trigger parallel agent execution",
      "Real-time swarm visualization dashboard",
      "Cross-process event logging and metrics",
    ],
    color: "#3b82f6",
    element: "Water",
  },
  {
    number: "V",
    title: "Global Creator Community",
    subtitle: "Built by creators, for creators, everywhere",
    description:
      "Arcanea is already a global movement. Creators on every continent are building with these tools, contributing skills, expanding the Library, and shaping the mythology. The plan is not to build a product and find users. The plan is to serve a community that is already creating.",
    principles: [
      "Open GitHub for contributions: skills, agents, lore, translations",
      "Discord as the primary community — real-time creation together",
      "Monthly creation sessions, quarterly Gate Ceremonies, annual Luminor Summit",
      "Local creator meetups in cities worldwide",
    ],
    color: "#ff6b6b",
    element: "Wind",
  },
];

// ─── How to Contribute ──────────────────────────────────────────────────────────

const CONTRIBUTE_PATHS = [
  {
    title: "Build Skills & Agents",
    description: "Create new specialist agents or skills that serve the community. From TDD workflows to character development frameworks — if it helps creators, it belongs in Arcanea.",
    link: "https://github.com/frankxai/arcanea",
    linkText: "Browse the skill catalog",
    accent: "#7fffd4",
  },
  {
    title: "Expand the Library",
    description: "Write parables, prophecies, chronicles, or practical wisdom. The Library is a living document — your voice and perspective make it richer for everyone.",
    link: "https://github.com/frankxai/arcanea",
    linkText: "View Library collections",
    accent: "#9966ff",
  },
  {
    title: "Improve the Platform",
    description: "The web app, CLI, MCP server, and intelligence layer are all open source. Pick an issue, build a feature, or fix a bug. Every pull request moves us forward.",
    link: "https://github.com/frankxai/arcanea",
    linkText: "Open issues on GitHub",
    accent: "#ffd700",
  },
  {
    title: "Create & Share",
    description: "Use Arcanea to create something — a world, a story, a game, a song — and share it with the community. Your creations inspire others and prove what is possible.",
    link: "https://discord.gg/arcanea",
    linkText: "Share in Discord",
    accent: "#3b82f6",
  },
];

// ─── Vision Numbers ─────────────────────────────────────────────────────────────

const VISION_NUMBERS = [
  { metric: "5", label: "AI Platforms Supported", sub: "Claude Code, OpenCode, Cursor, Codex, Gemini" },
  { metric: "17", label: "Library Collections", sub: "Laws, parables, chronicles, prophecies, and more" },
  { metric: "41+", label: "Specialist Agents", sub: "Across 8 teams — creative, coding, writing, research" },
  { metric: "10", label: "Gates of Mastery", sub: "From Foundation (174 Hz) to Source (1111 Hz)" },
];

// ─── Page Component ─────────────────────────────────────────────────────────────

export default function PlanPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.1),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="mb-20">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-14 sm:px-14 sm:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-crystal/8 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-8">
                <svg className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-xs font-mono tracking-widest uppercase text-brand-gold">
                  The Vision
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-6 leading-tight">
                Where Anyone Can
                <span className="block text-gradient-gold">Create Anything</span>
                <span className="block">Through Magic</span>
              </h1>

              <p className="text-text-secondary font-body text-xl leading-relaxed mb-4">
                Arcanea is a creative intelligence platform built by a global community of
                creators. We transform any AI coding tool into a creation machine — with
                mythology, wisdom, and orchestrated agent teams that make ambitious creative
                work possible for everyone.
              </p>

              <p className="text-text-muted font-body text-base italic mb-10">
                From 100 years hence, we build the future together.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  View the Roadmap
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Start Building
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Numbers */}
        <section className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {VISION_NUMBERS.map((item) => (
              <div key={item.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-display font-bold text-gradient-brand mb-2">
                  {item.metric}
                </div>
                <div className="text-sm font-semibold text-text-primary mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-text-muted font-sans">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Five Pillars */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono tracking-[0.35em] uppercase text-brand-gold mb-3">
              The Five Pillars
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              How we build the future
            </h3>
          </div>

          <div className="space-y-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="relative glass rounded-2xl p-8 sm:p-10 overflow-hidden glow-card transition-all hover:border-white/20"
              >
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 0% 50%, ${pillar.color}12, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-3xl font-display font-bold opacity-30"
                      style={{ color: pillar.color }}
                    >
                      {pillar.number}
                    </span>
                    <div>
                      <h3
                        className="text-xl font-display font-bold"
                        style={{ color: pillar.color }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-text-muted font-mono">
                        {pillar.subtitle}
                      </p>
                    </div>
                    <span className="ml-auto hidden sm:block text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-text-muted">
                      {pillar.element}
                    </span>
                  </div>

                  <p className="text-text-secondary font-body leading-relaxed mb-6 max-w-3xl">
                    {pillar.description}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-2" role="list">
                    {pillar.principles.map((principle) => (
                      <li
                        key={principle}
                        className="flex items-start gap-2.5 text-sm text-text-muted font-sans"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: pillar.color }}
                        />
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Contribute */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono tracking-[0.35em] uppercase text-crystal mb-3">
              Get Involved
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              This is your plan too
            </h3>
            <p className="text-text-secondary font-body text-base mt-3 max-w-2xl mx-auto">
              Arcanea is not built by one person or one company. It is built by every creator who
              contributes a skill, writes a Library text, fixes a bug, or shares their creation.
              Here is how you can start.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {CONTRIBUTE_PATHS.map((path) => (
              <div
                key={path.title}
                className="glass rounded-2xl p-7 glow-card hover-lift transition-all"
              >
                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{ backgroundColor: path.accent }}
                />
                <h4 className="font-display font-semibold text-lg mb-2">
                  {path.title}
                </h4>
                <p className="text-text-secondary text-sm font-body leading-relaxed mb-4">
                  {path.description}
                </p>
                <a
                  href={path.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: path.accent }}
                >
                  {path.linkText}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Statement */}
        <section>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="h-0.5 w-full bg-gradient-to-r from-[#7fffd4] via-[#ffd700] to-[#ff6b6b]" />

            <div className="px-8 py-16 sm:px-14 sm:py-20 text-center">
              <blockquote className="max-w-3xl mx-auto">
                <p className="text-fluid-2xl font-display font-bold leading-snug mb-6">
                  We believe the antidote to a terrible future{" "}
                  <span className="text-gradient-crystal">
                    is imagining a good one.
                  </span>
                </p>

                <p className="text-xl font-display font-semibold text-brand-gold mb-6">
                  And then building it.
                </p>

                <p className="text-text-secondary font-body leading-relaxed max-w-xl mx-auto mb-10">
                  Not another tool. A home for creators.
                  Not another platform. A standard for magical creation.
                  Not another AI. A companion that grows with you.
                </p>
              </blockquote>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://discord.gg/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  Join the Community
                </a>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Begin Your Journey
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="h-0.5 w-full bg-gradient-to-r from-[#ff6b6b] via-[#ffd700] to-[#7fffd4]" />
          </div>
        </section>
      </main>
    </div>
  );
}
