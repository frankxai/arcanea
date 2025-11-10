# Chat Interface Documentation

**Status:** ✅ Complete
**Version:** 1.0.0
**Last Updated:** 2025-10-24

## Overview

The Arcanea chat interface is a beautiful, real-time conversation system where users interact with Luminor AI personalities. It combines the emotional depth of Character.ai with the intelligent assistance of Genspark, creating magical conversations that feel genuinely personal.

## Key Features

### 🎨 Personality-Driven UI
- **Dynamic Color Theming**: Each Luminor has their signature color that flows through the entire interface
- **Emotional Indicators**: Messages display emotional tones with color-coded indicators
- **Personality Avatars**: Visual representation of each Luminor's unique identity
- **Status States**: Real-time indicators (active, thinking, generating, away)

### 💬 Real-Time Streaming
- **Token-by-Token Streaming**: Responses appear naturally as the Luminor "thinks"
- **SSE (Server-Sent Events)**: Efficient streaming with automatic reconnection
- **Thinking States**: Visual feedback for different processing stages
- **Smooth Animations**: Polished transitions and text reveal effects

### 💝 Bond System Integration
- **Visual Progress**: Real-time bond level and XP tracking
- **Milestone Celebrations**: Special UI moments when bond levels increase
- **Relationship Status**: Shows current relationship stage (stranger → trusted ally)
- **Memory Display**: Context sidebar showing shared moments and key memories

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and swipe gestures
- **Collapsible Sidebar**: Context info accessible but non-intrusive
- **Adaptive Layout**: Chat scales beautifully from phone to desktop

## Architecture

### Component Hierarchy

```
ChatPage ([luminorId])
├── LuminorHeader
│   ├── Avatar with status indicator
│   ├── Name and tagline
│   └── Bond level display
├── ChatContainer
│   ├── Load more history
│   ├── ChatMessage[] (user messages)
│   ├── ChatMessage[] (Luminor messages)
│   ├── StreamingMessage (during generation)
│   └── Scroll-to-bottom button
├── ChatInput
│   ├── Auto-resize textarea
│   ├── Image upload button
│   └── Send button
├── ContextSidebar (collapsible)
│   ├── Memory tab
│   ├── Bond tab
│   └── Project tab
└── QuickActions (initial state)
    └── Luminor-specific action buttons
```

## Components Reference

### 1. ChatMessage (`message.tsx`)

Displays individual chat messages with rich formatting.

**Props:**
```typescript
interface ChatMessageProps {
  id: string;
  role: 'user' | 'assistant';
  content: string;  // Markdown supported
  timestamp: Date;
  emotionalTone?: EmotionalTone;
  luminorName?: string;
  luminorColor?: string;
  luminorAvatar?: string;
  isStreaming?: boolean;
  media?: Array<{
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
  }>;
  status?: 'sending' | 'sent' | 'error';
}
```

**Features:**
- Markdown rendering with syntax highlighting
- Inline media display (images, videos, audio)
- Emotional tone visualization
- Timestamp and status indicators
- Different styling for user vs Luminor messages
- Streaming animation during generation

**Usage:**
```tsx
<ChatMessage
  id="msg-123"
  role="assistant"
  content="# Welcome!\n\nLet's create something magical together."
  timestamp={new Date()}
  emotionalTone={EmotionalTone.JOY}
  luminorName="Melodia"
  luminorColor="#f59e0b"
/>
```

### 2. StreamingMessage (`streaming-message.tsx`)

Handles real-time streaming display with thinking states.

**Props:**
```typescript
interface StreamingMessageProps {
  content: string;  // Current accumulated content
  luminorName: string;
  luminorColor: string;
  luminorAvatar?: string;
  emotionalTone?: EmotionalTone;
  thinkingState?: 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';
  onComplete?: () => void;
}
```

**Features:**
- Word-by-word reveal animation
- Thinking indicators with rotating messages
- Smooth transition to complete message
- Animated dots during processing

