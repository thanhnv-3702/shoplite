import {
  getCartCount,
  getCartTotal,
  loadCart,
  removeFromCart,
  updateQty,
} from "./cart.js";
import { escapeHTML, formatMoney, setCartBadge } from "./utils/format.js";

const SHIPPING_FEE = 30000;

function cartItemHTML(item) {
  const lineTotal = item.price * item.quantity;

  return `
    <article class="cart-item" role="listitem" data-id="${item.id}">
      <a href="product.html?id=${item.id}" class="cart-item-image">
        <img
          src="${item.thumbnail}"
          alt="${escapeHTML(item.title)}"
          width="120"
          height="150"
        >
      </a>
      <div class="cart-item-info">
        <h2><a href="product.html?id=${item.id}">${escapeHTML(item.title)}</a></h2>
        <p class="price">${formatMoney(item.price)}</p>
      </div>
      <div class="cart-item-qty">
        <label class="visually-hidden" for="qty-${item.id}">Số lượng ${escapeHTML(item.title)}</label>
        <div class="qty-controls">
          <button type="button" class="qty-btn" data-action="dec" aria-label="Giảm số lượng">−</button>
          <input
            id="qty-${item.id}"
            type="number"
            name="qty-${item.id}"
            value="${item.quantity}"
            min="1"
            max="99"
            data-action="qty-input"
          >
          <button type="button" class="qty-btn" data-action="inc" aria-label="Tăng số lượng">+</button>
        </div>
      </div>
      <p class="cart-item-line-total" aria-label="Thành tiền">${formatMoney(lineTotal)}</p>
      <button
        type="button"
        class="cart-item-remove"
        data-action="remove"
        aria-label="Xóa ${escapeHTML(item.title)}"
      >✕</button>
    </article>
  `;
}

function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const emptyEl = document.getElementById("cart-empty");
  const layoutEl = document.getElementById("cart-layout");
  const countEl = document.getElementById("cart-count-label");
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const totalEl = document.getElementById("cart-total");
  if (!itemsEl) return;

  const cart = loadCart();
  const count = getCartCount(cart);
  const subtotal = getCartTotal(cart);
  const shipping = cart.length === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  setCartBadge(count);

  if (countEl) {
    countEl.textContent = `(${count} sản phẩm)`;
  }

  if (cart.length === 0) {
    itemsEl.innerHTML = "";
    if (emptyEl) emptyEl.hidden = false;
    if (layoutEl) layoutEl.hidden = true;
    return;
  }

  if (emptyEl) emptyEl.hidden = true;
  if (layoutEl) layoutEl.hidden = false;

  itemsEl.innerHTML = cart.map(cartItemHTML).join("");

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (shippingEl) shippingEl.textContent = formatMoney(shipping);
  if (totalEl) totalEl.textContent = formatMoney(total);
}

function initCartPage() {
  const itemsEl = document.getElementById("cart-items");
  if (!itemsEl) return;

  renderCart();

  itemsEl.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const item = target.closest("[data-id]");
    const id = item?.dataset.id;
    if (!id) return;

    const action = target.dataset.action;
    const cart = loadCart();
    const current = cart.find((entry) => entry.id === Number(id));
    if (!current && action !== "remove") return;

    if (action === "remove") {
      removeFromCart(id);
    } else if (action === "inc") {
      updateQty(id, current.quantity + 1);
    } else if (action === "dec") {
      updateQty(id, current.quantity - 1);
    } else {
      return;
    }

    renderCart();
  });

  itemsEl.addEventListener("change", (event) => {
    const input = event.target.closest('[data-action="qty-input"]');
    if (!input) return;

    const item = input.closest("[data-id]");
    const id = item?.dataset.id;
    if (!id) return;

    updateQty(id, input.value);
    renderCart();
  });
}

initCartPage();
