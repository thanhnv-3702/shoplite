"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="rounded-2xl border border-line bg-surface px-5 py-12 text-center">
      <h1 className="font-display text-3xl font-bold text-ink">
        Đặt hàng thành công
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        {orderId
          ? `Mã đơn ${orderId}. Chúng tôi sẽ liên hệ để xác nhận.`
          : "Đơn hàng đã được ghi nhận."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {orderId && (
          <Link
            href={`/orders/${orderId}`}
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white no-underline"
          >
            Xem đơn
          </Link>
        )}
        <Link
          href="/"
          className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink no-underline"
        >
          Về trang chủ
        </Link>
      </div>
    </section>
  );
}
