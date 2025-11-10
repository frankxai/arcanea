/**
 * Project Step API Route
 * POST /api/projects/[id]/step
 */

import { NextRequest, NextResponse } from 'next/server';
import { ProjectFlowEngine } from '@arcanea/ai-core/projects/flow-engine';
import { projectStateManager } from '@arcanea/ai-core/projects/state-manager';
import { getTemplateById } from '@arcanea/ai-core/projects/templates';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const body = await request.json();

    const { userInput } = body;

    if (!userInput) {
      return NextResponse.json(
        { error: 'Missing required field: userInput' },
        { status: 400 }
      );
    }

    // Load project state
    const state = await projectStateManager.loadState(projectId);
    if (!state) {
      return NextResponse.json(
        { error: `Project not found: ${projectId}` },
        { status: 404 }
      );
    }

    // Check if project is in valid state
    if (state.status === 'completed') {
      return NextResponse.json(
        { error: 'Project is already completed' },
        { status: 400 }
      );
    }

    if (state.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Project is cancelled' },
        { status: 400 }
      );
    }

    // Get template
    const template = getTemplateById(state.templateId);
    if (!template) {
      return NextResponse.json(
        { error: `Template not found: ${state.templateId}` },
        { status: 404 }
      );
    }

    // Restore flow engine
    const flowEngine = new ProjectFlowEngine(template, state);
    flowEngine.restoreState(state);

    // Process user input
    const response = await flowEngine.processUserInput(userInput);

    // Save updated state
    await projectStateManager.saveState(response.state);

    // Return response
    return NextResponse.json({
      success: true,
      projectId,
      status: response.status,
      currentStep: response.currentStep,
      message: response.message,
      suggestions: response.suggestions,
      progress: response.progress,
      completed: response.completed,
      assets: response.assets,
    });
  } catch (error) {
    console.error('Error processing project step:', error);
    return NextResponse.json(
      {
        error: 'Failed to process step',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve current project state
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    // Load project state
    const state = await projectStateManager.loadState(projectId);
    if (!state) {
      return NextResponse.json(
        { error: `Project not found: ${projectId}` },
        { status: 404 }
      );
    }

    // Get progress summary
    const progress = await projectStateManager.getProgressSummary(projectId);

    return NextResponse.json({
      success: true,
      project: {
        id: state.projectId,
        templateId: state.templateId,
        status: state.status,
        currentStep: state.currentStep,
        totalSteps: state.totalSteps,
        progress,
        assetsGenerated: state.generatedAssets.length,
        goalsCompleted: state.completedGoals.length,
        goalsPending: state.pendingGoals.length,
        startedAt: state.startedAt,
        lastActiveAt: state.lastActiveAt,
        completedAt: state.completedAt,
      },
    });
  } catch (error) {
    console.error('Error retrieving project:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve project',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
