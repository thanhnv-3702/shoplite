"use client";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ value = "", onChange }: SearchBarProps) {
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
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Tìm sản phẩm…"
        autoComplete="off"
        className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
      />
    </form>
  );
}
