import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactValues } from "../schemas/contactSchema";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(_values: ContactValues) {
    setSent(true);
    reset();
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-form-title"
      className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5 md:p-8"
    >
      <h2 id="contact-form-title" className="font-display text-2xl font-bold text-ink">
        Liên hệ
      </h2>
      <p className="mt-1 text-sm text-ink-soft">Gửi tin nhắn — chúng tôi sẽ phản hồi sớm.</p>

      <form
        className="mt-6 flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Họ tên
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-accent" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-accent" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink">
            Nội dung
          </label>
          <textarea
            id="contact-message"
            rows={4}
            aria-invalid={errors.message ? true : undefined}
            className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-accent" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          Gửi tin nhắn
        </button>
      </form>

      {sent && (
        <p className="mt-4 text-sm font-semibold text-ink" role="status">
          Đã gửi tin nhắn. Cảm ơn bạn đã liên hệ ShopLite.
        </p>
      )}
    </section>
  );
}
