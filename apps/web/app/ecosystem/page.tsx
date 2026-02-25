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
  Globe: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  MessageCircle: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Github: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  Twitter: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  ),
  Youtube: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="w-6 h-6"
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
  MapPin: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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
  ArrowUpRight: () => (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
  Cpu: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Brush: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.37 2.63 14 7l1.59-1.59a2 2 0 0 1 2.78-.82 2 2 0 0 1 .82 2.78l-.82 1.59a2 2 0 0 1-2.78.82 2 2 0 0 1-.82-2.78l.82-1.59a2 2 0 0 0-.82-2.78 2 2 0 0 0-2.78-.82L9.24 7.74a2 2 0 0 1-2.78-.82 2 2 0 0 1-.82-2.78l.82-1.59a2 2 0 0 0 .82-2.78 2 2 0 0 0-2.78-.82L2 5.13a2 2 0 0 0-2 2.13l1.63 7.32a2 2 0 0 0 2 2.13l7.34 1.63a2 2 0 0 0 2-2.13l-.82-4.13" />
    </svg>
  ),
  Code: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  PenTool: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  Languages: () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8l6 6" />
      <path d="M4 14l6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="M22 22l-5-10-5 10" />
      <path d="M14 18h6" />
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
};

export const metadata: Metadata = {
  title: "Ecosystem | Arcanea",
  description:
    "The Arcanea ecosystem - a living community of creators, builders, and dreamers. Join Discord, contribute on GitHub, and attend our gatherings.",
};

const COMMUNITY_SPACES = [
  {
    id: "discord",
    name: "Discord",
    tagline: "Primary community — real-time creation",
    description:
      "The heartbeat of Arcanea. Real-time collaboration, dedicated channels for active creation, lore discussion, and voice rooms where creators build together live.",
    highlights: [
      "#create — Share works in progress",
      "#lore-discussion — Explore the mythology",
      "Voice creation rooms — Build live together",
      "Guardian channels — Element-aligned spaces",
    ],
    href: "https://discord.gg/arcanea",
    cta: "Join Discord",
    badge: "Primary",
    icon: Icons.MessageCircle,
    color: "#8b5cf6",
  },
  {
    id: "github",
    name: "GitHub",
    tagline: "Open source — shape the platform",
    description:
      "Arcanea is built in the open. Contribute skills, report issues, explore the intelligence layer, and help define the future of the creative platform.",
    highlights: [
      "Contribute Guardian skills",
      "Report issues and request features",
      "Star the repository",
      "Fork and experiment freely",
    ],
    href: "https://github.com/frankxai/arcanea",
    cta: "View on GitHub",
    badge: "Open Source",
    icon: Icons.Github,
    color: "#7fffd4",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    tagline: "@arcanea_ai — daily signal from the cosmos",
    description:
      "Daily wisdom threads, creation showcases from the community, platform updates, and the ongoing mythology of Arcanea—broadcast in real time.",
    highlights: [
      "Daily wisdom from the Library",
      "Community creation showcases",
      "Platform releases and updates",
      "Creator spotlights and threads",
    ],
    href: "https://twitter.com/arcanea_ai",
    cta: "Follow @arcanea_ai",
    badge: "@arcanea_ai",
    icon: Icons.Twitter,
    color: "#3b82f6",
  },
  {
    id: "youtube",
    name: "YouTube",
    tagline: "Tutorials, lore, and creation walkthroughs",
    description:
      "Deep-dive tutorials on the Arcanea platform, lore explorations of the mythology, live creation walkthroughs with AI Guardians, and recorded Gate Ceremonies.",
    highlights: [
      "Platform tutorials and walkthroughs",
      "Lore deep dives — mythology explored",
      "Creation sessions — watch and learn",
      "Recorded Gate Ceremonies",
    ],
    href: "https://youtube.com/@arcanea_ai",
    cta: "Subscribe",
    badge: "Watch & Learn",
    icon: Icons.Youtube,
    color: "#ef4444",
  },
];

