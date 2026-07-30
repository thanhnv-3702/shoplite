/** Product list helpers. */

const normalize = (text = "") => text.toLowerCase().trim();

export function filterByKeyword(list, query = "") {
  const q = normalize(query);
  if (!q) return [...list];

  return list.filter(
    (product) =>
      normalize(product.title).includes(q) ||
      normalize(product.category).includes(q)
  );
}

export function filterByCategory(list, category = "") {
  const cat = normalize(category);
  if (!cat) return [...list];
  return list.filter((product) => normalize(product.category) === cat);
}

export function filterByMaxPrice(list, maxPrice) {
  if (maxPrice == null || Number.isNaN(Number(maxPrice))) return [...list];
  return list.filter((product) => product.price <= Number(maxPrice));
}

export function sortByPrice(list, direction = "asc") {
  const sorted = [...list].sort((a, b) => a.price - b.price);
  return direction === "desc" ? sorted.reverse() : sorted;
}

export function getTitles(list) {
  return list.map((product) => product.title);
}

export function calcCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
}

export function applyDiscount(product, percent = 10) {
  const { price, ...rest } = product;
  const discountedPrice = Math.round(price * (1 - percent / 100));
  return { ...rest, price, discountedPrice, onSale: true };
}
