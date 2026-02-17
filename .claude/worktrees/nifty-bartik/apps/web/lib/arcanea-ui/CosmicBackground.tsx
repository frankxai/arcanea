"use client";
import React from "react";
import { cn } from "./utils";

type Props = {
  className?: string;
};

export function CosmicBackground({ className }: Props) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* Aurora blobs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[60vh] w-[120vw] rounded-full opacity-40 blur-3xl"
           style={{
             background:
               "radial-gradient(40% 60% at 40% 40%, rgba(127,255,212,0.15), transparent 70%)," +
               "radial-gradient(50% 70% at 60% 50%, rgba(120,166,255,0.15), transparent 70%)",
           }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.25]"
           style={{
             backgroundImage:
               "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
             backgroundSize: "24px 24px",
           }}
      />

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQI12NkYGBgAAAABQAB9WVqVQAAAABJRU5ErkJggg==')",
        backgroundRepeat: "repeat"
      }} />
    </div>
  );
}
