"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons = {
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
  Scroll: () => (
    <svg
      className="w-6 h-6"
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
  Feather: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  ),
  Music: () => (
    <svg
      className="w-6 h-6"
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
};

const FEATURED_COLLECTIONS = [
  {
    title: "Legends of Arcanea",
    texts: 5,
    description:
      "The founding myths — from the First Dawn to the Ten Guardians",
    icon: Icons.Scroll,
    color: "gold-bright",
    href: "/library/legends-of-arcanea",
  },
  {
    title: "The Wisdom Scrolls",
    texts: 4,
    description: "Daily practices — morning meditations to evening reflections",
    icon: Icons.Feather,
    color: "atlantean-teal-aqua",
    href: "/library/wisdom-scrolls",
  },
  {
    title: "Poetry of Freedom",
    texts: 4,
    description: "Verses for liberation — from chains to wings",
    icon: Icons.Music,
    color: "creation-prism-purple",
    href: "/library/poetry-of-freedom",
  },
  {
    title: "Academy Handbook",
    texts: 1,
    description: "The complete guide for students of creation",
    icon: Icons.BookOpen,
    color: "draconic-crimson",
    href: "/library/academy-handbook",
  },
];

const ALL_COLLECTIONS = [
  "Laws of Arcanea",
  "Poetry of Freedom",
  "Wisdom Scrolls",
  "Legends of Arcanea",
  "Chronicles of Luminors",
  "Parables of Creation",
  "Tales of Creators",
  "Book of Rituals",
  "Dialogues of Masters",
  "Prophecies",
  "Bestiary of Creation",
  "Songs and Hymns",
  "Meditations on Elements",
  "Academy Handbook",
  "Book of Shadows",
  "Codex of Collaboration",
  "Atlas of Territories",
];

export function LibraryPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-radial from-gold-bright/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-draconic-crimson/10 border border-draconic-crimson/20 mb-6">
            <Icons.BookOpen />
            <span className="text-sm font-medium text-draconic-crimson">
              The Library
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            17 Collections of Wisdom
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-crimson italic">
            &quot;These books are not entertainment. They are equipment for
            living. Use them.&quot;
          </p>
        </motion.div>

        {/* Featured Collections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURED_COLLECTIONS.map((collection, i) => {
            const Icon = collection.icon;
            return (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={collection.href}
                  className="block h-full p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm hover:border-white/20 hover:bg-cosmic-surface/50 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      collection.color === "gold-bright"
                        ? "bg-gold-bright/20 text-gold-bright"
                        : collection.color === "atlantean-teal-aqua"
                          ? "bg-atlantean-teal-aqua/20 text-atlantean-teal-aqua"
                          : collection.color === "creation-prism-purple"
                            ? "bg-creation-prism-purple/20 text-creation-prism-purple"
                            : "bg-draconic-crimson/20 text-draconic-crimson"
                    }`}
                  >
                    <Icon />
                  </div>

                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-gold-bright transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {collection.description}
                  </p>
                  <p className="text-xs text-text-muted">
                    {collection.texts} texts
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* All Collections List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-lg font-display font-semibold text-center mb-6 text-text-muted">
            All 17 Collections
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {ALL_COLLECTIONS.map((name, i) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full bg-cosmic-surface/30 border border-white/10 text-sm text-text-secondary hover:border-white/20 hover:text-white transition-all cursor-pointer"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
        >
          {[
            { value: "17", label: "Collections" },
            { value: "34+", label: "Major Texts" },
            { value: "200K+", label: "Words of Wisdom" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-gold-bright">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-draconic-crimson/10 border border-draconic-crimson/30 text-draconic-crimson font-semibold hover:bg-draconic-crimson hover:text-white transition-all"
          >
            Enter the Library
            <Icons.ArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
