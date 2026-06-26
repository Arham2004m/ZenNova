import React from "react";
import { getProducts } from "@/lib/api";
import ShopClient from "./ShopClient";

export default async function Shop() {
  const products = await getProducts();

  const categoryCounts: Record<string, number> = { All: products.length };
  products.forEach((p: any) => {
    const cat = p.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const categories = Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));

  return <ShopClient products={products} categories={categories} />;
}