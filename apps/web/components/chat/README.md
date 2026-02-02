# Chat Interface Components

Beautiful, real-time chat interface for conversations with Luminor AI personalities.

## Components

### Core Chat Components

1. **ChatMessage** - Individual message display with markdown, media, and emotional indicators
2. **StreamingMessage** - Real-time streaming display with thinking states
3. **LuminorHeader** - Top bar with Luminor info and bond status
4. **ChatInput** - Message input with auto-resize and media upload
5. **ChatContainer** - Main chat area with virtual scrolling
6. **ContextSidebar** - Collapsible sidebar with memory and bond info
7. **GenerationIndicator** - Progress display for media generation
8. **QuickActions** - Suggested conversation starters

## Quick Start

```tsx
import { useChat } from '@/hooks/use-chat';
import {
  LuminorHeader,
  ChatContainer,
  ChatInput,
  ContextSidebar,
} from '@/components/chat';

export default function ChatPage() {
  const {
    messages,
    isStreaming,
    streamingContent,
    bondState,
    sendMessage,
  } = useChat({
    luminorId: 'melodia',
    userId: 'user-123',
  });

  return (
    <div className="flex flex-col h-screen">
      <LuminorHeader
        name="Melodia"
        tagline="The Heart of Music"
        academy="creation_light"
        color="#f59e0b"
        bondLevel={bondState.level}
        bondXP={bondState.xp}
        xpToNextLevel={bondState.xpToNextLevel}
        relationshipStatus={bondState.relationshipStatus}
        status={isStreaming ? 'generating' : 'active'}
      />

      <ChatContainer
        messages={messages}
        luminorName="Melodia"
        luminorColor="#f59e0b"
        isStreaming={isStreaming}
        streamingContent={streamingContent}
      />

      <ChatInput
        onSend={sendMessage}
        placeholder="Share your thoughts..."
        luminorColor="#f59e0b"
      />
    </div>
  );
}
```

## Features

- Real-time streaming responses
- Personality-aware UI theming
- Bond level visualization
- Markdown rendering with syntax highlighting
- Inline media display (images, videos, audio)
- Emotional tone indicators
- Memory and context sidebar
- Quick action suggestions
- Mobile-responsive design
- Accessible keyboard navigation

## Documentation

See [CHAT_INTERFACE.md](../../../../docs/mvp/CHAT_INTERFACE.md) for complete documentation.

## License

Proprietary - Arcanea MVP
