import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, orderTotal, cartItems = [] } = body as { code: string; orderTotal: number; cartItems?: any[] };

    if (!code) {
      return NextResponse.json({ success: false, message: "Coupon code is required" }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.evoclabs.com/api";
    const apiBase = base.replace(/\/storefront\/public\/?.*$/, '').replace(/\/+$/, '');
    const backendUrl = `${apiBase}/storefront/public/zenova/coupons/validate`;

    console.log('[ZenNova validate] Requesting backend:', backendUrl, { code, orderTotal });

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        orderTotal,
        cartItems
      }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || !json.valid) {
      return NextResponse.json({ 
        success: false, 
        message: json.message || "Invalid coupon code" 
      }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      code: json.code,
      type: json.type,
      value: json.value,
    });
  } catch (error: any) {
    console.error('[ZenNova validate] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
