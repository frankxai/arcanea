'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Palette, BookOpen, GraduationCap, Info } from 'lucide-react';
import { UserNav } from '@/components/auth';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/luminors', label: 'Luminors', icon: Sparkles },
  { href: '/studio', label: 'Studio', icon: Palette },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/academy', label: 'Academy', icon: GraduationCap },
  { href: '/about', label: 'About', icon: Info },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
              {navLinks.map((link) => (
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
              ))}

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
            <div className="glass-strong border-b border-white/10 shadow-elevation-3">
              <div className="px-6 py-4 space-y-1 max-w-7xl mx-auto">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150',
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
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-crystal flex-shrink-0" />
                      )}
                    </Link>
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
