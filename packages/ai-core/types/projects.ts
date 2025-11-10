/**
 * Project Flow Types
 * Multi-turn creation flows for complete project generation
 */

import { z } from 'zod';

// ============ PROJECT FLOW STATE ============

export interface ProjectFlowState {
  projectId: string;
  userId: string;
  templateId: string;
  sessionId: string;

  // Current State
  currentStep: number;
  totalSteps: number;
  status: ProjectFlowStatus;

  // Context & Data
  context: ProjectContext;
  collectedData: Record<string, any>;
  conversationHistory: ProjectConversationTurn[];

  // Generated Assets
  generatedAssets: GeneratedAsset[];
  intermediateResults: IntermediateResult[];

  // Progress Tracking
  completedGoals: string[];
  pendingGoals: string[];

  // Metadata
  startedAt: Date;
  lastActiveAt: Date;
  completedAt?: Date;
  estimatedTimeRemaining?: number;
}

export enum ProjectFlowStatus {
  INITIALIZING = 'initializing',
  IN_PROGRESS = 'in_progress',
  WAITING_FOR_INPUT = 'waiting_for_input',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}

export interface ProjectContext {
  templateName: string;
  projectType: ProjectType;
  userGoals: string[];
  preferences: ProjectPreferences;
  constraints?: ProjectConstraints;
}

export interface ProjectPreferences {
  style?: string;
  mood?: string;
  tone?: string;
  complexity?: 'simple' | 'moderate' | 'complex';
  detailLevel?: 'brief' | 'moderate' | 'detailed';
  targetAudience?: string;
}

export interface ProjectConstraints {
  maxAssets?: number;
  maxCost?: number;
  maxDuration?: number;
  requiredOutputs?: string[];
  excludedTools?: string[];
}

export interface ProjectConversationTurn {
  role: 'user' | 'luminor' | 'system';
  content: string;
  timestamp: Date;
  stepNumber: number;
  metadata?: {
    intent?: string;
    extractedData?: Record<string, any>;
    suggestions?: string[];
    toolsUsed?: string[];
  };
}

export interface GeneratedAsset {
  id: string;
  type: AssetType;
  url?: string;
  content?: string;
  prompt?: string;
  tool: string;
  model?: string;
  metadata: Record<string, any>;
  stepNumber: number;
  cost?: number;
  generatedAt: Date;
}

export enum AssetType {
  IMAGE = 'image',
  MUSIC = 'music',
  VIDEO = 'video',
  TEXT = 'text',
  STORY = 'story',
  CHARACTER = 'character',
  CONCEPT_ART = 'concept_art',
  WORLD_MAP = 'world_map',
  TIMELINE = 'timeline',
}

export interface IntermediateResult {
  stepNumber: number;
  description: string;
  data: any;
  timestamp: Date;
}

// ============ PROJECT TEMPLATES ============

export interface ProjectTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;

  // Visual
  icon: string;
  color: string;
  thumbnail?: string;

  // Configuration
  projectType: ProjectType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // minutes

  // Flow Definition
  steps: ProjectStep[];
  goals: ProjectGoal[];

  // Required Capabilities
  requiredTools: string[];
  requiredModels: string[];

  // Luminor Configuration
  luminorPersonality: LuminorGuidance;

  // Cost Estimation
  estimatedCost: {
    arcPoints: number;
    apiCost?: number;
  };

  // Metadata
  tags: string[];
  category: string;
  popularityScore?: number;
}

export enum ProjectType {
  CHARACTER_DESIGN = 'character_design',
  WORLD_BUILDING = 'world_building',
  STORY_CREATION = 'story_creation',
  MUSIC_COMPOSITION = 'music_composition',
  VISUAL_SERIES = 'visual_series',
  GAME_CONCEPT = 'game_concept',
  ANIMATION_STORYBOARD = 'animation_storyboard',
  CUSTOM = 'custom',
}

export interface ProjectStep {
  stepNumber: number;
  name: string;
  description: string;

  // Step Type
  type: StepType;

  // User Interaction
  prompt: string;
  expectedInput?: string[];
  validationRules?: ValidationRule[];

  // AI Actions
  aiActions?: AIAction[];

  // Outputs
  expectedOutputs: string[];

  // Flow Control
  canSkip?: boolean;
  canGoBack?: boolean;
  nextStepCondition?: string;
  branchingLogic?: BranchingLogic;

  // Optimization
  cacheable?: boolean;
  batchable?: boolean;
}

