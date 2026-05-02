"use client";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useProducts } from "@/hooks/use-products";
import { cn } from "@/lib/utils";

const CompareModal = () => {
    const { isOpen, close, ids, remove } = useCompare();
    const products = useProducts();
    const items = useMemo(
        () => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as ReturnType<typeof useProducts>,
        [ids, products],
    );

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [close]);

    if (!isOpen) return null;

    const allSizes = Array.from(new Set(items.flatMap((p) => p.sizes)));
    const rows: { label: string; render: (p: typeof items[number]) => React.ReactNode }[] = [
        { label: "Price", render: (p) => <span className="font-serif text-lg">${p.price.toFixed(2)}</span> },
        { label: "Collection", render: (p) => p.collection },
        {
            label: "Colors", render: (p) => (
                <div className="flex flex-wrap gap-1.5">
                    {p.colors.map((c) => (
                        <span key={c.name} className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: c.hex }} title={c.name} />
                    ))}
                </div>
            )
        },
        ...allSizes.map((sz) => ({
            label: `Size ${sz}`,
            render: (p: typeof items[number]) =>
                p.sizes.includes(sz)
                    ? <Check className="h-4 w-4 text-accent" />
                    : <Minus className="h-4 w-4 text-muted-foreground/50" />,
        })),
        { label: "Description", render: (p) => <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p> },
    ];

    return (
        <div className="fixed inset-0 z-drawer">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={close} />
            <div className="absolute inset-x-0 bottom-0 top-10 sm:top-20 bg-background overflow-y-auto animate-fade-up">
                <div className="container-page py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Side by side</p>
                            <h2 className="mt-1 font-serif text-3xl">Compare products</h2>
                        </div>
                        <button onClick={close} aria-label="Close" className="p-2 hover:bg-secondary transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className={cn("grid gap-6", `grid-cols-${Math.min(items.length, 4)}`)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
                        {items.map((p) => (
                            <div key={p.id} className="space-y-3">
                                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                                    <button
                                        onClick={() => remove(p.id)}
                                        aria-label={`Remove ${p.name}`}
                                        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/95 text-foreground hover:text-accent shadow-soft"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <Link href={`/product/${p.slug}`} onClick={close} className="block">
                                    <h3 className="font-serif text-base hover:text-accent transition-colors">{p.name}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 divide-y divide-border border-y border-border">
                        {rows.map((row) => (
                            <div key={row.label} className="grid items-start gap-6 py-4" style={{ gridTemplateColumns: `160px repeat(${items.length}, minmax(0, 1fr))` }}>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{row.label}</div>
                                {items.map((p) => (
                                    <div key={p.id} className="text-sm">{row.render(p)}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareModal;

