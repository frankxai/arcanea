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
        <section className="mb-16">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="animate-pulse space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-40 h-8" />
              <div className="h-12 bg-white/10 rounded-lg w-3/4" />
              <div className="h-6 bg-white/10 rounded-lg w-1/2" />
              <div className="h-20 bg-white/10 rounded-lg w-full mt-8" />
            </div>
          </div>
        </section>

        {/* Tools Section Skeleton */}
        <section aria-labelledby="tools-heading">
          <div className="mb-8">
            <div className="h-4 bg-white/10 rounded w-48" />
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl" />
                  <div className="h-4 bg-white/10 rounded w-20" />
                </div>
                <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                <div className="h-4 bg-white/10 rounded w-full mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-white/10 rounded w-16" />
                  <div className="h-6 bg-white/10 rounded w-16" />
                  <div className="h-6 bg-white/10 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Elements Section Skeleton */}
        <section className="mt-16">
          <div className="glass rounded-2xl p-8">
            <div className="h-8 bg-white/10 rounded w-64 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-3" />
                  <div className="h-5 bg-white/10 rounded w-16 mx-auto" />
                  <div className="h-3 bg-white/10 rounded w-24 mx-auto mt-2" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