export enum StepType {
  INFORMATION_GATHERING = 'information_gathering',
  CONCEPT_DEVELOPMENT = 'concept_development',
  GENERATION = 'generation',
  REFINEMENT = 'refinement',
  REVIEW = 'review',
  FINALIZATION = 'finalization',
}

export interface ValidationRule {
  field: string;
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface AIAction {
  action: 'generate_text' | 'generate_image' | 'generate_music' | 'analyze' | 'combine';
  tool: string;
  model?: string;
  parameters: Record<string, any>;
  usePreviousContext?: boolean;
  saveAs?: string;
}

export interface BranchingLogic {
  condition: string;
  branches: {
    [key: string]: number; // condition -> next step number
  };
}

export interface ProjectGoal {
  id: string;
  description: string;
  type: 'required' | 'optional';
  completionCriteria: string;
  assets?: string[];
}

export interface LuminorGuidance {
  personality: string;
  tone: 'encouraging' | 'professional' | 'playful' | 'mystical';
  openingMessage: string;
  guidancePrompts: string[];
  celebrationMessages: string[];
  errorMessages: string[];
}

// ============ PROJECT FLOW RESULTS ============

export interface ProjectFlowResult {
  projectId: string;
  templateId: string;
  status: ProjectFlowStatus;

  // Summary
  summary: ProjectSummary;

  // Assets
  assets: GeneratedAsset[];

  // Stats
  stats: ProjectStats;

  // Export
  exportBundle?: ProjectBundle;
}

export interface ProjectSummary {
  title: string;
  description: string;
  keyFeatures: string[];
  highlights: string[];
  completionMessage: string;
}

export interface ProjectStats {
  totalDuration: number; // minutes
  totalSteps: number;
  assetsGenerated: number;
  arcSpent: number;
  apiCostUsd?: number;
  modelUsage: {
    [model: string]: number;
  };
}

export interface ProjectBundle {
  files: BundleFile[];
  readme: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface BundleFile {
  filename: string;
  type: string;
  url?: string;
  content?: string;
  size?: number;
}

// ============ PROJECT OPTIMIZER TYPES ============

export interface OptimizationContext {
  userBudget?: {
    maxArc?: number;
    maxCost?: number;
  };
  prioritizeQuality?: boolean;
  prioritizeSpeed?: boolean;
  enableCaching?: boolean;
  batchRequests?: boolean;
}

export interface OptimizationPlan {
  originalCost: number;
  optimizedCost: number;
  savings: number;
  strategies: OptimizationStrategy[];
}

export interface OptimizationStrategy {
  name: string;
  description: string;
  costSaving: number;
  qualityImpact?: 'none' | 'minimal' | 'moderate';
  appliedAt?: number[]; // step numbers
}

// ============ ZOD SCHEMAS ============

export const ProjectContextSchema = z.object({
  templateName: z.string(),
  projectType: z.nativeEnum(ProjectType),
  userGoals: z.array(z.string()),
  preferences: z.object({
    style: z.string().optional(),
    mood: z.string().optional(),
    tone: z.string().optional(),
    complexity: z.enum(['simple', 'moderate', 'complex']).optional(),
    detailLevel: z.enum(['brief', 'moderate', 'detailed']).optional(),
    targetAudience: z.string().optional(),
  }),
  constraints: z.object({
    maxAssets: z.number().optional(),
    maxCost: z.number().optional(),
    maxDuration: z.number().optional(),
    requiredOutputs: z.array(z.string()).optional(),
    excludedTools: z.array(z.string()).optional(),
  }).optional(),
});

export const ProjectFlowStateSchema = z.object({
  projectId: z.string(),
  userId: z.string(),
  templateId: z.string(),
  sessionId: z.string(),
  currentStep: z.number(),
  totalSteps: z.number(),
  status: z.nativeEnum(ProjectFlowStatus),
  context: ProjectContextSchema,
  collectedData: z.record(z.any()),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'luminor', 'system']),
    content: z.string(),
    timestamp: z.date(),
    stepNumber: z.number(),
    metadata: z.record(z.any()).optional(),
  })),
  generatedAssets: z.array(z.any()),
  intermediateResults: z.array(z.any()),
  completedGoals: z.array(z.string()),
  pendingGoals: z.array(z.string()),
  startedAt: z.date(),
  lastActiveAt: z.date(),
  completedAt: z.date().optional(),
  estimatedTimeRemaining: z.number().optional(),
});

export type ValidatedProjectContext = z.infer<typeof ProjectContextSchema>;
export type ValidatedProjectFlowState = z.infer<typeof ProjectFlowStateSchema>;
