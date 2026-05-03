'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { useProducts } from '@/hooks/use-products';
import { Category, categoryMeta, collections, Product } from '@/data/products';
import FilterDrawer, { defaultFilters, FilterState } from '@/components/FilterDrawer';

// -----------------------------------------------------------------------------
// CategoryFilter – horizontal scroll with animated underline
// -----------------------------------------------------------------------------
type CategoryItem = {
    value: string;
    label: string;
    count?: number;
};

const CategoryFilter = ({
    categories,
    active,
    onChange,
}: {
    categories: CategoryItem[];
    active: string;
    onChange: (value: string) => void;
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftShadow(scrollLeft > 10);
        setShowRightShadow(scrollLeft + clientWidth < scrollWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return (
        <div className="relative w-full">
            {showLeftShadow && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            )}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto scrollbar-hide gap-6 sm:gap-8 pb-3 -mb-3"
            >
                {categories.map((cat) => {
                    const isActive = active === cat.value;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => onChange(cat.value)}
                            className={cn(
                                'group relative shrink-0 text-sm sm:text-base cursor-pointer font-medium transition-all duration-300',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                isActive
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground/80'
                            )}
                        >
                            <span className="flex items-center gap-1.5 py-2">
                                {cat.label}
                                {cat.count !== undefined && (
                                    <span className="text-[11px] font-normal text-muted-foreground/60">
                                        ({cat.count})
                                    </span>
                                )}
                            </span>
                            <span
                                className={cn(
                                    'absolute -bottom-px left-0 h-[1.5px] w-full bg-foreground transition-transform duration-300',
                                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                )}
                            />
                        </button>
                    );
                })}
            </div>
            {showRightShadow && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            )}
        </div>
    );
};

// -----------------------------------------------------------------------------
// Sort options & categories data
// -----------------------------------------------------------------------------
const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Alphabetical' },
];

const allCats: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'new', label: categoryMeta.new.label },
    { value: 'men', label: categoryMeta.men.label },
    { value: 'women', label: categoryMeta.women.label },
    { value: 'essentials', label: categoryMeta.essentials.label },
];

