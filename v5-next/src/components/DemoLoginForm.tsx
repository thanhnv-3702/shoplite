"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DEMO_SESSION_VALUE, SESSION_COOKIE } from "@/lib/auth";

/**
 * Client Component — đăng nhập demo (set cookie giả).
 * Auth thật sẽ thay bằng Auth.js ở Day 17.
 */
export function DemoLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/orders";
  const [email, setEmail] = useState("thanhg@shoplite.com");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      setMessage("Email không hợp lệ.");
      return;
    }

    // Cookie demo — middleware đọc ở server trước khi vào /orders, /checkout
    document.cookie = `${SESSION_COOKIE}=${DEMO_SESSION_VALUE}; path=/; max-age=86400; SameSite=Lax`;
    setMessage("Đã đăng nhập (demo). Đang chuyển hướng…");
    router.replace(from);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-sm flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
    >
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95"
      >
        Đăng nhập demo
      </button>
      {message && (
        <p className="text-sm text-ink-soft" role="status">
          {message}
        </p>
      )}
      <p className="text-xs text-muted">
        Middleware kiểm tra cookie <code>{SESSION_COOKIE}</code> trước khi vào
        /orders và /checkout.
      </p>
    </form>
  );
}
