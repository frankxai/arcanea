"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons - using lucide-react (to be replaced with Arcanea icon system when available)
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Loading component
function LoadingSpinner({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>{text}</span>
    </div>
  );
}

// Error message component
function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-fire text-sm font-body"
    >
      <AlertCircle className="w-4 h-4" />
      {message}
    </motion.p>
  );
}

// Input field component with consistent styling
function InputField({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  showToggle,
  toggleVisible,
  onToggle,
  required,
}: {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  showToggle?: boolean;
  toggleVisible?: boolean;
  onToggle?: () => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-body text-sm text-text-secondary mb-2"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-cosmic-surface/50 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 outline-none transition-all font-body text-text-primary placeholder:text-text-muted"
        />
        {showToggle && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {toggleVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Social login button
function SocialButton({
  provider,
  onClick,
  disabled,
}: {
  provider: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const isGoogle = provider === "Google";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-white/10 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all font-body text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGoogle ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )}
      {provider}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement Supabase auth
      // For now, simulate login
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Basic validation
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }

      // Store auth state
      localStorage.setItem("arcanea_auth", JSON.stringify({ email }));

      // Redirect to chat or dashboard
      router.push("/chat");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Implement social auth
      router.push("/chat");
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.1),transparent_55%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-crystal/20 backdrop-blur-sm border border-crystal/30">
              <Sparkles className="w-10 h-10 text-crystal" />
            </div>
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
              Welcome Back
            </span>
          </div>

          <h1 className="text-fluid-3xl font-display font-bold text-text-primary mb-3">
            Enter Your Realm
          </h1>
          <p className="text-text-secondary font-body">
            Continue your creative journey
          </p>
        </div>

        {/* Login form */}
        <div className="glass rounded-3xl p-8 sm:p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email field */}
            <InputField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="creator@arcanea.app"
              icon={Mail}
              required
            />

            {/* Password field */}
            <InputField
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={Lock}
              showToggle
              toggleVisible={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              required
            />

            {/* Error message */}
            {error && <ErrorMessage message={error} />}

            {/* Forgot password */}
            <div className="text-right -mt-2">
              <Link
                href="/auth/forgot-password"
                className="font-body text-sm text-brand-primary hover:text-crystal transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-crystal text-white font-semibold text-lg shadow-glow-brand hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <LoadingSpinner text="Authenticating..." />
              ) : (
                <>
                  <span>Enter</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-cosmic-deep font-body text-sm text-text-muted">
                or continue with
              </span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-4">
            <SocialButton
              provider="Google"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
            />
            <SocialButton
              provider="GitHub"
              onClick={() => handleSocialLogin("GitHub")}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center mt-8 font-body text-text-secondary">
          New to Arcanea?{" "}
          <Link
            href="/auth/signup"
            className="text-brand-primary hover:text-crystal transition-colors font-semibold"
          >
            Begin your journey
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
