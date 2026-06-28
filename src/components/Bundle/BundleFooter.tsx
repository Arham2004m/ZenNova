"use client";

import React from "react";
import { formatPrice } from "@/app/components/products/productUtils";
import { CartIcon } from "@/app/components/products/ProductIcons";

type Props = {
  subtotal: number;
  payable: number;
  savings: number;
  bundlePrice: number;
  selectedCount: number;
  requiredQuantity: number;
  isComplete: boolean;
  adding: boolean;
  error: string | null;
  success: string | null;
  onAddToCart: () => void;
};

export default function BundleFooter({
  subtotal,
  payable,
  savings,
  bundlePrice,
  selectedCount,
  requiredQuantity,
  isComplete,
  adding,
  error,
  success,
  onAddToCart,
}: Props) {
  return (
    <div className="zn-bundle-offer__footer">
      <div className="zn-bundle-offer__metrics">
        <div className="zn-bundle-offer__metric">
          <span>Selected</span>
          <strong>
            {selectedCount}/{requiredQuantity}
          </strong>
        </div>
        <div className="zn-bundle-offer__metric">
          <span>Total</span>
          <strong>₹{formatPrice(payable)}</strong>
        </div>
        <div className="zn-bundle-offer__metric">
          <span>Savings</span>
          <strong className={isComplete ? "is-positive" : ""}>
            {isComplete ? `₹${formatPrice(savings)}` : "—"}
          </strong>
        </div>
      </div>

      <div className="zn-bundle-offer__pricing-row">
        <div>
          <span className="zn-bundle-offer__label">Original Price</span>
          <del className="zn-bundle-offer__original-price">₹{formatPrice(subtotal)}</del>
        </div>
        <div>
          <span className="zn-bundle-offer__label">Bundle Price</span>
          <strong className="zn-bundle-offer__bundle-price">₹{formatPrice(bundlePrice)}</strong>
        </div>
        <div>
          <span className="zn-bundle-offer__label">You Save</span>
          <strong className="zn-bundle-offer__save-amount">
            {isComplete ? `₹${formatPrice(savings)}` : "—"}
          </strong>
        </div>
      </div>

      {error && <p className="zn-bundle-offer__message is-error">{error}</p>}
      {success && <p className="zn-bundle-offer__message is-success">{success}</p>}

      <button
        type="button"
        className="zn-bundle-offer__cta tp-product-add-cart-btn-large"
        disabled={!isComplete || adding}
        onClick={onAddToCart}
      >
        <CartIcon />
        {adding ? "Adding..." : "Add Bundle to Cart"}
      </button>
    </div>
  );
}
