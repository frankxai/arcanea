/**
 * Memories API Route
 *
 * GET /api/bonds/[userId]/memories - Get memories for user
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { getMemories } from '@arcanea/database/services/bond-service';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';

/**
 * GET /api/bonds/[userId]/memories
 *
 * Fetch memories for user across all Luminors or specific Luminor
 *
 * Query parameters:
 * - luminorId: Optional Luminor ID to filter by
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return errorResponse('INVALID_INPUT', 'User ID is required', 400);
    }

    const { searchParams } = new URL(request.url);
    const luminorId = searchParams.get('luminorId') || undefined;

    // Fetch memories
    const memoriesData = await getMemories(supabaseServer, userId, luminorId);

    return successResponse(memoriesData);
  } catch (error) {
    return handleApiError(error);
  }
}
