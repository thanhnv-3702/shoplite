"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, type ReactNode } from "react";
import { useCartStore } from "@/store/cartStore";

/**
 * Client Provider — SessionProvider + rehydrate Zustand per browser.
 * Không tạo store ở module scope cho server (tránh rò giữa request).
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
