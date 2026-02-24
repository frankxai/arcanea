/**
 * Creation Types: Music, Visual, Story
 */

import { GenerateOptions } from './providers';

// ============ MUSIC TYPES (Suno) ============

export interface MusicGenerationOptions extends GenerateOptions {
  style?: string;
  mood?: string;
  tempo?: 'slow' | 'medium' | 'fast';
  instruments?: string[];
  instrumental?: boolean;
  vocal?: 'male' | 'female' | 'none';
  duration?: number;
  tags?: string;
  title?: string;
  continueAt?: number;
  continueClipId?: string;
  waitForCompletion?: boolean;
}

export interface SunoSong {
  id: string;
  title: string;
  prompt: string;
  tags: string;
  audioUrl: string;
  videoUrl?: string;
  imageUrl?: string;
  duration: number;
  status: 'queued' | 'processing' | 'complete' | 'error';
  createdAt: Date;
  metadata?: {
    model?: string;
    isInstrumental?: boolean;
    isPublic?: boolean;
    errorMessage?: string;
    guardianCollaboration?: string[];
  };
}

export interface SunoGenerationResponse {
  clips: any[];
  status: string;
}

// ============ IMAGE TYPES (Gemini) ============

export interface ImageGenerationOptions extends GenerateOptions {
  width?: number;
  height?: number;
  style?: string;
  mood?: string;
  composition?: string;
  lighting?: string;
  colorPalette?: string;
  format?: 'png' | 'jpg' | 'webp';
  quality?: number;
}

export interface ImageEditOptions extends ImageGenerationOptions {
  preserveStyle?: boolean;
  strength?: number;
  mask?: string;
}

export interface ArcaneanImage {
  id: string;
  url: string;
  prompt: string;
  width: number;
  height: number;
  format: string;
  createdAt: Date;
  metadata?: {
    model?: string;
    style?: string;
    mood?: string;
    originalImage?: string;
    editType?: 'generation' | 'modification' | 'extension';
    preservedStyle?: boolean;
    editChain?: string[];
    referenceCount?: number;
    safetyRatings?: any[];
  };
}

// ============ STORY TYPES (Claude) ============

export interface StoryGenerationOptions extends GenerateOptions {
  genre?: string;
  tone?: string;
  length?: 'short' | 'medium' | 'long';
  perspective?: 'first' | 'second' | 'third';
  setting?: string;
  characters?: Character[];
  plotPoints?: string[];
  worldContext?: string;
}

export interface Character {
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting';
  traits: string[];
  background?: string;
  motivation?: string;
}

export interface ArcaneanStory {
  id: string;
  title: string;
  content: string;
  genre: string;
  wordCount: number;
  chapters?: Chapter[];
  createdAt: Date;
  metadata?: {
    model?: string;
    tone?: string;
    characters?: Character[];
    setting?: string;
    themes?: string[];
    readingTime?: number;
  };
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  summary?: string;
}
