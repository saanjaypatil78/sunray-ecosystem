'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, ShoppingBag, CheckCircle } from 'lucide-react';

import { PRODUCTS } from '@/lib/services/products';
import { convertPrice, type GeoLocation } from '@/lib/services/geolocation';

interface SoldPopupProps {
  geoLocation?: GeoLocation | null;
}

interface SoldNotification {
  id: string;
  productName: string;
  productImage: string;
  buyerName: string;
  buyerLocation: string;
  quantity: number;
  price: number;
  currency: string;
  timeAgo: string;
  isVerified: boolean;
}

// Generate realistic mock sold notifications
function generateMockNotification(currency: string = 'INR'): SoldNotification {
  const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Suresh', 'Kavita', 'Rahul', 'Meena', 'John', 'Sarah', 'Ahmed', 'Fatima', 'Wei', 'Lin'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Dubai', 'Singapore', 'London', 'New York', 'Sydney'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + '.';
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  const minutes = Math.floor(Math.random() * 30) + 1;
  const timeAgo = minutes <= 1 ? 'Just now' : `${minutes} min ago`;
  
  return {
    id: `NOTIF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    productName: product.name,
    productImage: product.thumbnail,
    buyerName: `${firstName} ${lastName}`,
    buyerLocation: city,
    quantity: Math.floor(Math.random() * 3) + 1,
    price: product.sellingPrice,
    currency,
    timeAgo,
    isVerified: Math.random() > 0.2,
  };
}

export function ShopifySoldPopup({ geoLocation }: SoldPopupProps) {
  const [currentNotification, setCurrentNotification] = useState<SoldNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const currency = geoLocation?.currency || 'INR';

  // Pre-generate notifications
  const notifications = useMemo(() => {
    return Array.from({ length: 10 }, () => generateMockNotification(currency));
  }, [currency]);

  // Show popup periodically
  useEffect(() => {
    if (isDismissed) return;

    const showPopup = () => {
      if (notifications.length > 0) {
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        setCurrentNotification(notification);
        setIsVisible(true);

        // Auto hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }
    };

    // Initial delay
    const initialDelay = setTimeout(() => {
      showPopup();
    }, 3000);

    // Interval between popups
    const interval = setInterval(() => {
      showPopup();
    }, 15000 + Math.random() * 15000); // 15-30 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [notifications, isDismissed]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(true);
  }, []);

  if (!currentNotification || isDismissed) return null;

  const convertedPrice = convertPrice(currentNotification.price, currency);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-4 left-4 z-50 max-w-sm"
        >
          <div className="glass-strong rounded-xl p-4 shadow-2xl border border-primary/20">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-start gap-3">
              {/* Product Image */}
              <div className="relative shrink-0">
                <img
                  src={currentNotification.productImage}
                  alt={currentNotification.productName}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <ShoppingBag className="w-3 h-3" />
                  <span>Someone just purchased</span>
                </div>

                <p className="font-semibold text-sm truncate">
                  {currentNotification.productName}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-bold">
                    {convertedPrice.formatted}
                  </span>
                  {currentNotification.quantity > 1 && (
                    <span className="text-xs text-muted-foreground">
                      × {currentNotification.quantity}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{currentNotification.buyerLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{currentNotification.timeAgo}</span>
                  </div>
                </div>

                {currentNotification.isVerified && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Named export for backward compatibility
export const SoldPopup = ShopifySoldPopup;
