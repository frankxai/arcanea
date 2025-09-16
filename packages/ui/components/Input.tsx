"use client";
import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "cosmic" | "ethereal" | "luminor";
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", error = false, ...props }, ref) => {
    const base =
      "flex h-10 w-full rounded-md border border-[var(--border,#233049)] bg-[#0c1120] px-3 py-2 text-sm text-[var(--text,#e6eefc)] ring-offset-background placeholder:text-[color:#9bb1d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#78a6ff)] disabled:cursor-not-allowed disabled:opacity-50";
    const variants: Record<string, string> = {
      default: "",
      cosmic:
        "bg-[radial-gradient(1200px_600px_at_-20%_-40%,rgba(127,255,212,0.06),transparent)] border-[color:var(--border,#233049)]",
      ethereal:
        "bg-white/5 border-white/10 backdrop-blur-sm focus-visible:ring-white/30",
      luminor:
        "bg-[linear-gradient(180deg,rgba(120,166,255,0.06),rgba(127,255,212,0.06))] border-[color:var(--accent,#78a6ff)]/30",
    };
    const err = error ? "border-red-500 focus-visible:ring-red-500/50" : "";
    return (
      <input
        type={type}
        className={cn(base, variants[variant], err, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

