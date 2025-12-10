/**
 * Create Project API Route
 * POST /api/projects/create
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  ProjectFlowEngine,
  projectStateManager,
  getTemplateBySlug,
  projectFlowOptimizer,
  ProjectContext,
  ProjectFlowState,
  ProjectFlowStatus,
  OptimizationContext,
} from '@arcanea/ai-core';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { templateSlug, userId, context, optimization } = body;

    if (!templateSlug || !userId || !context) {
      return NextResponse.json(
        { error: 'Missing required fields: templateSlug, userId, context' },
        { status: 400 }
      );
    }

    // Get template
    const template = getTemplateBySlug(templateSlug);
    if (!template) {
      return NextResponse.json(
        { error: `Template not found: ${templateSlug}` },
        { status: 404 }
      );
    }

    // Generate IDs
    const projectId = generateProjectId();
    const sessionId = generateSessionId();

    // Build project context
    const projectContext: ProjectContext = {
      templateName: template.name,
      projectType: template.projectType,
      userGoals: context.userGoals || [],
      preferences: context.preferences || {},
      constraints: context.constraints,
    };

    // Optimize if requested
    let optimizationPlan;
    if (optimization) {
      const optContext: OptimizationContext = {
        userBudget: optimization.budget,
        prioritizeQuality: optimization.prioritizeQuality,
        prioritizeSpeed: optimization.prioritizeSpeed,
        enableCaching: optimization.enableCaching !== false,
        batchRequests: optimization.batchRequests !== false,
      };

      optimizationPlan = await projectFlowOptimizer.optimizeFlow(template, optContext);
    }

    // Initialize flow engine
    const initialState: Partial<ProjectFlowState> = {
      projectId,
      userId,
      sessionId,
      context: projectContext,
    };

    const flowEngine = new ProjectFlowEngine(template, initialState);

    // Start the flow
    const response = await flowEngine.start();

    // Save state
    await projectStateManager.saveState(response.state);

    // Return response with project details
    return NextResponse.json({
      success: true,
      projectId,
      sessionId,
      template: {
        id: template.id,
        name: template.name,
        slug: template.slug,
        estimatedDuration: template.estimatedDuration,
        estimatedCost: template.estimatedCost,
      },
      optimization: optimizationPlan,
      currentStep: response.currentStep,
      message: response.message,
      suggestions: response.suggestions,
      progress: response.progress,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function generateProjectId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
