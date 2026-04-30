"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Heart, Menu, Search, ShoppingBag, User, X, ChevronDown, ArrowRight,
  Shirt, Layers, Wind, Leaf, Sparkles, Gift, Tag, Star, Package,
  Palette, Sun, Droplets, Feather, Gem, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { megaMenus } from "@/data/menu";
import { cn } from "@/lib/utils";
import FocusTrap from "focus-trap-react";

// ─── Types (extend the imported menu structure) ─────────────────────────────
interface MenuLink {
  label: string;
  to: string;
  icon?: string;
}

interface MenuColumn {
  heading: string;
  links: MenuLink[];
}

interface MegaMenuItem {
  id: string;
  label: string;
  to: string;
  accent?: boolean;
  columns: MenuColumn[];
  hero?: {
    image: string;
    caption: string;
    sub: string;
    to: string;
  };
}

const typedMegaMenus = megaMenus as MegaMenuItem[];

// ─── Icon registry ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  shirt: Shirt,
  layers: Layers,
  wind: Wind,
  leaf: Leaf,
  sparkles: Sparkles,
  gift: Gift,
  tag: Tag,
  star: Star,
  package: Package,
  palette: Palette,
  sun: Sun,
  droplets: Droplets,
  feather: Feather,
  gem: Gem,
  clock: Clock,
};

const NavIcon = ({ name, className }: { name?: string; className?: string }) => {
  const Icon = name && ICON_MAP[name] ? ICON_MAP[name] : Layers;
  return <Icon className={className} aria-hidden="true" />;
};

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = ({ onClick }: { onClick?: () => void }) => (
  <Link
    href="/"
    onClick={onClick}
    className="flex items-center font-serif text-lg font-semibold tracking-tight lg:text-xl"
    aria-label="Sahmlot home"
  >
    Sahml
    <span className="inline-block h-2 w-2 rounded-full border-2 border-amber-400 mx-0.5" aria-hidden="true" />
    t
  </Link>
);

// ─── Count badge ──────────────────────────────────────────────────────────────
const CountBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span
      className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-[9px] font-semibold text-black"
      aria-label={`${count} item${count > 1 ? "s" : ""}`}
    >
      {count}
    </span>
  ) : null;

