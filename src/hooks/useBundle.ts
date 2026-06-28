"use client";

import { useCallback, useMemo, useState } from "react";
import { addBundleToCart } from "@/lib/api";
import type { BundleOffer, BundleProduct } from "@/components/Bundle/types";

function normalizeBundleProduct(product: BundleProduct): BundleProduct {
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

/** Products explicitly chosen by admin in EVOC Labs — no category filtering. */
export function getBundleProducts(bundle: BundleOffer): BundleProduct[] {
  return (bundle.selectedProducts || [])
    .filter((product) => product.isActive !== false)
    .map(normalizeBundleProduct);
}

export function useBundle(bundle: BundleOffer) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bundleProducts = useMemo(() => getBundleProducts(bundle), [bundle]);

  const requiredQuantity = bundle.requiredQuantity;
  const bundlePrice = Number(bundle.bundlePrice);

  const totalSelected = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities]
  );

  const selectedIds = useMemo(() => {
    const ids: string[] = [];
    Object.entries(quantities).forEach(([id, qty]) => {
      for (let i = 0; i < qty; i += 1) ids.push(id);
    });
    return ids;
  }, [quantities]);

  const selectedProducts = useMemo(() => {
    const items: BundleProduct[] = [];
    Object.entries(quantities).forEach(([id, qty]) => {
      const product = bundleProducts.find((entry) => entry.id === id);
      if (!product) return;
      for (let i = 0; i < qty; i += 1) items.push(product);
    });
    return items;
  }, [quantities, bundleProducts]);

  const originalTotal = useMemo(
    () =>
      Object.entries(quantities).reduce((sum, [id, qty]) => {
        const product = bundleProducts.find((entry) => entry.id === id);
        return sum + (product ? Number(product.price) * qty : 0);
      }, 0),
    [quantities, bundleProducts]
  );

  const compareAtTotal = useMemo(
    () =>
      Object.entries(quantities).reduce((sum, [id, qty]) => {
        const product = bundleProducts.find((entry) => entry.id === id);
        if (!product) return sum;
        const unit =
          product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price)
            ? Number(product.compareAtPrice)
            : Number(product.price);
        return sum + unit * qty;
      }, 0),
    [quantities, bundleProducts]
  );

  const isComplete = totalSelected === requiredQuantity;
  const bundleSavings = isComplete ? Math.max(0, originalTotal - bundlePrice) : 0;
  const compareSavings = Math.max(0, compareAtTotal - originalTotal);
  const displaySavings = isComplete ? bundleSavings : compareSavings;
  const displayPrice = isComplete ? bundlePrice : originalTotal;
  const strikePrice = isComplete
    ? originalTotal > bundlePrice
      ? originalTotal
      : 0
    : compareAtTotal > originalTotal
      ? compareAtTotal
      : 0;
  const payable = isComplete ? bundlePrice : 0;
  const remaining = Math.max(0, requiredQuantity - totalSelected);
  const isBundleFull = totalSelected >= requiredQuantity;

  const getQuantity = useCallback(
    (productId: string) => quantities[productId] || 0,
    [quantities]
  );

  const addToBox = useCallback(
    (productId: string) => {
      if (isBundleFull) return;
      setError(null);
      setQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));
    },
    [isBundleFull]
  );

  const increment = useCallback(
    (productId: string) => {
      if (isBundleFull) return;
      setError(null);
      setQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));
    },
    [isBundleFull]
  );

  const decrement = useCallback((productId: string) => {
    setError(null);
    setQuantities((prev) => {
      const next = { ...prev };
      const current = next[productId] || 0;
      if (current <= 1) delete next[productId];
      else next[productId] = current - 1;
      return next;
    });
  }, []);

  const addToCart = useCallback(async () => {
    setError(null);

    if (!isComplete) {
      setError(`Add ${remaining} more item${remaining === 1 ? "" : "s"} to checkout.`);
      return;
    }

    try {
      setAdding(true);
      const result = await addBundleToCart(bundle.id, selectedIds, quantities);
      if (!result.success) {
        throw new Error(result.message || "Could not add bundle to cart");
      }

      const existing =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("orbit_cart") || "[]")
          : [];
      const nextCart = Array.isArray(existing) ? [...existing, result.cartItem] : [result.cartItem];
      localStorage.setItem("orbit_cart", JSON.stringify(nextCart));
      window.dispatchEvent(new CustomEvent("orbit:cart-updated"));

      setQuantities({});
      window.location.href = "/checkout";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add bundle to cart");
    } finally {
      setAdding(false);
    }
  }, [bundle.id, isComplete, remaining, selectedIds, quantities]);

  return {
    bundleProducts,
    quantities,
    selectedIds,
    selectedProducts,
    requiredQuantity,
    bundlePrice,
    originalTotal,
    compareAtTotal,
    displayPrice,
    strikePrice,
    displaySavings,
    payable,
    savings: bundleSavings,
    totalSelected,
    remaining,
    isComplete,
    isBundleFull,
    getQuantity,
    addToBox,
    increment,
    decrement,
    addToCart,
    adding,
    error,
  };
}
