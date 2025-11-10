import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, markAllAsRead } from '@/services/notification-service';
import { requireAuth, validateOwnership } from '@/lib/auth/middleware';
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/rate-limiter';
import { validateQuery, validateBody, notificationQuerySchema, markNotificationsReadSchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;

    // 2. Apply rate limiting (generous for notifications)
    const rateLimitResult = await applyRateLimit(req, RateLimitPresets.generous, user.id);
    if (rateLimitResult) return rateLimitResult;

    // 3. Validate query parameters
    const validationResult = validateQuery(req, notificationQuerySchema);
    if (!validationResult.success) return validationResult.error;
    const { userId, page, pageSize } = validationResult.data;

    // 4. Verify ownership (users can only see their own notifications)
    const ownershipError = validateOwnership(user.id, userId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    const notifications = await getNotifications(userId, { page, pageSize });
    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await requireAuth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;

    // 2. Apply rate limiting
    const rateLimitResult = await applyRateLimit(req, RateLimitPresets.standard, user.id);
    if (rateLimitResult) return rateLimitResult;

    // 3. Validate request body
    const validationResult = await validateBody(req, markNotificationsReadSchema);
    if (!validationResult.success) return validationResult.error;
    const { userId } = validationResult.data;

    // 4. Verify ownership
    const ownershipError = validateOwnership(user.id, userId);
    if (ownershipError) return ownershipError;

    // 5. Execute business logic
    await markAllAsRead(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
