# Gemini Integration for Arcanea MVP

Complete multimodal AI integration using Google's Gemini ecosystem for chat, images, and videos.

## Overview

This integration provides:
- **Chat**: Gemini 2.0 Flash for fast, cost-effective conversational AI
- **Images**: Imagen 3 for high-quality image generation and editing
- **Videos**: Veo 3.1 for 8-second video generation with audio

## Architecture

```
Arcanea Apps
    ├── Chat Interface → /api/ai/chat
    ├── Image Studio → /api/ai/generate-image
    └── Video Creator → /api/ai/generate-video
                ↓
        Unified AI Provider
                ↓
    ┌───────────┴───────────┐
    ↓           ↓           ↓
Gemini Chat  Imagen 3    Veo 3.1
```

## Installation

### 1. Install Dependencies

```bash
cd packages/ai-core
npm install @google/generative-ai eventsource-parser
```

### 2. Set Environment Variables

```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Setup

Create required tables in Supabase:

```sql
-- AI Usage Tracking
CREATE TABLE ai_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  operation TEXT NOT NULL,
  model TEXT NOT NULL,
  tokens_input INTEGER,
  tokens_output INTEGER,
  cost DECIMAL(10, 6),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Video Generation Jobs
CREATE TABLE video_generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  video_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  status TEXT NOT NULL, -- 'generating', 'completed', 'failed'
  operation TEXT NOT NULL,
  options JSONB,
  cost DECIMAL(10, 6),
  video_url TEXT,
  thumbnail_url TEXT,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  estimated_completion TIMESTAMP WITH TIME ZONE
);

-- User Video Credits
ALTER TABLE user_profiles ADD COLUMN video_credits INTEGER DEFAULT 0;

-- Storage Bucket for Generated Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-images', 'generated-images', true);
```

## Usage Examples

### Chat (Gemini 2.0 Flash)

#### Basic Chat

```typescript
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';

const gemini = createGeminiChatProvider();

// Simple chat
const response = await gemini.chat('Explain quantum entanglement simply');
console.log(response.text);
console.log('Cost:', response.cost); // ~$0.0001 per response
```

#### Streaming Chat

```typescript
// Stream for real-time responses
for await (const chunk of gemini.streamText('Write a short story about dragons')) {
  process.stdout.write(chunk);
}
```

#### Chat with Images (Multimodal)

```typescript
const response = await gemini.chat('What do you see in this image?', {
  images: ['https://example.com/image.jpg'],
});
```

#### Academy-Specific Chat

```typescript
const response = await gemini.chat('Help me create a visual scene', {
  systemPrompt: 'You are a master of visual arts from the Draconic Academy, expert in image creation and artistic expression.',
  temperature: 0.8, // More creative
});
```

#### Chat Session (Multi-turn Conversation)

```typescript
const session = gemini.startSession({
  systemPrompt: 'You are a helpful creative assistant.',
});

const response1 = await session.sendMessage('Hello!');
const response2 = await session.sendMessage('Tell me about your capabilities');

// Get full history
const history = await gemini.getHistory();
```

### Images (Imagen 3)

#### Generate Image

```typescript
import { createImagenProvider } from '@arcanea/ai-core/providers/gemini-imagen';

const imagen = createImagenProvider();

const image = await imagen.generateImage(
  'A majestic dragon soaring through clouds at sunset',
  {
    width: 1024,
    height: 1024,
    style: 'digital art',
    mood: 'epic',
    quality: 'hd',
    kingdomOfLightStyle: true, // Apply Arcanea aesthetic
    academyTheme: 'draconic',
  }
);

