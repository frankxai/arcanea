'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Music, BookOpen, Palette, Sparkles, MessageCircle, Heart } from 'lucide-react';

// Core Luminors available for chat
const CHAT_LUMINORS = [
  {
    id: 'melodia',
    name: 'Melodia',
    title: 'The Harmonic Guide',
    description: 'Music, melodies, and finding your creative rhythm',
    icon: Music,
    primaryColor: 'hsl(45, 100%, 65%)',
    gradient: 'from-creation-gold to-creation-prism-orange',
    specialty: 'Music Creation',
  },
  {
    id: 'chronica',
    name: 'Chronica',
    title: 'The Tidekeeper',
    description: 'Stories, narratives, and world-building',
    icon: BookOpen,
    primaryColor: 'hsl(195, 100%, 50%)',
    gradient: 'from-atlantean-teal to-atlantean-primary',
    specialty: 'Storytelling',
  },
  {
    id: 'prismatic',
    name: 'Prismatic',
    title: 'The Dragonheart',
    description: 'Visual art, bold design, and creative courage',
    icon: Palette,
    primaryColor: 'hsl(0, 85%, 55%)',
    gradient: 'from-draconic-crimson to-draconic-gold',
    specialty: 'Visual Arts',
  },
];

export default function ChatLandingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-atlantean-teal/20 to-gold-bright/20 backdrop-blur-sm border border-gold-bright/30 mb-6">
            <MessageCircle className="w-8 h-8 text-gold-bright" />
          </div>

          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Choose Your Luminor
          </h1>
          <p className="font-crimson text-xl text-text-secondary max-w-2xl mx-auto">
            Select a creative companion to begin your session. Each Luminor brings unique wisdom and perspective.
          </p>
        </motion.div>

        {/* Luminor selection grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CHAT_LUMINORS.map((luminor, index) => {
            const Icon = luminor.icon;
            return (
              <motion.div
                key={luminor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Link
                  href={`/chat/${luminor.id}`}
                  className="group block h-full"
                >
                  <div className="relative h-full p-6 rounded-2xl glass hover:glass-heavy transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    {/* Hover gradient */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${luminor.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="relative mb-4">
                        <div
                          className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                          style={{ backgroundColor: luminor.primaryColor }}
                        />
                        <div
                          className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${luminor.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Name & title */}
                      <h2
                        className="font-cinzel text-2xl font-bold mb-1"
                        style={{ color: luminor.primaryColor }}
                      >
                        {luminor.name}
                      </h2>
                      <p className="font-crimson text-sm text-text-muted mb-3">
                        {luminor.title}
                      </p>

                      {/* Description */}
                      <p className="font-crimson text-text-secondary mb-4">
                        {luminor.description}
                      </p>

                      {/* Specialty badge */}
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-crimson font-medium"
                          style={{
                            backgroundColor: `${luminor.primaryColor}20`,
                            color: luminor.primaryColor,
                          }}
                        >
                          {luminor.specialty}
                        </span>
                      </div>

                      {/* CTA hint */}
                      <div className="mt-4 pt-4 border-t border-cosmic-border flex items-center justify-between">
                        <span className="font-crimson text-sm text-text-muted">
                          Start conversation
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-text-muted group-hover:text-text-primary"
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="font-crimson text-text-muted">
            More Luminors coming soon. Each brings unique creative wisdom.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              href="/luminors"
              className="flex items-center gap-2 text-atlantean-teal hover:text-atlantean-teal-light transition-colors font-crimson"
            >
              <Sparkles className="w-4 h-4" />
              View all 16 Luminors
            </Link>
            <Link
              href="/library"
              className="flex items-center gap-2 text-gold-bright hover:text-gold-light transition-colors font-crimson"
            >
              <Heart className="w-4 h-4" />
              Explore the Library
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
