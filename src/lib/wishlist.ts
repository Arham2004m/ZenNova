import type { Product } from "@/types/product";
import { getProducts } from "./api";

const COOKIE_NAME = "zen_nova_wishlist";

/**
 * Get wishlist item product IDs from cookies
 */
export function getWishlist(cookieStore: any): string[] {
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie || !cookie.value) {
    return [];
  }

  try {
    const decoded = decodeURIComponent(cookie.value);
    const parsed = JSON.parse(decoded);
    if (Array.isArray(parsed)) {
      // Return unique valid string IDs
      return Array.from(new Set(parsed.filter((id: any) => typeof id === "string" && id)));
    }
  } catch (e) {
    console.error("Failed to parse wishlist cookie:", e);
  }
  return [];
}

/**
 * Get complete validated product details for wishlist items
 */
export function getWishlistDetailsFromItems(wishlist: string[], products: Product[]): Product[] {
  const list: Product[] = [];
  for (const id of wishlist) {
    const product = products.find((p) => p.id === id);
    if (product) {
      list.push(product);
    }
  }
  return list;
}

/**
 * Get complete validated product details for wishlist items asynchronously
 */
export async function getWishlistDetails(cookieStore: any): Promise<Product[]> {
  const wishlist = getWishlist(cookieStore);
  if (wishlist.length === 0) return [];
  
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to load products for wishlist verification:", e);
    return [];
  }

  return getWishlistDetailsFromItems(wishlist, products);
}

/**
 * Add a product to the wishlist
 */
export function addToWishlistLocal(
  wishlist: string[],
  productId: string,
  products: Product[]
): { success: boolean; message: string; updatedWishlist: string[]; added: boolean } {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found.", updatedWishlist: wishlist, added: false };
  }

  if (!product.isActive) {
    return { success: false, message: "Only active products can be added to your wishlist.", updatedWishlist: wishlist, added: false };
  }

  if (wishlist.includes(productId)) {
    return { success: true, message: "Product already exists in wishlist.", updatedWishlist: wishlist, added: true };
  }

  const updatedWishlist = [...wishlist, productId];
  return { success: true, message: `Successfully saved "${product.name}" to wishlist.`, updatedWishlist, added: true };
}

/**
 * Remove a product from the wishlist
 */
export function removeFromWishlistLocal(
  wishlist: string[],
  productId: string
): { success: boolean; message: string; updatedWishlist: string[]; added: boolean } {
  const updatedWishlist = wishlist.filter((id) => id !== productId);
  const wasRemoved = updatedWishlist.length < wishlist.length;
  return {
    success: true,
    message: wasRemoved ? "Product removed from wishlist." : "Product not found in wishlist.",
    updatedWishlist,
    added: false,
  };
}

/**
 * Toggle a product presence in the wishlist
 */
export function toggleWishlistLocal(
  wishlist: string[],
  productId: string,
  products: Product[]
): { success: boolean; message: string; updatedWishlist: string[]; added: boolean } {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found.", updatedWishlist: wishlist, added: false };
  }

  if (wishlist.includes(productId)) {
    // Remove it
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    return {
      success: true,
      message: `Removed "${product.name}" from wishlist.`,
      updatedWishlist,
      added: false,
    };
  } else {
    // Add it
    if (!product.isActive) {
      return { success: false, message: "Only active products can be added to wishlist.", updatedWishlist: wishlist, added: false };
    }
    const updatedWishlist = [...wishlist, productId];
    return {
      success: true,
      message: `Added "${product.name}" to wishlist.`,
      updatedWishlist,
      added: true,
    };
  }
}
