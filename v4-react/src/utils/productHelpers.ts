export function filterProductsByKeyword<T extends { title: string; category: string; brand?: string }>(
  items: T[],
  keyword: string,
): T[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) => {
    const haystack = [item.title, item.category, item.brand ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
