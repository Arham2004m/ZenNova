"use client";

import React from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  viewAllHref?: string;
};

export default function DealOfTheDaySection({
  products,
  viewAllHref = "/products",
}: Props) {
  const [dealEndDate, setDealEndDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    // Set a target date of 2 days, 4 hours, 34 minutes, 21 seconds from mount
    const target = new Date();
    target.setDate(target.getDate() + 2);
    target.setHours(target.getHours() + 4);
    target.setMinutes(target.getMinutes() + 34);
    target.setSeconds(target.getSeconds() + 21);
    setDealEndDate(target);
  }, []);

  return (
    <section className="tp-deal-area pt-50 pb-50 zn-deal-area">
      <div className="container">
        <div className="row align-items-center mb-40">
          <div className="col-xl-6 col-lg-5 col-md-6">
            <div className="tp-section-title-wrapper">
              <h3 className="section-title tp-section-title mb-0">Deal of The Day</h3>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7 col-md-6 text-md-end mt-3 mt-md-0">
            <a href={viewAllHref} className="tp-btn zn-deal-view-all">
              View All Deals
            </a>
          </div>
        </div>

        <div className="row zn-product-grid">
          {products.map((product) => (
            <div className="col-xl-3 col-lg-4 col-sm-6 mb-30" key={product.id}>
              <ProductCard
                product={product}
                showCountdown={!!dealEndDate}
                countdownDate={dealEndDate || undefined}
                badgeOverride={{ text: "Sale", className: "product-offer" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
