"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const labVersions = [
  {
    id: "v1",
    label: "Foundation",
    desc: "Colors & Typography",
    icon: Icons.Palette,
    color: "text-arcane-crystal",
  },
  {
    id: "v2",
    label: "Components",
    desc: "Buttons, Badges, Cards",
    icon: Icons.Component,
    color: "text-arcane-water",
  },
  {
    id: "v3",
    label: "Motion",
    desc: "Animations & Transitions",
    icon: Icons.Sparkles,
    color: "text-arcane-void-bright",
  },
  {
    id: "v4",
    label: "Effects",
    desc: "Glass & Glow Systems",
    icon: Icons.Layers,
    color: "text-arcane-fire-bright",
  },
  {
    id: "v5",
    label: "Layout",
    desc: "Grid & Spatial System",
    icon: Icons.Layout,
    color: "text-arcane-earth-bright",
  },
  {
    id: "v6",
    label: "Guardians",
    desc: "Elemental Design Language",
    icon: Icons.Shield,
    color: "text-arcane-gold",
  },
  {
    id: "v7",
    label: "Responsive",
    desc: "Accessibility & Mobile",
    icon: Icons.Smartphone,
    color: "text-arcane-crystal",
  },
  {
    id: "v8",
    label: "3D & Spatial",
    desc: "Three.js & XR Patterns",
    icon: Icons.Box,
    color: "text-arcane-crystal",
  },
  {
    id: "v9",
    label: "AI Patterns",
    desc: "Integration & Intelligence",
    icon: Icons.Brain,
    color: "text-arcane-void-bright",
  },
  {
    id: "v10",
    label: "Future Vision",
    desc: "Roadmap & Evolution",
    icon: Icons.Telescope,
    color: "text-arcane-gold",
  },
];

export default function DesignLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHub = pathname === "/design-lab";
  const currentIdx = labVersions.findIndex((v) =>
    pathname.includes(`/design-lab/${v.id}`),
  );
  const current = currentIdx >= 0 ? labVersions[currentIdx] : null;
  const prev = currentIdx > 0 ? labVersions[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < labVersions.length - 1
      ? labVersions[currentIdx + 1]
      : null;
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = useCallback(() => setNavOpen(false), []);

  // Close dropdown on route change
  useEffect(() => {
    closeNav();
  }, [pathname, closeNav]);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!navOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [navOpen, closeNav]);

  // Hub page — zero chrome, full immersion
  if (isHub) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Floating navigation pill */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <nav className="flex items-center justify-between h-12 px-3 sm:px-4 rounded-2xl glass border border-white/[0.08] pointer-events-auto shadow-lg shadow-black/20">
            {/* Left: Back to hub */}
            <Link
              href="/design-lab"
              className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors group shrink-0"
            >
              <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <Icons.Gem className="w-4 h-4 text-arcane-crystal" />
              <span className="text-sm font-sans hidden sm:inline">
                Design Lab
              </span>
            </Link>

            {/* Center: Version switcher */}
            <div className="relative flex items-center gap-3">
              {/* Progress dots */}
              <div className="hidden md:flex items-center gap-1">
                {labVersions.map((v, i) => (
                  <Link
                    key={v.id}
                    href={`/design-lab/${v.id}`}
                    className="group p-0.5"
                    title={`${v.label} (${v.id})`}
                  >
                    <div
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === currentIdx
                          ? "w-5 h-1.5 bg-arcane-crystal"
                          : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40",
                      )}
                    />
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setNavOpen(!navOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
                aria-expanded={navOpen}
                aria-haspopup="true"
                aria-label="Version navigation"
              >
                {current && (
                  <>
                    <current.icon className={cn("w-4 h-4", current.color)} />
                    <span className="text-sm font-sans font-medium text-white hidden sm:inline">
                      {current.label}
                    </span>
                    <span className="text-sm font-sans font-medium text-white sm:hidden">
                      {current.id.toUpperCase()}
                    </span>
                    <Badge
                      variant="void"
                      className="text-[10px] px-1.5 py-0 font-mono hidden sm:inline-flex"
                    >
                      {currentIdx + 1}/{labVersions.length}
                    </Badge>
                    <Icons.ChevronDown
                      className={cn(
                        "w-3 h-3 text-text-muted transition-transform duration-200",
                        navOpen && "rotate-180",
                      )}
                    />
                  </>
                )}
              </button>
            </div>

            {/* Right: Prev / Next */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              {prev ? (
                <Link
                  href={`/design-lab/${prev.id}`}
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  title={`← ${prev.label}`}
                  aria-label={`Previous: ${prev.label}`}
                >
                  <Icons.ArrowLeft className="w-4 h-4" />
                </Link>
              ) : (
                <div className="w-8" />
              )}
              {next ? (
                <Link
                  href={`/design-lab/${next.id}`}
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  title={`${next.label} →`}
                  aria-label={`Next: ${next.label}`}
                >
                  <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="w-8" />
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Dropdown + backdrop */}
      <AnimatePresence>
        {navOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNav}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />

            {/* Dropdown — full width on mobile, centered on desktop */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[4.5rem] inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-80 z-50 glass-strong rounded-2xl border border-white/[0.08] p-2 shadow-2xl shadow-black/40"
              role="menu"
              aria-label="Version navigation menu"
            >
              {labVersions.map((v, i) => {
                const Icon = v.icon;
                const isActive = i === currentIdx;
                return (
                  <Link
                    key={v.id}
                    href={`/design-lab/${v.id}`}
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150",
                      isActive
                        ? "bg-arcane-crystal/10 text-white"
                        : "text-text-secondary hover:text-white hover:bg-white/5",
                    )}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono shrink-0",
                        isActive
                          ? "bg-arcane-crystal/20 text-arcane-crystal"
                          : "bg-white/5 text-text-muted",
                      )}
                    >
                      {i + 1}
                    </div>
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? v.color : "text-text-muted",
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{v.label}</span>
                      </div>
                      <div className="text-xs text-text-muted truncate">
                        {v.desc}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-arcane-crystal shrink-0" />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full-bleed content */}
      <main className="relative">{children}</main>
    </>
  );
}
