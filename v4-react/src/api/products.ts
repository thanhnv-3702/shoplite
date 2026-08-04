import type { Product } from "../types";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Không tải được dữ liệu (HTTP ${res.status})`);
  }
  return (await res.json()) as T;
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    typeof item.thumbnail === "string"
  );
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await getJSON<unknown>("/products.json");
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error("Dữ liệu sản phẩm không hợp lệ");
  }
  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const products = await fetchProducts();
  const product = products.find((item) => item.id === id);
  if (!product) {
    throw new Error("Không tìm thấy sản phẩm");
  }
  return product;
}
