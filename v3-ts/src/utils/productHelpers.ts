import type { Product, SortDir } from "../types";

const normalize = (text = ""): string => text.toLowerCase().trim();

export function filterByKeyword(list: Product[], query = ""): Product[] {
  const q = normalize(query);
  if (!q) return [...list];

  return list.filter(
    (product) =>
      normalize(product.title).includes(q) ||
      normalize(product.category).includes(q)
  );
}

export function filterByCategory(list: Product[], category = ""): Product[] {
  const cat = normalize(category);
  if (!cat) return [...list];
  return list.filter((product) => normalize(product.category) === cat);
}

export function filterByMaxPrice(list: Product[], maxPrice?: number): Product[] {
  if (maxPrice == null || Number.isNaN(Number(maxPrice))) return [...list];
  return list.filter((product) => product.price <= Number(maxPrice));
}

export function sortByPrice(list: Product[], direction: SortDir = "asc"): Product[] {
  const sorted = [...list].sort((a, b) => a.price - b.price);
  return direction === "desc" ? sorted.reverse() : sorted;
}

export function getTitles(list: Product[]): string[] {
  return list.map((product) => product.title);
}
