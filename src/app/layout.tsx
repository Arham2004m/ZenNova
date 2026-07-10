/* eslint-disable */
import type { Metadata, Viewport } from "next";
import { getFrontend } from "@/lib/api";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modals from "./components/Modals";
import ClientLoader from "./ClientLoader";
import AnnouncementBar from "@/components/AnnouncementBar";
import { CartProvider } from "@/components/Cart/CartProvider";
import CartBridge from "@/components/Cart/CartBridge";
import SearchBridge from "@/components/Search/SearchBridge";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Nova Best Fitness Supplements",
  description: "Zen Nova Best Fitness Supplements",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let primaryColor = "#f37324";
  let announcementConfig = null;
  try {
    const data = await getFrontend();
    primaryColor = data?.customization?.brandColors?.primary ?? primaryColor;
    announcementConfig = data?.customization?.announcementBar ?? null;
  } catch {}
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="csrf-token" content="rdL0i0fdEFahvYMTSodxTJYCXBStzgJOvDfvKzBo" />

        {/* CSS Variables */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
              --primary-color: #f37324;
              --primary-color-rgb: 243, 115, 36;
              --tp-theme-secondary: rgb(255, 255, 255);
              --footer-background-color: rgb(255, 255, 255);
              --footer-text-color: rgb(255, 255, 255);
              --footer-title-color: rgb(255, 255, 255);
              --footer-link-color: rgb(255, 153, 0);
              --footer-link-hover-color: #0989ff;
              --footer-border-color: #e5e6e8;
              --primary-font: "Roboto", sans-serif;
              --body-size: 14px;
              --h1-size: 36px;
              --h2-size: 32px;
              --h3-size: 28px;
              --h4-size: 24px;
              --h5-size: 20px;
              --h6-size: 16px;
          }
          h1 { font-size: var(--h1-size); }
          h2 { font-size: var(--h2-size); }
          h3 { font-size: var(--h3-size); }
          h4 { font-size: var(--h4-size); }
          h5 { font-size: var(--h5-size); }
          h6 { font-size: var(--h6-size); }
          body { font-size: var(--body-size); }
        `}} />

        <link rel="icon" type="image/jpeg" href="/storage/favicon.jpeg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />

        {/* Stylesheets */}
        <link media="all" type="text/css" rel="stylesheet" href="/vendor/core/plugins/cookie-consent/css/cookie-consent.css?v=1.1.0" />
        <link media="all" type="text/css" rel="stylesheet" href="/vendor/core/core/base/libraries/ckeditor/content-styles.css" />
        <link media="all" type="text/css" rel="stylesheet" href="/themes/shofy/plugins/bootstrap/bootstrap.min.css" />
        <link media="all" type="text/css" rel="stylesheet" href="/vendor/core/plugins/ecommerce/css/front-ecommerce.css?v=1.3.4.5" />
        <link media="all" type="text/css" rel="stylesheet" href="/themes/shofy/css/animate.css" />
        <link media="all" type="text/css" rel="stylesheet" href="/themes/shofy/plugins/swiper/swiper-bundle.css" />
        <link media="all" type="text/css" rel="stylesheet" href="/vendor/core/plugins/ecommerce/libraries/slick/slick.css" />
        <link media="all" type="text/css" rel="stylesheet" href="/themes/shofy/css/theme.css?v=1.3.4" />
        <link media="all" type="text/css" rel="stylesheet" href="/vendor/core/plugins/ecommerce/libraries/lightgallery/css/lightgallery.min.css" />
        <link media="all" type="text/css" rel="stylesheet" href="/themes/shofy/css/style.integration.css?v=1781380464" />
        <link media="all" type="text/css" rel="stylesheet" href="/vendor/core/plugins/announcement/css/announcement.css?v=1.3.4" />

        {/* jQuery must load before legacy theme scripts */}
        <script src="/themes/shofy/js/jquery-3.7.1.min.js" />

        {/* Global configuration scripts */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.siteUrl = "";
          window.currencies = JSON.parse('{"display_big_money":false,"billion":"billion","million":"million","is_prefix_symbol":true,"symbol":"\\\\u20b9","title":"INR","decimal_separator":".","thousands_separator":",","number_after_dot":0,"show_symbol_or_title":true}');
        `}} />
        
        {/* Floating WhatsApp Logo Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #25d366;
            color: #fff;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.35);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .whatsapp-float:hover {
            transform: scale(1.08);
            background-color: #128c7e;
            color: #fff;
          }
          .whatsapp-float svg {
            width: 34px;
            height: 34px;
            fill: currentColor;
            display: block;
          }
          @media (max-width: 767px) {
            .whatsapp-float {
              width: 50px;
              height: 50px;
              bottom: 95px; /* Sits cleanly above the sticky bottom navigation bar */
              right: 20px;
              left: auto;
            }
            .whatsapp-float svg {
              width: 28px;
              height: 28px;
            }
          }
        `}} />
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1396054905910188');
          fbq('track', 'PageView');
        `}} />
      </head>

      <body id="page-home">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1396054905910188&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <CartProvider>
        <ClientLoader />
        <AnnouncementBar initialConfig={announcementConfig} />
        <Header />
        {children}
        <Footer />
        <Modals />
        <CartBridge />
        <SearchBridge />
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/917482836500"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Contact us on WhatsApp"
        >
          <svg viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97-1.861-1.868-4.339-2.897-6.97-2.899-5.437 0-9.862 4.37-9.866 9.801-.001 1.698.448 3.354 1.3 4.8l-.999 3.648 3.731-.981zm11.367-7.223c-.32-.16-1.89-.933-2.185-1.041-.295-.108-.51-.16-.723.16-.213.32-.823 1.041-1.008 1.256-.185.215-.37.242-.69.082-1.748-.874-2.909-1.45-4.068-3.442-.303-.521.303-.483.868-1.61.093-.186.046-.349-.023-.483-.069-.134-.51-1.256-.7-1.702-.186-.447-.373-.387-.512-.394-.132-.007-.284-.008-.436-.008a.837.837 0 0 0-.606.282c-.207.228-.79.772-.79 1.88 0 1.11.8 2.18.91 2.336.112.156 1.58 2.48 3.826 3.453 1.88.817 2.263.655 3.076.578.817-.077 1.89-.77 2.158-1.479.266-.708.266-1.314.188-1.443-.078-.129-.285-.209-.606-.369z" />
          </svg>
        </a>
        </CartProvider>

        {/* Client-side JavaScript assets loaded in correct sequence */}
        <Script src="/themes/shofy/plugins/bootstrap/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/themes/shofy/js/meanmenu.js" strategy="afterInteractive" />
        <Script src="/themes/shofy/plugins/swiper/swiper-bundle.js?v=1.3.4" strategy="afterInteractive" />
        <Script src="/vendor/core/plugins/ecommerce/libraries/slick/slick.min.js" strategy="afterInteractive" />
        <Script src="/themes/shofy/js/countdown.js" strategy="afterInteractive" />
        <Script src="/themes/shofy/js/theme.js?v=1.3.5" strategy="afterInteractive" />
        <Script src="/vendor/core/core/js-validation/js/js-validation.js?v=1.0.1" strategy="afterInteractive" />
        <Script src="/vendor/core/plugins/ecommerce/libraries/lightgallery/js/lightgallery.min.js" strategy="afterInteractive" />
        <Script src="/vendor/core/packages/theme/plugins/lazyload.min.js?v=1.3.4" strategy="afterInteractive" />
        <Script src="/vendor/core/plugins/cookie-consent/js/cookie-consent.js?v=1.1.0" strategy="afterInteractive" />
        <Script src="/vendor/core/plugins/sale-popup/js/sale-popup.js?v=1.2.1" strategy="afterInteractive" />
        <Script src="/vendor/core/plugins/ecommerce/js/front-ecommerce.js?v=1.3.4.5" strategy="afterInteractive" />
        <Script src="/themes/shofy/js/ecommerce.js?v=1.3.4" strategy="afterInteractive" />
        <Script src="/vendor/core/packages/theme/js/toast.js?v=1.3.4" strategy="afterInteractive" />
        <Script src="/vendor/core/plugins/announcement/js/announcement.js?v=1.3.4" strategy="afterInteractive" />
      </body>
    </html>
  );
}
