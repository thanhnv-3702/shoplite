"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
}

/** Client island — gọi Zustand store. */
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;

  function handleClick() {
    if (outOfStock) return;
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      disabled={outOfStock}
      onClick={handleClick}
      className={
        outOfStock
          ? "w-full cursor-not-allowed rounded-lg bg-surface-muted px-3 py-2.5 text-sm font-semibold text-muted"
          : "w-full rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99]"
      }
    >
      {outOfStock ? "Hết hàng" : added ? "Đã thêm" : "Thêm vào giỏ"}
    </button>
  );
}
