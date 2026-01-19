import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools | Arcanea Hub",
  description: "Available creation tools and integrations in Arcanea. AI chat, image generation, and more.",
};

const TOOLS = [
  {
    id: "chat",
    name: "Luminor Chat",
    description: "Conversational AI with 16 specialized intelligences. Each Luminor brings unique expertise to your creative challenges.",
    status: "available",
    icon: "💬",
    color: "#8B5CF6",
    href: "/chat",
    features: ["16 Luminor personalities", "Domain expertise", "Memory & context"],
  },
  {
    id: "library",
    name: "Wisdom Library",
    description: "17 collections of practical philosophy for creators. Find the right wisdom for any creative situation.",
    status: "available",
    icon: "📚",
    color: "#F59E0B",
    href: "/library",
    features: ["34+ texts", "Situational search", "Daily readings"],
  },
  {
    id: "codex",
    name: "The Codex",
    description: "Diagnostic tool that helps you find the right wisdom. Answer a few questions, get personalized recommendations.",
    status: "available",
    icon: "🔮",
    color: "#EC4899",
    href: "/library/codex",
    features: ["Situation detection", "Wisdom matching", "Personalized guidance"],
  },
  {
    id: "bestiary",
    name: "Creative Bestiary",
    description: "Name your creative blocks and learn how to defeat them. Each creature represents a common obstacle.",
    status: "available",
    icon: "🐉",
    color: "#EF4444",
    href: "/bestiary",
    features: ["Block identification", "Weakness analysis", "Combat strategies"],
  },
  {
    id: "studio",
    name: "Creation Studio",
    description: "Project workspace for manifesting ideas. Templates, AI assistance, and collaborative features.",
    status: "beta",
    icon: "🎨",
    color: "#06B6D4",
    href: "/studio",
    features: ["Project templates", "AI assistance", "Export options"],
  },
  {
    id: "image",
    name: "Vision Generator",
    description: "AI-powered image generation for visualizing your creative concepts. Powered by advanced models.",
    status: "coming",
    icon: "🖼️",
    color: "#10B981",
    href: "/tools/image",
    features: ["Text-to-image", "Style control", "Batch generation"],
  },
  {
    id: "music",
    name: "Frequency Composer",
    description: "Create transformational music aligned with the Ten Gates frequencies. Consciousness-raising soundscapes.",
    status: "coming",
    icon: "🎵",
    color: "#F97316",
    href: "/tools/music",
    features: ["Gate frequencies", "Binaural beats", "Custom tracks"],
  },
  {
    id: "mcp",
    name: "MCP Server",
    description: "Model Context Protocol server for developers. Integrate Arcanea's wisdom into your own applications.",
    status: "coming",
    icon: "⚙️",
    color: "#3B82F6",
    href: "/hub/api",
    features: ["REST API", "WebSocket", "SDK support"],
  },
];

const STATUS_CONFIG = {
  available: { label: "Available", color: "#10B981", bg: "#10B98120" },
  beta: { label: "Beta", color: "#F59E0B", bg: "#F59E0B20" },
  coming: { label: "Coming Soon", color: "#6B7280", bg: "#6B728020" },
};

export default function ToolsPage() {
  const availableTools = TOOLS.filter(t => t.status === "available" || t.status === "beta");
  const comingTools = TOOLS.filter(t => t.status === "coming");

  return (
    <div className="min-h-screen bg-cosmic-deep">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.15),transparent_50%)]" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
              🛠️
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Tools</h1>
              <p className="text-text-secondary">Available creation tools and integrations</p>
            </div>
          </div>
        </div>

        {/* Available Tools */}
        <section className="mb-16">
          <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Available Now
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {availableTools.map((tool) => {
              const statusConfig = STATUS_CONFIG[tool.status as keyof typeof STATUS_CONFIG];

              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group relative p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 overflow-hidden hover:border-white/20 transition-all"
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${tool.color}10, transparent 70%)`
                    }}
                  />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${tool.color}20` }}
                      >
                        {tool.icon}
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: statusConfig.bg,
                          color: statusConfig.color
                        }}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-atlantean-teal-aqua transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 rounded-md text-xs bg-white/5 text-text-muted"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: tool.color }}>
                      <span>Open tool</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            Coming Soon
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {comingTools.map((tool) => (
              <div
                key={tool.id}
                className="p-6 rounded-2xl border border-white/5 bg-cosmic-surface/20 opacity-60"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: `${tool.color}10` }}
                >
                  {tool.icon}
                </div>
                <h3 className="font-display font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-text-muted">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Request Tool */}
        <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-cosmic-surface/30 text-center">
          <h3 className="text-xl font-display font-semibold mb-2">Need something else?</h3>
          <p className="text-text-secondary mb-6">
            We're always building new tools. Let us know what would help your creative process.
          </p>
          <a
            href="https://github.com/frankxai/arcanea/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all"
          >
            Request a Tool
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}