// -----------------------------------------------------------------------------
// Shop Component
// -----------------------------------------------------------------------------
const Shop = () => {
    const products = useProducts();
    const params = useSearchParams();
    const router = useRouter();

    const [sort, setSort] = useState('featured');
    const [quickView, setQuickView] = useState<Product | null>(null);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>(() => {
        // Dynamically get max price from products (or fallback to 500)
        const maxPrice = products.length > 0
            ? Math.max(...products.map(p => p.price))
            : 500;
        return defaultFilters(maxPrice);
    });

    const cat = (params.get('cat') as Category | null) || 'all';
    const q = params.get('q')?.toLowerCase().trim() || '';
    const collection = params.get('collection')?.toLowerCase() || '';

    // Filter & sort logic (currently using URL params; later integrate `filters` state)
    const filtered = useMemo(() => {
        let list = products.slice();
        if (cat !== 'all') list = list.filter((p) => p.categories.includes(cat as Category));
        if (collection) {
            const target = collections.find((c) => c.slug === collection);
            if (target) list = list.filter((p) => p.collection === target.name);
        }
        if (q) {
            const tokens = q.split(/\s+/).filter(Boolean);
            list = list.filter((p) => {
                const hay = `${p.name} ${p.collection} ${p.description} ${p.badge ?? ''}`.toLowerCase();
                return tokens.every((t) => hay.includes(t));
            });
        }
        switch (sort) {
            case 'price-asc':
                list.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                list.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                list.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        return list;
    }, [cat, q, collection, sort, products]);

    const updateParams = (updates: Record<string, string | null>, replace = true) => {
        const next = new URLSearchParams(params.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === 'all') next.delete(key);
            else next.set(key, value);
        });
        const url = `/shop${next.toString() ? `?${next.toString()}` : ''}`;
        if (replace) router.replace(url);
        else router.push(url);
    };

    const setCat = (value: string) => {
        updateParams({ cat: value === 'all' ? null : value });
    };

    const clearFilter = (key: string) => {
        updateParams({ [key]: null });
    };

    const resetAllFilters = () => {
        updateParams({ cat: null, q: null, collection: null });
    };

    const collectionLabel = collection ? collections.find((c) => c.slug === collection)?.name : null;
    const heading =
        cat !== 'all'
            ? categoryMeta[cat as Category]?.label
            : collectionLabel || 'All Products';
    const subheading =
        cat !== 'all'
            ? categoryMeta[cat as Category]?.description
            : collectionLabel
                ? collections.find((c) => c.slug === collection)?.tagline
                : 'Every Sahmlot piece, in one place.';

    const categoriesWithCounts = allCats.map((catItem) => ({
        ...catItem,
        count:
            catItem.value === 'all'
                ? products.length
                : products.filter((p) => p.categories.includes(catItem.value as Category)).length,
    }));

    // Build facets dynamically from product data
    const facets = useMemo(() => {
        const allSizes = new Set<string>();
        const allColors: { name: string; hex: string }[] = [];
        const allCategories = new Set<string>();
        const allBadges = new Set<string>();
        let priceMin = Infinity;
        let priceMax = -Infinity;

        products.forEach((p) => {
            priceMin = Math.min(priceMin, p.price);
            priceMax = Math.max(priceMax, p.price);
            p.sizes.forEach(s => allSizes.add(s));
            p.colors.forEach(c => {
                if (!allColors.some(ex => ex.name === c.name)) {
                    allColors.push({ name: c.name, hex: c.hex });
                }
            });
            p.categories.forEach(c => allCategories.add(c));
            if (p.badge) allBadges.add(p.badge);
        });

        return {
            priceMin: priceMin === Infinity ? 0 : priceMin,
            priceMax: priceMax === -Infinity ? 500 : priceMax,
            sizes: Array.from(allSizes).sort(),
            colors: allColors,
            categories: Array.from(allCategories).map(c => ({ value: c, label: categoryMeta[c as Category]?.label || c })),
            badges: Array.from(allBadges),
        };
    }, [products]);

    return (
        <>
            <section className="border-b border-border bg-secondary/40">
                <div className="container-page py-12 lg:py-16">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Shop</p>
                    <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{heading}</h1>
                    <p className="mt-2 text-muted-foreground max-w-xl">{subheading}</p>

                    {(q || collection) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                            {q && (
                                <button
                                    onClick={() => clearFilter('q')}
                                    className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1 hover:border-foreground"
                                >
                                    Search: <span className="font-semibold">{q}</span> <X className="h-3 w-3" />
                                </button>
                            )}
                            {collectionLabel && (
                                <button
                                    onClick={() => clearFilter('collection')}
                                    className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1 hover:border-foreground"
                                >
                                    Collection: <span className="font-semibold">{collectionLabel}</span> <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="container-page py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                    <div className="w-full md:flex-1">
                        <CategoryFilter
                            categories={categoriesWithCounts}
                            active={cat}
                            onChange={setCat}
                        />
                    </div>

                    <div className="flex items-center gap-3 text-sm ml-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilterDrawerOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filter
                        </Button>

                        <span className="text-muted-foreground">{filtered.length} items</span>
                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="appearance-none border border-border bg-background py-2 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring rounded"
                            >
                                {sortOptions.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                        </div>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <h2 className="font-serif text-2xl">Nothing matches yet</h2>
                        <p className="mt-2 text-muted-foreground">Try a different filter or clear your search.</p>
                        <Button onClick={resetAllFilters} className="mt-6 rounded-none">Reset filters</Button>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-x-4 gap-y-10 grid-cols-2 lg:grid-cols-4">
                        {filtered.map((p) => (
                            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                        ))}
                    </div>
                )}
            </section>

            <FilterDrawer
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
                value={filters}
                onApply={(newFilters) => {
                    setFilters(newFilters);
                    // TODO: integrate newFilters into the product filtering logic
                    // e.g., update URL params or refetch products based on price, sizes, colors, etc.
                    setFilterDrawerOpen(false);
                }}
                facets={facets}
                resultCount={filtered.length}
            />

            <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
        </>
    );
};

export default Shop;
