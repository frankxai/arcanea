/**
 * Example Integration - Project Flows
 * Demonstrates how to use the project flow system
 */

import { ProjectFlowEngine } from './flow-engine';
import { projectStateManager } from './state-manager';
import { projectAggregator } from './aggregator';
import { projectFlowOptimizer } from './optimizer';
import { getTemplateBySlug } from './templates';
import {
  ProjectContext,
  ProjectFlowState,
  ProjectFlowStatus,
  OptimizationContext,
} from '../types/projects';

/**
 * Example 1: Create a Character Design Project
 */
export async function exampleCharacterDesign() {
  console.log('=== Character Design Project ===\n');

  // 1. Get the template
  const template = getTemplateBySlug('character-design');
  if (!template) {
    throw new Error('Template not found');
  }

  console.log(`Template: ${template.name}`);
  console.log(`Estimated Duration: ${template.estimatedDuration} minutes`);
  console.log(`Estimated Cost: ${template.estimatedCost.arcPoints} ARC\n`);

  // 2. Set up project context
  const projectContext: ProjectContext = {
    templateName: template.name,
    projectType: template.projectType,
    userGoals: ['Create a fantasy fire mage character'],
    preferences: {
      style: 'fantasy',
      mood: 'heroic',
      tone: 'epic',
      complexity: 'moderate',
    },
  };

  // 3. Initialize the flow
  const initialState: Partial<ProjectFlowState> = {
    projectId: 'proj_example_123',
    userId: 'user_123',
    sessionId: 'sess_example_123',
    context: projectContext,
  };

  const flowEngine = new ProjectFlowEngine(template, initialState);

  // 4. Start the flow
  console.log('Starting flow...\n');
  let response = await flowEngine.start();

  console.log(`Luminor: ${response.message}\n`);
  console.log(`Progress: ${response.progress}%\n`);

  // 5. Simulate user interactions
  const userInputs = [
    'A fire mage who protects her village from dark forces',
    'Brave, impulsive, passionate, protective, sometimes reckless',
    'Tall woman with flowing red hair, amber eyes, wearing red and gold robes with flame patterns',
    'She grew up in a volcanic region, lost her family to raiders, trained with a fire sage',
    'Looks perfect!',
  ];

  for (const input of userInputs) {
    console.log(`User: ${input}\n`);

    response = await flowEngine.processUserInput(input);

    console.log(`Luminor: ${response.message}\n`);
    console.log(`Progress: ${response.progress}%`);
    console.log(`Assets Generated: ${response.state.generatedAssets.length}\n`);

    if (response.completed) {
      console.log('=== Project Completed! ===\n');
      break;
    }

    // Save state after each step
    await projectStateManager.saveState(response.state);
  }

  // 6. Aggregate results
  const results = await projectAggregator.aggregateResults(response.state);

  console.log('=== Results ===');
  console.log(`Title: ${results.summary.title}`);
  console.log(`Description: ${results.summary.description}`);
  console.log(`\nAssets Generated: ${results.assets.length}`);
  for (const asset of results.assets) {
    console.log(`  - ${asset.type}: ${asset.id}`);
  }

  console.log(`\nStats:`);
  console.log(`  Duration: ${results.stats.totalDuration} minutes`);
  console.log(`  ARC Spent: ${results.stats.arcSpent}`);
  console.log(`  API Cost: $${results.stats.apiCostUsd?.toFixed(2)}`);

  return results;
}

/**
 * Example 2: Create a Music Composition with Optimization
 */
export async function exampleMusicComposition() {
  console.log('=== Music Composition Project ===\n');

  const template = getTemplateBySlug('music-composition');
  if (!template) throw new Error('Template not found');

  // Apply optimizations
  const optContext: OptimizationContext = {
    userBudget: {
      maxCost: 0.20,
      maxArc: 500,
    },
    prioritizeSpeed: true,
    enableCaching: true,
    batchRequests: true,
  };

  const optimizationPlan = await projectFlowOptimizer.optimizeFlow(
    template,
    optContext
  );

  console.log('Optimization Plan:');
  console.log(`  Original Cost: $${optimizationPlan.originalCost.toFixed(2)}`);
  console.log(`  Optimized Cost: $${optimizationPlan.optimizedCost.toFixed(2)}`);
  console.log(`  Savings: $${optimizationPlan.savings.toFixed(2)}\n`);

  console.log('Strategies:');
  for (const strategy of optimizationPlan.strategies) {
    console.log(`  - ${strategy.name}: ${strategy.description}`);
  }

  // Continue with project creation...
  return optimizationPlan;
}

/**
 * Example 3: Resume a Paused Project
 */
