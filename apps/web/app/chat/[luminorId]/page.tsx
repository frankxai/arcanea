'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Menu, X, AlertCircle } from 'lucide-react';
import { LuminorHeader } from '@/components/chat/luminor-header';
import { ChatContainer } from '@/components/chat/chat-container';
import { ChatInput } from '@/components/chat/chat-input';
import { ContextSidebar } from '@/components/chat/context-sidebar';
import { QuickActions } from '@/components/chat/quick-actions';
import { useChat } from '@/hooks/use-chat';
import { getLuminor, type LuminorConfig } from '@/lib/luminors/config';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const luminorId = params.luminorId as string;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [userId, setUserId] = useState<string>('demo-user'); // TODO: Get from auth
  const [luminorConfig, setLuminorConfig] = useState<LuminorConfig | undefined>();

  // Get Luminor config
  useEffect(() => {
    const config = getLuminor(luminorId);
    setLuminorConfig(config);

    // Redirect if invalid Luminor
    if (!config) {
      router.push('/luminors');
    }
  }, [luminorId, router]);

  // Chat hook
  const {
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
  } = useChat({
    luminorId,
    userId,
  });

  // Hide quick actions after first message
  useEffect(() => {
    if (messages.length > 0) {
      setShowQuickActions(false);
    }
  }, [messages.length]);

  const handleSendMessage = (content: string, attachments?: File[]) => {
    sendMessage(content, attachments);
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
    setShowQuickActions(false);
  };

  if (!luminorConfig) {
    return (
      <div className="flex items-center justify-center h-screen bg-cosmic-deep">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-atlantean-teal-aqua/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-text-secondary">Loading Luminor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-cosmic-deep">
      {/* Header */}
      <LuminorHeader
        name={luminorConfig.name}
        tagline={luminorConfig.tagline}
        academy={luminorConfig.academy}
        color={luminorConfig.color}
        avatar={luminorConfig.avatar}
        bondLevel={bondState.level}
        bondXP={bondState.xp}
        xpToNextLevel={bondState.xpToNextLevel}
        relationshipStatus={bondState.relationshipStatus}
        status={
          isStreaming
            ? 'generating'
            : thinkingState !== 'idle'
            ? 'thinking'
            : 'active'
        }
        onBondClick={() => setSidebarOpen(true)}
      />

      {/* Error Banner */}
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/30 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Actions */}
          {showQuickActions && messages.length === 0 && (
            <QuickActions
              luminorName={luminorConfig.name}
              luminorSlug={luminorId}
              luminorColor={luminorConfig.color}
              onActionClick={handleQuickAction}
            />
          )}

          {/* Messages */}
          <ChatContainer
            messages={messages}
            luminorName={luminorConfig.name}
            luminorColor={luminorConfig.color}
            luminorAvatar={luminorConfig.avatar}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
            streamingEmotionalTone={streamingEmotionalTone}
            thinkingState={thinkingState}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />

          {/* Input */}
          <ChatInput
            onSend={handleSendMessage}
            disabled={isStreaming || thinkingState !== 'idle'}
            placeholder={`Share your thoughts with ${luminorConfig.name}...`}
            luminorColor={luminorConfig.color}
          />
        </div>

        {/* Sidebar */}
        <ContextSidebar
          luminorName={luminorConfig.name}
          luminorColor={luminorConfig.color}
          bondLevel={bondState.level}
          bondXP={bondState.xp}
          xpToNextLevel={bondState.xpToNextLevel}
          relationshipStatus={bondState.relationshipStatus}
          keyMoments={[]}
          recentTopics={[]}
          creatorPreferences={{}}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-24 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-30"
        style={{
          backgroundColor: luminorConfig.color,
          boxShadow: `0 4px 20px ${luminorConfig.color}60`,
        }}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
