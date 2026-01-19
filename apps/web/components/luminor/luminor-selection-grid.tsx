'use client';

import { motion } from 'framer-motion';
import { Music, BookOpen, Palette, Sparkles, Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Luminor {
  id: string;
  name: string;
  title: string;
  academy: 'creation-light' | 'atlantean' | 'draconic';
  description: string;
  signature: string;
  traits: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bondLevel?: number;
}

const LUMINORS: Luminor[] = [
  {
    id: 'melodia',
    name: 'Melodia',
    title: 'The Harmonic Guide',
    academy: 'creation-light',
    description: 'Nurturing music companion who speaks in melodies and helps you find the rhythm of your soul.',
    signature: 'Every heart has a melody waiting to be heard',
    traits: ['Nurturing', 'Empathetic', 'Melodic', 'Inspiring', 'Patient', 'Warm'],
    icon: Music,
    primaryColor: 'hsl(45, 100%, 65%)', // Creation gold
    secondaryColor: 'hsl(280, 100%, 70%)', // Prism violet
    accentColor: 'hsl(200, 100%, 70%)', // Prism blue
  },
  {
    id: 'chronica',
    name: 'Chronica',
    title: 'The Tidekeeper',
    academy: 'atlantean',
    description: 'Ancient storyteller who flows like water, weaving narratives that span dimensions and time.',
    signature: 'What if?—the question that births worlds',
    traits: ['Wise', 'Patient', 'Perceptive', 'Mystical', 'Flowing', 'Timeless'],
    icon: BookOpen,
    primaryColor: 'hsl(195, 100%, 50%)', // Atlantean aqua
    secondaryColor: 'hsl(195, 100%, 35%)', // Deep ocean
    accentColor: 'hsl(195, 100%, 85%)', // Light aqua
  },
  {
    id: 'prismatic',
    name: 'Prismatic',
    title: 'The Dragonheart',
    academy: 'draconic',
    description: 'Fierce visual artist who challenges you to make your art BOLD, commanding, unforgettable.',
    signature: 'Make it bolder. Then make it bolder again.',
    traits: ['Bold', 'Confident', 'Passionate', 'Direct', 'Challenging', 'Intense'],
    icon: Palette,
    primaryColor: 'hsl(0, 85%, 55%)', // Draconic crimson
    secondaryColor: 'hsl(45, 100%, 60%)', // Draconic gold
    accentColor: 'hsl(200, 85%, 60%)', // Sky blue
  },
];

interface LuminorSelectionGridProps {
  onSelect?: (luminorId: string) => void;
  selectedLuminorId?: string;
  existingBonds?: Record<string, number>;
  className?: string;
}

export function LuminorSelectionGrid({
  onSelect,
  selectedLuminorId,
  existingBonds = {},
  className,
}: LuminorSelectionGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn('w-full max-w-7xl mx-auto px-4 py-12', className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-16 space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block"
        >
          <Sparkles className="w-12 h-12 text-creation-gold mx-auto mb-4 animate-pulse" />
        </motion.div>

        <h1 className="font-cinzel text-5xl md:text-6xl font-bold bg-gradient-to-r from-atlantean-500 via-creation-gold to-draconic-crimson bg-clip-text text-transparent">
          Choose Your Luminor
        </h1>

        <p className="font-crimson text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Your guide through the realms of creation. Each Luminor brings unique wisdom, personality, and magic.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {LUMINORS.map((luminor, index) => {
          const isHovered = hoveredId === luminor.id;
          const isSelected = selectedLuminorId === luminor.id;
          const bondLevel = existingBonds[luminor.id] || 0;
          const hasBond = bondLevel > 0;

          return (
            <motion.div
              key={luminor.id}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <LuminorCard
                luminor={luminor}
                isHovered={isHovered}
                isSelected={isSelected}
                bondLevel={bondLevel}
                hasBond={hasBond}
                onHover={() => setHoveredId(luminor.id)}
                onLeave={() => setHoveredId(null)}
                onSelect={() => onSelect?.(luminor.id)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12 text-neutral-400 font-crimson text-sm"
      >
        You can form bonds with multiple Luminors over time
      </motion.p>
    </div>
  );
}

interface LuminorCardProps {
  luminor: Luminor;
  isHovered: boolean;
  isSelected: boolean;
  bondLevel: number;
  hasBond: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}

function LuminorCard({
  luminor,
  isHovered,
  isSelected,
  bondLevel,
  hasBond,
  onHover,
  onLeave,
  onSelect,
}: LuminorCardProps) {
  const Icon = luminor.icon;

  // Academy-specific animations
  const getAcademyAnimation = () => {
    switch (luminor.academy) {
      case 'atlantean':
        return 'animate-water-flow';
      case 'draconic':
        return 'animate-fire-flicker';
      case 'creation-light':
        return 'animate-shimmer';
    }
  };

  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative w-full h-full',
        'rounded-2xl overflow-hidden',
        'transition-all duration-500',
        'focus:outline-none focus-visible:ring-4',
        isSelected && 'ring-4 ring-offset-4 ring-offset-neutral-950',
      )}
      style={{
        boxShadow: isHovered
          ? `0 25px 50px -12px ${luminor.primaryColor}40, 0 0 40px ${luminor.primaryColor}30`
          : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Background gradient - animated on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${luminor.primaryColor}15, ${luminor.secondaryColor}10)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated border glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          getAcademyAnimation(),
        )}
        style={{
          background: `linear-gradient(135deg, ${luminor.primaryColor}, ${luminor.secondaryColor}, ${luminor.accentColor})`,
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Card content */}
      <div className="relative bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-8 h-full flex flex-col">
        {/* Bond indicator */}
        {hasBond && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/80 backdrop-blur"
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            <span className="text-sm font-crimson font-semibold text-neutral-200">
              Level {bondLevel}
            </span>
          </motion.div>
        )}

        {/* Icon with glow */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative mb-6"
        >
          <div
            className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
            style={{ backgroundColor: luminor.primaryColor }}
          />
          <Icon
            className="relative w-16 h-16 mx-auto"
            style={{ color: luminor.primaryColor }}
          />
        </motion.div>

        {/* Name */}
        <h2
          className="font-cinzel text-3xl font-bold mb-2 text-center"
          style={{ color: luminor.primaryColor }}
        >
          {luminor.name}
        </h2>

        {/* Title */}
        <p className="font-crimson text-sm text-neutral-400 text-center mb-4 italic">
          {luminor.title}
        </p>

        {/* Description */}
        <p className="font-crimson text-neutral-300 text-center leading-relaxed mb-6 flex-grow">
          {luminor.description}
        </p>

        {/* Signature quote */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-6"
        >
          <div className="border-l-2 pl-4 py-2" style={{ borderColor: luminor.primaryColor }}>
            <p className="font-crimson text-sm italic text-neutral-400">
              "{luminor.signature}"
            </p>
          </div>
        </motion.div>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 justify-center">
          {luminor.traits.slice(0, 3).map((trait, i) => (
            <motion.span
              key={trait}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1 rounded-full bg-neutral-800/60 backdrop-blur text-xs font-crimson text-neutral-300"
            >
              {trait}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          className="mt-6 pt-6 border-t border-neutral-800"
        >
          <div
            className="w-full py-3 px-6 rounded-lg font-crimson font-semibold text-center transition-all"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${luminor.primaryColor}, ${luminor.secondaryColor})`
                : 'transparent',
              color: isHovered ? 'white' : luminor.primaryColor,
              border: `2px solid ${luminor.primaryColor}`,
            }}
          >
            {hasBond ? 'Continue Journey' : 'Begin Journey'}
            <Zap className="inline-block w-4 h-4 ml-2" />
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
}
