'use client';

import React from 'react';
import { Sparkles, BookOpen, Lightbulb, Zap } from 'lucide-react';

interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prompt: string;
  color: string;
}

interface QuickActionsProps {
  luminorName: string;
  luminorSlug: string;
  luminorColor?: string;
  onActionClick: (prompt: string) => void;
}

// Icon cycle for the four starters — keeps it simple and icon-import-free
const STARTER_ICONS = [Sparkles, BookOpen, Lightbulb, Zap];

// Specific starter prompts per Luminor, matching their specialty
const LUMINOR_STARTERS: Record<string, string[]> = {
  logicus: [
    'Help me design the architecture for...',
    'What pattern should I use for...',
    'Review this system design:',
    'How should I structure...',
  ],
  synthra: [
    'Refactor this code for clarity:',
    'Review this implementation:',
    'Help me write clean code for...',
    'What naming convention for...',
  ],
  debugon: [
    'I have a bug I cannot find:',
    'This keeps failing:',
    'Help me trace this error:',
    'Root cause analysis for...',
  ],
  nexus: [
    'I need to integrate these two systems:',
    'Design an API for...',
    'Help me connect...',
    'This integration keeps failing:',
  ],
  prismatic: [
    'Review this design:',
    'What color palette for...',
    'How should I layout...',
    'This feels visually wrong:',
  ],
  melodia: [
    'I need music for...',
    'Describe the sound of...',
    'What sonic mood for...',
    'Help me write lyrics for...',
  ],
  motio: [
    'How should this element animate?',
    'Design the transition for...',
    'What timing and easing for...',
    'This animation feels wrong:',
  ],
  formis: [
    'I need to model...',
    'How should I texture...',
    'Help me visualize...',
    'Design the 3D environment for...',
  ],
  chronica: [
    'I am stuck in my story:',
    'Help me structure this narrative:',
    'My character needs...',
    "The plot isn't working:",
  ],
  veritas: [
    'Rewrite this for clarity:',
    'Help me write copy for...',
    "This message isn't landing:",
    'How do I explain...',
  ],
  lexicon: [
    'What is the right word for...',
    'Help me name this:',
    'Analyze this language:',
    'Translate this concept into...',
  ],
  poetica: [
    'Write a poem about...',
    'Help me with these lyrics:',
    'Find the rhythm in...',
    'What metaphor for...',
  ],
  oracle: [
    'Research this topic:',
    'What do we know about...',
    'Find the best sources for...',
    'Deep analysis of...',
  ],
  analytica: [
    'Analyze this data:',
    'What pattern do you see in...',
    'Help me interpret...',
    'What does this mean?',
  ],
  memoria: [
    'Help me organize this:',
    'Design a knowledge system for...',
    'How should I structure this information?',
    'Create documentation for...',
  ],
  futura: [
    'Where is this trend going?',
    'What will this field look like in 5 years?',
    'Anticipate the change in...',
    'What am I missing about the future of...',
  ],
};

const getActionsForLuminor = (
  slug: string,
  luminorColor: string
): QuickAction[] => {
  const starters = LUMINOR_STARTERS[slug];

  if (starters) {
    return starters.map((prompt, i) => ({
      id: `${slug}-starter-${i}`,
      icon: STARTER_ICONS[i % STARTER_ICONS.length],
      label: prompt.replace(/[:.?]$/, '').slice(0, 32),
      prompt,
      color: luminorColor,
    }));
  }

  // Generic fallback (should never be reached for the 16 core Luminors)
  return [
    {
      id: 'start-project',
      icon: Sparkles,
      label: 'Start a Project',
      prompt: 'I want to start a new creative project. Can you guide me?',
      color: luminorColor,
    },
    {
      id: 'learn-something',
      icon: BookOpen,
      label: 'Learn Something',
      prompt: 'I want to learn something new. What can you teach me?',
      color: luminorColor,
    },
    {
      id: 'get-inspired',
      icon: Lightbulb,
      label: 'Get Inspired',
      prompt: 'I need creative inspiration. Can you help spark some ideas?',
      color: luminorColor,
    },
  ];
};

export const QuickActions: React.FC<QuickActionsProps> = ({
  luminorName,
  luminorSlug,
  luminorColor = '#8b5cf6',
  onActionClick,
}) => {
  const actions = getActionsForLuminor(luminorSlug, luminorColor);

  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-400">
            Start a conversation with {luminorName}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onActionClick(action.prompt)}
                className="group relative p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-600 transition-all duration-200 text-left overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${action.color}40, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${action.color}20`,
                      color: action.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <p className="text-sm font-medium text-gray-200 leading-snug">
                    {action.prompt}
                  </p>
                </div>

                {/* Active dot */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: action.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom prompt hint */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30">
          <p className="text-sm text-gray-400 text-center">
            Or just type what is on your mind and let us explore together
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
