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
      className={`zn-product-details-wishlist tp-product-add-to-wishlist-btn ${isInWishlist ? "is-active" : ""}`}
      data-bb-toggle="add-to-wishlist"
      title={tooltipText}
      aria-label={tooltipText}
      data-url={`/wishlist/${productId}`}
      data-add-text="Add To Wishlist"
      data-remove-text="Remove From Wishlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isInWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428a5 5 0 1 1 7.5-6.566 5 5 0 1 1 7.5 6.572" />
      </svg>
    </button>
  );
}