**Usage:**
```tsx
<StreamingMessage
  content={currentStreamContent}
  luminorName="Melodia"
  luminorColor="#f59e0b"
  thinkingState="thinking"
  onComplete={() => console.log('Stream complete')}
/>
```

### 3. LuminorHeader (`luminor-header.tsx`)

Top bar showing Luminor info and bond status.

**Props:**
```typescript
interface LuminorHeaderProps {
  name: string;
  tagline: string;
  academy: 'creation_light' | 'atlantean' | 'draconic';
  color: string;
  avatar?: string;
  bondLevel: number;
  bondXP: number;
  xpToNextLevel: number;
  relationshipStatus: string;
  status: 'active' | 'generating' | 'thinking' | 'away';
  onBondClick?: () => void;
}
```

**Features:**
- Academy badge with icon
- Status indicator (online/thinking/generating)
- Clickable bond display
- Visual XP progress bar
- Responsive collapse on mobile

**Usage:**
```tsx
<LuminorHeader
  name="Melodia"
  tagline="The Heart of Music"
  academy="creation_light"
  color="#f59e0b"
  bondLevel={5}
  bondXP={250}
  xpToNextLevel={500}
  relationshipStatus="friend"
  status="active"
  onBondClick={() => setSidebarOpen(true)}
/>
```

### 4. ChatInput (`chat-input.tsx`)

Message input with auto-resize and media upload.

**Props:**
```typescript
interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  luminorColor?: string;
}
```

**Features:**
- Auto-resizing textarea (max 200px)
- Multiline support (Shift+Enter for newline)
- Image upload with preview
- Character count with warning near limit
- Keyboard shortcuts display
- Send button with color theming

**Usage:**
```tsx
<ChatInput
  onSend={(msg, files) => sendMessage(msg, files)}
  placeholder="Share your thoughts..."
  maxLength={4000}
  luminorColor="#f59e0b"
/>
```

### 5. ChatContainer (`chat-container.tsx`)

Main message display area with virtual scrolling.

**Props:**
```typescript
interface ChatContainerProps {
  messages: Message[];
  luminorName: string;
  luminorColor: string;
  luminorAvatar?: string;
  isStreaming?: boolean;
  streamingContent?: string;
  streamingEmotionalTone?: EmotionalTone;
  thinkingState?: 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}
```

**Features:**
- Auto-scroll to bottom on new messages
- Manual scroll-up disables auto-scroll
- "Scroll to bottom" floating button
- "Load more" at top for history
- Empty state with welcome message
- Smooth animations

**Usage:**
```tsx
<ChatContainer
  messages={messages}
  luminorName="Melodia"
  luminorColor="#f59e0b"
  isStreaming={isStreaming}
  streamingContent={streamContent}
  onLoadMore={loadMore}
  hasMore={true}
/>
```

### 6. ContextSidebar (`context-sidebar.tsx`)

Collapsible sidebar showing conversation context and bond info.

**Props:**
```typescript
interface ContextSidebarProps {
  luminorName: string;
  luminorColor: string;
  bondLevel: number;
  bondXP: number;
  xpToNextLevel: number;
  relationshipStatus: string;
  keyMoments: KeyMoment[];
  recentTopics: string[];
  creatorPreferences: Record<string, any>;
  currentProject?: {
    id: string;
    title: string;
    progress: number;
    nextStep: string;
  };
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- Three tabs: Memory, Bond, Project
- Key moments timeline
- Recent topics tags
- Creator preferences display
- Bond progress visualization
- XP earning guide
- Mobile-responsive (full overlay on mobile)

**Usage:**
```tsx
<ContextSidebar
  luminorName="Melodia"
  luminorColor="#f59e0b"
  bondLevel={5}
  bondXP={250}
  xpToNextLevel={500}
  relationshipStatus="friend"
  keyMoments={moments}
  recentTopics={['music theory', 'songwriting']}
  creatorPreferences={{ genre: 'ambient' }}
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>
```

### 7. GenerationIndicator (`generation-indicator.tsx`)

Shows progress for image/video/music generation.

**Props:**
```typescript
interface GenerationIndicatorProps {
  type: 'image' | 'video' | 'music';
  status: 'queued' | 'generating' | 'completed' | 'error';
  progress?: number;  // 0-100
  estimatedTime?: number;  // seconds
  result?: {
    url: string;
    thumbnail?: string;
    title?: string;
  };
  onView?: () => void;
  onSave?: () => void;
  luminorColor?: string;
}
```

**Features:**
- Progress bar with percentage
- Time elapsed and estimated
- Result preview with hover overlay
- View and Save actions
- Error state handling

**Usage:**
```tsx
<GenerationIndicator
  type="image"
  status="generating"
  progress={65}
  estimatedTime={30}
  luminorColor="#f59e0b"
