import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Arcanea",
  description:
    "Explore the visual wonders of Arcanea. Browse AI-generated artwork, cosmic landscapes, and creations from the community.",
  openGraph: {
    title: "Gallery | Arcanea",
    description: "Visual wonders from the Arcanea universe",
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
  ExternalLink: () => (
    <svg
      className="w-3.5 h-3.5"
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
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

// ─── Sample Gallery Data ───────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  {
    id: "1",
    title: "The Cosmic Dawn",
    creator: "Archive Walker",
    category: "Cosmic",
    image: "/gallery/cosmic-dawn.jpg",
    views: 1247,
    likes: 89,
    accent: "#8b5cf6",
  },
  {
    id: "2",
    title: "Lumina's Radiance",
    creator: "Starforged",
    category: "Guardian",
    image: "/gallery/luminas-radiance.jpg",
    views: 982,
    likes: 67,
    accent: "#ffd700",
  },
  {
    id: "3",
    title: "The Void Beckons",
    creator: "Shadow Weaver",
    category: "Void",
    image: "/gallery/void-beckons.jpg",
    views: 756,
    likes: 45,
    accent: "#9966ff",
  },
  {
    id: "4",
    title: "Elemental Convergence",
    creator: "Storm Caller",
    category: "Elements",
    image: "/gallery/elemental-convergence.jpg",
    views: 1103,
    likes: 78,
    accent: "#ff6b35",
  },
  {
    id: "5",
    title: "Godbeast Kaelith",
    creator: "Beast Master",
    category: "Godbeast",
    image: "/gallery/kaelith.jpg",
    views: 2034,
    likes: 156,
    accent: "#4a7c59",
  },
  {
    id: "6",
    title: "The Ten Gates",
    creator: "Pathfinder",
    category: "Academy",
    image: "/gallery/ten-gates.jpg",
    views: 1876,
    likes: 134,
    accent: "#7fffd4",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Creations", count: 156 },
  { id: "cosmic", label: "Cosmic", count: 34 },
  { id: "guardian", label: "Guardians", count: 28 },
  { id: "godbeast", label: "Godbeasts", count: 22 },
  { id: "elements", label: "Elements", count: 31 },
  { id: "academy", label: "Academy", count: 24 },
  { id: "void", label: "Void", count: 17 },
];

export default function GalleryPage() {
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
        <section className="mb-12">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Sparkles />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Gallery
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Visual Wonders
                <span className="block text-gradient-brand">of Arcanea</span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-2xl mb-8">
                Explore AI-generated artwork, cosmic landscapes, and creations
                from the community. Every image tells a story from the Arcanea
                universe.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/gallery/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.Grid />
                  Explore Gallery
                  <Icons.ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                  category.id === "all"
                    ? "glass border-brand-primary/30 bg-brand-primary/10 text-brand-primary"
                    : "glass border-white/10 text-text-secondary hover:border-crystal/30 hover:text-crystal"
                }`}
              >
                <span className="text-sm font-sans">{category.label}</span>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                    category.id === "all" ? "bg-brand-primary/20" : "bg-white/5"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Search Bar */}
        <section className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search creations..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50 focus:ring-1 focus:ring-crystal/20 transition-all"
            />
          </div>
        </section>

        {/* Gallery Grid */}
        <section aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="sr-only">
            Gallery Creations
          </h2>

          {GALLERY_ITEMS.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="group relative glass rounded-2xl overflow-hidden glow-card hover-lift transition-all"
                >
                  {/* Image placeholder */}
                  <div
                    className="aspect-[4/3] relative overflow-hidden"
                    style={{ backgroundColor: `${item.accent}15` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.accent}20` }}
                      >
                        <Icons.Image style={{ color: item.accent }} />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-mono px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${item.accent}20`,
                          color: item.accent,
                          borderColor: `${item.accent}40`,
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <Link
                          href={`/gallery/${item.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                          View
                          <Icons.ExternalLink />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-text-primary mb-1 group-hover:text-crystal transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted font-sans mb-4">
                      by {item.creator}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <Icons.Eye />
                        {item.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icons.Heart />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                <Icons.Image className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                No creations yet
              </h3>
              <p className="text-text-secondary font-sans max-w-md mx-auto mb-6">
                Be the first to share your visual creations with the Arcanea
                community.
              </p>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-crystal/20 text-crystal font-semibold hover:bg-crystal/5 transition-all"
              >
                Start Creating
                <Icons.ArrowRight />
              </Link>
            </div>
          )}
        </section>

        {/* Feature Cards */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-fire/15 flex items-center justify-center">
              <Icons.Flame className="w-5 h-5 text-fire" />
            </div>
            <h3 className="font-display font-semibold mb-2">
              Share Your Vision
            </h3>
            <p className="text-sm text-text-secondary font-sans">
              Upload your AI-generated artwork and share it with the community
            </p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-water/15 flex items-center justify-center">
              <Icons.Droplets className="w-5 h-5 text-water" />
            </div>
            <h3 className="font-display font-semibold mb-2">Get Inspired</h3>
            <p className="text-sm text-text-secondary font-sans">
              Browse thousands of creations from talented creators worldwide
            </p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-gold/15 flex items-center justify-center">
              <Icons.Star className="w-5 h-5 text-brand-gold" />
            </div>
            <h3 className="font-display font-semibold mb-2">
              Earn Recognition
            </h3>
            <p className="text-sm text-text-secondary font-sans">
              Your work can be featured in the community spotlight
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
