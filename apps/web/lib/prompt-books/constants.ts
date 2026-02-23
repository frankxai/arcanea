// Arcanea Prompt Books — Constants & Guardian Theme Map

import type { GuardianId, ElementType, PromptType, TagCategory } from './types'

// =====================================================================
// Guardian Theme Map — Canonical 10 Guardians
// =====================================================================

export interface GuardianTheme {
  gate: string
  frequency: number
  element: ElementType
  color: string
  colorBright: string
  glow: string
  borderClass: string
  glowClass: string
  icon: string
}

export const GUARDIAN_THEMES: Record<GuardianId, GuardianTheme> = {
  lyssandria: {
    gate: 'Foundation',
    frequency: 174,
    element: 'earth',
    color: '#4a7c59',
    colorBright: '#6b9e7a',
    glow: 'rgba(74, 124, 89, 0.3)',
    borderClass: 'border-element-earth/40 hover:border-element-earth/70',
    glowClass: 'shadow-[0_0_20px_rgba(74,124,89,0.3)]',
    icon: 'Mountain',
  },
  leyla: {
    gate: 'Flow',
    frequency: 285,
    element: 'water',
    color: '#78a6ff',
    colorBright: '#9dbfff',
    glow: 'rgba(120, 166, 255, 0.3)',
    borderClass: 'border-element-water/40 hover:border-element-water/70',
    glowClass: 'shadow-[0_0_20px_rgba(120,166,255,0.3)]',
    icon: 'Droplets',
  },
  draconia: {
    gate: 'Fire',
    frequency: 396,
    element: 'fire',
    color: '#ff6b35',
    colorBright: '#ff8c5a',
    glow: 'rgba(255, 107, 53, 0.3)',
    borderClass: 'border-element-fire/40 hover:border-element-fire/70',
    glowClass: 'shadow-[0_0_20px_rgba(255,107,53,0.3)]',
    icon: 'Flame',
  },
  maylinn: {
    gate: 'Heart',
    frequency: 417,
    element: 'water',
    color: '#7fffd4',
    colorBright: '#99ffe0',
    glow: 'rgba(127, 255, 212, 0.3)',
    borderClass: 'border-brand-accent/40 hover:border-brand-accent/70',
    glowClass: 'shadow-[0_0_20px_rgba(127,255,212,0.3)]',
    icon: 'Heart',
  },
  alera: {
    gate: 'Voice',
    frequency: 528,
    element: 'wind',
    color: '#c8d6e5',
    colorBright: '#dfe8f0',
    glow: 'rgba(200, 214, 229, 0.3)',
    borderClass: 'border-element-wind/40 hover:border-element-wind/70',
    glowClass: 'shadow-[0_0_20px_rgba(200,214,229,0.3)]',
    icon: 'Mic',
  },
  lyria: {
    gate: 'Sight',
    frequency: 639,
    element: 'void',
    color: '#9966ff',
    colorBright: '#b38cff',
    glow: 'rgba(153, 102, 255, 0.3)',
    borderClass: 'border-brand-primary/40 hover:border-brand-primary/70',
    glowClass: 'shadow-[0_0_20px_rgba(153,102,255,0.3)]',
    icon: 'Eye',
  },
  aiyami: {
    gate: 'Crown',
    frequency: 741,
    element: 'fire',
    color: '#ffd700',
    colorBright: '#ffe44d',
    glow: 'rgba(255, 215, 0, 0.3)',
    borderClass: 'border-brand-gold/40 hover:border-brand-gold/70',
    glowClass: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]',
    icon: 'Crown',
  },
  elara: {
    gate: 'Shift',
    frequency: 852,
    element: 'void',
    color: '#b38cff',
    colorBright: '#c9adff',
    glow: 'rgba(179, 140, 255, 0.3)',
    borderClass: 'border-brand-primary/40 hover:border-brand-primary/60',
    glowClass: 'shadow-[0_0_20px_rgba(179,140,255,0.3)]',
    icon: 'Repeat',
  },
  ino: {
    gate: 'Unity',
    frequency: 963,
    element: 'water',
    color: '#5ce6b8',
    colorBright: '#7fedd0',
    glow: 'rgba(92, 230, 184, 0.3)',
    borderClass: 'border-brand-accent/40 hover:border-brand-accent/60',
    glowClass: 'shadow-[0_0_20px_rgba(92,230,184,0.3)]',
    icon: 'Users',
  },
  shinkami: {
    gate: 'Source',
    frequency: 1111,
    element: 'void',
    color: '#ffd700',
    colorBright: '#ffe680',
    glow: 'rgba(255, 215, 0, 0.4)',
    borderClass: 'border-brand-gold/50 hover:border-brand-gold/80',
    glowClass: 'shadow-[0_0_30px_rgba(255,215,0,0.4)]',
    icon: 'Sun',
  },
}

// =====================================================================
// Prompt Type Configuration
// =====================================================================

export interface PromptTypeConfig {
  label: string
  icon: string
  description: string
  hasNegativePrompt: boolean
  hasSystemPrompt: boolean
  hasFewShot: boolean
  hasChain: boolean
}

