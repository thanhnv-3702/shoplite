import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

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
        Session Auth.js (JWT cookie). Middleware chặn `/orders` và `/checkout`
        khi chưa đăng nhập.
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-muted">Đang tải…</p>}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
