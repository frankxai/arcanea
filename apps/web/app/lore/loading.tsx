export default function Loading() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      {/* Hero Skeleton */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-40 h-8 mb-8" />

          {/* Title */}
          <div className="h-16 md:h-20 bg-white/10 rounded-lg w-3/4 mx-auto mb-6" />

          {/* Subtitle */}
          <div className="h-8 bg-white/10 rounded-lg w-2/3 mx-auto mb-8" />

          {/* Quote */}
          <div className="h-12 bg-white/10 rounded-lg w-1/2 mx-auto mb-12" />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-10 bg-white/10 rounded w-12 mx-auto" />
                <div className="h-4 bg-white/10 rounded w-20 mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
