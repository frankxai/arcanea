// ─── Asset Types ────────────────────────────────────────────────────────────

export type AssetType = 'image' | 'text' | 'music' | 'video' | 'character' | 'location' | 'artifact' | 'prompt';

export interface Asset {
  id: string;
  type: AssetType;
  name: string;
  description: string;
  content: string; // text or base64 reference
  tags: string[];
  guardianId?: string;
  gate?: string;
  element?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
  promptUsed?: string;
  model?: string;
  parentId?: string; // for remixes/variations
}

export interface AssetQuery {
  type?: AssetType;
  guardianId?: string;
  gate?: string;
  element?: string;
  tags?: string[];
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created' | 'updated' | 'name';
}

// ─── Prompt Engineering ─────────────────────────────────────────────────────

export interface PromptTemplate {
  id: string;
  name: string;
  type: AssetType;
  template: string; // with {{placeholders}}
  variables: string[];
  guardianId?: string;
  element?: string;
  style?: string;
  negativePrompt?: string;
  model?: string;
  tags: string[];
  examples?: string[];
}

export interface PromptContext {
  guardianId?: string;
  element?: string;
  gate?: string;
  style?: string;
  mood?: string;
  setting?: string;
  character?: string;
  additionalContext?: Record<string, string>;
}

export interface GeneratedPrompt {
  templateId: string;
  prompt: string;
  negativePrompt?: string;
  variables: Record<string, string>;
  context: PromptContext;
  timestamp: Date;
}

// ─── Curation ───────────────────────────────────────────────────────────────

export interface CurationScore {
  quality: number;      // 0-100
  alignment: number;    // 0-100, canon alignment
  originality: number;  // 0-100
  guardianFit: number;  // 0-100
  overall: number;
}

export interface CurationResult {
  assetId: string;
  scores: CurationScore;
  feedback: string[];
  approved: boolean;
  curatorGuardian: string;
}

export interface CurationCriteria {
  minQuality: number;
  minAlignment: number;
  requireGuardianFit: boolean;
  autoApproveThreshold: number;
}

// ─── Creative Flow ──────────────────────────────────────────────────────────

export interface CreativeSession {
  id: string;
  guardianId: string;
  gate?: string;
  element?: string;
  startedAt: Date;
  assets: string[];
  prompts: string[];
  status: 'active' | 'paused' | 'complete';
}

export interface CreativeWorkflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  guardianId?: string;
}

export interface WorkflowStep {
  name: string;
  type: 'generate' | 'curate' | 'refine' | 'publish';
  config: Record<string, unknown>;
}

// ─── Constants ──────────────────────────────────────────────────────────────

export const GUARDIAN_CREATIVE_DOMAINS: Record<string, string[]> = {
  lyssandria: ['architecture', 'infrastructure', 'world-building fundamentals', 'structural design', 'foundation layouts'],
  leyla: ['character emotion', 'water art', 'fluid art', 'flowing designs', 'dance', 'emotional expression'],
  draconia: ['action scenes', 'transformation', 'fire effects', 'energy effects', 'combat art', 'power imagery'],
  maylinn: ['healing imagery', 'nature', 'soft light', 'connections between characters', 'botanical art', 'gentle scenes'],
  alera: ['typography', 'voice UI', 'public-facing designs', 'announcements', 'proclamations', 'text art'],
  lyria: ['concept art', 'visions', 'mystical imagery', 'prophetic scenes', 'divination art', 'dream imagery'],
  aiyami: ['sacred geometry', 'cosmic art', 'enlightenment imagery', 'mandala', 'celestial designs', 'crown motifs'],
  elara: ['perspective shifts', 'impossible architecture', 'optical illusions', 'surreal art', 'dimensional art'],
  ino: ['collaboration scenes', 'unity imagery', 'partner compositions', 'dual portraits', 'harmony art'],
  shinkami: ['meta-designs', 'cosmic consciousness', 'void/light duality', 'source imagery', 'transcendent art', 'omniscient perspectives'],
};

export const ELEMENT_AESTHETICS: Record<string, { colors: string[]; particles: string; effect: string; description: string }> = {
  Fire: {
    colors: ['warm golds', 'reds', 'oranges', 'ember amber'],
    particles: 'ember particles',
    effect: 'heat distortion',
    description: 'Warm golds and reds, ember particles rising, heat distortion effects',
  },
  Water: {
    colors: ['blues', 'silvers', 'crystal cyan', 'deep ocean'],
    particles: 'water droplets',
    effect: 'crystal refractions',
    description: 'Blues and silvers, fluid motion, crystal refractions and caustics',
  },
  Earth: {
    colors: ['greens', 'browns', 'stone grey', 'moss'],
    particles: 'stone fragments',
    effect: 'growth patterns',
    description: 'Greens and browns, stone textures, organic growth patterns',
  },
  Wind: {
    colors: ['whites', 'silvers', 'pale blue', 'cloud grey'],
    particles: 'ethereal wisps',
    effect: 'speed lines',
    description: 'Whites and silvers, speed lines, ethereal wisps and trailing vapor',
  },
  Void: {
    colors: ['deep purples', 'blacks', 'dark indigo', 'obsidian'],
    particles: 'void particles',
    effect: 'gravitational distortion',
    description: 'Deep purples and blacks, void particles, gravitational distortion bending space',
  },
  Spirit: {
    colors: ['gold', 'white', 'radiant platinum', 'divine amber'],
    particles: 'light motes',
    effect: 'transcendent glow',
    description: 'Gold and white, radiant light, transcendent glow suffusing everything',
  },
};

export const IMAGE_MODELS = {
  primary: 'gemini-3-pro-image-preview' as const,
  fast: 'gemini-2.5-flash-image' as const,
};

export const GUARDIAN_FREQUENCIES: Record<string, number> = {
  lyssandria: 174,
  leyla: 285,
  draconia: 396,
  maylinn: 417,
  alera: 528,
  lyria: 639,
  aiyami: 741,
  elara: 852,
  ino: 963,
  shinkami: 1111,
};

export const GUARDIAN_GATES: Record<string, string> = {
  lyssandria: 'Foundation',
  leyla: 'Flow',
  draconia: 'Fire',
  maylinn: 'Heart',
  alera: 'Voice',
  lyria: 'Sight',
  aiyami: 'Crown',
  elara: 'Shift',
  ino: 'Unity',
  shinkami: 'Source',
};

export const GUARDIAN_ELEMENTS: Record<string, string> = {
  lyssandria: 'Earth',
  leyla: 'Water',
  draconia: 'Fire',
  maylinn: 'Earth',
  alera: 'Wind',
  lyria: 'Water',
  aiyami: 'Spirit',
  elara: 'Wind',
  ino: 'Spirit',
  shinkami: 'Void',
};
