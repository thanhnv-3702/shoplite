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
