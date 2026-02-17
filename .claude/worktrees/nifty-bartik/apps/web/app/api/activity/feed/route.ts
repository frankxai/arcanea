import { NextRequest, NextResponse } from 'next/server';
import { getPersonalizedFeed } from '@/services/activity-service';
import { requireAuth, validateOwnership } from '@/lib/auth/middleware';
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/rate-limiter';
import { validateQuery, activityFeedQuerySchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;

    // 2. Apply rate limiting (generous for feed)
    const rateLimitResult = await applyRateLimit(req, RateLimitPresets.generous, user.id);
    if (rateLimitResult) return rateLimitResult;

    // 3. Validate query parameters
    const validationResult = validateQuery(req, activityFeedQuerySchema);
    if (!validationResult.success) return validationResult.error;
    const { userId, page, pageSize } = validationResult.data;

    // 4. Verify ownership (users can only see their own personalized feed)
    const ownershipError = validateOwnership(user.id, userId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    const feed = await getPersonalizedFeed(userId, { page, pageSize });
    return NextResponse.json({ success: true, data: feed });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
