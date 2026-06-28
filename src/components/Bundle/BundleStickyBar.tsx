"use client";

import React from "react";
import type { BundleProduct } from "./types";
import { formatPrice } from "@/app/components/products/productUtils";

type Props = {
  requiredQuantity: number;
  selectedProducts: BundleProduct[];
  totalSelected: number;
  remaining: number;
  displayPrice: number;
  strikePrice: number;
  displaySavings: number;
  isComplete: boolean;
  adding: boolean;
  onCheckout: () => void;
  onRemoveAtSlot: (slotIndex: number) => void;
};

export default function BundleStickyBar({
  requiredQuantity,
  selectedProducts,
  totalSelected,
  remaining,
  displayPrice,
  strikePrice,
  displaySavings,
  isComplete,
  adding,
  onCheckout,
  onRemoveAtSlot,
}: Props) {
  const slots = Array.from({ length: requiredQuantity }, (_, index) => selectedProducts[index] ?? null);
  const progress = Math.min(100, (totalSelected / requiredQuantity) * 100);
  const hasSelection = totalSelected > 0;

  return (
    <div className="zn-bundle-sticky-bar">
      <div
        className="zn-bundle-sticky-bar__progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="container zn-bundle-sticky-bar__inner">
        <div className="zn-bundle-sticky-bar__slots">
          {slots.map((product, index) => (
            <div className="zn-bundle-sticky-bar__slot-wrap" key={`slot-${index}`}>
              <div className={`zn-bundle-sticky-bar__slot ${product ? "is-filled" : ""}`}>
                {product?.images?.[0] ? (
                  <>
                    <img src={product.images[0]} alt={product.name} />
                    <button
                      type="button"
                      className="zn-bundle-sticky-bar__remove"
                      onClick={() => onRemoveAtSlot(index)}
                      aria-label={`Remove ${product.name} from bundle`}
                    >
                      −
                    </button>
                  </>
                ) : (
                  <span aria-hidden="true">+</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="zn-bundle-sticky-bar__summary">
          {hasSelection ? (
            <div className="zn-bundle-sticky-bar__pricing">
              <div className="zn-bundle-sticky-bar__price-block">
                <div className="zn-bundle-sticky-bar__label-row">
                  <span className="zn-bundle-sticky-bar__price-label">Subtotal</span>
                  {displaySavings > 0 && (
                    <span className="zn-bundle-sticky-bar__save-badge">
                      Save: ₹{formatPrice(displaySavings)}
                    </span>
                  )}
                </div>
                <div className="zn-bundle-sticky-bar__price-row">
                  <strong className="zn-bundle-sticky-bar__bundle-price">
                    ₹{formatPrice(displayPrice)}
                  </strong>
                  {strikePrice > displayPrice && (
                    <del className="zn-bundle-sticky-bar__original-price">
                      ₹{formatPrice(strikePrice)}
                    </del>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="zn-bundle-sticky-bar__hint">
              Add {remaining} More Item{remaining === 1 ? "" : "s"}
            </p>
          )}
        </div>

        <button
          type="button"
          className="zn-bundle-sticky-bar__checkout"
          disabled={!isComplete || adding}
          onClick={onCheckout}
        >
          {adding
            ? "Adding..."
            : isComplete
              ? "Checkout"
              : `Add ${remaining} More Item${remaining === 1 ? "" : "(s)"}`}
        </button>
      </div>
    </div>
  );
}
