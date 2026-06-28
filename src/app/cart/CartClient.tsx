"use client";

import React from "react";
import Link from "next/link";
import { useCartContext } from "@/components/Cart/CartProvider";
import { isBundleItem } from "@/types/cart";
import { formatPrice } from "@/app/components/products/productUtils";

export default function CartClient() {
  const { cart, subtotal, total, removeItem, clearCart } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="zn-cart-page__empty">
        <h2>Your cart is empty</h2>
        <p>Add a bundle offer or product to get started.</p>
        <Link href="/bundle" className="tp-btn">
          Browse Bundle Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="zn-cart-page">
      <div className="zn-cart-page__items">
        {cart.map((item, index) => {
          if (isBundleItem(item)) {
            return (
              <div key={`bundle-${item.bundleId}-${index}`} className="zn-cart-page__item zn-cart-page__item--bundle">
                <div className="zn-cart-page__item-head">
                  <div>
                    <span className="zn-cart-page__badge">Bundle Offer</span>
                    <h3>{item.title}</h3>
                    <p>{item.items.map((product) => product.name).join(" · ")}</p>
                  </div>
                  <button type="button" className="zn-cart-remove-btn" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>
                <div className="zn-cart-page__item-prices">
                  <span>
                    Original <del>₹{formatPrice(item.subtotal)}</del>
                  </span>
                  <strong>₹{formatPrice(item.payable)}</strong>
                  {item.savings > 0 && <em>You save ₹{formatPrice(item.savings)}</em>}
                </div>
              </div>
            );
          }

          return (
            <div key={`product-${item.productId}-${index}`} className="zn-cart-page__item">
              <div className="zn-cart-page__item-head">
                <div className="zn-cart-page__product">
                  {item.images?.[0] ? <img src={item.images[0]} alt={item.name} /> : null}
                  <div>
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <button type="button" className="zn-cart-remove-btn" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
              <strong>₹{formatPrice(Number(item.price) * item.quantity)}</strong>
            </div>
          );
        })}
      </div>

      <aside className="zn-cart-page__summary">
        <h3>Order Summary</h3>
        <div className="zn-cart-page__summary-row">
          <span>Subtotal</span>
          <span>₹{formatPrice(subtotal)}</span>
        </div>
        <div className="zn-cart-page__summary-row zn-cart-page__summary-row--total">
          <span>Total</span>
          <strong>₹{formatPrice(total)}</strong>
        </div>
        <Link href="/checkout" className="tp-btn w-100">
          Proceed to Checkout
        </Link>
        <button type="button" className="tp-btn tp-btn-border w-100 mt-10" onClick={clearCart}>
          Clear Cart
        </button>
      </aside>
    </div>
  );
}
