import { NextResponse } from "next/server";

type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  category: string;
  badge?: string;
  sku: string;
  description: string;
};

const PRODUCTS: Product[] = [
  {
    id: 159,
    slug: "zennova-shilajit-pure-himalayan-power-advanced-gold-grade-formula",
    name: "Zennova Shilajit - Pure Himalayan Power (Advanced Gold Grade Formula)",
    image: "/storage/zennova-fat-burner.png",
    price: 1299,
    oldPrice: 1560,
    category: "Body",
    badge: "Hot",
    sku: "SF-2443-JLD5",
    description: "Premium gold-grade Himalayan Shilajit with fulvic acid and trace minerals for energy, vitality, stamina, and immune support."
  },
  {
    id: 150,
    slug: "zennova-lungs-detox",
    name: "Zennova Lungs Detox",
    image: "/storage/zennova-lungs-detox.png",
    price: 1130,
    oldPrice: 1420,
    category: "Body",
    badge: "-20%",
    sku: "SF-2443-BWKP",
    description: "Advanced respiratory support designed to cleanse, detoxify, and support lung health from smoke, pollution, and seasonal allergens."
  },
  {
    id: 148,
    slug: "zennova-fat-burne",
    name: "Zennova Fat Burne - Thermogenic formula",
    image: "/storage/zennova-fat-burner.png",
    price: 1120,
    oldPrice: 1360,
    category: "Body",
    badge: "-17%",
    sku: "SF-2443-HDD9",
    description: "A thermogenic capsule formula made to support metabolism, fat loss, energy levels, training focus, and craving control."
  },
  {
    id: 144,
    slug: "zennova-ashwagandha-premium-stress-immune-support",
    name: "Zennova Ashwagandha - Premium Stress & Immune Support",
    image: "/storage/zennova-ashwagandha.png",
    price: 600,
    oldPrice: 800,
    category: "Body",
    badge: "-25%",
    sku: "SF-2443-RZBB",
    description: "High-potency Ashwagandha capsules to help manage daily stress, promote calmness, improve sleep, and support immunity."
  },
  {
    id: 166,
    slug: "zen-nova-green-fuel-capsule-daily-nutrition-natural-energy-25-servings-250g",
    name: "Zen Nova Green Fuel Capsule - Daily Nutrition & Natural Energy",
    image: "/storage/whatsapp-image-2026-05-31-at-31628-am-150x150.jpeg",
    price: 150,
    oldPrice: 450,
    category: "Body",
    sku: "SF-2443-GFC1",
    description: "Daily nutrition support crafted for clean natural energy and active wellness."
  },
  {
    id: 164,
    slug: "zennova-apple-cider-vinegar-advanced-weight-management-500-ml",
    name: "Zennova Apple Cider Vinegar - Advanced Weight Management",
    image: "/storage/whatsapp-image-2026-05-31-at-30722-am-150x150.jpeg",
    price: 150,
    oldPrice: 450,
    category: "Weight Management",
    sku: "SF-2443-ACV1",
    description: "Apple cider vinegar support for digestion, daily wellness, and weight-management routines."
  },
  {
    id: 162,
    slug: "zennova-uplift-x-power-booster-60-veg-tablets",
    name: "Zennova UPLIFT X - Power Booster (60 Veg Tablets)",
    image: "/storage/whatsapp-image-2026-05-31-at-31116-am-600x600.jpeg",
    price: 1360,
    oldPrice: 1750,
    category: "Fitness",
    sku: "SF-2443-UPX1",
    description: "A power-booster supplement built for energy, stamina, libido, and workout performance."
  },
  {
    id: 161,
    slug: "zennova-sleepglow-natural-sleep-aid-60-veg-tablets",
    name: "Zennova SLEEPGlow - Natural Sleep Aid (60 Veg Tablets)",
    image: "/storage/whatsapp-image-2026-05-31-at-31628-am-150x150.jpeg",
    price: 0,
    oldPrice: 0,
    category: "Body",
    sku: "SF-2443-SLG1",
    description: "A calming sleep-support supplement for refreshed mornings and relaxed nighttime recovery."
  }
];

function escapeHtml(value: string) {
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

function renderQuickView(product: Product) {
  const badge = product.badge
    ? `<span class="zn-quick-preview__badge">${escapeHtml(product.badge)}</span>`
    : "";

  const oldPrice = product.oldPrice > product.price
    ? `<span class="zn-quick-preview__old-price"><del>${formatPrice(product.oldPrice)}</del></span>`
    : "";

  return `
    <div class="zn-quick-preview">
      <button type="button" class="zn-quick-preview__close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
      <div class="zn-quick-preview__media">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
        ${badge}
      </div>
      <div class="zn-quick-preview__body">
        <p class="zn-quick-preview__category">${escapeHtml(product.category)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="zn-quick-preview__price">
          <span>${formatPrice(product.price)}</span>
          ${oldPrice}
        </div>
        <p class="zn-quick-preview__description">${escapeHtml(product.description)}</p>
        <div class="zn-quick-preview__stock">Available</div>
        <div class="zn-quick-preview__quantity-label">Quantity</div>
        <div class="zn-quick-preview__actions">
          <div class="zn-quick-preview__quantity">
            <button type="button" aria-label="Decrease quantity" onclick="var input=this.nextElementSibling; input.value=Math.max(1, (parseInt(input.value, 10) || 1) - 1);">-</button>
            <input type="number" name="qty" value="1" min="1" aria-label="Quantity" />
            <button type="button" aria-label="Increase quantity" onclick="var input=this.previousElementSibling; input.value=(parseInt(input.value, 10) || 1) + 1;">+</button>
          </div>
          <button
            type="button"
            class="zn-quick-preview__cart"
            data-bb-toggle="quick-shop"
            data-url="/ajax/quick-shop/${escapeHtml(product.slug)}"
            data-product-id="${product.id}"
            data-product-name="${escapeHtml(product.name)}"
            data-product-price="${product.price}"
            data-product-sku="${escapeHtml(product.sku)}"
            data-product-category="${escapeHtml(product.category)}"
            data-product-categories="${escapeHtml(product.category)}"
            title="Quick Shop"
          >
            Add To Cart
          </button>
        </div>
        <a class="zn-quick-preview__details" href="/products/${escapeHtml(product.slug)}">View full details <span aria-hidden="true">-&gt;</span></a>
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
  const product = PRODUCTS.find((item) => item.id.toString() === requested || item.slug === requested) || PRODUCTS[0];

  return NextResponse.json({
    error: false,
    data: renderQuickView(product),
    message: null
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return GET(request, { params });
}
