import { fal } from '@fal-ai/client';
import { NextRequest, NextResponse } from 'next/server';

// Configure fal.ai with API key
fal.config({
  credentials: process.env.FAL_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: 'Animation service not configured. Set FAL_KEY.' },
        { status: 503 }
      );
    }

    // Use kling-video for high-quality image-to-video
    const result = await fal.subscribe('fal-ai/kling-video/v1/standard/image-to-video', {
      input: {
        prompt: prompt || 'Cinematic camera movement, slow dolly in, atmospheric lighting',
        image_url: imageUrl,
        duration: '5',
        aspect_ratio: '1:1',
      },
      logs: true,
    });

    const videoUrl = (result.data as { video?: { url?: string } })?.video?.url;

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Animation generation returned no video' },
        { status: 500 }
      );
    }

    return NextResponse.json({ videoUrl });
  } catch (error) {
    console.error('Animate API error:', error);
    const message = error instanceof Error ? error.message : 'Animation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
