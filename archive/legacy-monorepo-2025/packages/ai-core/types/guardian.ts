/**
 * Guardian Learning System Types
 * Personal AI companions that learn creator style
 */

import { PersonalityTrait } from './luminor';

export interface GuardianProfile {
  id: string;
  userId: string;
  name: string;
  personality: GuardianPersonality;
  createdAt: Date;
  bond: BondLevel;
  learningModel: CreatorStyleProfile;
  memories: Memory[];
  preferences: GuardianPreferences;
}

export interface GuardianPersonality {
  baseTraits: PersonalityTrait[];
  adaptiveTraits: PersonalityTrait[];
  communicationStyle: string;
  teachingApproach: string;
  humorLevel: number;
  formalityLevel: number;
}

export interface BondLevel {
  level: number;
  tier: 'Stranger' | 'Acquaintance' | 'Friend' | 'Companion' | 'Soulbound';
  interactions: number;
  successfulCreations: number;
  lastInteraction: Date;
}

export interface CreatorStyleProfile {
  userId: string;

  visualStyle?: {
    favoriteStyles: string[];
    colorPreferences: string[];
    compositionPatterns: string[];
    moodTendencies: string[];
  };

  musicStyle?: {
    favoriteGenres: string[];
    tempoPreferences: string[];
    instrumentPreferences: string[];
    moodTendencies: string[];
  };

  storyStyle?: {
    favoriteGenres: string[];
    narrativeTones: string[];
    characterTypes: string[];
    plotPatterns: string[];
  };

  creationPatterns: {
    preferredTimeOfDay?: string;
    averageSessionLength?: number;
    iterationStyle?: 'quick' | 'methodical' | 'experimental';
    feedbackStyle?: 'detailed' | 'concise' | 'visual';
  };

  skillLevels: Record<string, number>;
  strengthAreas: string[];
  growthAreas: string[];
  completedExercises: string[];

  lastUpdated: Date;
}

export interface Memory {
  id: string;
  type: 'creation' | 'conversation' | 'achievement' | 'milestone';
  content: string;
  timestamp: Date;
  emotionalWeight: number;
  tags: string[];
}

export interface GuardianPreferences {
  notificationStyle: 'subtle' | 'moderate' | 'enthusiastic';
  suggestionFrequency: 'rare' | 'balanced' | 'frequent';
  challengeLevel: 'comfortable' | 'stretching' | 'ambitious';
  feedbackDetail: 'concise' | 'balanced' | 'comprehensive';
}

export interface LearningAnalytics {
  userId: string;
  engagementScore: number;
  comprehensionLevel: number;
  creationVelocity: number;
  frustrationIndicators: string[];
  strengthAreas: string[];
  improvementAreas: string[];
  recommendedNextSteps: string[];
  milestones: Milestone[];
  weeklyProgress: WeeklyProgress;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  achievedAt: Date;
  category: 'skill' | 'creation' | 'social' | 'exploration';
  arcReward: number;
  nftUnlocked?: string;
}

export interface WeeklyProgress {
  weekStarting: Date;
  creationsCount: number;
  timeSpent: number;
  skillsImproved: string[];
  newTechniquesLearned: string[];
  arcEarned: number;
}
