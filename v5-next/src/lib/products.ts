import type { Product } from "@/types/product";

/**
 * Server-only data access.
 *
 * ShopLite giữ catalog VNĐ trong `src/data/products.json` (cùng shape DummyJSON).
 * Pattern fetch + ISR cho API ngoài:
 *   await fetch(url, { next: { revalidate: 60 } })
 */
export async function getProducts(): Promise<Product[]> {
  // Dynamic import trên server — không cần useEffect/useState
  const { default: products } = await import("@/data/products.json");
  return products as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await getProducts();
  return products.find((item) => item.id === id) ?? null;
}
