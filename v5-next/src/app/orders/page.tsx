import Link from "next/link";
import { auth } from "@/auth";
import { formatMoney } from "@/lib/format";
import { getOrdersByEmail } from "@/lib/orderStore";

export default async function OrdersPage() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const orders = email ? getOrdersByEmail(email) : [];

  if (orders.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-line bg-surface p-5 md:p-6">
        <h2 className="font-display text-xl font-bold text-ink">
          Chưa có đơn hàng
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Bạn chưa đặt đơn nào.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-semibold text-ink underline"
        >
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Đơn của tôi</h2>
      <ul className="mt-4 list-none space-y-2 p-0">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/orders/${order.id}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 text-sm no-underline hover:bg-surface-muted"
            >
              <span className="font-semibold text-ink">{order.id}</span>
              <span className="text-ink-soft">{formatMoney(order.total)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
