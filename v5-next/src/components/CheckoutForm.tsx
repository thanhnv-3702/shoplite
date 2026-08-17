"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatMoney } from "@/lib/format";
import { checkoutSchema, type CheckoutValues } from "@/schemas/checkoutSchema";
import {
  selectCartTotal,
  useCartStore,
} from "@/store/cartStore";

interface CheckoutFormProps {
  defaultEmail?: string;
  defaultName?: string;
}

export function CheckoutForm({
  defaultEmail = "",
  defaultName = "",
}: CheckoutFormProps) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: defaultName,
      email: defaultEmail,
      phone: "",
      address: "",
    },
  });

  async function onSubmit(values: CheckoutValues) {
    setServerError("");
    if (items.length === 0) {
      setServerError("Giỏ hàng đang trống.");
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          thumbnail: item.thumbnail,
        })),
      }),
    });

    const data = (await res.json()) as {
      ok?: boolean;
      error?: string;
      order?: { id: string };
    };

    if (!res.ok || !data.ok || !data.order) {
      setServerError(data.error ?? "Không đặt được hàng.");
      return;
    }

    router.replace(`/checkout/success?orderId=${data.order.id}`);
  }

  if (items.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-dashed border-line bg-surface px-4 py-10 text-center text-ink-soft">
        Giỏ hàng trống.{" "}
        <Link href="/" className="font-semibold text-ink underline">
          Tiếp tục mua sắm
        </Link>
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <form
        className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Field label="Họ tên" error={errors.name?.message}>
          <input
            className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("email")}
          />
        </Field>
        <Field label="Số điện thoại" error={errors.phone?.message}>
          <input
            type="tel"
            className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("phone")}
          />
        </Field>
        <Field label="Địa chỉ" error={errors.address?.message}>
          <textarea
            rows={3}
            className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("address")}
          />
        </Field>

        {serverError && (
          <p className="text-sm text-accent" role="alert">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
        >
          {isSubmitting ? "Đang đặt hàng…" : "Đặt hàng"}
        </button>
      </form>

      <aside className="h-fit rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-lg font-bold text-ink">Đơn hàng</h2>
        <ul className="mt-4 list-none space-y-2 p-0 text-sm text-ink-soft">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-2">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatMoney(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base font-bold text-ink">
          Tổng: {formatMoney(total)}
        </p>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
