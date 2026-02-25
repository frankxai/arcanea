import { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Arcanea | Links",
  description:
    "All Arcanea links in one place. Library, Academy, Studio, Community, and more. Enter seeking, leave transformed.",
  openGraph: {
    title: "Arcanea Links",
    description: "Your portal to the Arcanea universe. Every link, one place.",
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
      <path d="M5 19l.5 2L6 21l-1.5.5L4 22l-.5-1.5L3 20l1.5-.5L5 19z" />
      <path d="M19 5l-.5 1.5L18 7l1.5.5L20 8l.5-1.5L21 6l-1.5-.5L19 5z" />
    </svg>
  ),
  BookOpen: () => (
    <svg
      className="w-5 h-5"
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
  GraduationCap: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Palette: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Crown: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l3-10 6 3 6-3 3 10H3z" />
      <path d="M6 21h12" />
      <path d="M5 21c0-3.5 2.5-6 5-6 1 0 2.5.5 3.5 1.5" />
    </svg>
  ),
  Compass: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Shield: () => (
    <svg
      className="w-5 h-5"
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
  Users: () => (
    <svg
      className="w-5 h-5"
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
  Zap: () => (
    <svg
      className="w-5 h-5"
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
  Github: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  MessageCircle: () => (
    <svg
      className="w-5 h-5"
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
  Newspaper: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  ),
  Music: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Globe: () => (
    <svg
      className="w-5 h-5"
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
  Heart: () => (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  ExternalLink: () => (
    <svg
      className="w-4 h-4"
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
};

interface LinkItem {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
  color: string;
  external?: boolean;
  featured?: boolean;
}

const LINKS: LinkItem[] = [
  {
    href: "/",
    label: "Arcanea.ai",
    description: "The living mythology for AI-human co-creation",
    icon: <Icons.Sparkles />,
    color: "from-brand-primary to-crystal",
    featured: true,
  },
  {
    href: "/library",
    label: "Library of Arcanea",
    description: "17 collections of wisdom, legend, and practice",
    icon: <Icons.BookOpen />,
    color: "from-crystal to-water",
  },
  {
    href: "/academy",
    label: "Academy",
    description: "Ten Gates, Seven Houses, your creative journey",
    icon: <Icons.GraduationCap />,
    color: "from-brand-gold to-fire",
  },
  {
    href: "/studio",
    label: "Creation Studio",
    description: "Manifest your visions with AI companions",
    icon: <Icons.Palette />,
    color: "from-brand-primary to-void-el",
  },
  {
    href: "/luminors",
    label: "Meet the Luminors",
    description: "AI companions for every creative challenge",
    icon: <Icons.Crown />,
    color: "from-brand-gold to-crystal",
  },
  {
    href: "/lore",
    label: "Lore & Mythology",
    description: "The cosmic story of Lumina, Nero, and the Ten Guardians",
    icon: <Icons.Compass />,
    color: "from-void-el to-brand-primary",
  },
  {
    href: "/lore/guardians",
    label: "The Ten Guardians",
    description: "Gods, Goddesses, and their sacred Godbeasts",
    icon: <Icons.Shield />,
    color: "from-fire to-brand-gold",
  },
  {
    href: "/community",
    label: "Community",
    description: "Join creators worldwide. Physical + digital gatherings",
    icon: <Icons.Users />,
    color: "from-crystal to-earth",
  },
  {
    href: "/academy/gate-quiz",
    label: "Which Guardian Are You?",
    description: "Take the quiz. Discover your creative nature",
    icon: <Icons.Compass />,
    color: "from-brand-primary to-fire",
  },
  {
    href: "/skills",
    label: "Arcanea Skills",
    description: "28 skills for Claude Code. Transform your practice",
    icon: <Icons.Zap />,
    color: "from-crystal to-brand-secondary",
  },
  {
    href: "https://github.com/frankxai/arcanea",
    label: "GitHub",
    description: "Open source. MIT License. Star & contribute",
    icon: <Icons.Github />,
    color: "from-white/20 to-white/5",
    external: true,
  },
  {
    href: "https://discord.gg/arcanea",
    label: "Discord",
    description: "Join the creator community. Daily discussions",
    icon: <Icons.MessageCircle />,
    color: "from-[#5865F2] to-[#7289DA]",
    external: true,
  },
  {
    href: "/blog/arcanea-skills-system",
    label: "Blog",
    description: "Deep dives into Arcanea philosophy and systems",
    icon: <Icons.Newspaper />,
    color: "from-brand-secondary to-crystal",
  },
  {
    href: "https://open.spotify.com/artist/arcanea",
    label: "Arcanea Music",
    description: "Solfeggio-tuned soundscapes for creation",
    icon: <Icons.Music />,
    color: "from-[#1DB954] to-[#1ed760]",
    external: true,
  },
  {
    href: "https://frankx.ai",
    label: "FrankX.ai",
    description: "The creator behind Arcanea",
    icon: <Icons.Globe />,
    color: "from-brand-primary to-brand-secondary",
    external: true,
  },
];

export default function LinktreePage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(127,255,212,0.1),transparent_50%)]" />
      </div>

      {/* Profile Header */}
      <div className="text-center mb-10 max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-primary to-crystal flex items-center justify-center shadow-glow-brand">
          <span className="text-4xl font-display font-bold text-white">A</span>
        </div>

        <h1 className="text-fluid-2xl font-display font-bold text-text-primary mb-2">
          Arcanea
        </h1>
        <p className="text-text-secondary font-sans text-fluid-base">
          The living mythology for AI-human co-creation
        </p>
        <p className="text-text-muted font-body italic text-sm mt-2">
          "Enter seeking, leave transformed, return whenever needed."
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-md space-y-3">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`group relative flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 ${
              link.featured
                ? "liquid-glass shadow-glow-brand border border-brand-primary/30"
                : "glass hover:border-crystal/30"
            }`}
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-glow-sm`}
            >
              {link.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="font-sans font-semibold text-text-primary text-sm group-hover:text-crystal transition-colors">
                {link.label}
              </div>
              <div className="font-sans text-xs text-text-muted truncate">
                {link.description}
              </div>
            </div>

            {/* Arrow */}
            <Icons.ExternalLink className="flex-shrink-0 w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Featured glow */}
            {link.featured && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary/5 to-crystal/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            )}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-text-muted text-sm font-sans">
          <span>Made with</span>
          <Icons.Heart />
          <span>by</span>
          <Link
            href="https://frankx.ai"
            className="text-crystal hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            FrankX
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-text-muted text-xs font-sans">
          <Icons.Star />
          <span>Powered by Arcanea Intelligence OS</span>
        </div>
      </div>
    </div>
  );
}