export const PROMPT_TYPES: Record<PromptType, PromptTypeConfig> = {
  general: {
    label: 'General',
    icon: 'MessageSquare',
    description: 'Universal prompt for any AI',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: true,
    hasChain: false,
  },
  txt2img: {
    label: 'Text to Image',
    icon: 'Image',
    description: 'Image generation from text description',
    hasNegativePrompt: true,
    hasSystemPrompt: false,
    hasFewShot: false,
    hasChain: false,
  },
  img2img: {
    label: 'Image to Image',
    icon: 'ImagePlus',
    description: 'Transform existing images with prompts',
    hasNegativePrompt: true,
    hasSystemPrompt: false,
    hasFewShot: false,
    hasChain: false,
  },
  chat: {
    label: 'Chat',
    icon: 'MessagesSquare',
    description: 'Conversational AI with system context',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: true,
    hasChain: false,
  },
  chain: {
    label: 'Chain',
    icon: 'Link',
    description: 'Multi-step prompt pipeline',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: false,
    hasChain: true,
  },
  few_shot: {
    label: 'Few-Shot',
    icon: 'ListOrdered',
    description: 'Learning from examples',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: true,
    hasChain: false,
  },
  code: {
    label: 'Code',
    icon: 'Code',
    description: 'Code generation and transformation',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: true,
    hasChain: false,
  },
  writing: {
    label: 'Writing',
    icon: 'PenTool',
    description: 'Creative and professional writing',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: true,
    hasChain: false,
  },
  analysis: {
    label: 'Analysis',
    icon: 'BarChart3',
    description: 'Data analysis and reasoning',
    hasNegativePrompt: false,
    hasSystemPrompt: true,
    hasFewShot: true,
    hasChain: false,
  },
}

// =====================================================================
// Default Tag Sets
// =====================================================================

export interface DefaultTag {
  name: string
  category: TagCategory
  injectText: string
  weightModifier?: number
}

export const DEFAULT_TAGS: DefaultTag[] = [
  // Quality
  { name: 'masterpiece', category: 'quality', injectText: 'masterpiece', weightModifier: 1.2 },
  { name: 'best quality', category: 'quality', injectText: 'best quality', weightModifier: 1.2 },
  { name: 'highres', category: 'quality', injectText: 'highres', weightModifier: 1.1 },
  { name: 'ultra-detailed', category: 'quality', injectText: 'ultra-detailed', weightModifier: 1.1 },
  { name: 'highly detailed', category: 'quality', injectText: 'highly detailed' },
  { name: 'illustration', category: 'quality', injectText: 'illustration' },

  // Style
  { name: 'anime', category: 'style', injectText: 'anime style' },
  { name: 'photorealistic', category: 'style', injectText: 'photorealistic' },
  { name: 'oil painting', category: 'style', injectText: 'oil painting' },
  { name: 'watercolor', category: 'style', injectText: 'watercolor' },
  { name: 'digital art', category: 'style', injectText: 'digital art' },
  { name: 'concept art', category: 'style', injectText: 'concept art' },
  { name: 'pixel art', category: 'style', injectText: 'pixel art' },
  { name: 'wallpaper', category: 'style', injectText: 'wallpaper' },

  // Negative
  { name: 'low quality', category: 'negative', injectText: 'low quality' },
  { name: 'worst quality', category: 'negative', injectText: 'worst quality' },
  { name: 'blurry', category: 'negative', injectText: 'blurry' },
  { name: 'deformed', category: 'negative', injectText: 'deformed' },
  { name: 'monochrome', category: 'negative', injectText: 'monochrome' },
  { name: 'watermark', category: 'negative', injectText: 'watermark' },
  { name: 'lowres', category: 'negative', injectText: 'lowres' },

  // Model tokens
  { name: '--ar 16:9', category: 'model', injectText: '--ar 16:9' },
  { name: '--ar 1:1', category: 'model', injectText: '--ar 1:1' },
  { name: '--ar 9:16', category: 'model', injectText: '--ar 9:16' },
  { name: '--v 6', category: 'model', injectText: '--v 6' },
  { name: '--style raw', category: 'model', injectText: '--style raw' },
]

// =====================================================================
// Tag Category Metadata
// =====================================================================

export const TAG_CATEGORIES: Record<TagCategory, { label: string; color: string }> = {
  quality: { label: 'Quality', color: '#7fffd4' },
  style: { label: 'Style', color: '#9966ff' },
  negative: { label: 'Negative', color: '#ff6b6b' },
  model: { label: 'Model', color: '#78a6ff' },
  custom: { label: 'Custom', color: '#ffd700' },
}

// =====================================================================
// Weight Syntax Patterns
// =====================================================================

export const WEIGHT_SYNTAX = {
  sd: { open: '(', close: ')', separator: ':' },       // (text:1.1)
  nai: { open: '{', close: '}', separator: ':' },      // {text:1.05}
  emphasis: { open: '[', close: ']', separator: ':' },  // [text:0.9]
} as const

export type WeightSyntaxType = keyof typeof WEIGHT_SYNTAX
