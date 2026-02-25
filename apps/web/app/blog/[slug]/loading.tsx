export default function Loading() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="animate-pulse space-y-4 mb-10">
          <div className="h-4 bg-white/10 rounded w-32" />
          <div className="h-12 bg-white/10 rounded w-3/4" />
          <div className="flex gap-4">
            <div className="h-4 bg-white/10 rounded w-24" />
            <div className="h-4 bg-white/10 rounded w-24" />
            <div className="h-4 bg-white/10 rounded w-24" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="glass rounded-2xl p-6 sm:p-10">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-32 bg-white/10 rounded w-full my-8" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-5/6" />
          </div>
        </div>
      </main>
    </div>
  );
}
