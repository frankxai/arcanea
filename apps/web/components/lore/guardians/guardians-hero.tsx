'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

export function GuardiansHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-atlantean-teal-aqua/10 via-transparent to-transparent" />

        {/* Floating orbs representing the 10 guardians */}
        {[...Array(10)].map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const radius = 300;
          const x = Math.cos(angle) * radius + 50;
          const y = Math.sin(angle) * radius + 50;

          return (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                background: `hsl(${i * 36}, 70%, 50%)`,
                boxShadow: `0 0 20px hsl(${i * 36}, 70%, 50%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-atlantean-teal-aqua/10 border border-atlantean-teal-aqua/20 mb-6"
        >
          <Shield className="w-4 h-4 text-atlantean-teal-aqua" />
          <span className="text-sm font-medium text-atlantean-teal-aqua">Keepers of the Gates</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-atlantean-teal-aqua via-white to-gold-bright bg-clip-text text-transparent">
            The Ten Guardians
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-text-secondary max-w-3xl mx-auto font-crimson italic mb-8"
        >
          "Ten Gates, ten paths, one destination. The destination is yourself, fully realized."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-text-muted font-mono tracking-wider"
        >
          — The Unity Teaching
        </motion.p>
      </div>
    </section>
  );
}
