"use client";

import React from "react";
import type { BundleProduct } from "./types";
import { formatPrice } from "@/app/components/products/productUtils";

type Props = {
  product: BundleProduct;
  quantity: number;
  disabled: boolean;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function BundleProductCard({
  product,
  quantity,
  disabled,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  const image = product.images?.[0];
  const isAdded = quantity > 0;

  return (
    <article className="zn-bundle-product-card">
      <div className="zn-bundle-product-card__thumb">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="zn-bundle-product-card__image"
        />
      </div>

      <div className="zn-bundle-product-card__body">
        <h3 className="zn-bundle-product-card__title">{product.name}</h3>

        <div className="tp-product-price-wrapper">
          <span className="tp-product-price new-price">₹{formatPrice(product.price)}</span>
        </div>

        <div className="zn-bundle-product-card__action">
          {isAdded ? (
            <div className="zn-bundle-qty-control">
              <button
                type="button"
                className="zn-bundle-qty-control__btn"
                onClick={onDecrement}
                aria-label={`Decrease ${product.name} quantity`}
              >
                −
              </button>
              <span className="zn-bundle-qty-control__label">{quantity} Added</span>
              <button
                type="button"
                className="zn-bundle-qty-control__btn"
                onClick={onIncrement}
                disabled={disabled}
                aria-label={`Increase ${product.name} quantity`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="zn-bundle-add-box-btn"
              onClick={onAdd}
              disabled={disabled}
            >
              Add to Box
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
