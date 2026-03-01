'use client';

import { useState, useCallback } from 'react';
import { PromptInput } from '@/components/imagine/PromptInput';
import { ImageCard } from '@/components/imagine/ImageCard';

interface GeneratedImage {
  id: string;
  data: string;
  mimeType: string;
  prompt: string;
  createdAt: string;
}

interface Generation {
  id: string;
  prompt: string;
  images: GeneratedImage[];
  createdAt: string;
}

export default function ImaginePage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, count: number) => {
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/imagine/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, count }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed');
      }

      const data = await res.json();

      const newImages: GeneratedImage[] = [];
      for (const result of data.results) {
        for (const img of result.images) {
          newImages.push({
            id: `${result.id}_${newImages.length}`,
            data: img.data,
            mimeType: img.mimeType,
            prompt: result.prompt,
            createdAt: result.createdAt,
          });
        }
      }

      const generation: Generation = {
        id: `gen_${Date.now()}`,
        prompt,
        images: newImages,
        createdAt: new Date().toISOString(),
      };

      setGenerations((prev) => [generation, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleAnimate = useCallback(async (imageId: string) => {
    setAnimatingIds((prev) => new Set(prev).add(imageId));

    // TODO: Integrate fal.ai or Runway for image-to-video
    // For now, simulate animation delay
    setTimeout(() => {
      setAnimatingIds((prev) => {
        const next = new Set(prev);
        next.delete(imageId);
        return next;
      });
      // TODO: Open video player with animated result
    }, 3000);
  }, []);

  const totalImages = generations.reduce((sum, g) => sum + g.images.length, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero header */}
      <div className="pt-16 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-cinzel)] font-bold bg-gradient-to-r from-[hsl(var(--gold-light))] via-[hsl(var(--gold-bright))] to-[hsl(var(--gold-medium))] bg-clip-text text-transparent">
          Imagine
        </h1>
        <p className="mt-3 text-lg text-[hsl(var(--text-muted))] font-[family-name:var(--font-crimson-pro)]">
          Describe your vision. Watch it materialize.
        </p>

        {totalImages > 0 && (
          <p className="mt-2 text-xs text-[hsl(var(--text-disabled))]">
            {totalImages} image{totalImages !== 1 ? 's' : ''} created this session
          </p>
        )}
      </div>

      {/* Prompt input */}
      <div className="px-6 mb-12">
        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
      </div>

      {/* Error display */}
      {error && (
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isGenerating && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-[hsl(var(--cosmic-surface))]/60 animate-pulse border border-[hsl(var(--cosmic-border))]/20 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[hsl(var(--gold-bright))]/30 border-t-[hsl(var(--gold-bright))] rounded-full animate-spin" />
                  <span className="text-xs text-[hsl(var(--text-muted))]">Imagining...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generations feed — infinite scroll of past generations */}
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {generations.map((gen) => (
          <div key={gen.id} className="space-y-4">
            {/* Generation header */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--cosmic-border-bright))]/30 to-transparent" />
              <span className="text-xs text-[hsl(var(--text-disabled))] uppercase tracking-wider font-[family-name:var(--font-cinzel)]">
                {new Date(gen.createdAt).toLocaleTimeString()}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--cosmic-border-bright))]/30 to-transparent" />
            </div>

            {/* Prompt badge */}
            <p className="text-sm text-[hsl(var(--text-secondary))] font-[family-name:var(--font-crimson-pro)] italic text-center">
              &ldquo;{gen.prompt}&rdquo;
            </p>

            {/* Image grid */}
            <div
              className={`grid gap-4 ${
                gen.images.length === 1
                  ? 'grid-cols-1 max-w-lg mx-auto'
                  : gen.images.length === 2
                    ? 'grid-cols-2 max-w-2xl mx-auto'
                    : 'grid-cols-2 md:grid-cols-4'
              }`}
            >
              {gen.images.map((img) => (
                <ImageCard
                  key={img.id}
                  id={img.id}
                  imageData={img.data}
                  mimeType={img.mimeType}
                  prompt={img.prompt}
                  onAnimate={handleAnimate}
                  isAnimating={animatingIds.has(img.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {generations.length === 0 && !isGenerating && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 opacity-20">◈</div>
          <p className="text-[hsl(var(--text-muted))] font-[family-name:var(--font-crimson-pro)] text-lg">
            Your imagination awaits
          </p>
          <p className="text-[hsl(var(--text-disabled))] text-sm mt-1">
            Enter a prompt above to begin creating
          </p>
        </div>
      )}
    </div>
  );
}
