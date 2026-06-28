/* eslint-disable */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "../components/products/ProductCard";
import ShopPriceFilter from "../components/shop/ShopPriceFilter";
import ShopSelect from "../components/shop/ShopSelect";
import {
  extractVariantFilters,
  getPriceBounds,
  isColorAttribute,
  productMatchesAttributes,
} from "../components/shop/shopFilterUtils";
import { getNavCategoryLinks } from "@/lib/category-slugs";

type CategoryItem = {
  name: string;
  count: number;
  slug: string;
  image?: string;
  filterValue: string;
};

type Props = {
  products: Product[];
  categories: { name: string; count: number }[];
  storeData?: any;
  categoryPage?: {
    title: string;
    slug: string;
  };
};

type SortOption =
  | "default"
  | "oldest"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating-asc"
  | "rating-desc";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "oldest", label: "Oldest" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
  { value: "rating-asc", label: "Rating: low to high" },
  { value: "rating-desc", label: "Rating: high to low" },
];

const PER_PAGE_OPTIONS = [
  { value: "12", label: "12" },
  { value: "24", label: "24" },
  { value: "36", label: "36" },
];

const FOLDER_ICON = (
  <svg
    className="icon svg-icon-ti-ti-folder"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
  </svg>
);

const ALL_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.5 4.5h4.7l-3.8 2.8 1.5 4.5-3.9-2.8-3.9 2.8 1.5-4.5-3.8-2.8h4.7z" />
    <path d="M5 19h14" />
  </svg>
);

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

function getCategoryImage(name: string, images: Record<string, string>) {
  const key = name.toLowerCase();
  return (
    images[key] ||
    images[key.replace(/\s+/g, "-")] ||
    images[key.replace(/\s+/g, "")]
  );
}

function colorToCss(value: string) {
  const map: Record<string, string> = {
    green: "#4ade80",
    blue: "#60a5fa",
    red: "#f87171",
    black: "#111111",
    white: "#f5f5f5",
    orange: "#ff6b00",
    yellow: "#facc15",
    pink: "#f472b6",
    purple: "#a78bfa",
    brown: "#a16207",
    grey: "#9ca3af",
    gray: "#9ca3af",
  };
  return map[value.toLowerCase()] ?? "#60a5fa";
}

