"use client";

import React from "react";
import type { BundleProduct } from "./types";

type Props = {
  requiredQuantity: number;
  selectedProducts: BundleProduct[];
};

export default function BundleSummary({ requiredQuantity, selectedProducts }: Props) {
  const slots = Array.from({ length: requiredQuantity }, (_, index) => selectedProducts[index] || null);

  return (
    <div className="zn-bundle-offer__slots">
      {slots.map((product, index) => (
        <React.Fragment key={index}>
          <div className={`zn-bundle-offer__slot ${product ? "is-filled" : ""}`}>
            {product ? (
              <>
                <div className="zn-bundle-offer__slot-image">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} loading="lazy" />
                  ) : (
                    <span className="zn-bundle-offer__slot-placeholder">?</span>
                  )}
                </div>
                <span className="zn-bundle-offer__slot-name text-truncate">{product.name}</span>
              </>
            ) : (
              <span className="zn-bundle-offer__slot-empty" aria-hidden="true">
                *
              </span>
            )}
          </div>
          {index < slots.length - 1 && (
            <span className="zn-bundle-offer__operator" aria-hidden="true">
              +
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
