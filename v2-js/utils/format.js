export function formatMoney(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function setCartBadge(count) {
  const badge = document.querySelector(".cart-badge");
  const link = document.querySelector(".cart-link");
  if (!badge) return;

  badge.textContent = String(count);
  badge.hidden = count === 0;

  if (link) {
    link.setAttribute("aria-label", `Giỏ hàng, ${count} sản phẩm`);
  }
}
