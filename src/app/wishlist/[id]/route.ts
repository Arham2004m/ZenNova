import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts } from "@/lib/api";
import {
  getWishlist,
  toggleWishlistLocal,
  removeFromWishlistLocal,
} from "@/lib/wishlist";

const COOKIE_NAME = "zen_nova_wishlist";

async function handleWishlistAction(productId: string, isDeleteAction: boolean) {
  const cookieStore = await cookies();
  const wishlist = getWishlist(cookieStore);

  let products = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to load products for wishlist route handler:", e);
  }

  let result;
  if (isDeleteAction) {
    result = removeFromWishlistLocal(wishlist, productId);
  } else {
    result = toggleWishlistLocal(wishlist, productId, products);
  }

  if (!result.success) {
    return NextResponse.json({
      error: true,
      message: result.message,
      data: {},
    });
  }

  const updatedWishlist = result.updatedWishlist;
  const count = updatedWishlist.length;

  const response = NextResponse.json({
    error: false,
    message: result.message,
    data: {
      count,
      added: result.added,
    },
  });

  // Set the updated wishlist cookie in browser
  response.cookies.set(COOKIE_NAME, JSON.stringify(updatedWishlist), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    sameSite: "lax",
  });
  
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  return response;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  let isDeleteAction = false;
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      if (formData.get("_method") === "DELETE") {
        isDeleteAction = true;
      }
    } else {
      // Try parsing JSON if content-type is json
      if (contentType.includes("application/json")) {
        const json = await request.clone().json();
        if (json._method === "DELETE") {
          isDeleteAction = true;
        }
      }
    }
  } catch (e) {
    // Ignore parse errors, default to false
  }

  return handleWishlistAction(productId, isDeleteAction);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  return handleWishlistAction(productId, true);
}
