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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
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
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="text-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              ✨
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-gold-bright via-atlantean-teal to-draconic-crimson bg-clip-text text-transparent">
              Arcanea
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/studio">Studio</NavLink>
            <NavLink href="/discover">Discover</NavLink>
            <NavLink href="/academies">Academies</NavLink>
            <NavLink href="/library">Library</NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </motion.nav>
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
      className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group"
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-atlantean-teal via-gold-bright to-draconic-crimson"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}
