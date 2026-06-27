/* eslint-disable */
"use client";

import React, { useMemo } from "react";
import type { Product } from "@/types/product";
import ProductCard from "./components/products/ProductCard";
import DealOfTheDaySection from "./components/products/DealOfTheDaySection";
import CustomerReviewsSection from "./components/products/CustomerReviewsSection";

type Props = {
  products: Product[];
  storeData: any;
};

const TESTIMONIALS = [
  {
    name: "Meraz",
    designation: "Software Engineer & Fitness Enthusiast",
    review:
      '"Main pichle 3 weeks se <b><strong>Zen Nova Green Fuel</strong></b> aur <b><strong>Shilajit</strong></b> use kar raha hoon. Honestly, jo afternoon fatigue hoti thi system pe baithte-baithte, wo ab bilkul chali gayi hai. Clean energy milti hai pure din bina kisi crash ke. Highly recommended for working professionals who hit the gym!"',
  },
  {
    name: "Priya Patel",
    designation: "Student",
    review:
      '"I was skeptical about <b><strong>Zennova Apple Cider Vinegar</strong></b> because of the harsh taste of other brands, but diluted in warm water, this one is actually smooth. Morning me empty stomach lene se bloating bahut kam hui hai and it really promotes healthy skin. Plus, it has the Mother of Vinegar which is awesome!"',
  },
  {
    name: "Neha Kapoor",
    designation: "Digital Marketing Lead",
    review:
      '"Work stress ki wajah se racing thoughts hote the aur neend nahi aati thi easily. But <b><strong>Zennova SLEEPGlow</strong></b> changed the game. 1 tablet before bed and I fall asleep so fast. Best part? Agli subah koi groggy feeling ya sir dard nahi hota, fresh feeling ke saath wake up refresh hotey hain!"',
  },
  {
    name: "Dr. Rohan Joshi",
    designation: "Consultant Physiotherapist",
    review:
      '"Hamari modern busy diet me micro-nutrients miss ho jaate hain. I personally take <b><strong>Zennova Multivitamins</strong></b> daily. B-Complex, Vitamin D3, aur Zinc ka proper balance hai. Energy levels sustained rehte hain and immune system robust feel hota hai. Great foundational supplement."',
  },
  {
    name: "Rahul Verma",
    designation: "Sales Manager",
    review:
      '"Work stress aur target pressure ki wajah se stamina aur drive low chal rahi thi. <b><strong>Zennova UPLIFT X</strong></b> start kiya and within 2 weeks performance aur endurance me bohot difference aaya hai. Total value for money product!"',
  },
  {
    name: "Marcus Thorne",
    designation: "Financial Analyst",
    review:
      '"High-impact training used to leave my knees and lower back feeling incredibly tight for days. <b><strong>Zennova Pain Relief</strong></b> has drastically shortened my recovery time. The natural anti-inflammatory benefits are real, and my joint mobility feels fluid again."',
  },
];

