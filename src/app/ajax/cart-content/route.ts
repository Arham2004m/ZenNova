/* eslint-disable */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts } from "@/lib/api";
import {
  getCart,
  getCartDetailsFromCart,
  addToCartLocal,
  updateCartQuantityLocal,
} from "@/lib/cart";

const COOKIE_NAME = "zen_nova_cart";

function renderCartContentHtml(cartDetails: any) {
  if (cartDetails.items.length === 0) {
    return `<div class="cartmini__empty text-center"><p>Your cart is empty.</p><a href="/products" class="tp-btn">Go to Shop</a></div>`;
  }

  const itemsHtml = cartDetails.items
    .map((item: any) => {
      const imgUrl = item.product.images?.[0] || "/storage/logot.webp";
      return `
      <div class="cartmini__widget-item">
        <div class="cartmini__thumb">
          <a href="/products/${item.product.slug}">
            <img src="${imgUrl}" alt="${item.product.name}" />
          </a>
        </div>
        <div class="cartmini__content">
          <h5 class="cartmini__title">
            <a href="/products/${item.product.slug}">${item.product.name}</a>
          </h5>
          <div class="cartmini__price-wrapper">
            <span class="cartmini__price">₹${parseFloat(item.product.price).toLocaleString("en-IN")}</span>
          </div>
          <div class="cartmini__quantity mt-10 mb-10">
            <form action="/ajax/cart-content" method="POST">
              <input type="hidden" name="id" value="${item.product.id}" />
              <input type="hidden" name="cart_action" value="update" />
              <div class="tp-product-quantity">
                <span class="tp-cart-minus" data-bb-toggle="decrease-qty">-</span>
                <input class="tp-cart-input" type="text" value="${item.quantity}" data-bb-toggle="update-cart" name="qty" readonly />
                <span class="tp-cart-plus" data-bb-toggle="increase-qty">+</span>
              </div>
            </form>
          </div>
        </div>
        <a href="/ajax/cart-content?remove=${item.product.id}" class="cartmini__del" data-bb-toggle="remove-from-cart">
          <svg class="icon svg-icon-ti-ti-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </a>
      </div>
    `;
    })
    .join("");

  return `<div class="cartmini__widget">${itemsHtml}</div>`;
}

function renderCartFooterHtml(cartDetails: any) {
  if (cartDetails.items.length === 0) {
    return "";
  }

  return `
    <div class="cartmini__checkout">
      <div class="cartmini__checkout-title">
        <h4>Subtotal:</h4>
        <span>₹${cartDetails.subtotal.toLocaleString("en-IN")}</span>
      </div>
      <div class="cartmini__checkout-btn mt-20 d-flex justify-content-between gap-2">
        <a href="/ajax/cart-content?clear=true" class="tp-btn w-100" data-bb-toggle="remove-from-cart" style="text-align: center; background-color: #f37324; color: #fff; border: none;">Clear Cart</a>
        <a href="/checkout" class="tp-btn w-100" style="text-align: center; background-color: #f37324; color: #fff; border: none;">Checkout</a>
      </div>
    </div>
  `;
}

function renderCartMiniHtml(cartDetails: any) {
  const content = renderCartContentHtml(cartDetails);
  const footer = renderCartFooterHtml(cartDetails);

  return `
    <div class="cartmini__wrapper d-flex justify-content-between flex-column">
        <div class="cartmini__top-wrapper">
            <div class="cartmini__top p-relative">
                <div class="cartmini__top-title">
                    <h4>Shopping cart</h4>
                </div>
                <div class="cartmini__close" title="Close">
                    <button type="button" class="cartmini__close-btn cartmini-close-btn" title="Close">
                        <svg class="icon svg-icon-ti-ti-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M18 6l-12 12" />
                          <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div data-bb-toggle="mini-cart-content-slot">
                ${content}
            </div>
        </div>

        <div data-bb-toggle="mini-cart-footer-slot">
            ${footer}
        </div>
    </div>
  `;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const removeId = url.searchParams.get("remove");
  const clear = url.searchParams.get("clear");

  const cart = getCart(cookieStore);
  let products = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to load products in GET route handler:", e);
  }

  let updatedCart = [...cart];
  let msg = "Cart loaded successfully";

  if (removeId) {
    updatedCart = cart.filter((item) => item.productId !== removeId);
    msg = "Item removed from cart.";
  } else if (clear === "true") {
    updatedCart = [];
    msg = "Cart cleared successfully.";
  }

  const details = getCartDetailsFromCart(updatedCart, products);

  if (url.searchParams.get("json") === "true") {
    const response = NextResponse.json({
      error: false,
      message: "Cart details loaded",
      details,
    });
    
    response.cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
    });
    // Prevent browser caching
    response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response;
  }

  const response = NextResponse.json({
    error: false,
    message: msg,
    data: {
      count: details.count,
      content: renderCartContentHtml(details),
      footer: renderCartFooterHtml(details),
      cart_mini: renderCartMiniHtml(details),
    },
  });

  response.cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
  });
  // Prevent browser caching
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  return response;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const cart = getCart(cookieStore);
  let products = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to load products in POST route handler:", e);
  }

  let productId = "";
  let qty = 1;
  let action = "add";
  let isCheckout = false;

  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      productId = (formData.get("id") as string) || "";
      const qtyStr = formData.get("qty") as string;
      qty = qtyStr ? parseInt(qtyStr, 10) : 1;
      action = (formData.get("cart_action") as string) || (formData.get("action") as string) || "add";
      isCheckout = formData.get("checkout") === "1";
    } else {
      const json = await request.json();
      productId = json.id || "";
      qty = typeof json.qty !== "undefined" ? parseInt(json.qty, 10) : 1;
      action = json.cart_action || json.action || "add";
      isCheckout = json.checkout === true || json.checkout === "1";
    }
  } catch (e) {
    console.error("Failed to parse POST body in cart route:", e);
  }

  if (!productId) {
    return NextResponse.json({
      error: true,
      message: "Product ID is required.",
      data: {},
    });
  }

  let result;
  if (action === "update") {
    result = updateCartQuantityLocal(cart, productId, qty, products);
  } else {
    result = addToCartLocal(cart, productId, qty, products);
  }

  if (!result.success) {
    return NextResponse.json({
      error: true,
      message: result.message,
      data: {},
    });
  }

  const updatedCart = result.updatedCart;
  const details = getCartDetailsFromCart(updatedCart, products);

  const responsePayload: any = {
    error: false,
    message: result.message,
    data: {
      count: details.count,
      content: renderCartContentHtml(details),
      footer: renderCartFooterHtml(details),
      cart_mini: renderCartMiniHtml(details),
    },
  };

  if (isCheckout) {
    responsePayload.data.next_url = "/checkout";
  }

  // Automatically remove item from wishlist if it is added to the cart
  const wishlistCookie = cookieStore.get("zen_nova_wishlist");
  let updatedWishlist: string[] = [];
  let shouldUpdateWishlist = false;
  if (wishlistCookie && wishlistCookie.value) {
    try {
      const decoded = decodeURIComponent(wishlistCookie.value);
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed) && parsed.includes(productId)) {
        updatedWishlist = parsed.filter((id: string) => id !== productId);
        shouldUpdateWishlist = true;
      }
    } catch (e) {
      console.error("Failed to parse wishlist cookie during cart add:", e);
    }
  }

  const response = NextResponse.json(responsePayload);

  if (shouldUpdateWishlist) {
    response.cookies.set("zen_nova_wishlist", JSON.stringify(updatedWishlist), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  response.cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
  });
  // Prevent browser caching
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  return response;
}
