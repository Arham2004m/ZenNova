"use client";

import React from "react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/app/components/products/productUtils";
import { useBundle } from "@/hooks/useBundle";
import type { BundleOffer } from "./types";
import BundleSummary from "./BundleSummary";
import BundleFooter from "./BundleFooter";

type Props = {
  bundle: BundleOffer;
  products: Product[];
};

export default function BundleCard({ bundle, products }: Props) {
  const {
    eligibleProducts,
    selectedIds,
    selectedProducts,
    requiredQuantity,
    bundlePrice,
    subtotal,
    payable,
    savings,
    isComplete,
    toggleProduct,
    addToCart,
    adding,
    error,
    success,
  } = useBundle(bundle, products);

  const headline =
    bundle.title ||
    (bundle.category?.name
      ? `Buy Any ${requiredQuantity} from ${bundle.category.name}`
      : `Buy Any ${requiredQuantity}`);

  return (
    <section className="zn-bundle-offer">
      <div className="zn-bundle-offer__header">
        <div>
          <p className="zn-bundle-offer__eyebrow">Bundle Offer</p>
          <h2 className="zn-bundle-offer__title">{headline}</h2>
          <p className="zn-bundle-offer__subtitle">
            Pick any {requiredQuantity} eligible product{requiredQuantity === 1 ? "" : "s"} and pay a fixed bundle price.
          </p>
        </div>
        <div className="zn-bundle-offer__price-badge">
          <span>Buy Any {requiredQuantity}</span>
          <strong>₹{formatPrice(bundlePrice)}</strong>
        </div>
      </div>

      <BundleSummary requiredQuantity={requiredQuantity} selectedProducts={selectedProducts} />

      <div className="zn-bundle-offer__picker">
        <h3 className="zn-bundle-offer__picker-title">Choose your products</h3>
        {eligibleProducts.length === 0 ? (
          <p className="zn-bundle-offer__empty">No eligible products are available for this bundle right now.</p>
        ) : (
          <div className="zn-bundle-offer__grid">
            {eligibleProducts.map((product) => {
              const selected = selectedIds.includes(product.id);
              const disabled = !selected && selectedIds.length >= requiredQuantity;
              return (
                <button
                  key={product.id}
                  type="button"
                  className={`zn-bundle-offer__pick ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}`}
                  onClick={() => toggleProduct(product.id)}
                  disabled={disabled}
                >
                  <div className="zn-bundle-offer__pick-image">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} loading="lazy" />
                    ) : (
                      <span>?</span>
                    )}
                  </div>
                  <span className="zn-bundle-offer__pick-name text-truncate">{product.name}</span>
                  <span className="zn-bundle-offer__pick-price">₹{formatPrice(product.price)}</span>
                  {selected && <span className="zn-bundle-offer__pick-check">Selected</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <BundleFooter
        subtotal={subtotal}
        payable={payable}
        savings={savings}
        bundlePrice={bundlePrice}
        selectedCount={selectedIds.length}
        requiredQuantity={requiredQuantity}
        isComplete={isComplete}
        adding={adding}
        error={error}
        success={success}
        onAddToCart={addToCart}
      />
    </section>
  );
}
