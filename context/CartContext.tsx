"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { products, Product } from "@/data/products";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  itemsDetailed: (CartItem & { product: Product })[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sahmlot.cart.v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* ignore */ }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.productId === item.productId && p.size === item.size && p.color === item.color,
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, size: string, color: string) =>
    setItems((prev) => prev.filter((p) => !(p.productId === productId && p.size === size && p.color === color)));

  const updateQuantity = (productId: string, size: string, color: string, qty: number) =>
    setItems((prev) =>
      prev
        .map((p) =>
          p.productId === productId && p.size === size && p.color === color
            ? { ...p, quantity: Math.max(0, qty) }
            : p,
        )
        .filter((p) => p.quantity > 0),
    );

  const clear = () => setItems([]);

  const itemsDetailed = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean) as (CartItem & { product: Product })[],
    [items],
  );

  const subtotal = useMemo(
    () => itemsDetailed.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [itemsDetailed],
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clear,
        subtotal,
        count,
        itemsDetailed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
