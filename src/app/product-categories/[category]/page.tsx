/* eslint-disable */
import React from "react";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";


export default async function CategoryListing({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const resolvedParams = await params;
  const { category } = resolvedParams;
  const normalizedCategory = category.toLowerCase();

  const allProducts = await getProducts();
  const apiCategories = [
    ...new Set(allProducts.map((p: any) => p.category?.toLowerCase()).filter(Boolean)),
  ] as string[];

  const isAll = normalizedCategory === "all-supplements";

  if (!isAll && !apiCategories.includes(normalizedCategory)) {
    notFound();
  }

  const categoryTitle = isAll
    ? "All Supplements"
    : normalizedCategory === "weight-management"
    ? "Weight Management"
    : normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1);

  const filteredProducts = isAll
    ? allProducts
    : allProducts.filter((p: any) => p.category?.toLowerCase() === normalizedCategory);

  return (
    <main>
      {/* Breadcrumb */}
      <section className="breadcrumb__area pt-80 pb-80" style={{ backgroundColor: "#000", borderBottom: "1px solid #111" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content text-center">
                <h2 className="breadcrumb__title text-white">{categoryTitle}</h2>
                <div className="breadcrumb__list text-white">
                  <span><a href="/" className="text-white">Home</a></span>
                  <span className="dvdr">/</span>
                  <span><a href="/products" className="text-white">Categories</a></span>
                  <span className="dvdr">/</span>
                  <span className="text-white-50">{categoryTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Category Area */}
      <section className="tp-shop-area pt-100 pb-100 grey-bg-2">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-xl-6 text-center py-5">
                <h3 className="text-white mb-3">No Products Found</h3>
                <p className="text-white-50 mb-4">We currently do not have any products listed under the {categoryTitle} category. Explore our other supplements.</p>
                <a href="/products" className="tp-btn text-white bg-warning hover-dark-btn py-3 px-5 d-inline-block rounded">
                  View All Products
                </a>
              </div>
            </div>
          ) : (
            <div className="row">
{filteredProducts.map((product: any) => (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-40" key={product.id}>
                  <div className="tp-product-item transition-3 p-relative fix m-img bg-dark text-white rounded" style={{ border: "1px solid #222" }}>
                    <div className="tp-product-thumb p-relative fix">
                      <a href={`/products/${product.slug}`}>
<img src={(product as any).images?.[0]} alt={product.name} className="w-100" style={{ objectFit: "cover" }} />
                      </a>
                      {(product as any).isBestSeller && (
                        <div className="tp-product-badge">
<span style={{ backgroundColor: "#AC2200" }}>Sale</span>
                        </div>
                      )}
                      <div className="tp-product-action">
                        <div className="d-flex flex-column tp-product-action-item">
                          <a href={`/products/${product.slug}`} className="tp-product-action-btn" title="View Details">
                            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="tp-product-content p-4">
                      <h3 className="tp-product-title text-truncate mb-2">
                        <a href={`/products/${product.slug}`} className="text-white hover-orange">{product.name}</a>
                      </h3>
                      <div className="tp-product-price-wrapper mb-3">
                        <span className="tp-product-price new-price text-warning mr-10">₹{product.price}</span>
                        <span className="tp-product-price old-price text-white-50"><del>₹{(product as any).compareAtPrice}</del>
</span>
                      </div>
                      <div className="tp-product-add-cart-btn-large-wrapper">
                        <a 
                          href={`/products/${product.slug}`}
                          className="tp-product-add-cart-btn-large w-100 text-center text-white bg-warning hover-dark-btn py-2 d-block rounded"
                        >
                          View Product
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
