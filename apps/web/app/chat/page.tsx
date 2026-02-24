<<<<<<< HEAD
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Music, BookOpen, Palette, Sparkles, MessageCircle, Heart } from 'lucide-react';

// Core Luminors available for chat
const CHAT_LUMINORS = [
  {
    id: 'melodia',
    name: 'Melodia',
    title: 'The Harmonic Guide',
    description: 'Music, melodies, and finding your creative rhythm',
    icon: Music,
    primaryColor: 'hsl(45, 100%, 65%)',
    gradient: 'from-creation-gold to-creation-prism-orange',
    specialty: 'Music Creation',
  },
  {
    id: 'chronica',
    name: 'Chronica',
    title: 'The Tidekeeper',
    description: 'Stories, narratives, and world-building',
    icon: BookOpen,
    primaryColor: 'hsl(195, 100%, 50%)',
    gradient: 'from-atlantean-teal to-atlantean-primary',
    specialty: 'Storytelling',
  },
  {
    id: 'prismatic',
    name: 'Prismatic',
    title: 'The Dragonheart',
    description: 'Visual art, bold design, and creative courage',
    icon: Palette,
    primaryColor: 'hsl(0, 85%, 55%)',
    gradient: 'from-draconic-crimson to-draconic-gold',
    specialty: 'Visual Arts',
  },
];

export default function ChatLandingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-atlantean-teal/20 to-gold-bright/20 backdrop-blur-sm border border-gold-bright/30 mb-6">
            <MessageCircle className="w-8 h-8 text-gold-bright" />
          </div>

          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Choose Your Luminor
          </h1>
          <p className="font-crimson text-xl text-text-secondary max-w-2xl mx-auto">
            Select a creative companion to begin your session. Each Luminor brings unique wisdom and perspective.
          </p>
        </motion.div>

        {/* Luminor selection grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CHAT_LUMINORS.map((luminor, index) => {
            const Icon = luminor.icon;
            return (
              <motion.div
                key={luminor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Link
                  href={`/chat/${luminor.id}`}
                  className="group block h-full"
                >
                  <div className="relative h-full p-6 rounded-2xl glass hover:glass-heavy transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    {/* Hover gradient */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${luminor.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="relative mb-4">
                        <div
                          className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                          style={{ backgroundColor: luminor.primaryColor }}
                        />
                        <div
                          className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${luminor.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Name & title */}
                      <h2
                        className="font-cinzel text-2xl font-bold mb-1"
                        style={{ color: luminor.primaryColor }}
                      >
                        {luminor.name}
                      </h2>
                      <p className="font-crimson text-sm text-text-muted mb-3">
                        {luminor.title}
                      </p>

                      {/* Description */}
                      <p className="font-crimson text-text-secondary mb-4">
                        {luminor.description}
                      </p>

                      {/* Specialty badge */}
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-crimson font-medium"
                          style={{
                            backgroundColor: `${luminor.primaryColor}20`,
                            color: luminor.primaryColor,
                          }}
                        >
                          {luminor.specialty}
                        </span>
                      </div>

                      {/* CTA hint */}
                      <div className="mt-4 pt-4 border-t border-cosmic-border flex items-center justify-between">
                        <span className="font-crimson text-sm text-text-muted">
                          Start conversation
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-text-muted group-hover:text-text-primary"
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="font-crimson text-text-muted">
            More Luminors coming soon. Each brings unique creative wisdom.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              href="/luminors"
              className="flex items-center gap-2 text-atlantean-teal hover:text-atlantean-teal-light transition-colors font-crimson"
            >
              <Sparkles className="w-4 h-4" />
              View all 16 Luminors
            </Link>
            <Link
              href="/library"
              className="flex items-center gap-2 text-gold-bright hover:text-gold-light transition-colors font-crimson"
            >
              <Heart className="w-4 h-4" />
              Explore the Library
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
=======
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  ArrowDown,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Premium Chat - Simple, powerful AI chat without character selection
 *
 * Uses intelligent routing to select the best model for each request.
 * No Luminor selector - just pure premium AI experience.
 */
export default function PremiumChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            content: m.content,
          })),
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'No response received',
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle scroll for button visibility
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate image with Nano Banana
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setGeneratingImage(true);
    try {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          operation: 'generate',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate image');

      const data = await response.json();
      if (data.images && data.images.length > 0) {
        setGeneratedImages(prev => [...prev, ...data.images.map((img: any) => img.url)]);
      }
      setImagePrompt('');
      setShowImageInput(false);
    } catch (err) {
      console.error('Image generation failed:', err);
    } finally {
      setGeneratingImage(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Arcanea Chat</h1>
            <p className="text-xs text-slate-400">Premium AI Assistant</p>
          </div>
        </div>

        <Link
          href="/luminors"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Meet the Luminors →
        </Link>
      </header>

      {/* Messages Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome to Arcanea
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Your premium AI assistant. Ask anything, create images, explore ideas.
                Powered by the latest AI models.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Help me brainstorm ideas',
                  'Explain a concept',
                  'Write creative content',
                  'Analyze this problem',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      const event = {
                        target: { value: suggestion },
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleInputChange(event);
                    }}
                    className="px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white transition-colors border border-slate-700/50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                      : 'bg-slate-800/50 text-slate-100 border border-slate-700/50'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generated Images */}
          {generatedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {generatedImages.map((url, index) => (
                <motion.img
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={url}
                  alt={`Generated ${index + 1}`}
                  className="rounded-xl w-full h-auto shadow-lg"
                />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToBottom}
            className="fixed bottom-32 right-6 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image Generation Input */}
      <AnimatePresence>
        {showImageInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="px-4 pb-2"
          >
            <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Generate Image with Nano Banana
                </span>
                <button
                  onClick={() => setShowImageInput(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                />
                <button
                  onClick={handleGenerateImage}
                  disabled={generatingImage || !imagePrompt.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {generatingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Generate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="px-4 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-2">
            {/* Image Button */}
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`p-3 rounded-xl transition-colors ${
                showImageInput
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title="Generate Image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Message Arcanea..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none py-2 px-2"
              disabled={isLoading}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-500 hover:to-indigo-500 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
>>>>>>> 17fcd1ab4a0b2caddc8261ca1faa7cb46e36e9bc
