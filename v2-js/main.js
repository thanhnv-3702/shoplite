import { products, getProductById } from "./data.js";
import { filterByKeyword, sortByPrice } from "./utils/productHelpers.js";

function formatVnd(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

function escapeHTML(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function productCardHTML(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="card-image-link">
        <img
          src="${product.thumbnail}"
          alt="${escapeHTML(product.title)}"
          width="400"
          height="500"
        >
      </a>
      <div class="card-body">
        <p class="card-cat">${escapeHTML(product.category)}</p>
        <h2><a href="product.html?id=${product.id}">${escapeHTML(product.title)}</a></h2>
        <p class="price">${formatVnd(product.price)}</p>
        <p class="product-rating-text">Rating ${product.rating}/5</p>
        <p class="card-cta">
          <button type="button" class="btn add-to-cart-btn" data-action="add-to-cart">
            Thêm vào giỏ
          </button>
        </p>
      </div>
    </article>
  `;
}

function renderProducts(list, elements) {
  const { grid, meta, emptyState } = elements;
  grid.innerHTML = list.map(productCardHTML).join("");
  meta.textContent = `${list.length} / ${products.length} sản phẩm`;
  emptyState.hidden = list.length > 0;
}

function initProductPage() {
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("q");
  const meta = document.getElementById("products-meta");
  const emptyState = document.getElementById("empty-state");

  if (!grid || !searchInput || !meta || !emptyState) return;

  const elements = { grid, meta, emptyState };
  let visibleProducts = sortByPrice(products, "asc");

  renderProducts(visibleProducts, elements);

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    visibleProducts = sortByPrice(filterByKeyword(products, query), "asc");
    renderProducts(visibleProducts, elements);
  });

  grid.addEventListener("click", (event) => {
    const actionButton = event.target.closest('[data-action="add-to-cart"]');
    if (!actionButton) return;

    const card = actionButton.closest("[data-id]");
    const product = getProductById(card?.dataset.id);
    if (!product) return;

    console.log("Add to cart clicked:", product);
  });
}

initProductPage();

console.log("ShopLite v2-js — DOM render ready");

export { productCardHTML, renderProducts, filterByKeyword, sortByPrice, products };
