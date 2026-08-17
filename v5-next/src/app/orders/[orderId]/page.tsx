import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { formatMoney } from "@/lib/format";
import { getOrderById } from "@/lib/orderStore";

interface OrderDetailPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const session = await auth();
  const { orderId } = await params;
  const order = getOrderById(orderId);

  if (!order || order.email !== session?.user?.email) {
    notFound();
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <h2 className="font-display text-xl font-bold text-ink">
        Đơn {order.id}
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        {order.name} · {order.phone}
      </p>
      <p className="mt-1 text-sm text-ink-soft">{order.address}</p>
      <ul className="mt-4 list-none space-y-2 p-0 text-sm text-ink-soft">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>{formatMoney(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-base font-bold text-ink">
        Tổng: {formatMoney(order.total)}
      </p>
    </section>
  );
}
