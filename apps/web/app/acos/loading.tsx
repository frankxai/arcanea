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
        <div className="mb-16">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-16 sm:px-12 sm:py-20">
            <div className="animate-pulse space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-28 h-8" />
              <div className="h-14 bg-white/10 rounded-lg w-3/4 mx-auto" />
              <div className="h-6 bg-white/10 rounded-lg w-1/2 mx-auto" />
              <div className="h-24 bg-white/10 rounded-lg w-full mt-8" />
            </div>
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
              <div className="h-12 w-12 bg-white/10 rounded-xl mb-4" />
              <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/10 rounded w-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