console.log('Image URL:', image.url);
console.log('Cost:', image.metadata.cost); // ~$0.04 per image
```

#### Edit Image

```typescript
const edited = await imagen.editImage(
  'https://example.com/original.jpg',
  'Add glowing magical runes around the dragon',
  {
    preserveStyle: true,
    quality: 'hd',
  }
);
```

#### Generate Variations

```typescript
const variations = await imagen.generateVariations(
  'A mystical underwater city with bioluminescent creatures',
  3, // Generate 3 variations
  {
    academyTheme: 'atlantean',
    kingdomOfLightStyle: true,
  }
);
```

#### Apply Artistic Style

```typescript
const stylized = await imagen.applyStyle(
  'https://example.com/photo.jpg',
  'impressionist painting',
  { quality: 'hd' }
);
```

#### Upscale Image

```typescript
const upscaled = await imagen.upscaleImage(
  'https://example.com/image.jpg',
  '4k' // or '2k'
);
```

### Videos (Veo 3.1)

#### Text-to-Video

```typescript
import { createVeoProvider } from '@arcanea/ai-core/providers/gemini-veo';

const veo = createVeoProvider();

const video = await veo.generateVideo(
  'A dragon flying through clouds with sunbeams breaking through',
  {
    duration: 8, // seconds (max)
    resolution: '720p',
    fps: 30,
    style: 'cinematic',
    mood: 'epic',
    cameraMovement: 'tracking',
    pacing: 'medium',
    includeAudio: true,
    audioStyle: 'cinematic',
    academyTheme: 'draconic',
  }
);

console.log('Video ID:', video.id);
console.log('Status:', video.status); // 'generating'
console.log('Cost:', video.cost); // $6.00 per video
console.log('ETA:', video.estimatedCompletionTime);
```

#### Image-to-Video

```typescript
const video = await veo.generateFromImage(
  'https://example.com/dragon-image.jpg',
  'Animate the dragon taking flight with wings spreading',
  {
    duration: 8,
    resolution: '720p',
    includeAudio: true,
    cameraMovement: 'zoom',
  }
);
```

#### Check Video Status

```typescript
const status = await veo.checkStatus(video.id);

if (status.status === 'completed') {
  console.log('Video URL:', status.url);
  console.log('Thumbnail:', status.thumbnailUrl);
}
```

### Unified Provider (Recommended)

```typescript
import { createUnifiedProvider } from '@arcanea/ai-core/providers/unified-provider';

const ai = createUnifiedProvider({
  maxConcurrentRequests: 5,
});

// Chat
const chatResponse = await ai.chat('Hello!');

// Generate image
const image = await ai.generateImage('A beautiful sunset', {
  kingdomOfLightStyle: true,
});

// Generate video
const video = await ai.generateVideo('Ocean waves at sunset');

// Check stats
const stats = ai.getUsageStats();
console.log('Total cost:', stats.totalCost);
console.log('Total requests:', stats.totalRequests);
```

## API Routes

### Chat API

**Endpoint**: `POST /api/ai/chat`

**Request**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Tell me about dragons",
      "images": ["https://example.com/dragon.jpg"]
    }
  ],
  "systemPrompt": "You are a dragon expert",
  "temperature": 0.7,
  "maxTokens": 2048,
  "stream": true,
  "academyContext": {
    "type": "draconic",
    "luminorName": "Pyros"
  }
}
```

**Response** (streaming):
```
data: {"text":"Dragons are magnificent","timestamp":"2024-01-01T00:00:00Z"}

data: {"text":" creatures that...","timestamp":"2024-01-01T00:00:01Z"}

data: {"type":"complete","timestamp":"2024-01-01T00:00:02Z"}
```

**Response** (non-streaming):
```json
{
  "text": "Dragons are magnificent creatures...",
  "tokensUsed": {
    "input": 50,
    "output": 200,
    "total": 250
  },
  "cost": 0.00015,
  "finishReason": "STOP"
}
```

### Image Generation API

**Endpoint**: `POST /api/ai/generate-image`

**Request**:
```json
{
  "prompt": "A majestic dragon in flight",
  "width": 1024,
  "height": 1024,
  "style": "digital art",
  "mood": "epic",
  "quality": "hd",
  "academyTheme": "draconic",
  "kingdomOfLightStyle": true,
  "operation": "generate"
}
```

