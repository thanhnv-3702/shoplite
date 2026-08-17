"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  selectCartCount,
  selectCartTotal,
  useCartStore,
} from "@/store/cartStore";
import { formatMoney } from "@/lib/format";

export function CartBadge() {
  const [hydrated, setHydrated] = useState(false);
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const count = hydrated ? cartCount : 0;
  const total = hydrated ? cartTotal : 0;
  const cartLabel =
    count > 0
      ? `Giỏ hàng, ${count} sản phẩm, ${formatMoney(total)}`
      : "Giỏ hàng, trống";

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-line bg-bg px-2 text-lg no-underline"
      aria-label={cartLabel}
    >
      <span aria-hidden="true">🛒</span>
      {count > 0 && (
        <>
          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
            {count}
          </span>
          <span className="hidden text-xs font-semibold text-ink md:inline">
            {formatMoney(total)}
          </span>
        </>
      )}
    </Link>
  );
}
