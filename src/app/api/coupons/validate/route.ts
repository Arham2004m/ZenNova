import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, orderTotal } = body;

    if (!code) {
      return NextResponse.json({ success: false, message: "Coupon code is required" }, { status: 400 });
    }

    // Proxy to the backend coupon validation endpoint
    const res = await fetch(`${BASE_URL}/coupons/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, orderTotal }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: json.message || "Invalid coupon code" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, ...json });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
