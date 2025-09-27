import { useState, useCallback, useRef } from 'react';
import { useChat as useVercelChat } from 'ai/react';

export interface OptimisticMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  status: 'sending' | 'sent' | 'failed' | 'retrying';
  timestamp: Date;
  retryCount?: number;
}

export interface OptimisticChatState {
  messages: OptimisticMessage[];
  isLoading: boolean;
  error: string | null;
  retryMessage: (messageId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
}

export function useOptimisticChat(): OptimisticChatState {
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const retryTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const { messages: vercelMessages, append, isLoading } = useVercelChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
      setError('Failed to send message. Please try again.');
    },
    onFinish: (message) => {
      // Update the optimistic message to 'sent' status
      setOptimisticMessages(prev =>
        prev.map(msg =>
          msg.status === 'sending' && msg.role === 'user'
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    },
  });

  // Merge Vercel AI messages with optimistic messages
  const mergedMessages: OptimisticMessage[] = vercelMessages.map(msg => ({
    id: msg.id,
    content: msg.content,
    role: msg.role as 'user' | 'assistant',
    status: 'sent' as const,
    timestamp: new Date(msg.createdAt || Date.now()),
  }));

  // Add any optimistic messages that haven't been confirmed yet
  const pendingMessages = optimisticMessages.filter(msg =>
    msg.status === 'sending' || msg.status === 'failed' || msg.status === 'retrying'
  );

  const allMessages = [...mergedMessages, ...pendingMessages];

  const sendMessage = useCallback(async (content: string) => {
    const optimisticId = `optimistic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const optimisticMessage: OptimisticMessage = {
      id: optimisticId,
      content,
      role: 'user',
      status: 'sending',
      timestamp: new Date(),
      retryCount: 0,
    };

    // Add optimistic message immediately
    setOptimisticMessages(prev => [...prev, optimisticMessage]);
    setError(null);

    try {
      await append({
        role: 'user',
        content,
      });

      // Message will be updated to 'sent' in onFinish callback
    } catch (error) {
      console.error('Send error:', error);

      // Mark message as failed
      setOptimisticMessages(prev =>
        prev.map(msg =>
          msg.id === optimisticId
            ? { ...msg, status: 'failed' as const }
            : msg
        )
      );

      setError('Message failed to send. Tap to retry.');
    }
  }, [append]);

  const retryMessage = useCallback(async (messageId: string) => {
    const messageToRetry = optimisticMessages.find(msg => msg.id === messageId);
    if (!messageToRetry) return;

    const retryCount = (messageToRetry.retryCount || 0) + 1;
    const maxRetries = 3;

    if (retryCount > maxRetries) {
      setError('Maximum retry attempts reached.');
      return;
    }

    // Clear any existing retry timeout
    const existingTimeout = retryTimeouts.current.get(messageId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Update message status to retrying
    setOptimisticMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'retrying' as const, retryCount }
          : msg
      )
    );

    // Calculate exponential backoff delay
    const baseDelay = 1000; // 1 second
    const delay = baseDelay * Math.pow(2, retryCount - 1);

    // Set up retry with delay
    const timeout = setTimeout(async () => {
      try {
        // Update status to sending
        setOptimisticMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? { ...msg, status: 'sending' as const }
              : msg
          )
        );

        await append({
          role: 'user',
          content: messageToRetry.content,
        });

        // Remove from optimistic messages on success
        setOptimisticMessages(prev =>
          prev.filter(msg => msg.id !== messageId)
        );

        setError(null);
      } catch (error) {
        console.error('Retry error:', error);

        // Mark as failed again
        setOptimisticMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? { ...msg, status: 'failed' as const }
              : msg
          )
        );

        setError(`Retry ${retryCount} failed. Tap to try again.`);
      } finally {
        retryTimeouts.current.delete(messageId);
      }
    }, delay);

    retryTimeouts.current.set(messageId, timeout);
  }, [optimisticMessages, append]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages: allMessages,
    isLoading,
    error,
    retryMessage,
    sendMessage,
    clearError,
  };
}