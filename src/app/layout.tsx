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

        <link rel="icon" type="image/png" href="/storage/loader.png" />

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
      </head>

      <body id="page-home">
        <CartProvider>
        <ClientLoader />
        <AnnouncementBar initialConfig={announcementConfig} />
        <Header />
        {children}
        <Footer />
        <Modals />
        <CartBridge />
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
