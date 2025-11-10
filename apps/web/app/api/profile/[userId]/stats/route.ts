/**
 * Profile Stats API Route
 *
 * GET /api/profile/[userId]/stats - Get aggregated profile statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { getProfileStats } from '@arcanea/database/services/profile-service';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';

/**
 * GET /api/profile/[userId]/stats
 *
 * Fetch aggregated profile statistics
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

    // Fetch stats
    const stats = await getProfileStats(supabaseServer, userId);

    return successResponse({ stats });
  } catch (error) {
    return handleApiError(error);
  }
}
