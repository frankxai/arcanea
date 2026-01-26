/**
 * Image Generation API Route for Arcanea MVP
 * Handles image generation with Imagen 3
 */

import { NextRequest, NextResponse } from 'next/server';
import { createImagenProvider } from '@/lib/ai-core';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const maxDuration = 60; // 60 seconds for image generation

// Rate limiting
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 300000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 10; // More restrictive for image gen

interface ImageGenerationRequest {
  prompt: string;
  width?: number;
  height?: number;
  style?: string;
  mood?: string;
  quality?: 'standard' | 'hd';
  numberOfImages?: number;
  academyTheme?: 'atlantean' | 'draconic' | 'creation-light';
  kingdomOfLightStyle?: boolean;
  operation?: 'generate' | 'edit' | 'variations';
  imageUrl?: string; // For edit/variations
  editPrompt?: string; // For edit
  variationCount?: number; // For variations
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

    // Rate limiting
    const userId = user.id;
    const now = Date.now();
    const userLimit = rateLimits.get(userId);

    if (userLimit) {
      if (now < userLimit.resetAt) {
        if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Image generation rate limit exceeded. Please try again later.' },
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
    const body: ImageGenerationRequest = await req.json();
    const {
      prompt,
      width,
      height,
      style,
      mood,
      quality,
      numberOfImages,
      academyTheme,
      kingdomOfLightStyle,
      operation = 'generate',
      imageUrl,
      editPrompt,
      variationCount,
    } = body;

    if (!prompt && operation === 'generate') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if ((operation === 'edit' || operation === 'variations') && !imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required for edit/variations' },
        { status: 400 }
      );
    }

    // Initialize provider
    const imagen = createImagenProvider({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let result;
    let images;

    // Convert width/height to aspect ratio
    const getAspectRatio = (w?: number, h?: number): "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | undefined => {
      if (!w || !h) return "1:1";
      const ratio = w / h;
      if (ratio > 1.5) return "16:9";
      if (ratio < 0.67) return "9:16";
      if (ratio > 1.2) return "4:3";
      if (ratio < 0.83) return "3:4";
      return "1:1";
    };

    const aspectRatio = getAspectRatio(width, height);

    switch (operation) {
      case 'generate':
        result = await imagen.generateImage(prompt, {
          aspectRatio,
          numberOfImages,
        });
        images = [result];
        break;

      case 'edit':
        if (!editPrompt) {
          return NextResponse.json({ error: 'Edit prompt is required' }, { status: 400 });
        }
        result = await imagen.editImage(imageUrl!, editPrompt, {
          aspectRatio,
        });
        images = [result];
        break;

      case 'variations':
        images = await imagen.generateVariations(
          prompt,
          variationCount || 3,
          {
            aspectRatio,
          }
        );
        break;

      default:
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }

    // Upload images to Supabase Storage
    const uploadedImages = await Promise.all(
      images.map(async (img: any) => {
        try {
          // Convert base64 to buffer
          const base64Data = img.base64 || img.url.split(',')[1];
          const buffer = Buffer.from(base64Data, 'base64');

          // Upload to Supabase Storage
          const fileName = `${userId}/${img.id}.png`;
          const { data, error } = await supabase.storage
            .from('generated-images')
            .upload(fileName, buffer, {
              contentType: 'image/png',
              upsert: false,
            });

          if (error) {
            console.error('Upload error:', error);
            return img; // Return original if upload fails
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('generated-images')
            .getPublicUrl(fileName);

          return {
            ...img,
            url: urlData.publicUrl,
            storageUrl: urlData.publicUrl,
          };
        } catch (error) {
          console.error('Image upload error:', error);
          return img;
        }
      })
    );

    // Log usage to database
    const totalCost = images.reduce((sum: number, img: any) => sum + (img.metadata.cost || 0), 0);
    await supabase.from('ai_usage').insert({
      user_id: userId,
      operation: `image_${operation}`,
      model: 'imagen-3',
      cost: totalCost,
      metadata: {
        imageCount: images.length,
        prompt,
        academyTheme,
      },
      created_at: new Date().toISOString(),
    });

    // Save to essences table
    for (const img of uploadedImages) {
      await supabase.from('essences').insert({
        creator_id: userId,
        type: 'visual',
        title: prompt.substring(0, 100),
        content: {
          type: 'visual',
          imageUrl: img.storageUrl || img.url,
          prompt,
          style,
        },
        metadata: {
          academy: academyTheme || 'draconic',
          luminorUsed: 'imagen-3',
          tags: [style, mood, academyTheme].filter(Boolean),
          remixable: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
      totalCost,
    });
  } catch (error) {
    console.error('Image generation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'imagen-3',
    operations: ['generate', 'edit', 'variations'],
  });
}
