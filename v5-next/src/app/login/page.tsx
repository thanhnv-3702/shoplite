import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập ShopLite.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section aria-labelledby="login-title">
      <h1
        id="login-title"
        className="font-display text-3xl font-bold tracking-tight text-ink"
      >
        Đăng nhập
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Đăng nhập để thanh toán và xem đơn hàng.
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-muted">Đang tải…</p>}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
