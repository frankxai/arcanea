/**
 * Arcanea Core Type Definitions
 * State-of-the-art TypeScript types for the complete system
 */

// Agent Types
export interface Agent {
  id: string;
  name: string;
  command: string;
  court: string;
  element: 'fire' | 'water' | 'earth' | 'air' | 'void' | 'integration' | 'master';
  frequency: string;
  specialty: string;
  personality?: string;
  capabilities: string[];
  skills: string[];
  triggers: string[];
  promptTemplate: string;
  examples: string[];
  parameters?: ParameterSchema;
  version: string;
  tier: 'free' | 'premium';
  description?: string;
}

export interface ParameterSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'enum' | 'array';
    required: boolean;
    description: string;
    default?: any;
    options?: string[];
  };
}

export interface AgentCourt {
  guardian: string;
  frequency: string;
  element: string;
  description: string;
  agents: Agent[];
}

export interface AgentRegistry {
  version: string;
  totalAgents: number;
  courts: {
    elemental: {
      fire: AgentCourt;
      water: AgentCourt;
      earth: AgentCourt;
      air: AgentCourt;
      void: AgentCourt;
    };
    integration: {
      unity: AgentCourt;
      balance: AgentCourt;
    };
    master: {
      luminor: AgentCourt;
    };
  };
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  gate: number;
  frequency: string;
  guardian: string;
  element: string;
  invocation: string;
  description: string;
  whenToUse: string[];
  process: SkillStep[];
  parameters?: ParameterSchema;
  output: string;
  examples: SkillExample[];
  relatedSkills?: string[];
  agentAffinity?: {
    best: string[];
    compatible: string[];
  };
  tier: 'free' | 'premium';
}

export interface SkillStep {
  step: number;
  name: string;
  description: string;
  action?: string;
}

export interface SkillExample {
  name: string;
  input: string;
  command: string;
  output: string;
}

// Workflow Types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  phases: WorkflowPhase[];
  orchestrator: string;
  onComplete?: string;
  tags?: string[];
}

export interface WorkflowPhase {
  id: string;
  name: string;
  agent: string;
  skill?: string;
  action: 'generate' | 'analyze' | 'enhance' | 'transform' | 'validate' | 'suggest' | 'workflow';
  prompt?: string;
  input?: string[];
  output: string;
  timeout?: number;
  parallel?: boolean;
  critical?: boolean;
}

export interface WorkflowResult {
  success: boolean;
  workflowId: string;
  workflow: string;
  duration: number;
  phases: PhaseResult[];
  results: { [key: string]: any };
  errors: WorkflowError[];
  metadata: WorkflowMetadata;
  finalOutput?: any;
}

export interface PhaseResult {
  name: string;
  success: boolean;
  results?: AgentResult[];
  error?: string;
  duration: number;
  agent?: string;
}

export interface AgentResult {
  agent: string;
  agentId: string;
  specialty: string;
  prompt?: string;
  output: string;
  timestamp: string;
}

export interface WorkflowError {
  phase: string;
  error: string;
}

export interface WorkflowMetadata {
  conductor?: string;
  teamSize: number;
  strategy: 'parallel' | 'sequential' | 'hybrid';
}

// Task & Context Types
export interface Task {
  id: string;
  text: string;
  description?: string;
  type?: string;
  context?: TaskContext;
  complexity?: number;
  urgency?: 'low' | 'normal' | 'high' | 'critical';
  scope?: 'small' | 'medium' | 'large' | 'epic';
}

export interface TaskContext {
  [key: string]: any;
}

export interface TaskAnalysis {
  complexity: number;
  domains: string[];
  elementalAffinity: string[];
  urgency: string;
  scope: string;
  keywords: string[];
}

// AI & Generation Types
export interface AIProvider {
  name: string;
  type: 'local' | 'cloud';
  capabilities: string[];
  maxTokens?: number;
  temperature?: number;
}

export interface GenerationRequest {
  agent: Agent;
  task: Task;
  context?: TaskContext;
  parameters?: { [key: string]: any };
}

