"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, type ReactNode } from "react";
import { useCartStore } from "@/store/cartStore";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
