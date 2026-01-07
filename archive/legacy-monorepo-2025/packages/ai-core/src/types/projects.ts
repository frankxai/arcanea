// Type definitions for Projects
export enum ProjectFlowStatus {
  IDLE = 'idle',
  STARTED = 'started',
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum EmotionalTone {
  JOY = 'joy',
  EXCITEMENT = 'excitement',
  CURIOSITY = 'curiosity',
  COMPASSION = 'compassion',
  PRIDE = 'pride',
  CONCERN = 'concern',
  DETERMINATION = 'determination',
  WONDER = 'wonder',
  PEACE = 'peace',
  INSPIRATION = 'inspiration',
  PLAYFULNESS = 'playfulness',
  WISDOM = 'wisdom',
  ENCOURAGEMENT = 'encouragement',
  FOCUS = 'focus'
}

export interface Project {
  id: string;
  userId: string;
  templateId: string;
  status: ProjectFlowStatus;
  currentStep: number;
  totalSteps: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectState {
  projectId: string;
  step: number;
  data: any;
  completed: boolean;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  steps: ProjectStep[];
}

export interface ProjectStep {
  id: string;
  order: number;
  title: string;
  description: string;
  type: string;
}
