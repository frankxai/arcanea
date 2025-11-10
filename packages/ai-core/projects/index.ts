/**
 * Project Flows - Complete Export
 * Multi-turn creation flows for Arcanea MVP
 */

// Core Engine
export { ProjectFlowEngine } from './flow-engine';
export type { ProjectFlowResponse } from './flow-engine';

// State Management
export {
  ProjectStateManager,
  projectStateManager,
} from './state-manager';
export type {
  ProjectSnapshot,
  ProjectProgressSummary,
  ProjectStats,
  ProjectExport,
} from './state-manager';

// Result Aggregation
export {
  ProjectAggregator,
  projectAggregator,
} from './aggregator';
export type { ProjectShowcase } from './aggregator';

// Optimization
export {
  ProjectFlowOptimizer,
  projectFlowOptimizer,
} from './optimizer';
export type {
  ProjectCostEstimate,
  CostBreakdownItem,
  OptimizationRecommendation,
} from './optimizer';

// Templates
export {
  projectTemplates,
  projectTemplatesMap,
  getTemplateBySlug,
  getTemplateById,
  getTemplatesByCategory,
  getTemplatesByDifficulty,
  characterDesignTemplate,
  worldBuildingTemplate,
  storyCreationTemplate,
  musicCompositionTemplate,
  visualSeriesTemplate,
} from './templates';

// Types
export * from '../types/projects';
