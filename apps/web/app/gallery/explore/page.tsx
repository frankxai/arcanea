import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore Gallery | Arcanea",
  description:
    "Browse and discover all visual creations in Arcanea. Filter by category, style, or creator.",
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
  Image: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
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
  Sliders: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  X: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ─── Sample Gallery Data ───────────────────────────────────────────────────────
const ALL_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  title: `Creation ${i + 1}`,
  creator: `Creator ${(i % 5) + 1}`,
  category: ["Cosmic", "Guardian", "Godbeast", "Elements", "Academy", "Void"][
    i % 6
  ],
  views: Math.floor(Math.random() * 2000) + 100,
  likes: Math.floor(Math.random() * 150) + 10,
  accent: ["#8b5cf6", "#ffd700", "#4a7c59", "#ff6b35", "#7fffd4", "#9966ff"][
    i % 6
  ],
}));

const CATEGORIES = [
  "All",
  "Cosmic",
  "Guardian",
  "Godbeast",
  "Elements",
  "Academy",
  "Void",
];
const SORT_OPTIONS = ["Trending", "Recent", "Most Viewed", "Most Liked"];

export default function GalleryExplorePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
          >
            <Icons.ArrowLeft />
            <span className="text-sm font-sans">Back to Gallery</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-fluid-2xl font-display font-bold text-text-primary">
                Explore Gallery
              </h1>
              <p className="text-text-secondary font-sans">
                Discover {ALL_ITEMS.length} creations from the community
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <div className="glass-subtle rounded-lg p-0.5 flex">
                <button
                  className="p-2 rounded-md glass text-text-primary"
                  aria-label="Grid view"
                >
                  <Icons.Grid />
                </button>
                <button
                  className="p-2 rounded-md text-text-muted hover:text-text-secondary transition-colors"
                  aria-label="List view"
                >
                  <Icons.List />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search creations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50 transition-all text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-text-secondary hover:border-crystal/30 transition-all text-sm">
              <Icons.Filter />
              <span>Category</span>
              <Icons.ChevronDown />
            </button>
          </div>

          {/* Sort */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-text-secondary hover:border-crystal/30 transition-all text-sm">
              <Icons.Sliders />
              <span>Sort</span>
              <Icons.ChevronDown />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full border text-sm font-sans transition-all ${
                index === 0
                  ? "glass border-brand-primary/30 bg-brand-primary/10 text-brand-primary"
                  : "glass border-white/10 text-text-secondary hover:border-crystal/30 hover:text-crystal"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ALL_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group relative glass rounded-xl overflow-hidden glow-card hover-lift transition-all"
            >
              {/* Image */}
              <div
                className="aspect-square relative overflow-hidden"
                style={{ backgroundColor: `${item.accent}15` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.accent}20` }}
                  >
                    <Icons.Image style={{ color: item.accent }} />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cosmic-void/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="font-display font-medium text-sm text-text-primary truncate group-hover:text-crystal transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
                  <span>{item.creator}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Icons.Eye />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Heart />
                      {item.likes}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-xl glass border border-white/10 text-text-secondary font-semibold hover:border-crystal/30 hover:text-crystal transition-all">
            Load More Creations
          </button>
        </div>
      </main>
    </div>
  );
}
