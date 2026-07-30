const API_BASE = "https://dummyjson.com";

/**
 * Fetch JSON với kiểm tra res.ok — luôn dùng try/catch ở nơi gọi.
 */
export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: không tải được dữ liệu`);
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
