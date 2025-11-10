# Gemini Integration Quick Start

Get started with Gemini AI in Arcanea in 5 minutes.

## Setup

### 1. Get API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 2. Configure Environment

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

### 3. Install & Run

```bash
cd /mnt/c/Users/Frank/Arcanea
npm install
npm run dev
```

## Basic Usage

### Simple Chat

```typescript
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';

const gemini = createGeminiChatProvider();

// Get a response
const response = await gemini.chat('Tell me about dragons');
console.log(response.text);
console.log('Cost:', response.cost); // ~$0.0001
```

### Generate Image

```typescript
import { createImagenProvider } from '@arcanea/ai-core/providers/gemini-imagen';

const imagen = createImagenProvider();

const image = await imagen.generateImage(
  'A majestic dragon flying through clouds',
  {
    quality: 'hd',
    kingdomOfLightStyle: true,
  }
);

console.log('Image URL:', image.url);
console.log('Cost:', image.metadata.cost); // ~$0.04
```

### Generate Video

```typescript
import { createVeoProvider } from '@arcanea/ai-core/providers/gemini-veo';

const veo = createVeoProvider();

const video = await veo.generateVideo(
  'A dragon soaring through sunset clouds',
  {
    duration: 8,
    resolution: '720p',
    includeAudio: true,
  }
);

console.log('Video ID:', video.id);
console.log('Cost:', video.cost); // $6.00
```

## Using the Unified Provider (Recommended)

```typescript
import { createUnifiedProvider } from '@arcanea/ai-core/providers/unified-provider';

// Initialize once
const ai = createUnifiedProvider();

// Chat
const chatResponse = await ai.chat('Hello!');

// Generate image
const image = await ai.generateImage('A beautiful sunset');

// Generate video
const video = await ai.generateVideo('Ocean waves');

// Check usage
const stats = ai.getUsageStats();
console.log('Total cost:', stats.totalCost);
```

## Using API Routes (from Frontend)

### Chat

```typescript
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello!' }
    ],
    stream: true,
  }),
});

// Parse streaming response
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      console.log(data.text);
    }
  }
}
```

### Generate Image

```typescript
const response = await fetch('/api/ai/generate-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    prompt: 'A majestic dragon',
    quality: 'hd',
    kingdomOfLightStyle: true,
  }),
});

const data = await response.json();
console.log('Image URL:', data.images[0].url);
```

### Generate Video

```typescript
// Start generation
const response = await fetch('/api/ai/generate-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    prompt: 'A dragon flying',
    duration: 8,
    resolution: '720p',
  }),
});

const data = await response.json();
const jobId = data.jobId;

// Poll for status
const pollStatus = async () => {
  const statusResponse = await fetch(
    `/api/ai/generate-video?jobId=${jobId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  const status = await statusResponse.json();

  if (status.status === 'completed') {
    console.log('Video URL:', status.videoUrl);
    return status;
  } else if (status.status === 'failed') {
    throw new Error(status.error);
  }

  // Still generating, poll again in 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));
  return pollStatus();
};

await pollStatus();
```

## React Hook Example

```typescript
import { useState } from 'react';

export function useGeminiChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const chat = async (message: string) => {
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        stream: true,
      }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          if (data.text) {
            text += data.text;
            setResponse(text);
          }
        }
      }
    }

    setLoading(false);
  };

  return { chat, loading, response };
}

// Usage in component
function ChatComponent() {
  const { chat, loading, response } = useGeminiChat();

  return (
    <div>
      <button onClick={() => chat('Hello!')}>
        Send
      </button>
      {loading && <p>Loading...</p>}
      <p>{response}</p>
    </div>
  );
}
```

## Cost Tracking

```typescript
// Track usage in your app
import { createUnifiedProvider } from '@arcanea/ai-core/providers/unified-provider';

const ai = createUnifiedProvider();

// After operations
const stats = ai.getUsageStats();

// Store in database
await supabase.from('user_usage').upsert({
  user_id: userId,
  total_cost: stats.totalCost,
  chat_requests: stats.chatRequests,
  image_requests: stats.imageRequests,
  video_requests: stats.videoRequests,
  updated_at: new Date(),
});
```

## Error Handling

```typescript
try {
  const response = await gemini.chat(prompt);
} catch (error) {
  if (error.message.includes('RATE_LIMIT')) {
    alert('Too many requests. Please wait a moment.');
  } else if (error.message.includes('SAFETY')) {
    alert('Content filtered. Please rephrase your request.');
  } else if (error.message.includes('API key')) {
    console.error('Invalid API key');
  } else {
    alert('An error occurred. Please try again.');
  }
}
```

## Next Steps

- Read the full [Integration Guide](./GEMINI_INTEGRATION.md)
- Check out [API Examples](./API_EXAMPLES.md)
- Learn about [Cost Optimization](./COST_OPTIMIZATION.md)
- Implement [Rate Limiting](./RATE_LIMITING.md)

## Support

Having issues? Check:
1. API key is set correctly
2. Supabase is configured
3. Database tables are created
4. Rate limits are not exceeded

For more help, see [Troubleshooting](./GEMINI_INTEGRATION.md#troubleshooting)
