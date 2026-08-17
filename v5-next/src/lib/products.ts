import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const { default: products } = await import("@/data/products.json");
  return products as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await getProducts();
  return products.find((item) => item.id === id) ?? null;
}
