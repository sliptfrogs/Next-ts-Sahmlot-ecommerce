"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CartDrawer = () => {
    const { isOpen, closeCart, itemsDetailed, updateQuantity, removeItem, subtotal, count } = useCart();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [closeCart]);

    return (
        <div
            className={cn(
                "fixed inset-0 z-drawer transition-opacity duration-300",
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            aria-hidden={!isOpen}
        >
            <div className="absolute inset-0 z-overlay bg-foreground/50" onClick={closeCart} />
            <aside
                className={cn(
                    "absolute right-0 top-0 z-drawer flex h-full w-full max-w-md flex-col bg-background shadow-card transition-transform duration-300",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex items-center justify-between border-b border-border p-5">
                    <h2 className="font-serif text-xl">Your Bag ({count})</h2>
                    <button onClick={closeCart} aria-label="Close cart" className="p-1">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {itemsDetailed.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                            <p className="mt-4 font-serif text-lg">Your bag is empty</p>
                            <p className="mt-1 text-sm text-muted-foreground">Discover our latest essentials.</p>
                            <Button asChild className="mt-6" onClick={closeCart}>
                                <Link href="/shop">Shop Now</Link>
                            </Button>
                        </div>
                    ) : (
                        <ul className="space-y-5">
                            {itemsDetailed.map((item) => (
                                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                                    <Link
                                        href={`/product/${item.product.slug}`}
                                        onClick={closeCart}
                                        className="block w-20 shrink-0 overflow-hidden rounded-sm bg-secondary"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-24 w-20 object-cover"
                                            loading="lazy"
                                        />
                                    </Link>
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">{item.product.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.color} · Size {item.size}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.productId, item.size, item.color)}
                                                className="text-xs text-muted-foreground hover:text-foreground"
                                                aria-label="Remove"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="mt-auto flex items-center justify-between pt-3">
                                            <div className="flex items-center border border-border">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                                                    className="grid h-8 w-8 place-items-center hover:bg-secondary"
                                                    aria-label="Decrease"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                                                    className="grid h-8 w-8 place-items-center hover:bg-secondary"
                                                    aria-label="Increase"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {itemsDetailed.length > 0 && (
                    <div className="border-t border-border p-5 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                        <Button asChild className="w-full" size="lg" onClick={closeCart}>
                            <Link href="/checkout">Checkout — ${subtotal.toFixed(2)}</Link>
                        </Button>
                        <button onClick={closeCart} className="w-full text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
};

export default CartDrawer;
