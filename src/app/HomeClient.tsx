/* eslint-disable */
"use client";

import React from "react";

type Product = {
  id: string;
  slug: string;
  name: string;
  images: string[];
  price: string;
  compareAtPrice: string;
  category: string;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
};

type Props = {
  products: Product[];
  storeData: any;
};

export default function HomeClient({ products, storeData }: Props) {
  const [activeTab, setActiveTab] = React.useState("all");
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  React.useEffect(() => {
    const targetTime =
      new Date().getTime() +
      12 * 60 * 60 * 1000 +
      30 * 60 * 1000 +
      45 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBadge = (product: Product) => {
    if (product.isBestSeller) return "Hot";
    const discount = product.compareAtPrice
      ? Math.round(
          ((Number(product.compareAtPrice) - Number(product.price)) /
            Number(product.compareAtPrice)) *
            100
        )
      : 0;
    return discount > 0 ? `-${discount}%` : null;
  };

  return (
    <>
      <main>

        <style dangerouslySetInnerHTML={{ __html: `
            @font-face {
                font-family: 'Oregano';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/storage/fonts/eeb4986ca8/soreganov15if2ixtpxcis3h4s2oz7vphvnzylfqw.woff2) format('woff2');
                unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            @font-face {
                font-family: 'Oregano';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/storage/fonts/eeb4986ca8/soreganov15if2ixtpxcis3h4s2ozdvphvnzyi.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        ` }} />

        {/* HERO SLIDER */}
     <section className="tp-slider-area p-relative z-index-1">
  <div className="tp-slider-full-width tp-slider-active tp-slider-variation swiper-container" data-loop="1" data-autoplay="1" data-autoplay-speed="5000">
    <div className="swiper-wrapper">
      {(storeData?.customization?.heroSection?.slides ?? []).map((slide: any, i: number) => (
        <div className="tp-slider-item swiper-slide" key={i} style={{ backgroundColor: "transparent" } as React.CSSProperties}>
          <div className="tp-slider-thumb text-end">
            <img src={slide.backgroundImage} loading={i === 0 ? "eager" : "lazy"} alt={slide.title ?? ""} style={{ width: "100%" }} />
          </div>
        </div>
      ))}
    </div>
    <div className="tp-slider-arrow tp-swiper-arrow d-none d-lg-block">
      <button type="button" className="tp-slider-button-prev">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 13L1 7L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button type="button" className="tp-slider-button-next">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
    <div className="tp-slider-dot tp-swiper-dot"></div>
  </div>
</section>

        {/* TICKER */}
        <div className="ecommerce-ticker-wrap">
  <div className="ecommerce-ticker">
    {(storeData?.customization?.announcementBar?.announcements ?? []).map((a: any, i: number) => (
      <div className="ticker-item" key={i}><a href={a.link ?? "#"}>{a.text}</a></div>
    ))}
    {/* duplicate for infinite scroll */}
    {(storeData?.customization?.announcementBar?.announcements ?? []).map((a: any, i: number) => (
      <div className="ticker-item" key={`dup-${i}`} aria-hidden="true"><a href={a.link ?? "#"}>{a.text}</a></div>
    ))}
  </div>
</div>

        {/* CATEGORIES */}
{(storeData?.categories ?? []).map((cat: string) => {
  const count = products.filter(
    (p: any) => p.category === cat
  ).length;

  const image =
    cat === "BODY"
      ? storeData?.customization?.categoryImages?.body
      : "";

  return (
    <div className="swiper-slide" key={cat}>
      <div className="tp-product-category-item text-center mb-40">
        <div className="tp-product-category-thumb fix">
          <a
            href={`/product-categories/${cat
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            title={cat}
          >
            {image && (
              <img
                src={image}
                alt={cat}
              />
            )}
          </a>
        </div>

        <div className="tp-product-category-content">
          <h3 className="tp-product-category-title">
            <a
              href={`/product-categories/${cat
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {cat}
            </a>
          </h3>

          <p>
            {count} product{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
})}
   {/* ALL SUPPLEMENTS */}
        <section className="tp-product-area pb-50 pt-50 grey-bg-2">
          <div className="container">
            <div className="row align-items-end mb-40">
              <div className="col-xl-5 col-lg-6 col-md-5">
                <div className="tp-section-title-wrapper">
                  <h3 className="section-title tp-section-title">
                    <span>All</span> Supplements
                  </h3>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 col-md-7">
                <div className="tp-product-tab text-md-end">
                  <div className="tp-product-tab-inner">
                    <ul className="nav nav-tabs justify-content-md-end" style={{ border: "none" }}>
                      {[
                        { key: "all", label: "All Products" },
                        { key: "energy", label: "Energy & Vitality" },
                        { key: "wellness", label: "Health & Wellness" },
                      ].map((tab) => (
                        <li className="nav-item" key={tab.key} style={{ marginRight: "10px" }}>
                          <button
                            className={`tp-product-tab-btn ${activeTab === tab.key ? "active" : ""}`}
                            style={{
                              background: activeTab === tab.key ? "var(--primary-color)" : "#fff",
                              color: activeTab === tab.key ? "#fff" : "#000",
                              border: "1px solid #ddd",
                              padding: "8px 20px",
                              borderRadius: "4px",
                              fontWeight: 500,
                              transition: "all 0.3s",
                            }}
                            onClick={() => setActiveTab(tab.key)}
                          >
                            {tab.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {products
                .filter((p) => {
                  if (activeTab === "all") return true;
                  if (activeTab === "energy") return p.isBestSeller;
                  if (activeTab === "wellness") return p.isNewArrival;
                  return true;
                })
                .map((product) => (
                  <div className="col-xl-3 col-lg-4 col-sm-6 mb-30" key={product.id}>
                    <div className="tp-product-item transition-3 p-relative fix m-img bg-white rounded shadow-sm" style={{ border: "1px solid #eee", overflow: "hidden" }}>
                      <div className="tp-product-thumb p-relative fix">
                        <a href={`/products/${product.slug}`}>
                          <img src={product.images[0]} alt={product.name} className="w-100" style={{ transition: "transform 0.5s" }} />
                        </a>
                        {getBadge(product) && (
                          <div className="tp-product-badge">
                            <span style={{ backgroundColor: "#AC2200" }}>{getBadge(product)}</span>
                          </div>
                        )}
                        <div className="tp-product-add-cart-btn-large-wrapper">
                          <button type="button" className="tp-product-add-cart-btn-large" data-product-id={product.id} data-product-name={product.name} data-product-price={product.price}>
                            Select Options
                          </button>
                        </div>
                      </div>
                      <div className="tp-product-content p-3">
                        <h3 className="text-truncate tp-product-title mb-2">
                          <a href={`/products/${product.slug}`} title={product.name} style={{ color: "#000", fontWeight: 500 }}>
                            {product.name}
                          </a>
                        </h3>
                        <div className="tp-product-price-wrapper">
                          <span className="tp-product-price new-price" style={{ color: "var(--primary-color)", fontWeight: "bold" }}>₹{product.price}</span>
                          <span className="tp-product-price old-price" style={{ marginLeft: "10px", color: "#999" }}><del>₹{product.compareAtPrice}</del></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* TRENDING PRODUCTS */}
        <section className="tp-product-arrival-area pt-30 pb-30">
          <div className="container">
            <div className="row align-items-center mb-40">
              <div className="col-xl-5 col-sm-6">
                <div className="tp-section-title-wrapper">
                  <h3 className="section-title tp-section-title">
                    <span>Trending</span> Products
                  </h3>
                </div>
              </div>
              <div className="col-xl-7 col-sm-6">
                <div className="tp-product-arrival-more-wrapper d-flex justify-content-end">
                  <div className="tp-product-arrival-arrow tp-swiper-arrow text-end tp-product-arrival-border">
                    <button type="button" className="tp-arrival-slider-button-prev">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L1 7L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="tp-arrival-slider-button-next">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-product-arrival-slider fix">
                  <div className="tp-product-arrival-active swiper-container" data-items-per-view="4">
                    <div className="swiper-wrapper">
                      {products.map((product) => (
                        <div className="tp-product-item transition-3 mb-25 swiper-slide" key={product.id}>
                          <div className="tp-product-thumb p-relative fix m-img">
                            <a href={`/products/${product.slug}`}>
                              <img src={product.images[0]} alt={product.name} />
                            </a>
                            {getBadge(product) && (
                              <div className="tp-product-badge">
                                <span style={{ backgroundColor: "#AC2200" }}>{getBadge(product)}</span>
                              </div>
                            )}
                            <div className="tp-product-add-cart-btn-large-wrapper">
                              <button type="button" className="tp-product-add-cart-btn-large" data-product-id={product.id} data-product-name={product.name} data-product-price={product.price}>
                                Select Options
                              </button>
                            </div>
                          </div>
                          <div className="tp-product-content">
                            <h3 className="text-truncate tp-product-title">
                              <a href={`/products/${product.slug}`} title={product.name}>{product.name}</a>
                            </h3>
                            <div className="tp-product-price-wrapper">
                              <span className="tp-product-price new-price">₹{product.price}</span>
                              <small><del className="tp-product-price old-price">₹{product.compareAtPrice}</del></small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BANNERS */}
        <section className="tp-banner-area pt-30 pb-30">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix">
                  <div className="tp-banner-thumb include-bg transition-3">
                    <a href="/products/zennova-shilajit-pure-himalayan-power-advanced-gold-grade-formula">
                      <img src="/storage/untitled-design-3.webp" style={{ width: "100%" }} loading="lazy" alt="Ads 1" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix">
                  <div className="tp-banner-thumb include-bg transition-3">
                    <a href="/products/zennova-lungs-detox">
                      <img src="/storage/chatgpt-image-may-20-2026-12-37-31-am.webp" style={{ width: "100%" }} loading="lazy" alt="Ads 2" />
                    </a>
                  </div>
                  <div className="tp-banner-content">
                    <div className="tp-banner-btn">
                      <a href="/products/zennova-lungs-detox" className="tp-link-btn">
                        Shop Now
                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEAL OF THE DAY */}
        <section className="tp-deal-area pt-50 pb-50" style={{ backgroundColor: "#F3F3F3" }}>
          <div className="container">
            <div className="row align-items-center mb-40">
              <div className="col-xl-6 col-lg-5 col-md-6">
                <div className="tp-section-title-wrapper d-flex align-items-center">
                  <h3 className="section-title tp-section-title mb-0" style={{ marginRight: "30px" }}>
                    Deal of The Day
                  </h3>
                  <div className="tp-product-countdown-inner">
                    <ul className="d-flex align-items-center mb-0 pl-0" style={{ listStyle: "none" }}>
                      {[
                        { value: timeLeft.days, label: "Days" },
                        { value: timeLeft.hours, label: "Hrs" },
                        { value: timeLeft.minutes, label: "Mins" },
                        { value: timeLeft.seconds, label: "Secs" },
                      ].map((t) => (
                        <li key={t.label} style={{ marginRight: "5px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "5px", width: "50px", height: "50px", textAlign: "center", paddingTop: "8px" }}>
                          <span style={{ fontSize: "18px", fontWeight: "bold", display: "block", color: "#000", lineHeight: 1 }}>{t.value}</span>
                          <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#666" }}>{t.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 col-md-6 text-md-end mt-3 mt-md-0">
                <a href="/products" className="tp-btn text-white py-2 px-4 rounded d-inline-block" style={{ backgroundColor: "var(--primary-color)" }}>
                  View All Deals
                </a>
              </div>
            </div>

            <div className="row">
              {products.map((product) => (
                <div className="col-xl-3 col-lg-4 col-sm-6 mb-30" key={product.id}>
                  <div className="tp-product-item transition-3 p-relative fix m-img bg-white rounded shadow-sm" style={{ border: "1px solid #eee", overflow: "hidden" }}>
                    <div className="tp-product-thumb p-relative fix">
                      <a href={`/products/${product.slug}`}>
                        <img src={product.images[0]} alt={product.name} className="w-100" />
                      </a>
                      <div className="tp-product-badge">
                        <span style={{ backgroundColor: "var(--primary-color)" }}>Sale</span>
                      </div>
                      <div className="tp-product-add-cart-btn-large-wrapper">
                        <button type="button" className="tp-product-add-cart-btn-large" data-product-id={product.id} data-product-name={product.name}>
                          Select Options
                        </button>
                      </div>
                    </div>
                    <div className="tp-product-content p-3">
                      <h3 className="text-truncate tp-product-title mb-2">
                        <a href={`/products/${product.slug}`} title={product.name} style={{ color: "#000", fontWeight: 500 }}>
                          {product.name}
                        </a>
                      </h3>
                      <div className="tp-product-price-wrapper">
                        <span className="tp-product-price new-price" style={{ color: "var(--primary-color)", fontWeight: "bold" }}>₹{product.price}</span>
                        <span className="tp-product-price old-price" style={{ marginLeft: "10px", color: "#999" }}><del>₹{product.compareAtPrice}</del></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATION BANNER */}
        <div className="tp-product-banner-area pt-30 pb-30">
          <div className="container">
            <img src="/storage/whatsapp-image-2026-05-21-at-44038-pm.webp" style={{ width: "100%" }} loading="lazy" alt="Certification" />
          </div>
        </div>

        {/* BLOG */}
        <section className="tp-blog-area pt-50 pb-50">
          <div className="container">
            <div className="row align-items-center mb-40">
              <div className="col-xl-4 col-md-6">
                <div className="tp-section-title-wrapper">
                  <h3 className="section-title tp-section-title">
                    <span>Latest</span> News &amp; Offers
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-blog-main-slider">
                  <div className="tp-blog-main-slider-active swiper-container">
                    <div className="swiper-wrapper">
                      {[
                        {
                          href: "/blog/the-real-stories-of-crushing-fatigue-with-zennova-pure-himalayan-shilajit",
                          img: "/storage/whatsapp-image-2026-05-21-at-43405-pm-1-420x270.webp",
                          title: "The Real Stories of Crushing Fatigue with Zennova Pure Himalayan Shilajit",
                          date: "May 21, 2026",
                          excerpt: "We have all been there. It is 3:00 PM, you are staring at your laptop screen, and your brain feels...",
                        },
                        {
                          href: "/blog/burn-fat-smarter-feel-stronger-every-day",
                          img: "/storage/whatsapp-image-2026-05-21-at-43458-pm-1-420x270.webp",
                          title: "Burn Fat Smarter, Feel Stronger Every Day",
                          date: "May 21, 2026",
                          excerpt: "Are you struggling with stubborn belly fat, low energy levels, or uncontrollable cravings? You're not alone...",
                        },
                        {
                          href: "/blog/the-sleep-that-actually-makes-you-glow-why-zennova-sleepglow-is-the-transformation-youve-been-praying-for",
                          img: "/storage/whatsapp-image-2026-05-21-at-44059-pm-420x270.webp",
                          title: "Why Zennova SLEEPGlow Is the Transformation You've Been Praying For",
                          date: "May 21, 2026",
                          excerpt: "What if I told you there's a missing piece to your wellness puzzle that doesn't involve a prescription pad?...",
                        },
                      ].map((post) => (
                        <div className="tp-blog-item mb-30 swiper-slide" key={post.href}>
                          <div className="tp-blog-thumb p-relative fix">
                            <a href={post.href}>
                              <img src="/storage/loader.png" data-bb-lazy="true" loading="lazy" data-src={post.img} alt={post.title} />
                            </a>
                            <div className="tp-blog-meta tp-blog-meta-date">
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <div className="tp-blog-content">
                            <h3 className="tp-blog-title text-truncate">
                              <a href={post.href} title={post.title}>{post.title}</a>
                            </h3>
                            <p>{post.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="tp-testimonial-area pt-30 pb-30">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-section-title-wrapper-3 mb-45 text-center">
                  <h3 className="section-title tp-section-title-3">Customer Reviews</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-testimonial-slider-3">
                  <div className="tp-testimoinal-slider-active-3 swiper-container">
                    <div className="swiper-wrapper">
                      {[
                        { name: "Meraz", designation: "Software Engineer & Fitness Enthusiast", review: `"Main pichle 3 weeks se Zen Nova Green Fuel aur Shilajit use kar raha hoon. Honestly, jo afternoon fatigue hoti thi system pe baithte-baithte, wo ab bilkul chali gayi hai. Clean energy milti hai pure din bina kisi crash ke. Highly recommended for working professionals who hit the gym!"` },
                        { name: "Priya Patel", designation: "Student", review: `"I was skeptical about Zennova Apple Cider Vinegar because of the harsh taste of other brands, but diluted in warm water, this one is actually smooth. Morning me empty stomach lene se bloating bahut kam hui hai and it really promotes healthy skin. Plus, it has the Mother of Vinegar which is awesome!"` },
                        { name: "Neha Kapoor", designation: "Digital Marketing Lead", review: `"Work stress ki wajah se racing thoughts hote the aur neend nahi aati thi easily. But Zennova SLEEPGlow changed the game. 1 tablet before bed and I fall asleep so fast. Best part? Agli subah koi groggy feeling ya sir dard nahi hota, fresh feeling ke saath wake up refresh hotey hain!"` },
                        { name: "Dr. Rohan Joshi", designation: "Consultant Physiotherapist", review: `"Hamari modern busy diet me micro-nutrients miss ho jaate hain. I personally take Zennova Multivitamins daily. B-Complex, Vitamin D3, aur Zinc ka proper balance hai. Energy levels sustained rehte hain and immune system robust feel hota hai. Great foundational supplement."` },
                        { name: "Rahul Verma", designation: "Sales Manager", review: `"Work stress aur target pressure ki wajah se stamina aur drive low chal rahi thi. Zennova UPLIFT X start kiya and within 2 weeks performance aur endurance me bohot difference aaya hai. Total value for money product!"` },
                        { name: "Marcus Thorne", designation: "Financial Analyst", review: `"High-impact training used to leave my knees and lower back feeling incredibly tight for days. Zennova Pain Relief has drastically shortened my recovery time. The natural anti-inflammatory benefits are real, and my joint mobility feels fluid again."` },
                      ].map((t) => (
                        <div className="tp-testimonial-item-3 swiper-slide grey-bg-7 p-relative z-index-1" key={t.name}>
                          <div className="tp-testimonial-content-3">
                            <p>{t.review}</p>
                          </div>
                          <div className="tp-testimonial-user-wrapper-3 d-flex">
                            <div className="tp-testimonial-user-3 d-flex align-items-center">
                              <div className="tp-testimonial-user-3-info tp-testimonial-user-translate">
                                <h3 className="tp-testimonial-user-3-title">{t.name}</h3>
                                <span className="tp-testimonial-3-designation">{t.designation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="tp-testimoinal-slider-dot-3 tp-swiper-dot-border text-center mt-50"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="section container box-coming-soon pt-100 pb-100 overflow-hidden">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-30">
              <h3 className="color-brand-2">Coming Soon</h3>
              <div className="input-group mb-3">
                <input className="form-control" placeholder="Enter Your Email" type="email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
              <div className="tp-footer-social gap-2">
                <a href="https://www.facebook.com" title="Facebook" target="_blank">Facebook</a>
                <a href="https://x.com" title="X" target="_blank">X</a>
                <a href="https://www.youtube.com" title="YouTube" target="_blank">YouTube</a>
              </div>
            </div>
            <div className="col-lg-7 mb-30">
              <img src="/storage/loader.png" data-bb-lazy="true" className="coming-soon-image" loading="lazy" data-src="/storage/whatsapp-image-2026-05-30-at-13550-pm-removebg-preview.webp" alt="Coming Soon" />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}