**Response**:
```json
{
  "success": true,
  "images": [
    {
      "id": "img_1234567890_abc123",
      "url": "https://storage.supabase.co/...",
      "storageUrl": "https://storage.supabase.co/...",
      "prompt": "A majestic dragon in flight",
      "width": 1024,
      "height": 1024,
      "format": "png",
      "metadata": {
        "model": "imagen-3",
        "cost": 0.04,
        "style": "digital art",
        "academyTheme": "draconic"
      }
    }
  ],
  "count": 1,
  "totalCost": 0.04
}
```

### Video Generation API

**Endpoint**: `POST /api/ai/generate-video`

**Request**:
```json
{
  "prompt": "A dragon soaring through sunset clouds",
  "duration": 8,
  "resolution": "720p",
  "fps": 30,
  "style": "cinematic",
  "mood": "epic",
  "cameraMovement": "tracking",
  "includeAudio": true,
  "audioStyle": "cinematic",
  "academyTheme": "draconic",
  "operation": "text-to-video"
}
```

**Response**:
```json
{
  "success": true,
  "video": {
    "id": "vid_1234567890_abc123",
    "status": "generating",
    "prompt": "A dragon soaring through sunset clouds",
    "metadata": {
      "duration": 8,
      "resolution": "720p",
      "fps": 30,
      "format": "mp4",
      "hasAudio": true
    },
    "cost": 6.00,
    "estimatedCompletionTime": "2024-01-01T00:02:00Z"
  },
  "jobId": "job-uuid-here",
  "message": "Video generation started. Poll /api/ai/video-status for updates."
}
```

**Check Status**: `GET /api/ai/generate-video?jobId=job-uuid-here`

**Status Response**:
```json
{
  "jobId": "job-uuid-here",
  "status": "completed",
  "videoUrl": "https://storage.supabase.co/...",
  "thumbnailUrl": "https://storage.supabase.co/.../thumb.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "completedAt": "2024-01-01T00:02:00Z"
}
```

## Cost Estimates

### Chat (Gemini 2.0 Flash)
- **Input**: $0.075 per 1M tokens (~$0.000075 per 1K tokens)
- **Output**: $0.30 per 1M tokens (~$0.0003 per 1K tokens)
- **Average conversation**: $0.0001 - $0.001
- **Typical use**: 1000 messages = $1

### Images (Imagen 3)
- **Per image**: ~$0.04
- **HD quality**: ~$0.06
- **Variations (3)**: ~$0.12
- **Edit/Upscale**: ~$0.04
- **Typical use**: 25 images = $1

### Videos (Veo 3.1)
- **Per 8-second video**: $6.00
- **Image-to-video**: $6.00
- **Typical use**: 1 video = $6

### Example Monthly Costs

**Light User** (100 chats, 10 images):
- Chat: $0.10
- Images: $0.40
- **Total: $0.50/month**

**Regular User** (1000 chats, 50 images, 2 videos):
- Chat: $1.00
- Images: $2.00
- Videos: $12.00
- **Total: $15/month**

**Power User** (10,000 chats, 500 images, 20 videos):
- Chat: $10.00
- Images: $20.00
- Videos: $120.00
- **Total: $150/month**

## Rate Limits

### Chat
- **Per user**: 20 requests per minute
- **Burst**: Up to 50 messages
- **Concurrent**: Unlimited streams

### Images
- **Per user**: 10 requests per 5 minutes
- **Daily limit**: 100 images
- **Concurrent**: 5 generations max

### Videos
- **Per user**: 5 videos per hour
- **Daily limit**: 10 videos
- **Concurrent**: 1 generation at a time
- **Credit check**: Requires available credits

## Error Handling

### Common Errors

```typescript
try {
  const response = await gemini.chat(prompt);
} catch (error) {
  if (error.message.includes('RATE_LIMIT')) {
    // Rate limit exceeded - wait and retry
  } else if (error.message.includes('SAFETY')) {
    // Content filtered by safety settings
  } else if (error.message.includes('QUOTA')) {
    // API quota exceeded
  } else {
    // Other error
  }
}
```

