/* eslint-disable */
import React from 'react';
import { getFrontend } from "@/lib/api";

export default async function Header() {
  let logoUrl = "/storage/logot.webp";
  let navLinks: any[] = [];
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
                    <a href="tel:8 800 332 65-66" className="tp-btn-2 tp-btn-border-2">
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
                        <button className="tp-mobile-item-btn tp-search-open-btn">
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
                        <a href="/login" className="tp-mobile-item-btn">
                                <svg className="icon  svg-icon-ti-ti-user"
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
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>                                <span className="text-truncate" title="Account">Account</span>
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
    <section className="tp-search-area">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="tp-search-form">
                        <div className="mb-20 text-center tp-search-close">
                            <button className="tp-search-close-btn"></button>
                        </div>
                        <form role="search" action="/products" data-ajax-url="/ajax/search-products" method="GET" className="bb-form-quick-search" id="bb-form-quick-search">
                            <div className="mb-10 tp-search-input">
                                <input type="search" name="q" placeholder="Search for Products..." autoComplete="off" />
                                <button type="submit" title="Search"><svg className="icon  svg-icon-ti-ti-search"
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
</svg></button>
                            </div>

                            <div className="bb-quick-search-results"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
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

                <div data-bb-toggle="mini-cart-content-slot"></div>
            </div>

            <div data-bb-toggle="mini-cart-footer-slot"></div>
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

                        <div className="col-xl-6 col-lg-7 d-none d-lg-block pl-70">
                            <form role="search" action="/products" data-ajax-url="/ajax/search-products" method="GET" className="bb-form-quick-search tp-header-search" id="bb-form-quick-search">
                                <div className="tp-header-search-wrapper d-flex align-items-center">
                                    <div className="tp-header-search-box">
                                        <input type="search" name="q" placeholder="Search for Products..." autoComplete="off" />
                                    </div>
                                    <div className="tp-header-search-category">
                                        <div className="product-category-label">
                                            <span>All Categories</span>
                                            <svg className="icon  svg-icon-ti-ti-chevron-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M6 9l6 6l6 -6" />
</svg> </div>
                                        <select name="categories[]" data-bb-toggle="init-categories-dropdown" data-url="/ajax/categories-dropdown" aria-label="Product categories">
    <option value="">All Categories</option>
</select>
                                    </div>
                                    <div className="tp-header-search-btn">
                                        <button type="submit" title="Search">
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
</svg>            </button>
                                    </div>
                                </div>

                                <div className="bb-quick-search-results"></div>
                            </form>

                        </div>
                        <div className="col-xl-4 col-lg-3 col-md-8 col-6">
                            <div className="tp-header-main-right d-flex align-items-center justify-content-end">
                                <div className="tp-header-login d-none d-lg-block">
                                    <a href="/login" className="d-flex align-items-center">
                                        <div className="tp-header-login-icon">
                                            <span style={{"borderColor":"rgb(255, 255, 255)"} as React.CSSProperties}>
                                                                                                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="8.57894" cy="5.77803" r="4.77803" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.00002 17.2014C0.998732 16.8655 1.07385 16.5337 1.2197 16.2311C1.67736 15.3158 2.96798 14.8307 4.03892 14.611C4.81128 14.4462 5.59431 14.336 6.38217 14.2815C7.84084 14.1533 9.30793 14.1533 10.7666 14.2815C11.5544 14.3367 12.3374 14.4468 13.1099 14.611C14.1808 14.8307 15.4714 15.27 15.9291 16.2311C16.2224 16.8479 16.2224 17.564 15.9291 18.1808C15.4714 19.1419 14.1808 19.5812 13.1099 19.7918C12.3384 19.9634 11.5551 20.0766 10.7666 20.1304C9.57937 20.2311 8.38659 20.2494 7.19681 20.1854C6.92221 20.1854 6.65677 20.1854 6.38217 20.1304C5.59663 20.0773 4.81632 19.9641 4.04807 19.7918C2.96798 19.5812 1.68652 19.1419 1.2197 18.1808C1.0746 17.8747 0.999552 17.5401 1.00002 17.2014Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                                                            </span>
                                        </div>
                                        <div className="tp-header-login-content d-none d-xl-block">
                                            <span style={{"borderColor":"rgb(255, 255, 255)"} as React.CSSProperties}>
                                                                                                    Hello, Guest
                                                                                            </span>
                                            <h5 className="tp-header-login-title">
                                                Login / Register
                                            </h5>
                                        </div>
                                    </a>
                                </div>

                                <div className="tp-header-action d-flex align-items-center ml-50">

                                    <div className="tp-header-action-item tp-header-action-item-compare">
                                        <a href="/compare" className="tp-header-action-btn">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8396 17.3319V3.71411" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.1556 13L15.0778 17.0967L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.91115 1.00056V14.6183" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M0.833496 5.09667L4.91127 1L8.98905 5.09667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="compare-count">0</span>
                </a>
                                    </div>
                                    <div className="tp-header-action-item d-none d-lg-block tp-header-action-item-wishlist">
                                        <a href="/wishlist" className="tp-header-action-btn">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.239 18.8538C13.4096 17.5179 15.4289 15.9456 17.2607 14.1652C18.5486 12.8829 19.529 11.3198 20.1269 9.59539C21.2029 6.25031 19.9461 2.42083 16.4289 1.28752C14.5804 0.692435 12.5616 1.03255 11.0039 2.20148C9.44567 1.03398 7.42754 0.693978 5.57894 1.28752C2.06175 2.42083 0.795919 6.25031 1.87187 9.59539C2.46978 11.3198 3.45021 12.8829 4.73806 14.1652C6.56988 15.9456 8.58917 17.5179 10.7598 18.8538L10.9949 19L11.239 18.8538Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.26062 5.05302C6.19531 5.39332 5.43839 6.34973 5.3438 7.47501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="wishlist-count">0</span>
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
                    <span className="tp-header-action-badge" data-bb-value="cart-count">0</span>
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

            <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block" style={{"backgroundColor":"rgb(0, 0, 0)","color":"rgb(255, 153, 0)","borderColor":"rgb(255, 255, 255)"} as React.CSSProperties}>
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
                                            <li className="has-dropdown">
                                                <a href="#" title="Pages">
                

                Pages

                                    <svg className="icon  svg-icon-ti-ti-chevron-down"
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
  <path d="M6 9l6 6l6 -6" />
</svg>                            </a>

                                                <ul className="tp-submenu">
                                                    <li className="">
                                                        <a href="/faqs" title="FAQs">
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

                FAQs

                            </a>

                                                    </li>
                                                    <li className="">
                                                        <a href="/login" title="Login">
                <svg className="icon me-1 svg-icon-ti-ti-login-2"
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
  <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
  <path d="M3 12h13l-3 -3" />
  <path d="M13 15l3 -3" />
</svg>

                Login

                            </a>

                                                    </li>
                                                    <li className="">
                                                        <a href="/register" title="Register">
                <svg className="icon me-1 svg-icon-ti-ti-user-check"
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
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
  <path d="M15 19l2 2l4 -4" />
</svg>

                Register

                            </a>

                                                    </li>
                                                    <li className="">
                                                        <a href="/password/reset" title="Forgot Password">
                <svg className="icon me-1 svg-icon-ti-ti-password-user"
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
  <path d="M12 17v4" />
  <path d="M10 20l4 -2" />
  <path d="M10 18l4 2" />
  <path d="M5 17v4" />
  <path d="M3 20l4 -2" />
  <path d="M3 18l4 2" />
  <path d="M19 17v4" />
  <path d="M17 20l4 -2" />
  <path d="M17 18l4 2" />
  <path d="M9 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M7 14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2" />
</svg>

                Forgot Password

                            </a>

                                                    </li>
                                                    <li className="">
                                                        <a href="/404" title="404 Error">
                <svg className="icon me-1 svg-icon-ti-ti-error-404"
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
  <path d="M3 8v3a1 1 0 0 0 1 1h3" />
  <path d="M7 8v8" />
  <path d="M17 8v3a1 1 0 0 0 1 1h3" />
  <path d="M21 8v8" />
  <path d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" />
</svg>

                404 Error

                            </a>

                                                    </li>
                                                    <li className="">
                                                        <a href="/coming-soon" title="Coming Soon">
                <svg className="icon me-1 svg-icon-ti-ti-news-off"
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
  <path d="M16 6h3a1 1 0 0 1 1 1v9m-.606 3.435a2 2 0 0 1 -3.394 -1.435v-2m0 -4v-7a1 1 0 0 0 -1 -1h-7m-3.735 .321a1 1 0 0 0 -.265 .679v12a3 3 0 0 0 3 3h11" />
  <path d="M8 12h4" />
  <path d="M8 16h4" />
  <path d="M3 3l18 18" />
</svg>

                Coming Soon

                            </a>

                                                    </li>
                                                </ul>

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
                                            <a href="tel:8 800 332 65-66">
                                                8 800 332 65-66
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

    <div id="header-sticky-2" className="tp-header-sticky-area">
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
                                    <li className="has-dropdown">
                                        <a href="#" title="Pages">
                

                Pages

                                    <svg className="icon  svg-icon-ti-ti-chevron-down"
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
  <path d="M6 9l6 6l6 -6" />
</svg>                            </a>

                                        <ul className="tp-submenu">
                                            <li className="">
                                                <a href="/faqs" title="FAQs">
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

                FAQs

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/login" title="Login">
                <svg className="icon me-1 svg-icon-ti-ti-login-2"
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
  <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
  <path d="M3 12h13l-3 -3" />
  <path d="M13 15l3 -3" />
</svg>

                Login

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/register" title="Register">
                <svg className="icon me-1 svg-icon-ti-ti-user-check"
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
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
  <path d="M15 19l2 2l4 -4" />
</svg>

                Register

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/password/reset" title="Forgot Password">
                <svg className="icon me-1 svg-icon-ti-ti-password-user"
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
  <path d="M12 17v4" />
  <path d="M10 20l4 -2" />
  <path d="M10 18l4 2" />
  <path d="M5 17v4" />
  <path d="M3 20l4 -2" />
  <path d="M3 18l4 2" />
  <path d="M19 17v4" />
  <path d="M17 20l4 -2" />
  <path d="M17 18l4 2" />
  <path d="M9 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M7 14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2" />
</svg>

                Forgot Password

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/404" title="404 Error">
                <svg className="icon me-1 svg-icon-ti-ti-error-404"
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
  <path d="M3 8v3a1 1 0 0 0 1 1h3" />
  <path d="M7 8v8" />
  <path d="M17 8v3a1 1 0 0 0 1 1h3" />
  <path d="M21 8v8" />
  <path d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" />
</svg>

                404 Error

                            </a>

                                            </li>
                                            <li className="">
                                                <a href="/coming-soon" title="Coming Soon">
                <svg className="icon me-1 svg-icon-ti-ti-news-off"
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
  <path d="M16 6h3a1 1 0 0 1 1 1v9m-.606 3.435a2 2 0 0 1 -3.394 -1.435v-2m0 -4v-7a1 1 0 0 0 -1 -1h-7m-3.735 .321a1 1 0 0 0 -.265 .679v12a3 3 0 0 0 3 3h11" />
  <path d="M8 12h4" />
  <path d="M8 16h4" />
  <path d="M3 3l18 18" />
</svg>

                Coming Soon

                            </a>

                                            </li>
                                        </ul>

                                    </li>
                                </ul>

                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                        <div className="tp-header-action d-flex align-items-center ml-50 justify-content-end">

                            <div className="tp-header-action-item tp-header-action-item-compare">
                                <a href="/compare" className="tp-header-action-btn">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8396 17.3319V3.71411" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.1556 13L15.0778 17.0967L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.91115 1.00056V14.6183" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M0.833496 5.09667L4.91127 1L8.98905 5.09667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="compare-count">0</span>
                </a>
                            </div>
                            <div className="tp-header-action-item d-none d-lg-block tp-header-action-item-wishlist">
                                <a href="/wishlist" className="tp-header-action-btn">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.239 18.8538C13.4096 17.5179 15.4289 15.9456 17.2607 14.1652C18.5486 12.8829 19.529 11.3198 20.1269 9.59539C21.2029 6.25031 19.9461 2.42083 16.4289 1.28752C14.5804 0.692435 12.5616 1.03255 11.0039 2.20148C9.44567 1.03398 7.42754 0.693978 5.57894 1.28752C2.06175 2.42083 0.795919 6.25031 1.87187 9.59539C2.46978 11.3198 3.45021 12.8829 4.73806 14.1652C6.56988 15.9456 8.58917 17.5179 10.7598 18.8538L10.9949 19L11.239 18.8538Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.26062 5.05302C6.19531 5.39332 5.43839 6.34973 5.3438 7.47501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tp-header-action-badge" data-bb-value="wishlist-count">0</span>
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
                    <span className="tp-header-action-badge" data-bb-value="cart-count">0</span>
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