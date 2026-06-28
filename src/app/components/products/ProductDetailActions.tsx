"use client";

import React from "react";
import WishlistDetailButton from "./WishlistDetailButton";

type Props = {
  productId: string;
  stock: number;
};

export default function ProductDetailActions({ productId, stock }: Props) {
  const maxQty = Math.max(1, stock);
  const [qty, setQty] = React.useState(1);

  const decrement = () => setQty((value) => Math.max(1, value - 1));
  const increment = () => setQty((value) => Math.min(maxQty, value + 1));

  return (
    <form
      action="/ajax/cart-content"
      method="POST"
      data-bb-toggle="product-form"
      className="zn-product-details-actions-form"
    >
      <input type="hidden" name="id" value={productId} />
      <input type="hidden" name="qty" value={qty} readOnly />

      <div className="zn-product-details-actions">
        <div className="zn-product-details-qty" aria-label="Quantity">
          <button
            type="button"
            className="zn-product-details-qty__btn"
            onClick={decrement}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="zn-product-details-qty__value" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            className="zn-product-details-qty__btn"
            onClick={increment}
            disabled={qty >= maxQty}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="submit"
          name="add-to-cart"
          className="zn-product-details-btn zn-product-details-btn--cart"
          disabled={stock <= 0}
        >
          Add To Cart
        </button>

        <button
          type="submit"
          name="checkout"
          className="zn-product-details-btn zn-product-details-btn--buy"
          disabled={stock <= 0}
        >
          Buy Now
        </button>

        <WishlistDetailButton productId={productId} />
      </div>
    </form>
  );
}
