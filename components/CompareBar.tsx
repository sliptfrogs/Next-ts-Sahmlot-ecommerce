"use client";
import { useMemo } from "react";
import { ArrowRight, GitCompareArrows, X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useProducts } from "@/hooks/use-products";
import { cn } from "@/lib/utils";

const CompareBar = () => {
    const { ids, remove, clear, open } = useCompare();
    const products = useProducts();

    const items = useMemo(
        () => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as ReturnType<typeof useProducts>,
        [ids, products],
    );

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-drawer transition-transform duration-500 ease-out",
                items.length === 0 ? "translate-y-full" : "translate-y-0",
            )}
            aria-hidden={items.length === 0}
        >
            <div className="border-t border-border bg-background/95 backdrop-blur shadow-[0_-12px_40px_-16px_hsl(var(--foreground)/0.18)]">
                <div className="container-page flex flex-wrap items-center gap-4 py-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                        <GitCompareArrows className="h-4 w-4" />
                        Compare ({items.length}/4)
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-2 min-w-0">
                        {items.map((p) => (
                            <div key={p.id} className="group relative flex items-center gap-2 border border-border bg-secondary/40 pl-1 pr-2 py-1">
                                <img src={p.image} alt="" className="h-9 w-9 object-cover" loading="lazy" />
                                <span className="hidden sm:block max-w-[140px] truncate text-xs">{p.name}</span>
                                <button
                                    type="button"
                                    aria-label={`Remove ${p.name}`}
                                    onClick={() => remove(p.id)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                        {Array.from({ length: Math.max(0, 2 - items.length) }).map((_, i) => (
                            <div key={`empty-${i}`} className="hidden md:block h-11 w-11 border border-dashed border-border" aria-hidden="true" />
                        ))}
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            type="button"
                            onClick={clear}
                            className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={open}
                            disabled={items.length < 2}
                            className={cn(
                                "inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors",
                                items.length < 2
                                    ? "bg-secondary text-muted-foreground cursor-not-allowed"
                                    : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground",
                            )}
                        >
                            Compare <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareBar;

