"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCartContext } from "./CartProvider";
import MiniCartContent from "./MiniCartContent";

function closeMiniCart() {
  document.querySelector(".cartmini__area")?.classList.remove("cartmini-opened");
  document.querySelector(".body-overlay")?.classList.remove("opened");
}

export default function CartBridge() {
  const router = useRouter();
  const { count, clearCart, refreshCart } = useCartContext();
  const [contentSlot, setContentSlot] = useState<Element | null>(null);
  const [footerSlot, setFooterSlot] = useState<Element | null>(null);

  const updateSlots = useCallback(() => {
    setContentSlot(document.querySelector('[data-bb-toggle="mini-cart-content-slot"]'));
    setFooterSlot(document.querySelector('[data-bb-toggle="mini-cart-footer-slot"]'));
  }, []);

  useEffect(() => {
    updateSlots();
    refreshCart();
  }, [refreshCart, updateSlots]);

  useEffect(() => {
    document.querySelectorAll('[data-bb-value="cart-count"]').forEach((el) => {
      el.textContent = String(count);
    });
  }, [count]);

  useEffect(() => {
    if (count > 0) return;
    closeMiniCart();
  }, [count]);

  useEffect(() => {
    const handleCartAction = async (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('[data-bb-toggle="remove-from-cart"]') as HTMLAnchorElement | null;
      if (!link?.href) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      link.classList.add("btn-loading");

      try {
        const res = await fetch(link.href);
        const json = await res.json();

        if (json.error) return;

        const cartCount = json.data?.count ?? 0;

        document.querySelectorAll('[data-bb-value="cart-count"]').forEach((el) => {
          el.textContent = String(cartCount);
        });

        if (cartCount === 0) {
          clearCart();
          closeMiniCart();
        }

        router.refresh();

        window.setTimeout(() => {
          updateSlots();
          refreshCart();
        }, 0);
      } catch (error) {
        console.error("Cart update failed:", error);
      } finally {
        link.classList.remove("btn-loading");
      }
    };

    document.addEventListener("click", handleCartAction, true);
    return () => document.removeEventListener("click", handleCartAction, true);
  }, [clearCart, refreshCart, router, updateSlots]);

  useEffect(() => {
    const openCart = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      refreshCart();
      document.querySelector(".cartmini__area")?.classList.add("cartmini-opened");
      document.querySelector(".body-overlay")?.classList.add("opened");
    };

    const buttons = document.querySelectorAll('[data-bb-toggle="open-mini-cart"]');
    buttons.forEach((button) => {
      button.addEventListener("click", openCart, true);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", openCart, true);
      });
    };
  }, [refreshCart]);

  if (!contentSlot || !footerSlot) return null;

  return (
    <>
      {createPortal(<MiniCartContent variant="content" />, contentSlot)}
      {createPortal(<MiniCartContent variant="footer" />, footerSlot)}
    </>
  );
}
