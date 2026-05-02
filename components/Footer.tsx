"use client";

import Link from "next/link";
import { Radio, RadioOff, Send } from "lucide-react";

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-border bg-secondary/40">
            <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link href="/" className="font-serif text-2xl font-semibold tracking-tight inline-flex items-center">
                        Sahml
                        <span className="mx-[1px] inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        t
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                        Modern Cambodian fashion. Premium shirts and essentials, designed in Phnom Penh and made to last.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-foreground hover:text-background transition-colors"
                        >
                            <Radio className="h-4 w-4" />
                        </a>
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-foreground hover:text-background transition-colors"
                        >
                            <RadioOff className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-serif text-sm uppercase tracking-widest mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/shop?cat=new" className="hover:text-foreground">New Arrivals</Link></li>
                        <li><Link href="/shop?cat=men" className="hover:text-foreground">Men</Link></li>
                        <li><Link href="/shop?cat=women" className="hover:text-foreground">Women</Link></li>
                        <li><Link href="/shop?cat=essentials" className="hover:text-foreground">Essentials</Link></li>
                        <li><Link href="/shop" className="hover:text-foreground">All Products</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-sm uppercase tracking-widest mb-4">Help</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-foreground">Shipping & Delivery</a></li>
                        <li><a href="#" className="hover:text-foreground">Returns & Exchanges</a></li>
                        <li><a href="#" className="hover:text-foreground">Size Guide</a></li>
                        <li><a href="#" className="hover:text-foreground">Care Guide</a></li>
                        <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                        <li><Link href="/admin" className="hover:text-foreground">Admin</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-sm uppercase tracking-widest mb-4">Stay in the loop</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        Subscribe for early drops, journal stories and 10% off your first order.
                    </p>
                    <form
                        className="flex items-center gap-2 border-b border-foreground/30 pb-2"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                        <button
                            type="submit"
                            aria-label="Subscribe"
                            className="text-foreground hover:text-accent transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-border">
                <div className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-6 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Sahmlot Apparel Co. Made in Phnom Penh, Cambodia.</p>
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                        <a href="#" className="hover:text-foreground">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
