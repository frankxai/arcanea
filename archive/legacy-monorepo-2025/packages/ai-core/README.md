# Arcanea AI Core

Complete multimodal AI integration for the Arcanea MVP platform.

## Features

- **Chat**: Gemini 2.0 Flash - Fast, cost-effective conversational AI
- **Images**: Imagen 3 - High-quality image generation and editing
- **Videos**: Veo 3.1 - 8-second video generation with audio
- **Unified Interface**: Single provider for all AI operations
- **Streaming**: Real-time responses with Server-Sent Events
- **Cost Tracking**: Automatic usage and cost monitoring
- **Queue Management**: Handle concurrent generation requests
- **Rate Limiting**: Built-in per-user rate limits

## Installation

```bash
npm install @google/generative-ai eventsource-parser
```

## Quick Start

### Chat

```typescript
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';

const gemini = createGeminiChatProvider();

// Simple chat
const response = await gemini.chat('Hello!');
console.log(response.text);
console.log('Cost:', response.cost); // ~$0.0001

// Streaming
for await (const chunk of gemini.streamText('Tell me a story')) {
  process.stdout.write(chunk);
}
```

### Images

```typescript
import { createImagenProvider } from '@arcanea/ai-core/providers/gemini-imagen';

const imagen = createImagenProvider();

const image = await imagen.generateImage(
  'A majestic dragon in flight',
  {
    quality: 'hd',
    kingdomOfLightStyle: true,
  }
);

console.log('Image URL:', image.url);
console.log('Cost:', image.metadata.cost); // ~$0.04
```

### Videos

```typescript
import { createVeoProvider } from '@arcanea/ai-core/providers/gemini-veo';

const veo = createVeoProvider();

const video = await veo.generateVideo(
  'A dragon soaring through clouds',
  {
    duration: 8,
    resolution: '720p',
    includeAudio: true,
  }
);

console.log('Video ID:', video.id);
console.log('Cost:', video.cost); // $6.00
```

### Unified Provider (Recommended)

```typescript
import { createUnifiedProvider } from '@arcanea/ai-core/providers/unified-provider';

const ai = createUnifiedProvider();

// All operations through one interface
const chatResponse = await ai.chat('Hello!');
const image = await ai.generateImage('A dragon');
const video = await ai.generateVideo('Ocean waves');

// Check usage
const stats = ai.getUsageStats();
console.log('Total cost:', stats.totalCost);
```

## Configuration

### Environment Variables

```bash
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Provider Options

```typescript
const gemini = createGeminiChatProvider({
  apiKey: 'your-key',
  model: 'gemini-2.0-flash-exp',
  temperature: 0.7,
  maxTokens: 8192,
});

const imagen = createImagenProvider({
  apiKey: 'your-key',
  model: 'imagen-3.0-generate-001',
});

const veo = createVeoProvider({
  apiKey: 'your-key',
  model: 'veo-3.1',
});
```

## Advanced Usage

### Chat with Images (Multimodal)

```typescript
const response = await gemini.chat('What do you see?', {
  images: ['https://example.com/image.jpg'],
});
```

### Chat Sessions

```typescript
const session = gemini.startSession({
  systemPrompt: 'You are a helpful assistant.',
});

await session.sendMessage('My name is Frank.');
const response = await session.sendMessage('What is my name?');

// Get history
const history = await gemini.getHistory();
```

### Image Variations

```typescript
const variations = await imagen.generateVariations(
  'A mystical dragon',
  3, // Generate 3 variations
  { quality: 'hd' }
);
```

### Image Editing

```typescript
const edited = await imagen.editImage(
  'https://example.com/original.jpg',
  'Add magical glowing runes',
  { preserveStyle: true }
);
```

### Image Upscaling

```typescript
const upscaled = await imagen.upscaleImage(
  'https://example.com/image.jpg',
  '4k'
);
```

### Video from Image

```typescript
const video = await veo.generateFromImage(
  'https://example.com/dragon.jpg',
  'Animate the dragon taking flight',
  { duration: 8, resolution: '720p' }
);
```

## Streaming

### SSE for Chat

```typescript
import { createStreamResponse } from '@arcanea/ai-core/streaming';

const generator = gemini.streamText(prompt);
const stream = createStreamResponse(generator, {
  onComplete: () => console.log('Done!'),
  onError: (err) => console.error(err),
});

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
  },
});
```

### Progress Updates

```typescript
import { simulateProgress } from '@arcanea/ai-core/streaming';

for await (const update of simulateProgress(120000)) {
  console.log(update.message); // "Generating content..."
  console.log(update.progress); // 0-100
}
```

### Job Polling

```typescript
import { pollJobStatus } from '@arcanea/ai-core/streaming';

