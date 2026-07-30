import type { CartItem, Product } from "./types";
import { isCartItemArray } from "./utils/guards";

const CART_KEY = "shoplite-cart-vnd";

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return isCartItemArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCartCount(cart: CartItem[] = loadCart()): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart: CartItem[] = loadCart()): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(id: string | number): CartItem[] {
  const cart = loadCart().filter((item) => item.id !== Number(id));
  saveCart(cart);
  return cart;
}

export function updateQty(id: string | number, quantity: number): CartItem[] {
  if (!Number.isFinite(quantity) || quantity < 1) {
    return removeFromCart(id);
  }

  const nextQty = Math.min(99, Math.floor(quantity));
  const cart = loadCart().map((item) =>
    item.id === Number(id) ? { ...item, quantity: nextQty } : item
  );
  saveCart(cart);
  return cart;
}
