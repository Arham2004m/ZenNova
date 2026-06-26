/* eslint-disable */
"use client";

import React, { useState } from "react";

const PRODUCTS = [
  {
    id: 159,
    slug: "zennova-shilajit-pure-himalayan-power-advanced-gold-grade-formula",
    name: "Zennova Shilajit – Pure Himalayan Power (Advanced Gold Grade Formula)",
    image: "/storage/zennova-fat-burner.png",
    price: 1299,
    oldPrice: 1560,
    category: "Body",
    badge: "Hot",
    rating: 0,
    sku: "SF-2443-JLD5",
    description: "Premium gold-grade Himalayan Shilajit, rich in fulvic acid and over 84 trace minerals to boost energy, vitality, stamina, and immune support."
  },
  {
    id: 150,
    slug: "zennova-lungs-detox",
    name: "Zennova Lungs Detox",
    image: "/storage/zennova-lungs-detox.png",
    price: 1130,
    oldPrice: 1420,
    category: "Body",
    badge: "-20%",
    rating: 0,
    sku: "SF-2443-BWKP",
    description: "Advanced respiratory support formula designed to cleanse, detoxify, and support lung health from the effects of smoke, pollution, and seasonal allergens."
  },
  {
    id: 148,
    slug: "zennova-fat-burne",
    name: "Zennova Fat Burne - Thermogenic formula",
    image: "/storage/zennova-fat-burner.png",
    price: 1120,
    oldPrice: 1360,
    category: "Body",
    badge: "-17%",
    rating: 0,
    sku: "SF-2443-HDD9",
    description: "Powerful thermogenic fat burner capsules formulated to increase metabolism, accelerate fat loss, boost energy levels, and control cravings."
  },
  {
    id: 144,
    slug: "zennova-ashwagandha-premium-stress-immune-support",
    name: "Zennova Ashwagandha – Premium Stress & Immune Support",
    image: "/storage/zennova-ashwagandha.png",
    price: 600,
    oldPrice: 800,
    category: "Body",
    badge: "-25%",
    rating: 0,
    sku: "SF-2443-RZBB",
    description: "High-potency organic Ashwagandha capsules to help manage daily stress, promote calmness, improve sleep quality, and strengthen the immune system."
  }
];

const CATEGORIES = [
  { name: "All", count: PRODUCTS.length },
  { name: "Body", count: 4 },
  { name: "Face", count: 0 },
  { name: "Fitness", count: 0 },
  { name: "Fragrance", count: 0 },
  { name: "Hair", count: 0 },
  { name: "Weight Management", count: 0 }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main>
      {/* Breadcrumb Area */}
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

      {/* Shop Area */}
      <section className="tp-shop-area pt-100 pb-100 grey-bg-2">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <div className="tp-shop-sidebar mr-10">
                {/* Categories widget */}
                <div className="tp-shop-widget mb-35">
                  <h3 className="tp-shop-widget-title">Product Categories</h3>
                  <div className="tp-shop-widget-content">
                    <div className="tp-shop-widget-categories">
                      <ul>
                        {CATEGORIES.map(cat => (
                          <li key={cat.name}>
                            <button 
                              onClick={() => setSelectedCategory(cat.name)}
                              className={`w-100 text-start py-2 px-3 border-0 rounded ${selectedCategory === cat.name ? "bg-warning text-dark font-weight-bold" : "bg-transparent text-white-50"}`}
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

            {/* Product Grid */}
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
                    {filteredProducts.map(product => (
                      <div className="col-xl-4 col-md-6 col-sm-6 mb-40" key={product.id}>
                        <div className="tp-product-item transition-3 p-relative fix m-img bg-dark text-white rounded" style={{ border: "1px solid #222" }}>
                          <div className="tp-product-thumb p-relative fix">
                            <a href={`/products/${product.slug}`}>
                              <img src={product.image} alt={product.name} className="w-100" style={{ objectFit: "cover" }} />
                            </a>
                            {product.badge && (
                              <div className="tp-product-badge">
                                <span style={{ backgroundColor: "#AC2200" }}>{product.badge}</span>
                              </div>
                            )}
                            <div className="tp-product-action">
                              <div className="d-flex flex-column tp-product-action-item">
                                <button type="button" className="tp-product-compare-btn tp-product-action-btn" data-bb-toggle="add-to-compare" title="Add To Compare" data-url={`/compare/${product.id}`} data-remove-url={`/compare/${product.id}`}
                                    data-add-text="Add To Compare" data-remove-text="Remove From Compare">
                                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6666 1L16 4.33333L12.6666 7.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 9.3335V7.66683C1 6.78277 1.35119 5.93493 1.97631 5.30981C2.60143 4.68469 3.44928 4.3335 4.33333 4.3335H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.33333 19.3332L1 15.9998L4.33333 12.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 11V12.6667C16 13.5507 15.6488 14.3986 15.0237 15.0237C14.3986 15.6488 13.5507 16 12.6667 16H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="tp-product-tooltip">Add To Compare</span>
                                </button>
                                <button type="button" className="tp-product-quick-view-btn tp-product-action-btn" title="Quick View" data-bs-toggle="modal" data-bs-target="#product-quick-view-modal" data-url={`/ajax/quick-view/${product.id}`}>
                                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor"/>
                                        <g mask="url(#mask0_1211_721)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor"/>
                                        </g>
                                    </svg>
                                </button>
                                <button type="button" className="tp-product-add-to-wishlist-btn tp-product-action-btn" data-bb-toggle="add-to-wishlist" title="Add To Wishlist" data-url={`/wishlist/${product.id}`} data-add-text="Add To Wishlist"
                                    data-remove-text="Remove From Wishlist">
                                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor"/>
                                    </svg>
                                    <span className="tp-product-tooltip">Add To Wishlist</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="tp-product-content p-4">
                            <h3 className="tp-product-title text-truncate mb-2">
                              <a href={`/products/${product.slug}`} className="text-white hover-orange">{product.name}</a>
                            </h3>
                            <div className="tp-product-price-wrapper mb-3">
                              <span className="tp-product-price new-price text-warning mr-10">₹{product.price}</span>
                              <span className="tp-product-price old-price text-white-50"><del>₹{product.oldPrice}</del></span>
                            </div>
                          </div>
                          <div className="p-3 pt-0">
                            <button 
                                type="button" 
                                className="tp-product-add-cart-btn-large w-100 py-2 rounded text-center text-white" 
                                style={{ position: 'static', opacity: 1, visibility: 'visible', background: '#ff6b00', border: 'none', transition: 'all 0.3s' }}
                                data-bb-toggle="quick-shop"
                                data-url={`/ajax/quick-shop/${product.slug}`}
                                data-product-id={product.id}
                                data-product-name={product.name}
                                data-product-price={product.price}
                                data-product-sku={product.sku}
                                data-product-category={product.category}
                                data-product-categories={product.category}
                                title="Quick Shop"
                            >
                                Add To Cart
                            </button>
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
