import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cosmic-void flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cosmic-mesh" />
      <div className="absolute inset-0 bg-cosmic-stars opacity-40" />

      <div className="relative text-center">
        {/* Animated crystal orb */}
        <div className="relative mb-10 flex justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-arcane-crystal/10 animate-ping" />
          <div className="absolute w-20 h-20 rounded-full bg-arcane-void/20 animate-pulse animation-delay-500" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-arcane-crystal/20 to-arcane-void/20 border border-arcane-crystal/30 flex items-center justify-center backdrop-blur-sm">
            <Icons.Sparkles
              className="w-8 h-8 text-arcane-crystal animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-fluid-2xl font-display text-white mb-3 animate-pulse">
          Manifesting Reality
        </h2>

        <p className="text-text-muted font-body mb-10">
          Weaving the cosmic threads...
        </p>

        {/* Loading bar */}
        <div className="max-w-xs mx-auto h-1.5 bg-cosmic-raised rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-arcane-crystal via-arcane-void to-arcane-fire rounded-full shimmer" />
        </div>
      </div>
    </div>
  );
}
