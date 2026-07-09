"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  images: string[];
  name: string;
};

export default function ProductImagesGallery({ images = [], name }: Props) {
  const swiperRef = useRef<any>(null);

  // Clean duplicate / empty images if any
  const cleanImages = React.useMemo(() => {
    return (images || []).filter((img) => img && typeof img === "string");
  }, [images]);

  useEffect(() => {
    if (cleanImages.length <= 1) return;

    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        swiperRef.current = new (window as any).Swiper(".zn-product-details-gallery", {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          autoHeight: true, // Automatically adjusts container height to active slide image
          navigation: {
            nextEl: ".zn-gallery-next",
            prevEl: ".zn-gallery-prev",
          },
          pagination: {
            el: ".zn-gallery-pagination",
            clickable: true,
          },
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (swiperRef.current) {
        swiperRef.current.destroy?.(true, true);
      }
    };
  }, [cleanImages]);

  if (cleanImages.length === 0) {
    return (
      <div className="tp-product-details-large-img rounded overflow-hidden" style={{ background: "transparent" }}>
        <img src="/storage/logot.webp" alt={name} className="w-100" style={{ maxHeight: "500px", objectFit: "contain", height: "auto" }} />
      </div>
    );
  }

  if (cleanImages.length === 1) {
    return (
      <div className="tp-product-details-large-img rounded overflow-hidden" style={{ background: "transparent" }}>
        <img src={cleanImages[0]} alt={name} className="w-100" style={{ maxHeight: "500px", objectFit: "contain", height: "auto" }} />
      </div>
    );
  }

  return (
    <div className="zn-product-gallery-container relative">
      <div className="swiper-container zn-product-details-gallery rounded overflow-hidden" style={{ position: "relative", background: "transparent" }}>
        <div className="swiper-wrapper" style={{ display: "flex", alignItems: "center" }}>
          {cleanImages.map((img, index) => (
            <div className="swiper-slide text-center" key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={img}
                alt={`${name} - Image ${index + 1}`}
                className="w-100"
                style={{ maxHeight: "500px", objectFit: "contain", height: "auto" }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="zn-gallery-prev btn position-absolute top-50 start-0 translate-middle-y z-3 text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: "40px", height: "40px", marginLeft: "15px" }}
          aria-label="Previous image"
        >
          ❮
        </button>
        <button
          type="button"
          className="zn-gallery-next btn position-absolute top-50 end-0 translate-middle-y z-3 text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: "40px", height: "40px", marginRight: "15px" }}
          aria-label="Next image"
        >
          ❯
        </button>

        {/* Pagination dots container */}
        <div className="zn-gallery-pagination position-absolute bottom-0 start-50 translate-middle-x z-3 mb-3 d-flex gap-2"></div>
      </div>

      {/* Custom Styles for swiper layout & custom colors */}
      <style dangerouslySetInnerHTML={{ __html: `
        .zn-gallery-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          opacity: 1;
        }
        .zn-gallery-pagination .swiper-pagination-bullet-active {
          background: #f37324 !important;
          width: 10px;
          height: 10px;
        }
        .zn-product-details-gallery .swiper-slide img {
          max-height: 500px;
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        @media (max-width: 767px) {
          .zn-product-details-gallery .swiper-slide img {
            max-height: 380px !important;
          }
          .tp-product-details-large-img img {
            max-height: 380px !important;
          }
        }
      `}} />
    </div>
  );
}
