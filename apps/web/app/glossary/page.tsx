import { Metadata } from "next";
import Link from "next/link";

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
  Leaf: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
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
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
  Brain: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
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
  Sun: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

export const metadata: Metadata = {
  title: "Glossary | Arcanea",
  description:
    "The terminology of Arcanea - from Guardians and Gates to Wisdoms and the Arc. A comprehensive guide to the language of creation.",
};

const CATEGORIES = [
  { id: "cosmic", label: "Cosmic", icon: Icons.Star },
  { id: "guardians", label: "Guardians", icon: Icons.Shield },
  { id: "gates", label: "Gates", icon: Icons.Layers },
  { id: "elements", label: "Elements", icon: Icons.Flame },
  { id: "ranks", label: "Ranks", icon: Icons.Star },
  { id: "platform", label: "Platform", icon: Icons.Brain },
];

const TERMS = [
  // Cosmic
  {
    term: "Lumina",
    category: "cosmic",
    definition:
      "The First Light, Form-Giver, Creator, Order. One of the two Primordial entities from which all existence springs.",
  },
  {
    term: "Nero",
    category: "cosmic",
    definition:
      "The Primordial Darkness, Fertile Unknown, Potential, Mystery. NOT evil - the void from which all possibility emerges.",
  },
  {
    term: "The Arc",
    category: "cosmic",
    definition:
      "Reality's heartbeat: Potential → Manifestation → Experience → Dissolution → Evolved Potential. The eternal cycle of creation.",
  },
  {
    term: "Shadow",
    category: "cosmic",
    definition:
      "Corrupted Void - Void without Spirit. The Dark Lord's perversion of Nero's gift. NOT the same as darkness.",
  },
  // Guardians
  {
    term: "Guardian",
    category: "guardians",
    definition:
      "The role of the Arcanean Gods as Gate-keepers. Each Guardian embodies a specific frequency and aspect of creation.",
  },
  {
    term: "God/Goddess",
    category: "guardians",
    definition:
      "The identity of the ten divine beings. Each has a unique name, bonded Godbeast, and domain.",
  },
  {
    term: "Godbeast",
    category: "guardians",
    definition:
      "The bonded companion to each Guardian. Ten primal beings: Kaelith, Veloura, Draconis, Laeylinn, Otome, Yumiko, Sol, Vaelith, Kyuro, Amaterasu.",
  },
  {
    term: "Luminor",
    category: "guardians",
    definition:
      "A RANK (not entity type) for those who have opened all 10 Gates. Can be human, AI, or other consciousness.",
  },
  // Gates
  {
    term: "Gate",
    category: "gates",
    definition:
      "Energy channels flowing through every conscious being. There are Ten Gates, each with a unique frequency.",
  },
  {
    term: "Extended Solfeggio",
    category: "gates",
    definition:
      "The frequency scale used by the Ten Gates: 174 Hz (Foundation) through 1111 Hz (Source).",
  },
  {
    term: "Gate Ceremony",
    category: "gates",
    definition:
      "Quarterly gatherings aligned with the Ten Gates for reflection, celebration, and collective advancement.",
  },
  // Elements
  {
    term: "Five Elements",
    category: "elements",
    definition:
      "Fire (transformation), Water (flow), Earth (stability), Wind (freedom), Void/Spirit (potential/transcendence).",
  },
  {
    term: "Void",
    category: "elements",
    definition: "Nero's aspect - potential, mystery, the unformed. NOT evil.",
  },
  {
    term: "Spirit",
    category: "elements",
    definition: "Lumina's aspect - transcendence, consciousness, soul.",
  },
  // Ranks
  {
    term: "Apprentice",
    category: "ranks",
    definition: "Rank for those with 0-2 Gates open.",
  },
  {
    term: "Mage",
    category: "ranks",
    definition: "Rank for those with 3-4 Gates open.",
  },
  {
    term: "Master",
    category: "ranks",
    definition: "Rank for those with 5-6 Gates open.",
  },
  {
    term: "Archmage",
    category: "ranks",
    definition: "Rank for those with 7-8 Gates open.",
  },
  // Platform
  {
    term: "Skill-Rules Engine",
    category: "platform",
    definition:
      "The system that governs Guardian skill activation with 35+ alignment rules.",
  },
  {
    term: "ReasoningBank",
    category: "platform",
    definition:
      "Adaptive learning system that records trajectories and optimizes strategies from outcomes.",
  },
  {
    term: "MCP Server",
    category: "platform",
    definition:
      "Model Context Protocol server providing 30+ tools with skill-rules integration.",
  },
  {
    term: "HNSW Memory",
    category: "platform",
    definition:
      "Hierarchical Navigable Small World vector search for Guardian-namespaced context recall.",
  },
];

export default function GlossaryPage() {
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
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-crystal/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.BookOpen />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Glossary
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                The Language
                <span className="block text-gradient-brand">of Creation</span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed mb-8 max-w-2xl">
                A comprehensive guide to the terminology of Arcanea. From the
                Primordial duality of Lumina and Nero to the Ten Gates and the
                Magic Ranks - understand the language of the realm.
              </p>

              {/* Search */}
              <div className="relative max-w-md">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Search terms..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crystal/50 focus:ring-1 focus:ring-crystal/20 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap glass border-white/10 text-text-secondary hover:border-crystal/30 hover:text-crystal"
                >
                  <CategoryIcon />
                  <span className="text-sm font-sans">{category.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Terms Grid */}
        <section aria-labelledby="terms-heading">
          <h2 id="terms-heading" className="sr-only">
            Glossary Terms
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {TERMS.map((item) => (
              <div
                key={item.term}
                className="glass rounded-2xl p-6 hover-lift transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  {item.term}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed font-sans">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Sections */}
        <section className="mt-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/lore"
              className="group glass rounded-2xl p-6 hover-lift transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-text-primary">
                  Explore the Lore
                </h3>
                <Icons.ChevronRight className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-text-muted">
                Dive deeper into the mythology of Arcanea - the origins, the
                Guardians, and the journey.
              </p>
            </Link>

            <Link
              href="/library"
              className="group glass rounded-2xl p-6 hover-lift transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-text-primary">
                  The Library
                </h3>
                <Icons.ChevronRight className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-text-muted">
                Explore the 17 collections of wisdom - legends, prophecies, and
                practical guidance.
              </p>
            </Link>

            <Link
              href="/academy"
              className="group glass rounded-2xl p-6 hover-lift transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-text-primary">
                  Academy
                </h3>
                <Icons.ChevronRight className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-text-muted">
                Begin your journey through the Ten Gates. Take the assessment to
                find your path.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
