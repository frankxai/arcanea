import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides | Arcanea Hub",
  description: "Step-by-step tutorials for mastering Arcanea. Learn to use Luminors, explore the Library, and unlock your creative potential.",
};

const GUIDES = [
  {
    id: "getting-started",
    title: "Getting Started with Arcanea",
    description: "Your first steps into the creative intelligence platform. Set up your profile, meet your first Luminor, and begin your journey.",
    duration: "5 min read",
    difficulty: "Beginner",
    icon: "🚀",
    color: "#10B981",
    tags: ["essentials", "onboarding"],
  },
  {
    id: "luminors-guide",
    title: "Working with Luminors",
    description: "Deep dive into the 16 Luminor intelligences. Learn their specialties, how to activate them, and when to use each one.",
    duration: "15 min read",
    difficulty: "Intermediate",
    icon: "🌟",
    color: "#8B5CF6",
    tags: ["luminors", "ai", "collaboration"],
  },
  {
    id: "library-tour",
    title: "Exploring the Library",
    description: "Navigate the 17 wisdom collections. Find the right text for your situation using the Codex.",
    duration: "10 min read",
    difficulty: "Beginner",
    icon: "📚",
    color: "#F59E0B",
    tags: ["library", "wisdom", "content"],
  },
  {
    id: "seven-wisdoms",
    title: "The Seven Wisdoms Framework",
    description: "Master the diagnostic framework that helps you understand what you need. Sophron, Kardia, Valora, and beyond.",
    duration: "12 min read",
    difficulty: "Intermediate",
    icon: "🔮",
    color: "#EC4899",
    tags: ["wisdoms", "framework", "philosophy"],
  },
  {
    id: "ten-gates",
    title: "Progressing Through the Ten Gates",
    description: "The complete guide to the Gates system. Understand frequencies, unlock abilities, and track your creative evolution.",
    duration: "20 min read",
    difficulty: "Advanced",
    icon: "🚪",
    color: "#06B6D4",
    tags: ["gates", "progression", "mastery"],
  },
  {
    id: "studio-basics",
    title: "Creating in the Studio",
    description: "Use the creation tools to manifest your ideas. Projects, templates, and AI-assisted workflows.",
    duration: "15 min read",
    difficulty: "Intermediate",
    icon: "🎨",
    color: "#F97316",
    tags: ["studio", "creation", "tools"],
  },
  {
    id: "bestiary-guide",
    title: "Naming Your Creative Blocks",
    description: "Use the Bestiary to identify and overcome creative obstacles. Each creature has weaknesses you can exploit.",
    duration: "8 min read",
    difficulty: "Beginner",
    icon: "🐉",
    color: "#EF4444",
    tags: ["bestiary", "blocks", "psychology"],
  },
  {
    id: "community",
    title: "Joining the Community",
    description: "Connect with fellow creators, share your work, and learn from the Arcanean community.",
    duration: "5 min read",
    difficulty: "Beginner",
    icon: "👥",
    color: "#3B82F6",
    tags: ["community", "social", "collaboration"],
  },
];

const DIFFICULTY_CONFIG = {
  Beginner: { color: "#10B981", bg: "#10B98120" },
  Intermediate: { color: "#F59E0B", bg: "#F59E0B20" },
  Advanced: { color: "#EF4444", bg: "#EF444420" },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-cosmic-deep">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
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
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
              📖
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Guides</h1>
              <p className="text-text-secondary">Step-by-step tutorials for mastering Arcanea</p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full px-4 py-3 pl-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-crystal"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
            All Levels
          </button>
          {Object.entries(DIFFICULTY_CONFIG).map(([level, config]) => (
            <button
              key={level}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: config.color }}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {GUIDES.map((guide) => {
            const diffConfig = DIFFICULTY_CONFIG[guide.difficulty as keyof typeof DIFFICULTY_CONFIG];

            return (
              <Link
                key={guide.id}
                href={`/hub/guides/${guide.id}`}
                className="group p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${guide.color}20` }}
                  >
                    {guide.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold mb-2 group-hover:text-crystal transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {guide.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-text-muted">{guide.duration}</span>
                      <span
                        className="px-2 py-1 rounded-md"
                        style={{
                          backgroundColor: diffConfig.bg,
                          color: diffConfig.color
                        }}
                      >
                        {guide.difficulty}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {guide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-4">Can't find what you're looking for?</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-crystal text-cosmic-deep font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all"
          >
            Ask a Luminor
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