export async function exampleResumeProject(projectId: string) {
  console.log('=== Resuming Project ===\n');

  // 1. Load saved state
  const state = await projectStateManager.loadState(projectId);
  if (!state) {
    throw new Error('Project not found');
  }

  console.log(`Project: ${state.projectId}`);
  console.log(`Status: ${state.status}`);
  console.log(`Current Step: ${state.currentStep}/${state.totalSteps}`);

  // 2. Get progress summary
  const progress = await projectStateManager.getProgressSummary(projectId);
  if (progress) {
    console.log(`\nProgress:`);
    console.log(`  Overall: ${progress.overallProgress}%`);
    console.log(`  Assets: ${progress.assetsGenerated}`);
    console.log(`  Goals Completed: ${progress.goalsCompleted}/${progress.goalsCompleted + progress.goalsPending}`);
  }

  // 3. Resume if paused
  if (state.status === ProjectFlowStatus.PAUSED) {
    await projectStateManager.resumeProject(projectId);
    console.log('\nProject resumed!');
  }

  // 4. Restore flow engine
  const template = getTemplateBySlug('character-design')!;
  const flowEngine = new ProjectFlowEngine(template, state);
  flowEngine.restoreState(state);

  console.log('\nReady to continue...\n');

  return flowEngine;
}

/**
 * Example 4: Create Showcase for Completed Project
 */
export async function exampleCreateShowcase(projectId: string) {
  console.log('=== Creating Showcase ===\n');

  const state = await projectStateManager.loadState(projectId);
  if (!state) throw new Error('Project not found');

  if (state.status !== ProjectFlowStatus.COMPLETED) {
    throw new Error('Project not completed yet');
  }

  const showcase = await projectAggregator.createShowcase(state);

  console.log('Showcase:');
  console.log(`  Title: ${showcase.title}`);
  console.log(`  Description: ${showcase.description}`);
  console.log(`  Cover: ${showcase.coverImage}`);
  console.log(`\nFeatured Assets: ${showcase.featuredAssets.length}`);
  for (const asset of showcase.featuredAssets) {
    console.log(`  - ${asset.type}: ${asset.url || asset.content?.slice(0, 50)}`);
  }

  console.log(`\nTags: ${showcase.tags.join(', ')}`);

  return showcase;
}

/**
 * Example 5: Export Project Bundle
 */
export async function exampleExportProject(projectId: string) {
  console.log('=== Exporting Project ===\n');

  const state = await projectStateManager.loadState(projectId);
  if (!state) throw new Error('Project not found');

  const exportData = await projectStateManager.exportProject(projectId);

  console.log('Export Package:');
  console.log(`  Version: ${exportData.version}`);
  console.log(`  Exported At: ${exportData.exportedAt}`);
  console.log(`  Snapshots: ${exportData.snapshots.length}`);

  // Aggregate for bundle
  const results = await projectAggregator.aggregateResults(state);

  console.log(`\nBundle Contents:`);
  for (const file of results.exportBundle!.files) {
    console.log(`  - ${file.filename} (${file.type})`);
  }

  console.log(`\nREADME Preview:`);
  console.log(results.exportBundle!.readme.slice(0, 200) + '...');

  return exportData;
}

/**
 * Example 6: Get User's Active Projects
 */
export async function exampleGetUserProjects(userId: string) {
  console.log('=== User Projects ===\n');

  const activeProjects = await projectStateManager.getUserActiveProjects(userId);
  const completedProjects = await projectStateManager.getUserCompletedProjects(userId);

  console.log(`Active Projects: ${activeProjects.length}`);
  for (const project of activeProjects) {
    const progress = await projectStateManager.getProgressSummary(project.projectId);
    console.log(`  - ${project.context.templateName}`);
    console.log(`    Progress: ${progress?.overallProgress}%`);
    console.log(`    Last Active: ${project.lastActiveAt.toLocaleDateString()}\n`);
  }

  console.log(`\nCompleted Projects: ${completedProjects.length}`);
  for (const project of completedProjects) {
    const stats = await projectStateManager.getProjectStats(project.projectId);
    console.log(`  - ${project.context.templateName}`);
    console.log(`    Assets: ${stats?.assetsGenerated}`);
    console.log(`    Completed: ${project.completedAt?.toLocaleDateString()}\n`);
  }

  return { activeProjects, completedProjects };
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║  Arcanea Project Flows - Examples       ║');
  console.log('╚══════════════════════════════════════════╝\n');

  try {
    // Example 1: Character Design
    await exampleCharacterDesign();

    console.log('\n' + '='.repeat(50) + '\n');

    // Example 2: Music with Optimization
    await exampleMusicComposition();

    console.log('\n' + '='.repeat(50) + '\n');

    console.log('✅ All examples completed successfully!\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Uncomment to run examples
// runAllExamples();