export interface GenerationResult {
  id: string;
  agent: string;
  agentId: string;
  specialty: string;
  output: string;
  prompt?: string;
  executionTimeMs: number;
  timestamp: string;
  cached?: boolean;
  provider?: string;
}

// UI State Types
export interface UIState {
  sidebarOpen: boolean;
  activeTab: 'prompts' | 'agents' | 'workflows' | 'skills' | 'settings';
  selectedAgent: string | null;
  selectedPrompt: Prompt | null;
  selectedWorkflow: string | null;
  isLoading: boolean;
  error: Error | null;
  theme: 'dark' | 'light' | 'system';
  mode: 'arcane' | 'pro';
}

export interface Prompt {
  id: string;
  name: string;
  content: string;
  tags: PromptTag[];
  negativePrompts?: string;
  category: 'txt2img' | 'img2img' | 'prompts' | 'spells';
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  favorite?: boolean;
}

export interface PromptTag {
  id: string;
  label: string;
  category: string;
  weight: number;
  color: string;
}

// User & Config Types
export interface UserConfig {
  ai: {
    primary: 'opencode' | 'claude' | 'hybrid';
    hybrid: {
      enabled: boolean;
      claudeApiKey?: string;
      thresholds: {
        simple: number;
        medium: number;
      };
    };
    saas?: {
      enabled: boolean;
      endpoint?: string;
      apiKey?: string;
    };
  };
  ui: {
    mode: 'arcane' | 'pro';
    theme: 'dark' | 'light' | 'system';
    sidebarOpen: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  cache: {
    enabled: boolean;
    maxSize: number;
    ttl: number;
  };
}

export interface AppState {
  agents: Agent[];
  prompts: Prompt[];
  workflows: Workflow[];
  skills: Skill[];
  config: UserConfig;
  cache: Map<string, any>;
  metrics: AppMetrics;
}

export interface AppMetrics {
  totalInvocations: number;
  cacheHits: number;
  cacheMisses: number;
  avgExecutionTime: number;
  errors: number;
  workflowsCompleted: number;
  workflowsFailed: number;
}

// Error Types
export interface ArcaneaError extends Error {
  code: string;
  context?: any;
  recoverable: boolean;
}

export type ErrorCode = 
  | 'AGENT_NOT_FOUND'
  | 'WORKFLOW_FAILED'
  | 'AI_GENERATION_FAILED'
  | 'CACHE_ERROR'
  | 'INVALID_PARAMETERS'
  | 'TIMEOUT'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR';

// Event Types
export interface ArcaneaEvent {
  type: string;
  timestamp: string;
  data: any;
}

export type EventType =
  | 'agent:invoked'
  | 'agent:completed'
  | 'agent:failed'
  | 'workflow:started'
  | 'workflow:completed'
  | 'workflow:failed'
  | 'workflow:cancelled'
  | 'skill:executed'
  | 'cache:hit'
  | 'cache:miss'
  | 'error';

// API Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    executionTime: number;
    cached: boolean;
    timestamp: string;
  };
}

// Component Prop Types
export interface AgentCardProps {
  agent: Agent;
  selected?: boolean;
  onClick?: (agent: Agent) => void;
  onInvoke?: (agent: Agent) => void;
}

export interface PromptEditorProps {
  prompt?: Prompt | null;
  agents: Agent[];
  onAgentInvoke: (agentId: string, task: string) => Promise<GenerationResult>;
  onSave: (prompt: Prompt) => Promise<string>;
}

export interface SidebarProps {
  agents: Agent[];
  prompts: Prompt[];
  workflows: Workflow[];
  activeTab: UIState['activeTab'];
  onTabChange: (tab: UIState['activeTab']) => void;
  onSelectPrompt: (prompt: Prompt) => void;
  onSelectAgent: (agentId: string) => void;
  onSelectWorkflow: (workflowId: string) => void;
}

export interface AgentPanelProps {
  selectedAgent: string | null;
  agents: Agent[];
  onInvoke: (agentId: string, task: string) => Promise<GenerationResult>;
  isLoading?: boolean;
}
