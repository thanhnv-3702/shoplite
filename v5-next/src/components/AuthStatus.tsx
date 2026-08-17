"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="text-sm text-muted">…</span>
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft no-underline hover:bg-surface-muted hover:text-ink"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="max-w-28 truncate text-sm font-semibold text-ink">
        {session.user.name ?? session.user.email}
      </span>
      <button
        type="button"
        onClick={() => {
          void signOut({ callbackUrl: "/" });
        }}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-surface-muted hover:text-ink"
      >
        Đăng xuất
      </button>
    </div>
  );
}
