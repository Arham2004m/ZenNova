"use client";

import React from "react";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import ProductActionButtons from "./ProductActionButtons";
import ProductCountdown from "./ProductCountdown";
import ProductRating from "./ProductRating";
import { formatPrice, getProductBadges } from "./productUtils";

export type ProductCardProps = {
  product: Product;
  countdownDate?: Date | string;
  showCountdown?: boolean;
  badgeOverride?: { text: string; className: string } | null;
  className?: string;
  reviewCount?: number;
  ratingPercent?: number;
};

export default function ProductCard({
  product,
  countdownDate,
  showCountdown = false,
  badgeOverride,
  className = "",
  reviewCount = 0,
  ratingPercent = 0,
}: ProductCardProps) {
  const badges =
    badgeOverride === undefined ? getProductBadges(product) : badgeOverride ? [badgeOverride] : [];
  const image = product.images?.[0];

  return (
    <div className={`tp-product-item zn-product-card transition-3 p-relative fix m-img h-100 ${showCountdown ? "zn-has-countdown" : ""} ${className}`.trim()}>
      <div className="tp-product-thumb p-relative fix m-img zn-product-card__thumb">
        <a href={`/products/${product.slug}`} title={product.name}>
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="zn-product-card__image"
          />
        </a>

        {badges.length > 0 && (
          <div className="tp-product-badge zn-product-badges">
            {badges.map((badge) => (
              <span className={badge.className} key={badge.text}>
                {badge.text}
              </span>
            ))}
          </div>
        )}

        <ProductActionButtons product={product} />
      </div>

      <div className="tp-product-content zn-product-card__content">
        <h3 className="text-truncate tp-product-title">
          <a href={`/products/${product.slug}`} title={product.name}>
            {product.name}
          </a>
        </h3>

        <ProductRating
          slug={product.slug}
          reviewCount={reviewCount}
          ratingPercent={ratingPercent}
        />

        <div className="tp-product-price-wrapper">
          <span className="tp-product-price new-price" data-bb-value="product-price">
            ₹{formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span>
              <small>
                <del className="tp-product-price old-price" data-bb-value="product-original-price">
                  ₹{formatPrice(product.compareAtPrice)}
                </del>
              </small>
            </span>
          )}
        </div>
      </div>

      {showCountdown && countdownDate && (
        <div className="zn-product-card__countdown">
          <ProductCountdown targetDate={countdownDate} />
        </div>
      )}

      <div className="zn-product-card__footer">
        <AddToCartButton
          product={product}
          variant="static"
          label={product.variants && product.variants.length > 0 ? "Select Options" : "Add To Cart"}
        />
      </div>
    </div>
  );
}
