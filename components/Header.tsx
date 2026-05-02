"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { megaMenus } from "@/data/menu";
import { cn } from "@/lib/utils";

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <Link
    href="/"
    onClick={onClick}
    className="font-serif text-xl font-semibold tracking-tight inline-flex items-center"
    aria-label="Sahmlot home"
  >
    Sahml
    <span className="mx-[1px] inline-block h-1.5 w-1.5 rounded-full bg-accent" />
    t
  </Link>
);

const Header = () => {
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // 👈 client‑only flag
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // After mount, allow client‑only content to render
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const routeActiveId = (() => {
    if (pathname !== "/shop") return null;
    const cat = searchParams.get("cat");
    const collection = searchParams.get("collection");
    const q = searchParams.get("q");
    if (q === "sale") return "sale";
    if (cat === "new") return "new";
    if (cat === "men") return "men";
    if (cat === "women") return "women";
    if (collection) return "collections";
    return "clothing";
  })();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const lock = mobileOpen || activeMenu !== null;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, activeMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const enterMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };
  const leaveMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          "z-50 shadow-sm"
        )}
      >
        <div className="container-page flex h-14 items-center justify-between gap-4 lg:h-16">
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 flex justify-center lg:flex-none lg:justify-start">
            <Logo />
          </div>

          {/* Desktop navigation – removed onClick that closes menu */}
          <nav className="hidden lg:flex items-center" aria-label="Primary" onMouseLeave={leaveMenu}>
            {megaMenus.map((m) => {
              const isHover = activeMenu === m.id;
              const isRouteActive = routeActiveId === m.id;
              const isActive = isHover || isRouteActive;
              return (
                <div
                  key={m.id}
                  className="relative"
                  onMouseEnter={() => enterMenu(m.id)}
                  onFocus={() => enterMenu(m.id)}
                >
                  <Link
                    href={m.to}
                    aria-current={isRouteActive ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-200",
                      m.accent
                        ? "text-accent"
                        : isActive
                          ? "text-foreground"
                          : "text-foreground/65 hover:text-foreground"
                    )}
                  >
                    <span className="relative">
                      {m.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-center bg-current transition-transform duration-300 ease-out",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </span>
                    {m.columns?.length > 0 && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-all duration-300 ease-out",
                          isHover ? "rotate-180 opacity-90" : "opacity-50"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" aria-label="Search" className="h-9 w-9 text-foreground/70 hover:text-foreground" onClick={() => setSearchOpen((s) => !s)}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex h-9 w-9 text-foreground/70 hover:text-foreground">
              <User className="h-4 w-4" />
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Wishlist" className="relative h-9 w-9 text-foreground/70 hover:text-foreground">
              <Link href="/wishlist">
                <Heart className="h-4 w-4" />
                {/* Only render badge after mount to avoid hydration mismatch */}
                {mounted && wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                    {wishCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" onClick={openCart} className="relative h-9 w-9 text-foreground/70 hover:text-foreground">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mega-menu panel (desktop) – removed onClick close from internal links */}
        <div
          className={cn(
            "absolute left-0 right-0 top-full hidden lg:block border-b border-border bg-background origin-top",
            "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "shadow-[0_24px_48px_-24px_hsl(var(--foreground)/0.18)]",
            activeMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
          )}
          onMouseEnter={() => activeMenu && enterMenu(activeMenu)}
          onMouseLeave={leaveMenu}
        >
          {megaMenus.map((m) => {
            if (m.id !== activeMenu || !m.columns) return null;
            return (
              <div key={m.id} className="container-page py-10">
                <div className={cn("grid gap-12", m.feature ? "lg:grid-cols-[1fr_320px]" : "grid-cols-1")}>
                  <div
                    className="grid gap-x-10 gap-y-8"
                    style={{ gridTemplateColumns: `repeat(${Math.min(m.columns.length, 4)}, minmax(0, 1fr))` }}
                  >
                    {m.columns.map((col, idx) => (
                      <div key={col.heading} className="animate-fade-up" style={{ animationDelay: `${idx * 70}ms`, animationFillMode: "backwards" }}>
                        <div className="flex items-center gap-2 mb-5">
                          <span className="h-px w-5 bg-foreground/40" />
                          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{col.heading}</p>
                        </div>
                        <ul className="space-y-0.5">
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link
                                href={l.to}
                                className="group flex items-center gap-2 py-2 text-[13.5px] text-foreground/75 hover:text-foreground transition-colors"
                              >
                                <span className="relative">
                                  {l.label}
                                  <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                </span>
                                {l.tag && (
                                  <span
                                    className={cn(
                                      "rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em]",
                                      l.tag === "new" ? "bg-foreground text-background" : "bg-accent/15 text-accent"
                                    )}
                                  >
                                    {l.tag}
                                  </span>
                                )}
                                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover:opacity-60 group-hover:translate-x-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {m.feature && (
                    <Link
                      href={m.feature.to}
                      className="group relative block overflow-hidden rounded-sm bg-secondary aspect-[4/5] animate-fade-up"
                      style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
                    >
                      <img
                        src={m.feature.image}
                        alt={m.feature.title}
                        loading="lazy"
                        width={800}
                        height={1024}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end text-background">
                        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-background/15 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.28em]">
                          <span className="h-1 w-1 rounded-full bg-background animate-pulse" />
                          Featured
                        </span>
                        <h4 className="mt-3 font-serif text-2xl leading-tight">{m.feature.title}</h4>
                        <p className="mt-1.5 text-xs opacity-90 leading-relaxed">{m.feature.copy}</p>
                        <p className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] font-medium">
                          {m.feature.cta}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border bg-background animate-fade-up">
            <form onSubmit={submitSearch} className="container-page flex items-center gap-3 py-3">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shirts, polos, linen…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search products"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer – unchanged */}
      <div
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-overlay bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-drawer h-full w-[85%] max-w-[340px] bg-background flex flex-col lg:hidden shadow-card",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Logo onClick={() => setMobileOpen(false)} />
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          {megaMenus.map((m) => {
            const open = mobileExpanded === m.id;
            const isRouteActive = routeActiveId === m.id;
            if (!m.columns) return null;
            return (
              <div key={m.id} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => setMobileExpanded(open ? null : m.id)}
                  className={cn(
                    "flex items-center justify-between w-full py-4 text-sm font-medium uppercase tracking-[0.2em] transition-colors",
                    m.accent ? "text-accent" : open || isRouteActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full bg-current transition-all duration-300",
                        open || isRouteActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      )}
                    />
                    {m.label}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", open && "rotate-180 text-foreground")} />
                </button>
                {open && (
                  <div className="pb-5 pl-4 space-y-4 animate-accordion-down">
                    {m.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-2">{col.heading}</p>
                        <ul className="space-y-0.5 border-l border-border/60 pl-3">
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link
                                href={l.to}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 py-2 text-sm text-foreground/75 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                              >
                                {l.label}
                                {l.tag && (
                                  <span
                                    className={cn(
                                      "rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em]",
                                      l.tag === "new" ? "bg-foreground text-background" : "bg-accent/15 text-accent"
                                    )}
                                  >
                                    {l.tag}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-border space-y-2">
          <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-foreground/75 hover:text-foreground">
            <Heart className="h-4 w-4" /> Wishlist {mounted && wishCount > 0 && `(${wishCount})`}
          </Link>
          <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-foreground/75 hover:text-foreground">
            <User className="h-4 w-4" /> Admin
          </Link>
          <p className="pt-2 text-[10px] text-muted-foreground tracking-wide">Made in Cambodia · Natural fibers</p>
        </div>
      </aside>
    </>
  );
};

export default Header;
