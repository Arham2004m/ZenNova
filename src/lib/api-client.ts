const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createStoreOrder(payload: {
  items: Array<
    | { type: "BUNDLE"; bundleId: string; productIds: string[] }
    | { type: "PRODUCT"; id: string; quantity: number }
  >;
  customer: Record<string, string>;
  paymentMethod?: string;
  couponCode?: string;
}) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Failed to create order");
  }
  return json;
}
