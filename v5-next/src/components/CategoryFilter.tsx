import Link from "next/link";
import { homeHref } from "@/lib/format";

interface CategoryFilterProps {
  categories: string[];
  active?: string;
  q?: string;
}

/** Server Component — filter nằm trên URL, share/back/forward giữ được. */
export function CategoryFilter({
  categories,
  active = "",
  q = "",
}: CategoryFilterProps) {
  return (
    <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
      <li>
        <Link
          href={homeHref({ q })}
          className={
            !active
              ? "rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-white no-underline"
              : "rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft no-underline hover:text-ink"
          }
        >
          Tất cả
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Link
            href={homeHref({ q, category })}
            className={
              active === category
                ? "rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-white no-underline"
                : "rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft no-underline hover:text-ink"
            }
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
