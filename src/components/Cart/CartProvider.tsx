"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { BundleCartItem } from "@/components/Bundle/types";
import {
  CartItem,
  getCartLineCount,
  getCartPayableTotal,
  getCartSubtotal,
  readCartFromStorage,
  writeCartToStorage,
} from "@/types/cart";

type CartContextValue = {
  cart: CartItem[];
  count: number;
  subtotal: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCart = useCallback(() => {
    setCart(readCartFromStorage());
  }, []);

  useEffect(() => {
    refreshCart();
    const onUpdate = () => refreshCart();
    window.addEventListener("orbit:cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("orbit:cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refreshCart]);

  const persist = useCallback((next: CartItem[]) => {
    writeCartToStorage(next);
    setCart(next);
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      const next = [...readCartFromStorage(), item];
      persist(next);
    },
    [persist]
  );

  const removeItem = useCallback(
    (index: number) => {
      const next = readCartFromStorage().filter((_, i) => i !== index);
      persist(next);
    },
    [persist]
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = useMemo(
    () => ({
      cart,
      count: getCartLineCount(cart),
      subtotal: getCartSubtotal(cart),
      total: getCartPayableTotal(cart),
      addItem,
      removeItem,
      clearCart,
      refreshCart,
    }),
    [cart, addItem, removeItem, clearCart, refreshCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}

export type { BundleCartItem, CartItem };
