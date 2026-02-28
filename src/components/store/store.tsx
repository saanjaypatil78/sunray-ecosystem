'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Heart, Star, ChevronRight, 
  Clock, Flame, TrendingUp, Package, Filter, Grid, List
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  PRODUCTS, 
  getDailyDeals, 
  getFeaturedProducts, 
  getProductsByCategory,
  searchProducts,
  type Product,
  type ProductCategory 
} from '@/lib/services/products';
import { 
  formatPrice, 
  convertPrice, 
  getDealTimeRemaining,
  type GeoLocation 
} from '@/lib/services/geolocation';
import { ShopifySoldPopup } from '@/components/popups/sold-popup';

interface StoreProps {
  geoLocation?: GeoLocation | null;
}

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  'groceries': '🍚',
  'dairy': '🥛',
  'fruits-vegetables': '🥬',
  'beverages': '☕',
  'snacks': '🍿',
  'personal-care': '🧴',
  'household': '🧹',
  'electronics': '📱',
  'mobile-accessories': '🔌',
  'computer-accessories': '💻',
  'home-kitchen': '🍳',
  'baby-care': '👶',
  'pet-supplies': '🐕',
  'health-wellness': '💊',
  'fashion': '👕',
};

const CATEGORIES: { id: ProductCategory; name: string }[] = [
  { id: 'groceries', name: 'Groceries' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'mobile-accessories', name: 'Mobile' },
  { id: 'personal-care', name: 'Personal Care' },
  { id: 'household', name: 'Household' },
  { id: 'home-kitchen', name: 'Home & Kitchen' },
  { id: 'health-wellness', name: 'Health' },
  { id: 'baby-care', name: 'Baby Care' },
];

export function Store({ geoLocation }: StoreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const currency = geoLocation?.currency || 'INR';

  // Filter products
  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : selectedCategory === 'all'
    ? PRODUCTS.filter(p => p.isActive)
    : getProductsByCategory(selectedCategory);

  const dailyDeals = getDailyDeals();
  const featuredProducts = getFeaturedProducts();

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return sum + (product ? product.sellingPrice * item.quantity : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Sold Popup */}
      <ShopifySoldPopup geoLocation={geoLocation} />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 hexagon bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500 flex items-center justify-center">
                <div className="w-8 h-8 hexagon bg-[#0D0D1A] flex items-center justify-center">
                  <span className="text-sm font-black gradient-text">BE</span>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold gradient-text text-lg">BRAVE STORE</h1>
                <p className="text-xs text-muted-foreground">Global Marketplace</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-background/50 border-primary/20 focus:border-primary rounded-xl"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Location */}
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span>📍</span>
                <span>{geoLocation?.city || 'Mumbai'}, {geoLocation?.countryCode || 'IN'}</span>
              </div>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-border/30 overflow-x-auto scrollbar-hide">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-2 min-w-max">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'btn-gradient' : ''}
              >
                All Products
              </Button>
              {CATEGORIES.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? 'btn-gradient' : ''}
                >
                  <span className="mr-1">{CATEGORY_ICONS[cat.id]}</span>
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Daily Deals Section */}
        {dailyDeals.length > 0 && !searchQuery && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold">Daily Deals</h2>
                <Badge className="bg-red-500/20 text-red-400 animate-pulse">LIVE</Badge>
              </div>
              <Button variant="ghost" className="gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {PRODUCTS.filter(p => p.isDailyDeal).slice(0, 5).map(product => (
                <DealCard 
                  key={product.id} 
                  product={product} 
                  currency={currency}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Featured Products */}
        {!searchQuery && selectedCategory === 'all' && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Trending Now</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {featuredProducts.slice(0, 10).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  currency={currency}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try a different search or category</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  currency={currency}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                  listView={viewMode === 'list'}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border/50 p-4 z-40"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {cart.length} item{cart.length > 1 ? 's' : ''} in cart
              </p>
              <p className="text-xl font-bold gradient-text-gold">
                {formatPrice(cartTotal, currency)}
              </p>
            </div>
            <Button className="btn-gradient gap-2">
              <ShoppingCart className="w-4 h-4" />
              Checkout
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({ 
  product, 
  currency, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  listView = false 
}: {
  product: Product;
  currency: string;
  onAddToCart: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  listView?: boolean;
}) {
  const convertedPrice = convertPrice(product.sellingPrice, currency);
  const convertedMrp = convertPrice(product.mrp, currency);
  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  if (listView) {
    return (
      <Card className="glass overflow-hidden hover:border-primary/50 transition-colors">
        <CardContent className="p-4 flex gap-4">
          <div className="relative w-32 h-32 shrink-0">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
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
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
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
              <Button size="sm" className="btn-gradient" onClick={() => onAddToCart(product.id)}>
                Add to Cart
              </Button>
              <Button size="sm" variant="outline" onClick={() => onToggleWishlist(product.id)}>
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass overflow-hidden group hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full"
              onClick={() => onToggleWishlist(product.id)}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              className="w-full btn-gradient"
              onClick={() => onAddToCart(product.id)}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          </div>
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
}

// Deal Card Component
function DealCard({ 
  product, 
  currency, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted 
}: {
  product: Product;
  currency: string;
  onAddToCart: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}) {
  const convertedPrice = convertPrice(product.sellingPrice, currency);
  const convertedMrp = convertPrice(product.mrp, currency);
  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);
  const timeRemaining = product.dealEndTime ? getDealTimeRemaining(product.dealEndTime) : null;

  return (
    <Card className="glass overflow-hidden border-red-500/30 hover:border-red-500/50 transition-colors relative">
      {/* Deal Timer */}
      {timeRemaining && (
        <div className="absolute top-0 left-0 right-0 bg-red-500/90 text-white text-xs py-1 px-2 flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" />
          Ends in {timeRemaining.hours}h {timeRemaining.minutes}m
        </div>
      )}

      <CardContent className="p-0 pt-6">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-red-500/90 text-white">
            -{discount}% OFF
          </Badge>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 w-8 h-8 rounded-full"
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
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
            onClick={() => onAddToCart(product.id)}
          >
            Grab Deal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
