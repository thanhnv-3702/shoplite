import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Client store — persist localStorage.
 * skipHydration: tránh mismatch SSR; rehydrate trong Providers.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQty: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shoplite-cart-vnd",
      skipHydration: true,
    },
  ),
);

export function selectCartCount(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectCartTotal(state: CartState): number {
  return state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}