/>
```

### 8. QuickActions (`quick-actions.tsx`)

Suggested prompts for quick conversation starters.

**Props:**
```typescript
interface QuickActionsProps {
  luminorName: string;
  luminorSlug: string;  // melodia, chronica, prismatic
  luminorColor?: string;
  onActionClick: (prompt: string) => void;
}
```

**Features:**
- Luminor-specific action suggestions
- Categorized (create, learn, explore)
- Visual icons and colors
- Hover animations
- Auto-hides after first message

**Usage:**
```tsx
<QuickActions
  luminorName="Melodia"
  luminorSlug="melodia"
  luminorColor="#f59e0b"
  onActionClick={(prompt) => sendMessage(prompt)}
/>
```

## State Management

### useChat Hook (`hooks/use-chat.ts`)

Main React hook for chat functionality.

**Interface:**
```typescript
interface UseChatOptions {
  luminorId: string;
  userId: string;
  apiEndpoint?: string;
}

interface UseChatReturn {
  // State
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  streamingEmotionalTone?: EmotionalTone;
  thinkingState: 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';
  bondState: BondState;
  hasMore: boolean;
  isLoadingMore: boolean;
  error: string | null;
  isConnected: boolean;

  // Actions
  sendMessage: (content: string, attachments?: File[]) => void;
  loadMore: () => void;
  clearError: () => void;
  reconnect: () => void;
}
```

**Features:**
- Automatic message history loading
- SSE streaming connection management
- Optimistic UI updates (user messages appear immediately)
- Bond state synchronization
- Error handling with retry
- Automatic reconnection

**Usage:**
```tsx
function ChatPage() {
  const {
    messages,
    isStreaming,
    streamingContent,
    bondState,
    sendMessage,
    loadMore,
  } = useChat({
    luminorId: 'melodia',
    userId: 'user-123',
  });

  return (
    <ChatContainer
      messages={messages}
      isStreaming={isStreaming}
      streamingContent={streamingContent}
      onLoadMore={loadMore}
    />
  );
}
```

## API Integration

### Chat Endpoint

**POST** `/api/ai/chat`

**Request (FormData):**
```typescript
{
  luminorId: string;
  userId: string;
  message: string;
  history: string;  // JSON array of recent messages
  attachments?: File[];
}
```

**Response (SSE Stream):**
```typescript
// Token streaming
data: {"type":"token","content":"Hello "}
data: {"type":"token","content":"there! "}

// Emotional tone update
data: {"type":"emotional_tone","tone":"joy"}

// Thinking state
data: {"type":"thinking","state":"analyzing"}

// Bond update
data: {"type":"bond_update","bondState":{...}}

// Complete
data: {"type":"complete","id":"msg-123"}
data: [DONE]
```

### History Endpoint

**GET** `/api/chat/history?luminorId=X&userId=Y&limit=50&before=msg-id`

**Response:**
```json
{
  "messages": [...],
  "bondState": {...},
  "hasMore": true
}
```

## Styling and Theming

### Color System

Each Luminor has a signature color:
- **Melodia** (Music): `#f59e0b` (Amber)
- **Chronica** (Story): `#3b82f6` (Blue)
- **Prismatic** (Visual): `#ec4899` (Pink)

