import { useEffect, useState } from "react";

function readProductIdFromUrl(): number | null {
  const raw = new URLSearchParams(window.location.search).get("id");
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function useProductView() {
  const [productId, setProductId] = useState<number | null>(readProductIdFromUrl);

  useEffect(() => {
    function onPopState() {
      setProductId(readProductIdFromUrl());
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function openProduct(id: number) {
    const url = new URL(window.location.href);
    url.searchParams.set("id", String(id));
    window.history.pushState({}, "", url);
    setProductId(id);
  }

  function closeProduct() {
    const url = new URL(window.location.href);
    url.searchParams.delete("id");
    window.history.pushState({}, "", url);
    setProductId(null);
  }

  return { productId, openProduct, closeProduct };
}
