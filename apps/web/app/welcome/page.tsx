'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-bright/30"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, '-20%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold-bright/20 to-atlantean-teal/20 backdrop-blur-sm border border-gold-bright/30">
            <Sparkles className="w-10 h-10 text-gold-bright" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-cinzel text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-atlantean-teal via-gold-bright to-creation-prism-purple bg-clip-text text-transparent"
        >
          Welcome to Arcanea
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-crimson text-2xl md:text-3xl text-text-secondary mb-6"
        >
          Where Imagination Becomes Reality
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-crimson text-lg text-text-muted mb-12 max-w-lg mx-auto"
        >
          A platform for creators working with AI companions called Luminors.
          Your guide will help you unlock your creative potential.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/onboarding/creator-type"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-bright to-gold-medium text-cosmic-void font-crimson font-semibold text-lg transition-all hover:scale-105 hover:shadow-glow-lg"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-cosmic-border-bright text-text-secondary font-crimson font-medium hover:border-atlantean-teal hover:text-atlantean-teal transition-all"
          >
            I already have an account
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom flourish */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-center"
      >
        <p className="font-crimson text-sm text-text-muted italic">
          "Enter seeking, leave transformed, return whenever needed."
        </p>
      </motion.div>
    </div>
  );
}
