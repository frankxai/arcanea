/**
 * Specific Bond API Route
 *
 * GET /api/bonds/[userId]/[luminorId] - Get specific user-Luminor bond
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { getBondWithLuminor, createBond } from '@/lib/database/services/bond-service';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';

/**
 * GET /api/bonds/[userId]/[luminorId]
 *
 * Fetch specific bond between user and Luminor
 * Creates bond if it doesn't exist
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; luminorId: string }> }
) {
  try {
    const { userId, luminorId } = await params;

    if (!userId || !luminorId) {
      return errorResponse('INVALID_INPUT', 'User ID and Luminor ID are required', 400);
    }

    try {
      // Try to fetch existing bond
      const bondData = await getBondWithLuminor(supabaseServer, userId, luminorId);
      return successResponse(bondData);
    } catch (error) {
      // If bond doesn't exist, create it
      if (error instanceof Error && error.message.includes('not found')) {
        const newBond = await createBond(supabaseServer, userId, luminorId);

        // Fetch with Luminor details
        const bondData = await getBondWithLuminor(supabaseServer, userId, luminorId);
        return successResponse(bondData, 201);
      }

      throw error;
    }
  } catch (error) {
    return handleApiError(error);
  }
}
