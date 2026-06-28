"use client";

import { useCallback, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { addBundleToCart } from "@/lib/api";
import type { BundleOffer, BundleProduct } from "@/components/Bundle/types";

function toBundleProduct(product: Product | BundleProduct): BundleProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    images: product.images || [],
    category: product.category,
    stock: product.stock,
    isActive: product.isActive,
  };
}

export function getEligibleProducts(bundle: BundleOffer, allProducts: Product[]): BundleProduct[] {
  const mode = bundle.mode || bundle.bundleMode || "CATEGORY";

  if (mode === "PRODUCTS") {
    const mapped = (bundle.selectedProducts || []).map(toBundleProduct);
    if (mapped.length) return mapped;
    return [];
  }

  const categoryName = bundle.category?.name;
  if (!categoryName) return [];

  return allProducts
    .filter((product) => product.category === categoryName && product.isActive !== false)
    .map(toBundleProduct);
}

export function useBundle(bundle: BundleOffer, allProducts: Product[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const eligibleProducts = useMemo(
    () => getEligibleProducts(bundle, allProducts),
    [bundle, allProducts]
  );

  const selectedProducts = useMemo(
    () => eligibleProducts.filter((product) => selectedIds.includes(product.id)),
    [eligibleProducts, selectedIds]
  );

  const requiredQuantity = bundle.requiredQuantity;
  const bundlePrice = Number(bundle.bundlePrice);

  const subtotal = useMemo(
    () => selectedProducts.reduce((sum, product) => sum + Number(product.price), 0),
    [selectedProducts]
  );

  const isComplete = selectedIds.length === requiredQuantity;
  const payable = isComplete ? bundlePrice : subtotal;
  const savings = isComplete ? Math.max(0, subtotal - bundlePrice) : 0;

  const toggleProduct = useCallback(
    (productId: string) => {
      setError(null);
      setSuccess(null);
      setSelectedIds((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);
        }
        if (prev.length >= requiredQuantity) {
          return prev;
        }
        return [...prev, productId];
      });
    },
    [requiredQuantity]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setError(null);
    setSuccess(null);
  }, []);

  const addToCart = useCallback(async () => {
    setError(null);
    setSuccess(null);

    if (!isComplete) {
      setError(`Select ${requiredQuantity} product${requiredQuantity === 1 ? "" : "s"} to unlock the bundle price.`);
      return;
    }

    try {
      setAdding(true);
      const result = await addBundleToCart(bundle.id, selectedIds);
      if (!result.success) {
        throw new Error(result.message || "Could not add bundle to cart");
      }

      const existing = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("orbit_cart") || "[]")
        : [];
      const nextCart = Array.isArray(existing) ? [...existing, result.cartItem] : [result.cartItem];
      localStorage.setItem("orbit_cart", JSON.stringify(nextCart));
      window.dispatchEvent(new CustomEvent("orbit:cart-updated"));

      setSuccess("Bundle added to cart!");
      setSelectedIds([]);
    } catch (err: any) {
      setError(err.message || "Failed to add bundle to cart");
    } finally {
      setAdding(false);
    }
  }, [bundle.id, isComplete, requiredQuantity, selectedIds]);

  return {
    eligibleProducts,
    selectedIds,
    selectedProducts,
    requiredQuantity,
    bundlePrice,
    subtotal,
    payable,
    savings,
    isComplete,
    toggleProduct,
    clearSelection,
    addToCart,
    adding,
    error,
    success,
  };
}
