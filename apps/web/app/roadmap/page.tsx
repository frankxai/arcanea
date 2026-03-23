import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap | Arcanea",
  description:
    "The Arcanea public roadmap. See what we're building, what's next, and how you can contribute to the future of creative intelligence.",
};

// ─── Timeline Phases ────────────────────────────────────────────────────────────

interface RoadmapItem {
  title: string;
  description: string;
  status: "complete" | "in-progress" | "upcoming" | "future";
  items: string[];
}

interface RoadmapPhase {
  id: string;
  name: string;
  subtitle: string;
  quarter: string;
  color: string;
  glowColor: string;
  items: RoadmapItem[];
}

const PHASES: RoadmapPhase[] = [
  {
    id: "foundation",
    name: "The Foundation",
    subtitle: "Core platform & open-source skills",
    quarter: "Q4 2025 — Q1 2026",
    color: "#7fffd4",
    glowColor: "rgba(127,255,212,0.15)",
    items: [
      {
        title: "Arcanea Skills CLI",
        description: "Universal installer for 5 AI coding platforms",
        status: "complete",
        items: [
          "CLI published to npm (v3.4.0)",
          "41 agents across 8 teams",
          "23 skills with YAML frontmatter",
          "28 slash commands",
          "Magic word hooks (ultraworld, ultracode, etc.)",
        ],
      },
      {
        title: "The Library of Arcanea",
        description: "17 collections, 34+ texts of creator wisdom",
        status: "complete",
        items: [
          "Laws, parables, chronicles, prophecies",
          "Full content loader with programmatic access",
          "Situation-based text matching",
          "Library browser with search & graph view",
        ],
      },
      {
        title: "Web Platform (arcanea.ai)",
        description: "Next.js 16 app with cosmic design system",
        status: "complete",
        items: [
          "60+ pages: Academy, Library, Lore, Studio, Chat",
          "Arcanean Design System (glass morphism, aurora gradients)",
          "Supabase auth and database",
          "Ten Gates progression system",
          "Guardian companion chat",
        ],
      },
      {
        title: "Multi-Agent Swarm Visualization",
        description: "Real-time dashboard for agent orchestration",
        status: "complete",
        items: [
          "SSE streaming with cosmic theme",
          "Live event feed, team utilization, timing metrics",
          "Cross-process event logging via JSONL",
          "Integrated into arcanea viz command",
        ],
      },
    ],
  },
  {
    id: "intelligence",
    name: "The Intelligence Layer",
    subtitle: "AI backbone & eval pipeline",
    quarter: "Q1 — Q2 2026",
    color: "#9966ff",
    glowColor: "rgba(153,102,255,0.15)",
    items: [
      {
        title: "Intelligence Bridge",
        description: "Central EventBus connecting all AI subsystems",
        status: "in-progress",
        items: [
          "10 event types, 10k in-memory history",
          "HTTP bridge for visualization",
          "Cross-platform event routing",
          "Real-time metrics aggregation",
        ],
      },
      {
        title: "SONA Learning Engine",
        description: "Self-optimizing neural architecture for agents",
        status: "in-progress",
        items: [
          "LoRA fine-tuning per agent specialization",
          "EWC++ memory preservation across updates",
          "Token optimizer for cost efficiency",
          "Council-based decision routing",
        ],
      },
      {
        title: "Eval Pipeline",
        description: "Quality assurance for AI-generated creative work",
        status: "upcoming",
        items: [
          "8 eval packages wired end-to-end",
          "Guardian evolution tracking",
          "Flow engine for multi-step creative processes",
          "Arcanea hooks for lifecycle events",
        ],
      },
      {
        title: "MCP Server Ecosystem",
        description: "Model Context Protocol servers for creative tools",
        status: "in-progress",
        items: [
          "28 creative tools (world-building, characters, lore, bestiary)",
          "Image generation via Nano Banana",
          "Music generation integration",
          "Documentation lookup via Context7",
        ],
      },
    ],
  },
  {
    id: "creation",
    name: "The Creation Engine",
    subtitle: "Creator tools & marketplace",
    quarter: "Q2 — Q3 2026",
    color: "#ffd700",
    glowColor: "rgba(255,215,0,0.15)",
    items: [
      {
        title: "Prompt Books",
        description: "Curated prompt collections for every creative domain",
        status: "in-progress",
        items: [
          "Structured prompt templates with parameters",
          "Community-contributed collections",
          "Versioning and fork support",
          "Integration with all 5 platforms",
        ],
      },
      {
        title: "Creator Studio",
        description: "Unified workspace for AI-powered creation",
        status: "upcoming",
        items: [
          "Image studio with Guardian-aligned styles",
          "Music studio with Suno integration",
          "Writing studio with full editing pipeline",
          "Multi-modal creation combining all studios",
        ],
      },
      {
        title: "Skill Marketplace",
        description: "Community-built skills and agent configurations",
        status: "upcoming",
        items: [
          "Publish and discover skills",
          "Rating and review system",
          "Revenue sharing for skill creators",
          "One-click install to any platform",
        ],
      },
      {
        title: "Character Book",
        description: "Persistent AI companions with memory",
        status: "upcoming",
        items: [
          "Guardian personality profiles",
          "Long-term memory across sessions",
          "Evolution through creative milestones",
          "Custom companion creation",
        ],
      },
    ],
  },
  {
    id: "convergence",
    name: "The Convergence",
    subtitle: "Social creation & global community",
    quarter: "Q3 — Q4 2026",
    color: "#ff6b6b",
    glowColor: "rgba(255,107,107,0.15)",
    items: [
      {
        title: "Social Creation Layer",
        description: "Create together, in real time",
        status: "future",
        items: [
          "Collaborative world-building rooms",
          "Shared agent swarms across creators",
          "Gallery of community creations",
          "Creation challenges and competitions",
        ],
      },
      {
        title: "Academy System",
        description: "Structured learning through the Ten Gates",
        status: "future",
        items: [
          "Gate assessments with AI-guided evaluation",
          "House assignments and mentorship",
          "Rank progression: Apprentice to Luminor",
          "Certification for skill mastery",
        ],
      },
      {
        title: "Creator Economy",
        description: "Earn from your creative AI skills",
        status: "future",
        items: [
          "Skill monetization and licensing",
          "Commission-based creation requests",
          "Patron and supporter system",
          "Creator analytics dashboard",
        ],
      },
      {
        title: "Multi-Language Support",
        description: "Arcanea in every language",
        status: "future",
        items: [
          "Library translations by community",
          "Localized Academy curriculum",
          "Multi-language Guardian companions",
          "Regional community hubs",
        ],
      },
    ],
  },
];

