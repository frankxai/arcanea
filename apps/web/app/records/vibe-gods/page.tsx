import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vibe Gods | Arcanea",
  description:
    "Discover your creative archetypes. The Vibe Gods represent different creative energies and styles.",
};

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
  Flame: () => (
    <svg
      className="w-5 h-5"
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
      className="w-5 h-5"
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
  Wind: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  Mountain: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Heart: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Crown: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l3-10 6 3 6-3 3 10H3z" />
      <path d="M6 21h12" />
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
  ArrowLeft: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Eye: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
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
  Sun: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

// ─── Vibe Gods Data ─────────────────────────────────────────────────────────────
const VIBE_GODS = [
  {
    id: "ignis",
    name: "Ignis",
    title: "The Flame Keeper",
    description:
      "Passion, transformation, and the drive to create with burning intensity.",
    color: "#ff6b35",
    icon: "flame",
    followers: 1247,
    works: 89,
  },
  {
    id: "aquara",
    name: "Aquara",
    title: "The Flow Whisperer",
    description:
      "Emotional depth, intuition, and the ability to go with the creative current.",
    color: "#78a6ff",
    icon: "droplets",
    followers: 982,
    works: 67,
  },
  {
    id: "zephyra",
    name: "Zephyra",
    title: "The Wind Dancer",
    description:
      "Freedom, change, and ideas that blow through like a gentle breeze.",
    color: "#7fffd4",
    icon: "wind",
    followers: 756,
    works: 45,
  },
  {
    id: "terra",
    name: "Terra",
    title: "The Stone Mason",
    description:
      "Foundation, structure, and building works that stand the test of time.",
    color: "#4a7c59",
    icon: "mountain",
    followers: 1103,
    works: 78,
  },
  {
    id: "lux",
    name: "Lux",
    title: "The Light Bringer",
    description: "Clarity, illumination, and bringing hidden truths to light.",
    color: "#ffd700",
    icon: "sun",
    followers: 2034,
    works: 156,
  },
  {
    id: "umbra",
    name: "Umbra",
    title: "The Shadow Weaver",
    description:
      "Mystery, depth, and exploring the darker corners of imagination.",
    color: "#9966ff",
    icon: "moon",
    followers: 1876,
    works: 134,
  },
  {
    id: "aurora",
    name: "Aurora",
    title: "The Dawn Spirit",
    description:
      "New beginnings, hope, and the first light of creative inspiration.",
    color: "#ff69b4",
    icon: "star",
    followers: 1654,
    works: 112,
  },
  {
    id: "void",
    name: "Void",
    title: "The Potential Keeper",
    description:
      "Pure potential, the space between ideas, where creation begins.",
    color: "#1a1a2e",
    icon: "sparkles",
    followers: 945,
    works: 34,
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  flame: <Icons.Flame />,
  droplets: <Icons.Droplets />,
  wind: <Icons.Wind />,
  mountain: <Icons.Mountain />,
  sun: <Icons.Sun />,
  moon: <Icons.Moon />,
  star: <Icons.Star />,
  sparkles: <Icons.Sparkles />,
};

export default function VibeGodsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(120,166,255,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="mb-12">
          <Link
            href="/records"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
          >
            <Icons.ArrowLeft />
            <span className="text-sm font-sans">Back to Records</span>
          </Link>

          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/12 via-transparent to-fire/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-6">
                <Icons.Crown />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-gold">
                  Vibe Gods
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Your Creative
                <span className="block text-gradient-brand">Archetypes</span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-2xl mb-8">
                The Vibe Gods represent different creative energies and styles.
                Discover which archetypes resonate with your creative spirit.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-cosmic-void font-semibold shadow-glow-gold hover:scale-[1.03] transition-all duration-200">
                  <Icons.Sparkles />
                  Find Your Vibe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Vibe Gods Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIBE_GODS.map((god) => (
            <article
              key={god.id}
              className="group relative glass rounded-2xl overflow-hidden glow-card hover-lift transition-all"
            >
              {/* Gradient top */}
              <div className="h-2" style={{ backgroundColor: god.color }} />

              <div className="p-6">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${god.color}20` }}
                >
                  <span style={{ color: god.color }}>{ICON_MAP[god.icon]}</span>
                </div>

                {/* Name & Title */}
                <h3 className="font-display font-bold text-xl text-text-primary mb-1 group-hover:text-crystal transition-colors">
                  {god.name}
                </h3>
                <p
                  className="text-sm font-mono mb-3"
                  style={{ color: god.color }}
                >
                  {god.title}
                </p>

                {/* Description */}
                <p className="text-sm text-text-secondary font-sans mb-6 leading-relaxed">
                  {god.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Icons.Heart />
                      {god.followers.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icons.Zap />
                      {god.works}
                    </span>
                  </div>

                  <button
                    className="text-sm font-medium transition-colors group-hover:text-crystal"
                    style={{ color: god.color }}
                  >
                    View Profile
                    <Icons.ArrowRight className="inline ml-1" />
                  </button>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 30% 30%, ${god.color}10, transparent 65%)`,
                }}
              />
            </article>
          ))}
        </section>

        {/* Create New Vibe */}
        <section className="mt-12">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-primary/15 flex items-center justify-center">
              <Icons.Crown className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              Create Your Own Vibe
            </h3>
            <p className="text-text-secondary font-sans max-w-md mx-auto mb-6">
              Define your unique creative archetype. Mix elements and traits to
              craft your personal Vibe God.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200">
              <Icons.Sparkles />
              Create Vibe
              <Icons.ArrowRight />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
