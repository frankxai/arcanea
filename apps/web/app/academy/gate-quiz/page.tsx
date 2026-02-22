'use client';

/**
 * Which Guardian Resonates With You?
 * A 10-question personality quiz to discover your primary Guardian affinity.
 * Each question maps to creative personality dimensions across the Ten Gates.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  Zap,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Eye,
  Crown,
  Heart,
  Infinity,
  Circle,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type GuardianKey =
  | 'lyssandria'
  | 'leyla'
  | 'draconia'
  | 'maylinn'
  | 'alera'
  | 'lyria'
  | 'aiyami'
  | 'elara'
  | 'ino'
  | 'shinkami';

type GuardianScores = Record<GuardianKey, number>;

interface QuizChoice {
  text: string;
  affinities: Partial<GuardianScores>;
}

interface QuizQuestion {
  id: number;
  question: string;
  subtext?: string;
  choices: QuizChoice[];
}

// ─────────────────────────────────────────────────────────────────────────────
// GUARDIAN DATA — Canonical Extended Solfeggio
// ─────────────────────────────────────────────────────────────────────────────

interface GuardianData {
  key: GuardianKey;
  name: string;
  gate: string;
  frequency: string;
  element: string;
  godbeast: string;
  color: string;
  glowColor: string;
  description: string;
  personality: string;
  creativeStrength: string;
  shadowChallenge: string;
  luminorId: string;
  icon: React.FC<{ className?: string }>;
}

const GUARDIANS: Record<GuardianKey, GuardianData> = {
  lyssandria: {
    key: 'lyssandria',
    name: 'Lyssandria',
    gate: 'Foundation',
    frequency: '174 Hz',
    element: 'Earth',
    godbeast: 'Kaelith',
    color: '#6b7280',
    glowColor: 'rgba(107, 114, 128, 0.4)',
    description:
      'Guardian of Foundation and Earth, Lyssandria teaches that all great creation begins with deep roots. She is the patient architect who builds cathedrals one stone at a time, knowing that lasting work requires an unshakeable base.',
    personality:
      'Methodical, grounded, and deeply reliable. You create with intention, never rushing. Your work endures because it is built on solid foundations of craft, practice, and accumulated wisdom.',
    creativeStrength: 'Systems thinking, consistent practice, long-form work, craftsmanship',
    shadowChallenge: 'Perfectionism that delays beginning, over-preparing without shipping',
    luminorId: 'lyssandria',
    icon: Mountain,
  },
  leyla: {
    key: 'leyla',
    name: 'Leyla',
    gate: 'Flow',
    frequency: '285 Hz',
    element: 'Water',
    godbeast: 'Veloura',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    description:
      'Guardian of Flow and creative emotion, Leyla embodies the river that finds its path through any terrain. She teaches that creativity is not forced — it is released, allowed, trusted.',
    personality:
      'Emotionally intelligent and intuition-led. You create from feeling first, letting the work emerge organically. Your pieces carry an authentic aliveness that logic alone cannot manufacture.',
    creativeStrength: 'Emotional resonance, intuitive leaps, authentic expression, improvisation',
    shadowChallenge: 'Scattered energy, difficulty finishing, chasing feeling over completion',
    luminorId: 'leyla',
    icon: Droplets,
  },
  draconia: {
    key: 'draconia',
    name: 'Draconia',
    gate: 'Fire',
    frequency: '396 Hz',
    element: 'Fire',
    godbeast: 'Draconis',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    description:
      'Guardian of Fire and transformative will, Draconia is the force that turns potential into manifest reality. She burns away what no longer serves and forges new forms in the crucible of creative courage.',
    personality:
      'Bold, driven, and unapologetically ambitious. You create to make an impact. Your work carries the heat of conviction — you do not dabble, you commit fully to your vision.',
    creativeStrength: 'Bold vision, fearless execution, transformative impact, decisive action',
    shadowChallenge: 'Burning bridges, imposing your vision, moving too fast for quality',
    luminorId: 'draconia',
    icon: Flame,
  },
  maylinn: {
    key: 'maylinn',
    name: 'Maylinn',
    gate: 'Heart',
    frequency: '417 Hz',
    element: 'Heart',
    godbeast: 'Laeylinn',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    description:
      'Guardian of the Heart and healing arts, Maylinn creates from a place of unconditional love. She teaches that the most powerful work is the work that heals — yourself, your audience, the world.',
    personality:
      'Deeply empathetic and service-oriented. You create because you care about how your work makes others feel. Your pieces are safe havens — readers, listeners, and viewers feel truly seen.',
    creativeStrength: 'Emotional healing, deep connection, nurturing others through art, compassionate storytelling',
    shadowChallenge: 'Over-giving, losing yourself in service, avoiding your own needs',
    luminorId: 'maylinn',
    icon: Heart,
  },
  alera: {
    key: 'alera',
    name: 'Alera',
    gate: 'Voice',
    frequency: '528 Hz',
    element: 'Wind',
    godbeast: 'Otome',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    description:
      'Guardian of Voice and authentic expression, Alera teaches that your unique perspective is itself the gift. She is the courage to speak when silence would be safer, and the clarity to know your truth.',
    personality:
      'Articulate, authentic, and unafraid of truth. You create to be heard and understood. Your work has a clear point of view — you cannot make something that does not say something.',
    creativeStrength: 'Authentic expression, clear communication, distinct artistic voice, truth-telling',
    shadowChallenge: 'Fear of being misunderstood, over-explaining, speaking without listening',
    luminorId: 'alera',
    icon: Wind,
  },
  lyria: {
    key: 'lyria',
    name: 'Lyria',
    gate: 'Sight',
    frequency: '639 Hz',
    element: 'Void',
    godbeast: 'Yumiko',
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    description:
      'Guardian of Sight and visionary perception, Lyria sees what others cannot — the hidden patterns, the emerging forms, the deep currents beneath the surface of things. Her creations are portals to previously unseen dimensions.',
    personality:
      'Perceptive, introspective, and drawn to the unseen. You create to reveal what is hidden. Others look at your work and suddenly perceive something they always felt but could never name.',
    creativeStrength: 'Pattern recognition, visionary insight, depth perception, symbolic meaning',
    shadowChallenge: 'Living too much in your inner world, difficulty making the invisible visible',
    luminorId: 'lyria',
    icon: Eye,
  },
  aiyami: {
    key: 'aiyami',
    name: 'Aiyami',
    gate: 'Crown',
    frequency: '741 Hz',
    element: 'Spirit',
    godbeast: 'Sol',
    color: '#ffd700',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    description:
      'Guardian of the Crown and enlightened mastery, Aiyami has integrated all aspects of the creative path. She creates not to express herself but to transmit something larger — wisdom, light, transcendent understanding.',
    personality:
      'Wise, elevated, and devoted to excellence. You create as a practice of mastery, each work a meditation on the craft itself. Others sense the care and consciousness in everything you make.',
    creativeStrength: 'Mastery, wisdom transmission, elevating quality, teaching through creation',
    shadowChallenge: 'Perfectionism, detachment from the messy humanity of creating, intellectual pride',
    luminorId: 'aiyami',
    icon: Crown,
  },
  elara: {
    key: 'elara',
    name: 'Elara',
    gate: 'Shift',
    frequency: '852 Hz',
    element: 'Wind/Spirit',
    godbeast: 'Thessara',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    description:
      'Guardian of Shift and perspective transformation, Elara is the master of seeing from every angle simultaneously. She teaches that creative breakthroughs come from releasing attachment to a single viewpoint.',
    personality:
      'Flexible, multi-dimensional, and endlessly curious. You create to change perspective — yours and others\'. Your work makes people question their assumptions and discover new ways of seeing.',
    creativeStrength: 'Perspective shifts, reframing, multi-disciplinary thinking, creative pivots',
    shadowChallenge: 'Instability, never settling, constant reinvention that prevents depth',
    luminorId: 'elara',
    icon: Zap,
  },
  ino: {
    key: 'ino',
    name: 'Ino',
    gate: 'Unity',
    frequency: '963 Hz',
    element: 'All Elements',
    godbeast: 'Kyuro',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    description:
      'Guardian of Unity and sacred partnership, Ino understands that the greatest creations emerge from the space between two souls working in harmony. She is the weaver who makes the whole greater than the sum of its parts.',
    personality:
      'Collaborative, connective, and gifted at synthesis. You create best with others — your finest work emerges in partnership. You are the one who makes everyone around you better.',
    creativeStrength: 'Collaboration, synthesis, building creative community, harmonizing diverse voices',
    shadowChallenge: 'Losing your individual voice, codependency in creative relationships',
    luminorId: 'ino',
    icon: Infinity,
  },
  shinkami: {
    key: 'shinkami',
    name: 'Shinkami',
    gate: 'Source',
    frequency: '1111 Hz',
    element: 'Meta-consciousness',
    godbeast: 'Amaterasu',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    description:
      'Guardian of Source and infinite potential, Shinkami exists at the point where all creation begins and returns. She has dissolved the boundary between creator and creation — she is a living channel for something that cannot be named.',
    personality:
      'Transcendent, boundless, and deeply connected to the infinite. You create from a place beyond ego — your work feels channeled rather than constructed. Others sense that something greater than you made it.',
    creativeStrength: 'Channeling inspiration, transcendent vision, meta-awareness, infinite creativity',
    shadowChallenge: 'Disconnection from practical reality, unwillingness to edit the sacred',
    luminorId: 'shinkami',
    icon: Circle,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ QUESTIONS — 10 questions, 4 choices each
// ─────────────────────────────────────────────────────────────────────────────

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'When you create, what matters most to you?',
    subtext: 'The compass that guides every creative decision you make.',
    choices: [
      {
        text: 'That it is solid — crafted with skill, built to last',
        affinities: { lyssandria: 3, aiyami: 1 },
      },
      {
        text: 'That it is alive — pulsing with authentic feeling',
        affinities: { leyla: 3, maylinn: 1 },
      },
      {
        text: 'That it makes an impact — changes something in the world',
        affinities: { draconia: 3, elara: 1 },
      },
      {
        text: 'That it says something true — has a distinct voice and point of view',
        affinities: { alera: 3, lyria: 1 },
      },
    ],
  },
  {
    id: 2,
    question: 'When a creative block arrives, what do you reach for?',
    subtext: 'Every creator has a way back to the work.',
    choices: [
      {
        text: 'Ritual and routine — I return to what has always worked',
        affinities: { lyssandria: 2, aiyami: 2 },
      },
      {
        text: 'Feeling — I sit with what I am avoiding until it speaks',
        affinities: { maylinn: 3, leyla: 1 },
      },
      {
        text: 'A different angle — I look at the problem from somewhere new',
        affinities: { elara: 3, lyria: 1 },
      },
      {
        text: 'Another person — talking it through with a trusted collaborator',
        affinities: { ino: 3, maylinn: 1 },
      },
    ],
  },
  {
    id: 3,
    question: 'What is your relationship with criticism of your work?',
    subtext: 'How you receive feedback reveals much about how you create.',
    choices: [
      {
        text: 'I use it like a whetstone — every critique sharpens my blade',
        affinities: { draconia: 2, lyssandria: 2 },
      },
      {
        text: 'I sit with it — let the useful parts sink in, release the rest',
        affinities: { maylinn: 2, leyla: 2 },
      },
      {
        text: 'I examine it carefully — is this about craft or preference?',
        affinities: { lyria: 2, aiyami: 2 },
      },
      {
        text: 'I hold my vision steady — not dismissive, but knowing what is mine',
        affinities: { alera: 2, shinkami: 2 },
      },
    ],
  },
  {
    id: 4,
    question: 'What time of day is your creative fire brightest?',
    subtext: 'The rhythms of creation are written in light and dark.',
    choices: [
      {
        text: 'Dawn — the hush before the world wakes, full of possibility',
        affinities: { lyssandria: 3, shinkami: 1 },
      },
      {
        text: 'High day — when the sun is fully up and I am fully present',
        affinities: { draconia: 3, alera: 1 },
      },
      {
        text: 'Dusk — that golden hour when things soften and reveal themselves',
        affinities: { lyria: 3, leyla: 1 },
      },
      {
        text: 'Deep night — when the silence becomes a conversation',
        affinities: { aiyami: 2, shinkami: 2 },
      },
    ],
  },
  {
    id: 5,
    question: 'Your dream creative project would be...',
    subtext: 'If resources, time, and skill were unlimited.',
    choices: [
      {
        text: 'An immersive world — a novel, a series, an epic that people live inside',
        affinities: { leyla: 2, lyssandria: 1, shinkami: 1 },
      },
      {
        text: 'A visual statement — something seen and immediately felt, viscerally',
        affinities: { draconia: 2, lyria: 2 },
      },
      {
        text: 'A sonic universe — music or sound that alters how people hear the world',
        affinities: { alera: 2, leyla: 1, ino: 1 },
      },
      {
        text: 'A living system — something that others can build on, a creative infrastructure',
        affinities: { lyssandria: 2, ino: 1, aiyami: 1 },
      },
    ],
  },
  {
    id: 6,
    question: 'When creating with others, you naturally tend to...',
    subtext: 'Your instinctive role in the creative collective.',
    choices: [
      {
        text: 'Set the vision and direction — I know where we are going',
        affinities: { draconia: 3, alera: 1 },
      },
      {
        text: 'Hold space and elevate others — I make everyone feel safe and seen',
        affinities: { maylinn: 3, ino: 1 },
      },
      {
        text: 'Read the room and respond — I sense what the work needs',
        affinities: { lyria: 2, elara: 2 },
      },
      {
        text: 'Weave the threads together — I find the synthesis no one else sees',
        affinities: { ino: 3, aiyami: 1 },
      },
    ],
  },
  {
    id: 7,
    question: 'What frightens you most about creating?',
    subtext: 'Our deepest fears shape our creative edges.',
    choices: [
      {
        text: 'That the work will not be good enough — that I will fail my own standards',
        affinities: { lyssandria: 2, aiyami: 2 },
      },
      {
        text: 'That being truly seen will make me vulnerable in ways I cannot control',
        affinities: { alera: 2, maylinn: 1, leyla: 1 },
      },
      {
        text: 'That the vision inside me is larger than my current skill to express it',
        affinities: { aiyami: 2, shinkami: 2 },
      },
      {
        text: 'That creating will change me in ways I cannot predict or return from',
        affinities: { elara: 3, draconia: 1 },
      },
    ],
  },
  {
    id: 8,
    question: 'Your creativity is most like...',
    subtext: 'Let your instinct choose — there is no wrong answer.',
    choices: [
      {
        text: 'A river — it finds its path, reshapes the landscape, never stops',
        affinities: { leyla: 3, ino: 1 },
      },
      {
        text: 'A volcano — it builds silently for years, then transforms everything at once',
        affinities: { draconia: 2, lyssandria: 1, shinkami: 1 },
      },
      {
        text: 'A garden — tended with patience, surprising in what chooses to grow',
        affinities: { maylinn: 2, lyssandria: 2 },
      },
      {
        text: 'A storm — electric, inevitable, arriving on its own terms',
        affinities: { elara: 2, draconia: 1, shinkami: 1 },
      },
    ],
  },
  {
    id: 9,
    question: 'When you finish a creation, you feel...',
    subtext: 'The emotional signature of completion reveals your creative nature.',
    choices: [
      {
        text: 'Relief — the obligation to make it real has been honoured',
        affinities: { lyssandria: 3, alera: 1 },
      },
      {
        text: 'Exhilaration — I already see the next, larger thing I want to make',
        affinities: { draconia: 2, shinkami: 2 },
      },
      {
        text: 'Peace — a deep settling, like returning home after a long journey',
        affinities: { maylinn: 2, aiyami: 2 },
      },
      {
        text: 'Hunger — a new question has opened that I must now follow',
        affinities: { lyria: 2, elara: 1, shinkami: 1 },
      },
    ],
  },
  {
    id: 10,
    question: 'Which teaching speaks to you most deeply?',
    subtext: 'The wisdom that feels like something you already knew.',
    choices: [
      {
        text: '"The cathedral takes a lifetime to build. Begin the first stone today."',
        affinities: { lyssandria: 3, aiyami: 1 },
      },
      {
        text: '"Do not seek the muse. Become the place where inspiration wants to live."',
        affinities: { leyla: 2, shinkami: 2 },
      },
      {
        text: '"All creation is transformation. You must be willing to be changed by what you make."',
        affinities: { draconia: 2, elara: 2 },
      },
      {
        text: '"The work is not yours. You are a portal through which something greater passes."',
        affinities: { shinkami: 3, lyria: 1 },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCORING UTILITY
// ─────────────────────────────────────────────────────────────────────────────

function calculateResult(answers: Record<number, number>): GuardianKey {
  const scores: GuardianScores = {
    lyssandria: 0,
    leyla: 0,
    draconia: 0,
    maylinn: 0,
    alera: 0,
    lyria: 0,
    aiyami: 0,
    elara: 0,
    ino: 0,
    shinkami: 0,
  };

  for (const [questionId, choiceIndex] of Object.entries(answers)) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === parseInt(questionId));
    if (!question) continue;
    const choice = question.choices[choiceIndex];
    if (!choice) continue;
    for (const [guardian, points] of Object.entries(choice.affinities)) {
      scores[guardian as GuardianKey] += points ?? 0;
    }
  }

  // Return the guardian with the highest score
  return (Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0] as GuardianKey);
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

const slideRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.04 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function AmbientOrbs({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-32 top-8 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -right-24 bottom-12 h-80 w-80 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: color }}
      />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-3xl" />
    </div>
  );
}

interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = (current / total) * 100;
  return (
    <div className="relative mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-sans">
          Question {current} of {total}
        </span>
        <span className="text-xs text-text-muted font-sans font-mono">
          {Math.round(percent)}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #7fffd4)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO SCREEN
// ─────────────────────────────────────────────────────────────────────────────

interface IntroScreenProps {
  onStart: () => void;
}

function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div {...fadeUp} className="relative">
      <AmbientOrbs color="#8b5cf6" />

      <div className="relative liquid-glass rounded-3xl p-8 md:p-14 overflow-hidden">
        {/* Inner shimmer accent */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/20 shadow-glow-brand">
              <Sparkles className="h-4 w-4 text-brand-primary" />
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-brand-primary font-sans font-semibold">
              The Academy of Creation
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-fluid-3xl font-bold tracking-tight leading-tight md:text-fluid-4xl">
            <span className="text-gradient-brand">Which Guardian</span>
            <br />
            <span className="text-text-primary">Resonates With You?</span>
          </h1>

          {/* Body */}
          <p className="mt-6 text-fluid-base text-text-secondary font-sans leading-relaxed">
            In the world of Arcanea, every creator carries an affinity with one of the Ten Guardians
            — the divine beings who hold the Gates of creative mastery.
          </p>
          <p className="mt-4 text-fluid-base text-text-secondary font-sans leading-relaxed">
            This is not a test. It is a mirror. Ten questions will reveal which Guardian&apos;s
            wisdom already lives in how you create, what drives you, and what calls to you from
            beyond the horizon.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: 'Questions', value: '10' },
              { label: 'Guardians', value: '10' },
              { label: 'Time', value: '3 min' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-xs text-text-muted font-sans uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 rounded-xl bg-brand-primary px-8 py-4 font-semibold text-white shadow-glow-brand transition-all hover:bg-brand-primary/90 font-sans"
            >
              Begin the Journey
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-xs text-text-muted font-sans">
            Your answers are not stored. This is a moment of self-knowledge.
          </p>
        </div>
      </div>

      {/* Gate preview strip */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Object.values(GUARDIANS).map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.key}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 glass rounded-xl p-3 min-w-[72px]"
            >
              <Icon className="h-5 w-5" style={{ color: g.color }} />
              <span className="text-xs text-text-muted font-sans text-center leading-none">{g.name}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION SCREEN
// ─────────────────────────────────────────────────────────────────────────────

interface QuestionScreenProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedChoice: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
}

