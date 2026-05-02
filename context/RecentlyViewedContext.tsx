"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

const KEY = "sahmlot.recentlyViewed.v1";
const MAX = 8;

type Ctx = {
  ids: string[];
  push: (id: string) => void;
  clear: () => void;
};

const RecentlyViewedContext = createContext<Ctx | null>(null);

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIds(JSON.parse(raw));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {}
  }, [ids]);

  const push = useCallback((id: string) => {
    setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, push, clear }), [ids, push, clear]);
  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
};

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
};
