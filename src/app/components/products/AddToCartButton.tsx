import React from "react";
import type { Product } from "@/types/product";
import { CartIcon } from "./ProductIcons";

type Props = {
  product: Product;
  label?: string;
  variant?: "overlay" | "static";
  className?: string;
};

export default function AddToCartButton({
  product,
  label = "Add To Cart",
  variant = "static",
  className = "",
}: Props) {
  const button = (
    <button
      type="button"
      className={`tp-product-add-cart-btn-large ${className}`.trim()}
      data-bb-toggle="add-to-cart"
      data-url="/ajax/cart-content"
      data-id={product.id}
      title="Add To Cart"
    >
      <CartIcon />
      {label}
    </button>
  );

  if (variant === "overlay") {
    return <div className="tp-product-add-cart-btn-large-wrapper">{button}</div>;
  }

  return button;
}
