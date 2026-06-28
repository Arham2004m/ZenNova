"use client";

import React from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  columnsClassName?: string;
};

export default function ProductGrid({
  products,
  columnsClassName = "col-6 col-md-6 col-lg-4 col-xl-3 d-flex",
}: Props) {
  return (
    <div className="row zn-product-grid g-3 g-md-4">
      {products.map((product) => (
        <div className={columnsClassName} key={product.id}>
          <ProductCard product={product} showCountdown={false} />
        </div>
      ))}
    </div>
  );
}
