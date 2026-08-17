"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DEMO_USER } from "@/lib/users";
import { loginSchema, type LoginValues } from "@/schemas/loginSchema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: DEMO_USER.email, password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setFormError("");
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setFormError("Email hoặc mật khẩu không đúng.");
      return;
    }

    router.replace(from);
    router.refresh();
  }

  return (
    <form
      className="mx-auto mt-8 flex max-w-sm flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
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
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-ink"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-accent" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {formError && (
        <p className="text-sm text-accent" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
      >
        {isSubmitting ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>

      <p className="text-xs text-muted">
        Tài khoản mẫu: {DEMO_USER.email} / {DEMO_USER.password}
      </p>
    </form>
  );
}
