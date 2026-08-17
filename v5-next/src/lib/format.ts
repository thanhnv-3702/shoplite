import type { Product } from "@/types/product";

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function filterProductsByKeyword(
  items: Product[],
  keyword: string,
): Product[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) => {
    const haystack = [item.title, item.category, item.brand ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterByCategory(
  items: Product[],
  category: string,
): Product[] {
  const cat = category.trim().toLowerCase();
  if (!cat) return items;
  return items.filter((item) => item.category.toLowerCase() === cat);
}

export function uniqueCategories(items: Product[]): string[] {
  return [...new Set(items.map((item) => item.category))];
}

export function homeHref(params: { q?: string; category?: string }): string {
  const search = new URLSearchParams();
  const q = params.q?.trim();
  const category = params.category?.trim();
  if (q) search.set("q", q);
  if (category) search.set("category", category);
  const qs = search.toString();
  return qs ? `/?${qs}` : "/";
}
