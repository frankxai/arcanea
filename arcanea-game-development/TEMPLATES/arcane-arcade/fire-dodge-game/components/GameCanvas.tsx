import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGameLogic } from '../utils/useGameLogic';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [performance, setPerformance] = useState('NEEDING TRAINING');
  const [isPlaying, setIsPlaying] = useState(false);

  const gameLogic = useGameLogic(canvasRef.current);

  useEffect(() => {
    const saved = localStorage.getItem('arcaneaHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game state
    let gameRunning = false;
    let currentScore = 0;
    let currentLives = 3;
    let currentLevel = 1;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Game objects
    const player: any = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      color: '#4fc3f7',
      trail: []
    };

    const fireOrbs: any[] = [];
    const particles: any[] = [];

    // Input handling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    // Game functions
    const createFireOrb = () => {
      const orb = gameLogic.createFireOrb(currentLevel);
      fireOrbs.push(orb);
    };

    const createParticle = (x: number, y: number, color: string) => {
      const newParticles = gameLogic.createParticle(x, y, color);
      particles.push(...newParticles);
    };

    // Game loop
    const gameLoop = () => {
      if (!gameRunning) return;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update player
      const dx = mouseX - player.x;
      const dy = mouseY - player.y;
      player.x += dx * 0.15;
      player.y += dy * 0.15;

      // Keep player in bounds
      player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
      player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

      // Update trail
      player.trail.unshift({ x: player.x, y: player.y });
      if (player.trail.length > 10) player.trail.pop();

      // Update fire orbs
      for (let i = fireOrbs.length - 1; i >= 0; i--) {
        const orb = fireOrbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.rotation += orb.rotationSpeed;

        // Remove if out of bounds
        if (orb.x < -50 || orb.x > canvas.width + 50 || 
            orb.y < -50 || orb.y > canvas.height + 50) {
          fireOrbs.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Collision detection
      for (let i = fireOrbs.length - 1; i >= 0; i--) {
        const orb = fireOrbs[i];
        if (gameLogic.checkCollision(player, orb)) {
          createParticle(orb.x, orb.y, orb.color);
          fireOrbs.splice(i, 1);
          currentLives--;
          setLives(currentLives);

          // Screen shake
          canvas.style.animation = 'none';
          setTimeout(() => {
            canvas.style.animation = 'shake 0.3s';
          }, 10);

          if (currentLives <= 0) {
            gameRunning = false;
            gameLogic.gameRunningRef.current = false;
            setGameOver(true);
            setIsPlaying(false);
            
            // Calculate performance
            let perf = 'NEEDING TRAINING';
            if (currentScore > 1000) perf = 'APPRENTICE LEVEL';
            if (currentScore > 2500) perf = 'JOURNEYMAN LEVEL';
            if (currentScore > 5000) perf = 'MASTER LEVEL';
            if (currentScore > 10000) perf = 'LEGENDARY ARCANEA MASTER!';
            setPerformance(perf);
          }
        }
      }

      // Spawn new fire orbs
      if (Math.random() < 0.02 + currentLevel * 0.005) {
        createFireOrb();
      }

      // Level progression
      if (currentScore > 0 && currentScore % 500 === 0) {
        currentLevel++;
        setLevel(currentLevel);
      }

      // Draw everything
      fireOrbs.forEach(orb => gameLogic.drawFireOrb(ctx, orb));
      particles.forEach(p => gameLogic.drawParticle(ctx, p));
      gameLogic.drawPlayer(ctx, player);

      // Update score
      currentScore++;
      setScore(currentScore);

      if (gameRunning) {
        gameLogic.animationRef.current = requestAnimationFrame(gameLoop);
      }
    };

    const startGame = () => {
      gameRunning = true;
      setIsPlaying(true);
      gameLogic.gameRunningRef.current = true;
      gameLoop();
    };

    return { startGame, gameLoop };
  }, [gameLogic]);

  const startGame = () => {
    setGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    setIsPlaying(true);
  };

  if (gameOver) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-purple-900 p-8 rounded-2xl border-2 border-red-500 max-w-md text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-red-500">🔥 ARCANEA CHALLENGE ENDED</h2>
          <div className="text-white mb-6">
            <p className="text-2xl mb-2">
              You survived <span className="text-yellow-400 font-bold">{score}</span> fire orbs!
            </p>
            <p className="text-lg">
              Your reflexes: <span className="text-purple-400 font-bold">{performance}</span>
            </p>
          </div>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              🔥 Forge Ahead
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex justify-center mb-6"
      >
        <canvas
          ref={canvasRef}
          className="border-2 border-orange-500 rounded-lg shadow-2xl shadow-orange-500/50 arcane-glow"
          style={{
            background: '#000',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </motion.div>

      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg"
        >
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4">🔥 Ready to Test Your Reflexes?</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="arcane-button px-8 py-4 rounded-lg text-lg font-bold"
            >
              Start Arcanea Challenge
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}