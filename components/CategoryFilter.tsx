"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type CategoryItem = {
    value: string;
    label: string;
    count?: number; // optional product count
};

type CategoryFilterProps = {
    categories: CategoryItem[];
    active: string;
    onChange: (value: string) => void;
};

const CategoryFilter = ({ categories, active, onChange }: CategoryFilterProps) => {
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
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    return (
        <div className="relative w-full">
            {/* Left gradient fade */}
            {showLeftShadow && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            )}

            {/* Scrollable container */}
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
                                "group relative shrink-0 text-sm sm:text-base font-medium transition-all duration-300",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground/80"
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

                            {/* Animated underline */}
                            <span
                                className={cn(
                                    "absolute -bottom-px left-0 h-[1.5px] w-full bg-foreground transition-transform duration-300",
                                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Right gradient fade */}
            {showRightShadow && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            )}
        </div>
    );
};

export default CategoryFilter;
