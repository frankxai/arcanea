# Migration Guide: Upgrading to New Gemini Integration

Guide for updating existing Arcanea code to use the new comprehensive Gemini integration.

## Overview

The new integration provides:
- Unified provider interface
- Better cost tracking
- Improved streaming
- Full multimodal support
- Rate limiting built-in
- Job queue management

## Breaking Changes

### 1. Provider Initialization

**Old**:
```typescript
import { GeminiProvider } from '@arcanea/ai-core/providers/gemini';

const gemini = new GeminiProvider({
  apiKey: process.env.GEMINI_API_KEY,
});
```

**New**:
```typescript
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';

const gemini = createGeminiChatProvider({
  apiKey: process.env.GEMINI_API_KEY,
});
```

### 2. Text Generation

**Old**:
```typescript
const text = await gemini.generateText(prompt);
```

**New**:
```typescript
const response = await gemini.chat(prompt);
const text = response.text;
// Bonus: Now you also get cost and token usage!
console.log('Cost:', response.cost);
console.log('Tokens:', response.tokensUsed);
```

### 3. Streaming

**Old**:
```typescript
for await (const chunk of gemini.streamText(prompt)) {
  console.log(chunk);
}
```

**New** (Same interface, but better error handling):
```typescript
for await (const chunk of gemini.streamText(prompt)) {
  console.log(chunk);
}
```

### 4. Image Generation

**Old**:
```typescript
const image = await gemini.generateImage(prompt);
```

**New** (Separate provider for better organization):
```typescript
import { createImagenProvider } from '@arcanea/ai-core/providers/gemini-imagen';

const imagen = createImagenProvider();
const image = await imagen.generateImage(prompt, {
  quality: 'hd',
  kingdomOfLightStyle: true,
});
```

### 5. Image Editing

**Old**:
```typescript
const edited = await gemini.editImage(imageUrl, editPrompt);
```

**New**:
```typescript
const edited = await imagen.editImage(imageUrl, editPrompt, {
  preserveStyle: true,
  quality: 'hd',
});
```

## Recommended Migration Path

### Option 1: Use Unified Provider (Recommended)

**Best for**: New features and clean code

```typescript
// Old approach - multiple providers
import { GeminiProvider } from '@arcanea/ai-core/providers/gemini';
import { SunoProvider } from '@arcanea/ai-core/providers/suno';

const gemini = new GeminiProvider();
const suno = new SunoProvider();

// New approach - unified interface
import { createUnifiedProvider } from '@arcanea/ai-core/providers/unified-provider';

const ai = createUnifiedProvider();

// All operations through one interface
const chatResponse = await ai.chat('Hello!');
const image = await ai.generateImage('A dragon');
const video = await ai.generateVideo('Ocean waves');

// Bonus: Usage tracking built-in
const stats = ai.getUsageStats();
console.log('Total cost:', stats.totalCost);
```

### Option 2: Individual Providers

**Best for**: Gradual migration and specific use cases

```typescript
import {
  createGeminiChatProvider,
  createImagenProvider,
  createVeoProvider,
} from '@arcanea/ai-core/providers';

const chat = createGeminiChatProvider();
const imagen = createImagenProvider();
const veo = createVeoProvider();

// Use each provider independently
const response = await chat.chat('Hello!');
const image = await imagen.generateImage('A dragon');
const video = await veo.generateVideo('Ocean waves');
```

## Step-by-Step Migration

### Step 1: Update Dependencies

```bash
cd packages/ai-core
npm install @google/generative-ai@^0.21.0 eventsource-parser@^1.1.2
```

### Step 2: Update Imports

Find and replace across your codebase:

```typescript
// Find
import { GeminiProvider } from '@arcanea/ai-core/providers/gemini';

// Replace with
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';
import { createImagenProvider } from '@arcanea/ai-core/providers/gemini-imagen';
```

### Step 3: Update Provider Initialization

```typescript
// Old
const gemini = new GeminiProvider({ apiKey: key });

// New
const gemini = createGeminiChatProvider({ apiKey: key });
```

### Step 4: Update Method Calls

```typescript
// Old
const text = await gemini.generateText(prompt);

// New
const response = await gemini.chat(prompt);
const text = response.text;
```

### Step 5: Add Cost Tracking

```typescript
// Old - no cost tracking
const text = await gemini.generateText(prompt);

// New - automatic cost tracking
const response = await gemini.chat(prompt);
console.log('Cost:', response.cost);
console.log('Tokens:', response.tokensUsed);

// Store in database
await supabase.from('ai_usage').insert({
  user_id: userId,
  operation: 'chat',
  cost: response.cost,
  tokens: response.tokensUsed.total,
});
```

### Step 6: Update Streaming

