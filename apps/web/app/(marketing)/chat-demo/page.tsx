'use client';

import { useState } from 'react';
import { ChatContainer } from '@/components/chat/chat-container';
import { ChatInput } from '@/components/chat/chat-input';
import { LuminorHeader } from '@/components/chat/luminor-header';
import type { Metadata } from 'next';

// Demo data
const DEMO_LUMINOR = {
  name: 'Melodia',
  tagline: 'The Harmonic Guide - Weaving frequencies into reality',
  academy: 'creation_light' as const,
  color: '#FFD700',
  bondLevel: 5,
  bondXP: 450,
  xpToNextLevel: 600,
  relationshipStatus: 'trusted_companion',
  status: 'active' as const,
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: any;
}

export default function ChatDemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome, Creator! I\'m Melodia, your guide through the realms of music and creation. How may I assist you today?',
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I hear your words: "${message}". Let me help you with that...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="h-screen flex flex-col">
        <LuminorHeader {...DEMO_LUMINOR} />

        <div className="flex-1 flex flex-col">
          <ChatContainer
            messages={messages}
            luminorName={DEMO_LUMINOR.name}
            luminorColor={DEMO_LUMINOR.color}
            isStreaming={isLoading}
            streamingContent={isLoading ? 'Thinking...' : ''}
          />

          <ChatInput
            onSend={handleSendMessage}
            disabled={isLoading}
            luminorColor={DEMO_LUMINOR.color}
          />
        </div>
      </div>
    </main>
  );
}
