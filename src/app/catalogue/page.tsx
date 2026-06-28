import { getFrontend } from "@/lib/api";
import ShopClient from "../products/ShopClient";

export default async function CataloguePage() {
  const frontend = await getFrontend();

  const products = frontend.products ?? [];

  const categoryCounts: Record<string, number> = {};

  products.forEach((p: any) => {
    const cat = p.category || "Other";
    if (cat.toLowerCase() !== "all") {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  const categories = Object.entries(categoryCounts).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  return (
    <ShopClient
      products={products}
      categories={categories}
      storeData={frontend}
    />
  );
}