```typescript
// Old - basic streaming
for await (const chunk of gemini.streamText(prompt)) {
  console.log(chunk);
}

// New - streaming with SSE helper
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

## API Route Migration

### Old API Route

```typescript
// apps/chat/app/api/chat/route.ts
export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
  });

  return result.toAIStreamResponse();
}
```

### New API Route

```typescript
// apps/web/app/api/ai/chat/route.ts
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';
import { createStreamResponse } from '@arcanea/ai-core/streaming';

export async function POST(req: NextRequest) {
  // Verify auth
  const user = await verifyAuth(req);

  const { messages, systemPrompt } = await req.json();

  const gemini = createGeminiChatProvider();
  const lastMessage = messages[messages.length - 1];

  const generator = gemini.streamText(lastMessage.content, {
    systemPrompt,
    history: messages.slice(0, -1),
  });

  const stream = createStreamResponse(generator);

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

## Component Migration

### Old Chat Component

```typescript
import { useChat } from 'ai/react';

export function ChatComponent() {
  const { messages, input, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} />
      <div>
        {messages.map(m => (
          <div key={m.id}>{m.content}</div>
        ))}
      </div>
    </form>
  );
}
```

### New Chat Component

```typescript
import { useState } from 'react';
import { parseSSEStream } from '@arcanea/ai-core/streaming';

export function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        messages: [...messages, newMessage],
        stream: true,
      }),
    });

    let assistantMessage = '';
    for await (const data of parseSSEStream(response)) {
      if (data.text) {
        assistantMessage += data.text;
        setMessages([
          ...messages,
          newMessage,
          { role: 'assistant', content: assistantMessage },
        ]);
      }
    }

    setLoading(false);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button disabled={loading}>Send</button>
      <div>
        {messages.map((m, i) => (
          <div key={i}>{m.content}</div>
        ))}
      </div>
    </form>
  );
}
```

## Database Schema Updates

### Add New Tables

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
  status TEXT NOT NULL,
  cost DECIMAL(10, 6),
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add video credits to user profiles
ALTER TABLE user_profiles ADD COLUMN video_credits INTEGER DEFAULT 0;
```

## Testing Your Migration

### 1. Test Chat

```typescript
import { createGeminiChatProvider } from '@arcanea/ai-core/providers/gemini-chat';

const gemini = createGeminiChatProvider();

async function testChat() {
  const response = await gemini.chat('Hello, world!');
  console.log('Response:', response.text);
  console.log('Cost:', response.cost);
  console.log('Tokens:', response.tokensUsed);
}

testChat();
```

### 2. Test Image Generation

```typescript
import { createImagenProvider } from '@arcanea/ai-core/providers/gemini-imagen';

const imagen = createImagenProvider();

async function testImage() {
  const image = await imagen.generateImage('A beautiful dragon', {
    quality: 'hd',
  });
  console.log('Image URL:', image.url);
  console.log('Cost:', image.metadata.cost);
}

testImage();
```

### 3. Test Unified Provider

```typescript
import { createUnifiedProvider } from '@arcanea/ai-core/providers/unified-provider';

const ai = createUnifiedProvider();

async function testAll() {
  const chat = await ai.chat('Hello!');
  const image = await ai.generateImage('A dragon');
  const stats = ai.getUsageStats();

  console.log('Chat cost:', chat.cost);
  console.log('Image cost:', image.metadata.cost);
  console.log('Total cost:', stats.totalCost);
}

testAll();
```

## Rollback Plan

If you need to rollback:

1. **Keep old files**: Don't delete old provider files until migration is complete
2. **Use feature flags**: Toggle between old and new implementations
3. **Test in stages**: Migrate one feature at a time

```typescript
// Feature flag example
const USE_NEW_PROVIDER = process.env.USE_NEW_GEMINI === 'true';

const gemini = USE_NEW_PROVIDER
  ? createGeminiChatProvider()
  : new GeminiProvider();
```

## Common Issues

### Issue: "Module not found"

```bash
# Solution: Install new dependencies
npm install @google/generative-ai eventsource-parser
```

### Issue: "Property 'chat' does not exist"

```typescript
// Old method
const text = await gemini.generateText(prompt);

// New method
const response = await gemini.chat(prompt);
const text = response.text;
```

### Issue: "Cost is undefined"

```typescript
// Ensure you're using the new chat() method, not generateText()
const response = await gemini.chat(prompt);
console.log(response.cost); // Now available
```

## Timeline Recommendation

### Week 1: Setup
- Install dependencies
- Update environment variables
- Create database tables

### Week 2: Backend Migration
- Update API routes
- Add cost tracking
- Test with Postman/curl

### Week 3: Frontend Migration
- Update components
- Test user flows
- Monitor for errors

### Week 4: Cleanup
- Remove old code
- Update documentation
- Deploy to production

## Support

Need help with migration?
- Check [Integration Guide](./GEMINI_INTEGRATION.md)
- Review [Quick Start](./QUICK_START_GEMINI.md)
- Contact: support@arcanea.ai

---

**Last Updated**: October 24, 2025
