/**
 * User Bonds API Route
 *
 * GET /api/bonds/[userId] - Get all bonds for a user
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { getUserBonds } from '@arcanea/database/services/bond-service';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';

/**
 * GET /api/bonds/[userId]
 *
 * Fetch all Luminor bonds for a user
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

    // Fetch all bonds for user
    const bondsData = await getUserBonds(supabaseServer, userId);

    return successResponse(bondsData);
  } catch (error) {
    return handleApiError(error);
  }
}
