import "./style.css";
import "./theme";
import { loadProductsState } from "./api";
import { addToCart, getCartCount } from "./cart";
import type { Product } from "./types";
import { filterByKeyword } from "./utils/productHelpers";
import { escapeHTML, formatMoney, setCartBadge } from "./utils/format";

type ListElements = {
  grid: HTMLElement;
  meta: HTMLElement;
  emptyState: HTMLElement;
  errorState: HTMLElement;
};

function productCardHTML(product: Product): string {
  const rating =
    typeof product.rating === "number" ? product.rating.toFixed(1) : String(product.rating);

  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="card-image-link">
        <img
          src="${product.thumbnail}"
          alt="${escapeHTML(product.title)}"
          width="400"
          height="500"
          loading="lazy"
        >
      </a>
      <div class="card-body">
        <p class="card-cat">${escapeHTML(product.category)}</p>
        <h2><a href="product.html?id=${product.id}">${escapeHTML(product.title)}</a></h2>
        <p class="price">${formatMoney(product.price)}</p>
        <p class="product-rating-text">★ ${rating}</p>
        <p class="card-cta">
          <button type="button" class="btn add-to-cart-btn" data-action="add-to-cart">
            Thêm vào giỏ
          </button>
        </p>
      </div>
    </article>
  `;
}

function skeletonHTML(count = 8): string {
  return Array.from({ length: count }, () => `
    <article class="product-card skeleton-card" aria-hidden="true">
      <div class="skeleton-image"></div>
      <div class="card-body">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line medium"></div>
      </div>
    </article>
  `).join("");
}

function renderProducts(list: Product[], elements: ListElements, totalCount: number): void {
  const { grid, meta, emptyState } = elements;
  grid.innerHTML = list.map(productCardHTML).join("");
  meta.textContent = `${list.length} / ${totalCount} sản phẩm`;
  emptyState.hidden = list.length > 0;
}

function showError(elements: ListElements, message: string): void {
  elements.grid.innerHTML = "";
  elements.meta.textContent = "";
  elements.emptyState.hidden = true;
  elements.errorState.hidden = false;
  elements.errorState.textContent = message;
}

async function initProductListPage(): Promise<void> {
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("q");
  const meta = document.getElementById("products-meta");
  const emptyState = document.getElementById("empty-state");
  const errorState = document.getElementById("error-state");
  const loadingState = document.getElementById("loading-state");

  if (
    !(grid instanceof HTMLElement) ||
    !(searchInput instanceof HTMLInputElement) ||
    !(meta instanceof HTMLElement) ||
    !(emptyState instanceof HTMLElement) ||
    !(errorState instanceof HTMLElement)
  ) {
    return;
  }

  const elements: ListElements = { grid, meta, emptyState, errorState };
  let allProducts: Product[] = [];

  setCartBadge(getCartCount());
  errorState.hidden = true;
  emptyState.hidden = true;
  if (loadingState) loadingState.hidden = false;
  grid.innerHTML = skeletonHTML();
  meta.textContent = "Đang tải sản phẩm…";

  try {
    const state = await loadProductsState();
    if (loadingState) loadingState.hidden = true;

    if (state.status === "error" || !state.data) {
      showError(elements, "Không tải được sản phẩm. Vui lòng thử lại.");
      return;
    }

    allProducts = state.data;
    renderProducts(allProducts, elements, allProducts.length);
  } catch (error) {
    if (loadingState) loadingState.hidden = true;
    console.error(error);
    showError(elements, "Không tải được sản phẩm. Vui lòng thử lại.");
    return;
  }

  searchInput.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const filtered = filterByKeyword(allProducts, target.value);
    errorState.hidden = true;
    renderProducts(filtered, elements, allProducts.length);
  });

  grid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const actionButton = target.closest('[data-action="add-to-cart"]');
    if (!actionButton) return;

    const card = actionButton.closest("[data-id]");
    const product = allProducts.find((item) => item.id === Number(card?.getAttribute("data-id")));
    if (!product) return;

    addToCart(product);
    setCartBadge(getCartCount());
  });
}

void initProductListPage();
