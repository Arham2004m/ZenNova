import React from "react";
import { getFrontend, getProducts } from "@/lib/api";
import ShopClient from "./ShopClient";

export default async function Shop() {
  const [products, storeData] = await Promise.all([
    getProducts(),
    getFrontend().catch(() => null),
  ]);

  const categoryCounts: Record<string, number> = {};
  products.forEach((p: { category?: string }) => {
    const cat = p.category || "Other";
    if (cat.toLowerCase() !== "all") {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <ShopClient
      products={products}
      categories={categories}
      storeData={storeData}
    />
  );
}
