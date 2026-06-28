import { NextResponse } from "next/server";
import { getProducts, getProduct } from "@/lib/api";

function escapeHtml(value: string) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPrice(value: number) {
  return `&#8377;${value.toLocaleString("en-IN")}`;
}

function renderQuickView(product: any) {
  const priceVal = parseFloat(product.price) || 0;
  const oldPriceVal = parseFloat(product.compareAtPrice) || 0;

  const pct = oldPriceVal > priceVal
    ? Math.round(((oldPriceVal - priceVal) / oldPriceVal) * 100)
    : 0;

  const badge = pct > 0
    ? `<span class="zn-quick-preview__badge">-${pct}%</span>`
    : "";

  const oldPriceHtml = oldPriceVal > priceVal
    ? `<span class="zn-quick-preview__old-price"><del>${formatPrice(oldPriceVal)}</del></span>`
    : "";

  const isAvailable = product.isActive && product.stock > 0;
  const stockText = isAvailable ? "Available" : "Out of Stock";
  const stockStyle = isAvailable ? "color: #20b86f;" : "color: #ff3333;";

  const imgUrl = product.images?.[0] || "/storage/logot.webp";

  return `
    <div class="zn-quick-preview">
      <button type="button" class="zn-quick-preview__close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
      <div class="zn-quick-preview__media">
        <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(product.name)}" loading="lazy" />
        ${badge}
      </div>
      <div class="zn-quick-preview__body">
        <p class="zn-quick-preview__category">${escapeHtml(product.category || "Supplements")}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="zn-quick-preview__price">
          <span>${formatPrice(priceVal)}</span>
          ${oldPriceHtml}
        </div>
        <p class="zn-quick-preview__description">${escapeHtml(product.description || "")}</p>
        <div class="zn-quick-preview__stock" style="${stockStyle}">${stockText}</div>
        
        <form action="/ajax/cart-content" method="POST" data-bb-toggle="product-form">
          <input type="hidden" name="id" value="${product.id}" />
          <input type="hidden" name="cart_action" value="add" />
          
          <div class="zn-quick-preview__quantity-label">Quantity</div>
          <div class="zn-quick-preview__actions">
            <div class="zn-quick-preview__quantity" style="border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: space-between; background: #1a1a1c; height: 48px; width: 130px; padding: 0 10px;">
              <button type="button" aria-label="Decrease quantity" onclick="var input=this.nextElementSibling; input.value=Math.max(1, (parseInt(input.value, 10) || 1) - 1);" style="background: transparent; border: none; color: rgba(255, 255, 255, 0.6); font-size: 20px; font-weight: bold; width: 30px; cursor: pointer;">-</button>
              <input type="text" name="qty" value="1" min="1" max="${product.stock}" aria-label="Quantity" style="text-align: center; border: none; background: transparent; width: 40px; color: white; font-weight: 600; font-size: 16px;" readonly />
              <button type="button" aria-label="Increase quantity" onclick="var input=this.previousElementSibling; input.value=Math.min(${product.stock}, (parseInt(input.value, 10) || 1) + 1);" style="background: transparent; border: none; color: rgba(255, 255, 255, 0.6); font-size: 20px; font-weight: bold; width: 30px; cursor: pointer;">+</button>
            </div>
            
            ${isAvailable ? `
              <button
                type="submit"
                class="zn-quick-preview__cart"
                style="background-color: #f37324; color: #fff; border: none; font-weight: bold; font-size: 15px; border-radius: 4px; height: 48px; cursor: pointer; transition: background-color 0.2s ease;"
              >
                Add To Cart
              </button>
            ` : `
              <button
                type="button"
                class="zn-quick-preview__cart disabled"
                disabled
                style="background-color: #333; color: #888; border: none; font-weight: bold; font-size: 15px; border-radius: 4px; height: 48px; cursor: not-allowed;"
              >
                Out of Stock
              </button>
            `}
          </div>
        </form>
        
        <a class="zn-quick-preview__details" href="/products/${escapeHtml(product.slug)}">
          <span>View full details</span>
          <svg class="zn-quick-preview__arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  `;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  const requested = resolvedParams.slug?.[0] || "";

  let products = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to load products for quick view:", e);
  }

  // Match by id (UUID) or slug
  let found = products.find((item: any) => item.id === requested || item.slug === requested);
  
  if (!found && products.length > 0) {
    found = products[0];
  }

  let detailedProduct = found;
  if (found && found.slug) {
    try {
      detailedProduct = await getProduct(found.slug) || found;
    } catch (e) {
      console.error("Failed to load detailed product for quick view:", e);
    }
  }

  if (!detailedProduct) {
    return NextResponse.json({
      error: true,
      data: `<div class="p-5 text-center">Product not found</div>`,
      message: "Product not found"
    });
  }

  return NextResponse.json({
    error: false,
    data: renderQuickView(detailedProduct),
    message: null
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return GET(request, { params });
}
