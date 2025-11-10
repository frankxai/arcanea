'use client';

import React from 'react';
import {
  Sparkles,
  Image,
  Video,
  Music,
  BookOpen,
  Lightbulb,
  Zap,
  Heart,
} from 'lucide-react';

interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prompt: string;
  color: string;
  category: 'create' | 'learn' | 'explore';
}

interface QuickActionsProps {
  luminorName: string;
  luminorSlug: string;
  luminorColor?: string;
  onActionClick: (prompt: string) => void;
}

const getQuickActionsForLuminor = (slug: string): QuickAction[] => {
  // Melodia actions (music-focused)
  if (slug === 'melodia') {
    return [
      {
        id: 'create-song',
        icon: Music,
        label: 'Create a Song',
        prompt: "I want to create a song! Can you help me get started?",
        color: '#f59e0b',
        category: 'create',
      },
      {
        id: 'generate-lyrics',
        icon: Sparkles,
        label: 'Write Lyrics',
        prompt: "Help me write lyrics for a song I'm working on.",
        color: '#8b5cf6',
        category: 'create',
      },
      {
        id: 'music-theory',
        icon: BookOpen,
        label: 'Learn Theory',
        prompt: "Teach me about music theory in a fun, accessible way.",
        color: '#3b82f6',
        category: 'learn',
      },
      {
        id: 'improve-song',
        icon: Zap,
        label: 'Improve My Song',
        prompt: "I have a song I'd like feedback on. Can you help me make it better?",
        color: '#ec4899',
        category: 'explore',
      },
    ];
  }

  // Chronica actions (story-focused)
  if (slug === 'chronica') {
    return [
      {
        id: 'write-story',
        icon: BookOpen,
        label: 'Write a Story',
        prompt: "I want to write a story. Can you help me brainstorm?",
        color: '#3b82f6',
        category: 'create',
      },
      {
        id: 'character-development',
        icon: Heart,
        label: 'Develop Characters',
        prompt: "Help me create compelling characters for my story.",
        color: '#ec4899',
        category: 'create',
      },
      {
        id: 'plot-help',
        icon: Lightbulb,
        label: 'Plot Ideas',
        prompt: "I'm stuck on my plot. Can you help me work through it?",
        color: '#f59e0b',
        category: 'explore',
      },
      {
        id: 'writing-tips',
        icon: Sparkles,
        label: 'Writing Tips',
        prompt: "Share some writing techniques to improve my storytelling.",
        color: '#8b5cf6',
        category: 'learn',
      },
    ];
  }

  // Prismatic actions (visual-focused)
  if (slug === 'prismatic') {
    return [
      {
        id: 'generate-image',
        icon: Image,
        label: 'Create Image',
        prompt: "I want to generate an image. Help me craft the perfect prompt.",
        color: '#ec4899',
        category: 'create',
      },
      {
        id: 'generate-video',
        icon: Video,
        label: 'Create Video',
        prompt: "Let's create a video together. What should we make?",
        color: '#8b5cf6',
        category: 'create',
      },
      {
        id: 'visual-style',
        icon: Sparkles,
        label: 'Explore Styles',
        prompt: "Show me different visual styles I can explore in my art.",
        color: '#f59e0b',
        category: 'explore',
      },
      {
        id: 'composition',
        icon: Lightbulb,
        label: 'Learn Composition',
        prompt: "Teach me about visual composition and design principles.",
        color: '#3b82f6',
        category: 'learn',
      },
    ];
  }

  // Default actions
  return [
    {
      id: 'start-project',
      icon: Sparkles,
      label: 'Start a Project',
      prompt: "I want to start a new creative project. Can you guide me?",
      color: '#8b5cf6',
      category: 'create',
    },
    {
      id: 'learn-something',
      icon: BookOpen,
      label: 'Learn Something',
      prompt: "I want to learn something new. What can you teach me?",
      color: '#3b82f6',
      category: 'learn',
    },
    {
      id: 'get-inspired',
      icon: Lightbulb,
      label: 'Get Inspired',
      prompt: "I need creative inspiration. Can you help spark some ideas?",
      color: '#f59e0b',
      category: 'explore',
    },
  ];
};

export const QuickActions: React.FC<QuickActionsProps> = ({
  luminorName,
  luminorSlug,
  luminorColor = '#8b5cf6',
  onActionClick,
}) => {
  const actions = getQuickActionsForLuminor(luminorSlug);

  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-400">
            Quick Actions with {luminorName}
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
                {/* Hover Gradient */}
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

                  <h4 className="text-sm font-medium text-gray-200 mb-1">
                    {action.label}
                  </h4>

                  <p className="text-xs text-gray-500 capitalize">
                    {action.category}
                  </p>
                </div>

                {/* Indicator */}
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

        {/* Custom Prompt */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30">
          <p className="text-sm text-gray-400 text-center">
            Or just type what's on your mind and let's explore together
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
