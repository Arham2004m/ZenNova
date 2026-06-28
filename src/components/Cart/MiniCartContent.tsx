"use client";

import React from "react";
import Link from "next/link";
import { useCartContext } from "./CartProvider";
import { isBundleItem } from "@/types/cart";
import { formatPrice } from "@/app/components/products/productUtils";

type Props = {
  variant: "content" | "footer";
};

export default function MiniCartContent({ variant }: Props) {
  const { cart, total, subtotal, removeItem } = useCartContext();

  if (variant === "footer") {
    if (cart.length === 0) return null;

    return (
      <div className="cartmini__checkout">
        <div className="cartmini__checkout-info d-flex align-items-center justify-content-between mb-15">
          <span>Subtotal</span>
          <strong>₹{formatPrice(subtotal)}</strong>
        </div>
        <div className="cartmini__checkout-info d-flex align-items-center justify-content-between mb-20">
          <span>Total</span>
          <strong className="text-primary">₹{formatPrice(total)}</strong>
        </div>
        <div className="cartmini__checkout-btn">
          <Link href="/cart" className="tp-btn tp-btn-border w-100 mb-10">
            View Cart
          </Link>
          <Link href="/checkout" className="tp-btn w-100">
            Checkout
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cartmini__empty text-center py-4">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <ul className="cartmini__list">
      {cart.map((item, index) => {
        if (isBundleItem(item)) {
          return (
            <li key={`bundle-${item.bundleId}-${index}`} className="cartmini__item zn-cart-bundle-item">
              <div className="cartmini__thumb">
                {item.items[0]?.images?.[0] ? (
                  <img src={item.items[0].images[0]} alt={item.title} />
                ) : (
                  <div className="zn-cart-bundle-item__placeholder">Bundle</div>
                )}
              </div>
              <div className="cartmini__content">
                <h5 className="cartmini__title">{item.title}</h5>
                <p className="zn-cart-bundle-item__products">
                  {item.items.map((product) => product.name).join(" · ")}
                </p>
                <div className="cartmini__price">
                  <del className="zn-cart-bundle-item__original">₹{formatPrice(item.subtotal)}</del>
                  <span className="text-primary">₹{formatPrice(item.payable)}</span>
                </div>
                {item.savings > 0 && (
                  <p className="zn-cart-bundle-item__savings">You save ₹{formatPrice(item.savings)}</p>
                )}
                <button
                  type="button"
                  className="cartmini__del zn-cart-remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        }

        return (
          <li key={`product-${item.productId}-${index}`} className="cartmini__item">
            <div className="cartmini__thumb">
              {item.images?.[0] ? <img src={item.images[0]} alt={item.name} /> : null}
            </div>
            <div className="cartmini__content">
              <h5 className="cartmini__title">{item.name}</h5>
              <div className="cartmini__price">
                <span>₹{formatPrice(item.price)}</span>
                <span className="ms-2">× {item.quantity}</span>
              </div>
              <button
                type="button"
                className="cartmini__del zn-cart-remove-btn"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
