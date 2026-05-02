"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock } from "lucide-react";

const Checkout = () => {
    const { itemsDetailed, subtotal, clear } = useCart(); // Assuming clearCart is the function
    const router = useRouter();
    const [placed, setPlaced] = useState(false);
    const shipping = subtotal > 35 || subtotal === 0 ? 0 : 4;
    const total = subtotal + shipping;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPlaced(true);
        setTimeout(() => {
            clear();
            // Optionally redirect to a thank you page, or stay on the same page showing the message
            // router.push("/order-confirmation");
        }, 100);
    };

    if (placed) {
        return (
            <section className="container-page py-24 max-w-xl text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h1 className="mt-6 font-serif text-3xl">Thank you for your order</h1>
                <p className="mt-3 text-muted-foreground">A confirmation has been sent to your email. We can not wait for you to wear it.</p>
                <Button asChild className="mt-8 rounded-none">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </section>
        );
    }

    if (itemsDetailed.length === 0) {
        return (
            <section className="container-page py-24 max-w-xl text-center">
                <h1 className="font-serif text-3xl">Your bag is empty</h1>
                <p className="mt-3 text-muted-foreground">Add some essentials before checking out.</p>
                <Button asChild className="mt-8 rounded-none">
                    <Link href="/shop">Browse Shop</Link>
                </Button>
            </section>
        );
    }

    return (
        <section className="container-page py-12 lg:py-16">
            <h1 className="font-serif text-3xl sm:text-4xl">Checkout</h1>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]">
                <form onSubmit={onSubmit} className="space-y-10">
                    <fieldset className="space-y-4">
                        <legend className="font-serif text-xl mb-2">Contact</legend>
                        <input
                            required
                            type="email"
                            placeholder="Email"
                            className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <input
                            required
                            placeholder="Phone (e.g. +855 ...)"
                            className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </fieldset>

                    <fieldset className="space-y-4">
                        <legend className="font-serif text-xl mb-2">Delivery</legend>
                        <div className="grid grid-cols-2 gap-4">
                            <input required placeholder="First name" className="border border-border bg-background px-4 py-3 text-sm" />
                            <input required placeholder="Last name" className="border border-border bg-background px-4 py-3 text-sm" />
                        </div>
                        <input required placeholder="Street address" className="w-full border border-border bg-background px-4 py-3 text-sm" />
                        <div className="grid grid-cols-2 gap-4">
                            <input required placeholder="City (e.g. Phnom Penh)" className="border border-border bg-background px-4 py-3 text-sm" />
                            <input required placeholder="Postal code" className="border border-border bg-background px-4 py-3 text-sm" />
                        </div>
                        <select required className="w-full border border-border bg-background px-4 py-3 text-sm">
                            <option value="">Country</option>
                            <option>Cambodia</option>
                            <option>Vietnam</option>
                            <option>Thailand</option>
                            <option>Singapore</option>
                        </select>
                    </fieldset>

                    <fieldset className="space-y-4">
                        <legend className="font-serif text-xl mb-2">
                            Payment <Lock className="inline h-4 w-4 text-muted-foreground" />
                        </legend>
                        <input required placeholder="Card number" className="w-full border border-border bg-background px-4 py-3 text-sm" />
                        <div className="grid grid-cols-2 gap-4">
                            <input required placeholder="MM / YY" className="border border-border bg-background px-4 py-3 text-sm" />
                            <input required placeholder="CVC" className="border border-border bg-background px-4 py-3 text-sm" />
                        </div>
                        <p className="text-xs text-muted-foreground">Demo only — no real payment is processed.</p>
                    </fieldset>

                    <Button type="submit" size="lg" className="w-full rounded-none">
                        Place Order — ${total.toFixed(2)}
                    </Button>
                </form>

                <aside className="relative z-base lg:sticky lg:top-28 lg:self-start border border-border p-6 bg-secondary/40 h-fit">
                    <h2 className="font-serif text-xl">Order Summary</h2>
                    <ul className="mt-5 space-y-4 max-h-[360px] overflow-y-auto pr-1">
                        {itemsDetailed.map((i) => (
                            <li key={`${i.productId}-${i.size}-${i.color}`} className="flex gap-3">
                                <div className="relative h-16 w-14 overflow-hidden rounded-sm bg-secondary">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                                    <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-foreground text-[10px] text-background">
                                        {i.quantity}
                                    </span>
                                </div>
                                <div className="flex-1 text-sm">
                                    <p className="font-medium">{i.product.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {i.color} · {i.size}
                                    </p>
                                </div>
                                <p className="text-sm font-medium">${(i.product.price * i.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 border-t border-border pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-3 font-semibold text-base">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Checkout;
