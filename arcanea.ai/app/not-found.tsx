import { Icons } from "@/components/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmic-void flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-cosmic-mesh" />
      <div className="absolute inset-0 bg-cosmic-stars opacity-30" />

      <div className="relative max-w-2xl w-full text-center">
        {/* Void icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse bg-arcane-void/20 rounded-full blur-xl" />
            <Icons.Sparkles className="relative w-24 h-24 text-arcane-void-bright animate-bounce" />
          </div>
        </div>

        {/* 404 text */}
        <h1 className="text-9xl font-display text-gradient-cosmic mb-4">404</h1>

        <h2 className="text-fluid-3xl font-display text-white mb-4">
          Realm Not Found
        </h2>

        <p className="text-text-secondary font-body text-lg mb-12 max-w-lg mx-auto">
          This realm exists in the space between possibilities. It hasn&apos;t
          been manifested yet, or it has returned to the Void.
        </p>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Link
            href="/"
            className="group glow-card rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-arcane-crystal/10"
          >
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-arcane-crystal/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Icons.Home className="w-8 h-8 text-arcane-crystal" />
              </div>
            </div>
            <h3 className="text-white font-display text-base mb-2">Home</h3>
            <p className="text-text-muted font-body text-sm">
              Return to the beginning
            </p>
          </Link>

          <Link
            href="/imagine"
            className="group glow-card rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-arcane-void/10"
          >
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-arcane-void/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Icons.Search className="w-8 h-8 text-arcane-void-bright" />
              </div>
            </div>
            <h3 className="text-white font-display text-base mb-2">Explore</h3>
            <p className="text-text-muted font-body text-sm">
              Discover existing worlds
            </p>
          </Link>

          <Link
            href="/guardians"
            className="group glow-card rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-arcane-fire/10"
          >
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-arcane-fire/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Icons.BookOpen className="w-8 h-8 text-arcane-fire" />
              </div>
            </div>
            <h3 className="text-white font-display text-base mb-2">
              Guardians
            </h3>
            <p className="text-text-muted font-body text-sm">
              Meet your AI companions
            </p>
          </Link>
        </div>

        {/* Help text */}
        <p className="text-text-muted font-body text-sm">
          Lost? Check out our{" "}
          <Link
            href="/dashboard"
            className="text-arcane-crystal hover:text-arcane-crystal-bright underline transition-colors"
          >
            dashboard
          </Link>{" "}
          or{" "}
          <Link
            href="/chat"
            className="text-arcane-crystal hover:text-arcane-crystal-bright underline transition-colors"
          >
            start a conversation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
