/* eslint-disable */
import { getFrontend, getProducts } from "@/lib/api";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [products, storeData] = await Promise.all([
    getProducts(),
    getFrontend(),
  ]);
  return <HomeClient products={products} storeData={storeData} />;
}