const result = await pollJobStatus(
  videoId,
  (id) => veo.checkStatus(id),
  {
    interval: 5000,
    maxAttempts: 120,
    onProgress: (update) => {
      console.log(update.message, update.progress);
    },
  }
);
```

## Cost Estimates

| Operation | Model | Cost per Request |
|-----------|-------|------------------|
| Chat | Gemini 2.0 Flash | $0.0001-$0.001 |
| Image | Imagen 3 | ~$0.04 |
| Video | Veo 3.1 | $6.00 |

### Example Monthly Costs

- **Light User**: $0.50/month (100 chats, 10 images)
- **Regular User**: $15/month (1000 chats, 50 images, 2 videos)
- **Power User**: $150/month (10k chats, 500 images, 20 videos)

## Rate Limits

| Operation | Limit | Window |
|-----------|-------|--------|
| Chat | 20 requests | 1 minute |
| Image | 10 requests | 5 minutes |
| Video | 5 requests | 1 hour |

## Error Handling

```typescript
try {
  const response = await gemini.chat(prompt);
} catch (error) {
  if (error.message.includes('RATE_LIMIT')) {
    // Rate limit exceeded
  } else if (error.message.includes('SAFETY')) {
    // Content filtered
  } else if (error.message.includes('QUOTA')) {
    // API quota exceeded
  }
}
```

## Academy Theming

### Atlantean Academy (Storytelling)

```typescript
const response = await gemini.chat('Tell me a story', {
  systemPrompt: 'You are a wise guide from the Atlantean Academy.',
});

const image = await imagen.generateImage('Underwater city', {
  academyTheme: 'atlantean',
});
```

### Draconic Academy (Visual Arts)

```typescript
const response = await gemini.chat('Help me create art', {
  systemPrompt: 'You are a master from the Draconic Academy.',
});

const image = await imagen.generateImage('Dragon in flight', {
  academyTheme: 'draconic',
  kingdomOfLightStyle: true,
});
```

### Creation & Light Academy (Music/Audio)

```typescript
const response = await gemini.chat('Help me compose', {
  systemPrompt: 'You are a sage from the Academy of Creation & Light.',
});

const video = await veo.generateVideo('Musical energy flowing', {
  academyTheme: 'creation-light',
  audioStyle: 'cinematic',
});
```

## Testing

```bash
# Run verification script
npm run verify:gemini

# Test chat
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

## Documentation

- [Full Integration Guide](../../docs/mvp/GEMINI_INTEGRATION.md)
- [Quick Start Guide](../../docs/mvp/QUICK_START_GEMINI.md)
- [Migration Guide](../../docs/mvp/MIGRATION_GUIDE.md)

## API Reference

### GeminiChatProvider

```typescript
class GeminiChatProvider {
  chat(prompt: string, options?: GeminiChatOptions): Promise<GeminiChatResponse>
  streamText(prompt: string, options?: GeminiChatOptions): AsyncGenerator<string>
  startSession(options?: SessionOptions): ChatSession
  sendMessage(message: string, images?: string[]): Promise<GeminiChatResponse>
  getHistory(): Promise<Content[]>
}
```

### ImagenProvider

```typescript
class ImagenProvider {
  generateImage(prompt: string, options?: ImageGenerationOptions): Promise<GeneratedImage>
  editImage(url: string, editPrompt: string, options?: ImageEditOptions): Promise<GeneratedImage>
  generateVariations(prompt: string, count: number, options?: ImageGenerationOptions): Promise<GeneratedImage[]>
  upscaleImage(url: string, resolution: '2k' | '4k'): Promise<GeneratedImage>
  applyStyle(url: string, style: string, options?: ImageEditOptions): Promise<GeneratedImage>
}
```

### VeoProvider

```typescript
class VeoProvider {
  generateVideo(prompt: string, options?: VideoGenerationOptions): Promise<GeneratedVideo>
  generateFromImage(imageUrl: string, prompt: string, options?: VideoGenerationOptions): Promise<GeneratedVideo>
  checkStatus(videoId: string): Promise<GeneratedVideo>
  cancelGeneration(videoId: string): Promise<boolean>
}
```

### UnifiedAIProvider

```typescript
class UnifiedAIProvider {
  chat(prompt: string, options?: GeminiChatOptions): Promise<GeminiChatResponse>
  streamChat(prompt: string, options?: GeminiChatOptions): AsyncGenerator<string>
  generateImage(prompt: string, options?: ImageGenerationOptions): Promise<GeneratedImage>
  editImage(url: string, editPrompt: string, options?: ImageEditOptions): Promise<GeneratedImage>
  generateVideo(prompt: string, options?: VideoGenerationOptions): Promise<GeneratedVideo>
  generateVideoFromImage(imageUrl: string, prompt: string, options?: VideoGenerationOptions): Promise<GeneratedVideo>
  getUsageStats(): UsageStats
  getQueueStatus(): QueueStatus
}
```

## License

Proprietary - Arcanea MVP

## Support

- Email: support@arcanea.ai
- Docs: [Integration Guide](../../docs/mvp/GEMINI_INTEGRATION.md)

---

**Status**: Production Ready
**Version**: 1.0.0
**Last Updated**: October 24, 2025
