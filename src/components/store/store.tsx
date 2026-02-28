'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Heart, ChevronRight, 
  Flame, TrendingUp, Package, Grid, List
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { 
  PRODUCTS, 
  getDailyDeals, 
  getFeaturedProducts, 
  getProductsByCategory,
  searchProducts,
  type ProductCategory 
} from '@/lib/services/products';
import { 
  formatPrice, 
  type GeoLocation 
} from '@/lib/services/geolocation';
import { ShopifySoldPopup } from '@/components/popups/sold-popup';
import { ProductCard } from '@/components/store/product-card';
import { DealCard } from '@/components/store/deal-card';
import { CartDrawer } from '@/components/store/cart-drawer';
import { useCartStore } from '@/store/cart-store';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const currency = geoLocation?.currency || 'INR';
  
  // Use cart store
  const { items: cartItems, addItem: addToCart, openCart, getTotalItems } = useCartStore();
  const cartTotal = cartItems.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return sum + (product ? product.sellingPrice * item.quantity : 0);
  }, 0);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery);
    }
    if (selectedCategory === 'all') {
      return PRODUCTS.filter(p => p.isActive);
    }
    return getProductsByCategory(selectedCategory);
  }, [searchQuery, selectedCategory]);

  const dailyDeals = useMemo(() => getDailyDeals(), []);
  const featuredProducts = useMemo(() => getFeaturedProducts(), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sold Popup */}
      <ShopifySoldPopup geoLocation={geoLocation} />

      {/* Cart Drawer */}
      <CartDrawer currency={currency} />

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
              <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {getTotalItems()}
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

      <main className="container mx-auto px-4 py-6 pb-24">
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
              {dailyDeals.slice(0, 5).map(product => (
                <DealCard 
                  key={product.id} 
                  product={product} 
                  currency={currency}
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
                  listView={viewMode === 'list'}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Cart Summary */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border/50 p-4 z-40"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in cart
              </p>
              <p className="text-xl font-bold gradient-text-gold">
                {formatPrice(cartTotal, currency)}
              </p>
            </div>
            <Button className="btn-gradient gap-2" onClick={openCart}>
              <ShoppingCart className="w-4 h-4" />
              View Cart
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
