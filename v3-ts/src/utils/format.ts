export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function escapeHTML(value: string | number): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function setCartBadge(count: number): void {
  const badge = document.querySelector(".cart-badge");
  const link = document.querySelector(".cart-link");
  if (!(badge instanceof HTMLElement)) return;

  badge.textContent = String(count);
  badge.hidden = count === 0;

  if (link instanceof HTMLElement) {
    link.setAttribute("aria-label", `Giỏ hàng, ${count} sản phẩm`);
  }
}
