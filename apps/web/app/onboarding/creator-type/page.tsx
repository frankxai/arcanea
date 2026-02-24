'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Music, BookOpen, Palette, Code, Film, Gamepad2, ArrowLeft, Sparkles } from 'lucide-react';

const CREATOR_TYPES = [
  {
    id: 'music',
    name: 'Music',
    icon: Music,
    description: 'Compose melodies, write lyrics, explore soundscapes',
    luminorId: 'melodia',
    gradient: 'from-creation-prism-orange to-creation-prism-yellow',
    color: 'text-creation-prism-orange',
  },
  {
    id: 'stories',
    name: 'Stories',
    icon: BookOpen,
    description: 'Craft narratives, build worlds, develop characters',
    luminorId: 'chronica',
    gradient: 'from-atlantean-teal to-atlantean-primary',
    color: 'text-atlantean-teal',
  },
  {
    id: 'art',
    name: 'Visual Art',
    icon: Palette,
    description: 'Design visuals, create concepts, imagine worlds',
    luminorId: 'prismatic',
    gradient: 'from-draconic-crimson to-draconic-gold',
    color: 'text-draconic-crimson',
  },
  {
    id: 'code',
    name: 'Code',
    icon: Code,
    description: 'Build software, architect systems, solve problems',
    luminorId: 'architect',
    gradient: 'from-creation-prism-blue to-creation-prism-purple',
    color: 'text-creation-prism-blue',
  },
  {
    id: 'video',
    name: 'Video',
    icon: Film,
    description: 'Edit films, create content, tell visual stories',
    luminorId: 'director',
    gradient: 'from-draconic-sky to-atlantean-primary',
    color: 'text-draconic-sky',
  },
  {
    id: 'games',
    name: 'Games',
    icon: Gamepad2,
    description: 'Design experiences, craft mechanics, build fun',
    luminorId: 'gamemaster',
    gradient: 'from-creation-prism-green to-atlantean-teal',
    color: 'text-creation-prism-green',
  },
];

export default function CreatorTypePage() {
  const router = useRouter();

  const handleSelect = (type: typeof CREATOR_TYPES[0]) => {
    // Store selection and redirect to meet Luminor
    localStorage.setItem('arcanea_creator_type', type.id);
    router.push(`/onboarding/meet-luminor/${type.luminorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6"
      >
        <Link
          href="/welcome"
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-crimson">Back</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-text-primary mb-4">
          What do you create?
        </h1>
        <p className="font-crimson text-xl text-text-secondary">
          Choose the path that calls to you
        </p>
      </motion.div>

      {/* Creator type grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
        {CREATOR_TYPES.map((type, index) => {
          const Icon = type.icon;
          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => handleSelect(type)}
              className="group relative p-6 rounded-2xl glass hover:glass-heavy transition-all duration-300 hover:scale-105 text-left"
            >
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className={`font-cinzel text-xl font-semibold mb-2 ${type.color} group-hover:text-text-primary transition-colors`}>
                  {type.name}
                </h3>

                <p className="font-crimson text-sm text-text-muted line-clamp-2">
                  {type.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explore all option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/luminors"
          className="flex items-center gap-2 text-text-muted hover:text-gold-bright transition-colors font-crimson"
        >
          <Sparkles className="w-4 h-4" />
          Not sure? Explore all Luminors
        </Link>
      </motion.div>
    </div>
  );
}
