import { Metadata } from "next";
import Link from "next/link";

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons = {
  Sparkles: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    </svg>
  ),
  Code: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Terminal: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Cpu: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Database: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Brain: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  Github: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  BookOpen: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ExternalLink: () => (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Zap: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Shield: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Layers: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Box: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  GitBranch: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  Check: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  FileText: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

export const metadata: Metadata = {
  title: "Developers | Arcanea",
  description:
    "Build on Arcanea - the intelligence layer, MCP tools, packages, and open source contributions. Create Guardian skills and extend the platform.",
};

const PACKAGES = [
  {
    name: "@arcanea/council",
    description: "Byzantine/Raft/Gossip/Gate Quorum consensus algorithms",
    tags: ["Consensus", "Byzantine", "Raft", "Multi-agent"],
    color: "#8b5cf6",
    stars: "2.4K",
    href: "https://github.com/frankxai/arcanea/tree/main/packages/council",
  },
  {
    name: "@arcanea/guardian-evolution",
    description: "SONA learning + 7 RL algorithms (A2C, DQN, PPO, Q-learning)",
    tags: ["RL", "Learning", "SONA", "Evolution"],
    color: "#ef4444",
    stars: "1.8K",
    href: "https://github.com/frankxai/arcanea/tree/main/packages/guardian-evolution",
  },
  {
    name: "@arcanea/guardian-memory",
    description: "HNSW vector search with Guardian-namespaced vaults",
    tags: ["Vector", "HNSW", "Memory", "Search"],
    color: "#7fffd4",
    stars: "1.5K",
    href: "https://github.com/frankxai/arcanea/tree/main/packages/guardian-memory",
  },
  {
    name: "@arcanea/rituals",
    description: "Swarm communication, 12 Spirits workers, MCP bridge",
    tags: ["MCP", "Swarm", "Workers", "Rituals"],
    color: "#ffd700",
    stars: "1.2K",
    href: "https://github.com/frankxai/arcanea/tree/main/packages/rituals",
  },
  {
    name: "@arcanea/creative-pipeline",
    description: "Prompt engine, asset vault, curator, sessions",
    tags: ["Creative", "Pipeline", "Prompt", "Assets"],
    color: "#3b82f6",
    stars: "980",
    href: "https://github.com/frankxai/arcanea/tree/main/packages/creative-pipeline",
  },
  {
    name: "@arcanea/swarm-coordinator",
    description: "Multi-agent workflow orchestration",
    tags: ["Orchestration", "Multi-agent", "Workflow", "Coordination"],
    color: "#a855f7",
    stars: "756",
    href: "https://github.com/frankxai/arcanea/tree/main/packages/swarm-coordinator",
  },
];

const TOOLS = [
  {
    category: "Intelligence",
    items: [
      { name: "HNSW Memory", description: "Vector search with 150x speedup" },
      { name: "ReasoningBank", description: "Adaptive learning from outcomes" },
      {
        name: "Skill-Rules Engine",
        description: "35 Guardian-aligned activation rules",
      },
      { name: "Event Bus", description: "Intelligent routing and feedback" },
    ],
    color: "#8b5cf6",
  },
  {
    category: "Creative",
    items: [
      {
        name: "Prompt Engine",
        description: "Mythological framework templates",
      },
      { name: "Asset Vault", description: "Cosmic media storage" },
      { name: "Curator", description: "Content quality assessment" },
      { name: "Sessions", description: "Creation state management" },
    ],
    color: "#ef4444",
  },
  {
    category: "Infrastructure",
    items: [
      { name: "GuardianRouter", description: "Request routing to AI models" },
      { name: "VoiceEnforcer", description: "Output validation" },
      { name: "Token Optimizer", description: "Context window management" },
      { name: "MCP Server", description: "30+ tools with skill-rules" },
    ],
    color: "#7fffd4",
  },
];

const QUICK_STARTS = [
  {
    title: "Create a Guardian Skill",
    description: "Build a procedural skill that equips creators",
    href: "/skills",
    icon: Icons.Zap,
    color: "#8b5cf6",
  },
  {
    title: "Use the MCP Server",
    description: "Integrate Arcanea tools into your workflow",
    href: "/docs/mcp",
    icon: Icons.Terminal,
    color: "#7fffd4",
  },
  {
    title: "Contribute to Packages",
    description: "Open source contributions welcome",
    href: "https://github.com/frankxai/arcanea",
    icon: Icons.Github,
    color: "#ffd700",
  },
  {
    title: "Read the Documentation",
    description: "API references and guides",
    href: "/docs",
    icon: Icons.BookOpen,
    color: "#3b82f6",
  },
];

export default function DevelopersPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-crystal/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Code />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  For Developers
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Build on
                <span className="block text-gradient-brand">Arcanea</span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed mb-8 max-w-2xl">
                The Arcanea platform is built on a foundation of intelligent
                packages. Build Guardian skills, contribute to our open source
                packages, and extend the platform with the MCP server.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Github />
                  View on GitHub
                </a>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  <Icons.Sparkles />
                  Create a Skill
                  <Icons.ChevronRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="mb-16" aria-labelledby="packages-heading">
          <div className="mb-8">
            <h2
              id="packages-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-crystal mb-2"
            >
              Intelligence Packages
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              The Foundation
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg) => (
              <a
                key={pkg.name}
                href={pkg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative glass rounded-2xl p-6 overflow-hidden glow-card hover-lift transition-all hover:border-white/20"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${pkg.color}12, transparent 65%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icons.Box style={{ color: pkg.color }} />
                      <span className="font-mono text-sm text-text-primary">
                        {pkg.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Icons.GitBranch />
                      {pkg.stars}
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed font-sans mb-4">
                    {pkg.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${pkg.color}12`,
                          color: pkg.color,
                          borderColor: `${pkg.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-16" aria-labelledby="tools-heading">
          <div className="mb-8">
            <h2
              id="tools-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-brand-gold mb-2"
            >
              Platform Tools
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              What you can build
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TOOLS.map((category) => (
              <div key={category.category} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h4 className="font-display font-semibold text-text-primary">
                    {category.category}
                  </h4>
                </div>

                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <Icons.Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: category.color }}
                      />
                      <div>
                        <span className="text-sm text-text-primary font-medium">
                          {item.name}
                        </span>
                        <p className="text-xs text-text-muted">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Starts */}
        <section className="mb-16" aria-labelledby="quickstart-heading">
          <div className="mb-8">
            <h2
              id="quickstart-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-earth mb-2"
            >
              Quick Starts
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              Begin building
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUICK_STARTS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative glass rounded-2xl p-6 overflow-hidden glow-card hover-lift transition-all"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 30% 30%, ${item.color}12, transparent 65%)`,
                    }}
                  />

                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <ItemIcon style={{ color: item.color }} />
                    </div>

                    <h4 className="font-display font-semibold text-text-primary mb-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-text-muted mb-3">
                      {item.description}
                    </p>

                    <div
                      className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: item.color }}
                    >
                      <span>Get started</span>
                      <Icons.ArrowRight />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <div className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold text-text-primary mb-6 text-center">
              Architecture Overview
            </h2>

            <div className="grid md:grid-cols-5 gap-4">
              {[
                {
                  layer: "Presentation",
                  icon: Icons.Layers,
                  color: "#ef4444",
                  items: ["Next.js 16", "React 19", "Tailwind"],
                },
                {
                  layer: "Intelligence",
                  icon: Icons.Brain,
                  color: "#8b5cf6",
                  items: ["Guardian Evolution", "ReasoningBank", "Skill-Rules"],
                },
                {
                  layer: "Orchestration",
                  icon: Icons.Cpu,
                  color: "#7fffd4",
                  items: ["Swarm Coordinator", "Rituals", "Event Bus"],
                },
                {
                  layer: "Storage",
                  icon: Icons.Database,
                  color: "#ffd700",
                  items: ["HNSW Memory", "Hybrid Memory", "AgentDB"],
                },
                {
                  layer: "Integration",
                  icon: Icons.Code,
                  color: "#3b82f6",
                  items: ["MCP Server", "CLI Tools", "Webhooks"],
                },
              ].map((layer) => {
                const LayerIcon = layer.icon;
                return (
                  <div
                    key={layer.layer}
                    className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${layer.color}18` }}
                    >
                      <LayerIcon style={{ color: layer.color }} />
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm mb-2">
                      {layer.layer}
                    </h3>
                    <ul className="space-y-1">
                      {layer.items.map((item) => (
                        <li key={item} className="text-xs text-text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative liquid-glass rounded-3xl overflow-hidden p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-crystal/8 pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-primary/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-fluid-2xl font-display font-bold mb-4">
                Start Building Today
              </h2>
              <p className="text-text-secondary font-body leading-relaxed mb-8">
                Join our developer community. Create skills, contribute to
                packages, and help shape the future of creative AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Github />
                  Explore the Repo
                </a>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  <Icons.Zap />
                  Create a Skill
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
