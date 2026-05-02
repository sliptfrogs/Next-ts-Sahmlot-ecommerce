// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { Toaster } from "sonner";
import { Suspense } from "react";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahmlot — Natural Fiber Clothing",
  description: "Designed and made in Cambodia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <WishlistProvider>
          <CartProvider>
            <CompareProvider>
              <RecentlyViewedProvider>
                <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
                  <ClientLayout>{children}</ClientLayout>
                </Suspense>
                <Toaster position="bottom-right" richColors />
              </RecentlyViewedProvider>
            </CompareProvider>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
