/**
 * Complete Project API Route
 * POST /api/projects/[id]/complete
 */

import { NextRequest, NextResponse } from 'next/server';
import { projectStateManager } from '@arcanea/ai-core/projects/state-manager';
import { projectAggregator } from '@arcanea/ai-core/projects/aggregator';
import { ProjectFlowStatus } from '@arcanea/ai-core/types/projects';

export async function POST(
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

    // Check if project is completable
    if (state.status === ProjectFlowStatus.COMPLETED) {
      return NextResponse.json(
        { error: 'Project is already completed' },
        { status: 400 }
      );
    }

    // Aggregate results
    const results = await projectAggregator.aggregateResults(state);

    // Create showcase
    const showcase = await projectAggregator.createShowcase(state);

    // Get project stats
    const stats = await projectStateManager.getProjectStats(projectId);

    // Mark as completed
    state.status = ProjectFlowStatus.COMPLETED;
    state.completedAt = new Date();
    await projectStateManager.saveState(state);

    // Create final snapshot
    await projectStateManager.createSnapshot(projectId, 'Project Completed', false);

    return NextResponse.json({
      success: true,
      projectId,
      results: {
        summary: results.summary,
        stats: results.stats,
        assetCount: results.assets.length,
      },
      showcase,
      exportBundle: results.exportBundle,
      projectStats: stats,
    });
  } catch (error) {
    console.error('Error completing project:', error);
    return NextResponse.json(
      {
        error: 'Failed to complete project',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve completed project results
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

    if (state.status !== ProjectFlowStatus.COMPLETED) {
      return NextResponse.json(
        { error: 'Project is not completed yet' },
        { status: 400 }
      );
    }

    // Get results
    const results = await projectAggregator.aggregateResults(state);
    const showcase = await projectAggregator.createShowcase(state);

    return NextResponse.json({
      success: true,
      projectId,
      results: {
        summary: results.summary,
        assets: results.assets,
        stats: results.stats,
      },
      showcase,
      exportBundle: results.exportBundle,
    });
  } catch (error) {
    console.error('Error retrieving completed project:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve project results',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
