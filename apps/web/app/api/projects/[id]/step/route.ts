/**
 * Project Step API Route
 * POST /api/projects/[id]/step
 *
 * Note: This route is currently stubbed. Full implementation requires ai-core integration.
 */

import { NextRequest, NextResponse } from 'next/server';

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

    // Placeholder response - full implementation requires ai-core
    return NextResponse.json({
      projectId,
      status: 'in_progress',
      message: 'Project flow engine not yet implemented',
      currentStep: 1,
      totalSteps: 5,
    });
  } catch (error) {
    console.error('Error in project step:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
