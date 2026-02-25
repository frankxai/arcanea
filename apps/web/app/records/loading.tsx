export default function Loading() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <section className="mb-12">
          <div className="relative liquid-glass rounded-3xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
            <div className="animate-pulse space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-28 h-8" />
              <div className="h-12 bg-white/10 rounded-lg w-3/4" />
              <div className="h-6 bg-white/10 rounded-lg w-1/2" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center">
                    <div className="h-8 bg-white/10 rounded w-12 mx-auto mb-1" />
                    <div className="h-3 bg-white/10 rounded w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Skeleton */}
        <section className="mb-8 grid sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-xl p-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-white/10 rounded w-24 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-32" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Toolbar Skeleton */}
        <section className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-9 w-16 bg-white/10 rounded-lg" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-48 bg-white/10 rounded-xl" />
            <div className="h-9 w-9 bg-white/10 rounded-lg" />
            <div className="h-9 w-16 bg-white/10 rounded-lg" />
          </div>
        </section>

        {/* Records Grid Skeleton */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => (
            <article
              key={i}
              className="glass rounded-xl overflow-hidden animate-pulse"
            >
              <div className="flex items-start gap-4 p-5">
                <div className="w-12 h-12 bg-white/10 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 bg-white/10 rounded w-16" />
                    <div className="h-5 bg-white/10 rounded w-16" />
                  </div>
                  <div className="flex gap-3">
                    <div className="h-3 bg-white/10 rounded w-20" />
                    <div className="h-3 bg-white/10 rounded w-12" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
