import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Records | Arcanea",
  description:
    "Browse your creative records. Track your journey through the Gates, view your collections, and manage your artistic portfolio.",
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
  Folder: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
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
  Clock: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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
  Grid: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  List: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Search: () => (
    <svg
      className="w-4 h-4"
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
  Filter: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
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
  Award: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
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
};

// ─── Sample Record Data ─────────────────────────────────────────────────────────
const RECENT_RECORDS = [
  {
    id: "1",
    title: "The Last Gate",
    type: "Story",
    created: "2 hours ago",
    likes: 24,
    featured: true,
    accent: "#8b5cf6",
  },
  {
    id: "2",
    title: "Character: Zara Emberstorm",
    type: "Character",
    created: "Yesterday",
    likes: 18,
    featured: false,
    accent: "#ff6b35",
  },
  {
    id: "3",
    title: "Poem of the Void",
    type: "Poetry",
    created: "2 days ago",
    likes: 42,
    featured: true,
    accent: "#9966ff",
  },
  {
    id: "4",
    title: "World: Arcanea's Origins",
    type: "World Building",
    created: "3 days ago",
    likes: 31,
    featured: false,
    accent: "#7fffd4",
  },
];

const STATS = [
  { label: "Total Works", value: "156", icon: "folder" },
  { label: "Stories", value: "48", icon: "file" },
  { label: "Characters", value: "32", icon: "star" },
  { label: "This Month", value: "12", icon: "trending" },
];

export default function RecordsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="mb-12">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Layers />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Records
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Your Creative
                <span className="block text-gradient-brand">Records</span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-2xl mb-8">
                Browse and manage all your creative works. Stories, characters,
                world-building, and more. Every creation is a record of your
                journey.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-display font-bold text-text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted font-sans">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-8 grid sm:grid-cols-3 gap-4">
          <Link
            href="/records/vibe-gods"
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-crystal/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold">
              <Icons.Flame />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold group-hover:text-crystal transition-colors">
                Vibe Gods
              </h3>
              <p className="text-sm text-text-muted">
                Your creative archetypes
              </p>
            </div>
            <Icons.ArrowRight className="text-text-muted group-hover:text-crystal transition-colors" />
          </Link>

          <Link
            href="/prompt-books"
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-crystal/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary">
              <Icons.FileText />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold group-hover:text-crystal transition-colors">
                Prompt Books
              </h3>
              <p className="text-sm text-text-muted">Your prompt collections</p>
            </div>
            <Icons.ArrowRight className="text-text-muted group-hover:text-crystal transition-colors" />
          </Link>

          <Link
            href="/character-book"
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-crystal/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-crystal/15 flex items-center justify-center text-crystal">
              <Icons.Star />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold group-hover:text-crystal transition-colors">
                Character Book
              </h3>
              <p className="text-sm text-text-muted">Your character roster</p>
            </div>
            <Icons.ArrowRight className="text-text-muted group-hover:text-crystal transition-colors" />
          </Link>
        </section>

        {/* Toolbar */}
        <section className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg text-sm font-sans bg-brand-primary/10 text-brand-primary border border-brand-primary/30">
              All
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-sans glass text-text-secondary hover:text-text-primary transition-colors">
              Stories
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-sans glass text-text-secondary hover:text-text-primary transition-colors">
              Characters
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-sans glass text-text-secondary hover:text-text-primary transition-colors">
              Poetry
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search records..."
                className="pl-10 pr-4 py-2 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50 transition-all text-sm w-48"
              />
            </div>
            <button className="p-2 rounded-lg glass text-text-muted hover:text-text-primary transition-colors">
              <Icons.Filter />
            </button>
            <div className="glass-subtle rounded-lg p-0.5 flex">
              <button
                className="p-2 rounded-md glass text-text-primary"
                aria-label="Grid"
              >
                <Icons.Grid />
              </button>
              <button
                className="p-2 rounded-md text-text-muted hover:text-text-secondary"
                aria-label="List"
              >
                <Icons.List />
              </button>
            </div>
          </div>
        </section>

        {/* Records Grid */}
        {RECENT_RECORDS.length > 0 ? (
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENT_RECORDS.map((record) => (
              <article
                key={record.id}
                className="group relative glass rounded-xl overflow-hidden hover:border-crystal/30 transition-all"
              >
                <div className="flex items-start gap-4 p-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${record.accent}20` }}
                  >
                    <Icons.FileText style={{ color: record.accent }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-semibold text-text-primary truncate group-hover:text-crystal transition-colors">
                          {record.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: `${record.accent}15`,
                              color: record.accent,
                              borderColor: `${record.accent}30`,
                            }}
                          >
                            {record.type}
                          </span>
                          {record.featured && (
                            <Icons.Star className="w-3 h-3 text-brand-gold" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Icons.Clock />
                        {record.created}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icons.Heart />
                        {record.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Empty State */
          <section className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
              <Icons.Folder className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              No records yet
            </h3>
            <p className="text-text-secondary font-sans max-w-md mx-auto mb-6">
              Start creating to build your collection of works.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-crystal/20 text-crystal font-semibold hover:bg-crystal/5 transition-all"
            >
              Start Creating
              <Icons.ArrowRight />
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