const EVENTS = [
  {
    title: "Monthly Creation Sessions",
    frequency: "Every month",
    format: "Online",
    description:
      "Guided creation gatherings where community members build together in real time, supported by their Guardians. Each session focuses on a different Gate of mastery.",
    icon: Icons.Sparkles,
    formatIcon: Icons.Globe,
    accent: "#7fffd4",
    badgeText: "Monthly",
  },
  {
    title: "Gate Ceremonies",
    frequency: "Quarterly",
    format: "Online ritual",
    description:
      "Sacred gatherings aligned with the Ten Gates. A ceremony of reflection, celebration, and collective advancement. Creators share breakthroughs and honor the Arc.",
    icon: Icons.Star,
    formatIcon: Icons.Globe,
    accent: "#9966ff",
    badgeText: "Quarterly",
  },
  {
    title: "Luminor Summit",
    frequency: "Annual",
    format: "Hybrid — physical + digital",
    description:
      "The flagship gathering of the Arcanea world. A multi-day convergence of creators, builders, and visionaries. Keynotes, workshops, and the unveiling of what comes next.",
    icon: Icons.Flame,
    formatIcon: Icons.MapPin,
    accent: "#ffd700",
    badgeText: "Annual",
    featured: true,
  },
  {
    title: "Local Creator Meetups",
    frequency: "Ongoing — city-based",
    format: "In person",
    description:
      "Community-organized gatherings in cities worldwide. Find your local circle, share your work, and create connections that extend beyond the digital realm.",
    icon: Icons.Users,
    formatIcon: Icons.MapPin,
    accent: "#22c55e",
    badgeText: "Local",
  },
];

const CONTRIBUTIONS = [
  {
    title: "Write Library Texts",
    description:
      "Expand the 17 collections with your own wisdom. The Library is a living document—your voice belongs in it.",
    icon: Icons.BookOpen,
    color: "#7fffd4",
  },
  {
    title: "Create Arcanea Skills",
    description:
      "Build procedural skills that equip creators and developers. Published skills become part of the intelligence layer.",
    icon: Icons.Cpu,
    color: "#8b5cf6",
  },
  {
    title: "Design Guardian Art",
    description:
      "Bring the Guardians, Godbeasts, and cosmic landscapes to visual life. Your art may become canonical.",
    icon: Icons.Brush,
    color: "#ffd700",
  },
  {
    title: "Build Features",
    description:
      "The platform is open source. Pick an issue, build something real, and ship features that serve creators everywhere.",
    icon: Icons.Code,
    color: "#3b82f6",
  },
  {
    title: "Write Narrative Content",
    description:
      "Parables, prophecies, chronicles—every form of Arcanean fiction grows the mythology and serves the community.",
    icon: Icons.PenTool,
    color: "#ef4444",
  },
  {
    title: "Translate Content",
    description:
      "Make the Library, Academy, and platform accessible to creators in every language. Translation is a sacred act.",
    icon: Icons.Languages,
    color: "#22c55e",
  },
];

