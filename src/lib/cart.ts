import { getProducts } from "./api";
import type { Product } from "@/types/product";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartDetailItem = {
  product: Product;
  quantity: number;
  subtotal: number;
};

export type CartDetails = {
  items: CartDetailItem[];
  count: number;
  subtotal: number;
};

const COOKIE_NAME = "zen_nova_cart";

/**
 * Get raw cart items from cookies
 */
export function getCart(cookieStore: any): CartItem[] {
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie || !cookie.value) {
    return [];
  }

  try {
    const decoded = decodeURIComponent(cookie.value);
    const parsed = JSON.parse(decoded);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item: any) =>
          item &&
          typeof item.productId === "string" &&
          typeof item.quantity === "number" &&
          !isNaN(item.quantity)
      );
    }
  } catch (e) {
    console.error("Failed to parse cart cookie:", e);
  }
  return [];
}

/**
 * Get complete validated cart details with product data, subtotals, and counts from a local cart array
 */
export function getCartDetailsFromCart(cart: CartItem[], products: Product[]): CartDetails {
  const items: CartDetailItem[] = [];
  let count = 0;
  let subtotal = 0;

  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);
    if (!product || !product.isActive) {
      continue;
    }

    if (item.quantity <= 0) {
      continue;
    }

    let qty = item.quantity;
    if (qty > product.stock) {
      qty = product.stock;
    }

    if (qty > 0) {
      const priceVal = parseFloat(product.price) || 0;
      const itemSubtotal = priceVal * qty;
      
      items.push({
        product,
        quantity: qty,
        subtotal: itemSubtotal,
      });

      count += qty;
      subtotal += itemSubtotal;
    }
  }

  return { items, count, subtotal };
}

/**
 * Get complete validated cart details with product data, subtotals, and counts
 */
export async function getCartDetails(cookieStore: any): Promise<CartDetails> {
  const cart = getCart(cookieStore);
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to load products for cart verification:", e);
    return { items: [], count: 0, subtotal: 0 };
  }

  return getCartDetailsFromCart(cart, products);
}

/**
 * Pure local helper to add a product to a cart array
 */
export function addToCartLocal(
  cart: CartItem[],
  productId: string,
  quantity: number,
  products: Product[]
): { success: boolean; message: string; updatedCart: CartItem[] } {
  if (quantity <= 0 || isNaN(quantity)) {
    return { success: false, message: "Quantity must be a positive number.", updatedCart: cart };
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found.", updatedCart: cart };
  }

  if (!product.isActive) {
    return { success: false, message: "Product is currently unavailable.", updatedCart: cart };
  }

  const existingItemIndex = cart.findIndex((item) => item.productId === productId);

  let newQuantity = quantity;
  if (existingItemIndex > -1) {
    newQuantity += cart[existingItemIndex].quantity;
  }

  if (newQuantity > product.stock) {
    return {
      success: false,
      message: `Cannot add more items. Only ${product.stock} items are available in stock.`,
      updatedCart: cart,
    };
  }

  const updatedCart = [...cart];
  if (existingItemIndex > -1) {
    updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity: newQuantity };
  } else {
    updatedCart.push({ productId, quantity: newQuantity });
  }

  return { success: true, message: `Successfully added "${product.name}" to cart.`, updatedCart };
}

/**
 * Pure local helper to update product quantity in a cart array
 */
export function updateCartQuantityLocal(
  cart: CartItem[],
  productId: string,
  quantity: number,
  products: Product[]
): { success: boolean; message: string; updatedCart: CartItem[] } {
  if (quantity <= 0 || isNaN(quantity)) {
    // Automatically remove if quantity <= 0
    const updatedCart = cart.filter((item) => item.productId !== productId);
    return { success: true, message: "Item removed from cart.", updatedCart };
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found.", updatedCart: cart };
  }

  if (quantity > product.stock) {
    return {
      success: false,
      message: `Only ${product.stock} items are available in stock.`,
      updatedCart: cart,
    };
  }

  const existingItemIndex = cart.findIndex((item) => item.productId === productId);
  const updatedCart = [...cart];

  if (existingItemIndex > -1) {
    updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity };
  } else {
    updatedCart.push({ productId, quantity });
  }

  return { success: true, message: "Cart updated successfully.", updatedCart };
}
