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
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      {/* Error Icon with cosmic glow */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 animate-pulse blur-xl bg-fire/30 rounded-full" />
        <div className="relative glass rounded-full p-6 border border-fire/30">
          <AlertCircle className="w-16 h-16 text-fire" />
        </div>
      </div>

      {/* Error Message */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-crystal mb-4 text-center">
        Something Went Wrong
      </h1>

      <p className="text-text-secondary text-center max-w-md mb-2">
        The cosmic energies have been disrupted. Our guardians are investigating the disturbance.
      </p>

      {/* Technical Details (only in development) */}
      {process.env.NODE_ENV === 'development' && error.message && (
        <div className="mt-4 p-4 glass-subtle rounded-lg max-w-2xl w-full border border-fire/20">
          <p className="font-mono text-xs text-text-muted mb-2">Error Details:</p>
          <p className="font-mono text-sm text-fire break-all">
            {error.message}
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-text-muted mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={reset}
          className="group flex items-center gap-2 px-6 py-3 glass rounded-xl text-crystal font-semibold hover:shadow-glow-md transition-all"
        >
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-water font-semibold hover:shadow-glow-md transition-all"
        >
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>

      {/* Helpful Suggestions */}
      <div className="mt-12 max-w-md text-center">
        <p className="text-sm text-text-muted mb-3">You might want to try:</p>
        <ul className="text-sm text-text-secondary space-y-2">
          <li>Refreshing the page</li>
          <li>Checking your internet connection</li>
          <li>Clearing your browser cache</li>
          <li>Returning to the homepage and navigating here again</li>
        </ul>
      </div>
    </div>
  );
}
