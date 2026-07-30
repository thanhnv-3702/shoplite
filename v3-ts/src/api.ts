import type { Product } from "./types";

export async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  const products = await getJSON<Product[]>("/products.json");
  return Array.isArray(products) ? products : [];
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const products = await fetchProducts();
  const product = products.find((item) => item.id === Number(id));
  if (!product) {
    throw new Error("HTTP 404");
  }
  return product;
}
