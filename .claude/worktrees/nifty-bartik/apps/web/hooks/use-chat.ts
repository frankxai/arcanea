'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Emotional tone type (inlined from ai-core)
export type EmotionalTone =
  | 'warm'
  | 'enthusiastic'
  | 'contemplative'
  | 'encouraging'
  | 'curious'
  | 'playful'
  | 'wise'
  | 'empathetic'
  | 'challenging'
  | 'celebratory';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: EmotionalTone;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
  }[];
  status?: 'sending' | 'sent' | 'error';
}

interface BondState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  relationshipStatus: string;
}

interface UseChatOptions {
  luminorId: string;
  userId: string;
  apiEndpoint?: string;
}

interface UseChatReturn {
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  streamingEmotionalTone?: EmotionalTone;
  thinkingState: 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';
  bondState: BondState;
  sendMessage: (content: string, attachments?: File[]) => void;
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  error: string | null;
  clearError: () => void;
  reconnect: () => void;
  isConnected: boolean;
}

export function useChat({
  luminorId,
  userId,
  apiEndpoint = '/api/ai/chat',
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [streamingEmotionalTone, setStreamingEmotionalTone] = useState<EmotionalTone>();
  const [thinkingState, setThinkingState] = useState<'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating'>('idle');
  const [bondState, setBondState] = useState<BondState>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    relationshipStatus: 'stranger',
  });
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoize loadChatHistory to prevent recreating on every render
  const loadChatHistory = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/chat/history?luminorId=${luminorId}&userId=${userId}&limit=50`
      );
      if (!response.ok) throw new Error('Failed to load chat history');

      const data = await response.json();
      setMessages(data.messages || []);
      setBondState(data.bondState || {
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        relationshipStatus: 'stranger',
      });
      setHasMore(data.hasMore || false);
    } catch (err) {
      console.error('Failed to load chat history:', err);
      // Don't set error - just start with empty history
    }
  }, [luminorId, userId]);

  // Load initial chat history
  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const oldestMessage = messages[0];
      const response = await fetch(
        `/api/chat/history?luminorId=${luminorId}&userId=${userId}&before=${oldestMessage?.id}&limit=50`
      );
      if (!response.ok) throw new Error('Failed to load more messages');

      const data = await response.json();
      setMessages((prev) => [...data.messages, ...prev]);
      setHasMore(data.hasMore || false);
    } catch (err) {
      console.error('Failed to load more messages:', err);
      setError('Failed to load more messages');
    } finally {
      setIsLoadingMore(false);
    }
  }, [luminorId, userId, messages, hasMore, isLoadingMore]);

  const sendMessage = useCallback(
    async (content: string, attachments?: File[]) => {
      // Add user message optimistically
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        status: 'sending',
      };

      setMessages((prev) => [...prev, userMessage]);
      setThinkingState('thinking');

      // Prepare request
      const formData = new FormData();
      formData.append('luminorId', luminorId);
      formData.append('userId', userId);
      formData.append('message', content);

      if (attachments) {
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });
      }

      // Include recent message history for context
      const recentMessages = messages.slice(-5);
      formData.append('history', JSON.stringify(recentMessages));

      try {
        // Create abort controller for this request
        abortControllerRef.current = new AbortController();

        // Send message and start streaming
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update user message status
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
          )
        );

        // Handle SSE streaming
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No response body');
        }

        setIsStreaming(true);
        setStreamingContent('');
        setThinkingState('idle');
        let fullContent = '';
        let currentEmotionalTone: EmotionalTone | undefined;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              if (data === '[DONE]') {
                // Stream complete
                continue;
              }

              try {
                const parsed = JSON.parse(data);

                if (parsed.type === 'token') {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                } else if (parsed.type === 'emotional_tone') {
                  currentEmotionalTone = parsed.tone;
                  setStreamingEmotionalTone(parsed.tone);
                } else if (parsed.type === 'bond_update') {
                  setBondState(parsed.bondState);
                } else if (parsed.type === 'thinking') {
                  setThinkingState(parsed.state);
                } else if (parsed.type === 'complete') {
                  // Add complete message
                  const assistantMessage: Message = {
                    id: parsed.id || `msg-${Date.now()}`,
                    role: 'assistant',
                    content: fullContent,
                    timestamp: new Date(),
                    emotionalTone: currentEmotionalTone,
                  };
                  setMessages((prev) => [...prev, assistantMessage]);
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e);
              }
            }
          }
        }

        setIsStreaming(false);
        setStreamingContent('');
        setThinkingState('idle');
        setIsConnected(true);
      } catch (err: unknown) {
        console.error('Failed to send message:', err);

        if (err instanceof Error && err.name === 'AbortError') {
          // Request was aborted, ignore
          return;
        }

        // Update user message status to error
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
          )
        );

        setError('Failed to send message. Please try again.');
        setIsStreaming(false);
        setStreamingContent('');
        setThinkingState('idle');
        setIsConnected(false);
      }
    },
    [luminorId, userId, messages, apiEndpoint]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reconnect = useCallback(() => {
    setIsConnected(false);
    loadChatHistory();
  }, [loadChatHistory]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    isStreaming,
    streamingContent,
    streamingEmotionalTone,
    thinkingState,
    bondState,
    sendMessage,
    loadMore,
    hasMore,
    isLoadingMore,
    error,
    clearError,
    reconnect,
    isConnected,
  };
}

export default useChat;
