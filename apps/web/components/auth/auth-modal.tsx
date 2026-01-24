'use client';

import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, X, Sparkles, Github, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle, signInWithGithub } = useAuth();

  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTabChange = (newTab: 'login' | 'signup') => {
    setTab(newTab);
    resetForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    } else {
      handleClose();
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      setError('Please ensure your password meets all requirements.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: signUpError } = await signUp(email, password, username);

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    const { error } = await signInWithGithub();
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-cosmic-surface/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                  {/* Success state */}
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-atlantean-teal-aqua/20 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-atlantean-teal-aqua" />
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2">Check Your Email</h3>
                      <p className="text-text-secondary mb-6">
                        We've sent a confirmation link to {email}
                      </p>
                      <button
                        onClick={handleClose}
                        className="px-6 py-2 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold"
                      >
                        Got it
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-7 h-7 text-cosmic-deep" />
                        </div>
                        <Dialog.Title className="text-xl font-display font-bold">
                          {tab === 'login' ? 'Welcome Back' : 'Begin Your Journey'}
                        </Dialog.Title>
                      </div>

                      {/* Tabs */}
                      <div className="flex p-1 bg-white/5 rounded-xl mb-6">
                        <button
                          onClick={() => handleTabChange('login')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            tab === 'login'
                              ? 'bg-atlantean-teal-aqua text-cosmic-deep'
                              : 'text-text-secondary hover:text-white'
                          }`}
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => handleTabChange('signup')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            tab === 'signup'
                              ? 'bg-atlantean-teal-aqua text-cosmic-deep'
                              : 'text-text-secondary hover:text-white'
                          }`}
                        >
                          Create Account
                        </button>
                      </div>

                      {/* Error message */}
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
                          <p className="text-red-400 text-sm">{error}</p>
                        </div>
                      )}

                      {/* OAuth buttons */}
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={handleGoogleSignIn}
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/5 transition-colors disabled:opacity-50 text-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          </svg>
                          Google
                        </button>
                        <button
                          onClick={handleGithubSignIn}
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/5 transition-colors disabled:opacity-50 text-sm"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-text-muted text-xs">or continue with email</span>
                        <div className="flex-1 h-px bg-white/10" />
                      </div>

                      {/* Form */}
                      <AnimatePresence mode="wait">
                        {tab === 'login' ? (
                          <motion.form
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleLogin}
                            className="space-y-4"
                          >
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-atlantean-teal-aqua focus:outline-none text-sm"
                              />
                            </div>

                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-atlantean-teal-aqua focus:outline-none text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>

                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full py-2.5 rounded-xl bg-atlantean-teal-aqua text-cosmic-deep font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all disabled:opacity-50 text-sm"
                            >
                              {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                          </motion.form>
                        ) : (
                          <motion.form
                            key="signup"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleSignup}
                            className="space-y-4"
                          >
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                minLength={3}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-atlantean-teal-aqua focus:outline-none text-sm"
                              />
                            </div>

                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-atlantean-teal-aqua focus:outline-none text-sm"
                              />
                            </div>

                            <div>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Password"
                                  required
                                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-atlantean-teal-aqua focus:outline-none text-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              <div className="flex gap-3 mt-2 text-xs">
                                <span className={hasMinLength ? 'text-atlantean-teal-aqua' : 'text-text-muted'}>8+ chars</span>
                                <span className={hasUppercase ? 'text-atlantean-teal-aqua' : 'text-text-muted'}>Uppercase</span>
                                <span className={hasNumber ? 'text-atlantean-teal-aqua' : 'text-text-muted'}>Number</span>
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple text-cosmic-deep font-semibold hover:shadow-[0_0_20px_rgba(127,255,212,0.4)] transition-all disabled:opacity-50 text-sm"
                            >
                              {isLoading ? 'Creating...' : 'Create Account'}
                            </button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
