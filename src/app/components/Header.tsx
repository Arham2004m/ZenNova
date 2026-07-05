import React from 'react';
import { getFrontend } from "@/lib/api";
import { cookies } from "next/headers";
import { getCartDetails } from "@/lib/cart";
import { getWishlist } from "@/lib/wishlist";
import HeaderSearchForm from "./HeaderSearchForm";

export default async function Header() {
  let logoUrl = "/storage/logot.webp";
  let navLinks: any[] = [];
  const cookieStore = await cookies();
  const cartDetails = await getCartDetails(cookieStore);
  const wishlist = getWishlist(cookieStore);
  const wishlistCount = wishlist.length;
  try {
    const data = await getFrontend();
    logoUrl = data?.customization?.headerConfig?.logoUrl || data?.store?.logo || "/storage/logot.webp";
    navLinks = data?.customization?.navLinks ?? [];
  } catch {}
  return (
    <>
          <div className="back-to-top-wrapper">
        <button id="back_to_top" type="button" className="back-to-top-btn">
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6L6 1L1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </button>
    </div>
    <div className="offcanvas__area offcanvas__radius">
        <div className="offcanvas__wrapper">
            <div className="offcanvas__close">
                <button className="offcanvas__close-btn offcanvas-close-btn" title="Search">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 1L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            </div>
            <div className="offcanvas__content">
                <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
                    <div className="offcanvas__logo logo">
                        <div className="logo">
                            <a href="/">
                            {logoUrl && <img src={logoUrl} data-bb-lazy="false" style={{ height: "40px" }} loading="eager" alt="Zen Nova" />}
                    </a>
                        </div>

                    </div>
                </div>
                <div className="pb-40 offcanvas__category">
                    <button className="tp-offcanvas-category-toggle">
                        <svg className="icon  svg-icon-ti-ti-menu-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 6l16 0" />
  <path d="M4 12l16 0" />
  <path d="M4 18l16 0" />
</svg>                        All Categories
                    </button>
                    <div className="tp-category-mobile-menu"></div>
                </div>

                <div className="mb-40 tp-main-menu-mobile fix d-xl-none"></div>

                <div className="offcanvas__btn">
                    <a href="tel:+917667230620" className="tp-btn-2 tp-btn-border-2">
                        Contact Us
                    </a>
                </div>
            </div>
            <div className="offcanvas__bottom">
                <div className="offcanvas__footer d-flex align-items-center justify-content-between">


                </div>
            </div>
        </div>
    </div>
    <div className="body-overlay"></div>
    <div id="tp-bottom-menu-sticky" className="tp-mobile-menu d-lg-none" style={{"--bottom-bar-menu-text-font-size":"13px"} as React.CSSProperties}>
        <div className="container">
            <div className="row row-cols-5">
                <div className="col">
                    <div className="text-center tp-mobile-item">
                        <a href="/products" className="tp-mobile-item-btn">
                                <svg className="icon  svg-icon-ti-ti-shopping-bag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
  <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
</svg>                                <span className="text-truncate" title="Store">Store</span>
                            </a>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center tp-mobile-item">
                        <button type="button" className="tp-mobile-item-btn tp-search-open-btn" aria-label="Open search">
                            <svg className="icon  svg-icon-ti-ti-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
  <path d="M21 21l-6 -6" />
</svg>                            <span className="text-truncate" title="Search">Search</span>
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center tp-mobile-item">
                        <a href="/wishlist" className="tp-mobile-item-btn">
                                    <svg className="icon  svg-icon-ti-ti-heart"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>                                    <span className="text-truncate" title="Wishlist">Wishlist</span>
                                </a>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center tp-mobile-item">
                        <a href="/faqs" className="tp-mobile-item-btn">
                                <svg className="icon  svg-icon-ti-ti-eye-question"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M14.071 17.764a8.989 8.989 0 0 1 -2.071 .236c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.346 0 6.173 1.727 8.482 5.182" />
  <path d="M19 22v.01" />
  <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
</svg>                                <span className="text-truncate" title="FAQ">FAQ</span>
                            </a>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center tp-mobile-item">
                        <button className="tp-mobile-item-btn tp-offcanvas-open-btn">
                            <svg className="icon  svg-icon-ti-ti-menu-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 6l16 0" />
  <path d="M4 12l16 0" />
  <path d="M4 18l16 0" />
</svg>                            <span className="text-truncate" title="Menu">Menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="cartmini__area">
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
            <div className="cartmini__top-wrapper">
                <div className="cartmini__top p-relative">
                    <div className="cartmini__top-title">
                        <h4>Shopping cart</h4>
                    </div>
                    <div className="cartmini__close" title="Close">
                        <button type="button" className="cartmini__close-btn cartmini-close-btn" title="Close">
                    <svg className="icon  svg-icon-ti-ti-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 6l-12 12" />
  <path d="M6 6l12 12" />
</svg>                </button>
                    </div>
                </div>

                <div data-bb-toggle="mini-cart-content-slot">
                    {cartDetails.items.length === 0 ? (
                      <div className="cartmini__empty text-center">
                        <p>Your cart is empty.</p>
                        <a href="/products" className="tp-btn">Go to Shop</a>
                      </div>
                    ) : (
                      <div className="cartmini__widget">
                         {cartDetails.items.map((item, index) => {
                          if (item.type === "BUNDLE") {
                            return (
                              <div className="cartmini__widget-item" key={`bundle-${item.bundleId}-${index}`}>
                                <div className="cartmini__content" style={{ paddingLeft: 0 }}>
                                  <span className="zn-cart-page__badge" style={{ background: "#f37324", color: "#fff", padding: "2px 6px", fontSize: "10px", borderRadius: "4px", fontWeight: "bold", textTransform: "uppercase" }}>Combo Offer</span>
                                  <h5 className="cartmini__title mt-10">
                                    <a href="/bundle">{item.title}</a>
                                  </h5>
                                  <p style={{ fontSize: "12px", color: "#aaa", margin: "4px 0" }}>{(item.items || []).map((p: any) => p.name).join(" · ")}</p>
                                  <div className="cartmini__price-wrapper">
                                    <span className="cartmini__price">₹{parseFloat(item.payable as any).toLocaleString("en-IN")}</span>
                                    {item.subtotal != null && item.payable != null && item.subtotal > item.payable && (
                                      <del style={{ fontSize: "12px", color: "#666", marginLeft: "8px" }}>₹{parseFloat(item.subtotal as any).toLocaleString("en-IN")}</del>
                                    )}
                                  </div>
                                </div>
                                <a href={`/ajax/cart-content?remove_index=${index}`} className="cartmini__del" data-bb-toggle="remove-from-cart">
                                  <svg className="icon svg-icon-ti-ti-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </a>
                              </div>
                            );
                          }

                          const imgUrl = item.product?.images?.[0] || "/storage/logot.webp";
                          return (
                            <div className="cartmini__widget-item" key={item.product?.id || `product-${index}`}>
                              <div className="cartmini__thumb">
                                <a href={`/products/${item.product?.slug}`}>
                                  <img src={imgUrl} alt={item.product?.name || ""} />
                                </a>
                              </div>
                              <div className="cartmini__content">
                                <h5 className="cartmini__title">
                                  <a href={`/products/${item.product?.slug}`}>{item.product?.name || ""}</a>
                                </h5>
                                <div className="cartmini__price-wrapper">
                                  <span className="cartmini__price">₹{parseFloat(item.product?.price || "0").toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cartmini__quantity mt-10 mb-10">
                                  <form action="/ajax/cart-content" method="POST">
                                    <input type="hidden" name="id" value={item.product?.id || ""} />
                                    <input type="hidden" name="cart_action" value="update" />
                                    <div className="tp-product-quantity">
                                      <span className="tp-cart-minus" data-bb-toggle="decrease-qty">-</span>
                                      <input className="tp-cart-input" type="text" value={item.quantity} data-bb-toggle="update-cart" name="qty" readOnly />
                                      <span className="tp-cart-plus" data-bb-toggle="increase-qty">+</span>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <a href={`/ajax/cart-content?remove_index=${index}`} className="cartmini__del" data-bb-toggle="remove-from-cart">
                                <svg className="icon svg-icon-ti-ti-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
            </div>

            <div data-bb-toggle="mini-cart-footer-slot">
                {cartDetails.items.length > 0 && (
                    <div className="cartmini__checkout">
                    <div className="cartmini__checkout-title">
                      <h4>Subtotal:</h4>
                      <span>₹{cartDetails.subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="cartmini__checkout-btn">
                      <a href="/ajax/cart-content?clear=true" className="cartmini__btn-clear w-100" data-bb-toggle="remove-from-cart">Clear Cart</a>
                      <a href="/checkout" className="cartmini__btn-checkout w-100">Checkout</a>
                    </div>
                  </div>   
                )}
            </div>
        </div>
    </div>
    <header>
        <div className="tp-header-area p-relative z-index-11">
            <div className="p-relative z-index-11 tp-header-top-border tp-header-top black-bg" style={{"backgroundColor":"rgb(0, 0, 0)","color":"rgb(255, 255, 255)"} as React.CSSProperties}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="position-relative">
                            <div data-bb-toggle="announcement-lazy-loading" data-url="/ajax/announcements"></div>
                        </div>
                        <div>
                            <div className="tp-header-top-right d-flex align-items-center justify-content-end">
                                <div className="tp-header-top-menu d-none d-lg-flex align-items-center justify-content-end">


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="tp-header-main tp-header-sticky" style={{"backgroundColor":"rgb(0, 0, 0)","color":"rgb(255, 255, 255)"} as React.CSSProperties}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                            <div className="logo">
                                <a href="/">
                           {logoUrl && <img src={logoUrl} data-bb-lazy="false" style={{ height: "40px" }} loading="eager" alt="Zen Nova" />}
                    </a>
                            </div>

                        </div>

                        <div className="col-xl-6 col-lg-7 zn-header-search-col">
                            <HeaderSearchForm />
                        </div>
                        <div className="col-xl-4 col-lg-3 col-md-8 col-6">
                            <div className="tp-header-main-right d-flex align-items-center justify-content-end">
                                <div className="tp-header-action d-flex align-items-center ml-50">


                                    <div className="tp-header-action-item d-none d-lg-block tp-header-action-item-wishlist">
                                        <a href="/wishlist" className="tp-header-action-btn">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.239 18.8538C13.4096 17.5179 15.4289 15.9456 17.2607 14.1652C18.5486 12.8829 19.529 11.3198 20.1269 9.59539C21.2029 6.25031 19.9461 2.42083 16.4289 1.28752C14.5804 0.692435 12.5616 1.03255 11.0039 2.20148C9.44567 1.03398 7.42754 0.693978 5.57894 1.28752C2.06175 2.42083 0.795919 6.25031 1.87187 9.59539C2.46978 11.3198 3.45021 12.8829 4.73806 14.1652C6.56988 15.9456 8.58917 17.5179 10.7598 18.8538L10.9949 19L11.239 18.8538Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.26062 5.05302C6.19531 5.39332 5.43839 6.34973 5.3438 7.47501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="wishlist-count">{wishlistCount}</span>
                </a>
                                    </div>
                                    <div className="tp-header-action-item tp-header-action-item-cart">
                                        <button type="button" className="tp-header-action-btn cartmini-open-btn" data-bb-toggle="open-mini-cart" data-url="/ajax/cart-content">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.48626 20.5H14.8341C17.9004 20.5 20.2528 19.3924 19.5847 14.9348L18.8066 8.89359C18.3947 6.66934 16.976 5.81808 15.7311 5.81808H5.55262C4.28946 5.81808 2.95308 6.73341 2.4771 8.89359L1.69907 14.9348C1.13157 18.889 3.4199 20.5 6.48626 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.34902 5.5984C6.34902 3.21232 8.28331 1.27803 10.6694 1.27803V1.27803C11.8184 1.27316 12.922 1.72619 13.7362 2.53695C14.5504 3.3477 15.0081 4.44939 15.0081 5.5984V5.5984" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.70365 10.1018H7.74942" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.5343 10.1018H13.5801" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="cart-count">{cartDetails.count}</span>
                </button>
                                    </div>
                                    <div className="tp-header-action-item d-lg-none tp-header-action-item-menu">
                                        <button type="button" className="tp-header-action-btn tp-offcanvas-open-btn" title="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                <rect x="10" width="20" height="2" fill="currentColor"/>
                <rect x="5" y="7" width="25" height="2" fill="currentColor"/>
                <rect x="10" y="14" width="20" height="2" fill="currentColor"/>
            </svg>
        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tp-header-bottom tp-header-bottom-border zn-header-nav d-none d-lg-block" style={{"backgroundColor":"rgb(0, 0, 0)","color":"rgb(255, 153, 0)","borderColor":"rgba(255, 255, 255, 0.12)"} as React.CSSProperties}>
                <div className="container">
                    <div className="tp-mega-menu-wrapper p-relative">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-3">
                                <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                                    <button className="tp-category-menu-btn tp-category-menu-toggle" data-bb-toggle="init-categories-dropdown" data-bb-target=".tp-category-menu-content" data-url="/ajax/categories-dropdown">
                                        <span>
                                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H1Z" fill="currentColor"/>
                                            </svg>
                                        </span>
                                        All Categories
                                    </button>
                                    <nav className="tp-category-menu-content"></nav>
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6">
                                <div className="main-menu menu-style-1">
                                    <nav className="tp-main-menu-content">
                                        <ul>
                                            <li className="">
                                                <a href="/" title="Home">
                <svg className="icon me-1 svg-icon-ti-ti-home-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2" />
  <path d="M19 13.488v-1.488h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.525" />
  <path d="M15 19l2 2l4 -4" />
</svg>

                Home

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/products" title="Shop">
                <svg className="icon me-1 svg-icon-ti-ti-shopping-cart-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M11.5 17h-5.5v-14h-2" />
  <path d="M6 5l14 1l-1 7h-13" />
  <path d="M15 19l2 2l4 -4" />
</svg>

                Shop

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/blog?layout=grid" title="Offers">
                <svg className="icon me-1 svg-icon-ti-ti-basket-discount"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 10l-2 -6" />
  <path d="M7 10l2 -6" />
  <path d="M12.5 20h-5.256a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.394 2.248" />
  <path d="M13.856 13.254a2 2 0 1 0 -1.856 2.746" />
  <path d="M16 21l5 -5" />
  <path d="M21 21v.01" />
  <path d="M16 16v.01" />
</svg>

                Offers

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/contact" title="About Us">
                <svg className="icon me-1 svg-icon-ti-ti-user-circle"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
</svg>

                About Us

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/faqs" title="FAQ">
                <svg className="icon me-1 svg-icon-ti-ti-eye-question"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M14.071 17.764a8.989 8.989 0 0 1 -2.071 .236c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.346 0 6.173 1.727 8.482 5.182" />
  <path d="M19 22v.01" />
  <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
</svg>

                FAQ

                            </a>

                                            </li>
                                        </ul>

                                    </nav>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3">
                                <div className="tp-header-contact d-flex align-items-center justify-content-end">
                                    <div className="tp-header-contact-icon">
                                        <span>
                                            <svg className="icon  svg-icon-ti-ti-phone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>                                        </span>
                                    </div>
                                    <div className="tp-header-contact-content">
                                        <h5>Hotline:</h5>
                                        <p>
                                            <a href="tel:+917667230620">
                                                +91 76672 30620
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="header-sticky-2" className="tp-header-sticky-area zn-header-nav zn-header-sticky">
        <div className="container">
            <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                        <div className="logo">
                            <a href="/">
                            {logoUrl && <img src={logoUrl} data-bb-lazy="false" style={{ height: "40px" }} loading="eager" alt="Zen Nova" />}
                            </a>
                        </div>

                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 d-none d-md-block">
                        <div className="tp-header-sticky-menu main-menu menu-style-1">
                            <nav id="mobile-menu">
                                <ul>
                                    <li className="">
                                        <a href="/" title="Home">
                <svg className="icon me-1 svg-icon-ti-ti-home-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2" />
  <path d="M19 13.488v-1.488h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.525" />
  <path d="M15 19l2 2l4 -4" />
</svg>

                Home

                            </a>

                                    </li>
                                    <li className="">
                                        <a href="/products" title="Shop">
                <svg className="icon me-1 svg-icon-ti-ti-shopping-cart-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M11.5 17h-5.5v-14h-2" />
  <path d="M6 5l14 1l-1 7h-13" />
  <path d="M15 19l2 2l4 -4" />
</svg>

                Shop

                            </a>

                                    </li>
                                    <li className="">
                                        <a href="/blog?layout=grid" title="Offers">
                <svg className="icon me-1 svg-icon-ti-ti-basket-discount"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 10l-2 -6" />
  <path d="M7 10l2 -6" />
  <path d="M12.5 20h-5.256a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.394 2.248" />
  <path d="M13.856 13.254a2 2 0 1 0 -1.856 2.746" />
  <path d="M16 21l5 -5" />
  <path d="M21 21v.01" />
  <path d="M16 16v.01" />
</svg>

                Offers

                            </a>

                                    </li>
                                    <li className="">
                                        <a href="/contact" title="About Us">
                <svg className="icon me-1 svg-icon-ti-ti-user-circle"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
</svg>

                About Us

                            </a>

                                    </li>
                                    <li className="">
                                        <a href="/faqs" title="FAQ">
                <svg className="icon me-1 svg-icon-ti-ti-eye-question"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M14.071 17.764a8.989 8.989 0 0 1 -2.071 .236c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.346 0 6.173 1.727 8.482 5.182" />
  <path d="M19 22v.01" />
  <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
</svg>

                FAQ

                            </a>

                                    </li>
                                </ul>

                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                        <div className="tp-header-action d-flex align-items-center ml-50 justify-content-end">


                            <div className="tp-header-action-item d-none d-lg-block tp-header-action-item-wishlist">
                                <a href="/wishlist" className="tp-header-action-btn">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.239 18.8538C13.4096 17.5179 15.4289 15.9456 17.2607 14.1652C18.5486 12.8829 19.529 11.3198 20.1269 9.59539C21.2029 6.25031 19.9461 2.42083 16.4289 1.28752C14.5804 0.692435 12.5616 1.03255 11.0039 2.20148C9.44567 1.03398 7.42754 0.693978 5.57894 1.28752C2.06175 2.42083 0.795919 6.25031 1.87187 9.59539C2.46978 11.3198 3.45021 12.8829 4.73806 14.1652C6.56988 15.9456 8.58917 17.5179 10.7598 18.8538L10.9949 19L11.239 18.8538Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.26062 5.05302C6.19531 5.39332 5.43839 6.34973 5.3438 7.47501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="wishlist-count">{wishlistCount}</span>
                </a>
                            </div>
                            <div className="tp-header-action-item tp-header-action-item-cart">
                                <button type="button" className="tp-header-action-btn cartmini-open-btn" data-bb-toggle="open-mini-cart" data-url="/ajax/cart-content">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.48626 20.5H14.8341C17.9004 20.5 20.2528 19.3924 19.5847 14.9348L18.8066 8.89359C18.3947 6.66934 16.976 5.81808 15.7311 5.81808H5.55262C4.28946 5.81808 2.95308 6.73341 2.4771 8.89359L1.69907 14.9348C1.13157 18.889 3.4199 20.5 6.48626 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.34902 5.5984C6.34902 3.21232 8.28331 1.27803 10.6694 1.27803V1.27803C11.8184 1.27316 12.922 1.72619 13.7362 2.53695C14.5504 3.3477 15.0081 4.44939 15.0081 5.5984V5.5984" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.70365 10.1018H7.74942" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.5343 10.1018H13.5801" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="cart-count">{cartDetails.count}</span>
                </button>
                            </div>
                            <div className="tp-header-action-item d-lg-none tp-header-action-item-menu">
                                <button type="button" className="tp-header-action-btn tp-offcanvas-open-btn" title="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                <rect x="10" width="20" height="2" fill="currentColor"/>
                <rect x="5" y="7" width="25" height="2" fill="currentColor"/>
                <rect x="10" y="14" width="20" height="2" fill="currentColor"/>
            </svg>
        </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>






    </>
  );
}