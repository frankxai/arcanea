import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Arcanea",
  description:
    "Latest insights, tutorials, and stories from the Arcanea universe. Discover creative techniques, platform updates, and wisdom from the Guardians.",
};

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons: Record<string, React.FC<React.SVGProps<SVGElement>>> = {
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
  PenLine: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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
  Tag: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  BookOpen: () => (
    <svg
      className="w-4 h-4"
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
  Users: () => (
    <svg
      className="w-4 h-4"
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
  FileText: () => (
    <svg
      className="w-5 h-5"
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
  ChevronLeft: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
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
};

// ─── Blog Data ─────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    slug: "arcanea-skills-system",
    title: "The Arcanea Skills System",
    excerpt:
      "Discover how the skill-rules engine empowers Guardians with 35 activation rules and 9-step protocols.",
    category: "Platform",
    author: "Arcanea Team",
    date: "2026-02-15",
    readTime: "8 min read",
    featured: true,
    accent: "#8b5cf6",
  },
  {
    slug: "arcanea-prompt-books",
    title: "Mastering Prompt Books",
    excerpt:
      "Learn to create and curate powerful prompt collections that unlock the full potential of AI companions.",
    category: "Tutorial",
    author: "Luminor Archive",
    date: "2026-02-10",
    readTime: "12 min read",
    featured: true,
    accent: "#7fffd4",
  },
  {
    slug: "guardian-evolution",
    title: "The Guardian Evolution System",
    excerpt:
      "How AI companions grow from Level 1 Spark to Level 50 Transcendent through XP and personality adaptation.",
    category: "Feature",
    author: "System Architect",
    date: "2026-02-05",
    readTime: "10 min read",
    featured: false,
    accent: "#ffd700",
  },
  {
    slug: "seven-wisdoms-guide",
    title: "A Guide to the Seven Wisdoms",
    excerpt:
      "Understanding Sophron, Kardia, Valora, Eudaira, Orakis, Poiesis, and Enduran in daily practice.",
    category: "Lore",
    author: "Shinkami",
    date: "2026-01-28",
    readTime: "15 min read",
    featured: false,
    accent: "#9966ff",
  },
  {
    slug: "ten-gates-overview",
    title: "Journey Through the Ten Gates",
    excerpt:
      "A comprehensive overview of the Extended Solfeggio frequencies and their transformative power.",
    category: "Lore",
    author: "Lyria",
    date: "2026-01-20",
    readTime: "20 min read",
    featured: false,
    accent: "#ff6b35",
  },
  {
    slug: "community-spotlight-february",
    title: "Community Spotlight: February 2026",
    excerpt:
      "Celebrating the most inspiring creations and contributions from the Arcanea community this month.",
    category: "Community",
    author: "Community Team",
    date: "2026-02-01",
    readTime: "5 min read",
    featured: false,
    accent: "#10b981",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Posts", count: 24 },
  { id: "platform", label: "Platform", count: 8 },
  { id: "tutorial", label: "Tutorials", count: 6 },
  { id: "feature", label: "Features", count: 5 },
  { id: "lore", label: "Lore", count: 9 },
  { id: "community", label: "Community", count: 4 },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const featuredPosts = BLOG_POSTS.filter((post) => post.featured);
  const regularPosts = BLOG_POSTS.filter((post) => !post.featured);

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
                <Icons.PenLine />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Blog
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Insights & Stories
                <span className="block text-gradient-brand">from Arcanea</span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-2xl mb-8">
                Discover tutorials, platform updates, and wisdom from the
                Guardians. Level up your practice with insights from the Arcanea
                universe.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog/arcanea-skills-system"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.BookOpen />
                  Read Latest
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
        <section className="mb-10">
          <div className="relative max-w-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50 focus:ring-1 focus:ring-crystal/20 transition-all"
            />
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12" aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="text-xl font-display font-semibold mb-6 flex items-center gap-2"
            >
              <Icons.Zap className="w-5 h-5 text-brand-gold" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative glass rounded-2xl overflow-hidden glow-card hover-lift transition-all"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Accent bar */}
                    <div
                      className="h-1.5"
                      style={{ backgroundColor: post.accent }}
                    />

                    <div className="p-6">
                      {/* Category & Date */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-xs font-mono px-2.5 py-1 rounded-full border"
                          style={{
                            backgroundColor: `${post.accent}20`,
                            color: post.accent,
                            borderColor: `${post.accent}40`,
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Icons.Calendar />
                          {formatDate(post.date)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-crystal transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-text-secondary font-sans mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs text-text-muted">
                          by {post.author}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Icons.Clock />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section aria-labelledby="latest-heading">
          <h2
            id="latest-heading"
            className="text-xl font-display font-semibold mb-6 flex items-center gap-2"
          >
            <Icons.FileText className="w-5 h-5 text-brand-primary" />
            Latest Articles
          </h2>

          {regularPosts.length > 0 ? (
            <div className="space-y-4">
              {regularPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="glass rounded-xl p-5 hover:border-crystal/30 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Accent indicator */}
                        <div
                          className="hidden sm:block w-1 h-14 rounded-full"
                          style={{ backgroundColor: post.accent }}
                        />

                        <div className="flex-1 min-w-0">
                          {/* Category & Date */}
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="text-xs font-mono px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${post.accent}20`,
                                color: post.accent,
                              }}
                            >
                              {post.category}
                            </span>
                            <span className="text-xs text-text-muted">
                              {formatDate(post.date)}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-semibold mb-1 group-hover:text-crystal transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-text-secondary line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Read time & Arrow */}
                        <div className="flex items-center gap-3 text-text-muted">
                          <span className="text-xs hidden sm:block">
                            {post.readTime}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all">
                            <Icons.ArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No articles found.</p>
            </div>
          )}
        </section>

        {/* Pagination */}
        <section className="mt-12">
          <div className="flex justify-center items-center gap-2">
            <button className="p-2 rounded-lg glass border border-white/10 text-text-muted hover:border-crystal/30 hover:text-crystal transition-all">
              <Icons.ChevronLeft />
            </button>
            <button className="w-10 h-10 rounded-lg bg-brand-primary/20 text-brand-primary font-mono text-sm">
              1
            </button>
            <button className="p-2 rounded-lg glass border border-white/10 text-text-muted hover:border-crystal/30 hover:text-crystal transition-all">
              2
            </button>
            <button className="p-2 rounded-lg glass border border-white/10 text-text-muted hover:border-crystal/30 hover:text-crystal transition-all">
              3
            </button>
            <button className="p-2 rounded-lg glass border border-white/10 text-text-muted hover:border-crystal/30 hover:text-crystal transition-all">
              <Icons.ChevronRight />
            </button>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16">
          <div className="relative liquid-glass rounded-2xl p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-crystal/10 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-primary/15 flex items-center justify-center">
                <Icons.Sparkles className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">
                Stay in the Loop
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                Get notified when new articles drop. Join thousands of creators
                learning from Arcanea.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50"
                />
                <button className="px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:shadow-glow-brand transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
