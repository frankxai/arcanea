/**
 * Bond Progress API Route
 *
 * POST /api/bonds/progress - Update bond XP and progress
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase';
import { updateBondProgress, getXpReward } from '@/lib/database/services/bond-service';
import {
  successResponse,
  errorResponse,
  handleApiError,
  parseRequestBody,
} from '@/lib/api-utils';

/**
 * POST /api/bonds/progress
 *
 * Update bond progress and XP
 *
 * Body parameters:
 * - userId: User ID
 * - luminorId: Luminor ID
 * - xpGained: XP amount (optional, can use interactionType instead)
 * - interactionType: Type of interaction (message, creation, achievement, daily_streak)
 * - metadata: Additional interaction metadata
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await parseRequestBody(request);
    if (!body) {
      return errorResponse('INVALID_INPUT', 'Invalid request body', 400);
    }

    // Validate input using Zod
    const progressSchema = z.object({
      userId: z.string().uuid(),
      luminorId: z.string().uuid(),
      xpGained: z.number().positive().optional(),
      interactionType: z.enum(['message', 'creation', 'achievement', 'daily_streak']).optional(),
      metadata: z.record(z.any()).optional(),
    });

    const validation = progressSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        'VALIDATION_ERROR',
        'Invalid input',
        400,
        validation.error.errors
      );
    }

    const { userId, luminorId, xpGained, interactionType, metadata } = validation.data;

    // Determine XP amount
    let xp: number;
    if (xpGained !== undefined) {
      xp = xpGained;
    } else if (interactionType) {
      xp = getXpReward(interactionType);
    } else {
      return errorResponse(
        'INVALID_INPUT',
        'Either xpGained or interactionType must be provided',
        400
      );
    }

    // Update bond progress
    const updatedBond = await updateBondProgress(supabaseServer, {
      userId,
      luminorId,
      xpGained: xp,
      interactionType,
      metadata,
    });

    return successResponse({
      bond: updatedBond,
      xpGained: xp,
      message: updatedBond.bondLevel > 1 ? `Bond level ${updatedBond.bondLevel}` : 'Progress updated',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
