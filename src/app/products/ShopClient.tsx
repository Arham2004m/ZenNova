/* eslint-disable */
"use client";

import React, { useState } from "react";

type Product = {
  id: string;
  slug: string;
  name: string;
  images: string[];
  price: string;
  compareAtPrice: string;
  category: string;
  isBestSeller: boolean;
  isNewArrival: boolean;
};

type Props = {
  products: Product[];
  categories: { name: string; count: number }[];
};

export default function ShopClient({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const getBadge = (product: Product) => {
    if (product.isBestSeller) return "Hot";
    const discount = product.compareAtPrice
      ? Math.round(
          ((Number(product.compareAtPrice) - Number(product.price)) /
            Number(product.compareAtPrice)) *
            100
        )
      : 0;
    return discount > 0 ? `-${discount}%` : null;
  };

  return (
    <main>
      <section className="breadcrumb__area pt-80 pb-80" style={{ backgroundColor: "#000", borderBottom: "1px solid #111" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content text-center">
                <h2 className="breadcrumb__title text-white">Our Products</h2>
                <div className="breadcrumb__list text-white">
                  <span><a href="/" className="text-white">Home</a></span>
                  <span className="dvdr">/</span>
                  <span className="text-white-50">Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-shop-area pt-100 pb-100 grey-bg-2">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="tp-shop-sidebar mr-10">
                <div className="tp-shop-widget mb-35">
                  <h3 className="tp-shop-widget-title">Product Categories</h3>
                  <div className="tp-shop-widget-content">
                    <div className="tp-shop-widget-categories">
                      <ul>
                        {categories.map((cat) => (
                          <li key={cat.name}>
                            <button
                              onClick={() => setSelectedCategory(cat.name)}
                              className={`w-100 text-start py-2 px-3 border-0 rounded ${
                                selectedCategory === cat.name
                                  ? "bg-warning text-dark font-weight-bold"
                                  : "bg-transparent text-white-50"
                              }`}
                              style={{ transition: "all 0.3s" }}
                            >
                              {cat.name} <span>({cat.count})</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="tp-shop-main-wrapper">
                <div className="tp-shop-top mb-45">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-6">
                      <div className="tp-shop-top-left">
                        <p className="text-white-50">Showing {filteredProducts.length} results</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tp-shop-items-wrapper">
                  <div className="row">
                    {filteredProducts.map((product) => (
                      <div className="col-xl-4 col-md-6 col-sm-6 mb-40" key={product.id}>
                        <div className="tp-product-item transition-3 p-relative fix m-img bg-dark text-white rounded" style={{ border: "1px solid #222" }}>
                          <div className="tp-product-thumb p-relative fix">
                            <a href={`/products/${product.slug}`}>
                              <img src={product.images?.[0]} alt={product.name} className="w-100" style={{ objectFit: "cover" }} />
                            </a>
                            {getBadge(product) && (
                              <div className="tp-product-badge">
                                <span style={{ backgroundColor: "#AC2200" }}>{getBadge(product)}</span>
                              </div>
                            )}
                            <div className="tp-product-action">
                              <div className="d-flex flex-column tp-product-action-item">
                                <a href={`/products/${product.slug}`} className="tp-product-action-btn" title="View Details">
                                  <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor"/>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="tp-product-content p-4">
                            <h3 className="tp-product-title text-truncate mb-2">
                              <a href={`/products/${product.slug}`} className="text-white hover-orange">{product.name}</a>
                            </h3>
                            <div className="tp-product-price-wrapper mb-3">
                              <span className="tp-product-price new-price text-warning mr-10">₹{product.price}</span>
                              <span className="tp-product-price old-price text-white-50"><del>₹{product.compareAtPrice}</del></span>
                            </div>
                            <div className="tp-product-add-cart-btn-large-wrapper">
                              <a href={`/products/${product.slug}`} className="tp-product-add-cart-btn-large w-100 text-center text-white bg-warning hover-dark-btn py-2 d-block rounded">
                                View Product
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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