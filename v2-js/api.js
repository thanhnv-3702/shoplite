const API_BASE = "https://dummyjson.com";

export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchProducts(limit = 30) {
  const data = await getJSON(`${API_BASE}/products?limit=${limit}`);
  return data.products ?? [];
}

export async function fetchProductById(id) {
  return getJSON(`${API_BASE}/products/${id}`);
}
