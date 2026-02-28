'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Loader2, MapPin } from 'lucide-react';

import { SplashScreen } from '@/components/splash/splash-screen';
import { Store } from '@/components/store/store';
import { getGeoLocation, type GeoLocation } from '@/lib/services/geolocation';
import { useAppStore } from '@/store/app-store';

export default function Home() {
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated, completeSplash } = useAppStore();

  // Detect user location on mount
  useEffect(() => {
    async function detectLocation() {
      try {
        const location = await getGeoLocation();
        setGeoLocation(location);
      } catch (error) {
        console.error('Failed to detect location:', error);
        // Default to India
        setGeoLocation({
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
        });
      } finally {
        setIsLoadingGeo(false);
      }
    }

    detectLocation();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    completeSplash();
  };

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Loading state while detecting location
  if (isLoadingGeo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 hexagon bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500 mx-auto animate-pulse" />
            <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-muted-foreground flex items-center gap-2 justify-center">
            <Globe className="w-4 h-4" />
            Detecting your location...
          </p>
        </motion.div>
      </div>
    );
  }

  // Main store interface
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Store geoLocation={geoLocation} />
      </motion.div>
    </AnimatePresence>
  );
}
