"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { toast } from "sonner";

const KEY = "sahmlot.compare.v1";
const MAX = 4;

type Ctx = {
    ids: string[];
    has: (id: string) => boolean;
    toggle: (id: string) => void;
    remove: (id: string) => void;
    clear: () => void;
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

const CompareContext = createContext<Ctx | null>(null);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [ids, setIds] = useState<string[]>([]);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIds(JSON.parse(raw));
            }
        } catch { }
    }, []);

    useEffect(() => {
        try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { }
    }, [ids]);

    const has = useCallback((id: string) => ids.includes(id), [ids]);

    const toggle = useCallback((id: string) => {
        setIds((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            if (prev.length >= MAX) {
                toast.message(`You can compare up to ${MAX} products`, { description: "Remove one to add another." });
                return prev;
            }
            toast.success("Added to compare");
            return [...prev, id];
        });
    }, []);

    const remove = useCallback((id: string) => setIds((p) => p.filter((x) => x !== id)), []);
    const clear = useCallback(() => setIds([]), []);

    const value = useMemo(
        () => ({ ids, has, toggle, remove, clear, isOpen, open: () => setOpen(true), close: () => setOpen(false) }),
        [ids, has, toggle, remove, clear, isOpen],
    );
    return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) throw new Error("useCompare must be used within CompareProvider");
    return ctx;
};
