import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import { Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";

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
            <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
              <AnnouncementBar/>
              <Header />
            </Suspense>
            <main className="flex-1">
              {children}
            </main>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
