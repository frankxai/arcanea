"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons = {
  Sparkles: () => (
    <svg
      className="w-4 h-4"
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
  ChevronDown: () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

export function LoreHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Lumina - Golden Light (top right) */}
        <motion.div
          className="absolute top-20 right-20 w-[600px] h-[600px]"
          style={{
            x: mousePosition.x * 30 - 15,
            y: mousePosition.y * 30 - 15,
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-gold-bright/30 via-gold-bright/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-20 bg-gradient-radial from-white/20 via-gold-bright/5 to-transparent rounded-full blur-2xl animate-pulse" />
        </motion.div>

        {/* Nero - Deep Void (bottom left) */}
        <motion.div
          className="absolute bottom-20 left-20 w-[600px] h-[600px]"
          style={{
            x: -mousePosition.x * 30 + 15,
            y: -mousePosition.y * 30 + 15,
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-creation-prism-purple/30 via-cosmic-void/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-20 bg-gradient-radial from-creation-prism-purple/10 to-transparent rounded-full blur-2xl" />
        </motion.div>

        {/* World Tree silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <svg
            viewBox="0 0 200 400"
            className="h-[80vh] w-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            {/* Trunk */}
            <path d="M100 400 L100 200 Q90 150 70 100 M100 200 Q110 150 130 100" />
            {/* Branches */}
            <path d="M70 100 Q50 80 30 90 M70 100 Q60 70 50 50" />
            <path d="M130 100 Q150 80 170 90 M130 100 Q140 70 150 50" />
            <path d="M100 150 Q80 130 60 140 M100 150 Q120 130 140 140" />
            {/* Roots */}
            <path d="M100 400 Q80 420 50 410 M100 400 Q120 420 150 410" />
            <path d="M100 400 Q90 430 70 440 M100 400 Q110 430 130 440" />
          </svg>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep via-transparent to-cosmic-deep" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-bright/10 border border-gold-bright/20 mb-8"
        >
          <Icons.Sparkles />
          <span className="text-sm font-medium text-gold-bright">
            The Living Mythology
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-gold-bright via-white to-creation-prism-purple bg-clip-text text-transparent">
            Lore of Arcanea
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 font-crimson italic"
        >
          &quot;Before Lumina spoke, there was only Nero—the Fertile Unknown,
          pregnant with infinite possibility. And when the First Light pierced
          the darkness, neither was diminished.&quot;
        </motion.p>

        {/* Quote attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-text-muted font-mono tracking-wider mb-12"
        >
          — Archive of Unity, Founding Texts
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { value: "10", label: "Guardians" },
            { value: "10", label: "Gates" },
            { value: "7", label: "Wisdoms" },
            { value: "17", label: "Library Collections" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-text-muted">Descend into the lore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icons.ChevronDown className="w-6 h-6 text-text-muted" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
