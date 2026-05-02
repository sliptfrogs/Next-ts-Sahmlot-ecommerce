"use client";

import { useMemo } from "react";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { useProducts } from "@/hooks/use-products";
import ProductCard from "./ProductCard";

type Props = { excludeId?: string; title?: string };

const RecentlyViewed = ({ excludeId, title = "Recently viewed" }: Props) => {
  const { ids } = useRecentlyViewed();
  const products = useProducts();
  const items = useMemo(
    () =>
      ids
        .filter((id) => id !== excludeId)
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 4) as ReturnType<typeof useProducts>,
    [ids, products, excludeId],
  );

  if (items.length === 0) return null;

  return (
    <section className="container-page py-12 lg:py-16 border-t border-border">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">For you</p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl">{title}</h2>
        </div>
      </div>
      <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
