'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, Github, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-crystal/20 flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
            <Check className="w-10 h-10 text-crystal" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-4">Check Your Email</h1>
          <p className="text-text-secondary mb-8">
            We've sent a confirmation link to <span className="text-white">{email}</span>.
            Click the link to activate your account and begin your journey.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.02] transition-all"
          >
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none bg-mesh-gradient">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crystal/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Card */}
        <div className="liquid-glass rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-crystal flex items-center justify-center mx-auto mb-4 shadow-glow-brand">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">Begin Your Journey</h1>
            <p className="text-text-secondary">Create your Arcanea account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleGithubSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-text-muted text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  required
                  minLength={3}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-crystal focus:outline-none focus:ring-2 focus:ring-crystal/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-crystal focus:outline-none focus:ring-2 focus:ring-crystal/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-crystal focus:outline-none focus:ring-2 focus:ring-crystal/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password requirements */}
              <div className="mt-3 space-y-1">
                <div className={`flex items-center gap-2 text-xs ${hasMinLength ? 'text-crystal' : 'text-text-muted'}`}>
                  <Check className={`w-3 h-3 ${hasMinLength ? '' : 'opacity-50'}`} />
                  At least 8 characters
                </div>
                <div className={`flex items-center gap-2 text-xs ${hasUppercase ? 'text-crystal' : 'text-text-muted'}`}>
                  <Check className={`w-3 h-3 ${hasUppercase ? '' : 'opacity-50'}`} />
                  One uppercase letter
                </div>
                <div className={`flex items-center gap-2 text-xs ${hasNumber ? 'text-crystal' : 'text-text-muted'}`}>
                  <Check className={`w-3 h-3 ${hasNumber ? '' : 'opacity-50'}`} />
                  One number
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-crystal focus:ring-crystal/20"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                I agree to the{' '}
                <Link href="/terms" className="text-crystal hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-crystal hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-glow-brand hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-text-secondary mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-crystal hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
