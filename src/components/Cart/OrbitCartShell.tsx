"use client";

import { CartProvider } from "./CartProvider";
import CartBridge from "./CartBridge";

export default function OrbitCartShell() {
  return (
    <CartProvider>
      <CartBridge />
    </CartProvider>
  );
}
