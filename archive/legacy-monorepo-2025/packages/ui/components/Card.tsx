"use client";
import * as React from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = false, ...props }, ref) => {
    const Comp: any = hover ? motion.div : "div";
    const base = cn(
      "panel rounded-xl p-4",
      glow && "shadow-[0_0_24px_rgba(120,166,255,0.2)] border-[color:var(--accent,#78a6ff)]/40",
      className
    );
    return (
      <Comp
        ref={ref}
        className={base}
        {...(hover
          ? { whileHover: { scale: 1.02 }, transition: { duration: 0.15 } }
          : {})}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };

