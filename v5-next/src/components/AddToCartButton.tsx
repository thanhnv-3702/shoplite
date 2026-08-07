"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

/**
 * Client Component — cần onClick + useState.
 * Store Zustand/Auth sẽ gắn ở Day 17; tạm phản hồi UI tại chỗ.
 */
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;

  function handleClick() {
    if (outOfStock) return;
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
