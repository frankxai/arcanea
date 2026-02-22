import { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Github,
  Twitter,
  Youtube,
  Calendar,
  Globe,
  MapPin,
  Star,
  BookOpen,
  Cpu,
  PenTool,
  Code2,
  Languages,
  Brush,
  ArrowRight,
  ArrowUpRight,
  Users,
  Sparkles,
  Flame,
  Droplets,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community | Arcanea",
  description:
    "Join the Arcanea community of generative creators. Connect on Discord, GitHub, and beyond. Gather for creation sessions, Gate Ceremonies, and the Luminor Summit.",
  openGraph: {
    title: "Community | Arcanea — Join the Creation",
    description:
      "A living community of creators, builders, and dreamers. Real-time chat, open source collaboration, and gatherings that span the physical and digital.",
    images: ["/og-community.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community | Arcanea — Join the Creation",
    description:
      "A living community of creators, builders, and dreamers.",
    images: ["/og-community.png"],
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────────

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
    badgeColor: "brand-primary",
    icon: MessageCircle,
    accentClass: "from-brand-primary/20 to-brand-primary/5",
    borderHoverClass: "hover:border-brand-primary/40",
    glowColor: "rgba(139,92,246,0.15)",
    iconColor: "text-brand-primary",
    badgeBg: "bg-brand-primary/20 text-brand-primary border-brand-primary/30",
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
    icon: Github,
    accentClass: "from-crystal/20 to-crystal/5",
    borderHoverClass: "hover:border-crystal/40",
    glowColor: "rgba(127,255,212,0.12)",
    iconColor: "text-crystal",
    badgeBg: "bg-crystal/20 text-crystal border-crystal/30",
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
    icon: Twitter,
    accentClass: "from-water/20 to-water/5",
    borderHoverClass: "hover:border-water/40",
    glowColor: "rgba(120,166,255,0.12)",
    iconColor: "text-water",
    badgeBg: "bg-water/20 text-water border-water/30",
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
    icon: Youtube,
    accentClass: "from-fire/20 to-fire/5",
    borderHoverClass: "hover:border-fire/40",
    glowColor: "rgba(255,107,53,0.12)",
    iconColor: "text-fire",
    badgeBg: "bg-fire/20 text-fire border-fire/30",
  },
];

const EVENTS = [
  {
    title: "Monthly Creation Sessions",
    frequency: "Every month",
    format: "Online",
    description:
      "Guided creation gatherings where community members build together in real time, supported by their Guardians. Each session focuses on a different Gate of mastery.",
    icon: Sparkles,
    formatIcon: Globe,
    accent: "crystal",
    accentHex: "#7fffd4",
    badgeText: "Monthly",
  },
  {
    title: "Gate Ceremonies",
    frequency: "Quarterly",
    format: "Online ritual",
    description:
      "Sacred gatherings aligned with the Ten Gates. A ceremony of reflection, celebration, and collective advancement. Creators share breakthroughs and honor the Arc.",
    icon: Star,
    formatIcon: Globe,
    accent: "void-el",
    accentHex: "#9966ff",
    badgeText: "Quarterly",
  },
  {
    title: "Luminor Summit",
    frequency: "Annual",
    format: "Hybrid — physical + digital",
    description:
      "The flagship gathering of the Arcanea world. A multi-day convergence of creators, builders, and visionaries. Keynotes, workshops, and the unveiling of what comes next.",
    icon: Flame,
    formatIcon: MapPin,
    accent: "brand-gold",
    accentHex: "#ffd700",
    badgeText: "Annual",
    featured: true,
  },
  {
    title: "Local Creator Meetups",
    frequency: "Ongoing — city-based",
    format: "In person",
    description:
      "Community-organized gatherings in cities worldwide. Find your local circle, share your work, and create connections that extend beyond the digital realm.",
    icon: Users,
    formatIcon: MapPin,
    accent: "earth",
    accentHex: "#4a7c59",
    badgeText: "Local",
  },
];

const SPOTLIGHTS = [
  {
    title: "The Dungeon of Silence",
    creator: "Resonance Mage",
    gate: "Voice — 528 Hz",
    type: "Written Work",
    description:
      "A guided meditation descended from the Voice Gate, combining Alera's teachings with personal creative practice into an immersive ritual text.",
    accent: "#7fffd4",
    gateColor: "text-crystal",
  },
  {
    title: "Godbeast Field Studies",
    creator: "Archive Walker",
    gate: "Sight — 639 Hz",
    type: "Visual Series",
    description:
      "An ongoing visual series mapping the forms and territories of the Ten Godbeasts, rendered through AI image generation guided by the Bestiary.",
    accent: "#78a6ff",
    gateColor: "text-water",
  },
  {
    title: "Frequency Compositions",
    creator: "The Solfeggio Wanderer",
    gate: "Foundation — 174 Hz",
    type: "Audio Creation",
    description:
      "Original compositions built around the Extended Solfeggio frequencies, one piece per Gate—designed to open creative states before a session.",
    accent: "#9966ff",
    gateColor: "text-void-el",
  },
];

const CONTRIBUTIONS = [
  {
    title: "Write Library Texts",
    description:
      "Expand the 17 collections with your own wisdom. The Library is a living document—your voice belongs in it.",
    icon: BookOpen,
    color: "crystal",
    hex: "#7fffd4",
  },
  {
    title: "Create Arcanea Skills",
    description:
      "Build procedural skills that equip creators and developers. Published skills become part of the intelligence layer.",
    icon: Cpu,
    color: "brand-primary",
    hex: "#8b5cf6",
  },
  {
    title: "Design Guardian Art",
    description:
      "Bring the Guardians, Godbeasts, and cosmic landscapes to visual life. Your art may become canonical.",
    icon: Brush,
    color: "brand-gold",
    hex: "#ffd700",
  },
  {
    title: "Build Features",
    description:
      "The platform is open source. Pick an issue, build something real, and ship features that serve creators everywhere.",
    icon: Code2,
    color: "water",
    hex: "#78a6ff",
  },
  {
    title: "Write Narrative Content",
    description:
      "Parables, prophecies, chronicles—every form of Arcanean fiction grows the mythology and serves the community.",
    icon: PenTool,
    color: "fire",
    hex: "#ff6b35",
  },
  {
    title: "Translate Content",
    description:
      "Make the Library, Academy, and platform accessible to creators in every language. Translation is a sacred act.",
    icon: Languages,
    color: "earth",
    hex: "#4a7c59",
  },
];

// ─── Page Component ────────────────────────────────────────────────────────────

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-20 lg:pt-28 lg:pb-28">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-16 sm:px-16 sm:py-20 lg:px-20 lg:py-24">
            {/* Inner aurora gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/12 via-transparent to-crystal/10 pointer-events-none" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-crystal/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-8">
                <Users className="w-3.5 h-3.5 text-brand-primary" />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Community
                </span>
              </div>

              <h1 className="text-fluid-hero font-display font-bold mb-6 leading-none tracking-tight">
                Join the
                <span className="block text-gradient-brand">
                  Creation
                </span>
              </h1>

              <p className="text-fluid-lg text-text-secondary leading-relaxed max-w-2xl font-body mb-10">
                Arcanea is not just a platform—it is a living ecosystem of creators,
                builders, and dreamers aligned by the same conviction: that imagining
                a good future is the first act of building one. This is where you find
                your people.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join Discord
                </a>
                <a
                  href="https://github.com/frankxai/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  Explore GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Community Spaces ───────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5" aria-labelledby="spaces-heading">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-crystal/20 bg-crystal/8 mb-5">
              <span className="text-xs font-mono tracking-widest uppercase text-crystal">Community Spaces</span>
            </div>
            <h2
              id="spaces-heading"
              className="text-fluid-3xl font-display font-bold mb-4"
            >
              Where creators gather
            </h2>
            <p className="text-text-secondary font-sans max-w-2xl">
              Each space serves a distinct purpose in the ecosystem. Join all of them,
              or start with the one that calls to you.
            </p>
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
                  className={`group relative glass rounded-2xl p-8 overflow-hidden glow-card hover-lift transition-all ${space.borderHoverClass}`}
                  aria-label={`${space.name} — ${space.tagline}`}
                >
                  {/* Hover glow overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 30% 30%, ${space.glowColor}, transparent 65%)`,
                    }}
                  />

                  <div className="relative">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${space.accentClass}`}>
                        <Icon className={`w-5 h-5 ${space.iconColor}`} />
                      </div>
                      <span className={`text-xs font-mono px-3 py-1 rounded-full border ${space.badgeBg}`}>
                        {space.badge}
                      </span>
                    </div>

                    {/* Name + tagline */}
                    <h3 className="text-xl font-display font-semibold mb-1">
                      {space.name}
                    </h3>
                    <p className={`text-sm font-mono mb-3 ${space.iconColor} opacity-80`}>
                      {space.tagline}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed font-sans mb-5">
                      {space.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-6" role="list">
                      {space.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-text-muted font-sans">
                          <span className={`mt-1 w-1 h-1 rounded-full shrink-0 ${space.iconColor.replace("text-", "bg-")}`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* CTA row */}
                    <div className="flex items-center gap-2 text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className={space.iconColor}>{space.cta}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${space.iconColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── 3. Events ─────────────────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5" aria-labelledby="events-heading">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/8 mb-5">
              <Calendar className="w-3 h-3 text-brand-gold" />
              <span className="text-xs font-mono tracking-widest uppercase text-brand-gold">Gatherings</span>
            </div>
            <h2
              id="events-heading"
              className="text-fluid-3xl font-display font-bold mb-4"
            >
              Gatherings of Creators
            </h2>
            <p className="text-text-secondary font-sans max-w-2xl">
              The Arc turns in cycles. These gatherings mark the moments where the
              community converges—to celebrate, to create, to advance together.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EVENTS.map((event) => {
              const EventIcon = event.icon;
              const FormatIcon = event.formatIcon;
              return (
                <div
                  key={event.title}
                  className={`relative glass rounded-2xl p-6 overflow-hidden transition-all ${event.featured ? "ring-1 ring-brand-gold/30 shadow-glow-gold" : ""}`}
                >
                  {event.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/8 via-transparent to-transparent pointer-events-none rounded-2xl" />
                  )}

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${event.accentHex}18` }}
                    >
                      <EventIcon className="w-4 h-4" style={{ color: event.accentHex }} />
                    </div>

                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${event.accentHex}15`,
                          color: event.accentHex,
                          borderColor: `${event.accentHex}30`,
                        }}
                      >
                        {event.badgeText}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base mb-1">
                      {event.title}
                    </h3>

                    {/* Format line */}
                    <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                      <FormatIcon className="w-3 h-3 shrink-0" />
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

          <div className="mt-8 text-center">
            <a
              href="https://discord.gg/arcanea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-brand-gold/20 text-brand-gold text-sm font-semibold hover:bg-brand-gold/5 hover:border-brand-gold/40 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Stay informed — join Discord for event announcements
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* ── 4. Creator Spotlight ─────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5" aria-labelledby="spotlight-heading">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-water/20 bg-water/8 mb-5">
              <Star className="w-3 h-3 text-water" />
              <span className="text-xs font-mono tracking-widest uppercase text-water">Creator Spotlight</span>
            </div>
            <h2
              id="spotlight-heading"
              className="text-fluid-3xl font-display font-bold mb-4"
            >
              From the community
            </h2>
            <p className="text-text-secondary font-sans max-w-2xl">
              Every week, remarkable works emerge from the Arcanea community.
              These are the creations that illuminate what is possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SPOTLIGHTS.map((work) => (
              <div
                key={work.title}
                className="group relative glass rounded-2xl p-7 overflow-hidden glow-card hover-lift transition-all"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${work.accent}18, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  {/* Type badge */}
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border mb-5"
                    style={{
                      backgroundColor: `${work.accent}15`,
                      color: work.accent,
                      borderColor: `${work.accent}30`,
                    }}
                  >
                    {work.type}
                  </div>

                  {/* Placeholder visual block */}
                  <div
                    className="w-full h-28 rounded-xl mb-5 flex items-center justify-center"
                    style={{ backgroundColor: `${work.accent}10`, borderColor: `${work.accent}20` }}
                    role="img"
                    aria-label={`Visual preview for ${work.title}`}
                  >
                    <Sparkles className="w-6 h-6 opacity-40" style={{ color: work.accent }} />
                  </div>

                  <h3 className="font-display font-semibold mb-1">{work.title}</h3>

                  <p className={`text-xs font-mono mb-3 ${work.gateColor} opacity-80`}>
                    {work.gate}
                  </p>

                  <p className="text-text-secondary text-sm leading-relaxed font-sans mb-4">
                    {work.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-text-muted font-sans">{work.creator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-text-muted font-sans">
            Creator spotlights are community-nominated. Share your work in{" "}
            <a
              href="https://discord.gg/arcanea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crystal underline underline-offset-2 hover:text-crystal-bright transition-colors"
            >
              Discord #create
            </a>{" "}
            to be considered.
          </p>
        </section>

        {/* ── 5. Contribution Guide ────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5" aria-labelledby="contribute-heading">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-earth/30 bg-earth/10 mb-5">
              <Leaf className="w-3 h-3 text-earth" />
              <span className="text-xs font-mono tracking-widest uppercase text-earth-bright">Contribute</span>
            </div>
            <h2
              id="contribute-heading"
              className="text-fluid-3xl font-display font-bold mb-4"
            >
              How to shape Arcanea
            </h2>
            <p className="text-text-secondary font-sans max-w-2xl">
              The platform, the mythology, and the intelligence layer are all open
              to contribution. Every form of creative work is welcome here.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTRIBUTIONS.map((item) => {
              const ContribIcon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group glass rounded-2xl p-6 glow-card hover-lift transition-all"
                  style={{"--hover-accent": item.hex} as React.CSSProperties}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${item.hex}18` }}
                  >
                    <ContribIcon className="w-4 h-4" style={{ color: item.hex }} />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{item.title}</h3>
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
              <Github className="w-4 h-4" />
              Start on GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-text-secondary text-sm font-semibold hover:border-crystal/20 hover:text-text-primary transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Read the Library
            </Link>
          </div>
        </section>

        {/* ── 6. Newsletter CTA ─────────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5" aria-labelledby="newsletter-heading">
          <div className="relative liquid-glass rounded-3xl overflow-hidden p-10 sm:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-crystal/8 pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-primary/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
                <Sparkles className="w-3 h-3 text-brand-primary" />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  The Dispatch
                </span>
              </div>

              <h2
                id="newsletter-heading"
                className="text-fluid-3xl font-display font-bold mb-4"
              >
                Wisdom delivered
                <span className="block text-gradient-brand">to your realm</span>
              </h2>

              <p className="text-text-secondary font-body leading-relaxed mb-8 max-w-xl">
                Weekly dispatches from Arcanea — platform updates, Library wisdom,
                community highlights, and new Guardian capabilities. No noise,
                only signal.
              </p>

              <form
                aria-label="Newsletter signup"
                className="flex flex-col sm:flex-row gap-3 max-w-lg"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 text-text-primary placeholder-text-muted font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all"
                  aria-required="true"
                />
                <button
                  type="submit"
                  className="shrink-0 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm shadow-glow-brand hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(139,92,246,0.45)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/70 focus:ring-offset-2 focus:ring-offset-cosmic-void"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-3 text-xs text-text-muted font-sans">
                No spam. Unsubscribe anytime. Your email stays within the realm.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. Philosophy Banner ──────────────────────────────────────────── */}
        <section className="py-16 pb-24 border-t border-white/5">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Elemental bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-fire via-brand-primary via-crystal via-water to-earth" />

            <div className="px-8 py-16 sm:px-14 sm:py-20 text-center">
              {/* Element icons */}
              <div className="flex justify-center gap-5 mb-10" aria-hidden="true">
                <div className="w-8 h-8 rounded-lg bg-fire/15 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-fire" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-water/15 flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-water" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-earth/15 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-earth" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-crystal/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-crystal" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                  <Star className="w-4 h-4 text-brand-primary" />
                </div>
              </div>

              <blockquote className="max-w-3xl mx-auto">
                <p className="text-fluid-3xl font-display font-bold leading-snug mb-6">
                  We believe the antidote to a terrible future{" "}
                  <span className="text-gradient-crystal">is imagining a good one.</span>
                </p>
                <p className="text-xl font-display font-semibold text-brand-gold mb-8">
                  Build it here.
                </p>
                <p className="text-text-secondary font-body leading-relaxed max-w-xl mx-auto">
                  Every creator who joins this community, every skill contributed,
                  every line of code, every Library text written — all of it is a
                  vote for the future we want to inhabit. The Arc turns. Begin.
                </p>
              </blockquote>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <a
                  href="https://discord.gg/arcanea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.03] transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join the community
                </a>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-primary font-semibold hover:border-crystal/30 hover:bg-crystal/5 transition-all duration-200"
                >
                  Begin your journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bottom element bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-earth via-crystal via-water via-brand-primary to-fire" />
          </div>
        </section>

      </main>
    </div>
  );
}
