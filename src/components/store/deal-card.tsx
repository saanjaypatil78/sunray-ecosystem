'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { convertPrice, formatPrice, getDealTimeRemaining } from '@/lib/services/geolocation';
import type { Product } from '@/lib/services/products';
import { useCartStore } from '@/store/cart-store';

interface DealCardProps {
  product: Product;
  currency: string;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

export const DealCard = memo(function DealCard({
  product,
  currency,
}: DealCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(() => {
    // Initialize on first render
    if (product.dealEndTime) {
      return getDealTimeRemaining(product.dealEndTime);
    }
    return null;
  });
  
  const addItem = useCartStore((state) => state.addItem);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const convertedPrice = convertPrice(product.sellingPrice, currency);
  const convertedMrp = convertPrice(product.mrp, currency);
  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  // Update countdown timer
  useEffect(() => {
    if (!product.dealEndTime) return;
    
    const updateTimer = () => {
      const remaining = getDealTimeRemaining(product.dealEndTime);
      setTimeRemaining(remaining);
    };
    
    // Update immediately
    updateTimer();
    
    // Then update every second
    intervalRef.current = setInterval(updateTimer, 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [product.dealEndTime]);

  const handleAddToCart = () => {
    addItem(product.id);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="glass overflow-hidden border-red-500/30 hover:border-red-500/50 transition-colors relative">
      {/* Deal Timer */}
      {timeRemaining && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 bg-red-500/90 text-white text-xs py-1.5 px-2 flex items-center justify-center gap-1 z-10"
        >
          <Clock className="w-3 h-3" />
          <span className="font-medium">
            Ends in {String(timeRemaining.hours).padStart(2, '0')}:
            {String(timeRemaining.minutes).padStart(2, '0')}:
            {String(timeRemaining.seconds).padStart(2, '0')}
          </span>
        </motion.div>
      )}

      <CardContent className="p-0 pt-6">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-red-500/90 text-white font-bold">
            -{discount}% OFF
          </Badge>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 w-8 h-8 rounded-full"
            onClick={toggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
          <h3 className="font-medium text-sm truncate mt-0.5">{product.name}</h3>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-red-400">{convertedPrice.formatted}</span>
            <span className="text-xs text-muted-foreground line-through">{convertedMrp.formatted}</span>
          </div>
          
          <p className="text-xs text-green-400 mt-1">
            Save {formatPrice(product.mrp - product.sellingPrice, currency)}!
          </p>
          
          <Button 
            size="sm" 
            className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white"
            onClick={handleAddToCart}
          >
            Grab Deal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
