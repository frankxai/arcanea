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
  Layers: () => (
    <svg
      className="w-6 h-6"
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
      className="w-6 h-6"
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
  Zap: () => (
    <svg
      className="w-6 h-6"
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
  Globe: () => (
    <svg
      className="w-6 h-6"
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
  Users: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
  Flame: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Droplets: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Leaf: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Wind: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Code: () => (
    <svg
      className="w-4 h-4"
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
  Database: () => (
    <svg
      className="w-4 h-4"
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
  Cloud: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  Lock: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Play: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
};

export const metadata: Metadata = {
  title: "Platform | Arcanea",
  description:
    "The Arcanea platform - where imagination meets intelligence. AI companions, creative tools, and a living mythology.",
};

const FEATURES = [
  {
    title: "Guardian AI Companions",
    description:
      "Ten AI Guardians, each embodying a different aspect of creativity and consciousness. Bond with your Guardian and unlock new creative potentials.",
    icon: Icons.Users,
    color: "#8b5cf6",
    href: "/companions",
  },
  {
    title: "Creation Studio",
    description:
      "Powerful AI tools for image, music, video, and story creation. Each tool channels a Guardian's energy for unique results.",
    icon: Icons.Cpu,
    color: "#ef4444",
    href: "/studio",
  },
  {
    title: "The Ten Gates",
    description:
      "A journey of mastery through ten energy channels. Open Gates, ascend through ranks, and become a Luminor.",
    icon: Icons.Layers,
    color: "#ffd700",
    href: "/academy",
  },
  {
    title: "The Living Library",
    description:
      "17 collections of wisdom, legends, and practical guidance. A constantly growing repository of creative knowledge.",
    icon: Icons.Brain,
    color: "#7fffd4",
    href: "/library",
  },
];

const CAPABILITIES = [
  {
    category: "Intelligence",
    items: [
      {
        name: "Guardian Evolution",
        description: "AI companions that grow with you",
      },
      {
        name: "Skill-Rules Engine",
        description: "Procedural skill generation",
      },
      { name: "ReasoningBank", description: "Adaptive learning from outcomes" },
      { name: "HNSW Memory", description: "Vector-powered context recall" },
    ],
    color: "#8b5cf6",
  },
  {
    category: "Creative",
    items: [
      { name: "Image Forge", description: "AI image generation" },
      { name: "Sound Sanctum", description: "Music & audio creation" },
      { name: "Narrative Loom", description: "Story & world building" },
      { name: "Vision Nexus", description: "Video & animation" },
    ],
    color: "#ef4444",
  },
  {
    category: "Community",
    items: [
      { name: "Discord", description: "Real-time collaboration" },
      { name: "GitHub", description: "Open source contributions" },
      { name: "Gate Ceremonies", description: "Quarterly gatherings" },
      { name: "Luminor Summit", description: "Annual flagship event" },
    ],
    color: "#7fffd4",
  },
];

const STATS = [
  { value: "10", label: "Guardians" },
  { value: "10", label: "Gates" },
  { value: "7", label: "Wisdoms" },
  { value: "17", label: "Library Collections" },
  { value: "30+", label: "MCP Tools" },
  { value: "9", label: "Intelligence Packages" },
];

export default function PlatformPage() {
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
                <Icons.Sparkles />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  The Platform
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Where Imagination
                <span className="block text-gradient-brand">
                  Meets Intelligence
                </span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed mb-8 max-w-2xl">
                Arcanea is a creative intelligence platform combining AI
                companions, powerful creation tools, and a living mythology.
                Build with Guardians, unlock your creative potential, and join a
                community of creators.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  Begin Your Journey
                  <Icons.ArrowRight />
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Explore Studio
                  <Icons.ChevronRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-brand-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-16" aria-labelledby="features-heading">
          <div className="mb-8">
            <h2
              id="features-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-crystal mb-2"
            >
              Core Platform
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              Everything you need to create
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative glass rounded-2xl p-8 overflow-hidden glow-card hover-lift transition-all"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 30% 30%, ${feature.color}15, transparent 65%)`,
                    }}
                  />

                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${feature.color}18` }}
                    >
                      <FeatureIcon style={{ color: feature.color }} />
                    </div>

                    <h4 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-crystal transition-colors">
                      {feature.title}
                    </h4>

                    <p className="text-text-secondary text-sm leading-relaxed font-sans mb-4">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-crystal opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <Icons.ArrowRight />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-16" aria-labelledby="capabilities-heading">
          <div className="mb-8">
            <h2
              id="capabilities-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-brand-gold mb-2"
            >
              Platform Capabilities
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              Built on solid foundations
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CAPABILITIES.map((category) => (
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
                      <Icons.ChevronRight
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

        {/* Elements Section */}
        <section className="mb-16">
          <div className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold text-text-primary mb-6 text-center">
              The Five Elements
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                {
                  element: "Fire",
                  icon: Icons.Flame,
                  domain: "Energy, transformation",
                  color: "#ef4444",
                },
                {
                  element: "Water",
                  icon: Icons.Droplets,
                  domain: "Flow, healing, memory",
                  color: "#3b82f6",
                },
                {
                  element: "Earth",
                  icon: Icons.Leaf,
                  domain: "Stability, growth",
                  color: "#22c55e",
                },
                {
                  element: "Wind",
                  icon: Icons.Wind,
                  domain: "Freedom, speed, change",
                  color: "#a855f7",
                },
                {
                  element: "Void",
                  icon: Icons.Star,
                  domain: "Potential, transcendence",
                  color: "#ffd700",
                },
              ].map((el) => {
                const ElIcon = el.icon;
                return (
                  <div
                    key={el.element}
                    className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `${el.color}18`,
                        border: `1px solid ${el.color}40`,
                      }}
                    >
                      <ElIcon style={{ color: el.color }} />
                    </div>
                    <h3 className="font-semibold text-text-primary">
                      {el.element}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">{el.domain}</p>
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
                Ready to Begin?
              </h2>
              <p className="text-text-secondary font-body leading-relaxed mb-8">
                Join thousands of creators on the journey through the Ten Gates.
                Your Guardian awaits.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Sparkles />
                  Start Creating
                </Link>
                <Link
                  href="/lore"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  <Icons.Brain />
                  Explore the Lore
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