### Retry Logic

```typescript
import { retry } from '@arcanea/utils';

const response = await retry(
  () => gemini.chat(prompt),
  {
    maxAttempts: 3,
    delay: 1000,
    backoff: 'exponential',
  }
);
```

## Best Practices

### Chat
1. **Use streaming** for better UX (show responses as they generate)
2. **Set system prompts** for consistent personality
3. **Manage context** - trim history to last 10-20 messages
4. **Temperature**: 0.7 for balanced, 0.9 for creative, 0.3 for factual
5. **Track costs** - log all requests with token usage

### Images
1. **Enhance prompts** with style, mood, and composition details
2. **Use Kingdom of Light style** for brand consistency
3. **Store in Supabase** for persistence and CDN delivery
4. **Compress before display** - optimize for web
5. **Generate thumbnails** for galleries

### Videos
1. **Warn users about cost** ($6 per video)
2. **Check credits** before generation
3. **Poll status** every 5-10 seconds
4. **Store metadata** in database for tracking
5. **Limit daily usage** to control costs
6. **Provide thumbnails** during generation

## Monitoring

### Usage Tracking

```typescript
// Get usage stats
const stats = ai.getUsageStats();

console.log('Total Requests:', stats.totalRequests);
console.log('Total Cost:', `$${stats.totalCost.toFixed(4)}`);
console.log('Chat:', stats.chatRequests, `($${stats.chatCost.toFixed(4)})`);
console.log('Images:', stats.imageRequests, `($${stats.imageCost.toFixed(4)})`);
console.log('Videos:', stats.videoRequests, `($${stats.videoCost.toFixed(4)})`);
console.log('Tokens:', stats.tokensUsed.total);
```

### Queue Status

```typescript
const queueStatus = ai.getQueueStatus();

console.log('Active Jobs:', queueStatus.activeJobs);
console.log('Queued Jobs:', queueStatus.queuedJobs);
console.log('Max Concurrent:', queueStatus.maxConcurrent);
```

## Testing

```bash
# Install dependencies
cd packages/ai-core
npm install

# Run tests
npm test

# Test chat
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": false
  }'

# Test image generation
curl -X POST http://localhost:3000/api/ai/generate-image \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A dragon in flight",
    "quality": "hd"
  }'
```

## Troubleshooting

### "API key not found"
- Set `GEMINI_API_KEY` in `.env.local`
- Verify API key is active in Google AI Studio

### "Rate limit exceeded"
- Wait for rate limit window to reset
- Implement exponential backoff
- Consider upgrading API quota

### "Image generation failed"
- Check prompt for safety violations
- Verify Supabase storage bucket exists
- Check storage permissions

### "Video generation timeout"
- Videos take 2-5 minutes to generate
- Implement proper polling with timeout
- Store job status in database

### "Insufficient credits"
- Check user's video_credits in database
- Implement credit purchase flow
- Warn users before generation

## Security

1. **API Keys**: Store in environment variables, never commit
2. **Rate Limiting**: Implement per-user limits
3. **Authentication**: Verify JWT tokens on all requests
4. **Content Moderation**: Use Gemini safety settings
5. **Cost Control**: Set daily/monthly spending limits
6. **Storage**: Use signed URLs for sensitive content

## Next Steps

1. **Implement caching** - cache common prompts
2. **Add webhooks** - real-time video status updates
3. **Batch processing** - queue multiple operations
4. **Analytics dashboard** - visualize usage patterns
5. **Cost alerts** - notify when limits approached
6. **A/B testing** - test prompt variations
7. **Fine-tuning** - customize models for Arcanea

## Support

- **Gemini Docs**: https://ai.google.dev/docs
- **Imagen Docs**: https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview
- **Veo Docs**: https://deepmind.google/technologies/veo/
- **Arcanea Support**: support@arcanea.ai

---

**Status**: ✅ Production Ready
**Last Updated**: October 2024
**Version**: 1.0.0
