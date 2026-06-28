import { getFrontend, getProducts } from "@/lib/api";
import BundleCard from "@/components/Bundle/BundleCard";
import type { BundleOffer } from "@/components/Bundle/types";

export default async function BundlePage() {
  const [products, storeData] = await Promise.all([getProducts(), getFrontend()]);
  const bundles = (storeData?.bundles || []) as BundleOffer[];

  return (
    <main className="zn-bundle-page">
      <section className="breadcrumb__area breadcrumb__style-2 include-bg pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className="breadcrumb__title">Bundle Offers</h3>
                <div className="breadcrumb__list">
                  <span><a href="/">Home</a></span>
                  <span>Bundle Offers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-100 pt-30">
        {bundles.length === 0 ? (
          <div className="zn-bundle-offer__empty-page">
            <h2>No bundle offers available</h2>
            <p>Check back soon for new bundle deals.</p>
          </div>
        ) : (
          <div className="zn-bundle-page__grid">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} products={products} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
