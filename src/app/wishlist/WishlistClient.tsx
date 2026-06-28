"use client";

import React from "react";
import type { Product } from "@/types/product";

type Props = {
  initialProducts: Product[];
};

export default function WishlistClient({ initialProducts }: Props) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

  React.useEffect(() => {
    // Sync state when products are removed from wishlist
    const handleWishlistRemoved = (e: any) => {
      const element = e.detail?.element;
      if (element) {
        const url = element.data("url") || "";
        const parts = url.split("/");
        const id = parts[parts.length - 1];
        if (id) {
          setProducts((prev) => prev.filter((p) => p.id !== id));
        }
      }
    };

    // Sync state when products are moved/added to cart (which automatically removes them from wishlist)
    const handleCartAdded = (e: any) => {
      const id = e.detail?.data?.id || e.detail?.element?.data("id");
      if (id) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        // Update wishlist count badge in header
        const badge = document.querySelector('[data-bb-value="wishlist-count"]');
        if (badge) {
          const currentCount = parseInt(badge.textContent || "0", 10);
          if (currentCount > 0) {
            badge.textContent = String(currentCount - 1);
          }
        }
      }
    };

    document.addEventListener("ecommerce.wishlist.removed", handleWishlistRemoved);
    document.addEventListener("ecommerce.cart.added", handleCartAdded);

    return () => {
      document.removeEventListener("ecommerce.wishlist.removed", handleWishlistRemoved);
      document.removeEventListener("ecommerce.cart.added", handleCartAdded);
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="row justify-content-center">
        <div className="col-xl-8 text-center text-white">
          <div className="p-5 bg-dark rounded" style={{ border: "1px solid #222" }}>
            <h3 className="text-white mb-3">Your Wishlist is Empty</h3>
            <p className="text-white-50 mb-4">Keep track of your favorite supplements by clicking the heart icon on product cards.</p>
            <a href="/products" className="tp-btn bg-warning text-dark py-3 px-5 d-inline-block rounded font-weight-bold">
              View Shop
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="tp-cart-list mb-25 bg-dark p-4 rounded" style={{ border: "1px solid #222", overflowX: "auto" }}>
          <table className="table" style={{ color: "white", minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #333" }}>
                <th colSpan={2} className="tp-cart-header-product text-white" style={{ borderBottom: "none" }}>Product</th>
                <th className="tp-cart-header-price text-white" style={{ borderBottom: "none" }}>Price</th>
                <th className="tp-cart-header-quantity text-white" style={{ borderBottom: "none" }}>Status</th>
                <th className="text-white" style={{ borderBottom: "none" }}>Remove</th>
                <th className="text-white" style={{ borderBottom: "none" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const image = product.images?.[0] || "/storage/logot.webp";
                const isAvailable = product.isActive && product.stock > 0;
                
                return (
                  <tr key={product.id} style={{ borderBottom: "1px solid #222", verticalAlign: "middle" }}>
                    {/* Image */}
                    <td className="tp-cart-img" style={{ borderBottom: "none", padding: "15px 0" }}>
                      <a href={`/products/${product.slug}`}>
                        <img src={image} alt={product.name} style={{ width: "70px", height: "70px", objectFit: "contain", backgroundColor: "#111", borderRadius: "4px" }} />
                      </a>
                    </td>
                    {/* Name */}
                    <td className="tp-cart-title" style={{ borderBottom: "none" }}>
                      <a href={`/products/${product.slug}`} className="text-white font-weight-bold hover-orange" style={{ fontSize: "15px" }}>
                        {product.name}
                      </a>
                    </td>
                    {/* Price */}
                    <td className="tp-cart-price" style={{ borderBottom: "none" }}>
                      <span className="text-warning font-weight-bold" style={{ fontSize: "16px" }}>
                        ₹{parseFloat(product.price).toLocaleString("en-IN")}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="tp-cart-status" style={{ borderBottom: "none" }}>
                      {isAvailable ? (
                        <span className="badge bg-success" style={{ padding: "6px 12px" }}>In Stock</span>
                      ) : (
                        <span className="badge bg-danger" style={{ padding: "6px 12px" }}>Unavailable</span>
                      )}
                    </td>
                    {/* Remove button */}
                    <td className="tp-cart-action" style={{ borderBottom: "none" }}>
                      <button 
                        className="btn btn-outline-danger d-flex align-items-center gap-1 py-1 px-3" 
                        data-bb-toggle="remove-from-wishlist" 
                        data-url={`/wishlist/${product.id}`}
                        style={{ borderRadius: "4px", fontSize: "13px" }}
                      >
                        <svg className="icon svg-icon-ti-ti-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Remove
                      </button>
                    </td>
                    {/* Add to cart */}
                    <td className="tp-cart-add-to-cart" style={{ borderBottom: "none" }}>
                      {isAvailable ? (
                        <button 
                          className="tp-btn" 
                          data-bb-toggle="add-to-cart" 
                          data-id={product.id} 
                          data-url="/ajax/cart-content"
                          style={{ padding: "8px 20px", fontSize: "14px", backgroundColor: "#f37324", color: "#fff", border: "none" }}
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <button 
                          className="tp-btn disabled" 
                          disabled
                          style={{ padding: "8px 20px", fontSize: "14px", opacity: 0.5, cursor: "not-allowed" }}
                        >
                          Unavailable
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
