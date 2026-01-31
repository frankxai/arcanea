import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
}

interface FireOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface Player {
  x: number;
  y: number;
  radius: number;
  color: string;
  trail: Array<{x: number, y: number}>;
}

export const useGameLogic = (canvas: HTMLCanvasElement | null) => {
  const animationRef = useRef<number>();
  const gameRunningRef = useRef(true);
  
  const createFireOrb = (level: number): FireOrb => {
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;

    switch (side) {
      case 0: // Top
        x = Math.random() * canvas!.width;
        y = -20;
        vx = (Math.random() - 0.5) * 2;
        vy = 2 + level * 0.5;
        break;
      case 1: // Right
        x = canvas!.width + 20;
        y = Math.random() * canvas!.height;
        vx = -(2 + level * 0.5);
        vy = (Math.random() - 0.5) * 2;
        break;
      case 2: // Bottom
        x = Math.random() * canvas!.width;
        y = canvas!.height + 20;
        vx = (Math.random() - 0.5) * 2;
        vy = -(2 + level * 0.5);
        break;
      case 3: // Left
        x = -20;
        y = Math.random() * canvas!.height;
        vx = 2 + level * 0.5;
        vy = (Math.random() - 0.5) * 2;
        break;
    }

    return {
      x, y, vx, vy,
      radius: 8 + Math.random() * 8,
      color: `hsl(${Math.random() * 60}, 100%, 50%)`,
      rotation: 0,
      rotationSpeed: Math.random() * 0.2 - 0.1
    };
  };

  const createParticle = (x: number, y: number, color: string): Particle[] => {
    const particles: Particle[] = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        radius: Math.random() * 3 + 1,
        color,
        life: 1
      });
    }
    return particles;
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
    // Draw trail
    for (let i = 0; i < player.trail.length; i++) {
      const trail = player.trail[i];
      const alpha = 1 - (i / player.trail.length);
      ctx.globalAlpha = alpha * 0.5;
      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, player.radius * (1 - i * 0.05), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Draw player with glow
    const gradient = ctx.createRadialGradient(
      player.x, player.y, 0,
      player.x, player.y, player.radius * 2
    );
    gradient.addColorStop(0, player.color);
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawFireOrb = (ctx: CanvasRenderingContext2D, orb: FireOrb) => {
    ctx.save();
    ctx.translate(orb.x, orb.y);
    ctx.rotate(orb.rotation);

    const orbGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, orb.radius);
    orbGradient.addColorStop(0, orb.color);
    orbGradient.addColorStop(0.7, orb.color);
    orbGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = orbGradient;
    ctx.beginPath();
    ctx.arc(0, 0, orb.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw flame spikes
    ctx.strokeStyle = orb.color;
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(angle) * orb.radius * 1.5,
        Math.sin(angle) * orb.radius * 1.5
      );
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.globalAlpha = particle.life;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkCollision = (
    player: Player,
    orb: FireOrb
  ): boolean => {
    const dx = player.x - orb.x;
    const dy = player.y - orb.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < player.radius + orb.radius;
  };

  return {
    createFireOrb,
    createParticle,
    drawPlayer,
    drawFireOrb,
    drawParticle,
    checkCollision,
    animationRef,
    gameRunningRef
  };
};