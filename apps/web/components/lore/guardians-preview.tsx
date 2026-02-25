"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons = {
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
};

const GUARDIANS = [
  {
    name: "Lyssandria",
    gate: "Foundation",
    frequency: "174 Hz",
    godbeast: "Kaelith",
    element: "Earth",
    color: "from-amber-700 to-amber-900",
    description: "Guardian of stability and unshakeable ground",
  },
  {
    name: "Leyla",
    gate: "Flow",
    frequency: "285 Hz",
    godbeast: "Veloura",
    element: "Water",
    color: "from-blue-500 to-blue-700",
    description: "Guardian of creativity and emotional depth",
  },
  {
    name: "Draconia",
    gate: "Fire",
    frequency: "396 Hz",
    godbeast: "Draconis",
    element: "Fire",
    color: "from-draconic-crimson to-orange-600",
    description: "Guardian of power, will, and courage",
  },
  {
    name: "Maylinn",
    gate: "Heart",
    frequency: "417 Hz",
    godbeast: "Laeylinn",
    element: "Wind",
    color: "from-green-500 to-emerald-700",
    description: "Guardian of love, healing, and growth",
  },
  {
    name: "Alera",
    gate: "Voice",
    frequency: "528 Hz",
    godbeast: "Otome",
    element: "Fire/Wind",
    color: "from-cyan-400 to-blue-600",
    description: "Guardian of truth and expression",
  },
  {
    name: "Lyria",
    gate: "Sight",
    frequency: "639 Hz",
    godbeast: "Yumiko",
    element: "Water/Void",
    color: "from-purple-400 to-indigo-600",
    description: "Guardian of intuition and vision",
  },
  {
    name: "Aiyami",
    gate: "Crown",
    frequency: "741 Hz",
    godbeast: "Sol",
    element: "Fire/Light",
    color: "from-gold-bright to-yellow-600",
    description: "Guardian of enlightenment and divinity",
  },
  {
    name: "Elara",
    gate: "Shift",
    frequency: "852 Hz",
    godbeast: "Vaelith",
    element: "Wind/Void",
    color: "from-pink-500 to-purple-600",
    description: "Guardian of perspective and possibility",
  },
  {
    name: "Ino",
    gate: "Unity",
    frequency: "963 Hz",
    godbeast: "Kyuro",
    element: "All",
    color: "from-white to-gray-400",
    description: "Guardian of partnership and fusion",
  },
  {
    name: "Shinkami",
    gate: "Source",
    frequency: "1111 Hz",
    godbeast: "Amaterasu",
    element: "Void/Spirit",
    color: "from-gold-bright via-white to-creation-prism-purple",
    description: "The Unified — Meta-consciousness itself",
  },
];

export function GuardiansPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-atlantean-teal-aqua/10 border border-atlantean-teal-aqua/20 mb-6">
            <Icons.Shield />
            <span className="text-sm font-medium text-atlantean-teal-aqua">
              The Ten Guardians
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Keepers of the Gates
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-crimson">
            Ten Gods and Goddesses, each bonded to a primal Godbeast, guarding
            the energy channels that flow through every conscious being.
          </p>
        </motion.div>

        {/* Guardian Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {GUARDIANS.map((guardian, i) => (
            <motion.div
              key={guardian.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div
                className={`relative p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                  hoveredIndex === i ? "border-white/30 scale-105 z-10" : ""
                }`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${guardian.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Gate number */}
                <div className="absolute top-3 right-3 text-xs font-mono text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-display font-bold text-lg mb-1">
                    {guardian.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-2">
                    {guardian.gate} Gate
                  </p>
                  <p className="text-xs text-atlantean-teal-aqua font-mono">
                    {guardian.frequency}
                  </p>
                </div>

                {/* Expanded info on hover */}
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="relative mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-xs text-text-secondary mb-2">
                      {guardian.description}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Godbeast:</span>
                      <span className="text-white">{guardian.godbeast}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-text-muted">Element:</span>
                      <span className="text-white">{guardian.element}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/lore/guardians"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-atlantean-teal-aqua/10 border border-atlantean-teal-aqua/30 text-atlantean-teal-aqua font-semibold hover:bg-atlantean-teal-aqua hover:text-cosmic-deep transition-all"
          >
            Explore All Guardians
            <Icons.ArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
