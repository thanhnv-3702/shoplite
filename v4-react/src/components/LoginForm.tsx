import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginValues } from "../schemas/loginSchema";

export function LoginForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginValues) {
    setSubmittedEmail(values.email);
    reset();
  }

  return (
    <section
      id="login"
      aria-labelledby="login-title"
      className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5 md:p-8"
    >
      <h2 id="login-title" className="font-display text-2xl font-bold text-ink">
        Đăng nhập
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Nhập email và mật khẩu để tiếp tục mua sắm.
      </p>

      <form
        className="mt-6 flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="login-email"
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
          <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-ink">
            Mật khẩu
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            aria-invalid={errors.password ? true : undefined}
            className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-accent" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
        >
          Đăng nhập
        </button>
      </form>

      {submittedEmail && (
        <p className="mt-4 text-sm font-semibold text-ink" role="status">
          Xin chào, {submittedEmail}. Bạn đã đăng nhập thành công.
        </p>
      )}
    </section>
  );
}
