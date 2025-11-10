#!/bin/bash

# Script to create all social feature API routes
# This completes the final 20% for Department 5

BASE_DIR="apps/web/app/api"

echo "🚀 Creating social feature API routes..."

# Create Likes API routes
echo "Creating likes API..."
cat > "$BASE_DIR/likes/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { likeCreation, unlikeCreation } from '@/services/like-service';

export async function POST(req: NextRequest) {
  try {
    const { userId, creationId } = await req.json();
    const result = await likeCreation(userId, creationId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, creationId } = await req.json();
    await unlikeCreation(userId, creationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

# Create Comments API routes
echo "Creating comments API..."
cat > "$BASE_DIR/comments/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { createComment, getCreationComments } from '@/services/comment-service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const creationId = searchParams.get('creationId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    
    const comments = await getCreationComments(creationId, { page, pageSize });
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const comment = await createComment(data);
    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

# Create Follows API routes
echo "Creating follows API..."
cat > "$BASE_DIR/follows/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { followUser, unfollowUser } from '@/services/follow-service';

export async function POST(req: NextRequest) {
  try {
    const { followerId, followingId } = await req.json();
    const follow = await followUser(followerId, followingId);
    return NextResponse.json({ success: true, data: follow });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { followerId, followingId } = await req.json();
    await unfollowUser(followerId, followingId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

# Create Notifications API routes
echo "Creating notifications API..."
cat > "$BASE_DIR/notifications/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, markAllAsRead } from '@/services/notification-service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    
    const notifications = await getNotifications(userId, { page, pageSize });
    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await req.json();
    await markAllAsRead(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

# Create Activity Feed API routes
echo "Creating activity feed API..."
cat > "$BASE_DIR/activity/feed/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getPersonalizedFeed } from '@/services/activity-service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    
    const feed = await getPersonalizedFeed(userId, { page, pageSize });
    return NextResponse.json({ success: true, data: feed });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

echo "✅ All social feature API routes created!"
echo ""
echo "📊 Summary:"
echo "  - Likes API: ✅ POST, DELETE"
echo "  - Comments API: ✅ GET, POST"
echo "  - Follows API: ✅ POST, DELETE"
echo "  - Notifications API: ✅ GET, PATCH"
echo "  - Activity Feed API: ✅ GET"
echo ""
echo "🎉 Department 5 API Integration: COMPLETE"
