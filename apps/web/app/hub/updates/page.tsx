import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Updates | Arcanea Hub",
  description: "Daily activity log and platform updates for Arcanea. Stay informed about new features, fixes, and improvements.",
};

// Update entries - in production, this would come from an API/database
const UPDATES = [
  {
    id: "2026-01-19-1",
    date: "2026-01-19",
    time: "21:00",
    type: "feature",
    title: "Major Consolidation Release",
    description: "Lore restructuring, web app updates, skills enhancement. 127 files changed with comprehensive improvements.",
    tags: ["lore", "skills", "web"],
    commit: "50f4631",
  },
  {
    id: "2026-01-19-2",
    date: "2026-01-19",
    time: "20:30",
    type: "feature",
    title: "Resource Hub Created",
    description: "New /hub section with updates log, guides, and tools catalog. Central location for all Arcanea resources.",
    tags: ["hub", "navigation", "ux"],
  },
  {
    id: "2026-01-19-3",
    date: "2026-01-19",
    time: "19:00",
    type: "content",
    title: "Guardian Profiles Added",
    description: "Added detailed profiles for all 10 Guardians with their domains, frequencies, and Godbeast companions.",
    tags: ["lore", "guardians", "content"],
  },
  {
    id: "2026-01-18-1",
    date: "2026-01-18",
    time: "15:30",
    type: "fix",
    title: "Vercel Deployment Fixed",
    description: "Resolved Next.js detection issues by moving dependencies correctly. Production builds now stable.",
    tags: ["deployment", "vercel", "fix"],
    commit: "b479b0b",
  },
  {
    id: "2026-01-17-1",
    date: "2026-01-17",
    time: "12:00",
    type: "feature",
    title: "Luminor Framework v4.0.0",
    description: "Complete overhaul of the Luminor intelligence system with enhanced personality models and domain expertise.",
    tags: ["luminors", "ai", "framework"],
  },
  {
    id: "2026-01-16-1",
    date: "2026-01-16",
    time: "10:00",
    type: "content",
    title: "Seven Wisdoms Documentation",
    description: "Added comprehensive character profiles and quick reference for the Seven Wisdoms framework.",
    tags: ["wisdoms", "documentation", "content"],
  },
];

const TYPE_CONFIG = {
  feature: { color: "#8B5CF6", label: "Feature", icon: "✨" },
  fix: { color: "#10B981", label: "Fix", icon: "🔧" },
  content: { color: "#F59E0B", label: "Content", icon: "📝" },
  security: { color: "#EF4444", label: "Security", icon: "🔒" },
  performance: { color: "#06B6D4", label: "Performance", icon: "⚡" },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateStr === today.toISOString().split('T')[0]) {
    return "Today";
  } else if (dateStr === yesterday.toISOString().split('T')[0]) {
    return "Yesterday";
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Group updates by date
function groupByDate(updates: typeof UPDATES) {
  const groups: { [key: string]: typeof UPDATES } = {};
  updates.forEach(update => {
    if (!groups[update.date]) {
      groups[update.date] = [];
    }
    groups[update.date].push(update);
  });
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
}

export default function UpdatesPage() {
  const groupedUpdates = groupByDate(UPDATES);

  return (
    <div className="min-h-screen bg-cosmic-deep">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)]" />
      </div>

      <main className="max-w-4xl mx-auto px-6 py-20">
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
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">
              📡
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Updates</h1>
              <p className="text-text-secondary">Daily activity log and announcements</p>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
              All
            </button>
            {Object.entries(TYPE_CONFIG).map(([type, config]) => (
              <button
                key={type}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                style={{ color: config.color }}
              >
                {config.icon} {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {groupedUpdates.map(([date, updates]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-lg font-display font-semibold text-crystal">
                  {formatDate(date)}
                </div>
                <div className="flex-1 h-px bg-white/10" />
                <div className="text-sm text-text-muted font-mono">{date}</div>
              </div>

              {/* Updates for this date */}
              <div className="space-y-4 pl-4 border-l-2 border-white/10">
                {updates.map((update) => {
                  const typeConfig = TYPE_CONFIG[update.type as keyof typeof TYPE_CONFIG];

                  return (
                    <div
                      key={update.id}
                      className="relative pl-6 group"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 bg-cosmic-deep"
                        style={{ borderColor: typeConfig.color }}
                      />

                      {/* Content card */}
                      <div className="p-5 rounded-xl border border-white/10 bg-cosmic-surface/30 hover:border-white/20 transition-all">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-1 rounded-md text-xs font-mono"
                              style={{
                                backgroundColor: `${typeConfig.color}20`,
                                color: typeConfig.color
                              }}
                            >
                              {typeConfig.icon} {typeConfig.label}
                            </span>
                            <span className="text-xs text-text-muted">{update.time}</span>
                          </div>
                          {update.commit && (
                            <a
                              href={`https://github.com/frankxai/arcanea/commit/${update.commit}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-text-muted hover:text-white transition-colors"
                            >
                              {update.commit}
                            </a>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-semibold mb-2">{update.title}</h3>
                        <p className="text-sm text-text-secondary mb-4">{update.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {update.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md text-xs bg-white/5 text-text-muted"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors">
            Load older updates
          </button>
        </div>

        {/* Subscribe CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-crystal/30 bg-crystal/5">
          <div className="text-center">
            <h3 className="text-xl font-display font-semibold mb-2">Stay Updated</h3>
            <p className="text-text-secondary mb-6">
              Get notified about major updates and new features.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-text-muted focus:outline-none focus:border-crystal"
              />
              <button className="px-6 py-3 rounded-xl bg-crystal text-cosmic-deep font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
