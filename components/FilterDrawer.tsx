"use client";

import { useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterState = {
    sort: string;
    price: [number, number];
    sizes: string[];
    colors: string[];
    categories: string[];
    badges: string[];
};

export const defaultFilters = (priceMax: number): FilterState => ({
    sort: "recommend",
    price: [0, priceMax],
    sizes: [],
    colors: [],
    categories: [],
    badges: [],
});

const sortOptions = [
    { value: "recommend", label: "Recommended" },
    { value: "new", label: "Newest" },
    { value: "discount-high", label: "Discount: High to Low" },
    { value: "discount-low", label: "Discount: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
];

type Section = "sort" | "price" | "size" | "color" | "category" | "badge";

type Props = {
    open: boolean;
    onClose: () => void;
    value: FilterState;
    onApply: (next: FilterState) => void;
    facets: {
        priceMin: number;
        priceMax: number;
        sizes: string[];
        colors: { name: string; hex: string }[];
        categories: { value: string; label: string }[];
        badges: string[];
    };
    resultCount: number;
};

const FilterDrawer = ({ open, onClose, value, onApply, facets, resultCount }: Props) => {
    const [draft, setDraft] = useState<FilterState>(value);
    const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
        sort: true,
        price: true,
        size: true,
        color: true,
        category: false,
        badge: false,
    });

    // Re-sync draft whenever the drawer opens with the latest applied state.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (open) setDraft(value);
    }, [open, value]);

    const toggleSection = (s: Section) => setOpenSections((p) => ({ ...p, [s]: !p[s] }));

    const toggleArr = (key: "sizes" | "colors" | "categories" | "badges", v: string) => {
        setDraft((d) => {
            const arr = d[key];
            return { ...d, [key]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
        });
    };

    const activeCount = useMemo(() => {
        let n = 0;
        if (draft.sort !== "recommend") n++;
        if (draft.price[0] !== facets.priceMin || draft.price[1] !== facets.priceMax) n++;
        n += draft.sizes.length + draft.colors.length + draft.categories.length + draft.badges.length;
        return n;
    }, [draft, facets.priceMin, facets.priceMax]);

    const reset = () => setDraft(defaultFilters(facets.priceMax));

    return (
        <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-[440px] p-0 flex flex-col bg-background border-l border-border"
            >
                {/* Header */}
                <SheetHeader className="px-6 py-5 border-b border-border bg-secondary/40">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="font-serif text-2xl tracking-tight flex items-center gap-3">
                            Filter
                            {activeCount > 0 && (
                                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground text-background text-[11px] font-semibold px-2 animate-fade-up">
                                    {activeCount}
                                </span>
                            )}
                        </SheetTitle>
                    </div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mt-1">
                        Refine your selection
                    </p>
                </SheetHeader>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    {/* Sort */}
                    <Section
                        title="Sort by"
                        open={openSections.sort}
                        onToggle={() => toggleSection("sort")}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {sortOptions.map((o) => {
                                const active = draft.sort === o.value;
                                return (
                                    <button
                                        key={o.value}
                                        onClick={() => setDraft((d) => ({ ...d, sort: o.value }))}
                                        className={cn(
                                            "group relative px-3 py-2.5 text-xs font-medium tracking-wide border transition-all duration-200 text-left",
                                            active
                                                ? "border-foreground bg-foreground text-background shadow-soft"
                                                : "border-border bg-background hover:border-foreground/60 hover:-translate-y-0.5",
                                        )}
                                    >
                                        {o.label}
                                    </button>
                                );
                            })}
                        </div>
                    </Section>

                    {/* Price */}
                    <Section
                        title="Price Range"
                        open={openSections.price}
                        onToggle={() => toggleSection("price")}
                    >
                        <div className="px-1 pt-2">
                            <Slider
                                min={facets.priceMin}
                                max={facets.priceMax}
                                step={1}
                                value={draft.price}
                                onValueChange={(v) => setDraft((d) => ({ ...d, price: [v[0], v[1]] as [number, number] }))}
                                className="my-4"
                            />
                            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                                <span>${facets.priceMin}</span>
                                <span className="text-foreground font-semibold tabular-nums">
                                    ${draft.price[0]} – ${draft.price[1]}
                                </span>
                                <span>${facets.priceMax}</span>
                            </div>
                        </div>
                    </Section>

                    {/* Size */}
                    {facets.sizes.length > 0 && (
                        <Section
                            title="Size"
                            open={openSections.size}
                            onToggle={() => toggleSection("size")}
                            count={draft.sizes.length}
                        >
                            <div className="grid grid-cols-4 gap-2">
                                {facets.sizes.map((s) => {
                                    const active = draft.sizes.includes(s);
                                    return (
                                        <button
                                            key={s}
                                            onClick={() => toggleArr("sizes", s)}
                                            className={cn(
                                                "h-11 text-sm font-medium border transition-all duration-200 tabular-nums",
                                                active
                                                    ? "border-foreground bg-foreground text-background scale-[1.02]"
                                                    : "border-border bg-background hover:border-foreground hover:-translate-y-0.5",
                                            )}
                                        >
                                            {s}
                                        </button>
                                    );
                                })}
                            </div>
                        </Section>
                    )}

                    {/* Color */}
                    {facets.colors.length > 0 && (
                        <Section
                            title="Color"
                            open={openSections.color}
                            onToggle={() => toggleSection("color")}
                            count={draft.colors.length}
                        >
                            <div className="flex flex-wrap gap-3">
                                {facets.colors.map((c) => {
                                    const active = draft.colors.includes(c.name);
                                    return (
                                        <button
                                            key={c.name}
                                            onClick={() => toggleArr("colors", c.name)}
                                            title={c.name}
                                            className="group relative flex flex-col items-center gap-1.5"
                                        >
                                            <span
                                                className={cn(
                                                    "relative h-10 w-10 rounded-full border transition-all duration-200 group-hover:scale-110",
                                                    active
                                                        ? "ring-2 ring-foreground ring-offset-2 ring-offset-background border-transparent"
                                                        : "border-border",
                                                )}
                                                style={{ backgroundColor: c.hex }}
                                            >
                                                {active && (
                                                    <Check
                                                        className={cn(
                                                            "absolute inset-0 m-auto h-4 w-4",
                                                            isLight(c.hex) ? "text-foreground" : "text-background",
                                                        )}
                                                        strokeWidth={3}
                                                    />
                                                )}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                                {c.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </Section>
                    )}

                    {/* Category */}
                    {facets.categories.length > 0 && (
                        <Section
                            title="Category"
                            open={openSections.category}
                            onToggle={() => toggleSection("category")}
                            count={draft.categories.length}
                        >
                            <div className="flex flex-wrap gap-2">
                                {facets.categories.map((c) => {
                                    const active = draft.categories.includes(c.value);
                                    return (
                                        <button
                                            key={c.value}
                                            onClick={() => toggleArr("categories", c.value)}
                                            className={cn(
                                                "px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-all duration-200",
                                                active
                                                    ? "border-foreground bg-foreground text-background"
                                                    : "border-border bg-background hover:border-foreground",
                                            )}
                                        >
                                            {c.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </Section>
                    )}

                    {/* Badge / Characteristic */}
                    {facets.badges.length > 0 && (
                        <Section
                            title="Characteristic"
                            open={openSections.badge}
                            onToggle={() => toggleSection("badge")}
                            count={draft.badges.length}
                        >
                            <div className="flex flex-wrap gap-2">
                                {facets.badges.map((b) => {
                                    const active = draft.badges.includes(b);
                                    return (
                                        <button
                                            key={b}
                                            onClick={() => toggleArr("badges", b)}
                                            className={cn(
                                                "px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-all duration-200",
                                                active
                                                    ? "border-foreground bg-foreground text-background"
                                                    : "border-border bg-background hover:border-foreground",
                                            )}
                                        >
                                            {b}
                                        </button>
                                    );
                                })}
                            </div>
                        </Section>
                    )}

                    <div className="h-4" />
                </div>

                {/* Sticky footer */}
                <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 py-4 flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={reset}
                        className="flex-1 rounded-none h-12 border-foreground/30 hover:border-foreground hover:bg-secondary"
                    >
                        <X className="h-4 w-4 mr-1.5" /> Clear
                    </Button>
                    <Button
                        onClick={() => { onApply(draft); onClose(); }}
                        className="flex-[1.4] rounded-none h-12 bg-foreground text-background hover:bg-foreground/90 transition-all"
                    >
                        Apply <span className="ml-2 opacity-80 tabular-nums">({resultCount})</span>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

const Section = ({
    title,
    open,
    onToggle,
    count,
    children,
}: {
    title: string;
    open: boolean;
    onToggle: () => void;
    count?: number;
    children: React.ReactNode;
}) => (
    <div className="border-b border-border last:border-b-0">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-6 py-4 group"
        >
            <span className="flex items-center gap-2.5">
                <span className="font-serif text-lg tracking-tight">{title}</span>
                {count != null && count > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-semibold px-1.5">
                        {count}
                    </span>
                )}
            </span>
            <ChevronDown
                className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:text-foreground",
                    open && "rotate-180 text-foreground",
                )}
            />
        </button>
        <div
            className={cn(
                "grid transition-all duration-300 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
        >
            <div className="overflow-hidden">
                <div className="px-6 pb-5">{children}</div>
            </div>
        </div>
    </div>
);

// Quick luminance check so the check icon stays readable on any swatch.
function isLight(hex: string) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7;
}

export default FilterDrawer;
