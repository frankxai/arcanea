'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AcademyBadge } from '@/components/ui/academy-badge';
import { type Academy } from '@/lib/theme-utils';

export interface NavigationProps {
  academy?: Academy;
  className?: string;
}

export function Navigation({ academy = 'default', className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled || isMobileMenuOpen
            ? 'glass shadow-lg border-b border-cosmic-border'
            : 'bg-transparent',
          className
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group z-50 relative focus:outline-none focus:ring-2 focus:ring-atlantean-teal rounded-lg p-1 -m-1" aria-label="Arcanea home">
              <motion.div
                className="text-2xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                aria-hidden="true"
              >
                ✨
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-gold-bright via-atlantean-teal to-draconic-crimson bg-clip-text text-transparent">
                Arcanea
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <NavLink href="/studio">Studio</NavLink>
              <NavLink href="/discover">Discover</NavLink>
              <NavLink href="/academies">Academies</NavLink>
              <NavLink href="/library">Library</NavLink>
            </nav>

            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {academy !== 'default' && (
                <AcademyBadge academy={academy} size="sm" />
              )}
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="glow" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-primary z-50 relative focus:outline-none focus:ring-2 focus:ring-atlantean-teal rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="space-y-1.5">
                <motion.span
                  animate={{ rotateZ: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                  className="block w-6 h-0.5 bg-current"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="block w-6 h-0.5 bg-current"
                />
                <motion.span
                  animate={{ rotateZ: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                  className="block w-6 h-0.5 bg-current"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" }
        }}
        className="fixed inset-0 z-40 md:hidden bg-cosmic-void/95 backdrop-blur-xl"
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
          <nav className="flex flex-col items-center gap-6 text-lg" aria-label="Main navigation">
            <MobileNavLink href="/studio" onClick={() => setIsMobileMenuOpen(false)}>Studio</MobileNavLink>
            <MobileNavLink href="/discover" onClick={() => setIsMobileMenuOpen(false)}>Discover</MobileNavLink>
            <MobileNavLink href="/academies" onClick={() => setIsMobileMenuOpen(false)}>Academies</MobileNavLink>
            <MobileNavLink href="/library" onClick={() => setIsMobileMenuOpen(false)}>Library</MobileNavLink>
          </nav>
          <div className="w-16 h-px bg-cosmic-border" aria-hidden="true" />
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button variant="ghost" className="w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
              Sign In
            </Button>
            <Button variant="glow" className="w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-2xl font-display font-medium text-text-secondary hover:text-text-primary hover:text-atlantean-teal transition-colors"
    >
      {children}
    </Link>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group focus:outline-none focus:ring-2 focus:ring-atlantean-teal rounded px-2 py-1 -mx-2 -my-1"
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-atlantean-teal via-gold-bright to-draconic-crimson"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
    </Link>
  );
}