// ─── Announcement bar (FIXED) ─────────────────────────────────────────────────
const ANNOUNCE_KEY = "sahmlot_announce_v2";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!sessionStorage.getItem(ANNOUNCE_KEY)) setVisible(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(ANNOUNCE_KEY, "1");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div role="banner" className="relative flex items-center justify-center bg-amber-400 px-8 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-black">
      <span>Free shipping on orders over $75 &mdash; Cambodia-made, naturally.</span>
      <button onClick={dismiss} aria-label="Dismiss announcement" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

// ─── Mega menu panel ──────────────────────────────────────────────────────────
const MegaPanel = ({
  menu,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  menu: MegaMenuItem | null;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const hero = menu?.hero;
  const heroImage = hero?.image ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80";
  const heroCaption = hero?.caption ?? menu?.label ?? "Explore";
  const heroSub = hero?.sub ?? "Discover the collection";
  const heroTo = hero?.to ?? menu?.to ?? "/shop";

  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-full z-50 hidden lg:block",
        "transition-all duration-200 ease-out",
        menu
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full bg-white border-t border-gray-100 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)]">
        <div className="container-page">
          <div className="flex" style={{ minHeight: 360 }}>

            {/* Left: icon link columns */}
            <div className="flex flex-1 gap-10 py-10 pr-12">
              {menu?.columns?.map((col) => (
                <div key={col.heading} className="min-w-[150px]">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="block w-3 h-[1.5px] bg-amber-400 rounded-full flex-shrink-0" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400 whitespace-nowrap">
                      {col.heading}
                    </p>
                  </div>

                  <ul className="space-y-0.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.to}
                          onClick={onClose}
                          className="group flex items-center gap-3 rounded-lg px-2 py-[9px] hover:bg-gray-50 transition-colors duration-150"
                        >
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-all duration-150 group-hover:bg-amber-400 group-hover:text-black">
                            <NavIcon name={link.icon} className="h-[14px] w-[14px]" />
                          </span>
                          <span className="text-[13px] font-light text-gray-600 transition-colors duration-150 group-hover:text-black">
                            {link.label}
                          </span>
                          <ArrowRight className="ml-auto h-3 w-3 text-amber-400 opacity-0 -translate-x-1.5 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: hero panel */}
            <div className="w-[38%] flex-shrink-0 relative overflow-hidden">
              <Link
                href={heroTo}
                onClick={onClose}
                className="group absolute inset-0 block"
                tabIndex={menu ? 0 : -1}
                aria-label={`Shop ${heroCaption}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt={heroCaption}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <span className="absolute top-5 right-5 rounded-full bg-amber-400 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black select-none">
                  New season
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 mb-1.5">
                    {heroSub}
                  </p>
                  <p className="font-serif text-[22px] font-semibold text-white leading-snug mb-5">
                    {heroCaption}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-all duration-200 group-hover:bg-white group-hover:text-black">
                    Shop now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Search bar (FIXED) ───────────────────────────────────────────────────────
const SearchBar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      const timeoutId = setTimeout(() => setQuery(""), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      if (!q) return;
      router.push(`/shop?q=${encodeURIComponent(q)}`);
      onClose();
    },
    [query, router, onClose]
  );

  return (
    <div
      className={cn("overflow-hidden transition-all duration-200", open ? "max-h-14 border-t border-gray-100" : "max-h-0")}
      aria-hidden={!open}
    >
      <form onSubmit={submit} className="container-page flex items-center gap-3 py-3">
        <Search className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full bg-transparent text-sm font-light outline-none placeholder:text-gray-400"
          aria-label="Search products"
          tabIndex={open ? 0 : -1}
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-400 hover:text-black transition-colors cursor-pointer">
            <X className="h-3 w-3" />
          </button>
        )}
        <button type="button" onClick={onClose} aria-label="Close search" className="text-gray-400 hover:text-black transition-colors cursor-pointer pl-2 border-l border-gray-100">
          <X className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};

// ─── Mobile drawer (FIXED) ────────────────────────────────────────────────────
const MobileDrawer = ({
  open, onClose, cartCount, wishCount, onOpenCart,
}: {
  open: boolean; onClose: () => void; cartCount: number; wishCount: number; onOpenCart: () => void;
}) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      const timeoutId = setTimeout(() => setExpanded(null), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  const toggle = useCallback((id: string) => setExpanded((p) => (p === id ? null : id)), []);

  return (
    <FocusTrap active={open}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white flex flex-col lg:hidden shadow-2xl",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        )}
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
        aria-label="Mobile navigation"
        aria-modal={open || undefined}
        role={open ? "dialog" : undefined}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Logo onClick={onClose} />
          <button onClick={onClose} aria-label="Close menu" className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-50 transition-all cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pt-4 pb-6" aria-label="Mobile navigation">
          {typedMegaMenus.map((m) => {
            const isOpen = expanded === m.id;
            const isCurrent = pathname?.startsWith(m.to) && m.to !== "/";
            return (
              <div key={m.id} className="border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  className={cn("flex items-center justify-between w-full py-3.5 text-[14px] font-light cursor-pointer transition-colors", isCurrent ? "text-black" : "text-gray-600")}
                  aria-expanded={isOpen}
                  aria-controls={`mob-${m.id}`}
                >
                  <span className={cn(m.accent && "text-amber-400")}>{m.label}</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
                </button>

                <div id={`mob-${m.id}`} className={cn("overflow-hidden transition-all duration-200", isOpen ? "max-h-[600px] pb-4" : "max-h-0")}>
                  {m.columns.map((col) => (
                    <div key={col.heading} className="ml-1 mb-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-2 mb-2">{col.heading}</p>
                      <ul className="space-y-0.5">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.to}
                              onClick={onClose}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-2 py-2 transition-all duration-150",
                                pathname === link.to ? "bg-amber-50 text-black" : "text-gray-500 hover:bg-gray-50 hover:text-black"
                              )}
                            >
                              <span className={cn("flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md transition-colors duration-150", pathname === link.to ? "bg-amber-400 text-black" : "bg-gray-100 text-gray-500")}>
                                <NavIcon name={link.icon} className="h-3 w-3" />
                              </span>
                              <span className="text-[13px]">{link.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-gray-100 space-y-1">
          <Link href="/account" onClick={onClose} className="flex items-center gap-3 py-2.5 text-sm text-gray-500 hover:text-black transition-colors"><User className="h-4 w-4 flex-shrink-0" /><span>My account</span></Link>
          <Link href="/wishlist" onClick={onClose} className="flex items-center gap-3 py-2.5 text-sm text-gray-500 hover:text-black transition-colors"><Heart className="h-4 w-4 flex-shrink-0" /><span>Wishlist {wishCount > 0 && `(${wishCount})`}</span></Link>
          <button onClick={() => { onClose(); onOpenCart(); }} className="flex items-center gap-3 py-2.5 text-sm text-gray-500 hover:text-black transition-colors w-full cursor-pointer"><ShoppingBag className="h-4 w-4 flex-shrink-0" /><span>Cart {cartCount > 0 && `(${cartCount})`}</span></button>
          <p className="pt-3 text-[9px] text-gray-300 font-light tracking-widest text-center uppercase">Made in Cambodia · Natural fibers</p>
        </div>
      </aside>
    </FocusTrap>
  );
};

// ─── Main Header ──────────────────────────────────────────────────────────────
const Header = () => {
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navTriggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const activeMenu = typedMegaMenus.find((m) => m.id === activeMenuId) ?? null;

  // Route change cleanup – already async (setTimeout)
  useEffect(() => {
    const id = setTimeout(() => { setActiveMenuId(null); setMobileOpen(false); setSearchOpen(false); }, 0);
    return () => clearTimeout(id);
  }, [pathname, searchParams]);

  // Scroll detection – event callback, no state set inside effect directly
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Body scroll lock – effect body does not call setState
  useEffect(() => {
    document.body.style.overflow = mobileOpen || !!activeMenuId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, activeMenuId]);

  // Escape key – event callback, safe
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (activeMenuId) { navTriggerRefs.current.get(activeMenuId)?.focus(); setActiveMenuId(null); }
      setMobileOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [activeMenuId]);

  const enterMenu = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenuId(id);
  }, []);

  const leaveMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenuId(null), 120);
  }, []);

  const closeMenu = useCallback(() => setActiveMenuId(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleSearch = useCallback(() => setSearchOpen((s) => !s), []);

  return (
    <>
      <AnnouncementBar />

      <header className={cn("sticky top-0 z-40 w-full bg-white transition-shadow duration-200", scrolled ? "shadow-[0_1px_12px_0_rgba(0,0,0,0.07)]" : "border-b border-gray-100")}>
        <div className="container-page">

          {/* Mobile single row */}
          <div className="flex h-14 items-center justify-between lg:hidden">
            <button type="button" aria-label="Open menu" className="-ml-1 p-2 text-gray-600 hover:text-black transition-colors cursor-pointer" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Search" className="h-8 w-8 text-gray-500 hover:text-black cursor-pointer" onClick={toggleSearch}><Search className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Cart" onClick={openCart} className="relative h-8 w-8 text-gray-500 hover:text-black cursor-pointer"><ShoppingBag className="h-4 w-4" /><CountBadge count={count} /></Button>
            </div>
          </div>

          {/* Desktop two-tier */}
          <div className="hidden lg:flex lg:flex-col">
            {/* Tier 1 */}
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <Logo />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" aria-label={searchOpen ? "Close search" : "Search"} aria-expanded={searchOpen} className="h-8 w-8 text-gray-500 hover:text-black cursor-pointer" onClick={toggleSearch}>
                  {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" aria-label="Account" className="h-8 w-8 text-gray-500 hover:text-black cursor-pointer"><User className="h-4 w-4" /></Button>
                <Button asChild variant="ghost" size="icon" aria-label={`Wishlist${wishCount > 0 ? `, ${wishCount} items` : ""}`} className="relative h-8 w-8 text-gray-500 hover:text-black cursor-pointer">
                  <Link href="/wishlist"><Heart className="h-4 w-4" /><CountBadge count={wishCount} /></Link>
                </Button>
                <Button variant="ghost" size="icon" aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`} onClick={openCart} className="relative h-8 w-8 text-gray-500 hover:text-black cursor-pointer">
                  <ShoppingBag className="h-4 w-4" /><CountBadge count={count} />
                </Button>
              </div>
            </div>

            {/* Tier 2: Nav */}
            <nav className="flex items-center justify-center gap-8" aria-label="Primary navigation" onMouseLeave={leaveMenu}>
              {typedMegaMenus.map((m) => {
                const isActive = activeMenuId === m.id;
                const isCurrent = pathname?.startsWith(m.to) && m.to !== "/";
                return (
                  <div key={m.id} className="relative" onMouseEnter={() => enterMenu(m.id)}>
                    <Link
                      href={m.to}
                      ref={(el) => { if (el) navTriggerRefs.current.set(m.id, el); }}
                      aria-haspopup="true"
                      aria-expanded={isActive}
                      onClick={closeMenu}
                      className={cn(
                        "inline-flex items-center text-[12px] font-light tracking-[0.1em] uppercase py-4 border-b-[1.5px] transition-all duration-150 cursor-pointer",
                        m.accent ? "text-amber-400 border-transparent"
                          : isCurrent ? "text-black border-black"
                            : isActive ? "text-black border-black/30"
                              : "text-gray-400 hover:text-black border-transparent"
                      )}
                    >
                      {m.label}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

        <div className="relative">
          <MegaPanel
            menu={activeMenu}
            onClose={closeMenu}
            onMouseEnter={() => activeMenuId && enterMenu(activeMenuId)}
            onMouseLeave={leaveMenu}
          />
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        onClick={closeMobile}
        className={cn("fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 lg:hidden", mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        aria-hidden="true"
      />

      <MobileDrawer open={mobileOpen} onClose={closeMobile} cartCount={count} wishCount={wishCount} onOpenCart={openCart} />
    </>
  );
};

export default Header;
