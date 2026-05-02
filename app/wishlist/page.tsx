"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { Product } from "@/data/products";

const Wishlist = () => {
    const { ids, clear } = useWishlist();
    const products = useProducts();
    const [quickView, setQuickView] = useState<Product | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const items = products.filter((p) => ids.includes(p.id));

    // Don't render anything until after hydration
    if (!mounted) return null;

    return (
        <>
            <section className="border-b border-border bg-secondary/40">
                <div className="container-page py-12 lg:py-16 flex items-end justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Saved</p>
                        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Wishlist</h1>
                        <p className="mt-2 text-muted-foreground">
                            {items.length} item{items.length === 1 ? "" : "s"} saved for later.
                        </p>
                    </div>
                    {items.length > 0 && (
                        <Button variant="outline" onClick={clear} className="rounded-none">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear all
                        </Button>
                    )}
                </div>
            </section>

            <section className="container-page py-12">
                {items.length === 0 ? (
                    <div className="py-24 text-center max-w-md mx-auto">
                        <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h2 className="mt-4 font-serif text-2xl">Your wishlist is empty</h2>
                        <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it here.</p>
                        <Button asChild className="mt-6 rounded-none">
                            <Link href="/shop">Browse the shop</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
                        {items.map((p) => (
                            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                        ))}
                    </div>
                )}
            </section>
            <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
        </>
    );
};

export default Wishlist;
