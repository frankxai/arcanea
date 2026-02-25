"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      {/* Error Icon with cosmic glow */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 animate-pulse blur-xl bg-draconic-crimson/30 rounded-full" />
        <div className="relative bg-gradient-to-br from-draconic-crimson/20 to-draconic-gold/20 p-6 rounded-full border border-draconic-gold/30">
          <svg
            className="w-16 h-16 text-draconic-crimson"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-atlantean-teal-aqua mb-4 text-center">
        Something Went Wrong
      </h1>

      <p className="text-neutral-400 text-center max-w-md mb-2">
        The cosmic energies have been disrupted. Our guardians are investigating
        the disturbance.
      </p>

      {/* Technical Details (only in development) */}
      {process.env.NODE_ENV === "development" && error.message && (
        <div className="mt-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg max-w-2xl w-full">
          <p className="font-jetbrains-mono text-xs text-neutral-500 mb-2">
            Error Details:
          </p>
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
          <svg
            className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Try Again
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-blue/20 to-cosmic-purple/20 hover:from-cosmic-blue/30 hover:to-cosmic-purple/30 border border-cosmic-blue/50 rounded-lg text-cosmic-blue font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(120,166,255,0.3)]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
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
