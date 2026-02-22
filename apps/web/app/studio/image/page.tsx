'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  Download,
  RefreshCw,
  Settings,
  ImageIcon,
  Palette,
  Layers,
  ZoomIn,
  Copy,
  Check,
  ChevronDown,
  Flame,
} from 'lucide-react';

// Style presets aligned with Arcanea aesthetics
const STYLE_PRESETS = [
  { id: 'fantasy', name: 'Fantasy Art', description: 'Magical, ethereal, Arcanean aesthetics' },
  { id: 'concept', name: 'Concept Art', description: 'Professional game/film concept style' },
  { id: 'anime', name: 'Anime Style', description: 'Japanese animation inspired' },
  { id: 'photorealistic', name: 'Photorealistic', description: 'Ultra-realistic imagery' },
  { id: 'digital', name: 'Digital Painting', description: 'Hand-painted digital art feel' },
  { id: 'cosmic', name: 'Cosmic Vision', description: 'Space, nebulae, cosmic themes' },
];

const ASPECT_RATIOS = [
  { id: '1:1', name: 'Square', width: 1024, height: 1024 },
  { id: '16:9', name: 'Landscape', width: 1024, height: 576 },
  { id: '9:16', name: 'Portrait', width: 576, height: 1024 },
  { id: '4:3', name: 'Standard', width: 1024, height: 768 },
  { id: '3:4', name: 'Tall', width: 768, height: 1024 },
];

const QUICK_PROMPTS = [
  'A majestic dragon guardian protecting an ancient crystal',
  'Luminor meditating in a cosmic void surrounded by stars',
  'The gates of Arcanea opening to reveal golden light',
  'A creator channeling the five elements in harmony',
  'The Library of Arcanea with floating books and ethereal light',
  'A fierce battle between light and shadow forces',
];

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  timestamp: Date;
}

export default function ImageForgePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('fantasy');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    // Simulate API call - in production, this would call your image generation API
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock generated image - replace with actual API response
    const newImage: GeneratedImage = {
      id: Date.now().toString(),
      // Using placeholder - in production, use actual generated image URL
      url: `https://picsum.photos/seed/${Date.now()}/1024/1024`,
      prompt: prompt,
      style: selectedStyle,
      aspectRatio: selectedRatio,
      timestamp: new Date(),
    };

    setGeneratedImages((prev) => [newImage, ...prev]);
    setSelectedImage(newImage);
    setIsGenerating(false);
  };

  const handleQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt);
    textareaRef.current?.focus();
  };

  const handleCopyPrompt = () => {
    if (selectedImage) {
      navigator.clipboard.writeText(selectedImage.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `arcanea-${selectedImage.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-deep">
      {/* Header */}
      <header className="border-b border-white/10 bg-cosmic-surface/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/studio"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fire to-orange-500 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold">Image Forge</h1>
                <p className="text-xs text-text-muted">Powered by Draconia • 396 Hz</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              showSettings ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-text-secondary'
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main area - Canvas/Generated Image */}
          <div className="space-y-6">
            {/* Image display */}
            <div
              className="relative bg-cosmic-surface/30 rounded-2xl border border-white/10 overflow-hidden"
              style={{ aspectRatio: selectedRatio.replace(':', '/') }}
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-fire/20 border-t-fire animate-spin" />
                      <Wand2 className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fire" />
                    </div>
                    <p className="mt-6 text-text-secondary">Channeling creative fire...</p>
                    <p className="text-sm text-text-muted mt-2">Guardian Draconia is crafting your vision</p>
                  </motion.div>
                ) : selectedImage ? (
                  <motion.div
                    key={selectedImage.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.prompt}
                      className="w-full h-full object-cover"
                    />
                    {/* Image overlay controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white/90 line-clamp-2 max-w-md">
                            {selectedImage.prompt}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={handleCopyPrompt}
                              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                              title="Copy prompt"
                            >
                              {copied ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </button>
                            <button
                              onClick={handleDownload}
                              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                              title="Download image"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                              title="Zoom"
                            >
                              <ZoomIn className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-fire/10 flex items-center justify-center mb-6">
                      <ImageIcon className="w-12 h-12 text-fire/60" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      Ready to Create
                    </h3>
                    <p className="text-text-secondary max-w-sm">
                      Describe your vision below and let Guardian Draconia bring it to life
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Generated images gallery */}
            {generatedImages.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Creations</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {generatedImages.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage?.id === img.id
                          ? 'border-fire'
                          : 'border-transparent hover:border-white/30'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.prompt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Controls */}
          <div className="space-y-6">
            {/* Prompt input */}
            <div className="bg-cosmic-surface/50 rounded-2xl border border-white/10 p-4">
              <label className="block text-sm font-medium mb-2">Describe Your Vision</label>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A majestic dragon guardian soaring through a cosmic nebula, scales shimmering with starlight..."
                rows={4}
                className="w-full bg-white/5 rounded-xl border border-white/10 p-3 text-sm focus:border-fire focus:outline-none focus:ring-2 focus:ring-fire/20 resize-none transition-all"
              />

              {/* Quick prompts */}
              <div className="mt-3">
                <p className="text-xs text-text-muted mb-2">Quick inspiration:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.slice(0, 3).map((qp, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(qp)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                    >
                      {qp.slice(0, 30)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-fire to-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Image
                  </>
                )}
              </button>
            </div>

            {/* Style presets */}
            <div className="bg-cosmic-surface/50 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-text-muted" />
                <label className="text-sm font-medium">Style</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STYLE_PRESETS.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedStyle === style.id
                        ? 'border-fire bg-fire/10'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <p className={`text-sm font-medium ${selectedStyle === style.id ? 'text-fire' : ''}`}>
                      {style.name}
                    </p>
                    <p className="text-xs text-text-muted mt-1">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect ratio */}
            <div className="bg-cosmic-surface/50 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-text-muted" />
                <label className="text-sm font-medium">Aspect Ratio</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      selectedRatio === ratio.id
                        ? 'border-fire bg-fire/10 text-fire'
                        : 'border-white/10 hover:border-white/30 text-text-secondary'
                    }`}
                  >
                    {ratio.name}
                    <span className="text-xs text-text-muted ml-1">({ratio.id})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced settings dropdown */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-cosmic-surface/50 rounded-2xl border border-white/10 p-4 overflow-hidden"
                >
                  <h4 className="text-sm font-medium mb-4">Advanced Settings</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-text-muted">Creativity Level</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="w-full mt-2 accent-fire"
                      />
                      <div className="flex justify-between text-xs text-text-muted mt-1">
                        <span>Precise</span>
                        <span>Creative</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-text-muted">Enhancement</label>
                      <select className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-fire focus:outline-none">
                        <option value="none">None</option>
                        <option value="upscale">Upscale 2x</option>
                        <option value="enhance">Enhance Details</option>
                        <option value="both">Upscale + Enhance</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-text-muted">Negative Prompt</label>
                      <input
                        type="text"
                        placeholder="Things to avoid in the image..."
                        className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-fire focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tips */}
            <div className="bg-fire/5 border border-fire/20 rounded-2xl p-4">
              <h4 className="text-sm font-medium text-fire mb-2">
                Tips from Guardian Draconia
              </h4>
              <ul className="text-xs text-text-secondary space-y-2">
                <li>• Be specific about lighting, mood, and atmosphere</li>
                <li>• Mention art styles or artists for reference</li>
                <li>• Include details about colors and textures</li>
                <li>• Describe the perspective and composition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
