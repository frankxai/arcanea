/**
 * Core type definitions for Arcanea AI system
 * Foundation for Guardian and Luminor agents
 */

import { z } from 'zod';

// Export modular types
export * from './providers';
export * from './creation';
export * from './luminor';
export * from './guardian';
export * from './remix';
export * from './realm';

// ============================================================================
// PROVIDER TYPES
// ============================================================================

export interface ArcaneanProvider {
  name: string;
  model: string;
  generateText(prompt: string, options?: GenerateOptions): Promise<string>;
  streamText(prompt: string, options?: GenerateOptions): AsyncGenerator<string>;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
  tools?: ToolDefinition[];
}

// ============================================================================
// TOOL TYPES
// ============================================================================

export interface ToolDefinition<T = any> {
  name: string;
  description: string;
  parameters: z.ZodType<T>;
  execute: (params: T, context?: ToolContext) => Promise<any>;
}

export interface ToolContext {
  creatorId?: string;
  realmId?: string;
  academyContext?: AcademyType;
  sessionId?: string;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// ACADEMY TYPES
// ============================================================================

export type AcademyType = 'atlantean' | 'draconic' | 'creation-light';

export interface AcademyConfig {
  type: AcademyType;
  name: string;
  description: string;
  specialty: string;
  guardian?: string;
  primaryColor: string;
  theme: 'underwater' | 'sky' | 'light';
}

export const ACADEMIES: Record<AcademyType, AcademyConfig> = {
  atlantean: {
    type: 'atlantean',
    name: 'Atlantean Academy',
    description: 'Underwater realm of storytelling and lore',
    specialty: 'Narrative Creation',
    primaryColor: '#00D4FF',
    theme: 'underwater',
  },
  draconic: {
    type: 'draconic',
    name: 'Draconic Academy',
    description: 'Sky-bound realm of visual magic',
    specialty: 'Visual Creation',
    primaryColor: '#FF6B35',
    theme: 'sky',
  },
  'creation-light': {
    type: 'creation-light',
    name: 'Academy of Creation & Light',
    description: 'Central nexus of musical and audio magic',
    specialty: 'Music & Audio Creation',
    primaryColor: '#FFD700',
    theme: 'light',
  },
};

// ============================================================================
// LUMINOR TYPES
// ============================================================================

export interface LuminorConfig {
  name: string;
  academy: AcademyType;
  specialty: string;
  systemPrompt: string;
  tools: ToolDefinition[];
  personality?: PersonalityTraits;
  capabilities?: string[];
}

export interface PersonalityTraits {
  tone: 'formal' | 'friendly' | 'inspiring' | 'wise';
  verbosity: 'concise' | 'balanced' | 'detailed';
  creativity: 'conservative' | 'balanced' | 'experimental';
  empathy: 'analytical' | 'balanced' | 'nurturing';
}

// ============================================================================
// GUARDIAN TYPES
// ============================================================================

export interface GuardianConfig {
  name: string;
  systemPrompt: string;
  model: string;
  tools?: ToolDefinition[];
  luminors?: LuminorConfig[];
  memoryEnabled?: boolean;
  learningEnabled?: boolean;
}

export interface GuardianMemory {
  sessionId: string;
  creatorId: string;
  timestamp: Date;
  context: string;
  summary?: string;
  importance: 'low' | 'medium' | 'high';
}

// ============================================================================
// ESSENCE TYPES
// ============================================================================

export type EssenceType = 'visual' | 'musical' | 'narrative' | 'multimodal';

export interface Essence {
  id: string;
  type: EssenceType;
  creatorId: string;
  realmId?: string;
  title: string;
  description?: string;
  content: EssenceContent;
  metadata: EssenceMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export type EssenceContent =
  | VisualEssenceContent
  | MusicalEssenceContent
  | NarrativeEssenceContent
  | MultimodalEssenceContent;

export interface VisualEssenceContent {
  type: 'visual';
  imageUrl: string;
  prompt: string;
  style?: string;
  dimensions?: { width: number; height: number };
  generationParams?: Record<string, any>;
}

export interface MusicalEssenceContent {
  type: 'musical';
  audioUrl: string;
  prompt: string;
  genre?: string;
  duration?: number;
  bpm?: number;
  key?: string;
  generationParams?: Record<string, any>;
}

export interface NarrativeEssenceContent {
  type: 'narrative';
  text: string;
  prompt?: string;
  wordCount?: number;
  genre?: string;
  themes?: string[];
}

export interface MultimodalEssenceContent {
  type: 'multimodal';
  components: Array<VisualEssenceContent | MusicalEssenceContent | NarrativeEssenceContent>;
  composition: 'sequential' | 'parallel' | 'layered';
}

export interface EssenceMetadata {
  academy: AcademyType;
  luminorUsed: string;
  tags: string[];
  remixable: boolean;
  originalEssenceId?: string; // If this is a remix
  arcEarned?: number;
  viewCount?: number;
  remixCount?: number;
}

// ============================================================================
// REALM TYPES
// ============================================================================

export interface Realm {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  theme: string;
  essences: string[]; // Essence IDs
  portals: Portal[];
  visibility: 'private' | 'unlisted' | 'public';
  createdAt: Date;
  updatedAt: Date;
}

export interface Portal {
  id: string;
  targetRealmId: string;
  name: string;
  description?: string;
  bidirectional: boolean;
}

// ============================================================================
// ECONOMY TYPES
// ============================================================================

export interface ARCTransaction {
  id: string;
  creatorId: string;
  amount: number;
  type: 'earned' | 'spent' | 'received' | 'sent';
  reason: string;
  essenceId?: string;
  timestamp: Date;
}

export interface NEATransaction {
  id: string;
  creatorId: string;
  amount: number;
  type: 'earned' | 'staked' | 'voted';
  reason: string;
  timestamp: Date;
}

// ============================================================================
// AGENT EXECUTION TYPES
// ============================================================================

export interface AgentTask {
  id: string;
  type: 'create' | 'analyze' | 'improve' | 'collaborate';
  input: any;
  context?: ToolContext;
  priority?: 'low' | 'normal' | 'high';
  deadline?: Date;
}

export interface AgentResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  metadata?: {
    duration: number;
    tokensUsed?: number;
    cost?: number;
    toolsUsed?: string[];
  };
}

// ============================================================================
// STYLE TYPES (for Visual Creation)
// ============================================================================

export interface ArcaneanStyle {
  name: string;
  description: string;
  colorPalette: {
    primary: string[];
    secondary: string[];
    accent: string[];
  };
  characteristics: string[];
  referenceImages?: string[];
  promptModifiers: string[];
}

export const KINGDOM_OF_LIGHT_STYLE: ArcaneanStyle = {
  name: 'Kingdom of Light',
  description: 'The signature Arcanean aesthetic - luminous, elegant, inspiring',
  colorPalette: {
    primary: ['#FFD700', '#FFFFFF', '#87CEEB'],
    secondary: ['#9370DB', '#20B2AA', '#FF8C00'],
    accent: ['#F0E68C', '#C0C0C0', '#FFF5E1'],
  },
  characteristics: [
    'Soft ambient lighting with dramatic highlights',
    'Ethereal glows and light particles',
    'Clean, elegant composition',
    'Depth through atmospheric perspective',
    'Magical realism aesthetic',
  ],
  promptModifiers: [
    'kingdom of light aesthetic',
    'luminous creative energy',
    'ethereal glowing light',
    'soft golden ambient lighting',
    'inspiring and magical atmosphere',
  ],
};

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export const EssenceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(['visual', 'musical', 'narrative', 'multimodal']),
  remixable: z.boolean().default(true),
  tags: z.array(z.string()).max(10),
});

export const RealmSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000),
  theme: z.string().max(50),
  visibility: z.enum(['private', 'unlisted', 'public']),
});

// ============================================================================
// ERROR TYPES
// ============================================================================

export class ArcaneanError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ArcaneanError';
  }
}

export class LuminorError extends ArcaneanError {
  constructor(message: string, public luminorName: string, details?: any) {
    super(message, 'LUMINOR_ERROR', { luminorName, ...details });
    this.name = 'LuminorError';
  }
}

export class GuardianError extends ArcaneanError {
  constructor(message: string, details?: any) {
    super(message, 'GUARDIAN_ERROR', details);
    this.name = 'GuardianError';
  }
}
