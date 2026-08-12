import { CheckoutDemoForm } from "@/components/CheckoutDemoForm";

export default function CheckoutPage() {
  return (
    <section aria-labelledby="checkout-title">
      <h1
        id="checkout-title"
        className="font-display text-3xl font-bold tracking-tight text-ink"
      >
        Thanh toán
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Route được bảo vệ bởi middleware — cần đăng nhập demo trước.
      </p>
      <CheckoutDemoForm />
    </section>
  );
}
