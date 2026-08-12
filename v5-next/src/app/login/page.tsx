import { Suspense } from "react";
import { DemoLoginForm } from "@/components/DemoLoginForm";

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
        Demo cookie — bảo vệ route thật chạy ở middleware (server).
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-muted">Đang tải…</p>}>
        <DemoLoginForm />
      </Suspense>
    </section>
  );
}
