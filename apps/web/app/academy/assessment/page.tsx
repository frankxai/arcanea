'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Check, Flame, Droplets, Wind, Mountain, Star } from 'lucide-react';

// Assessment questions organized by Gate
const ASSESSMENT_QUESTIONS = [
  {
    gate: 1,
    gateName: 'Foundation',
    question: 'When starting a new creative project, what do you do first?',
    options: [
      { text: 'Research and gather all necessary resources', score: 4, element: 'earth' },
      { text: 'Jump straight into creating and figure it out along the way', score: 2, element: 'fire' },
      { text: 'Meditate on the vision until it feels clear', score: 3, element: 'void' },
      { text: 'Discuss the idea with others to get feedback', score: 3, element: 'water' },
    ],
  },
  {
    gate: 2,
    gateName: 'Flow',
    question: 'How do you handle creative blocks?',
    options: [
      { text: 'Take a break and do something completely different', score: 4, element: 'wind' },
      { text: 'Push through with discipline until inspiration returns', score: 2, element: 'fire' },
      { text: 'Explore my emotions to understand the root cause', score: 4, element: 'water' },
      { text: 'Stick to the routine - consistency beats inspiration', score: 2, element: 'earth' },
    ],
  },
  {
    gate: 3,
    gateName: 'Fire',
    question: 'When faced with a creative challenge, you typically:',
    options: [
      { text: 'Attack it head-on with full intensity', score: 4, element: 'fire' },
      { text: 'Carefully plan your approach before acting', score: 2, element: 'earth' },
      { text: 'Let the solution emerge naturally over time', score: 3, element: 'water' },
      { text: 'Try multiple approaches simultaneously', score: 3, element: 'wind' },
    ],
  },
  {
    gate: 4,
    gateName: 'Heart',
    question: 'What motivates your creative work the most?',
    options: [
      { text: 'Making a positive impact on others', score: 4, element: 'water' },
      { text: 'Personal achievement and recognition', score: 2, element: 'fire' },
      { text: 'Exploring ideas and possibilities', score: 3, element: 'void' },
      { text: 'Building something lasting and meaningful', score: 3, element: 'earth' },
    ],
  },
  {
    gate: 5,
    gateName: 'Voice',
    question: 'How do you express your creative vision?',
    options: [
      { text: 'Bold, authentic statements that challenge norms', score: 4, element: 'fire' },
      { text: 'Subtle, nuanced work that reveals itself slowly', score: 3, element: 'void' },
      { text: 'Clear, accessible communication everyone can understand', score: 4, element: 'wind' },
      { text: 'Emotional resonance that connects deeply', score: 3, element: 'water' },
    ],
  },
  {
    gate: 6,
    gateName: 'Sight',
    question: 'When planning for the future of your creative work:',
    options: [
      { text: 'I have clear visions that guide my path', score: 4, element: 'void' },
      { text: 'I adapt as opportunities arise', score: 3, element: 'wind' },
      { text: 'I follow proven patterns that work', score: 2, element: 'earth' },
      { text: 'I trust my passion to lead the way', score: 3, element: 'fire' },
    ],
  },
  {
    gate: 7,
    gateName: 'Crown',
    question: 'How do you approach mastery in your craft?',
    options: [
      { text: 'Integration of all skills into unified wisdom', score: 4, element: 'void' },
      { text: 'Relentless practice and refinement', score: 3, element: 'fire' },
      { text: 'Teaching others while continuing to learn', score: 4, element: 'wind' },
      { text: 'Deep study of masters who came before', score: 3, element: 'earth' },
    ],
  },
  {
    gate: 8,
    gateName: 'Shift',
    question: 'When your creative approach isn\'t working, you:',
    options: [
      { text: 'Completely transform your perspective', score: 4, element: 'void' },
      { text: 'Double down and try harder', score: 2, element: 'fire' },
      { text: 'Seek diverse viewpoints and adapt', score: 4, element: 'wind' },
      { text: 'Return to fundamentals that have worked before', score: 2, element: 'earth' },
    ],
  },
  {
    gate: 9,
    gateName: 'Unity',
    question: 'Your ideal creative collaboration looks like:',
    options: [
      { text: 'Deep partnership where ideas merge seamlessly', score: 4, element: 'water' },
      { text: 'Leading a team toward a shared vision', score: 3, element: 'fire' },
      { text: 'Independent work with periodic check-ins', score: 2, element: 'earth' },
      { text: 'Dynamic ensemble with fluid roles', score: 3, element: 'wind' },
    ],
  },
  {
    gate: 10,
    gateName: 'Source',
    question: 'What is the ultimate purpose of your creative work?',
    options: [
      { text: 'To channel something greater than myself', score: 4, element: 'void' },
      { text: 'To leave a lasting legacy', score: 3, element: 'earth' },
      { text: 'To transform consciousness through beauty', score: 4, element: 'water' },
      { text: 'To push boundaries and inspire change', score: 3, element: 'fire' },
    ],
  },
];

const HOUSES = {
  fire: { name: 'Pyros', color: '#ef4444', element: 'Fire', description: 'Passion and transformation guide your path' },
  water: { name: 'Aqualis', color: '#3b82f6', element: 'Water', description: 'Flow and emotion are your strengths' },
  earth: { name: 'Terra', color: '#22c55e', element: 'Earth', description: 'Stability and growth define your approach' },
  wind: { name: 'Ventus', color: '#a855f7', element: 'Wind', description: 'Freedom and change fuel your creativity' },
  void: { name: 'Nero', color: '#1f2937', element: 'Void', description: 'Potential and mystery are your allies' },
};

