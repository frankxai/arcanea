"use client";

export function NewsletterForm() {
  return (
    <form
      aria-label="Newsletter signup"
      className="flex flex-col sm:flex-row gap-3 max-w-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Your email address"
        className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 text-text-primary placeholder-text-muted font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all"
        aria-required="true"
      />
      <button
        type="submit"
        className="shrink-0 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm shadow-glow-brand hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(139,92,246,0.45)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/70 focus:ring-offset-2 focus:ring-offset-cosmic-void"
      >
        Subscribe
      </button>
    </form>
  );
}