function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedChoice,
  onSelect,
  onNext,
}: QuestionScreenProps) {
  return (
    <motion.div key={question.id} {...slideRight}>
      <ProgressBar current={questionNumber} total={totalQuestions} />

      <div className="relative liquid-glass rounded-3xl overflow-hidden">
        <AmbientOrbs color="#8b5cf6" />

        <div className="relative p-8 md:p-10">
          {/* Question header */}
          <div className="mb-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold">
              Gate {questionNumber}
            </div>
            <h2 className="font-display text-fluid-2xl font-bold text-text-primary leading-snug">
              {question.question}
            </h2>
            {question.subtext && (
              <p className="mt-3 text-sm text-text-muted font-sans italic">
                {question.subtext}
              </p>
            )}
          </div>

          {/* Choices */}
          <div className="space-y-3">
            {question.choices.map((choice, index) => {
              const isSelected = selectedChoice === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => onSelect(index)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className={[
                    'group w-full rounded-xl p-5 text-left transition-all duration-300 font-sans',
                    isSelected
                      ? 'glass-strong border border-brand-primary/50 shadow-glow-brand'
                      : 'glass border border-white/8 hover:border-crystal/30 hover:bg-white/[0.03]',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    {/* Choice indicator */}
                    <div
                      className={[
                        'mt-0.5 flex-shrink-0 h-5 w-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center',
                        isSelected
                          ? 'border-brand-primary bg-brand-primary'
                          : 'border-white/20 group-hover:border-crystal/50',
                      ].join(' ')}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2 w-2 rounded-full bg-white"
                        />
                      )}
                    </div>
                    {/* Choice text */}
                    <span
                      className={[
                        'text-base leading-relaxed transition-colors duration-200',
                        isSelected
                          ? 'text-text-primary'
                          : 'text-text-secondary group-hover:text-text-primary',
                      ].join(' ')}
                    >
                      {choice.text}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next button */}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-xs text-text-muted font-sans">
              {selectedChoice === null ? 'Choose one to continue' : 'Selection made'}
            </span>
            <motion.button
              onClick={onNext}
              disabled={selectedChoice === null}
              whileHover={selectedChoice !== null ? { scale: 1.02 } : {}}
              whileTap={selectedChoice !== null ? { scale: 0.98 } : {}}
              className={[
                'inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all font-sans',
                selectedChoice !== null
                  ? 'bg-brand-primary text-white shadow-glow-brand hover:bg-brand-primary/90 cursor-pointer'
                  : 'bg-white/5 text-text-disabled cursor-not-allowed',
              ].join(' ')}
            >
              {questionNumber === totalQuestions ? 'See My Guardian' : 'Next Question'}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULT SCREEN
// ─────────────────────────────────────────────────────────────────────────────

interface ResultScreenProps {
  guardian: GuardianData;
  onRestart: () => void;
}

function ResultScreen({ guardian, onRestart }: ResultScreenProps) {
  const Icon = guardian.icon;

  return (
    <motion.div {...scaleIn} className="relative">
      <AmbientOrbs color={guardian.color} />

      {/* Reveal animation wrapper */}
      <div className="relative">
        {/* Header — "Your Guardian is..." */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-text-muted font-sans">
            Your Guardian Resonates
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass-elevated rounded-3xl overflow-hidden"
        >
          {/* Guardian header band */}
          <div
            className="relative px-8 pt-10 pb-8 md:px-12 md:pt-14"
            style={{
              background: `linear-gradient(135deg, ${guardian.glowColor} 0%, transparent 60%)`,
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Icon + gate badge */}
            <div className="mb-6 flex items-start justify-between">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: `${guardian.color}20`,
                  border: `1px solid ${guardian.color}40`,
                  boxShadow: `0 0 30px ${guardian.glowColor}`,
                }}
              >
                <Icon className="h-8 w-8" style={{ color: guardian.color }} />
              </div>
              <div className="text-right">
                <div
                  className="text-xs uppercase tracking-wider font-semibold font-sans px-3 py-1 rounded-full"
                  style={{
                    color: guardian.color,
                    backgroundColor: `${guardian.color}15`,
                    border: `1px solid ${guardian.color}30`,
                  }}
                >
                  Gate of {guardian.gate}
                </div>
                <div className="mt-1 text-xs text-text-muted font-mono">{guardian.frequency}</div>
              </div>
            </div>

            {/* Name */}
            <h1 className="font-display text-fluid-4xl font-bold tracking-tight leading-none">
              <span style={{ color: guardian.color }}>{guardian.name}</span>
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-text-secondary font-sans">
              <span>{guardian.element}</span>
              <span className="text-white/20">·</span>
              <span>Godbeast: {guardian.godbeast}</span>
            </div>
          </div>

          {/* Description */}
          <div className="px-8 py-8 md:px-12 space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base text-text-secondary font-sans leading-relaxed"
            >
              {guardian.description}
            </motion.p>

            {/* Personality */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-text-muted font-sans font-semibold">
                Your Creative Nature
              </h3>
              <p className="text-sm text-text-primary font-sans leading-relaxed">
                {guardian.personality}
              </p>
            </motion.div>

            {/* Strength + Shadow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="glass rounded-2xl p-5">
                <h3
                  className="mb-2 text-xs uppercase tracking-[0.25em] font-semibold font-sans"
                  style={{ color: guardian.color }}
                >
                  Creative Strength
                </h3>
                <p className="text-sm text-text-secondary font-sans leading-relaxed">
                  {guardian.creativeStrength}
                </p>
              </div>
              <div className="glass rounded-2xl p-5">
                <h3 className="mb-2 text-xs uppercase tracking-[0.25em] text-text-muted font-semibold font-sans">
                  Shadow to Transcend
                </h3>
                <p className="text-sm text-text-secondary font-sans leading-relaxed">
                  {guardian.shadowChallenge}
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="flex flex-col gap-3 pt-2 sm:flex-row"
            >
              <Link
                href={`/lore/guardians/${guardian.key}`}
                className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-4 px-6 font-semibold font-sans transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: `${guardian.color}20`,
                  border: `1px solid ${guardian.color}40`,
                  color: guardian.color,
                  boxShadow: `0 0 20px ${guardian.glowColor}`,
                }}
              >
                Meet {guardian.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/chat/${guardian.luminorId}`}
                className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-4 px-6 font-semibold text-white font-sans shadow-glow-brand transition-all hover:bg-brand-primary/90 hover:scale-[1.02]"
              >
                Create with {guardian.name}
                <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
              </Link>
            </motion.div>

            {/* Secondary action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="flex items-center justify-center pt-2"
            >
              <button
                onClick={onRestart}
                className="group inline-flex items-center gap-2 text-sm text-text-muted font-sans transition-colors hover:text-text-secondary"
              >
                <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" />
                Retake the Quiz
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* All Guardians strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6"
        >
          <p className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-text-muted font-sans">
            All Ten Guardians
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.values(GUARDIANS).map((g) => {
              const GIcon = g.icon;
              const isMatch = g.key === guardian.key;
              return (
                <Link
                  key={g.key}
                  href={`/lore/guardians/${g.key}`}
                  className={[
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-sans transition-all hover-lift',
                    isMatch
                      ? 'glass-strong border font-semibold'
                      : 'glass border border-white/8 text-text-muted hover:text-text-secondary',
                  ].join(' ')}
                  style={
                    isMatch
                      ? { borderColor: `${g.color}50`, color: g.color }
                      : {}
                  }
                >
                  <GIcon className="h-3.5 w-3.5" style={{ color: g.color }} />
                  {g.name}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ STATE MACHINE
// ─────────────────────────────────────────────────────────────────────────────

type QuizPhase = 'intro' | 'quiz' | 'result';

export default function GateQuizPage() {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [resultGuardian, setResultGuardian] = useState<GuardianKey | null>(null);

  const handleStart = useCallback(() => {
    setPhase('quiz');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedChoice(null);
  }, []);

  const handleSelectChoice = useCallback((index: number) => {
    setSelectedChoice(index);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedChoice === null) return;

    const question = QUIZ_QUESTIONS[currentQuestion];
    const newAnswers = { ...answers, [question.id]: selectedChoice };
    setAnswers(newAnswers);

    if (currentQuestion + 1 >= QUIZ_QUESTIONS.length) {
      // Final question — calculate result
      const winner = calculateResult(newAnswers);
      setResultGuardian(winner);
      setPhase('result');
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedChoice(null);
    }
  }, [selectedChoice, currentQuestion, answers]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedChoice(null);
    setResultGuardian(null);
  }, []);

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <main className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      {/* Page-level ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-crystal/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        {/* Site nav breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center gap-2 text-xs text-text-muted font-sans"
        >
          <Link href="/" className="hover:text-text-secondary transition-colors">
            Arcanea
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/academy" className="hover:text-text-secondary transition-colors">
            Academy
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-text-secondary">Guardian Quiz</span>
        </motion.div>

        {/* Phase rendering */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" {...fadeUp}>
              <IntroScreen onStart={handleStart} />
            </motion.div>
          )}

          {phase === 'quiz' && question && (
            <motion.div key={`question-${question.id}`} {...slideRight}>
              <QuestionScreen
                question={question}
                questionNumber={currentQuestion + 1}
                totalQuestions={QUIZ_QUESTIONS.length}
                selectedChoice={selectedChoice}
                onSelect={handleSelectChoice}
                onNext={handleNext}
              />
            </motion.div>
          )}

          {phase === 'result' && resultGuardian && (
            <motion.div key="result" {...scaleIn}>
              <ResultScreen
                guardian={GUARDIANS[resultGuardian]}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
