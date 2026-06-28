/* eslint-disable */
import React from "react";
import { getProducts } from "@/lib/api";
import ShopClient from "@/app/products/ShopClient";
import type { Product } from "@/types/product";
import {
  filterProductsByCategorySlug,
  getCategoryTitle,
  normalizeCategorySlug,
} from "@/lib/category-slugs";

export default async function CategoryListing({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const normalizedCategory = normalizeCategorySlug(category);
  const categoryTitle = getCategoryTitle(category);
  const allProducts: Product[] = await getProducts();
  const filteredProducts = filterProductsByCategorySlug(allProducts, normalizedCategory);

  const categoryCounts: Record<string, number> = {};
  filteredProducts.forEach((p) => {
    const cat = p.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <ShopClient
      products={filteredProducts}
      categories={categories}
      categoryPage={{
        title: categoryTitle,
        slug: normalizedCategory,
      }}
    />
  );
}
