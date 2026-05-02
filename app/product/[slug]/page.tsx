"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, notFound, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/use-products"; // adjust path if needed
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { ChevronDown, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
    const { slug } = useParams() as { slug: string };
    const products = useProducts();
    const product = useMemo(() => products.find((p) => p.slug === slug), [slug, products]);
    const { addItem } = useCart();
    const { push } = useRecentlyViewed();
    const [color, setColor] = useState(product?.colors[0]?.name ?? "");
    const [size, setSize] = useState<string>("");
    const [qty, setQty] = useState(1);
    const [openSection, setOpenSection] = useState<string | null>("details");
    const router = useRouter();

    useEffect(() => {
        if (product) push(product.id);
    }, [product, push]);

    if (!product) {
        notFound(); // triggers Next.js 404 page
        return null;
    }

    const related = products.filter((p) => p.id !== product.id).slice(0, 4);

    const handleAdd = () => {
        if (!size) {
            setOpenSection("size-guide");
            return;
        }
        addItem({ productId: product.id, color, size, quantity: qty });
    };

    return (
        <>
            <section className="container-page py-8 lg:py-12">
                <nav className="text-xs text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-foreground">Home</Link>{" / "}
                    <Link href="/shop" className="hover:text-foreground">Shop</Link>{" / "}
                    <span className="text-foreground">{product.name}</span>
                </nav>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Gallery */}
                    <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
                        <div className="hidden sm:flex flex-col gap-3">
                            {[product.image, product.image, product.image].map((src, i) => (
                                <button key={i} className="aspect-square overflow-hidden rounded-sm bg-secondary border border-border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                                </button>
                            ))}
                        </div>
                        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt={product.name} width={800} height={1000} className="h-full w-full object-cover" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="relative z-base lg:sticky lg:top-28 lg:self-start">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{product.collection}</p>
                        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{product.name}</h1>
                        <div className="mt-3 flex items-baseline gap-3">
                            <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                            {product.compareAt && (
                                <span className="text-base text-muted-foreground line-through">${product.compareAt.toFixed(2)}</span>
                            )}
                            {product.compareAt && (
                                <span className="text-xs uppercase tracking-widest text-accent">Save ${(product.compareAt - product.price).toFixed(2)}</span>
                            )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Tax included. Shipping at checkout.</p>

                        <p className="mt-6 text-muted-foreground">{product.description}</p>

                        {/* Color */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium uppercase tracking-widest">Color: <span className="text-muted-foreground normal-case tracking-normal">{color}</span></p>
                            </div>
                            <div className="mt-3 flex gap-2">
                                {product.colors.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setColor(c.name)}
                                        aria-label={c.name}
                                        className={cn(
                                            "h-10 w-10 rounded-full border-2 transition-all",
                                            color === c.name ? "border-foreground scale-105" : "border-border",
                                        )}
                                        style={{ backgroundColor: c.hex }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium uppercase tracking-widest">Size</p>
                                <button className="text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground">Size Guide</button>
                            </div>
                            <div className="mt-3 grid grid-cols-5 gap-2">
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={cn(
                                            "h-11 border text-sm font-medium transition-colors",
                                            size === s
                                                ? "border-foreground bg-foreground text-background"
                                                : "border-border hover:border-foreground",
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            {!size && <p className="mt-2 text-xs text-muted-foreground">Please select a size</p>}
                        </div>

                        {/* Qty + Add */}
                        <div className="mt-6 flex items-stretch gap-3">
                            <div className="flex items-center border border-border">
                                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:bg-secondary" aria-label="Decrease">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center font-medium">{qty}</span>
                                <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center hover:bg-secondary" aria-label="Increase">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                            <Button onClick={handleAdd} size="lg" className="flex-1 rounded-none h-12 text-sm uppercase tracking-widest">
                                Add to bag — ${(product.price * qty).toFixed(2)}
                            </Button>
                        </div>

                        {/* Perks */}
                        <ul className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                            <li className="flex flex-col items-center gap-2 border border-border p-3 text-center">
                                <Truck className="h-4 w-4" /> Free shipping $35+
                            </li>
                            <li className="flex flex-col items-center gap-2 border border-border p-3 text-center">
                                <RotateCcw className="h-4 w-4" /> 14-day returns
                            </li>
                            <li className="flex flex-col items-center gap-2 border border-border p-3 text-center">
                                <Shield className="h-4 w-4" /> Quality guaranteed
                            </li>
                        </ul>

                        {/* Accordions */}
                        <div className="mt-8 divide-y divide-border border-y border-border">
                            {[
                                {
                                    id: "details", label: "Details & Materials", body: (
                                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                            {product.details.map((d) => <li key={d}>{d}</li>)}
                                        </ul>
                                    )
                                },
                                {
                                    id: "shipping", label: "Shipping & Returns", body: (
                                        <p className="text-sm text-muted-foreground">Free standard shipping across Cambodia on orders over $35. International shipping available at checkout. Returns accepted within 14 days of delivery in original condition.</p>
                                    )
                                },
                                {
                                    id: "care", label: "Care", body: (
                                        <p className="text-sm text-muted-foreground">Machine wash cold with similar colors. Tumble dry low or hang to dry. Do not bleach. Iron on medium heat if needed.</p>
                                    )
                                },
                            ].map((s) => (
                                <div key={s.id}>
                                    <button
                                        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium uppercase tracking-widest"
                                        onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                                    >
                                        {s.label}
                                        <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === s.id && "rotate-180")} />
                                    </button>
                                    {openSection === s.id && <div className="pb-5">{s.body}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-page py-16 lg:py-24 border-t border-border mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl mb-8">You may also like</h2>
                <div className="grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
                    {related.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            <RecentlyViewed excludeId={product.id} />
        </>
    );
};

export default ProductDetail;
