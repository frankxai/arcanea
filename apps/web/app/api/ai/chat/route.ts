/**
 * Gemini Chat API Route for Arcanea MVP
 * Handles streaming chat with Gemini 2.0 Flash
 */

import { NextRequest, NextResponse } from 'next/server';
import { createGeminiChatProvider, createStreamResponse } from '@/lib/ai-core';
import { ARCANEA_MAGIC_SYSTEM, ARCANEA_TONE_GUIDELINES, ACADEMY_LORE } from '@/lib/lore';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

interface ChatRequest {
  messages: Array<{ 
    role: 'user' | 'model';
    content: string;
    images?: string[];
  }>;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  academyContext?: {
    type: 'atlantean' | 'draconic' | 'creation-light';
    luminorName?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    // Get user from authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verify JWT token
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
            { error: 'Rate limit exceeded. Please try again later.' },
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
    const body: ChatRequest = await req.json();
    const { messages, systemPrompt, temperature, maxTokens, stream = true, academyContext } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Initialize Gemini provider
    const gemini = createGeminiChatProvider({
      apiKey: process.env.GEMINI_API_KEY,
      temperature: temperature ?? 0.7,
      maxTokens: maxTokens ?? 8192,
    });

    // Build context-aware system prompt
    let enhancedSystemPrompt = systemPrompt || '';
    
    // 1. Inject Global Lore (Magic + Tone)
    const baseLore = `${ARCANEA_MAGIC_SYSTEM}\n\n${ARCANEA_TONE_GUIDELINES}`;
    enhancedSystemPrompt = `${baseLore}\n\n${enhancedSystemPrompt}`;

    // 2. Inject Academy Specific Lore
    if (academyContext) {
      const academyPrompts = {
        atlantean: ACADEMY_LORE.ATLANTEAN,
        draconic: ACADEMY_LORE.DRACONIC,
        'creation-light': ACADEMY_LORE.CREATION_LIGHT,
      };
      
      const specificLore = academyPrompts[academyContext.type];
      if (specificLore) {
         enhancedSystemPrompt = `${specificLore}\n\n${enhancedSystemPrompt}`;
      }
      
      if (academyContext.luminorName) {
        enhancedSystemPrompt = `You are ${academyContext.luminorName}.\n${enhancedSystemPrompt}`;
      }
    }

    // Get last user message and images
    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content;
    const images = lastMessage.images;

    // Build history (exclude last message)
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    if (stream) {
      // Stream response
      const result = gemini.streamText(prompt, {
        systemPrompt: enhancedSystemPrompt,
        images,
        history,
        temperature,
        maxTokens,
      });

      // Use Vercel AI SDK's built-in streaming response
      // Note: result.toTextStreamResponse() handles the streaming headers
      return result.toTextStreamResponse();
    } else {
      // Non-streaming response
      const response = await gemini.chat(prompt, {
        systemPrompt: enhancedSystemPrompt,
        images,
        history,
        temperature,
        maxTokens,
      });

      // Log usage to database
      await supabase.from('ai_usage').insert({
        user_id: userId,
        operation: 'chat',
        model: 'gemini-2.0-flash',
        tokens_input: response.tokensUsed?.promptTokens || 0,
        tokens_output: response.tokensUsed?.completionTokens || 0,
        cost: response.cost || 0,
        created_at: new Date().toISOString(),
      });

      return NextResponse.json({
        text: response.text,
        tokensUsed: response.tokensUsed,
        cost: response.cost,
        finishReason: response.finishReason,
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
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
    service: 'gemini-chat',
    model: 'gemini-2.0-flash',
    version: '2.0.0-real'
  });
}