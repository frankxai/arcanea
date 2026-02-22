import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      {/* Animated loader with cosmic glow */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse blur-2xl bg-crystal/30 rounded-full" />
        <Loader2 className="relative w-16 h-16 text-crystal animate-spin" />
      </div>

      {/* Loading text */}
      <p className="text-lg font-display text-text-secondary animate-pulse">
        Weaving cosmic threads...
      </p>

      {/* Loading bar */}
      <div className="mt-8 w-64 h-1 bg-cosmic-raised rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-shimmer"
          style={{
            backgroundImage: 'linear-gradient(90deg, #7fffd4, #8b5cf6, #78a6ff, #7fffd4)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
    </div>
  );
}
