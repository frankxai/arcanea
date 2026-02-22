'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Sparkles, BookOpen, Palette, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { AuthModal } from './auth-modal';

export function UserNav() {
  const { user, isLoading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const openLogin = () => {
    setAuthModalTab('login');
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthModalTab('signup');
    setShowAuthModal(true);
  };

  if (isLoading) {
    return (
      <div className="w-24 h-10 rounded-xl bg-white/5 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-3">
          <button
            onClick={openLogin}
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={openSignup}
            className="px-5 py-2.5 rounded-xl bg-crystal text-cosmic-deep text-sm font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all"
          >
            Get Started
          </button>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={authModalTab}
        />
      </>
    );
  }

  const userInitial = user.email?.[0].toUpperCase() || 'U';
  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Creator';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crystal to-brand-primary flex items-center justify-center text-cosmic-deep font-semibold text-sm">
            {userInitial}
          </div>
        )}
        <span className="text-sm font-medium hidden sm:block">{username}</span>
        <ChevronDown className="w-4 h-4 text-text-muted" />
      </Menu.Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-cosmic-surface border border-white/10 shadow-xl focus:outline-none overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={`flex items-center gap-3 px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-text-secondary'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Your Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/luminors"
                  className={`flex items-center gap-3 px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-text-secondary'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Your Luminors
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/studio"
                  className={`flex items-center gap-3 px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-text-secondary'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  Studio
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/library"
                  className={`flex items-center gap-3 px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-text-secondary'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Library
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={`flex items-center gap-3 px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-text-secondary'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              )}
            </Menu.Item>
          </div>

          {/* Sign out */}
          <div className="py-2 border-t border-white/10">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`flex items-center gap-3 px-4 py-2 text-sm w-full ${
                    active ? 'bg-white/5 text-red-400' : 'text-text-secondary'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
