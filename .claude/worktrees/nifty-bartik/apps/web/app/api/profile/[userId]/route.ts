/**
 * Profile API Route
 *
 * GET /api/profile/[userId] - Fetch user profile with stats
 * PATCH /api/profile/[userId] - Update user profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase';
import {
  getProfileWithStats,
  updateProfile,
  isUsernameAvailable,
} from '@/lib/database/services/profile-service';
import {
  successResponse,
  errorResponse,
  handleApiError,
  parseRequestBody,
} from '@/lib/api-utils';
import { VALIDATION_RULES } from '@/lib/database/types/api-responses';

/**
 * GET /api/profile/[userId]
 *
 * Fetch user profile with statistics
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

    // Fetch profile with stats
    const profileData = await getProfileWithStats(supabaseServer, userId);

    return successResponse(profileData);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PATCH /api/profile/[userId]
 *
 * Update user profile
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return errorResponse('INVALID_INPUT', 'User ID is required', 400);
    }

    // Parse request body
    const body = await parseRequestBody(request);
    if (!body) {
      return errorResponse('INVALID_INPUT', 'Invalid request body', 400);
    }

    // Validate input using Zod
    const updateSchema = z.object({
      username: z
        .string()
        .min(VALIDATION_RULES.username.minLength)
        .max(VALIDATION_RULES.username.maxLength)
        .regex(
          VALIDATION_RULES.username.pattern,
          'Username can only contain letters, numbers, underscores, and hyphens'
        )
        .optional(),
      displayName: z.string().max(50).optional(),
      bio: z.string().max(VALIDATION_RULES.bio.maxLength).optional(),
      avatarUrl: z.string().url().optional().or(z.literal('')),
      location: z.string().max(100).optional(),
      website: z.string().url().optional().or(z.literal('')),
      preferences: z.record(z.any()).optional(),
    });

    const validation = updateSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        'VALIDATION_ERROR',
        'Invalid input',
        400,
        { errors: validation.error.errors }
      );
    }

    const updates = validation.data;

    // Check username availability if being updated
    if (updates.username) {
      const available = await isUsernameAvailable(
        supabaseServer,
        updates.username,
        userId
      );

      if (!available) {
        return errorResponse(
          'ALREADY_EXISTS',
          'Username is already taken',
          409
        );
      }
    }

    // Update profile
    const updatedProfile = await updateProfile(supabaseServer, userId, updates);

    return successResponse({ profile: updatedProfile });
  } catch (error) {
    return handleApiError(error);
  }
}
