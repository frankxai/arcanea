export default function Loading() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Skeleton */}
        <div className="mb-12">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="animate-pulse space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-32 h-8" />
              <div className="h-12 bg-white/10 rounded-lg w-3/4" />
              <div className="h-6 bg-white/10 rounded-lg w-1/2" />
            </div>
          </div>
        </div>

        {/* Game Modes Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-xl p-5 animate-pulse">
              <div className="h-10 w-10 bg-white/10 rounded-lg mb-3" />
              <div className="h-5 bg-white/10 rounded w-1/2 mb-2" />
              <div className="h-3 bg-white/10 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Opponents Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-5 animate-pulse">
              <div className="h-1 bg-white/10 rounded-full mb-4" />
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-white/10 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-5 bg-white/10 rounded w-24" />
                  <div className="h-3 bg-white/10 rounded w-16" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="h-10 bg-white/10 rounded-lg" />
                <div className="h-10 bg-white/10 rounded-lg" />
                <div className="h-10 bg-white/10 rounded-lg" />
              </div>
              <div className="h-12 bg-white/10 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Leaderboard Skeleton */}
        <div className="glass rounded-2xl p-6">
          <div className="h-6 bg-white/10 rounded w-40 mb-6" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3 border-b border-white/5"
            >
              <div className="h-6 w-6 bg-white/10 rounded-full" />
              <div className="h-4 bg-white/10 rounded w-32" />
              <div className="h-4 bg-white/10 rounded w-16 ml-auto" />
              <div className="h-4 bg-white/10 rounded w-12" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
