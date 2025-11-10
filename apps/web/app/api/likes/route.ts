import { NextRequest, NextResponse } from 'next/server';
import { likeCreation, unlikeCreation } from '@/services/like-service';
import { requireAuth, validateOwnership } from '@/lib/auth/middleware';
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/rate-limiter';
import { validateBody, likeSchema } from '@/lib/validation/schemas';

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
    const validationResult = await validateBody(req, likeSchema);
    if (!validationResult.success) return validationResult.error;
    const { userId, creationId } = validationResult.data;

    // 4. Verify ownership
    const ownershipError = validateOwnership(user.id, userId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    const result = await likeCreation(userId, creationId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;

    // 2. Apply rate limiting
    const rateLimitResult = await applyRateLimit(req, RateLimitPresets.standard, user.id);
    if (rateLimitResult) return rateLimitResult;

    // 3. Validate request body
    const validationResult = await validateBody(req, likeSchema);
    if (!validationResult.success) return validationResult.error;
    const { userId, creationId } = validationResult.data;

    // 4. Verify ownership
    const ownershipError = validateOwnership(user.id, userId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    await unlikeCreation(userId, creationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
