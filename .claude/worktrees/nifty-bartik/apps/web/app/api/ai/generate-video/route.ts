/**
 * Video Generation API Route for Arcanea MVP
 * Handles video generation with Veo 3.1
 */

import { NextRequest, NextResponse } from 'next/server';
import { createVeoProvider } from '@/lib/ai-core';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs'; // Video generation needs more time
export const maxDuration = 300; // 5 minutes

// Rate limiting - very restrictive for video
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // Only 5 videos per hour

interface VideoGenerationRequest {
  prompt: string;
  duration?: number;
  resolution?: '480p' | '720p' | '1080p';
  fps?: 24 | 30 | 60;
  style?: string;
  mood?: string;
  cameraMovement?: 'static' | 'pan' | 'zoom' | 'tracking' | 'dolly' | 'crane';
  pacing?: 'slow' | 'medium' | 'fast';
  includeAudio?: boolean;
  audioStyle?: 'ambient' | 'cinematic' | 'upbeat' | 'dramatic';
  quality?: 'standard' | 'high';
  academyTheme?: 'atlantean' | 'draconic' | 'creation-light';
  operation?: 'text-to-video' | 'image-to-video';
  imageUrl?: string; // For image-to-video
}

export async function POST(req: NextRequest) {
  try {
    // Authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user ID early for subsequent operations
    const userId = user.id;

    // Check user's remaining video credits
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('video_credits')
      .eq('id', userId)
      .single();

    if (!userProfile || (userProfile.video_credits || 0) <= 0) {
      return NextResponse.json(
        { error: 'Insufficient video credits. Each video costs $6.' },
        { status: 403 }
      );
    }

    // Rate limiting
    const now = Date.now();
    const userLimit = rateLimits.get(userId);

    if (userLimit) {
      if (now < userLimit.resetAt) {
        if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Video generation rate limit exceeded. Maximum 5 videos per hour.' },
            { status: 429 }
          );
        }
        userLimit.count++;
      } else {
        rateLimits.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
      }
    } else {
      rateLimits.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }

    // Parse request
    const body: VideoGenerationRequest = await req.json();
    const {
      prompt,
      duration,
      resolution,
      fps,
      style,
      mood,
      cameraMovement,
      pacing,
      includeAudio,
      audioStyle,
      quality,
      academyTheme,
      operation = 'text-to-video',
      imageUrl,
    } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (operation === 'image-to-video' && !imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required for image-to-video' },
        { status: 400 }
      );
    }

    // Initialize provider
    const veo = createVeoProvider({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let video;

    switch (operation) {
      case 'text-to-video':
        video = await veo.generateVideo(prompt, {
          duration,
          resolution,
          fps,
          style,
          mood,
          cameraMovement,
          pacing,
          includeAudio,
          audioStyle,
          quality,
          academyTheme,
        });
        break;

      case 'image-to-video':
        video = await veo.generateFromImage(imageUrl!, prompt, {
          duration,
          resolution,
          fps,
          style,
          mood,
          cameraMovement,
          pacing,
          includeAudio,
          audioStyle,
          quality,
          academyTheme,
        });
        break;

      default:
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }

    // Create generation job record
    const { data: job, error: jobError } = await supabase
      .from('video_generation_jobs')
      .insert({
        user_id: userId,
        video_id: video.id,
        prompt,
        status: 'generating',
        operation,
        options: {
          duration,
          resolution,
          style,
          mood,
          academyTheme,
        },
        cost: video.cost,
        created_at: new Date().toISOString(),
        estimated_completion: video.estimatedCompletionTime?.toISOString(),
      })
      .select()
      .single();

    if (jobError) {
      console.error('Failed to create job record:', jobError);
    }

    // Deduct video credit
    await supabase
      .from('user_profiles')
      .update({
        video_credits: (userProfile.video_credits || 0) - 1,
      })
      .eq('id', userId);

    // Log usage
    await supabase.from('ai_usage').insert({
      user_id: userId,
      operation: `video_${operation}`,
      model: 'veo-3.1',
      cost: video.cost,
      metadata: {
        prompt,
        duration: video.metadata.duration,
        resolution: video.metadata.resolution,
        academyTheme,
      },
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      video: {
        id: video.id,
        status: video.status,
        prompt: video.prompt,
        metadata: video.metadata,
        cost: video.cost,
        estimatedCompletionTime: video.estimatedCompletionTime,
      },
      jobId: job?.id,
      message: 'Video generation started. Poll /api/ai/video-status for updates.',
    });
  } catch (error) {
    console.error('Video generation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

// Check video generation status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get job status
    const { data: job, error } = await supabase
      .from('video_generation_jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single();

    if (error || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      videoUrl: job.video_url,
      thumbnailUrl: job.thumbnail_url,
      createdAt: job.created_at,
      completedAt: job.completed_at,
      error: job.error,
    });
  } catch (error) {
    console.error('Video status API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
