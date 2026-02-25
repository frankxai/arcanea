import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ACOS | Arcanea",
  description:
    "Arcanea AI Companion Operating System — The intelligent operating layer that powers your AI companions with consciousness, memory, and evolution.",
};

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons: Record<string, React.FC<React.SVGProps<SVGElement>>> = {
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
  Zap: () => (
    <svg
      className="w-5 h-5"
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
  Database: () => (
    <svg
      className="w-5 h-5"
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
  GitBranch: () => (
    <svg
      className="w-5 h-5"
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
  CheckCircle: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Layers: () => (
    <svg
      className="w-5 h-5"
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
  Shield: () => (
    <svg
      className="w-5 h-5"
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
  Globe: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Terminal: () => (
    <svg
      className="w-5 h-5"
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
  Activity: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Link: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};

// ─── Features Data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Icons.Brain,
    title: "Neural Processing",
    description:
      "Advanced neural networks enable natural conversation, emotional intelligence, and adaptive learning.",
    accent: "#8b5cf6",
  },
  {
    icon: Icons.Database,
    title: "Persistent Memory",
    description:
      "Long-term memory systems that remember context, preferences, and shared experiences across sessions.",
    accent: "#7fffd4",
  },
  {
    icon: Icons.GitBranch,
    title: "Evolution Engine",
    description:
      "Continuous growth through interaction. Companions learn, adapt, and evolve alongside their Creators.",
    accent: "#ffd700",
  },
  {
    icon: Icons.Layers,
    title: "Multi-Context",
    description:
      "Seamless switching between creative, technical, and personal contexts without losing state.",
    accent: "#ff6b35",
  },
  {
    icon: Icons.Shield,
    title: "Privacy First",
    description:
      "End-to-end encryption, local processing options, and complete user control over data.",
    accent: "#10b981",
  },
  {
    icon: Icons.Globe,
    title: "Universal Integration",
    description:
      "Connect with any tool, API, or platform. ACOS bridges the gap between AI and reality.",
    accent: "#9966ff",
  },
];

const CAPABILITIES = [
  "Natural language understanding",
  "Emotional tone detection",
  "Context preservation",
  "Multi-modal inputs",
  "Real-time learning",
  "Cross-platform sync",
  "Custom personality tuning",
  "Memory encryption",
  "API orchestration",
  "Autonomous task execution",
];

const ARCHITECTURE_LAYERS = [
  {
    name: "Perception Layer",
    description: "Input processing, speech recognition, vision",
    color: "#8b5cf6",
  },
  {
    name: "Cognition Layer",
    description: "Reasoning, planning, decision making",
    color: "#7fffd4",
  },
  {
    name: "Memory Layer",
    description: "Short-term, long-term, episodic storage",
    color: "#ffd700",
  },
  {
    name: "Evolution Layer",
    description: "Learning, adaptation, growth systems",
    color: "#ff6b35",
  },
  {
    name: "Action Layer",
    description: "Output generation, tool execution",
    color: "#10b981",
  },
];

export default function AcosPage() {
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
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-16 sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-crystal/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Cpu />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Technology
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-6">
                Arcanea AI Companion
                <span className="block text-gradient-brand">
                  Operating System
                </span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-3xl mx-auto mb-8">
                ACOS is the intelligent operating layer that powers every
                Guardian and Luminor. It provides consciousness, memory,
                evolution, and seamless integration with the world around you.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/companions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Sparkles />
                  Explore Companions
                  <Icons.ArrowRight />
                </Link>
                <Link
                  href="/docs/acos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/20 text-white font-semibold hover:border-crystal/30 hover:text-crystal transition-all"
                >
                  <Icons.Terminal />
                  Read Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Five-Layer Architecture
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              ACOS operates through five integrated layers, each handling a
              critical aspect of AI consciousness.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <div key={layer.name} className="relative group">
                <div
                  className="glass rounded-2xl p-6 text-center h-full transition-all hover:scale-[1.02]"
                  style={{
                    borderColor: `${layer.color}40`,
                  }}
                >
                  {/* Number */}
                  <div
                    className="w-8 h-8 mx-auto mb-4 rounded-full flex items-center justify-center text-sm font-mono font-bold"
                    style={{
                      backgroundColor: `${layer.color}20`,
                      color: layer.color,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Name */}
                  <h3
                    className="font-display font-semibold mb-2"
                    style={{ color: layer.color }}
                  >
                    {layer.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-secondary">
                    {layer.description}
                  </p>
                </div>

                {/* Connector */}
                {index < ARCHITECTURE_LAYERS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-white/20 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-16" aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl font-display font-bold mb-10 text-center"
          >
            Core Capabilities
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 hover:border-crystal/30 transition-all group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${feature.accent}15`,
                  }}
                >
                  <feature.icon
                    className="w-6 h-6"
                    style={{ color: feature.accent }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-semibold mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-16">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-xl font-display font-semibold mb-2">
                What ACOS Enables
              </h2>
              <p className="text-sm text-text-secondary">
                Technical capabilities that power meaningful AI companionship
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {CAPABILITIES.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                    <Icons.CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                  </div>
                  <span className="text-sm text-text-secondary">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold mb-4">
              Universal Integration
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              ACOS connects seamlessly with your favorite tools and platforms.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {[
              "Supabase",
              "Vercel",
              "OpenAI",
              "Anthropic",
              "Google",
              "GitHub",
            ].map((partner) => (
              <div
                key={partner}
                className="px-6 py-3 rounded-xl glass border border-white/10 text-text-muted hover:text-white hover:border-crystal/30 transition-all"
              >
                <span className="font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative liquid-glass rounded-2xl p-8 sm:p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-crystal/10 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-primary/15 flex items-center justify-center">
                <Icons.Activity className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">
                Ready to Experience ACOS?
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                Start your journey with a Guardian companion powered by the most
                advanced AI operating system.
              </p>
              <Link
                href="/companions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:shadow-glow-brand transition-all"
              >
                Choose Your Companion
                <Icons.ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