export default function ShopClient({
  products,
  categories,
  storeData = {},
  categoryPage,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedTags, setExpandedTags] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, Set<string>>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [perPage, setPerPage] = useState(24);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const priceBounds = useMemo(() => getPriceBounds(products), [products]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceBounds.min,
    priceBounds.max,
  ]);

  const categoryImages = storeData?.customization?.categoryImages ?? {};

  useEffect(() => {
    setPriceRange([priceBounds.min, priceBounds.max]);
  }, [priceBounds.min, priceBounds.max]);

  const displayCategories = useMemo<CategoryItem[]>(() => {
    const allItem: CategoryItem = {
      name: "All Supplements",
      count: products.length,
      slug: "all-supplements",
      filterValue: "All",
      image:
        getCategoryImage("all supplements", categoryImages) ||
        products[0]?.images?.[0],
    };

    const items = categories
      .filter((cat) => cat.name.toLowerCase() !== "all")
      .map((cat) => ({
        name: cat.name,
        count: cat.count,
        slug: slugify(cat.name),
        filterValue: cat.name,
        image: getCategoryImage(cat.name, categoryImages),
      }));

    return [allItem, ...items];
  }, [categories, categoryImages, products]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    products.forEach((product) => {
      product.tags?.forEach((tag) => {
        if (tag?.trim()) tagSet.add(tag.trim());
      });
    });
    return [...tagSet].sort((a, b) => a.localeCompare(b));
  }, [products]);

  const productsByTag = useMemo(() => {
    const map = new Map<string, Product[]>();
    allTags.forEach((tag) => {
      map.set(
        tag,
        products.filter((product) =>
          product.tags?.some((item) => item.toLowerCase() === tag.toLowerCase())
        )
      );
    });
    return map;
  }, [allTags, products]);

  const variantFilters = useMemo(() => extractVariantFilters(products), [products]);

  const navCategories = useMemo(() => getNavCategoryLinks(), []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (!categoryPage && selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) =>
          p.tags?.some((item) => item.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    result = result.filter((p) => {
      const price = Number(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (Object.values(selectedAttributes).some((set) => set.size > 0)) {
      result = result.filter((p) => productMatchesAttributes(p, selectedAttributes));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating-asc":
      case "rating-desc":
        result.sort((a, b) => {
          const aScore = Number(a.isBestSeller) + Number(a.isFeatured);
          const bScore = Number(b.isBestSeller) + Number(b.isFeatured);
          return sortBy === "rating-asc" ? aScore - bScore : bScore - aScore;
        });
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    selectedTags,
    selectedAttributes,
    priceRange,
    searchQuery,
    sortBy,
    categoryPage,
  ]);

  const visibleProducts = filteredProducts.slice(0, perPage);
  const total = filteredProducts.length;

  const swiperRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (categoryPage) return;

    const timer = setTimeout(() => {
      if (typeof window === "undefined" || !(window as any).Swiper) return;

      swiperRef.current?.destroy();
      swiperRef.current = new (window as any).Swiper(".zn-shop-categories-slider", {
        slidesPerView: 2,
        spaceBetween: 18,
        loop: false,
        breakpoints: {
          576: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        },
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      swiperRef.current?.destroy();
      swiperRef.current = null;
    };
  }, [displayCategories.length, categoryPage]);

  const selectCategory = (filterValue: string) => {
    setSelectedCategory(filterValue);
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
    setExpandedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const toggleAttribute = (key: string, value: string) => {
    setSelectedAttributes((current) => {
      const next = { ...current };
      const set = new Set(next[key] ?? []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      next[key] = set;
      return next;
    });
  };

  if (categoryPage && products.length === 0) {
    return (
      <main className="zn-shop-page zn-category-page">
        <section className="zn-category-empty-page">
          <div className="container">
            <h1 className="zn-category-shop-title">{categoryPage.title}</h1>
            <div className="zn-category-empty">
              <div className="zn-category-empty__icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <p className="zn-category-empty__label">Empty category</p>
              <h2>No products here yet</h2>
              <p className="zn-category-empty__text">
                We don&apos;t have any items in <strong>{categoryPage.title}</strong> right now.
                Browse our full catalog to find what you need.
              </p>
              <a href="/products" className="zn-category-empty__btn">
                View all products
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={`zn-shop-page ${categoryPage ? "zn-category-page" : ""}`}>
      {!categoryPage && (
      <section className="tp-product-category zn-shop-categories pt-40 pb-20">
        <div className="container">
          <div className="tp-product-categories-slider zn-shop-categories-slider swiper-container">
            <div className="swiper-wrapper">
              {displayCategories.map((cat) => (
                <div className="swiper-slide" key={cat.slug}>
                  <button
                    type="button"
                    className={`zn-shop-category-card w-100 border-0 bg-transparent p-0 ${
                      selectedCategory === cat.filterValue ? "is-active" : ""
                    }`}
                    onClick={() => selectCategory(cat.filterValue)}
                  >
                    <div className="zn-shop-category-tile tp-product-category-item text-center">
                      <div className="tp-product-category-thumb fix">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} loading="lazy" />
                        ) : (
                          <span className="zn-shop-category-card__placeholder" />
                        )}
                      </div>
                      <div className="tp-product-category-content">
                        <h3 className="tp-product-category-title">{cat.name}</h3>
                        <p>
                          {cat.count} product{cat.count !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      <section className="tp-shop-area pb-100 zn-shop-area">
        <div className="container">
          {categoryPage && (
            <h1 className="zn-category-shop-title">{categoryPage.title}</h1>
          )}
          <div className="row zn-shop-toolbar-row g-3 align-items-center">
            <div className="col-xl-3 col-lg-4">
              <div className="tp-sidebar-search-input zn-shop-toolbar-search">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14L11.1 11.1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="tp-shop-top zn-shop-top">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div className="tp-shop-top-left d-flex align-items-center gap-3 flex-wrap">
                    <div className="tp-shop-top-tab">
                      <ul className="nav nav-tabs border-0 mb-0">
                        <li className="nav-item">
                          <button
                            type="button"
                            className={`nav-link ${viewMode === "grid" ? "active" : ""}`}
                            onClick={() => setViewMode("grid")}
                            aria-label="Grid view"
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                              <rect x="11" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                              <rect x="1" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                              <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className={`nav-link ${viewMode === "list" ? "active" : ""}`}
                            onClick={() => setViewMode("list")}
                            aria-label="List view"
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M1 4H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M1 9H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M1 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <p className="zn-shop-product-count">
                      {total === 0
                        ? "No products found"
                        : `${total} Product${total !== 1 ? "s" : ""} found`}
                    </p>
                  </div>

                  <div className="tp-shop-top-right d-flex gap-2 flex-wrap">
                    <ShopSelect
                      value={sortBy}
                      options={SORT_OPTIONS}
                      onChange={(value) => setSortBy(value as SortOption)}
                      ariaLabel="Sort products"
                    />
                    <ShopSelect
                      value={String(perPage)}
                      options={PER_PAGE_OPTIONS}
                      onChange={(value) => setPerPage(Number(value))}
                      ariaLabel="Products per page"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 zn-shop-content-row">
            <div className="col-xl-3 col-lg-4">
              <aside className="bb-shop-sidebar tp-shop-sidebar zn-shop-sidebar">
                <div className="tp-shop-widget">
                  <h3 className="tp-shop-widget-title">Categories</h3>
                  <div className="tp-shop-widget-content">
                    <div className="tp-shop-widget-categories zn-shop-widget-categories">
                      <ul>
                        {categoryPage
                          ? navCategories.map((cat) => (
                              <li key={cat.slug}>
                                <a
                                  href={`/product-categories/${cat.slug}`}
                                  className={cat.slug === categoryPage.slug ? "active" : ""}
                                >
                                  {cat.slug === "all-supplements" ? ALL_ICON : FOLDER_ICON}
                                  <span>{cat.title}</span>
                                </a>
                              </li>
                            ))
                          : displayCategories.map((cat) => (
                              <li key={cat.slug}>
                                <button
                                  type="button"
                                  className={
                                    selectedCategory === cat.filterValue ? "active" : ""
                                  }
                                  onClick={() => selectCategory(cat.filterValue)}
                                >
                                  {cat.filterValue === "All" ? ALL_ICON : FOLDER_ICON}
                                  <span>{cat.name}</span>
                                </button>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {allTags.length > 0 && (
                  <div className="tp-shop-widget">
                    <h3 className="tp-shop-widget-title">Tags</h3>
                    <div className="tp-shop-widget-content">
                      <ul className="zn-shop-checklist">
                        {allTags.map((tag) => (
                          <li key={tag} className="zn-shop-tag-item">
                            <label className="zn-shop-check">
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                              />
                              <span className="zn-shop-check__box" />
                              <span className="zn-shop-check__label">{tag}</span>
                            </label>
                            {expandedTags.includes(tag) && (
                              <div className="zn-shop-tag-detail">
                                <p className="zn-shop-tag-detail__heading">
                                  Used in {productsByTag.get(tag)?.length ?? 0} product
                                  {(productsByTag.get(tag)?.length ?? 0) !== 1 ? "s" : ""}:
                                </p>
                                <ul>
                                  {productsByTag.get(tag)?.map((product) => (
                                    <li key={product.id}>
                                      <a href={`/products/${product.slug}`}>{product.name}</a>
                                      <span>{product.category}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {variantFilters.map((filter) => (
                  <div className="tp-shop-widget" key={filter.key}>
                    <h3 className="tp-shop-widget-title">{filter.label}</h3>
                    <div className="tp-shop-widget-content">
                      <ul className="zn-shop-checklist">
                        {filter.values.map((value) => (
                          <li key={value}>
                            <label className="zn-shop-check">
                              <input
                                type="checkbox"
                                checked={selectedAttributes[filter.key]?.has(value) ?? false}
                                onChange={() => toggleAttribute(filter.key, value)}
                              />
                              {isColorAttribute(filter.key) ? (
                                <span
                                  className="zn-shop-color-swatch"
                                  style={{ backgroundColor: colorToCss(value) }}
                                />
                              ) : (
                                <span className="zn-shop-check__box" />
                              )}
                              <span className="zn-shop-check__label">{value}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="tp-shop-widget">
                  <h3 className="tp-shop-widget-title">Price</h3>
                  <div className="tp-shop-widget-content">
                    <ShopPriceFilter
                      min={priceBounds.min}
                      max={priceBounds.max}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                  </div>
                </div>
              </aside>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="tp-shop-main-wrapper zn-shop-main">
                <div
                  className={`tp-shop-items-wrapper zn-shop-items ${
                    viewMode === "list" ? "is-list" : "is-grid"
                  }`}
                >
                  {visibleProducts.length === 0 ? (
                    <div className="zn-shop-empty text-center py-5">
                      <p>No products found.</p>
                    </div>
                  ) : viewMode === "list" ? (
                    <div className="zn-shop-list-stack">
                      {visibleProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          showCountdown={false}
                          shopLayout
                          shopListView
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="row zn-product-grid g-4">
                      {visibleProducts.map((product) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6 col-sm-6 d-flex"
                          key={product.id}
                        >
                          <ProductCard
                            product={product}
                            showCountdown={false}
                            shopLayout
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