export default function HomeClient({ products, storeData }: Props) {
  const uniqueCategories = useMemo(
    () => [...new Set((storeData?.categories ?? []) as string[])],
    [storeData?.categories]
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        new (window as any).Swiper(".tp-slider-active", {
          slidesPerView: 1,
          spaceBetween: 30,
          effect: "fade",
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".tp-slider-button-prev",
            prevEl: ".tp-slider-button-next",
          },
          pagination: {
            el: ".tp-slider-dot",
            clickable: true,
            renderBullet: function (index: number, className: string) {
              return `<span class="${className}"><button>${index + 1}</button></span>`;
            },
          },
        });

        new (window as any).Swiper(".tp-product-categories-slider", {
          slidesPerView: 5,
          spaceBetween: 20,
          loop: false,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1200: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            420: { slidesPerView: 2 },
            0: { slidesPerView: 2 },
          },
        });

        new (window as any).Swiper(".tp-all-products-active", {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: false,
          pagination: {
            el: ".tp-all-products-slider-dot",
            clickable: true,
            renderBullet: function (index: number, className: string) {
              return `<span class="${className}"><button>${index + 1}</button></span>`;
            },
          },
          navigation: {
            nextEl: ".tp-all-products-slider-button-next",
            prevEl: ".tp-all-products-slider-button-prev",
          },
          breakpoints: {
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            420: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          },
        });

        new (window as any).Swiper(".tp-product-arrival-active", {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: false,
          pagination: {
            el: ".tp-arrival-slider-dot",
            clickable: true,
            renderBullet: function (index: number, className: string) {
              return `<span class="${className}"><button>${index + 1}</button></span>`;
            },
          },
          navigation: {
            nextEl: ".tp-arrival-slider-button-next",
            prevEl: ".tp-arrival-slider-button-prev",
          },
          breakpoints: {
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            420: { slidesPerView: 2 },
            375: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          },
        });

        new (window as any).Swiper(".zn-reels-slider-active", {
          slidesPerView: 4,
          spaceBetween: 20,
          loop: false,
          navigation: {
            nextEl: ".zn-reels-slider-button-next",
            prevEl: ".zn-reels-slider-button-prev",
          },
          pagination: {
            el: ".zn-reels-slider-dot",
            clickable: true,
            renderBullet: function (index: number, className: string) {
              return `<span class="${className}"><button>${index + 1}</button></span>`;
            },
          },
          breakpoints: {
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2.5 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1.2 },
          },
        });

        new (window as any).Swiper(".tp-testimoinal-slider-active-3", {
          slidesPerView: 2,
          spaceBetween: 24,
          loop: true,
          pagination: {
            el: ".tp-testimoinal-slider-dot-3",
            clickable: true,
            renderBullet: function (index: number, className: string) {
              return `<span class="${className}"><button>${index + 1}</button></span>`;
            },
          },
          navigation: {
            nextEl: ".tp-testimoinal-slider-button-next-3",
            prevEl: ".tp-testimoinal-slider-button-prev-3",
          },
          breakpoints: {
            1200: { slidesPerView: 2 },
            992: { slidesPerView: 2 },
            768: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          },
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [products.length, uniqueCategories.length]);

  const banners = storeData?.customization?.bannersSection?.banners ?? [];
  const catalogueSlide = storeData?.customization?.heroSection?.slides?.find(
    (slide: any) => slide.ctaLink === "/catalogue"
  );

  return (
    <>
      <main>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
                font-family: 'Oregano';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/storage/fonts/eeb4986ca8/soreganov15if2ixtpxcis3h4s2oz7vphvnzylfqw.woff2) format('woff2');
                unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            @font-face {
                font-family: 'Oregano';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/storage/fonts/eeb4986ca8/soreganov15if2ixtpxcis3h4s2ozdvphvnzyi.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        `,
          }}
        />

        <section className="tp-slider-area p-relative z-index-1">
          <div
            className="tp-slider-full-width tp-slider-active tp-slider-variation swiper-container"
            data-loop="1"
            data-autoplay="1"
            data-autoplay-speed="5000"
          >
            <div className="swiper-wrapper">
              {(storeData?.customization?.heroSection?.slides ?? []).map(
                (slide: any, i: number) => (
                  <div
                    className="tp-slider-item swiper-slide"
                    key={i}
                    style={{ backgroundColor: "transparent" } as React.CSSProperties}
                  >
                    <div className="tp-slider-thumb text-end">
                      <img
                        src={slide.backgroundImage}
                        loading={i === 0 ? "eager" : "lazy"}
                        alt={slide.title ?? ""}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="tp-slider-arrow tp-swiper-arrow d-none d-lg-block">
              <button type="button" className="tp-slider-button-prev">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path
                    d="M7 13L1 7L7 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button type="button" className="tp-slider-button-next">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path
                    d="M1 13L7 7L1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="tp-slider-dot tp-swiper-dot" />
          </div>
        </section>

        {/* Announcement Bar */}
        <div className="zn-announcement-bar-wrapper">
          <div className="zn-announcement-bar-content">
            <div className="zn-announcement-bar-item">
              <span>🎁 Buy 1 Get 1 Free on selected summer apparel!</span>
              <span>🔥 FLASH SALE: 20% OFF all electronics! Use code: FLASH20</span>
              <span>🚚 Free shipping on all orders over $50! Shop Now</span>
            </div>
            <div className="zn-announcement-bar-item">
              <span>🎁 Buy 1 Get 1 Free on selected summer apparel!</span>
              <span>🔥 FLASH SALE: 20% OFF all electronics! Use code: FLASH20</span>
              <span>🚚 Free shipping on all orders over $50! Shop Now</span>
            </div>
          </div>
        </div>

        <section className="tp-category-area pt-30 pb-30">
          <div className="container">
            <div className="tp-product-categories-slider swiper-container">
              <div className="swiper-wrapper">
                {(uniqueCategories).map((cat: string) => {
                  const count = products.filter((p) => p.category === cat).length;
                  const image =
                    storeData?.customization?.categoryImages?.[cat.toLowerCase()];
                  const slug = cat.toLowerCase().trim().replace(/\s+/g, "-");

                  return (
                    <div className="swiper-slide" key={slug}>
                      <div className="tp-product-category-item text-center mb-40">
                        <div className="tp-product-category-thumb fix">
                          <a
                            href={`/product-categories/${slug}`}
                            title={cat}
                          >
                            {image && <img src={image} alt={cat} />}
                          </a>
                        </div>
                        <div className="tp-product-category-content">
                          <h3 className="tp-product-category-title">
                            <a href={`/product-categories/${slug}`}>
                              {cat}
                            </a>
                          </h3>
                          <p>
                            {count} product{count !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="tp-product-area pb-50 pt-50 grey-bg-2">
          <div className="container">
            <div className="row align-items-end mb-40">
              <div className="col-12">
                <div className="tp-section-title-wrapper">
                  <h3 className="section-title tp-section-title">
                    <span>All</span> Supplements
                  </h3>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="tp-product-slider fix">
                  <div
                    className="tp-all-products-active swiper-container"
                    data-items-per-view="4"
                  >
                    <div className="swiper-wrapper">
                      {products.map((product) => (
                        <div className="swiper-slide h-auto" key={product.id}>
                          <ProductCard product={product} showCountdown={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="tp-all-products-slider-dot tp-swiper-dot text-center mt-30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tp-product-arrival-area pt-30 pb-30">
          <div className="container">
            <div className="row align-items-center mb-40">
              <div className="col-xl-5 col-sm-6">
                <div className="tp-section-title-wrapper">
                  <h3 className="section-title tp-section-title">
                    <span>Trending</span> Products
                  </h3>
                </div>
              </div>
              <div className="col-xl-7 col-sm-6">
                <div className="tp-product-arrival-more-wrapper d-flex justify-content-end">
                  <div className="tp-product-arrival-arrow tp-swiper-arrow text-end tp-product-arrival-border">
                    <button type="button" className="tp-arrival-slider-button-prev">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                        <path
                          d="M7 13L1 7L7 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button type="button" className="tp-arrival-slider-button-next">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                        <path
                          d="M1 13L7 7L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="tp-product-arrival-slider fix">
                  <div
                    className="tp-product-arrival-active swiper-container"
                    data-items-per-view="4"
                  >
                    <div className="swiper-wrapper">
                      {products.map((product) => (
                        <div className="swiper-slide h-auto" key={product.id}>
                          <ProductCard product={product} showCountdown={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="tp-arrival-slider-dot tp-swiper-dot text-center mt-30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tp-banner-area pt-30 pb-30">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix">
                  <div className="tp-banner-thumb include-bg transition-3">
                    <a href={catalogueSlide?.ctaLink || "#"}>
                      <img
                        src={banners[0]?.image}
                        alt={catalogueSlide?.title || "Catalogue"}
                        style={{ width: "100%" }}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix">
                  <div className="tp-banner-thumb include-bg transition-3">
                    <a href={banners[1]?.link || "/products"}>
                      <img
                        src={banners[1]?.image}
                        alt={banners[1]?.title || "Banner"}
                        style={{ width: "100%" }}
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="tp-banner-content">
                    <div className="tp-banner-btn">
                      <a href={banners[1]?.link || "/products"} className="tp-link-btn">
                        {banners[1]?.buttonText || "Shop Now"}
                        <svg
                          width="15"
                          height="13"
                          viewBox="0 0 15 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9998 6.19656L1 6.19656"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.75674 0.975394L14 6.19613L8.75674 11.4177"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DealOfTheDaySection products={products} />

        <div className="tp-product-banner-area pt-30 pb-30">
          <div className="container">
            <picture>
              <source
                srcSet="/storage/gemini-generated-image-4w8g5d4w8g5d4w8g-1.webp"
                media="(min-width: 992px)"
              />
              <img
                src="/storage/whatsapp-image-2026-05-21-at-44038-pm.webp"
                style={{ width: "100%" }}
                loading="lazy"
                alt="Certification"
              />
            </picture>
          </div>
        </div>

        {/* Reels / Social Reach Section */}
        <section className="tp-blog-area pt-50 pb-50">
          <div className="container">
            <div className="row align-items-center mb-40">
              <div className="col-xl-4 col-md-6">
                <div className="tp-section-title-wrapper">
                  <h3 className="section-title tp-section-title">
                    <span>Our</span> Social Reach
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="zn-reels-slider">
                  <div className="zn-reels-slider-active swiper-container">
                    <div className="swiper-wrapper">
                      {(storeData?.customization?.reelsSection?.reels ?? []).map((reel: any) => (
                        <div className="swiper-slide h-auto" key={reel.id}>
                          <div
                            className="zn-reel-card"
                            onMouseEnter={(e) => {
                              const video = e.currentTarget.querySelector("video");
                              if (video) video.play().catch(() => {});
                            }}
                            onMouseLeave={(e) => {
                              const video = e.currentTarget.querySelector("video");
                              if (video) video.pause();
                            }}
                            onClick={(e) => {
                              const video = e.currentTarget.querySelector("video");
                              if (video) {
                                if (video.paused) {
                                  video.play().catch(() => {});
                                } else {
                                  video.pause();
                                }
                              }
                            }}
                          >
                            <div className="zn-reel-video-wrapper">
                              <video
                                src={reel.videoUrl}
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="zn-reel-video"
                              />
                              <div className="zn-reel-overlay">
                                <div className="zn-reel-overlay-icon">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#ff6b00"/>
                                  </svg>
                                </div>
                                <div className="zn-reel-overlay-text">
                                  <h4 className="zn-reel-sub">{reel.sub}</h4>
                                  <p className="zn-reel-title">{reel.title}</p>
                                </div>
                              </div>
                            </div>
                            <button className="zn-reel-btn">WATCH NOW</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Floating navigation buttons */}
                  <button type="button" className="zn-reels-slider-button-prev">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M7 13L1 7L7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className="zn-reels-slider-button-next">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {/* Dots pagination */}
                  <div className="zn-reels-slider-dot tp-swiper-dot text-center mt-30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <CustomerReviewsSection testimonials={TESTIMONIALS} />
      </main>
    </>
  );
}
