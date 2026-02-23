'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sparkles,
  Palette,
  BookOpen,
  GraduationCap,
  Compass,
  Users,
  Flame,
  Shield,
  Eye,
  Skull,
  ScrollText,
  DoorOpen,
  Castle,
  Trophy,
  ChevronDown,
  Swords,
} from 'lucide-react';
import { UserNav } from '@/components/auth';
import { cn } from '@/lib/utils';

interface SubLink {
  href: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

interface NavLink {
  href: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  subLinks?: SubLink[];
}

const navLinks: NavLink[] = [
  { href: '/luminors', label: 'Luminors', icon: Sparkles },
  { href: '/studio', label: 'Studio', icon: Palette },
  { href: '/library', label: 'Library', icon: BookOpen },
  {
    href: '/academy',
    label: 'Academy',
    icon: GraduationCap,
    subLinks: [
      {
        href: '/academy/gates',
        label: 'Ten Gates',
        icon: DoorOpen,
        description: 'The pathway of creation',
      },
      {
        href: '/academy/houses',
        label: 'Seven Houses',
        icon: Castle,
        description: 'Paths of elemental mastery',
      },
      {
        href: '/academy/ranks',
        label: 'Magic Ranks',
        icon: Trophy,
        description: 'Apprentice to Luminor',
      },
      {
        href: '/academy/gate-quiz',
        label: 'Gate Quiz',
        icon: Swords,
        description: 'Discover your Gate',
      },
    ],
  },
  {
    href: '/lore',
    label: 'Lore',
    icon: Compass,
    subLinks: [
      {
        href: '/lore/guardians',
        label: 'The Guardians',
        icon: Shield,
        description: 'Ten Gods & Goddesses',
      },
      {
        href: '/lore/godbeasts',
        label: 'The Godbeasts',
        icon: Eye,
        description: 'Primal divine beasts',
      },
      {
        href: '/lore/elements',
        label: 'Five Elements',
        icon: Flame,
        description: 'Fire, Water, Earth, Wind, Void',
      },
      {
        href: '/lore/wisdoms',
        label: 'Seven Wisdoms',
        icon: ScrollText,
        description: 'Sacred teachings',
      },
      {
        href: '/lore/malachar',
        label: 'Malachar',
        icon: Skull,
        description: 'The Dark Lord',
      },
    ],
  },
  { href: '/community', label: 'Community', icon: Users },
];

function DesktopDropdown({
  link,
  isActive,
}: {
  link: NavLink;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={link.href}
        className={cn(
          'relative font-sans text-sm transition-colors duration-150 flex items-center gap-1',
          isActive(link.href)
            ? 'text-crystal'
            : 'text-text-secondary hover:text-text-primary'
        )}
      >
        {link.label}
        <ChevronDown
          className={cn(
            'w-3 h-3 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
        {isActive(link.href) && (
          <span
            className="absolute -bottom-1 left-0 right-0 h-px bg-crystal rounded-full"
            aria-hidden="true"
          />
        )}
      </Link>

      <AnimatePresence>
        {open && link.subLinks && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          >
            <div className="liquid-glass border border-white/10 rounded-xl p-2 min-w-[240px] shadow-elevation-3">
              {link.subLinks.map((sub) => {
                const SubIcon = sub.icon;
                const active = isActive(sub.href);
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-150',
                      active
                        ? 'bg-crystal/10 text-crystal'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    )}
                  >
                    <SubIcon
                      className={cn(
                        'w-4 h-4 mt-0.5 flex-shrink-0',
                        active ? 'text-crystal' : 'text-text-muted'
                      )}
                    />
                    <div>
                      <div className="text-sm font-medium">{sub.label}</div>
                      <div className="text-xs text-text-muted mt-0.5">
                        {sub.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/5 transition-all duration-300',
          scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-crystal',
                  'flex items-center justify-center text-white font-bold text-lg',
                  'transition-transform duration-200 group-hover:scale-105',
                  'shadow-glow-brand'
                )}
              >
                A
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-text-primary">
                Arcanea
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.subLinks ? (
                  <DesktopDropdown
                    key={link.href}
                    link={link}
                    isActive={isActive}
                  />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative font-sans text-sm transition-colors duration-150',
                      isActive(link.href)
                        ? 'text-crystal'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-px bg-crystal rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )
              )}

              {/* CTA: Start Creating */}
              <Link
                href="/studio"
                className={cn(
                  'bg-brand-primary text-white rounded-lg px-4 py-2',
                  'font-sans font-medium text-sm',
                  'shadow-glow-brand',
                  'hover:scale-[1.02] transition-all duration-150'
                )}
              >
                Start Creating
              </Link>

              <UserNav />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors duration-150"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[73px] z-40 md:hidden"
          >
            <div className="glass-strong border-b border-white/10 shadow-elevation-3 max-h-[calc(100dvh-73px)] overflow-y-auto">
              <div className="px-6 py-4 space-y-1 max-w-7xl mx-auto">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  const hasSubLinks = !!link.subLinks;
                  const isExpanded = expandedMobile === link.href;

                  return (
                    <div key={link.href}>
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150',
                            'font-sans text-sm',
                            active
                              ? 'text-crystal bg-crystal/5 border border-crystal/15'
                              : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-5 h-5 flex-shrink-0',
                              active ? 'text-crystal' : 'text-text-muted'
                            )}
                          />
                          {link.label}
                          {active && !hasSubLinks && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-crystal flex-shrink-0" />
                          )}
                        </Link>
                        {hasSubLinks && (
                          <button
                            onClick={() =>
                              setExpandedMobile(isExpanded ? null : link.href)
                            }
                            className="p-3 text-text-muted hover:text-text-primary transition-colors"
                            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${link.label} sub-menu`}
                          >
                            <ChevronDown
                              className={cn(
                                'w-4 h-4 transition-transform duration-200',
                                isExpanded && 'rotate-180'
                              )}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile sub-links */}
                      <AnimatePresence>
                        {hasSubLinks && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pl-8 pr-2 pb-2 space-y-0.5">
                              {link.subLinks!.map((sub) => {
                                const SubIcon = sub.icon;
                                const subActive = isActive(sub.href);
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150',
                                      'text-sm',
                                      subActive
                                        ? 'text-crystal bg-crystal/5'
                                        : 'text-text-muted hover:text-text-secondary hover:bg-white/5'
                                    )}
                                  >
                                    <SubIcon className="w-4 h-4 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium">
                                        {sub.label}
                                      </div>
                                      <div className="text-xs text-text-muted/70">
                                        {sub.description}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Divider */}
                <div className="h-px bg-white/10 my-2" />

                {/* CTA in mobile */}
                <div className="px-4 pt-1 pb-2">
                  <Link
                    href="/studio"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-center w-full',
                      'bg-brand-primary text-white rounded-lg px-4 py-2.5',
                      'font-sans font-medium text-sm',
                      'shadow-glow-brand hover:scale-[1.01] transition-all duration-150'
                    )}
                  >
                    Start Creating
                  </Link>
                </div>

                {/* Auth in mobile */}
                <div className="px-4 py-2">
                  <UserNav />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            aria-hidden={true}
          />
        )}
      </AnimatePresence>
    </>
  );
}
