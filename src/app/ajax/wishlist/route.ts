import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistDetails, getWishlist } from "@/lib/wishlist";

const COOKIE_NAME = "zen_nova_wishlist";

export async function GET() {
  const cookieStore = await cookies();
  const products = await getWishlistDetails(cookieStore);
  
  const response = NextResponse.json({
    error: false,
    message: "Wishlist retrieved successfully",
    data: {
      count: products.length,
      items: products,
    },
  });

  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  return response;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  if (action === "clear") {
    const response = NextResponse.json({
      error: false,
      message: "Wishlist cleared successfully",
      data: {
        count: 0,
        items: [],
      },
    });

    response.cookies.set(COOKIE_NAME, JSON.stringify([]), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
    });

    response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response;
  }

  return NextResponse.json({
    error: true,
    message: "Invalid action",
    data: {},
  });
}
