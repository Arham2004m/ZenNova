import type { BundleCartItem } from "@/components/Bundle/types";

export type ProductCartItem = {
  type: "PRODUCT";
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  images: string[];
};

export type CartItem = BundleCartItem | ProductCartItem;

export const CART_STORAGE_KEY = "orbit_cart";

export function isBundleItem(item: CartItem): item is BundleCartItem {
  return item.type === "BUNDLE";
}

export function getCartLineCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => {
    if (isBundleItem(item)) return count + 1;
    return count + item.quantity;
  }, 0);
}

export function getCartPayableTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => {
    if (isBundleItem(item)) return total + Number(item.payable);
    return total + Number(item.price) * item.quantity;
  }, 0);
}

export function getCartSubtotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => {
    if (isBundleItem(item)) return total + Number(item.subtotal);
    return total + Number(item.price) * item.quantity;
  }, 0);
}

export function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCartToStorage(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("orbit:cart-updated"));
}
