/**
 * Single Creation API Route
 *
 * GET /api/creations/[id] - Fetch single creation
 * PATCH /api/creations/[id] - Update creation
 * DELETE /api/creations/[id] - Soft delete creation
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase';
import {
  getCreation,
  updateCreation,
  deleteCreation,
  incrementViewCount,
} from '@/lib/database/services/creation-service';
import {
  successResponse,
  errorResponse,
  handleApiError,
  parseRequestBody,
  parseBoolean,
} from '@/lib/api-utils';
import { VALIDATION_RULES } from '@/lib/database/types/api-responses';

/**
 * GET /api/creations/[id]
 *
 * Fetch single creation with creator info
 *
 * Query parameters:
 * - includePrivate: Include private creations (requires ownership)
 * - incrementViews: Increment view count (default: true)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return errorResponse('INVALID_INPUT', 'Creation ID is required', 400);
    }

    const { searchParams } = new URL(request.url);
    const includePrivate = parseBoolean(searchParams.get('includePrivate'), false);
    const incrementViews = parseBoolean(searchParams.get('incrementViews'), true);

    // Fetch creation
    const creation = await getCreation(supabaseServer, id, includePrivate);

    if (!creation) {
      return errorResponse('NOT_FOUND', 'Creation not found', 404);
    }

    // Increment view count asynchronously
    if (incrementViews && creation.visibility === 'public') {
      incrementViewCount(supabaseServer, id).catch(console.error);
    }

    return successResponse({ creation });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PATCH /api/creations/[id]
 *
 * Update creation metadata
 *
 * Body parameters:
 * - userId: User ID (for authorization)
 * - title: Updated title
 * - description: Updated description
 * - thumbnailUrl: Updated thumbnail
 * - status: Updated status
 * - isPublic: Updated visibility
 * - tags: Updated tags
 * - categories: Updated categories
 * - license: Updated license
 * - allowRemix: Updated remix permission
 * - allowCommercial: Updated commercial permission
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return errorResponse('INVALID_INPUT', 'Creation ID is required', 400);
    }

    // Parse request body
    const body = await parseRequestBody(request);
    if (!body) {
      return errorResponse('INVALID_INPUT', 'Invalid request body', 400);
    }

    // Validate input using Zod
    const updateSchema = z.object({
      userId: z.string().uuid(), // Required for authorization
      title: z
        .string()
        .min(VALIDATION_RULES.title.minLength)
        .max(VALIDATION_RULES.title.maxLength)
        .optional(),
      description: z.string().max(VALIDATION_RULES.description.maxLength).optional(),
      thumbnailUrl: z.string().url().optional().or(z.literal('')),
      status: z.enum(['draft', 'published', 'archived']).optional(),
      isPublic: z.boolean().optional(),
      tags: z
        .array(z.string().max(VALIDATION_RULES.tags.maxLength))
        .max(VALIDATION_RULES.tags.maxCount)
        .optional(),
      categories: z.array(z.string().max(50)).max(10).optional(),
      license: z
        .enum([
          'cc_by',
          'cc_by_sa',
          'cc_by_nc',
          'cc_by_nc_sa',
          'cc_by_nd',
          'all_rights_reserved',
          'public_domain',
        ])
        .optional(),
      allowRemix: z.boolean().optional(),
      allowCommercial: z.boolean().optional(),
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

    const { userId, ...updates } = validation.data;

    // Update creation
    const updatedCreation = await updateCreation(supabaseServer, id, userId, updates);

    return successResponse({ creation: updatedCreation });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/creations/[id]
 *
 * Soft delete creation (set status to archived)
 *
 * Body parameters:
 * - userId: User ID (for authorization)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return errorResponse('INVALID_INPUT', 'Creation ID is required', 400);
    }

    // Parse request body to get user ID for authorization
    const body = await parseRequestBody(request);
    if (!body || !body.userId) {
      return errorResponse('INVALID_INPUT', 'User ID is required for authorization', 400);
    }

    const userId = body.userId as string;

    // Delete (archive) creation
    await deleteCreation(supabaseServer, id, userId);

    return successResponse({ message: 'Creation deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
