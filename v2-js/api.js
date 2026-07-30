export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchProducts() {
  const products = await getJSON("./products.json");
  return Array.isArray(products) ? products : [];
}

export async function fetchProductById(id) {
  const products = await fetchProducts();
  const product = products.find((item) => item.id === Number(id));
  if (!product) {
    throw new Error("HTTP 404");
  }
  return product;
}
