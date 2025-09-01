import React from "react";
import { cn } from "./utils";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: number; // px
  className?: string;
};

export function Avatar({ src, alt, fallback, size = 40, className }: AvatarProps) {
  const dimension = { width: size, height: size };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-arcanean-aurora/20 text-arcanean-transcendent overflow-hidden",
        className
      )}
      style={dimension}
      aria-label="avatar"
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? "avatar"}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm font-medium">
          {fallback ? fallback.slice(0, 2).toUpperCase() : ""}
        </span>
      )}
    </div>
  );
}
