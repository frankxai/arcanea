import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function FireDodgeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [performance, setPerformance] = useState('NEEDING TRAINING');
  const animationRef = useRef<number>();
  const gameRunningRef = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem('arcaneaHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = Math.min(800, window.innerWidth - 40);
      canvas.height = Math.min(600, window.innerHeight - 200);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game state
    let gameRunning = true;
    let currentScore = 0;
    let currentLives = 3;
    let currentLevel = 1;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Game objects
    const player = {
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
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      switch (side) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = -20;
          vx = (Math.random() - 0.5) * 2;
          vy = 2 + currentLevel * 0.5;
          break;
        case 1: // Right
          x = canvas.width + 20;
          y = Math.random() * canvas.height;
          vx = -(2 + currentLevel * 0.5);
          vy = (Math.random() - 0.5) * 2;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 20;
          vx = (Math.random() - 0.5) * 2;
          vy = -(2 + currentLevel * 0.5);
          break;
        case 3: // Left
          x = -20;
          y = Math.random() * canvas.height;
          vx = 2 + currentLevel * 0.5;
          vy = (Math.random() - 0.5) * 2;
          break;
      }

      fireOrbs.push({
        x, y, vx, vy,
        radius: 8 + Math.random() * 8,
        color: `hsl(${Math.random() * 60}, 100%, 50%)`,
        rotation: 0,
        rotationSpeed: Math.random() * 0.2 - 0.1
      });
    };

    const createParticle = (x: number, y: number, color: string) => {
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
        const dx = player.x - orb.x;
        const dy = player.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.radius + orb.radius) {
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
            gameRunningRef.current = false;
            setGameOver(true);
            
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
      // Draw player trail
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

      // Draw player
      const gradient = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, player.radius * 2);
      gradient.addColorStop(0, player.color);
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw fire orbs
      fireOrbs.forEach(orb => {
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

        ctx.restore();
      });

      // Draw particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Update score
      currentScore++;
      setScore(currentScore);

      if (gameRunning) {
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };

    // Start game
    gameLoop();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    gameRunningRef.current = true;
  };

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Arcanea Fire Dodge',
        text: `I scored ${score} points in Arcanea Fire Dodge! ${performance}`,
        url: window.location.href
      });
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <Head>
          <title>Arcanea Fire Dodge - Game Over</title>
          <meta name="description" content="Test your reflexes in Arcanea Fire Dodge!" />
        </Head>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-black bg-opacity-50 rounded-2xl border-2 border-red-500 max-w-md"
        >
          <h1 className="text-4xl font-bold mb-4 text-red-500">🔥 ARCANEA CHALLENGE ENDED</h1>
          <div className="text-white mb-6">
            <p className="text-2xl mb-2">You survived <span className="text-yellow-400 font-bold">{score}</span> fire orbs!</p>
            <p className="text-lg">Your reflexes: <span className="text-purple-400 font-bold">{performance}</span></p>
          </div>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartGame}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Forge Ahead
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareScore}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Share Your Achievement
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Arcanea Fire Dodge - Test Your Reflexes!</title>
        <meta name="description" content="Arcanea Fire Element action game - dodge fire orbs and test your reflexes!" />
        <meta property="og:title" content="Arcanea Fire Dodge" />
        <meta property="og:description" content="Test your reflexes in this intense Arcanea Fire action game!" />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
              🔥 Arcanea Fire Dodge
            </h1>
            <p className="text-gray-300 text-lg">Test your reflexes against the fire element storm!</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-black bg-opacity-50 rounded-xl p-6 border border-orange-500"
            >
              <h3 className="text-orange-400 font-bold text-xl mb-2">Score</h3>
              <p className="text-3xl font-mono font-bold">{score.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black bg-opacity-50 rounded-xl p-6 border border-red-500"
            >
              <h3 className="text-red-400 font-bold text-xl mb-2">Lives</h3>
              <p className="text-3xl font-mono font-bold">{lives}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black bg-opacity-50 rounded-xl p-6 border border-purple-500"
            >
              <h3 className="text-purple-400 font-bold text-xl mb-2">Level</h3>
              <p className="text-3xl font-mono font-bold">{level}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-black bg-opacity-50 rounded-xl p-6 border border-yellow-500"
            >
              <h3 className="text-yellow-400 font-bold text-xl mb-2">High Score</h3>
              <p className="text-3xl font-mono font-bold">{highScore.toLocaleString()}</p>
            </motion.div>
          </div>

          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <canvas
                ref={canvasRef}
                className="border-2 border-orange-500 rounded-lg shadow-2xl shadow-orange-500/50"
                style={{
                  background: '#000',
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <div className="bg-black bg-opacity-75 rounded-lg px-4 py-2 text-sm">
                  <strong>🎮 Controls:</strong> Mouse/Touch to move • Avoid red fire orbs
                </div>
              </motion.div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-black bg-opacity-50 rounded-xl p-6 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-4 text-orange-400">🔥 Fire Element Wisdom</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="font-bold text-red-400 mb-2">💪 Action</h3>
                  <p className="text-gray-300">Quick reflexes and decisive movement are essential</p>
                </div>
                <div>
                  <h3 className="font-bold text-orange-400 mb-2">⚡ Speed</h3>
                  <p className="text-gray-300">Every moment counts in the fire storm</p>
                </div>
                <div>
                  <h3 className="font-bold text-yellow-400 mb-2">🎯 Focus</h3>
                  <p className="text-gray-300">Concentration helps you survive longer</p>
                </div>
                <div>
                  <h3 className="font-bold text-purple-400 mb-2">🌟 Mastery</h3>
                  <p className="text-gray-300">Practice transforms challenge into triumph</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}