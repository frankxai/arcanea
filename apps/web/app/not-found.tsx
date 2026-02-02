import { Sparkles, Home, Search, Map } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      {/* 404 Icon with cosmic effect */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 animate-pulse blur-2xl bg-creation-prism-1/30 rounded-full" />
        <div className="relative">
          <Sparkles className="w-24 h-24 text-creation-prism-1 animate-float" />
        </div>
      </div>

      {/* 404 Message */}
      <div className="text-center mb-8">
        <h1 className="text-8xl md:text-9xl font-cinzel font-bold bg-gradient-to-r from-creation-prism-1 via-creation-prism-2 to-creation-prism-3 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-atlantean-teal-aqua mb-4">
          Realm Not Found
        </h2>
        <p className="text-neutral-400 max-w-md">
          This realm exists beyond the known boundaries of Arcanea. Perhaps it was never created, or it has dissolved back into the Void.
        </p>
      </div>

      {/* Navigation Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link
          href="/"
          className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-atlantean-teal-aqua/10 to-atlantean-teal-deep/10 hover:from-atlantean-teal-aqua/20 hover:to-atlantean-teal-deep/20 border border-atlantean-teal-aqua/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,255,212,0.2)]"
        >
          <div className="p-3 bg-atlantean-teal-aqua/20 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Home className="w-6 h-6 text-atlantean-teal-aqua" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-atlantean-teal-aqua mb-1">Home</h3>
            <p className="text-xs text-neutral-500">Return to the beginning</p>
          </div>
        </Link>

        <Link
          href="/discover"
          className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-cosmic-blue/10 to-cosmic-purple/10 hover:from-cosmic-blue/20 hover:to-cosmic-purple/20 border border-cosmic-blue/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(120,166,255,0.2)]"
        >
          <div className="p-3 bg-cosmic-blue/20 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Search className="w-6 h-6 text-cosmic-blue" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-cosmic-blue mb-1">Discover</h3>
            <p className="text-xs text-neutral-500">Explore creations</p>
          </div>
        </Link>

        <Link
          href="/academy"
          className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-draconic-gold/10 to-creation-gold/10 hover:from-draconic-gold/20 hover:to-creation-gold/20 border border-draconic-gold/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
        >
          <div className="p-3 bg-draconic-gold/20 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Map className="w-6 h-6 text-draconic-gold" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-draconic-gold mb-1">Academy</h3>
            <p className="text-xs text-neutral-500">Begin your journey</p>
          </div>
        </Link>
      </div>

      {/* Additional Help */}
      <div className="mt-12 text-center max-w-md">
        <p className="text-sm text-neutral-500 mb-4">
          If you believe this realm should exist, the cosmic threads may be tangled.
        </p>
        <Link
          href="/status"
          className="text-sm text-atlantean-teal-aqua hover:underline"
        >
          Check system status
        </Link>
      </div>
    </div>
  );
}
