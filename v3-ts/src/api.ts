import type { FetchState, Product } from "./types";
import { isProductArray } from "./utils/guards";

export async function getJSON<T>(
  url: string,
  guard: (value: unknown) => value is T
): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data: unknown = await res.json();
  if (!guard(data)) {
    throw new Error("Invalid response shape");
  }
  return data;
}

export async function fetchProducts(): Promise<Product[]> {
  return getJSON("/products.json", isProductArray);
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const products = await fetchProducts();
  const product = products.find((item) => item.id === Number(id));
  if (!product) {
    throw new Error("HTTP 404");
  }
  return product;
}

export async function loadProductsState(): Promise<FetchState<Product[]>> {
  try {
    const data = await fetchProducts();
    return { status: "success", data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: "error", error: message };
  }
}
