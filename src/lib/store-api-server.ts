const STORE_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

function requireStoreApiBase() {
  if (!STORE_API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }
  return STORE_API_BASE.replace(/\/$/, "");
}

export async function fetchStoreFrontend() {
  const base = requireStoreApiBase();
  const res = await fetch(`${base}/frontend`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch store frontend (${res.status})`);
  }

  return res.json();
}

export async function fetchStoreProducts() {
  const base = requireStoreApiBase();

  const productsRes = await fetch(`${base}/frontend/products`, {
    next: { revalidate: 60 },
  });

  if (productsRes.ok) {
    const json = await productsRes.json();
    if (Array.isArray(json.products)) return json.products;
    if (Array.isArray(json.data)) return json.data;
  }

  const frontend = await fetchStoreFrontend();
  return frontend.products ?? [];
}
