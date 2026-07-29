/**
 * Bootstrap Module 2 Day 1 — kiểm tra import ES module + array methods.
 * Day 2 sẽ thay bằng render DOM.
 */
import { products, getProductById } from "./data.js";
import {
  filterByKeyword,
  sortByPrice,
  getTitles,
  calcCartTotal,
  filterByMaxPrice,
} from "./utils/productHelpers.js";

function formatVnd(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

function demoArrayMethods() {
  const titles = getTitles(products);
  const affordable = filterByMaxPrice(products, 500000);
  const sortedDesc = sortByPrice(products, "desc");
  const cartSample = [
    { price: 290000, quantity: 2 },
    { price: 150000, quantity: 1 },
  ];
  const total = calcCartTotal(cartSample);

  const summary = affordable
    .filter((p) => p.rating >= 4.2)
    .map((p) => `${p.title} — ${formatVnd(p.price)}`);

  return {
    count: products.length,
    titles: titles.slice(0, 3),
    topPrice: sortedDesc[0]?.title,
    affordableCount: affordable.length,
    cartTotal: formatVnd(total),
    summary,
    product1: getProductById(1)?.title,
  };
}

const result = demoArrayMethods();

console.group("ShopLite v2-js — ES modules OK");
console.log("Sản phẩm:", result.count);
console.log("3 tên đầu:", result.titles);
console.log("Đắt nhất:", result.topPrice);
console.log("Giá ≤ 500k:", result.affordableCount);
console.log("Tổng giỏ mẫu:", result.cartTotal);
console.log("filter + map:", result.summary);
console.log("find id=1:", result.product1);
console.groupEnd();

export { demoArrayMethods, filterByKeyword, sortByPrice, products };
