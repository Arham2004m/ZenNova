import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api";

const LOCATIONS = [
  "Kumar (Jaipur)",
  "Sumit (Pune)",
  "Priya (Bangalore)",
  "Khan (Mumbai)",
  "Santanu (Trichy)",
  "Hau (California)",
  "Van (Ohio)",
  "Sara (Montana)",
  "Kate (Georgia)",
];

const TIMES = [
  "4 hours ago",
  "2 hours ago",
  "45 minutes ago",
  "1 day ago",
  "8 hours ago",
  "10 hours ago",
  "25 minutes ago",
  "2 day ago",
  "5 hours ago",
  "40 minutes ago",
];

export async function GET() {
  try {
    const products = await getProducts();
    const popupProducts = products.slice(0, 6);

    if (!popupProducts.length) {
      return NextResponse.json({ error: false, data: "", message: null });
    }

    const stt = {
      classDown: { slideInUp: "slideOutDown" },
      limit: 20,
      pp_type: "2",
      url: popupProducts.map((p: { slug: string }) => `/products/${p.slug}`),
      id: popupProducts.map((p: { id: string }) => p.id),
      image: popupProducts.map(
        (p: { images?: string[] }) => p.images?.[0] || "/storage/loader.png"
      ),
      starTime: 5,
      starTime_unit: 1000,
      stayTime: 10,
      stayTimeUnit: 1000,
      classUp: "slideInUp",
    };

    const titles = popupProducts.map((p: { name: string }) => p.name);
    const sttAttr = JSON.stringify(stt).replace(/'/g, "&#39;");

    const data = `
<link rel="stylesheet" href="/vendor/core/plugins/sale-popup/css/sale-popup.css?v=1.2.1">
<div class="sale-popup-section">
  <div class="sale-popup-container-wrap sales_animated hidden oh des_1 slpr_mb_ slpr_has_btns" data-stt='${sttAttr}'>
    <div class="sale-popup-container">
      <div class="sale-popup-thumb">
        <a class="js-sale-popup-a" href="/">
          <img class="js-sale-popup-img" src="/" srcset="/" alt="sales popup" loading="lazy">
        </a>
      </div>
      <div class="sale-popup-info">
        <span class="sale-popup-location">
          <span class="js-sale-popup-location"></span>
          purchased
        </span>
        <a class="js-sale-popup-a sale-popup-title js-sale-popup-tt" href="/"></a>
        <div class="sale-popup-ago">
          <span class="sale-popup-time js-sale-popup-ago"></span>
          <span class="sale-popup-verify">Verified</span>
        </div>
      </div>
      <a class="sale-popup-close pa" href="#" rel="nofollow" title="close">×</a>
      <a
        class="js-sale-popup-a js-sale-popup-quick-view-button sale-popup-quick-view pa op__0"
        data-url=""
        data-base-url=""
        href="#"
        rel="nofollow"
        title="Quick view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </a>
    </div>
  </div>
  <script type="application/json" id="title-sale-popup">${JSON.stringify(titles)}</script>
  <script type="application/json" id="location-sale-popup">${JSON.stringify(LOCATIONS)}</script>
  <script type="application/json" id="time-sale-popup">${JSON.stringify(TIMES)}</script>
</div>`;

    return NextResponse.json({ error: false, data, message: null });
  } catch (error) {
    return NextResponse.json({
      error: true,
      data: null,
      message: (error as Error).message,
    });
  }
}

export async function POST() {
  return GET();
}
