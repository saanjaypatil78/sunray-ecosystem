import { create } from 'zustand';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Computed
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (productId) => set((state) => {
    const existing = state.items.find(item => item.productId === productId);
    if (existing) {
      return {
        items: state.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { items: [...state.items, { productId, quantity: 1 }] };
  }),
  
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(item => item.productId !== productId),
  })),
  
  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { items: state.items.filter(item => item.productId !== productId) };
    }
    return {
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    };
  }),
  
  clearCart: () => set({ items: [] }),
  
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
}));
