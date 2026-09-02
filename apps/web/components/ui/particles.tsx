"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  color?: "crystal" | "gold" | "brand" | "mixed";
}

const PARTICLE_COLORS: Record<string, string | string[]> = {
  crystal: "#7fffd4",
  gold: "#ffd700",
  brand: "#8b5cf6",
  mixed: ["#7fffd4", "#ffd700", "#8b5cf6", "#78a6ff"],
};

export function ParticlesBackground({
  className = "",
  particleCount = 50,
  color = "mixed",
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const colorArray = Array.isArray(PARTICLE_COLORS[color])
        ? (PARTICLE_COLORS[color] as string[])
        : [PARTICLE_COLORS[color] as string];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          color: colorArray[Math.floor(Math.random() * colorArray.length)],
        });
      }
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((other) => {
          if (particle.id === other.id) return;

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

// Simpler version using CSS for lighter weight
export function StarField({
  className = "",
  count = 100,
}: {
  className?: string;
  count?: number;
}) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (multiplier: number) => {
          const value = Math.sin((i + 1) * multiplier) * 10000;
          return value - Math.floor(value);
        };
        return {
          id: i,
          left: `${seed(12.9898) * 100}%`,
          top: `${seed(78.233) * 100}%`,
          duration: seed(31.4159) * 3 + 2,
          delay: seed(47.729) * 2,
        };
      }),
    [count],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 rounded-full bg-crystal"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
