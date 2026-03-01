'use client';

import { useState, useCallback, useEffect } from 'react';
import { PromptInput } from '@/components/imagine/PromptInput';
import { ImageCard } from '@/components/imagine/ImageCard';

interface GeneratedImage {
  id: string;
  data?: string;
  url?: string;
  mimeType: string;
  prompt: string;
  createdAt: string;
  videoUrl?: string;
}

interface Generation {
  id: string;
  prompt: string;
  images: GeneratedImage[];
  createdAt: string;
}

interface GalleryImage {
  url: string;
  pathname: string;
  uploadedAt: string;
  size: number;
}

type TabId = 'create' | 'gallery';

export default function ImaginePage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('create');
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  // Load gallery on tab switch
  useEffect(() => {
    if (activeTab === 'gallery') {
      loadGallery();
    }
  }, [activeTab]);

  const loadGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch('/api/imagine/gallery');
      if (res.ok) {
        const data = await res.json();
        setGallery(data.images || []);
      }
    } catch {
      // Gallery is optional
    } finally {
      setGalleryLoading(false);
    }
  };

  // Auto-save images to Vercel Blob
  const saveImage = useCallback(async (imageData: string, mimeType: string, prompt: string) => {
    try {
      const res = await fetch('/api/imagine/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData, mimeType, prompt }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.url as string | null;
      }
    } catch {
      // Save is best-effort
    }
    return null;
  }, []);

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
          const imageId = `${result.id}_${newImages.length}`;
          newImages.push({
            id: imageId,
            data: img.data,
            mimeType: img.mimeType,
            prompt: result.prompt,
            createdAt: result.createdAt,
          });

          // Auto-save to Vercel Blob in background
          saveImage(img.data, img.mimeType, result.prompt).then((url) => {
            if (url) {
              setGenerations((prev) =>
                prev.map((gen) => ({
                  ...gen,
                  images: gen.images.map((i) =>
                    i.id === imageId ? { ...i, url } : i
                  ),
                }))
              );
            }
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
  }, [saveImage]);

  const handleAnimate = useCallback(async (imageId: string, imageUrl: string) => {
    setAnimatingIds((prev) => new Set(prev).add(imageId));
    setError(null);

    try {
      // For base64 images, we need to save first to get a URL
      let urlForAnimation = imageUrl;

      if (imageUrl.startsWith('data:')) {
        // Extract base64 data and save to get a public URL
        const [header, data] = imageUrl.split(',');
        const mimeType = header.match(/data:(.*?);/)?.[1] || 'image/png';
        const savedUrl = await saveImage(data, mimeType, 'animation source');
        if (savedUrl) {
          urlForAnimation = savedUrl;
        } else {
          throw new Error('Cannot animate — image must be saved to cloud first. Configure BLOB_READ_WRITE_TOKEN.');
        }
      }

      const res = await fetch('/api/imagine/animate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: urlForAnimation }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Animation failed');
      }

      const data = await res.json();

      // Update the image with video URL
      setGenerations((prev) =>
        prev.map((gen) => ({
          ...gen,
          images: gen.images.map((img) =>
            img.id === imageId ? { ...img, videoUrl: data.videoUrl } : img
          ),
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Animation failed');
    } finally {
      setAnimatingIds((prev) => {
        const next = new Set(prev);
        next.delete(imageId);
        return next;
      });
    }
  }, [saveImage]);

  const totalImages = generations.reduce((sum, g) => sum + g.images.length, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero header */}
      <div className="pt-16 pb-8 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-cinzel)] font-bold bg-gradient-to-r from-[hsl(var(--gold-light))] via-[hsl(var(--gold-bright))] to-[hsl(var(--gold-medium))] bg-clip-text text-transparent">
          Imagine
        </h1>
        <p className="mt-3 text-lg text-[hsl(var(--text-muted))] font-[family-name:var(--font-crimson-pro)]">
          Describe your vision. Watch it materialize.
        </p>

        {/* Stats */}
        {totalImages > 0 && (
          <p className="mt-2 text-xs text-[hsl(var(--text-disabled))]">
            {totalImages} image{totalImages !== 1 ? 's' : ''} created this session
          </p>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex justify-center gap-1 mb-8 px-6">
        {([
          { id: 'create' as TabId, label: 'Create' },
          { id: 'gallery' as TabId, label: 'Gallery' },
        ]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[hsl(var(--gold-bright))]/15 text-[hsl(var(--gold-bright))] border border-[hsl(var(--gold-bright))]/30'
                : 'text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--cosmic-raised))]/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Create tab */}
      {activeTab === 'create' && (
        <>
          {/* Prompt input */}
          <div className="px-6 mb-12">
            <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Error display */}
          {error && (
            <div className="max-w-3xl mx-auto px-6 mb-8">
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300 ml-3"
                >
                  ×
                </button>
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

          {/* Generations feed */}
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
                      imageUrl={img.url}
                      mimeType={img.mimeType}
                      prompt={img.prompt}
                      onAnimate={handleAnimate}
                      isAnimating={animatingIds.has(img.id)}
                      videoUrl={img.videoUrl}
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
        </>
      )}

      {/* Gallery tab */}
      {activeTab === 'gallery' && (
        <div className="max-w-5xl mx-auto px-6">
          {galleryLoading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-[hsl(var(--gold-bright))]/30 border-t-[hsl(var(--gold-bright))] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[hsl(var(--text-muted))]">Loading gallery...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">◈</div>
              <p className="text-[hsl(var(--text-muted))] font-[family-name:var(--font-crimson-pro)] text-lg">
                No saved images yet
              </p>
              <p className="text-[hsl(var(--text-disabled))] text-sm mt-1">
                {gallery.length === 0 ? 'Create images and they\'ll appear here' : 'Configure BLOB_READ_WRITE_TOKEN for persistence'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.pathname}
                  className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--gold-bright)/0.15)]"
                >
                  <img
                    src={img.url}
                    alt="Generated image"
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--cosmic-void))]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs text-[hsl(var(--text-disabled))]">
                        {new Date(img.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
