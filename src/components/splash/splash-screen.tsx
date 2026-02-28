'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-generate random positions on client side
  const particlePositions = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 20 }, () => ({
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
    }));
  }, [mounted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          
          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-radial-gradient" />

          {/* Rotating Hexagon Rings */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[600px] h-[600px]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,2 95,25 95,75 50,98 5,75 5,25"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#00CED1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[450px] h-[450px]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,2 95,25 95,75 50,98 5,75 5,25"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="0.4"
                />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00CED1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Inner Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[300px] h-[300px]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,2 95,25 95,75 50,98 5,75 5,25"
                  fill="none"
                  stroke="url(#gradient3)"
                  strokeWidth="0.5"
                  strokeDasharray="5 3"
                />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Main Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Hexagonal Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 1.5 
              }}
              className="relative"
            >
              {/* Outer Glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 blur-2xl"
              >
                <div className="w-40 h-40 hexagon bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500" />
              </motion.div>

              {/* Main Hexagon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative w-40 h-40 hexagon bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500 glow-gold"
              >
                {/* Inner Hexagon */}
                <div className="absolute inset-3 hexagon bg-[#0D0D1A] flex items-center justify-center">
                  {/* Logo Text */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl font-black gradient-text tracking-wider"
                    >
                      BE
                    </motion.span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 via-teal-400 to-purple-500 my-1"
                    />
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-[10px] font-bold text-white/80 tracking-widest"
                    >
                      BRAVE ECOM
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-black gradient-text tracking-tight">
                SUNRAY ECOSYSTEM
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="mt-3 text-muted-foreground text-sm tracking-widest uppercase"
              >
                Investment & Vendor Platform
              </motion.p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 w-64"
            >
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-yellow-400 via-teal-400 to-purple-500"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="mt-3 text-center text-xs text-muted-foreground"
              >
                Initializing secure connection...
              </motion.p>
            </motion.div>
          </div>

          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {mounted && particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: `${pos.x}vw`,
                  y: `${pos.y}vh`,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{ 
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: (i % 5) * 0.4,
                }}
                className="absolute w-1 h-1 rounded-full bg-yellow-400"
              />
            ))}
          </div>

          {/* Version Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-xs text-muted-foreground">
                Version 2.0 | Production Ready
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
