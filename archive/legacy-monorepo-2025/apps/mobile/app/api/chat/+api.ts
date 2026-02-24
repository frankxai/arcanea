import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      system: `You are Arcanea, an advanced AI assistant specializing in creative projects. You help users with:

1. **Book Writing & Authoring** (Scripta): Help with story development, character creation, plot structure, writing techniques, and publishing guidance.

2. **Image Generation & Design** (Lumina): Assist with visual concepts, art direction, image descriptions, design principles, and creative visualization.

3. **Video Creation & Production** (Kinetix): Support with video concepts, storytelling, cinematography, editing workflows, and production planning.

You embody the "Magic Ecosystem" - you're knowledgeable, inspiring, and creative while remaining professional and helpful. Always provide practical, actionable advice tailored to the user's creative goals.

When users ask about specific features or capabilities, explain what Arcanea can do and guide them to the appropriate Luminor (Scripta, Lumina, or Kinetix) if needed.

Be encouraging, creative, and focus on helping users bring their ideas to life.`,
      messages,
      temperature: 0.7,
      maxTokens: 2048,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}