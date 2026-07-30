import "./style.css";
import "./theme";
import { fetchProductById } from "./api";
import { addToCart, getCartCount } from "./cart";
import type { Product } from "./types";
import { escapeHTML, formatMoney, setCartBadge } from "./utils/format";

function getProductIdFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProductDetail(product: Product, container: HTMLElement): void {
  const rating =
    typeof product.rating === "number" ? product.rating.toFixed(1) : String(product.rating);
  const oldPrice =
    product.discountPercentage > 0
      ? product.price / (1 - product.discountPercentage / 100)
      : null;

  container.innerHTML = `
    <div class="product-detail-gallery">
      <img
        class="product-detail-image"
        src="${product.thumbnail}"
        alt="${escapeHTML(product.title)}"
        width="800"
        height="1000"
      >
    </div>

    <div class="product-detail-info">
      <p class="card-cat">${escapeHTML(product.category)}</p>
      <h1 id="product-title">${escapeHTML(product.title)}</h1>
      <p class="product-rating" aria-label="Đánh giá ${rating} trên 5">
        ★★★★☆ <span>${rating}</span>
      </p>
      <p class="price price-lg">${formatMoney(product.price)}</p>
      ${oldPrice ? `<p class="price-old">${formatMoney(oldPrice)}</p>` : ""}
      <p class="product-desc">${escapeHTML(product.description)}</p>

      <dl class="product-meta">
        <div>
          <dt>Thương hiệu</dt>
          <dd>${escapeHTML(product.brand || "—")}</dd>
        </div>
        <div>
          <dt>Tồn kho</dt>
          <dd>Còn ${product.stock} sản phẩm</dd>
        </div>
      </dl>

      <div class="product-actions">
        <button type="button" class="btn btn-lg" id="add-to-cart-detail">Thêm vào giỏ</button>
        <a class="btn btn-ghost btn-lg" href="index.html">← Quay lại danh sách</a>
      </div>
    </div>
  `;

  document.getElementById("add-to-cart-detail")?.addEventListener("click", () => {
    addToCart(product);
    setCartBadge(getCartCount());
  });
}

async function initProductDetailPage(): Promise<void> {
  const container = document.getElementById("product-detail");
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");
  const status = document.getElementById("product-status");
  if (!(container instanceof HTMLElement)) return;

  setCartBadge(getCartCount());

  const id = getProductIdFromURL();
  if (!id) {
    if (status) {
      status.hidden = false;
      status.textContent = "Không tìm thấy sản phẩm.";
    }
    container.innerHTML = "";
    return;
  }

  if (status) {
    status.hidden = false;
    status.textContent = "Đang tải sản phẩm…";
  }
  container.innerHTML = `<div class="detail-skeleton" aria-hidden="true"></div>`;

  try {
    const product = await fetchProductById(id);
    if (status) status.hidden = true;
    document.title = `${product.title} — ShopLite`;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.title;
    renderProductDetail(product, container);
  } catch (error) {
    console.error(error);
    container.innerHTML = "";
    if (status) {
      status.hidden = false;
      status.textContent = "Không tải được sản phẩm. Vui lòng thử lại.";
    }
  }
}

void initProductDetailPage();
