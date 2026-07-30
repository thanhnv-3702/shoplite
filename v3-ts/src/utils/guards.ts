import type { CartItem, Product } from "../types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.price === "number" &&
    typeof value.discountPercentage === "number" &&
    typeof value.rating === "number" &&
    typeof value.stock === "number" &&
    typeof value.category === "string" &&
    typeof value.thumbnail === "string"
  );
}

export function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

export function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value) || !isProduct(value)) return false;
  return typeof value.quantity === "number";
}

export function isCartItemArray(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}
