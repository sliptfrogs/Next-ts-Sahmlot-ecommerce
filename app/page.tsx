"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Leaf, Package, RotateCcw, Shield } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import QuickViewModal from "@/components/QuickViewModal";
import RecentlyViewed from "@/components/RecentlyViewed";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

export default function Home() {
  const products = useProducts();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const featured = products.slice(0, 4);
  const newIn = products.filter((p) => p.categories?.includes("new")).slice(0, 8);

  // Category data with images from /public/assets/
  const categories = [
    { img: "/assets/category-men.jpg", label: "Men", href: "/shop?cat=men" },
    { img: "/assets/category-women.jpg", label: "Women", href: "/shop?cat=women" },
    { img: "/assets/category-essentials.jpg", label: "Essentials", href: "/shop?cat=essentials" },
  ];

  return (
    <>
      <HeroSection />

      {/* CATEGORIES */}
      <section className="container-page py-16 lg:py-24">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Shop by category</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Find your fit</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium underline-offset-4 hover:underline inline-flex items-center gap-1">
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-sm bg-secondary aspect-[3/4]"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                <h3 className="font-serif text-2xl">{c.label}</h3>
                <p className="mt-1 inline-flex items-center gap-1 text-sm opacity-90">
                  Shop {c.label.toLowerCase()} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-16 lg:py-24 border-t border-border">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Bestsellers</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Loved by everyone</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium underline-offset-4 hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-secondary/50 py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src="/assets/category-essentials.jpg"
              alt="Stack of folded shirts"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The Sahmlot way</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-balance">
              Made nearby, made well, made to last.
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Every Sahmlot piece is cut and sewn in our Phnom Penh atelier. We work with mill partners across the region
              to source natural fibers — Belgian linen, Cambodian-grown cotton, organic dyes — then build small,
              considered collections that wear in beautifully.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <li className="flex items-start gap-3"><Shield className="mt-0.5 h-4 w-4 text-accent" /> Quality guarantee</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-accent" /> Natural fibers</li>
              <li className="flex items-start gap-3"><Package className="mt-0.5 h-4 w-4 text-accent" /> Local production</li>
              <li className="flex items-start gap-3"><RotateCcw className="mt-0.5 h-4 w-4 text-accent" /> Easy returns</li>
            </ul>
            <Button asChild variant="outline" size="lg" className="mt-8 rounded-none">
              <Link href="/about">Read our story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEW IN */}
      <section className="container-page py-16 lg:py-24">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Just dropped</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">New arrivals</h2>
          </div>
          <Link href="/shop?cat=new" className="text-sm font-medium underline-offset-4 hover:underline inline-flex items-center gap-1">
            See all new <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {newIn.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-border py-16 lg:py-24">
        <div className="container-page max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loved by 12,000+ customers</p>
          <blockquote className="mt-6 font-serif text-2xl sm:text-3xl lg:text-4xl leading-snug text-balance">
            “The fit, the fabric, the finish — Sahmlot has become my entire weekend wardrobe.”
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">— Sokha P., Phnom Penh</p>
          <div className="mt-8 flex justify-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </section>

      {/* Modals & Recently Viewed */}
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      <RecentlyViewed />
    </>
  );
}
