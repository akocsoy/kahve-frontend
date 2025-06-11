"use client";
import "./globals.css";
import { Roboto, Pacifico } from "next/font/google";
import { Toaster } from "sonner";
import TopBar from "@/components/TopBar";
import { CartProvider } from "../contexts/CartContext";
import { useEffect } from "react";
import { ensureGuestToken } from "@/lib/utils";
import { usePathname } from "next/navigation";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ Hook burada çağrılmalı
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  useEffect(() => {
    ensureGuestToken();
  }, []);

  return (
    <html lang="tr">
      <body className={`${roboto.className} ${pacifico.variable}`}>
        <CartProvider>
          {!isAuthPage && <TopBar />}
          {children}
        </CartProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
