const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// .env.local: NEXT_PUBLIC_API_BASE_URL=https://api.evoclabs.com/api/storefront/public/zennova

// ── FRONTEND (hero, brand colors, store info, nav, announcements) ──
export async function getFrontend() {
  const res = await fetch(`${BASE_URL}/frontend`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch frontend");
  return res.json();
  // returns: { store, customization, settings, announcements, products, categories, legalPages }
}

// ── PRODUCTS (from /frontend top-level products array) ──
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/frontend`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.products ?? []; // ← top-level, NOT json.data.products
}

// ── SINGLE PRODUCT by slug ──
export async function getProduct(slug: string) {
  const res = await fetch(`${BASE_URL}/products/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null; // ← { success, data: { ...product } }
}

// ── ALL PAGES (about, privacy, refund, shipping, terms) ──
export async function getPages() {
  const res = await fetch(`${BASE_URL}/frontend/pages`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  return json.pages ?? []; // ← { success, pages: [...] }
}

// ── SINGLE PAGE by slug ──
export async function getPage(slug: string) {
  const res = await fetch(`${BASE_URL}/frontend/pages/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.page ?? null; // ← { success, page: { title, content, slug } }
}

// ── COUPONS ──
export async function getCoupons() {
  const res = await fetch(`https://app.evoclabs.com/storefront/coupons`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}