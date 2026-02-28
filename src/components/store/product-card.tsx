'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { convertPrice } from '@/lib/services/geolocation';
import type { Product } from '@/lib/services/products';
import { useCartStore } from '@/store/cart-store';

interface ProductCardProps {
  product: Product;
  currency: string;
  listView?: boolean;
}

export const ProductCard = memo(function ProductCard({
  product,
  currency,
  listView = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  
  const convertedPrice = convertPrice(product.sellingPrice, currency);
  const convertedMrp = convertPrice(product.mrp, currency);
  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  const handleAddToCart = () => {
    addItem(product.id);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (listView) {
    return (
      <Card className="glass overflow-hidden hover:border-primary/50 transition-colors">
        <CardContent className="p-4 flex gap-4">
          <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-lg">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-green-500/80 text-white text-xs">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{product.brand}</p>
            <h3 className="font-semibold truncate">{product.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-bold text-primary">{convertedPrice.formatted}</span>
              {discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {convertedMrp.formatted}
                </span>
              )}
            </div>
            <p className="text-xs text-green-400 mt-1">
              {product.freeShipping ? 'Free Delivery' : `Delivery in ${product.deliveryDays} days`}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" className="btn-gradient" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="sm" variant="outline" onClick={toggleWishlist}>
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="glass overflow-hidden group hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge className="bg-green-500/90 text-white text-xs">-{discount}%</Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-primary/90 text-primary-foreground text-xs">HOT</Badge>
            )}
            {product.isDailyDeal && (
              <Badge className="bg-red-500/90 text-white text-xs animate-pulse">DEAL</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div 
            className="absolute top-2 right-2 flex flex-col gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full"
              onClick={toggleWishlist}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </motion.div>

          {/* Quick Add */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              size="sm" 
              className="w-full btn-gradient"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
          <h3 className="font-medium text-sm truncate mt-0.5">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium ml-0.5">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold gradient-text-gold">
              {convertedPrice.formatted}
            </span>
            {discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {convertedMrp.formatted}
              </span>
            )}
          </div>

          {/* Delivery Info */}
          <p className="text-xs text-green-400 mt-1">
            {product.freeShipping ? '🚚 Free Delivery' : `📦 ${product.deliveryDays} day delivery`}
          </p>

          {/* Sold Count */}
          <p className="text-xs text-muted-foreground mt-1">
            {product.totalSold.toLocaleString()}+ sold
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
