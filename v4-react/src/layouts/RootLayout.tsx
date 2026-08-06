import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import type { LayoutOutletContext } from "./outletContext";

export function RootLayout() {
  const [query, setQuery] = useState("");

  const outletContext: LayoutOutletContext = { query, setQuery };

  return (
    <div className="flex min-h-full flex-col">
      <Header query={query} onQueryChange={setQuery} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <Outlet context={outletContext} />
      </main>
      <Footer />
    </div>
  );
}
