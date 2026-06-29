"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/components/Cart/CartProvider";
import { isBundleItem } from "@/types/cart";
import { createStoreOrder } from "@/lib/api-client";
import { formatPrice } from "@/app/components/products/productUtils";

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, total, subtotal, clearCart } = useCartContext();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "cod",
  });

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  if (cart.length === 0) {
    return (
      <div className="zn-cart-page__empty">
        <h2>Nothing to checkout</h2>
        <p>Your cart is empty.</p>
        <Link href="/cart" className="tp-btn">
          Back to Cart
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!form.firstName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const items = cart.map((item) => {
        if (isBundleItem(item)) {
          return {
            type: "BUNDLE" as const,
            bundleId: item.bundleId,
            productIds: item.productIds,
          };
        }
        return {
          type: "PRODUCT" as const,
          id: item.productId,
          quantity: item.quantity,
        };
      });

      const result = await createStoreOrder({
        items,
        customer: form,
        paymentMethod: form.paymentMethod,
      });

      if (!result.success) {
        throw new Error(result.message || "Order failed");
      }

      clearCart();

      if (result.url) {
        window.location.href = result.url;
        return;
      }

      router.push(`/orders/tracking?orderId=${encodeURIComponent(result.orderId || "")}`);
    } catch (err: any) {
      setError(err.message || "Could not place order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="zn-checkout-page">
      <form className="zn-checkout-page__form" onSubmit={handleSubmit}>
        <div className="zn-checkout-page__panel">
          <h2>Contact & Shipping</h2>
          <div className="zn-checkout-page__grid">
            <label>
              First name *
              <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} required />
            </label>
            <label>
              Last name
              <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
            </label>
            <label>
              Email *
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
            </label>
            <label>
              Phone *
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
            </label>
            <label className="zn-checkout-page__full">
              Address *
              <input value={form.address} onChange={(e) => set("address", e.target.value)} required />
            </label>
            <label>
              City
              <input value={form.city} onChange={(e) => set("city", e.target.value)} />
            </label>
            <label>
              State
              <input value={form.state} onChange={(e) => set("state", e.target.value)} />
            </label>
            <label>
              PIN code
              <input value={form.zipCode} onChange={(e) => set("zipCode", e.target.value)} />
            </label>
          </div>
        </div>

        <div className="zn-checkout-page__panel">
          <h2>Payment</h2>
          <label className="zn-checkout-page__radio">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={(e) => set("paymentMethod", e.target.value)}
            />
            Cash on Delivery (COD)
          </label>
        </div>

        {error && <p className="zn-checkout-page__error">{error}</p>}

        <button type="submit" className="tp-btn w-100" disabled={submitting}>
          {submitting ? "Placing order..." : `Place Order · ₹${formatPrice(total)}`}
        </button>
      </form>

      <aside className="zn-cart-page__summary">
        <h3>Order Summary</h3>
        {cart.map((item, index) => (
          <div key={index} className="zn-checkout-page__summary-item">
            {isBundleItem(item) ? (
              <>
                <strong>{item.title}</strong>
                <span>₹{formatPrice(item.payable)}</span>
              </>
            ) : (
              <>
                <strong>{item.name}</strong>
                <span>₹{formatPrice(Number(item.price) * item.quantity)}</span>
              </>
            )}
          </div>
        ))}
        <div className="zn-cart-page__summary-row">
          <span>Subtotal</span>
          <span>₹{formatPrice(subtotal)}</span>
        </div>
        <div className="zn-cart-page__summary-row zn-cart-page__summary-row--total">
          <span>Total</span>
          <strong>₹{formatPrice(total)}</strong>
        </div>
      </aside>
    </div>
  );
}
