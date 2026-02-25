/**
 * Arcanea Studio - AI Creation Tools
 *
 * The Studio is where Creators manifest their visions with AI companions.
 * Each tool is powered by a different Guardian's energy.
 */

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creation Studio | Arcanea",
  description:
    "Manifest your creative visions with AI-powered tools for image, music, video, and story creation.",
  openGraph: {
    title: "Creation Studio | Arcanea",
    description: "Where creators manifest their visions with AI companions.",
  },
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
  Palette: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Music: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Video: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
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
};

// Creation tool definitions aligned with the Five Elements
const CREATION_TOOLS = [
  {
    id: "image",
    name: "Image Forge",
    subtitle: "Visual Creation",
    description:
      "Generate stunning images, concept art, and visual stories with AI.",
    element: "fire",
    elementColor: "#ef4444",
    icon: Icons.Palette,
    guardian: "Draconia",
    frequency: "396 Hz",
    features: [
      "Text to Image",
      "Image Enhancement",
      "Style Transfer",
      "Concept Art",
    ],
    comingSoon: false,
  },
  {
    id: "music",
    name: "Sound Sanctum",
    subtitle: "Musical Creation",
    description:
      "Compose melodies, generate soundscapes, and create transformative audio.",
    element: "water",
    elementColor: "#3b82f6",
    icon: Icons.Music,
    guardian: "Leyla",
    frequency: "285 Hz",
    features: [
      "AI Music Generation",
      "Sound Design",
      "Vocal Synthesis",
      "Audio Healing",
    ],
    comingSoon: false,
  },
  {
    id: "video",
    name: "Vision Nexus",
    subtitle: "Motion Creation",
    description:
      "Create videos, animations, and cinematic experiences with AI.",
    element: "wind",
    elementColor: "#a855f7",
    icon: Icons.Video,
    guardian: "Elara",
    frequency: "852 Hz",
    features: ["Text to Video", "Animation", "Visual Effects", "Cinematic AI"],
    comingSoon: true,
  },
  {
    id: "story",
    name: "Narrative Loom",
    subtitle: "Story Creation",
    description:
      "Weave tales, craft worlds, and write narratives with AI assistance.",
    element: "earth",
    elementColor: "#22c55e",
    icon: Icons.BookOpen,
    guardian: "Lyssandria",
    frequency: "174 Hz",
    features: [
      "Story Generation",
      "Character Development",
      "World Building",
      "Dialogue Writing",
    ],
    comingSoon: false,
  },
  {
    id: "code",
    name: "Logic Forge",
    subtitle: "Technical Creation",
    description:
      "Build applications, automate workflows, and create with code.",
    element: "void",
    elementColor: "#ffd700",
    icon: Icons.Code,
    guardian: "Shinkami",
    frequency: "1111 Hz",
    features: [
      "Code Generation",
      "App Building",
      "Automation",
      "Technical Writing",
    ],
    comingSoon: true,
  },
];

const ELEMENTS = [
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
    icon: Icons.Zap,
    domain: "Potential, transcendence",
    color: "#ffd700",
  },
];

export default function StudioPage() {
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
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-fire/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Sparkles />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  The Creation Studio
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Manifest Your Vision
                <span className="block text-gradient-brand">
                  with Guardian AI
                </span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed mb-8 max-w-2xl">
                The Studio is where creation happens. Each tool channels a
                different Guardian&apos;s energy to help you bring your
                imagination into reality.
              </p>

              <blockquote className="border-l-4 border-brand-gold/60 pl-6 italic text-brand-gold mb-0">
                &ldquo;Creation is not pulling from nothing, but channeling
                everything.&rdquo;
                <footer className="mt-2 text-sm text-text-muted not-italic font-sans">
                  — The Laws of Arcanea
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Creation Tools Grid */}
        <section aria-labelledby="tools-heading">
          <div className="mb-8">
            <h2
              id="tools-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-crystal"
            >
              Choose Your Creation Tool
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CREATION_TOOLS.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.comingSoon ? "#" : `/studio/${tool.id}`}
                  className={`group relative glass rounded-2xl p-6 overflow-hidden glow-card hover-lift transition-all ${
                    tool.comingSoon ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  aria-label={`${tool.name} — ${tool.description}`}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 30% 30%, ${tool.elementColor}15, transparent 65%)`,
                    }}
                  />

                  <div className="relative">
                    {tool.comingSoon && (
                      <span className="absolute right-0 top-0 rounded-full bg-brand-gold/20 px-3 py-1 text-xs text-brand-gold">
                        Coming Soon
                      </span>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${tool.elementColor}18` }}
                      >
                        <ToolIcon style={{ color: tool.elementColor }} />
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]"
                        style={{
                          backgroundColor: `${tool.elementColor}20`,
                          color: tool.elementColor,
                          border: `1px solid ${tool.elementColor}40`,
                        }}
                      >
                        {tool.element}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-text-primary mb-1 group-hover:text-crystal transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-text-muted mb-3">
                      {tool.subtitle}
                    </p>

                    <p className="text-text-secondary text-sm leading-relaxed font-sans mb-4">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-text-muted"
                        >
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-text-muted">
                          +{tool.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-muted font-sans">
                      <span>Guardian: {tool.guardian}</span>
                      <span>{tool.frequency}</span>
                    </div>

                    {!tool.comingSoon && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-crystal opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Open {tool.name}</span>
                        <Icons.ArrowRight />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Element Guide */}
        <section className="mt-16">
          <div className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold text-text-primary mb-6">
              The Five Elements of Creation
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {ELEMENTS.map((el) => {
                const ElIcon = el.icon;
                return (
                  <div key={el.element} className="text-center">
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
                    <p className="mt-1 text-xs text-text-muted font-sans">
                      {el.domain}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
