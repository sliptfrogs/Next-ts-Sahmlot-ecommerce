"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, X } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

type Props = { product: Product | null; onClose: () => void };

const QuickViewModal = ({ product, onClose }: Props) => {
    const { addItem } = useCart();
    const { toggle, has } = useWishlist();
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    useEffect(() => {
        if (product) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setColor(product.colors[0]?.name ?? "");
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSize("");
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [product]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!product) return null;

    const handleAdd = () => {
        if (!size) return;
        addItem({ productId: product.id, color, size, quantity: 1 });
        onClose();
    };

    const liked = has(product.id);

    return (
        <div className="fixed inset-0 z-drawer flex items-center justify-center p-4 sm:p-6 animate-fade-up">
            <div className="absolute inset-0 z-overlay bg-foreground/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
            <div className="relative z-drawer grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 overflow-hidden bg-background shadow-card max-h-[90vh]">
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground/70 hover:text-foreground shadow-soft"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="aspect-[4/5] sm:aspect-auto bg-secondary overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col p-6 lg:p-8 overflow-y-auto">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{product.collection}</p>
                    <h2 className="mt-1 font-serif text-2xl">{product.name}</h2>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                        {product.compareAt && (
                            <span className="text-sm text-muted-foreground line-through">${product.compareAt.toFixed(2)}</span>
                        )}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{product.description}</p>

                    <div className="mt-5">
                        <p className="text-[11px] font-medium uppercase tracking-widest mb-2">
                            Color: <span className="text-muted-foreground normal-case">{color}</span>
                        </p>
                        <div className="flex gap-2">
                            {product.colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setColor(c.name)}
                                    aria-label={c.name}
                                    className={cn(
                                        "h-8 w-8 rounded-full border-2 transition-all",
                                        color === c.name ? "border-foreground scale-110" : "border-border"
                                    )}
                                    style={{ backgroundColor: c.hex }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-[11px] font-medium uppercase tracking-widest mb-2">Size</p>
                        <div className="grid grid-cols-5 gap-1.5">
                            {product.sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={cn(
                                        "h-9 border text-xs font-medium transition-colors",
                                        size === s
                                            ? "border-foreground bg-foreground text-background"
                                            : "border-border hover:border-foreground"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <Button
                            onClick={handleAdd}
                            disabled={!size}
                            size="lg"
                            className="flex-1 rounded-none text-[11px] tracking-widest uppercase"
                        >
                            {size ? "Add to bag" : "Select a size"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                            onClick={() => toggle(product.id)}
                            className="h-12 w-12 rounded-none"
                        >
                            <Heart className={cn("h-4 w-4 transition-colors", liked && "fill-accent text-accent")} />
                        </Button>
                    </div>

                    <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                    >
                        View full details <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
