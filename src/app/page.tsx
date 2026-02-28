'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Store } from '@/components/store/store';
import type { GeoLocation } from '@/lib/services/geolocation';

// Default location (Mumbai, India)
const DEFAULT_LOCATION: GeoLocation = {
  country: 'India',
  countryCode: 'IN',
  region: 'Maharashtra',
  city: 'Mumbai',
  latitude: 19.076,
  longitude: 72.8777,
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  currencySymbol: '₹',
  language: 'hi',
  locale: 'hi-IN',
};

// Splash Screen Component
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D1A]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500 opacity-50" />
          
          {/* Hexagon */}
          <div className="relative w-24 h-24 clip-hexagon bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500 flex items-center justify-center">
            <div className="w-20 h-20 clip-hexagon bg-[#0D0D1A] flex items-center justify-center">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
                BE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-3xl font-black bg-gradient-to-r from-yellow-400 via-teal-400 to-purple-500 bg-clip-text text-transparent"
        >
          SUNRAY ECOSYSTEM
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm text-gray-400 tracking-widest uppercase"
        >
          Investment & Vendor Platform
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          transition={{ delay: 0.7, duration: 1.5 }}
          className="mt-6 h-1 rounded-full bg-gradient-to-r from-yellow-400 via-teal-400 to-purple-500"
        />
      </motion.div>
    </div>
  );
}

// Main Home Component with proper SSR handling
function HomeContent() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Show store
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Store geoLocation={DEFAULT_LOCATION} />
      </motion.div>
    </AnimatePresence>
  );
}

// Export with dynamic to prevent SSR
export default function Home() {
  return <HomeContent />;
}