function getRank(gatesOpened: number): { rank: string; color: string } {
  if (gatesOpened >= 9) return { rank: 'Luminor', color: '#ffd700' };
  if (gatesOpened >= 7) return { rank: 'Archmage', color: '#f59e0b' };
  if (gatesOpened >= 5) return { rank: 'Master', color: '#8b5cf6' };
  if (gatesOpened >= 3) return { rank: 'Mage', color: '#3b82f6' };
  return { rank: 'Apprentice', color: '#6b7280' };
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [elementScores, setElementScores] = useState<Record<string, number>>({
    fire: 0,
    water: 0,
    earth: 0,
    wind: 0,
    void: 0,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = ASSESSMENT_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const option = question.options[selectedOption];

    // Update answers
    const newAnswers = [...answers, option.score];
    setAnswers(newAnswers);

    // Update element scores
    setElementScores(prev => ({
      ...prev,
      [option.element]: prev[option.element] + option.score,
    }));

    // Move to next question or finish
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  // Calculate results
  const gatesOpened = answers.filter(score => score >= 3).length;
  const { rank, color: rankColor } = getRank(gatesOpened);

  // Find dominant element
  const dominantElement = Object.entries(elementScores).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as keyof typeof HOUSES;
  const house = HOUSES[dominantElement];

  if (isComplete) {
    return (
      <div className="min-h-screen py-12 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Back link */}
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academy
          </Link>

          {/* Results card */}
          <div className="bg-cosmic-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="relative p-8 text-center border-b border-white/10">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/10 to-transparent" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="relative w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${rankColor}20`, boxShadow: `0 0 40px ${rankColor}40` }}
              >
                <Sparkles className="w-12 h-12" style={{ color: rankColor }} />
              </motion.div>
              <h1 className="text-3xl font-display font-bold mb-2">Assessment Complete</h1>
              <p className="text-text-secondary">Your creative path has been revealed</p>
            </div>

            {/* Results */}
            <div className="p-8 space-y-8">
              {/* Rank */}
              <div className="text-center">
                <p className="text-sm text-text-muted mb-2 uppercase tracking-wider">Your Current Rank</p>
                <h2 className="text-4xl font-display font-bold" style={{ color: rankColor }}>
                  {rank}
                </h2>
                <p className="text-text-secondary mt-2">{gatesOpened} of 10 Gates opened</p>
              </div>

              {/* Gates visualization */}
              <div className="flex justify-center gap-2">
                {ASSESSMENT_QUESTIONS.map((q, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      answers[i] >= 3
                        ? 'bg-brand-gold text-cosmic-deep'
                        : 'bg-white/10 text-text-muted'
                    }`}
                    style={answers[i] >= 3 ? { boxShadow: '0 0 10px rgba(255,215,0,0.5)' } : {}}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* House */}
              <div className="bg-white/5 rounded-2xl p-6 text-center">
                <p className="text-sm text-text-muted mb-2 uppercase tracking-wider">Your Academy House</p>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${house.color}30`, border: `2px solid ${house.color}` }}
                  >
                    {dominantElement === 'fire' && <Flame className="w-6 h-6" style={{ color: house.color }} />}
                    {dominantElement === 'water' && <Droplets className="w-6 h-6" style={{ color: house.color }} />}
                    {dominantElement === 'earth' && <Mountain className="w-6 h-6" style={{ color: house.color }} />}
                    {dominantElement === 'wind' && <Wind className="w-6 h-6" style={{ color: house.color }} />}
                    {dominantElement === 'void' && <Star className="w-6 h-6" style={{ color: house.color }} />}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-display font-bold" style={{ color: house.color }}>
                      House {house.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{house.element}</p>
                  </div>
                </div>
                <p className="text-text-secondary">{house.description}</p>
              </div>

              {/* Element breakdown */}
              <div className="space-y-3">
                <p className="text-sm text-text-muted uppercase tracking-wider">Elemental Affinity</p>
                {Object.entries(elementScores)
                  .sort((a, b) => b[1] - a[1])
                  .map(([element, score]) => {
                    const h = HOUSES[element as keyof typeof HOUSES];
                    const maxScore = 40; // Max possible per element
                    const percentage = (score / maxScore) * 100;
                    return (
                      <div key={element} className="flex items-center gap-3">
                        <span className="w-16 text-sm text-text-secondary capitalize">{element}</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: h.color }}
                          />
                        </div>
                        <span className="w-8 text-sm text-text-muted text-right">{score}</span>
                      </div>
                    );
                  })}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Link
                  href="/academy"
                  className="flex-1 py-3 rounded-xl border border-white/20 text-center font-semibold hover:bg-white/5 transition-colors"
                >
                  View Academy
                </Link>
                <Link
                  href="/luminors"
                  className="flex-1 py-3 rounded-xl bg-crystal text-cosmic-deep text-center font-semibold hover:shadow-[0_0_30px_rgba(127,255,212,0.4)] transition-all"
                >
                  Meet Your Luminor
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Academy
        </Link>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">Gate {question.gate}: {question.gateName}</span>
            <span className="text-text-muted">{currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-crystal to-brand-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-cosmic-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8"
          >
            <h2 className="text-2xl font-display font-bold mb-8">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedOption === index
                      ? 'border-crystal bg-crystal/10'
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedOption === index
                          ? 'border-crystal bg-crystal'
                          : 'border-white/30'
                      }`}
                    >
                      {selectedOption === index && <Check className="w-4 h-4 text-cosmic-deep" />}
                    </div>
                    <span className={selectedOption === index ? 'text-white' : 'text-text-secondary'}>
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-text-secondary hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-crystal text-cosmic-deep font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {currentQuestion === ASSESSMENT_QUESTIONS.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
