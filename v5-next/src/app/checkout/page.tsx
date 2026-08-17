import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Đặt hàng ShopLite — họ tên, email, số điện thoại, địa chỉ.",
  robots: { index: false, follow: false },
};

const CheckoutForm = dynamic(
  () => import("@/components/CheckoutForm").then((mod) => mod.CheckoutForm),
  {
    loading: () => (
      <p className="mt-8 text-sm text-muted" aria-busy="true">
        Đang tải form thanh toán…
      </p>
    ),
  },
);

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <section aria-labelledby="checkout-title">
      <h1
        id="checkout-title"
        className="font-display text-3xl font-bold tracking-tight text-ink"
      >
        Thanh toán
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Form RHF + Zod. Server validate lại bằng cùng schema trước khi lưu đơn.
      </p>
      <CheckoutForm
        defaultEmail={session?.user?.email ?? ""}
        defaultName={session?.user?.name ?? ""}
      />
    </section>
  );
}
