import fs from "fs";
import path from "path";
import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CacheData {
  frontend?: unknown;
  products?: unknown;
}

function getFallbackData(): CacheData | null {
  try {
    const cachePath = path.join(process.cwd(), "src/lib/api-cache.json");
    if (fs.existsSync(cachePath)) {
      try {
        return JSON.parse(fs.readFileSync(cachePath, "utf-8")) as CacheData;
      } catch {
        // Return null if file is temporarily empty/being written to
        return null;
      }
    }
  } catch {
    // Suppress console error logs for concurrent worker reads
  }
  return null;
}

function saveToCache(key: "frontend" | "products", data: unknown) {
  try {
    const cachePath = path.join(process.cwd(), "src/lib/api-cache.json");
    let currentCache: Record<string, unknown> = {};
    if (fs.existsSync(cachePath)) {
      try {
        currentCache = JSON.parse(fs.readFileSync(cachePath, "utf-8")) as Record<string, unknown>;
      } catch {
        // Fallback to empty cache on collision
      }
    }
    currentCache[key] = data;
    fs.writeFileSync(cachePath, JSON.stringify(currentCache, null, 2), "utf-8");
  } catch {
    // Suppress console error logs for concurrent worker writes
  }
}

/**
 * Fetch with retry helper
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      console.warn(`Fetch returned status ${res.status} for ${url}, retrying (${i + 1}/${retries})...`);
    } catch (e) {
      console.warn(`Fetch failed for ${url}: ${e}, retrying (${i + 1}/${retries})...`);
    }
    if (i < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  return fetch(url, options);
}

// ── FRONTEND (hero, brand colors, store info, nav, announcements) ──
export async function getFrontend() {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/frontend`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch frontend");
    const json = await res.json();
    saveToCache("frontend", json);
    return json;
  } catch (e) {
    console.error("getFrontend failed, returning cached fallback:", e);
    const fallback = getFallbackData();
    if (fallback && fallback.frontend) {
      return fallback.frontend;
    }
    throw e;
  }
}

// ── PRODUCTS (from /frontend top-level products array) ──
export async function getProducts() {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/frontend`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    const products = json.products ?? [];
    saveToCache("products", products);
    return products;
  } catch (e) {
    console.error("getProducts failed, returning cached fallback:", e);
    const fallback = getFallbackData();
    if (fallback && fallback.products) {
      return fallback.products;
    }
    return [];
  }
}

// ── SINGLE PRODUCT by slug ──
export async function getProduct(slug: string) {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch (e) {
    console.error(`getProduct for slug ${slug} failed, checking cache:`, e);
    const fallback = getFallbackData();
    if (fallback && Array.isArray(fallback.products)) {
      const found = fallback.products.find((p: unknown) => {
        return typeof p === "object" && p !== null && "slug" in p && (p as { slug: unknown }).slug === slug;
      });
      if (found) return found;
    }
    return null;
  }
}

// ── ALL PAGES (about, privacy, refund, shipping, terms) ──
export async function getPages() {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/frontend/pages`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.pages ?? [];
  } catch (e) {
    console.error("getPages failed:", e);
    return [];
  }
}

// ── BUNDLE OFFERS (from /frontend bundles array or dedicated endpoint) ──
export async function getBundles() {
  try {
    const json = await getFrontend();
    if (json && typeof json === "object" && "bundles" in json && Array.isArray(json.bundles)) {
      return json.bundles;
    }
    return [];
  } catch {
    return [];
  }
}

export async function validateBundle(bundleId: string, productIds: string[]) {
  const res = await fetch(`${BASE_URL}/bundles/${bundleId}/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Bundle validation failed");
  }
  return json;
}

export async function addBundleToCart(
  bundleId: string,
  productIds: string[],
  quantities?: Record<string, number>
) {
  const res = await fetch(`${BASE_URL}/bundles/${bundleId}/add-to-cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds, quantities }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Failed to add bundle to cart");
  }
  return json;
}

// ── SINGLE PAGE by slug ──
export async function getPage(slug: string) {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/frontend/pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.page ?? null;
  } catch (e) {
    console.error(`getPage for slug ${slug} failed:`, e);
    return null;
  }
}
