"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";

const demoItems = [
  { id: 1, title: "Áo thun cotton basic", price: 290000, quantity: 1 },
  { id: 2, title: "Quần jeans ống suông cao cấp", price: 680000, quantity: 1 },
];

/**
 * Client Component — gọi Route Handler POST /api/orders (thử API Day 16).
 */
export function CheckoutDemoForm() {
  const [status, setStatus] = useState<string>("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setOrderId(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: demoItems,
          customerEmail: "thanhg@shoplite.com",
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        orderId?: string;
        total?: number;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus(data.error ?? "Không tạo được đơn.");
        return;
      }

      setOrderId(data.orderId ?? null);
      setStatus(
        data.total != null
          ? `Đơn ${data.orderId} — ${formatMoney(data.total)}`
          : `Đơn ${data.orderId} đã tạo.`,
      );
    } catch {
      setStatus("Lỗi kết nối API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded-2xl border border-line bg-surface p-6"
    >
      <p className="text-sm text-ink-soft">
        Gửi đơn mẫu tới <code className="text-ink">POST /api/orders</code>
      </p>
      <ul className="mt-4 list-none space-y-2 p-0 text-sm">
        {demoItems.map((item) => (
          <li key={item.id} className="flex justify-between text-ink-soft">
            <span>{item.title}</span>
            <span>{formatMoney(item.price)}</span>
          </li>
        ))}
      </ul>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
      >
        {loading ? "Đang gửi…" : "Tạo đơn thử"}
      </button>
      {status && (
        <p className="mt-4 text-sm font-semibold text-ink" role="status">
          {status}
        </p>
      )}
      {orderId && (
        <p className="mt-1 text-xs text-muted">
          Xem chi tiết tại{" "}
          <a href={`/orders/${orderId}`} className="text-ink underline">
            /orders/{orderId}
          </a>
        </p>
      )}
    </form>
  );
}
