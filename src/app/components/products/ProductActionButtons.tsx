import React from "react";
import type { Product } from "@/types/product";
import { QuickViewIcon, WishlistIcon } from "./ProductIcons";

type Props = {
  product: Product;
};

function getWishlistFromCookie(): string[] {
  if (typeof document === "undefined") return [];
  const name = "zen_nova_wishlist=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      const val = c.substring(name.length, c.length);
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
  }
  return [];
}

export default function ProductActionButtons({ product }: Props) {
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  React.useEffect(() => {
    // Initial check
    const list = getWishlistFromCookie();
    setIsInWishlist(list.includes(product.id));

    // Synchronize state across components when wishlist events fire
    const handleUpdate = () => {
      const updatedList = getWishlistFromCookie();
      setIsInWishlist(updatedList.includes(product.id));
    };

    document.addEventListener("ecommerce.wishlist.added", handleUpdate);
    document.addEventListener("ecommerce.wishlist.removed", handleUpdate);

    return () => {
      document.removeEventListener("ecommerce.wishlist.added", handleUpdate);
      document.removeEventListener("ecommerce.wishlist.removed", handleUpdate);
    };
  }, [product.id]);

  const tooltipText = isInWishlist ? "Remove From Wishlist" : "Add To Wishlist";

  return (
    <div className="tp-product-action">
      <div className="d-flex flex-column tp-product-action-item">
        <button
          type="button"
          className="tp-product-quick-view-btn tp-product-action-btn"
          title="Quick View"
          data-bs-toggle="modal"
          data-bs-target="#product-quick-view-modal"
          data-url={`/ajax/quick-view/${product.id}`}
        >
          <QuickViewIcon />
          <span className="tp-product-tooltip">Quick View</span>
        </button>
        <button
          type="button"
          className={`tp-product-add-to-wishlist-btn tp-product-action-btn ${isInWishlist ? "active" : ""}`}
          data-bb-toggle="add-to-wishlist"
          title={tooltipText}
          data-url={`/wishlist/${product.id}`}
          data-add-text="Add To Wishlist"
          data-remove-text="Remove From Wishlist"
        >
          <WishlistIcon />
          <span className="tp-product-tooltip">{tooltipText}</span>
        </button>
      </div>
    </div>
  );
}