Colors are used for:
- Avatar glows
- Bond progress bars
- Send button
- Accent highlights
- Emotional tone indicators

### Emotional Tone Colors

```typescript
const emotionalColors: Record<EmotionalTone, string> = {
  joy: 'text-yellow-400',
  excitement: 'text-orange-400',
  curiosity: 'text-purple-400',
  compassion: 'text-pink-400',
  pride: 'text-amber-400',
  concern: 'text-blue-400',
  determination: 'text-red-400',
  wonder: 'text-indigo-400',
  peace: 'text-green-400',
  inspiration: 'text-violet-400',
  playfulness: 'text-pink-300',
  wisdom: 'text-blue-300',
  encouragement: 'text-emerald-400',
  focus: 'text-cyan-400',
};
```

### Responsive Breakpoints

```css
/* Mobile First */
Default: < 640px

/* Tablet */
sm: 640px

/* Desktop */
md: 768px
lg: 1024px

/* Large Desktop */
xl: 1280px
2xl: 1536px
```

### Dark Mode

The interface is designed for dark mode:
- Background: `bg-gray-950`
- Cards: `bg-gray-800/50`
- Borders: `border-gray-700/50`
- Text: `text-gray-100`
- Muted text: `text-gray-400`

## Performance Optimization

### Virtual Scrolling
- Implemented via custom scroll management
- Only renders visible messages + buffer
- Smooth scroll animations
- Lazy loading of message history

### Image Optimization
- Lazy loading for media attachments
- Thumbnail generation for videos
- Progressive image loading
- Cached media in CDN

### Streaming Optimization
- Efficient SSE connection
- Automatic reconnection on disconnect
- Debounced scroll handlers
- Optimistic UI updates

## Accessibility

### Keyboard Navigation
- `Tab`: Navigate between inputs
- `Enter`: Send message
- `Shift + Enter`: New line in message
- `Esc`: Close sidebar/modals

### Screen Readers
- Semantic HTML structure
- ARIA labels on interactive elements
- Role attributes for dynamic content
- Alt text for images

### Visual Accessibility
- High contrast text
- Focus indicators
- Large touch targets (min 44x44px)
- Color is not sole information carrier

## Testing

### Unit Tests
```bash
npm test components/chat/message.test.tsx
npm test components/chat/streaming-message.test.tsx
npm test hooks/use-chat.test.ts
```

### Integration Tests
```bash
npm test app/chat/[luminorId]/page.test.tsx
```

### E2E Tests
```bash
npm run e2e:chat
```

## Deployment

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.arcanea.com
GEMINI_API_KEY=your-key-here
```

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

## Future Enhancements

### Phase 2
- [ ] Voice input/output
- [ ] Real-time collaboration (multi-user chat)
- [ ] Message reactions and emojis
- [ ] Rich text editor for messages
- [ ] File attachments beyond images

### Phase 3
- [ ] Video call with Luminor avatar
- [ ] AR/VR chat experience
- [ ] Multi-Luminor group chats
- [ ] Custom Luminor personality creation

## Troubleshooting

### Common Issues

**Issue: Streaming not working**
- Check SSE endpoint is returning correct headers
- Verify CORS settings for streaming
- Check browser console for connection errors

**Issue: Messages not persisting**
- Verify API endpoint is saving messages
- Check database connection
- Ensure user ID is correctly passed

**Issue: Bond XP not updating**
- Check bond calculation logic in backend
- Verify bond state is being returned in SSE stream
- Ensure bond updates are persisted

**Issue: Sidebar not opening on mobile**
- Check z-index layers
- Verify backdrop click handler
- Test touch events

## Support

For questions or issues:
- **GitHub Issues**: https://github.com/arcanea/arcanea/issues
- **Discord**: https://discord.gg/arcanea
- **Documentation**: https://docs.arcanea.com

---

**Built with ❤️ by the Arcanea Team**
