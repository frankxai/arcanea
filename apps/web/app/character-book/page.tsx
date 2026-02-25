import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Character Book | Arcanea",
  description:
    "Create and manage your character profiles. Build detailed personas for your stories, games, and creative projects.",
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
  Plus: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
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
  User: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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
  Crown: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l3-10 6 3 6-3 3 10H3z" />
      <path d="M6 21h12" />
    </svg>
  ),
  Shield: () => (
    <svg
      className="w-4 h-4"
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
  MoreVertical: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
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
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  Mountain: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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
};

// ─── Sample Character Data ───────────────────────────────────────────────────────
const CHARACTERS = [
  {
    id: "1",
    name: "Lysara Nightwhisper",
    role: "Protagonist",
    archetype: "The Hero",
    element: "Water",
    description:
      "A young mage discovering her powers in the wake of an ancient prophecy.",
    storyCount: 12,
    accent: "#78a6ff",
  },
  {
    id: "2",
    name: "Thorn Ironroot",
    role: "Ally",
    archetype: "The Mentor",
    element: "Earth",
    description: "A wise elder who guides protagonists through their journey.",
    storyCount: 8,
    accent: "#4a7c59",
  },
  {
    id: "3",
    name: "Zara Emberstorm",
    role: "Antagonist",
    archetype: "The Shadow",
    element: "Fire",
    description: "A complex villain whose motives stem from past trauma.",
    storyCount: 5,
    accent: "#ff6b35",
  },
  {
    id: "4",
    name: "Kael Windrunner",
    role: "Supporting",
    archetype: "The Trickster",
    element: "Wind",
    description: "A mysterious wanderer with secrets yet to be revealed.",
    storyCount: 7,
    accent: "#7fffd4",
  },
];

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  Fire: <Icons.Flame />,
  Water: <Icons.Droplets />,
  Earth: <Icons.Mountain />,
  Wind: <Icons.Wind />,
};

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#ff6b35",
  Water: "#78a6ff",
  Earth: "#4a7c59",
  Wind: "#7fffd4",
};

export default function CharacterBookPage() {
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
                <Icons.BookOpen />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Character Book
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                Your Characters
                <span className="block text-gradient-brand">
                  Bring Stories to Life
                </span>
              </h1>

              <p className="text-text-secondary font-body text-lg max-w-2xl mb-8">
                Create detailed character profiles for your stories, games, and
                creative projects. Build rich personas with backgrounds,
                motivations, and arcs.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200">
                  <Icons.Plus />
                  Create Character
                </button>
                <Link
                  href="/character-book/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all"
                >
                  <Icons.Sparkles />
                  Use Template
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search characters..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">
              {CHARACTERS.length} characters
            </span>
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
        </section>

        {/* Character Grid */}
        {CHARACTERS.length > 0 ? (
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARACTERS.map((character) => (
              <article
                key={character.id}
                className="group relative glass rounded-2xl overflow-hidden glow-card hover-lift transition-all"
              >
                {/* Header with accent */}
                <div
                  className="h-2"
                  style={{ backgroundColor: character.accent }}
                />

                <div className="p-6">
                  {/* Avatar placeholder */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${character.accent}20` }}
                    >
                      <Icons.User style={{ color: character.accent }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-text-primary truncate group-hover:text-crystal transition-colors">
                        {character.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: `${character.accent}15`,
                            color: character.accent,
                            borderColor: `${character.accent}30`,
                          }}
                        >
                          {character.role}
                        </span>
                        <span className="text-xs text-text-muted">
                          {character.archetype}
                        </span>
                      </div>
                    </div>

                    <button className="text-text-muted hover:text-text-primary transition-colors">
                      <Icons.MoreVertical />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary font-sans mb-4 line-clamp-2">
                    {character.description}
                  </p>

                  {/* Element & Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${ELEMENT_COLORS[character.element]}15`,
                        }}
                      >
                        <span
                          style={{ color: ELEMENT_COLORS[character.element] }}
                        >
                          {ELEMENT_ICONS[character.element]}
                        </span>
                      </div>
                      <span className="text-xs text-text-muted">
                        {character.element}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Icons.BookOpen />
                        {character.storyCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icons.Heart />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute bottom-6 left-6 right-6 flex gap-2">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors">
                      <Icons.Eye />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Empty State */
          <section className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
              <Icons.User className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              No characters yet
            </h3>
            <p className="text-text-secondary font-sans max-w-md mx-auto mb-6">
              Start building your character roster. Create detailed personas for
              your stories and games.
            </p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-crystal/20 text-crystal font-semibold hover:bg-crystal/5 transition-all">
              <Icons.Plus />
              Create Your First Character
            </button>
          </section>
        )}

        {/* Quick Actions */}
        <section className="mt-12 grid sm:grid-cols-3 gap-4">
          <button className="glass rounded-xl p-5 text-left hover:border-crystal/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-fire/15 flex items-center justify-center text-fire">
                <Icons.Flame />
              </div>
              <h4 className="font-display font-semibold group-hover:text-crystal transition-colors">
                Archetypes
              </h4>
            </div>
            <p className="text-sm text-text-muted">
              Browse character archetypes and templates
            </p>
          </button>
          <button className="glass rounded-xl p-5 text-left hover:border-crystal/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-water/15 flex items-center justify-center text-water">
                <Icons.Zap />
              </div>
              <h4 className="font-display font-semibold group-hover:text-crystal transition-colors">
                Random Generator
              </h4>
            </div>
            <p className="text-sm text-text-muted">
              Generate random character traits and backgrounds
            </p>
          </button>
          <button className="glass rounded-xl p-5 text-left hover:border-crystal/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                <Icons.Crown />
              </div>
              <h4 className="font-display font-semibold group-hover:text-crystal transition-colors">
                Export
              </h4>
            </div>
            <p className="text-sm text-text-muted">
              Export characters to JSON or Markdown
            </p>
          </button>
        </section>
      </main>
    </div>
  );
}
