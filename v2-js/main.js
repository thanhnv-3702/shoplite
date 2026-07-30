import { fetchProducts } from "./api.js";
import { addToCart, getCartCount } from "./cart.js";
import { filterByKeyword } from "./utils/productHelpers.js";
import { escapeHTML, formatMoney, setCartBadge } from "./utils/format.js";

function productCardHTML(product) {
  const rating = typeof product.rating === "number" ? product.rating.toFixed(1) : product.rating;

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
        <p class="product-rating-text">Rating ${rating}/5</p>
        <p class="card-cta">
          <button type="button" class="btn add-to-cart-btn" data-action="add-to-cart">
            Thêm vào giỏ
          </button>
        </p>
      </div>
    </article>
  `;
}

function skeletonHTML(count = 8) {
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

function renderProducts(list, elements, totalCount) {
  const { grid, meta, emptyState } = elements;
  grid.innerHTML = list.map(productCardHTML).join("");
  meta.textContent = `${list.length} / ${totalCount} sản phẩm`;
  emptyState.hidden = list.length > 0;
}

function showError(elements, message) {
  elements.grid.innerHTML = "";
  elements.meta.textContent = "";
  elements.emptyState.hidden = true;
  elements.errorState.hidden = false;
  elements.errorState.textContent = message;
}

async function initProductListPage() {
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("q");
  const meta = document.getElementById("products-meta");
  const emptyState = document.getElementById("empty-state");
  const errorState = document.getElementById("error-state");
  const loadingState = document.getElementById("loading-state");

  if (!grid || !searchInput || !meta || !emptyState || !errorState) return;

  const elements = { grid, meta, emptyState, errorState };
  let allProducts = [];

  setCartBadge(getCartCount());
  errorState.hidden = true;
  emptyState.hidden = true;
  if (loadingState) loadingState.hidden = false;
  grid.innerHTML = skeletonHTML();
  meta.textContent = "Đang tải sản phẩm…";

  try {
    allProducts = await fetchProducts(30);
    if (loadingState) loadingState.hidden = true;
    renderProducts(allProducts, elements, allProducts.length);
  } catch (error) {
    if (loadingState) loadingState.hidden = true;
    console.error(error);
    showError(elements, "Không tải được sản phẩm. Kiểm tra mạng rồi thử lại.");
    return;
  }

  searchInput.addEventListener("input", (event) => {
    const filtered = filterByKeyword(allProducts, event.target.value);
    errorState.hidden = true;
    renderProducts(filtered, elements, allProducts.length);
  });

  grid.addEventListener("click", (event) => {
    const actionButton = event.target.closest('[data-action="add-to-cart"]');
    if (!actionButton) return;

    const card = actionButton.closest("[data-id]");
    const product = allProducts.find((item) => item.id === Number(card?.dataset.id));
    if (!product) return;

    addToCart(product);
    setCartBadge(getCartCount());
  });
}

initProductListPage();
