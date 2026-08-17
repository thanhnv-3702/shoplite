"use client";

import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/format";
import {
  selectCartTotal,
  useCartStore,
} from "@/store/cartStore";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore(selectCartTotal);

  if (items.length === 0) {
    return (
      <p className="mt-4 rounded-xl border border-dashed border-line bg-surface px-4 py-10 text-center text-ink-soft">
        Chưa có sản phẩm nào.{" "}
        <Link href="/" className="font-semibold text-ink underline">
          Tiếp tục mua sắm
        </Link>
      </p>
    );
  }

  return (
    <>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-semibold text-ink-soft hover:text-ink"
        >
          Xóa tất cả
        </button>
      </div>

      <ul className="mt-4 list-none space-y-4 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center"
          >
            <Link
              href={`/product/${item.id}`}
              className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-muted"
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${item.id}`}
                className="font-display text-base font-semibold text-ink no-underline hover:underline"
              >
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">
                {formatMoney(item.price)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-lg border border-line">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="px-3 py-2 text-sm font-bold text-ink"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-ink"
                >
                  +
                </button>
              </div>
              <p className="min-w-24 text-sm font-bold text-ink">
                {formatMoney(item.price * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-semibold text-accent hover:underline"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-bold text-ink">Tổng: {formatMoney(total)}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink no-underline hover:bg-surface-muted"
          >
            Tiếp tục mua
          </Link>
          <Link
            href="/checkout"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-95"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </>
  );
}
