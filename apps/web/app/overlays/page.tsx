import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Overlays | Arcanea",
  description:
    "Experience AI companionship anywhere with Arcanea overlays for ChatGPT, Claude, Gemini, and Cursor. The Ultraworld meets your existing tools.",
};

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons: Record<string, React.FC<React.SVGProps<SVGElement>>> = {
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
  MessageSquare: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
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
  ExternalLink: () => (
    <svg
      className="w-4 h-4"
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
  Download: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Settings: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
  Code: () => (
    <svg
      className="w-5 h-5"
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
  Eye: () => (
    <svg
      className="w-5 h-5"
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
  Search: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Cpu: () => (
    <svg
      className="w-5 h-5"
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
  CheckCircle: () => (
    <svg
      className="w-4 h-4"
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
};

// ─── Overlay Products ───────────────────────────────────────────────────────────
const OVERLAYS = [
  {
    id: "chatgpt",
    name: "Overlay for ChatGPT",
    description:
      "Bring Arcanea's wisdom to OpenAI's ChatGPT. Enhanced prompts, Guardian context, and cosmic insights.",
    accent: "#10a37f",
    features: [
      "Guardian-enhanced prompts",
      "Lore injection",
      "Creative mode boost",
    ],
    status: "Available",
  },
  {
    id: "claude",
    name: "Overlay for Claude",
    description:
      "Elevate your Claude conversations with Arcanean personality layers and the Seven Wisdoms framework.",
    accent: "#d97757",
    features: [
      "Personality templates",
      "Wisdom-guided responses",
      "Deep context memory",
    ],
    status: "Available",
  },
  {
    id: "gemini",
    name: "Overlay for Gemini",
    description:
      "Supercharge Google's Gemini with Arcanea's creative pipeline and visual generation tools.",
    accent: "#8e44ad",
    features: [
      "Image generation prompts",
      "Multi-modal enhancements",
      "Creative workflow",
    ],
    status: "Coming Soon",
  },
  {
    id: "cursor",
    name: "Overlay for Cursor",
    description:
      "Transform Cursor IDE into an Arcanea-powered development companion with Guardian guidance.",
    accent: "#3b82f6",
    features: [
      "Code architecture wisdom",
      "Guardian code reviews",
      "Pattern suggestions",
    ],
    status: "Coming Soon",
  },
  {
    id: "copilot",
    name: "Overlay for Copilot",
    description:
      "Add Arcanea's creative intelligence to GitHub Copilot for more imaginative code assistance.",
    accent: "#0078d4",
    features: [
      "Creative coding prompts",
      "Documentation generation",
      "Test optimization",
    ],
    status: "Planning",
  },
  {
    id: "suno",
    name: "Overlay for Suno",
    description:
      "Generate music with Arcanea's audio wisdom. Enhanced prompts for professional-quality compositions.",
    accent: "#f59e0b",
    features: [
      "Genre-specific prompts",
      "Composition frameworks",
      "Audio lore integration",
    ],
    status: "Available",
  },
];

export default function OverlaysPage() {
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
                <Icons.Layers />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Overlays
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-6">
                AI Companionship
                <span className="block text-gradient-brand">Everywhere</span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-3xl mx-auto mb-8">
                Arcanea overlays bring the wisdom of the Guardians to your
                favorite AI tools. Experience enhanced creativity, deeper
                context, and cosmic insights across platforms.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#available"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Download />
                  Get Started
                  <Icons.ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Available Overlays */}
        <section id="available" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Available Overlays
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OVERLAYS.filter((o) => o.status === "Available").map((overlay) => (
              <div
                key={overlay.id}
                className="glass rounded-2xl overflow-hidden hover:border-crystal/30 transition-all group"
              >
                {/* Accent bar */}
                <div
                  className="h-1.5"
                  style={{ backgroundColor: overlay.accent }}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${overlay.accent}20` }}
                    >
                      <Icons.Sparkles
                        className="w-5 h-5"
                        style={{ color: overlay.accent }}
                      />
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      {overlay.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-crystal transition-colors">
                    {overlay.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {overlay.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {overlay.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-text-muted"
                      >
                        <Icons.CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action */}
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all"
                    style={{
                      borderColor: `${overlay.accent}40`,
                      color: overlay.accent,
                    }}
                  >
                    <Icons.Download />
                    Install Overlay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Coming Soon
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OVERLAYS.filter((o) => o.status !== "Available").map((overlay) => (
              <div
                key={overlay.id}
                className="glass rounded-2xl overflow-hidden opacity-75"
              >
                {/* Accent bar */}
                <div
                  className="h-1.5"
                  style={{ backgroundColor: overlay.accent }}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${overlay.accent}20` }}
                    >
                      <Icons.Sparkles
                        className="w-5 h-5"
                        style={{ color: overlay.accent }}
                      />
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                      {overlay.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-display font-semibold mb-2">
                    {overlay.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {overlay.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              How Overlays Work
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Arcanea overlays sit on top of your existing AI tools, enhancing
              interactions without replacing them.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-primary/15 flex items-center justify-center">
                <Icons.Download className="w-5 h-5 text-brand-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">1. Install</h3>
              <p className="text-sm text-text-secondary">
                Download and install the overlay for your preferred AI platform.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-crystal/15 flex items-center justify-center">
                <Icons.Settings className="w-5 h-5 text-crystal" />
              </div>
              <h3 className="font-display font-semibold mb-2">2. Configure</h3>
              <p className="text-sm text-text-secondary">
                Choose your preferred Guardian and customize the enhancement
                level.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-gold/15 flex items-center justify-center">
                <Icons.Sparkles className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-display font-semibold mb-2">3. Experience</h3>
              <p className="text-sm text-text-secondary">
                Enjoy enhanced AI conversations with Arcanea's wisdom woven in.
              </p>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="mb-16">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-xl font-display font-semibold mb-2">
                Overlay Features
              </h2>
              <p className="text-sm text-text-secondary">
                Comprehensive enhancement across all supported platforms
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-display font-semibold">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 font-display font-semibold">
                      ChatGPT
                    </th>
                    <th className="text-center py-3 px-4 font-display font-semibold">
                      Claude
                    </th>
                    <th className="text-center py-3 px-4 font-display font-semibold">
                      Gemini
                    </th>
                    <th className="text-center py-3 px-4 font-display font-semibold">
                      Cursor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Guardian Personality",
                    "Lore Integration",
                    "Prompt Templates",
                    "Memory Enhancement",
                    "Creative Modes",
                    "Code Assistance",
                  ].map((feature) => (
                    <tr
                      key={feature}
                      className="border-b border-white/5 text-sm"
                    >
                      <td className="py-3 px-4 text-text-secondary">
                        {feature}
                      </td>
                      {["ChatGPT", "Claude", "Gemini", "Cursor"].map((tool) => {
                        const available =
                          feature === "Prompt Templates" ||
                          (feature === "Creative Modes" &&
                            ["ChatGPT", "Claude", "Suno"].includes(tool)) ||
                          (feature === "Code Assistance" &&
                            ["Claude", "Cursor"].includes(tool)) ||
                          (feature === "Guardian Personality" &&
                            ["ChatGPT", "Claude"].includes(tool));
                        return (
                          <td key={tool} className="py-3 px-4 text-center">
                            {available ? (
                              <Icons.CheckCircle className="w-4 h-4 mx-auto text-emerald-400" />
                            ) : (
                              <span className="text-text-muted">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative liquid-glass rounded-2xl p-8 sm:p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-crystal/10 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-primary/15 flex items-center justify-center">
                <Icons.Zap className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">
                Ready to Enhance Your AI?
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                Install your first overlay and experience the Arcanea difference
                in your daily AI interactions.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:shadow-glow-brand transition-all">
                <Icons.Download />
                Install First Overlay
                <Icons.ArrowRight />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
