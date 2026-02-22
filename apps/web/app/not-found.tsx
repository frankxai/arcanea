import { Sparkles, Home, Search, Map } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      {/* 404 Icon with cosmic effect */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 animate-breathe blur-2xl bg-brand-primary/30 rounded-full" />
        <div className="relative">
          <Sparkles className="w-24 h-24 text-brand-primary animate-float" />
        </div>
      </div>

      {/* 404 Message */}
      <div className="text-center mb-8">
        <h1 className="text-8xl md:text-9xl font-display font-bold text-gradient-brand mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-crystal mb-4">
          Realm Not Found
        </h2>
        <p className="text-text-secondary max-w-md">
          This realm exists beyond the known boundaries of Arcanea. Perhaps it was never created, or it has dissolved back into the Void.
        </p>
      </div>

      {/* Navigation Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link
          href="/"
          className="group glass rounded-xl p-6 flex flex-col items-center gap-3 hover-lift transition-all"
        >
          <div className="p-3 bg-crystal/10 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Home className="w-6 h-6 text-crystal" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-crystal mb-1">Home</h3>
            <p className="text-xs text-text-muted">Return to the beginning</p>
          </div>
        </Link>

        <Link
          href="/discover"
          className="group glass rounded-xl p-6 flex flex-col items-center gap-3 hover-lift transition-all"
        >
          <div className="p-3 bg-water/10 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Search className="w-6 h-6 text-water" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-water mb-1">Discover</h3>
            <p className="text-xs text-text-muted">Explore creations</p>
          </div>
        </Link>

        <Link
          href="/academy"
          className="group glass rounded-xl p-6 flex flex-col items-center gap-3 hover-lift transition-all"
        >
          <div className="p-3 bg-brand-gold/10 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Map className="w-6 h-6 text-brand-gold" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-brand-gold mb-1">Academy</h3>
            <p className="text-xs text-text-muted">Begin your journey</p>
          </div>
        </Link>
      </div>

      {/* Additional Help */}
      <div className="mt-12 text-center max-w-md">
        <p className="text-sm text-text-muted mb-4">
          If you believe this realm should exist, the cosmic threads may be tangled.
        </p>
        <Link
          href="/status"
          className="text-sm text-crystal hover:underline"
        >
          Check system status
        </Link>
      </div>
    </div>
  );
}
