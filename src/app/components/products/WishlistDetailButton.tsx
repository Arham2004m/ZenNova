"use client";

import React from "react";

type Props = {
  productId: string;
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

export default function WishlistDetailButton({ productId }: Props) {
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  React.useEffect(() => {
    const list = getWishlistFromCookie();
    setIsInWishlist(list.includes(productId));

    const handleUpdate = () => {
      const updatedList = getWishlistFromCookie();
      setIsInWishlist(updatedList.includes(productId));
    };

    document.addEventListener("ecommerce.wishlist.added", handleUpdate);
    document.addEventListener("ecommerce.wishlist.removed", handleUpdate);

    return () => {
      document.removeEventListener("ecommerce.wishlist.added", handleUpdate);
      document.removeEventListener("ecommerce.wishlist.removed", handleUpdate);
    };
  }, [productId]);

  const tooltipText = isInWishlist ? "Remove From Wishlist" : "Add To Wishlist";

  return (
    <button
      type="button"
      className={`tp-product-add-to-wishlist-btn tp-product-action-btn rounded d-flex align-items-center justify-content-center ${isInWishlist ? "active" : ""}`}
      data-bb-toggle="add-to-wishlist"
      title={tooltipText}
      data-url={`/wishlist/${productId}`}
      data-add-text="Add To Wishlist"
      data-remove-text="Remove From Wishlist"
      style={{
        width: "45px",
        height: "45px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backgroundColor: isInWishlist ? "#f37324" : "rgba(255, 255, 255, 0.05)",
        color: "#fff",
      }}
    >
      <svg className="icon svg-icon-ti-ti-heart" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428m0 0a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572" />
      </svg>
      <span className="tp-product-tooltip">{tooltipText}</span>
    </button>
  );
}
