import { CartView } from "@/components/CartView";

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