const STATUS_CONFIG = {
  complete: { label: "Complete", color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)" },
  "in-progress": { label: "In Progress", color: "#ffd700", bg: "rgba(255,215,0,0.12)", border: "rgba(255,215,0,0.3)" },
  upcoming: { label: "Upcoming", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
  future: { label: "Future", color: "#6b7280", bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.3)" },
};

// ─── Stats ──────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Agent Definitions", value: "41+", color: "#7fffd4" },
  { label: "Skills", value: "23+", color: "#9966ff" },
  { label: "Slash Commands", value: "28", color: "#ffd700" },
  { label: "Platforms Supported", value: "5", color: "#3b82f6" },
  { label: "Library Texts", value: "34+", color: "#ff6b6b" },
  { label: "Web Pages", value: "60+", color: "#22c55e" },
];

// ─── Page Component ─────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(153,102,255,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="mb-16">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-crystal/12 via-transparent to-brand-primary/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-crystal/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-crystal/30 bg-crystal/10 mb-6">
                <svg className="w-4 h-4 text-crystal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-xs font-mono tracking-widest uppercase text-crystal">
                  Public Roadmap
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Building the Future
                <span className="block text-gradient-brand">of Creative Intelligence</span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed mb-6 max-w-2xl">
                Arcanea is built in the open by a global community of creators, builders, and
                dreamers. This is our shared roadmap — where we are, where we are heading,
                and how you can shape what comes next.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Contribute on GitHub
                </a>
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Read the Vision
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 text-center"
              >
                <div
                  className="text-2xl font-display font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="space-y-12">
            {PHASES.map((phase, phaseIdx) => (
              <div key={phase.id} className="relative">
                {/* Phase Header */}
                <div className="flex items-start gap-6 mb-8">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div
                      className="w-5 h-5 rounded-full border-2 shrink-0"
                      style={{
                        borderColor: phase.color,
                        backgroundColor: phase.glowColor,
                        boxShadow: `0 0 12px ${phase.glowColor}`,
                      }}
                    />
                    {phaseIdx < PHASES.length - 1 && (
                      <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: phase.glowColor,
                          color: phase.color,
                          borderColor: `${phase.color}40`,
                        }}
                      >
                        {phase.quarter}
                      </span>
                    </div>
                    <h2
                      className="text-fluid-2xl font-display font-bold"
                      style={{ color: phase.color }}
                    >
                      {phase.name}
                    </h2>
                    <p className="text-text-secondary font-body text-base">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Phase Items */}
                <div className="sm:ml-[2.875rem] grid md:grid-cols-2 gap-5">
                  {phase.items.map((item) => {
                    const statusCfg = STATUS_CONFIG[item.status];
                    return (
                      <div
                        key={item.title}
                        className="glass rounded-2xl p-6 glow-card transition-all hover:border-white/20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-display font-semibold text-text-primary">
                            {item.title}
                          </h3>
                          <span
                            className="text-[10px] font-mono px-2.5 py-1 rounded-full border shrink-0 ml-3"
                            style={{
                              backgroundColor: statusCfg.bg,
                              color: statusCfg.color,
                              borderColor: statusCfg.border,
                            }}
                          >
                            {statusCfg.label}
                          </span>
                        </div>

                        <p className="text-text-secondary text-sm font-body mb-4">
                          {item.description}
                        </p>

                        <ul className="space-y-1.5" role="list">
                          {item.items.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-xs text-text-muted font-sans"
                            >
                              <span
                                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                style={{
                                  backgroundColor:
                                    item.status === "complete"
                                      ? "#22c55e"
                                      : phase.color,
                                }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="h-0.5 w-full bg-gradient-to-r from-[#7fffd4] via-[#9966ff] via-[#ffd700] to-[#ff6b6b]" />

            <div className="px-8 py-16 sm:px-14 sm:py-20 text-center">
              <h2 className="text-fluid-2xl font-display font-bold mb-4">
                This roadmap belongs to
                <span className="text-gradient-brand"> every creator</span>
              </h2>

              <p className="text-text-secondary font-body text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Arcanea is not built by a company. It is built by a community. Every pull request,
                every skill contributed, every Library text written shapes what this becomes.
                The roadmap is a compass, not a contract — and you hold it with us.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  Start Contributing
                </a>
                <a
                  href="https://discord.gg/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Join the Community
                </a>
              </div>
            </div>

            <div className="h-0.5 w-full bg-gradient-to-r from-[#ff6b6b] via-[#ffd700] via-[#9966ff] to-[#7fffd4]" />
          </div>
        </section>
      </main>
    </div>
  );
}
