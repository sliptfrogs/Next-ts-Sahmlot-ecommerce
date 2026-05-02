"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, GitCompareArrows, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  onQuickView?: (product: Product) => void;
};

const ProductCard = ({ product, onQuickView }: Props) => {
  const { has, toggle } = useWishlist();
  const { has: inCompare, toggle: toggleCompare } = useCompare();
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name);
  const liked = has(product.id);
  const comparing = inCompare(product.id);

  return (
    <article className="group block animate-fade-up">
      <div className="relative overflow-hidden bg-secondary aspect-[4/5] rounded-sm">
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
              product.badge === "Sale"
                ? "bg-accent text-accent-foreground"
                : product.badge === "New"
                  ? "bg-foreground text-background"
                  : "bg-background/95 text-foreground"
            )}
          >
            {product.badge}
          </span>
        )}

        {/* Quick actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="grid h-9 w-9 place-items-center rounded-full bg-background/95 text-foreground/70 hover:text-accent transition-all shadow-soft hover:scale-110"
          >
            <Heart className={cn("h-4 w-4 transition-all", liked && "fill-accent text-accent")} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product.id);
            }}
            aria-label={comparing ? "Remove from compare" : "Add to compare"}
            aria-pressed={comparing}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full transition-all shadow-soft hover:scale-110 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 duration-300",
              comparing ? "bg-foreground text-background" : "bg-background/95 text-foreground/70 hover:text-foreground"
            )}
          >
            <GitCompareArrows className="h-4 w-4" />
          </button>
        </div>

        {/* Quick view */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="inline-flex w-full items-center justify-center gap-2 bg-foreground py-2.5 text-[11px] font-semibold uppercase tracking-widest text-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Eye className="h-3.5 w-3.5" /> Quick view
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.collection}</p>
          <h3 className="mt-1 truncate font-serif text-base font-medium">
            <Link href={`/product/${product.slug}`} className="hover:text-accent transition-colors">
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex gap-1.5">
            {product.colors.slice(0, 5).map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onMouseEnter={() => setActiveColor(c.name)}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveColor(c.name);
                }}
                className={cn(
                  "h-3.5 w-3.5 rounded-full border transition-all",
                  activeColor === c.name ? "border-foreground scale-110" : "border-border"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          {product.compareAt ? (
            <>
              <p className="text-sm font-semibold text-accent">${product.price.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground line-through">${product.compareAt.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
