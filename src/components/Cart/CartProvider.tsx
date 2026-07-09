"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { BundleCartItem } from "@/components/Bundle/types";
import {
  CartItem,
  getCartLineCount,
  getCartPayableTotal,
  getCartSubtotal,
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
  loading: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch("/ajax/cart-content?json=true");
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.details && Array.isArray(data.details.items)) {
        const mapped: CartItem[] = data.details.items.map((item: any) => {
          if (item.type === "BUNDLE") {
            return {
              type: "BUNDLE",
              bundleId: item.bundleId,
              title: item.title,
              productIds: item.productIds || [],
              items: (item.items || []).map((p: any) => ({
                id: p.id,
                name: p.name,
                slug: p.slug || "",
                price: parseFloat(p.price) || 0,
                images: p.images || []
              })),
              payable: parseFloat(item.payable) || 0,
              subtotal: parseFloat(item.subtotal) || 0,
              savings: parseFloat(item.savings) || 0,
              bundlePrice: parseFloat(item.payable) || 0,
              requiredQuantity: item.productIds?.length || 0,
            };
          }
          return {
            type: "PRODUCT",
            productId: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            price: parseFloat(item.product.price) || 0,
            quantity: item.quantity,
            images: item.product.images || []
          };
        });
        setCart(mapped);
      }
    } catch (e) {
      console.error("Failed to sync cart cookie with state:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();

    const handleSync = () => {
      refreshCart();
    };

    window.addEventListener("orbit:cart-updated", handleSync);
    window.addEventListener("storage", handleSync);
    document.addEventListener("ecommerce.cart.added", handleSync);
    document.addEventListener("ecommerce.cart.removed", handleSync);

    return () => {
      window.removeEventListener("orbit:cart-updated", handleSync);
      window.removeEventListener("storage", handleSync);
      document.removeEventListener("ecommerce.cart.added", handleSync);
      document.removeEventListener("ecommerce.cart.removed", handleSync);
    };
  }, [refreshCart]);

  const addItem = useCallback(
    async (item: CartItem) => {
      if (item.type === "PRODUCT") {
        try {
          setLoading(true);
          const res = await fetch("/ajax/cart-content", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              id: item.productId,
              qty: String(item.quantity),
              cart_action: "add"
            })
          });
          if (res.ok) {
            refreshCart();
          }
        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      }
    },
    [refreshCart]
  );

  const removeItem = useCallback(
    async (index: number) => {
      try {
        setLoading(true);
        const res = await fetch(`/ajax/cart-content?remove_index=${index}`);
        if (res.ok) {
          refreshCart();
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    },
    [refreshCart]
  );

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/ajax/cart-content?clear=true");
      if (res.ok) {
        setCart([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

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
      loading,
    }),
    [cart, addItem, removeItem, clearCart, refreshCart, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
