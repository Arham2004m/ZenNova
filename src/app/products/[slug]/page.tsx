/* eslint-disable */
import React from "react";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";



export default async function ProductDetails({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
const product = await getProduct(slug);
  if (!product) { notFound(); }

  return (
    <main>
      {/* Breadcrumb */}
      <section className="breadcrumb__area pt-80 pb-80" style={{ backgroundColor: "#000", borderBottom: "1px solid #111" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content text-center">
                <h2 className="breadcrumb__title text-white">{product.name}</h2>
                <div className="breadcrumb__list text-white">
                  <span><a href="/" className="text-white">Home</a></span>
                  <span className="dvdr">/</span>
                  <span><a href="/products" className="text-white">Products</a></span>
                  <span className="dvdr">/</span>
                  <span className="text-white-50">Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="tp-product-details-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            {/* Image Column */}
            <div className="col-xl-6 col-lg-6">
              <div className="tp-product-details-img-wrapper pr-30">
                <div className="tp-product-details-img-tab">
                  <div className="tp-product-details-large-img bg-dark rounded overflow-hidden">
                    <img src={product.images?.[0]} alt={product.name} className="w-100" style={{ maxHeight: "600px", objectFit: "contain" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="col-xl-6 col-lg-6">
              <div className="tp-product-details-wrapper">
                <span className="tp-product-details-badge text-warning font-weight-bold mb-2 d-inline-block bg-dark py-1 px-3 rounded" style={{ border: "1px solid #333" }}>
                  {product.category}
                </span>
                <h3 className="tp-product-details-title text-white mb-15">{product.name}</h3>

                {/* Rating */}
                <div className="tp-product-details-rating d-flex align-items-center mb-20">
                  <div className="tp-product-details-rating-star text-warning">
                    <span className="mr-5">⭐</span>
                    <span className="mr-5">⭐</span>
                    <span className="mr-5">⭐</span>
                    <span className="mr-5">⭐</span>
                    <span className="mr-5">⭐</span>
                  </div>
                  <span className="text-white-50 ml-10">(5.0 Rating / Verified Customer Reviews)</span>
                </div>

                {/* Prices */}
                <div className="tp-product-details-price-wrapper mb-20">
                  <span className="tp-product-details-price new-price text-warning" style={{ fontSize: "28px", fontWeight: "bold" }}>₹{product.price}</span>
                  <span className="tp-product-details-price old-price text-white-50 ml-15" style={{ fontSize: "20px" }}><del>₹{product.compareAtPrice}</del>
</span>
                </div>

                {/* Summary */}
                <div className="tp-product-details-summary mb-30">
                  <p className="text-white-50" style={{ fontSize: "16px", lineHeight: "1.6" }}>{product.description}</p>
                </div>

                {/* Meta details */}
                <div className="tp-product-details-meta mb-30" style={{ borderTop: "1px solid #222", borderBottom: "1px solid #222", padding: "15px 0" }}>
                  <div className="d-flex justify-content-between text-white-50 mb-2">
                    <span>SKU:</span>
                    <span className="text-white font-weight-bold">{product.sku}</span>
                  </div>
                  <div className="d-flex justify-content-between text-white-50">
                    <span>Availability:</span>
                    <span className="text-success font-weight-bold">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="tp-product-details-action d-flex flex-wrap align-items-center gap-3">
                  <div className="tp-product-details-quantity">
                    <div className="tp-product-quantity">
                      <input type="number" className="form-control bg-dark text-white text-center border-secondary" defaultValue={1} min={1} style={{ width: "80px", height: "45px" }} />
                    </div>
                  </div>
                  <button className="tp-btn text-white bg-warning hover-dark-btn py-3 px-5 rounded" style={{ height: "45px", border: "none", fontWeight: "bold" }}>
                    Add To Cart
                  </button>
                  <button className="tp-btn text-white bg-white hover-orange py-3 px-5 rounded" style={{ height: "45px", border: "1px solid #fff", color: "#000 !important", fontWeight: "bold" }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description Tabs */}
          <div className="row mt-80">
            <div className="col-12">
              <div className="tp-product-details-tab-wrapper">
                <nav>
                  <div className="nav nav-tabs border-secondary mb-3" id="nav-tab" role="tablist">
                    <button className="nav-link active bg-transparent text-white border-0 border-bottom border-warning py-3 px-4" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true" style={{ fontSize: "18px" }}>
                      Description
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active text-white-50 p-4 rounded bg-dark" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" style={{ border: "1px solid #222", lineHeight: "1.8" }}>
                <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
