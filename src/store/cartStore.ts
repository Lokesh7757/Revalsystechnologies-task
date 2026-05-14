import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from '@/types';

interface CartState {
  items: CartItem[];
  user: User | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      user: null,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'ecommerce-cart-storage',
    }
  )
);
