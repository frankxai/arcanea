import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { prompt, count = 2 } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        // @ts-expect-error -- Gemini image gen uses responseModalities
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    // Generate images in parallel
    const imagePromises = Array.from({ length: Math.min(count, 4) }, async (_, i) => {
      const variation = count > 1
        ? `${prompt} (variation ${i + 1}, unique composition and style)`
        : prompt;

      try {
        const result = await model.generateContent(variation);
        const response = result.response;
        const parts = response.candidates?.[0]?.content?.parts || [];

        const images: { data: string; mimeType: string; text?: string }[] = [];

        for (const part of parts) {
          if (part.inlineData) {
            images.push({
              data: part.inlineData.data,
              mimeType: part.inlineData.mimeType || 'image/png',
            });
          }
        }

        const textPart = parts.find(p => p.text);

        return {
          id: `img_${Date.now()}_${i}`,
          images,
          text: textPart?.text || '',
          prompt: variation,
          createdAt: new Date().toISOString(),
        };
      } catch (err) {
        console.error(`Generation ${i} failed:`, err);
        return null;
      }
    });

    const results = (await Promise.all(imagePromises)).filter(Boolean);

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'All image generations failed. Try a different prompt.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Imagine API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
}
