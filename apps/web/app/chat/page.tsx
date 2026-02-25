"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons - using lucide-react (to be replaced with Arcanea icon system when available)
import {
  Music,
  BookOpen,
  Palette,
  Sparkles,
  MessageCircle,
  Heart,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Core Luminors available for chat
const CHAT_LUMINORS = [
  {
    id: "melodia",
    name: "Melodia",
    title: "The Harmonic Guide",
    description: "Music, melodies, and finding your creative rhythm",
    icon: Music,
    primaryColor: "hsl(45, 100%, 65%)",
    gradient: "from-creation-gold to-creation-prism-orange",
    specialty: "Music Creation",
    accentClass: "from-gold/20 to-gold/5",
    borderHoverClass: "hover:border-gold/40",
    glowColor: "rgba(255,200,100,0.15)",
  },
  {
    id: "chronica",
    name: "Chronica",
    title: "The Tidekeeper",
    description: "Stories, narratives, and world-building",
    icon: BookOpen,
    primaryColor: "hsl(195, 100%, 50%)",
    gradient: "from-atlantean-teal to-atlantean-primary",
    specialty: "Storytelling",
    accentClass: "from-water/20 to-water/5",
    borderHoverClass: "hover:border-water/40",
    glowColor: "rgba(120,166,255,0.15)",
  },
  {
    id: "prismatic",
    name: "Prismatic",
    title: "The Dragonheart",
    description: "Visual art, bold design, and creative courage",
    icon: Palette,
    primaryColor: "hsl(0, 85%, 55%)",
    gradient: "from-draconic-crimson to-draconic-gold",
    specialty: "Visual Arts",
    accentClass: "from-fire/20 to-fire/5",
    borderHoverClass: "hover:border-fire/40",
    glowColor: "rgba(255,107,53,0.15)",
  },
];

// Loading skeleton component
function LuminorCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="glass rounded-2xl p-6 h-full">
        <div className="w-16 h-16 rounded-xl bg-white/5 mb-4" />
        <div className="h-7 w-32 bg-white/5 rounded mb-2" />
        <div className="h-4 w-24 bg-white/5 rounded mb-4" />
        <div className="h-4 w-full bg-white/5 rounded mb-2" />
        <div className="h-4 w-3/4 bg-white/5 rounded mb-4" />
        <div className="h-6 w-24 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

// Error state component
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-fire/10 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-fire" />
      </div>
      <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
        Unable to load Luminors
      </h3>
      <p className="text-text-secondary mb-6 font-body">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-brand-primary/30 text-brand-primary text-sm font-semibold hover:bg-brand-primary/10 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Try Again
        </button>
      )}
    </motion.div>
  );
}

export default function ChatLandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLuminorSelect = async (luminorId: string) => {
    setIsLoading(true);
    try {
      // Simulate quick load check
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.push(`/chat/${luminorId}`);
    } catch (err) {
      setError("Failed to initialize chat session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Hero badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
              Creation Session
            </span>
          </div>

          <h1 className="text-fluid-hero font-display font-bold mb-6 leading-none tracking-tight">
            Choose Your
            <span className="block text-gradient-brand">Luminor</span>
          </h1>

          <p className="text-fluid-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Select a creative companion to begin your session. Each Luminor
            brings unique wisdom and perspective to guide your creative journey.
          </p>
        </motion.div>

        {/* Loading overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-cosmic-void/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-brand-primary animate-spin mx-auto mb-4" />
              <p className="text-text-secondary font-body">
                Initializing session...
              </p>
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ErrorState message={error} onRetry={() => setError(null)} />
          </motion.div>
        )}

        {/* Luminor selection grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CHAT_LUMINORS.map((luminor, index) => {
            const Icon = luminor.icon;
            return (
              <motion.div
                key={luminor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <button
                  onClick={() => handleLuminorSelect(luminor.id)}
                  disabled={isLoading}
                  className={`group w-full text-left h-full ${luminor.borderHoverClass}`}
                >
                  <div className="relative h-full glass rounded-2xl p-8 overflow-hidden glow-card hover-lift transition-all duration-300">
                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse at 30% 30%, ${luminor.glowColor}, transparent 65%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="relative mb-6">
                        <div
                          className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                          style={{ backgroundColor: luminor.primaryColor }}
                        />
                        <div
                          className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${luminor.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Name & title */}
                      <h2
                        className="font-display text-2xl font-bold mb-1"
                        style={{ color: luminor.primaryColor }}
                      >
                        {luminor.name}
                      </h2>
                      <p className="font-mono text-sm text-text-muted mb-4">
                        {luminor.title}
                      </p>

                      {/* Description */}
                      <p className="text-text-secondary font-body mb-6 leading-relaxed">
                        {luminor.description}
                      </p>

                      {/* Specialty badge */}
                      <div className="flex items-center gap-2 mb-6">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
                          style={{
                            backgroundColor: `${luminor.primaryColor}20`,
                            color: luminor.primaryColor,
                            borderColor: `${luminor.primaryColor}30`,
                          }}
                        >
                          {luminor.specialty}
                        </span>
                      </div>

                      {/* CTA hint */}
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="font-body text-sm text-text-muted">
                          Start conversation
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-brand-primary"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-text-muted font-body mb-6">
            More Luminors coming soon. Each brings unique creative wisdom.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/luminors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-crystal/20 text-crystal text-sm font-semibold hover:bg-crystal/5 hover:border-crystal/40 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              View all 16 Luminors
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-text-secondary text-sm font-semibold hover:border-brand-primary/20 hover:text-text-primary transition-all"
            >
              <Heart className="w-4 h-4" />
              Explore the Library
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
