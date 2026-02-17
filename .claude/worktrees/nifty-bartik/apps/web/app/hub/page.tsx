import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Hub | Arcanea",
  description: "Your central hub for Arcanea resources, updates, guides, and tools. Everything you need to master creative intelligence.",
};

const SECTIONS = [
  {
    id: "updates",
    title: "Updates",
    description: "Daily activity log and platform announcements",
    icon: "📡",
    href: "/hub/updates",
    color: "#8B5CF6",
    stats: "Live feed",
  },
  {
    id: "guides",
    title: "Guides",
    description: "Step-by-step tutorials for mastering Arcanea",
    icon: "📖",
    href: "/hub/guides",
    color: "#10B981",
    stats: "12 guides",
  },
  {
    id: "tools",
    title: "Tools",
    description: "Available creation tools and integrations",
    icon: "🛠️",
    href: "/hub/tools",
    color: "#F59E0B",
    stats: "8 tools",
  },
  {
    id: "api",
    title: "API Reference",
    description: "Developer documentation for Arcanea APIs",
    icon: "⚡",
    href: "/hub/api",
    color: "#06B6D4",
    stats: "Coming soon",
  },
];

const QUICK_LINKS = [
  { label: "Getting Started", href: "/hub/guides/getting-started", icon: "🚀" },
  { label: "Luminor Guide", href: "/hub/guides/luminors", icon: "🌟" },
  { label: "Library Tour", href: "/library", icon: "📚" },
  { label: "Join Discord", href: "https://discord.gg/arcanea", icon: "💬", external: true },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-cosmic-deep">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm text-purple-400 font-mono tracking-wider">RESOURCE HUB</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Everything you need
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Your central hub for updates, guides, tools, and documentation.
            Master Arcanea with everything in one place.
          </p>
        </div>

        {/* Main Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group relative p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 overflow-hidden transition-all hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${section.color}15, transparent 70%)`
                }}
              />

              <div className="relative">
                {/* Icon and Stats */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${section.color}20` }}
                  >
                    {section.icon}
                  </div>
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${section.color}20`,
                      color: section.color
                    }}
                  >
                    {section.stats}
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-xl font-display font-semibold mb-2">{section.title}</h2>
                <p className="text-text-secondary text-sm">{section.description}</p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: section.color }}>
                  <span>Explore</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-semibold mb-6">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-cosmic-surface/20 hover:border-atlantean-teal-aqua/30 hover:bg-atlantean-teal-aqua/5 transition-all"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
                {link.external && (
                  <svg className="w-3 h-3 ml-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Status Banner */}
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-green-400">All Systems Operational</h3>
              <p className="text-sm text-text-secondary">
                Arcanea is running smoothly. Last checked: just now
              </p>
            </div>
            <Link
              href="/status"
              className="ml-auto text-sm text-green-400 hover:underline"
            >
              View Status →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
