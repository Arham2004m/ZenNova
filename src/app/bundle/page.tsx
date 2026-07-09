import { getFrontend, getProducts } from "@/lib/api";
import BundleOfferClient from "./BundleOfferClient";
import type { BundleOffer } from "@/components/Bundle/types";

type StoreBanner = {
  id?: string;
  link?: string;
  image?: string;
};

function getBundlePageBanner(storeData: { customization?: { bannersSection?: { banners?: StoreBanner[] } } }) {
  const banners = storeData?.customization?.bannersSection?.banners ?? [];
  return (
    banners.find((banner) => banner.id === "banner-1782656766978") ??
    banners.find((banner) => /\/bundle/i.test(banner.link ?? "")) ??
    null
  );
}

export default async function BundlePage() {
  const [storeData, allProducts] = await Promise.all([
    getFrontend(),
    getProducts()
  ]);
  const bundles = (storeData?.bundles || []) as BundleOffer[];
  const activeBundle = bundles.find((bundle) => bundle.isActive);
  const bundleBanner = getBundlePageBanner(storeData);

  if (!activeBundle) {
    return (
      <main className="zn-bundle-offer-page">
        <section className="container pb-100 pt-50">
          <div className="zn-bundle-offer__empty-page">
            <h2>No bundle offers available</h2>
            <p>Check back soon for new bundle deals.</p>
          </div>
        </section>
      </main>
    );
  }

  // Populate active bundle with all active store products
  const activeProducts = (allProducts || []).filter((p: any) => p.isActive !== false);
  activeBundle.selectedProducts = activeProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
    images: p.images || [],
    category: p.category,
    stock: p.stock,
    isActive: p.isActive,
  }));

  return (
    <BundleOfferClient
      bundle={activeBundle}
      bannerImage={bundleBanner?.image ?? null}
    />
  );
}