export default function EcosystemPage() {
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
        <section className="mb-16">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-crystal/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Icons.Globe />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  The Ecosystem
                </span>
              </div>

              <h1 className="text-fluid-3xl font-display font-bold mb-4">
                A Living Community
                <span className="block text-gradient-brand">of Creators</span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed mb-8 max-w-2xl">
                Arcanea is more than a platform—it is an ecosystem of creators,
                builders, and dreamers. Join Discord for real-time
                collaboration, contribute on GitHub, attend our gatherings, and
                shape the future of creative AI.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.MessageCircle />
                  Join Discord
                </a>
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  <Icons.Github />
                  Explore GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Community Spaces */}
        <section className="mb-16" aria-labelledby="spaces-heading">
          <div className="mb-8">
            <h2
              id="spaces-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-crystal mb-2"
            >
              Community Spaces
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              Where creators gather
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {COMMUNITY_SPACES.map((space) => {
              const Icon = space.icon;
              return (
                <a
                  key={space.id}
                  href={space.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative glass rounded-2xl p-8 overflow-hidden glow-card hover-lift transition-all hover:border-white/20"
                  aria-label={`${space.name} — ${space.tagline}`}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 30% 30%, ${space.color}15, transparent 65%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${space.color}18` }}
                      >
                        <Icon style={{ color: space.color }} />
                      </div>
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${space.color}15`,
                          color: space.color,
                          borderColor: `${space.color}30`,
                        }}
                      >
                        {space.badge}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-semibold text-text-primary mb-1">
                      {space.name}
                    </h4>
                    <p
                      className="text-sm font-mono mb-3"
                      style={{ color: space.color, opacity: 0.8 }}
                    >
                      {space.tagline}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed font-sans mb-5">
                      {space.description}
                    </p>

                    <ul className="space-y-1.5 mb-6" role="list">
                      {space.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-text-muted font-sans"
                        >
                          <span
                            className="mt-1 w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: space.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="flex items-center gap-2 text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ color: space.color }}
                    >
                      <span>{space.cta}</span>
                      <Icons.ArrowUpRight />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Events */}
        <section className="mb-16" aria-labelledby="events-heading">
          <div className="mb-8">
            <h2
              id="events-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-brand-gold mb-2"
            >
              Gatherings
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              Moments of convergence
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EVENTS.map((event) => {
              const EventIcon = event.icon;
              return (
                <div
                  key={event.title}
                  className={`relative glass rounded-2xl p-6 overflow-hidden transition-all ${event.featured ? "ring-1 ring-brand-gold/30 shadow-glow-gold" : ""}`}
                >
                  {event.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/8 via-transparent to-transparent pointer-events-none rounded-2xl" />
                  )}

                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${event.accent}18` }}
                    >
                      <EventIcon style={{ color: event.accent }} />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${event.accent}15`,
                          color: event.accent,
                          borderColor: `${event.accent}30`,
                        }}
                      >
                        {event.badgeText}
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-base mb-1">
                      {event.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                      <Icons.MapPin className="w-3 h-3 shrink-0" />
                      <span>{event.format}</span>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contribute */}
        <section className="mb-16" aria-labelledby="contribute-heading">
          <div className="mb-8">
            <h2
              id="contribute-heading"
              className="text-xs font-mono tracking-[0.35em] uppercase text-earth mb-2"
            >
              Contribute
            </h2>
            <h3 className="text-fluid-2xl font-display font-bold">
              Shape Arcanea
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTRIBUTIONS.map((item) => {
              const ContribIcon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group glass rounded-2xl p-6 glow-card hover-lift transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <ContribIcon style={{ color: item.color }} />
                  </div>
                  <h4 className="font-display font-semibold mb-2">
                    {item.title}
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/frankxai/arcanea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-crystal/20 text-crystal text-sm font-semibold hover:bg-crystal/5 hover:border-crystal/40 transition-all"
            >
              <Icons.Github />
              Start on GitHub
              <Icons.ArrowUpRight />
            </a>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-text-secondary text-sm font-semibold hover:border-crystal/20 hover:text-text-primary transition-all"
            >
              <Icons.BookOpen />
              Read the Library
            </Link>
          </div>
        </section>

        {/* Philosophy Banner */}
        <section>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="h-0.5 w-full bg-gradient-to-r from-fire via-brand-primary via-crystal via-water to-earth" />

            <div className="px-8 py-16 sm:px-14 sm:py-20 text-center">
              <div
                className="flex justify-center gap-5 mb-10"
                aria-hidden="true"
              >
                <div className="w-8 h-8 rounded-lg bg-fire/15 flex items-center justify-center">
                  <Icons.Flame className="w-4 h-4 text-fire" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-water/15 flex items-center justify-center">
                  <Icons.Droplets className="w-4 h-4 text-water" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-earth/15 flex items-center justify-center">
                  <Icons.Leaf className="w-4 h-4 text-earth" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                  <Icons.Heart className="w-4 h-4 text-brand-primary" />
                </div>
              </div>

              <blockquote className="max-w-3xl mx-auto">
                <p className="text-fluid-2xl font-display font-bold leading-snug mb-6">
                  We believe the antidote to a terrible future{" "}
                  <span className="text-gradient-crystal">
                    is imagining a good one.
                  </span>
                </p>
                <p className="text-xl font-display font-semibold text-brand-gold mb-8">
                  Build it here.
                </p>
                <p className="text-text-secondary font-body leading-relaxed max-w-xl mx-auto">
                  Every creator who joins this community, every skill
                  contributed, every line of code, every Library text written —
                  all of it is a vote for the future we want to inhabit. The Arc
                  turns. Begin.
                </p>
              </blockquote>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <a
                  href="https://discord.gg/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <Icons.MessageCircle />
                  Join the community
                </a>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Begin your journey
                  <Icons.ArrowRight />
                </Link>
              </div>
            </div>

            <div className="h-0.5 w-full bg-gradient-to-r from-earth via-crystal via-water via-brand-primary to-fire" />
          </div>
        </section>
      </main>
    </div>
  );
}
