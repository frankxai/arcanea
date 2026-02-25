"use client";

import { useEffect } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cosmic-void flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-cosmic-mesh" />

      <div className="relative max-w-2xl w-full text-center">
        {/* Error icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-arcane-fire/20 rounded-full" />
            <div className="relative bg-arcane-fire/10 p-6 rounded-full border border-arcane-fire/30">
              <Icons.AlertTriangle className="w-16 h-16 text-arcane-fire" />
            </div>
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-fluid-4xl font-display text-white mb-4">
          Something Went Wrong
        </h1>

        <p className="text-text-secondary font-body text-lg mb-8 max-w-lg mx-auto">
          The Guardian spirits encountered an unexpected disturbance. They are
          working to restore balance.
        </p>

        {/* Error details (development) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mb-8 p-6 glass rounded-xl text-left">
            <p className="text-xs text-text-muted font-mono mb-2">
              Error Details:
            </p>
            <p className="text-sm text-arcane-fire font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-text-disabled font-mono mt-3">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="fire" size="lg" className="group">
            <Icons.RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Icons.Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <div className="mt-12 text-text-muted text-sm font-body">
          <p className="mb-2">If the problem persists, try:</p>
          <ul className="space-y-1">
            <li>Refreshing your browser</li>
            <li>Clearing your cache and cookies</li>
            <li>Checking your internet connection</li>
            <li>Contacting support if the issue continues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
