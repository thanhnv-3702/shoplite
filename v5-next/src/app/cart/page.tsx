import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Giỏ hàng ShopLite — chỉnh số lượng và thanh toán.",
  robots: { index: false, follow: true },
};

const CartView = dynamic(
  () => import("@/components/CartView").then((mod) => mod.CartView),
  {
    loading: () => (
      <p className="mt-8 text-sm text-muted" aria-busy="true">
        Đang tải giỏ hàng…
      </p>
    ),
  },
);

export default function CartPage() {
  return (
    <section aria-labelledby="cart-title">
      <h1
        id="cart-title"
        className="font-display text-3xl font-bold tracking-tight text-ink"
      >
        Giỏ hàng
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Giỏ lưu trên trình duyệt (Zustand persist). Thanh toán cần đăng nhập.
      </p>
      <CartView />
    </section>
  );
}
