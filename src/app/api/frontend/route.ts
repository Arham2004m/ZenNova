import { NextResponse } from "next/server";
import { fetchStoreFrontend } from "@/lib/store-api-server";

export const revalidate = 60;

export async function GET() {
  try {
    const data = await fetchStoreFrontend();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
