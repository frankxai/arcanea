import { Metadata } from "next";
import Link from "next/link";
import {
  Github, BookOpen, GraduationCap, Palette, Sparkles, MessageCircle,
  Globe, Music, Newspaper, Users, ExternalLink, Heart, Zap, Crown,
  Compass, Shield, Star,
} from "lucide-react";
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
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-brand-primary to-crystal",
    featured: true,
  },
  {
    href: "/library",
    label: "Library of Arcanea",
    description: "17 collections of wisdom, legend, and practice",
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-crystal to-water",
  },
  {
    href: "/academy",
    label: "Academy",
    description: "Ten Gates, Seven Houses, your creative journey",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-brand-gold to-fire",
  },
  {
    href: "/studio",
    label: "Creation Studio",
    description: "Manifest your visions with AI companions",
    icon: <Palette className="w-5 h-5" />,
    color: "from-brand-primary to-void-el",
  },
  {
    href: "/luminors",
    label: "Meet the Luminors",
    description: "AI companions for every creative challenge",
    icon: <Crown className="w-5 h-5" />,
    color: "from-brand-gold to-crystal",
  },
  {
    href: "/lore",
    label: "Lore & Mythology",
    description: "The cosmic story of Lumina, Nero, and the Ten Guardians",
    icon: <Compass className="w-5 h-5" />,
    color: "from-void-el to-brand-primary",
  },
  {
    href: "/lore/guardians",
    label: "The Ten Guardians",
    description: "Gods, Goddesses, and their sacred Godbeasts",
    icon: <Shield className="w-5 h-5" />,
    color: "from-fire to-brand-gold",
  },
  {
    href: "/community",
    label: "Community",
    description: "Join creators worldwide. Physical + digital gatherings",
    icon: <Users className="w-5 h-5" />,
    color: "from-crystal to-earth",
  },
  {
    href: "/academy/gate-quiz",
    label: "Which Guardian Are You?",
    description: "Take the quiz. Discover your creative nature",
    icon: <Compass className="w-5 h-5" />,
    color: "from-brand-primary to-fire",
  },
  {
    href: "/skills",
    label: "Arcanea Skills",
    description: "28 skills for Claude Code. Transform your practice",
    icon: <Zap className="w-5 h-5" />,
    color: "from-crystal to-brand-secondary",
  },
  {
    href: "https://github.com/frankxai/arcanea",
    label: "GitHub",
    description: "Open source. MIT License. Star & contribute",
    icon: <Github className="w-5 h-5" />,
    color: "from-white/20 to-white/5",
    external: true,
  },
  {
    href: "https://discord.gg/arcanea",
    label: "Discord",
    description: "Join the creator community. Daily discussions",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "from-[#5865F2] to-[#7289DA]",
    external: true,
  },
  {
    href: "/blog/arcanea-skills-system",
    label: "Blog",
    description: "Deep dives into Arcanea philosophy and systems",
    icon: <Newspaper className="w-5 h-5" />,
    color: "from-brand-secondary to-crystal",
  },
  {
    href: "https://open.spotify.com/artist/arcanea",
    label: "Arcanea Music",
    description: "Solfeggio-tuned soundscapes for creation",
    icon: <Music className="w-5 h-5" />,
    color: "from-[#1DB954] to-[#1ed760]",
    external: true,
  },
  {
    href: "https://frankx.ai",
    label: "FrankX.ai",
    description: "The creator behind Arcanea",
    icon: <Globe className="w-5 h-5" />,
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
            <ExternalLink className="flex-shrink-0 w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />

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
          <Heart className="w-3.5 h-3.5 text-fire" />
          <span>by</span>
          <Link href="https://frankx.ai" className="text-crystal hover:underline" target="_blank" rel="noopener noreferrer">
            FrankX
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-text-muted text-xs font-sans">
          <Star className="w-3 h-3 text-brand-gold" />
          <span>Powered by Arcanea Intelligence OS</span>
        </div>
      </div>
    </div>
  );
}
