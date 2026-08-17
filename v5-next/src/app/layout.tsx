import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "ShopLite",
    template: "%s · ShopLite",
  },
  description: "Cửa hàng tiện ích cho mọi nhà.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
