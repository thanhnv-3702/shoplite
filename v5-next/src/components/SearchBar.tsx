"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { homeHref } from "@/lib/format";

/**
 * Client Component — cập nhật URL state `?q=` (giữ `category`).
 */
export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const [value, setValue] = useState(urlQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  function handleChange(next: string) {
    setValue(next);
    const href = homeHref({ q: next, category });
    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  return (
    <form
      className="w-full"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="sr-only" htmlFor="q">
        Tìm sản phẩm
      </label>
      <input
        id="q"
        type="search"
        name="q"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Tìm sản phẩm…"
        autoComplete="off"
        className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
        aria-busy={isPending}
      />
    </form>
  );
}
