import { NextRequest, NextResponse } from 'next/server';
import { followUser, unfollowUser } from '@/services/follow-service';
import { requireAuth, validateOwnership } from '@/lib/auth/middleware';
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/rate-limiter';
import { validateBody, followSchema } from '@/lib/validation/schemas';

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
    const validationResult = await validateBody(req, followSchema);
    if (!validationResult.success) return validationResult.error;
    const { followerId, followingId } = validationResult.data;

    // 4. Verify ownership (user can only follow as themselves)
    const ownershipError = validateOwnership(user.id, followerId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    const follow = await followUser(followerId, followingId);
    return NextResponse.json({ success: true, data: follow });
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
    const validationResult = await validateBody(req, followSchema);
    if (!validationResult.success) return validationResult.error;
    const { followerId, followingId } = validationResult.data;

    // 4. Verify ownership
    const ownershipError = validateOwnership(user.id, followerId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    await unfollowUser(followerId, followingId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
