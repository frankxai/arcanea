/**
 * Creations API Route
 *
 * GET /api/creations - List creations with filters
 * POST /api/creations - Create new creation
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase';
import {
  listCreations,
  createCreation,
} from '@arcanea/database/services/creation-service';
import {
  successResponse,
  errorResponse,
  handleApiError,
  parseRequestBody,
  parsePaginationParams,
  parseBoolean,
} from '@/lib/api-utils';
import { VALIDATION_RULES, type CreationFilters } from '@arcanea/database/types/api-responses';

/**
 * GET /api/creations
 *
 * List creations with optional filters
 *
 * Query parameters:
 * - type: Creation type filter
 * - luminorId: Filter by Luminor
 * - status: Filter by status
 * - isPublic: Filter by visibility
 * - tags: Comma-separated tags
 * - dateFrom: Start date (ISO string)
 * - dateTo: End date (ISO string)
 * - sortBy: Sort field
 * - sortOrder: Sort direction (asc/desc)
 * - page: Page number
 * - pageSize: Items per page
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse pagination
    const { page, pageSize } = parsePaginationParams(searchParams);

    // Parse filters
    const filters: CreationFilters = {
      page,
      pageSize,
    };

    // Type filter
    const type = searchParams.get('type');
    if (type && ['image', 'music', 'video', 'text', 'multimodal'].includes(type)) {
      filters.type = type as any;
    }

    // Luminor ID filter
    const luminorId = searchParams.get('luminorId');
    if (luminorId) {
      filters.luminorId = luminorId;
    }

    // Status filter
    const status = searchParams.get('status');
    if (status && ['draft', 'processing', 'published', 'archived'].includes(status)) {
      filters.status = status as any;
    }

    // Visibility filter
    const isPublicParam = searchParams.get('isPublic');
    if (isPublicParam !== null) {
      filters.isPublic = parseBoolean(isPublicParam, true);
    }

    // Tags filter
    const tagsParam = searchParams.get('tags');
    if (tagsParam) {
      filters.tags = tagsParam.split(',').map(tag => tag.trim()).filter(Boolean);
    }

    // Date filters
    const dateFrom = searchParams.get('dateFrom');
    if (dateFrom) {
      filters.dateFrom = dateFrom;
    }

    const dateTo = searchParams.get('dateTo');
    if (dateTo) {
      filters.dateTo = dateTo;
    }

    // Sort options
    const sortBy = searchParams.get('sortBy');
    if (sortBy && ['created_at', 'updated_at', 'like_count', 'view_count'].includes(sortBy)) {
      filters.sortBy = sortBy as any;
    }

    const sortOrder = searchParams.get('sortOrder');
    if (sortOrder && ['asc', 'desc'].includes(sortOrder)) {
      filters.sortOrder = sortOrder as any;
    }

    // Fetch creations
    const result = await listCreations(supabaseServer, filters);

    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/creations
 *
 * Create new creation
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await parseRequestBody(request);
    if (!body) {
      return errorResponse('INVALID_INPUT', 'Invalid request body', 400);
    }

    // Validate input using Zod
    const createSchema = z.object({
      userId: z.string().uuid(),
      title: z
        .string()
        .min(VALIDATION_RULES.title.minLength)
        .max(VALIDATION_RULES.title.maxLength),
      description: z.string().max(VALIDATION_RULES.description.maxLength).optional(),
      type: z.enum(['image', 'music', 'video', 'text', 'multimodal']),
      fileUrl: z.string().url(),
      thumbnailUrl: z.string().url().optional(),
      fileSize: z.number().positive().optional(),
      fileFormat: z.string().max(50).optional(),
      aiTool: z.string().max(50).optional(),
      prompt: z.string().max(5000).optional(),
      model: z.string().max(100).optional(),
      generationParams: z.record(z.any()).optional(),
      seed: z.number().int().optional(),
      metadata: z.record(z.any()).optional(),
      status: z.enum(['draft', 'published']).optional(),
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

    const validation = createSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        'VALIDATION_ERROR',
        'Invalid input',
        400,
        validation.error.errors
      );
    }

    const { userId, ...creationData } = validation.data;

    // Create creation
    const creation = await createCreation(supabaseServer, userId, creationData);

    return successResponse({ creation }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
