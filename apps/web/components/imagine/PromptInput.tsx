'use client';

import { useState, useRef, useCallback } from 'react';

interface PromptInputProps {
  onGenerate: (prompt: string, count: number) => void;
  isGenerating: boolean;
}

export function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState(2);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt.trim(), count);
  }, [prompt, count, isGenerating, onGenerate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        {/* Glow effect behind input */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[hsl(var(--gold-bright))]/20 via-[hsl(var(--atlantean-primary))]/15 to-[hsl(var(--gold-bright))]/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

        <div className="relative rounded-2xl border border-[hsl(var(--cosmic-border-bright))]/40 bg-[hsl(var(--cosmic-surface))]/80 backdrop-blur-xl overflow-hidden">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to see..."
            rows={3}
            className="w-full bg-transparent px-6 py-5 text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))] focus:outline-none resize-none font-[family-name:var(--font-crimson-pro)] text-lg"
          />

          <div className="flex items-center justify-between px-4 py-3 border-t border-[hsl(var(--cosmic-border))]/30">
            {/* Image count selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[hsl(var(--text-muted))] uppercase tracking-wider">Images</span>
              <div className="flex gap-1">
                {[1, 2, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      count === n
                        ? 'bg-[hsl(var(--gold-bright))]/20 text-[hsl(var(--gold-bright))] border border-[hsl(var(--gold-bright))]/40'
                        : 'text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--cosmic-raised))]/50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isGenerating}
              className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-[hsl(var(--gold-deep))] to-[hsl(var(--gold-bright))] text-[hsl(var(--cosmic-void))] hover:shadow-[0_0_20px_hsl(var(--gold-bright)/0.3)] active:scale-95"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[hsl(var(--cosmic-void))]/30 border-t-[hsl(var(--cosmic-void))] rounded-full animate-spin" />
                  Imagining...
                </span>
              ) : (
                'Imagine'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick suggestions */}
      {!prompt && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {[
            'A cosmic library floating in nebula clouds',
            'Crystal dragon emerging from volcanic glass',
            'Bioluminescent underwater city at night',
            'Ancient tree of knowledge with glowing runes',
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setPrompt(suggestion)}
              className="px-3 py-1.5 rounded-full text-xs text-[hsl(var(--text-muted))] border border-[hsl(var(--cosmic-border))]/30 hover:border-[hsl(var(--gold-bright))]/30 hover:text-[hsl(var(--gold-medium))] transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
