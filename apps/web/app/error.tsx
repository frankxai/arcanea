'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      {/* Error Icon with cosmic glow */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 animate-pulse blur-xl bg-draconic-crimson/30 rounded-full" />
        <div className="relative bg-gradient-to-br from-draconic-crimson/20 to-draconic-gold/20 p-6 rounded-full border border-draconic-gold/30">
          <AlertCircle className="w-16 h-16 text-draconic-crimson" />
        </div>
      </div>

      {/* Error Message */}
      <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-atlantean-teal-aqua mb-4 text-center">
        Something Went Wrong
      </h1>

      <p className="text-neutral-400 text-center max-w-md mb-2">
        The cosmic energies have been disrupted. Our guardians are investigating the disturbance.
      </p>

      {/* Technical Details (only in development) */}
      {process.env.NODE_ENV === 'development' && error.message && (
        <div className="mt-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg max-w-2xl w-full">
          <p className="font-jetbrains-mono text-xs text-neutral-500 mb-2">Error Details:</p>
          <p className="font-jetbrains-mono text-sm text-red-400 break-all">
            {error.message}
          </p>
          {error.digest && (
            <p className="font-jetbrains-mono text-xs text-neutral-600 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={reset}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-atlantean-teal-aqua/20 to-atlantean-teal-deep/20 hover:from-atlantean-teal-aqua/30 hover:to-atlantean-teal-deep/30 border border-atlantean-teal-aqua/50 rounded-lg text-atlantean-teal-aqua font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(127,255,212,0.3)]"
        >
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-blue/20 to-cosmic-purple/20 hover:from-cosmic-blue/30 hover:to-cosmic-purple/30 border border-cosmic-blue/50 rounded-lg text-cosmic-blue font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(120,166,255,0.3)]"
        >
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>

      {/* Helpful Suggestions */}
      <div className="mt-12 max-w-md text-center">
        <p className="text-sm text-neutral-500 mb-3">You might want to try:</p>
        <ul className="text-sm text-neutral-400 space-y-2">
          <li>Refreshing the page</li>
          <li>Checking your internet connection</li>
          <li>Clearing your browser cache</li>
          <li>Returning to the homepage and navigating here again</li>
        </ul>
      </div>
    </div>
  );
}
