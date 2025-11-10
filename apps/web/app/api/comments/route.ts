import { NextRequest, NextResponse } from 'next/server';
import { createComment, getCreationComments } from '@/services/comment-service';
import { requireAuth, optionalAuth, validateOwnership } from '@/lib/auth/middleware';
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/rate-limiter';
import { validateBody, validateQuery, createCommentSchema, commentQuerySchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  try {
    // 1. Optional auth (comments are public but we track the viewer)
    const { user } = await optionalAuth(req);

    // 2. Apply rate limiting (generous for read operations)
    const rateLimitResult = await applyRateLimit(req, RateLimitPresets.generous, user?.id);
    if (rateLimitResult) return rateLimitResult;

    // 3. Validate query parameters
    const validationResult = validateQuery(req, commentQuerySchema);
    if (!validationResult.success) return validationResult.error;
    const { creationId, page, pageSize } = validationResult.data;

    // 4. Execute business logic
    const comments = await getCreationComments(creationId, { page, pageSize });
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;

    // 2. Apply rate limiting
    const rateLimitResult = await applyRateLimit(req, RateLimitPresets.standard, user.id);
    if (rateLimitResult) return rateLimitResult;

    // 3. Validate request body
    const validationResult = await validateBody(req, createCommentSchema);
    if (!validationResult.success) return validationResult.error;
    const data = validationResult.data;

    // 4. Verify ownership
    const ownershipError = validateOwnership(user.id, data.userId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    const comment = await createComment(data);
    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
