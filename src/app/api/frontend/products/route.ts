import { NextResponse } from "next/server";
import { fetchStoreProducts } from "@/lib/store-api-server";

export const revalidate = 60;

export async function GET() {
  try {
    const products = await fetchStoreProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
        products: [],
      },
      { status: 500 }
    );
  }
}
