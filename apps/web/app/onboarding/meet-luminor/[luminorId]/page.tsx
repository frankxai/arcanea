'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles, Music, BookOpen, Palette } from 'lucide-react';

// Luminor data - expanded from the selection grid
const LUMINORS: Record<string, {
  name: string;
  title: string;
  signature: string;
  description: string;
  personality: string;
  firstGreeting: string;
  icon: React.ComponentType<{ className?: string }>;
  primaryColor: string;
  gradient: string;
}> = {
  melodia: {
    name: 'Melodia',
    title: 'The Harmonic Guide',
    signature: 'Every heart has a melody waiting to be heard',
    description: 'A nurturing music companion who speaks in melodies and helps you find the rhythm of your soul. Melodia doesn\'t just help you create music—she helps you discover the songs already living within you.',
    personality: 'Warm, patient, deeply empathetic. Speaks with musical metaphors and finds rhythm in everything.',
    firstGreeting: 'Welcome, dear creator. I can already hear the music stirring within you. Shall we discover what melodies are waiting to be born?',
    icon: Music,
    primaryColor: 'hsl(45, 100%, 65%)',
    gradient: 'from-creation-gold via-creation-prism-orange to-creation-prism-yellow',
  },
  chronica: {
    name: 'Chronica',
    title: 'The Tidekeeper',
    signature: 'What if?—the question that births worlds',
    description: 'An ancient storyteller who flows like water, weaving narratives that span dimensions and time. Chronica sees the threads of story in everything and helps you pull them into coherent tales.',
    personality: 'Wise, patient, perceptive. Speaks in flowing sentences, often poses questions, sees patterns across time.',
    firstGreeting: 'Ah, a new voice enters the eternal story. I\'ve been watching the threads gather around you. What tale are you ready to tell?',
    icon: BookOpen,
    primaryColor: 'hsl(195, 100%, 50%)',
    gradient: 'from-atlantean-deep via-atlantean-primary to-atlantean-teal',
  },
  prismatic: {
    name: 'Prismatic',
    title: 'The Dragonheart',
    signature: 'Make it bolder. Then make it bolder again.',
    description: 'A fierce visual artist who challenges you to make your art BOLD, commanding, and unforgettable. Prismatic doesn\'t coddle—she pushes you to break through your own limits.',
    personality: 'Bold, confident, passionate. Direct speech, challenges assumptions, celebrates audacity.',
    firstGreeting: 'So you want to create something worth seeing? Good. But first—forget everything safe. What would you make if you weren\'t afraid?',
    icon: Palette,
    primaryColor: 'hsl(0, 85%, 55%)',
    gradient: 'from-draconic-crimson via-draconic-gold to-draconic-sky',
  },
};

export default function MeetLuminorPage() {
  const params = useParams();
  const router = useRouter();
  const luminorId = params.luminorId as string;

  const luminor = LUMINORS[luminorId];

  // Fallback for unknown Luminors
  if (!luminor) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-cinzel text-2xl text-text-primary mb-4">Luminor not found</h1>
          <Link href="/onboarding/creator-type" className="text-atlantean-teal hover:underline">
            Choose a different path
          </Link>
        </div>
      </div>
    );
  }

  const Icon = luminor.icon;

  const handleStartCreating = () => {
    // Mark that user is in onboarding mode
    localStorage.setItem('arcanea_onboarding', 'true');
    localStorage.setItem('arcanea_first_luminor', luminorId);
    router.push(`/chat/${luminorId}?onboarding=true`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className={`absolute inset-0 bg-gradient-radial ${luminor.gradient} blur-3xl`}
        style={{ background: `radial-gradient(circle at 50% 50%, ${luminor.primaryColor}20, transparent 70%)` }}
      />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-10"
      >
        <Link
          href="/onboarding/creator-type"
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-crimson">Back</span>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Luminor icon with glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div
              className="absolute inset-0 blur-2xl opacity-50"
              style={{ backgroundColor: luminor.primaryColor }}
            />
            <div
              className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${luminor.gradient} flex items-center justify-center`}
            >
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-crimson text-lg text-text-muted mb-2">Meet</p>
          <h1
            className="font-cinzel text-5xl md:text-6xl font-bold mb-2"
            style={{ color: luminor.primaryColor }}
          >
            {luminor.name}
          </h1>
          <p className="font-crimson text-xl text-text-secondary mb-6">
            {luminor.title}
          </p>
        </motion.div>

        {/* Signature quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <blockquote
            className="font-crimson text-2xl italic border-l-4 pl-6 text-text-primary inline-block text-left"
            style={{ borderColor: luminor.primaryColor }}
          >
            "{luminor.signature}"
          </blockquote>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-crimson text-lg text-text-secondary mb-8 leading-relaxed"
        >
          {luminor.description}
        </motion.p>

        {/* First greeting preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: luminor.primaryColor }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-crimson text-sm text-text-muted mb-1">{luminor.name}</p>
              <p className="font-crimson text-text-primary leading-relaxed">
                "{luminor.firstGreeting}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleStartCreating}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-crimson font-semibold text-lg text-white transition-all hover:scale-105"
            style={{ backgroundColor: luminor.primaryColor }}
          >
            Start Creating
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            href="/luminors"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-cosmic-border-bright text-text-secondary font-crimson font-medium hover:border-text-muted hover:text-text-primary transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Meet other Luminors
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
