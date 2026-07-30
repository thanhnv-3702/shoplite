const CART_KEY = "shoplite-cart-vnd";

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCartCount(cart = loadCart()) {
  return cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
}

export function getCartTotal(cart = loadCart()) {
  return cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 0), 0);
}

export function addToCart(product, quantity = 1) {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(id) {
  const cart = loadCart().filter((item) => item.id !== Number(id));
  saveCart(cart);
  return cart;
}

export function updateQty(id, quantity) {
  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty < 1) {
    return removeFromCart(id);
  }

  const cart = loadCart().map((item) =>
    item.id === Number(id) ? { ...item, quantity: Math.min(99, Math.floor(qty)) } : item
  );
  saveCart(cart);
  return cart;
}
