"use client";

import React from "react";
import BundleProductCard from "@/components/Bundle/BundleProductCard";
import BundleStickyBar from "@/components/Bundle/BundleStickyBar";
import { useBundle } from "@/hooks/useBundle";
import type { BundleOffer } from "@/components/Bundle/types";

type Props = {
  bundle: BundleOffer;
  bannerImage: string | null;
};

export default function BundleOfferClient({ bundle, bannerImage }: Props) {
  const {
    bundleProducts,
    selectedProducts,
    requiredQuantity,
    displayPrice,
    strikePrice,
    displaySavings,
    totalSelected,
    remaining,
    isComplete,
    isBundleFull,
    getQuantity,
    addToBox,
    increment,
    decrement,
    addToCart,
    adding,
    error,
  } = useBundle(bundle);

  const handleRemoveAtSlot = (slotIndex: number) => {
    const product = selectedProducts[slotIndex];
    if (product) decrement(product.id);
  };

  return (
    <main className="zn-bundle-offer-page">
      {bannerImage ? (
        <section className="zn-bundle-offer-page__banner" aria-label="Bundle offer">
          <div className="container">
            <img
              src={bannerImage}
              alt={bundle.title || "Build your own bundle"}
              className="zn-bundle-offer-page__banner-img"
              loading="eager"
            />
          </div>
        </section>
      ) : null}

      <section className="zn-bundle-offer-page__grid-section">
        <div className="container">
          {bundleProducts.length === 0 ? (
            <div className="zn-bundle-offer__empty-page">
              <h2>No products in this bundle yet</h2>
              <p>Products will appear here once added in EVOC Labs.</p>
            </div>
          ) : (
            <div className="zn-bundle-offer-page__grid">
              {bundleProducts.map((product) => {
                const quantity = getQuantity(product.id);
                const disabled = isBundleFull && quantity === 0;

                return (
                  <BundleProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    disabled={disabled}
                    onAdd={() => addToBox(product.id)}
                    onIncrement={() => increment(product.id)}
                    onDecrement={() => decrement(product.id)}
                  />
                );
              })}
            </div>
          )}

          {error && <p className="zn-bundle-offer-page__error">{error}</p>}
        </div>
      </section>

      <BundleStickyBar
        requiredQuantity={requiredQuantity}
        selectedProducts={selectedProducts}
        totalSelected={totalSelected}
        remaining={remaining}
        displayPrice={displayPrice}
        strikePrice={strikePrice}
        displaySavings={displaySavings}
        isComplete={isComplete}
        adding={adding}
        onCheckout={addToCart}
        onRemoveAtSlot={handleRemoveAtSlot}
      />
    </main>
  );
}
