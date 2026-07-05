/* eslint-disable */
import React from 'react';
import { getFrontend } from "@/lib/api";

export default async function Footer() {
  let copyright = "© 2026 All Rights Reserved.";
  let phone = "+91 76672 30620";
  let email = "zennovapvt@gmail.com";
  let address = "BYE PASS ROAD, Manjhiladih Road, Near Hanuman mandir, Kolakusma, Dhanbad, Jharkhand - 828109";
  try {
    const data = await getFrontend();
    const footer = data?.customization?.footerContent;
    const contact = data?.customization?.contactInfo;
    if (footer?.copyright) copyright = footer.copyright;
    if (contact?.phone) phone = contact.phone;
    if (contact?.email) email = contact.email;
    if (contact?.address) address = contact.address;
  } catch {}
  return (
    <>
          <section className="tp-subscribe-area pt-70 pb-65 theme-bg p-relative z-index-1">
        <div className="tp-subscribe-shape d-none d-sm-block">
            <img src="/themes/shofy/images/newsletter/shape-1.svg" className="tp-subscribe-shape-1" alt="Subscribe our Newsletter" />
            <img src="/themes/shofy/images/newsletter/shape-2.svg" className="tp-subscribe-shape-2" alt="Subscribe our Newsletter" />
            <img src="/themes/shofy/images/newsletter/shape-3.svg" className="tp-subscribe-shape-3" alt="Subscribe our Newsletter" />
            <img src="/themes/shofy/images/newsletter/shape-4.svg" className="tp-subscribe-shape-4" alt="Subscribe our Newsletter" />

            <div className="tp-subscribe-plane">
                <img className="tp-subscribe-plane-shape" src="/themes/shofy/images/newsletter/plane.png" alt="Subscribe our Newsletter" />
                <svg width="399" height="110" className="d-none d-sm-block" viewBox="0 0 399 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.499634 1.00049C8.5 20.0005 54.2733 13.6435 60.5 40.0005C65.6128 61.6426 26.4546 130.331 15 90.0005C-9 5.5 176.5 127.5 218.5 106.5C301.051 65.2247 202 -57.9188 344.5 40.0003C364 53.3997 384 22 399 22" stroke="white" strokeOpacity="0.5" strokeDasharray="3 3"/>
                </svg>
                <svg className="d-sm-none" width="193" height="110" viewBox="0 0 193 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1C4.85463 20.0046 26.9085 13.6461 29.9086 40.0095C32.372 61.6569 13.5053 130.362 7.98637 90.0217C-3.57698 5.50061 85.7981 127.53 106.034 106.525C145.807 65.2398 98.0842 -57.9337 166.742 40.0093C176.137 53.412 185.773 22.0046 193 22.0046" stroke="white" strokeOpacity="0.5" strokeDasharray="3 3"/>
                </svg>
            </div>
        </div>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-xl-7 col-lg-7">
                    <div className="tp-subscribe-content">
                        <span>Sale 20% off all store</span>
                        <h3 className="tp-subscribe-title">Subscribe our Newsletter</h3>
                    </div>
                </div>
                <div className="col-xl-5 col-lg-5">
                    <div className="tp-subscribe-form">
                        <form method="POST" action="/newsletter/subscribe" acceptCharset="UTF-8" id="botble-newsletter-forms-fronts-newsletter-form" className="subscribe-form dirty-check"><input name="_token" type="hidden" value="rdL0i0fdEFahvYMTSodxTJYCXBStzgJOvDfvKzBo" />






                            <div className="tp-subscribe-input">







                                <input className="form-control" placeholder="Enter Your Email" id="newsletter-email" required={true} name="email" type="email" />









                                <button className="" type="submit">Subscribe</button>



                            </div>







                            <div className="newsletter-message newsletter-success-message" style={{"display":"none"} as React.CSSProperties}></div>
                            <div className="newsletter-message newsletter-error-message" style={{"display":"none"} as React.CSSProperties}></div>











                        </form>


                    </div>
                </div>
            </div>
        </div>
    </section>


    <footer>
        <div className="tp-footer-area">
            <div className="tp-footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                            <div className="tp-footer-widget footer-col-1 mb-50">
                                <div className="tp-footer-widget-content">
                                    <div className="tp-footer-logo">
                                        <a href="/">
                                            <img src="/storage/logot.webp" style={{"maxHeight":"50px"} as React.CSSProperties} loading="lazy" alt="Zen Nova" />
                                        </a>
                                    </div>
                                    <div className="tp-footer-desc">
                                        Zennova is a leading brand that provides premium quality health supplements for healthy lifstyle.
                                    </div>
                                    <div className="tp-footer-social">

                                        <a href="https://www.facebook.com" title="Facebook" target="_blank"><svg className="icon  svg-icon-ti-ti-brand-facebook" 
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
  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
</svg></a>

                                        <a href="https://x.com" title="X (Twitter)" target="_blank"><svg className="icon  svg-icon-ti-ti-brand-x" 
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
  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
</svg></a>

                                        <a href="https://www.youtube.com" title="YouTube" target="_blank"><svg className="icon  svg-icon-ti-ti-brand-youtube" 
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
  <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
  <path d="M10 9l5 3l-5 3z" />
</svg></a>

                                        <a href="https://www.linkedin.com" title="Instagram" target="_blank"><svg className="icon  svg-icon-ti-ti-brand-linkedin" 
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
  <path d="M8 11v5" />
  <path d="M8 8v.01" />
  <path d="M12 16v-5" />
  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
</svg></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <div className="tp-footer-widget footer-col-2">
                                <h4 className="tp-footer-widget-title">My Account</h4>
                                <div className="tp-footer-widget-content">
                                    <ul>
                                        <li>
                                            <a href="/orders/tracking" title="Track Orders">
                

                Track Orders
            </a>
                                        </li>
                                        <li>
                                            <a href="/shipping" title="Shipping">
                

                Shipping
            </a>
                                        </li>
                                        <li>
                                            <a href="/wishlist" title="Wishlist">
                

                Wishlist
            </a>
                                        </li>
                                        <li>
                                            <a href="/customer/overview" title="My Account">
                

                My Account
            </a>
                                        </li>
                                        <li>
                                            <a href="/customer/orders" title="Order History">
                

                Order History
            </a>
                                        </li>
                                        <li>
                                            <a href="/customer/order-returns" title="Returns">
                

                Returns
            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <div className="tp-footer-widget footer-col-2">
                                <h4 className="tp-footer-widget-title">Information</h4>
                                <div className="tp-footer-widget-content">
                                    <ul>
                                        <li>
                                            <a href="/our-story" title="Our Story">
                

                Our Story
            </a>
                                        </li>
                                        <li>
                                            <a href="/careers" title="Careers">
                

                Careers
            </a>
                                        </li>
                                        <li>
                                            <a href="/cookie-policy" title="Privacy Policy">
                

                Privacy Policy
            </a>
                                        </li>
                                        <li>
                                            <a href="/blog" title="Latest News">
                

                Latest News
            </a>
                                        </li>
                                        <li>
                                            <a href="/contact" title="Contact Us">
                

                Contact Us
            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="tp-footer-widget footer-col-4 mb-50">
                                <h4 className="tp-footer-widget-title">Talk To Us</h4>
                                <div className="tp-footer-widget-content">
                                    <div className="tp-footer-talk mb-20">
                                        <span>Got Questions? Call us</span>
                                        <h4>
                                            <a href={`tel:${phone}`}>{phone}</a>
                                        </h4>
                                    </div>
                                    <div className="tp-footer-contact">
                                        <div className="tp-footer-contact-item d-flex align-items-start">
                                            <div className="tp-footer-contact-icon">
                                                <span>
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6H5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13 5.40039L10.496 7.40039C9.672 8.05639 8.32 8.05639 7.496 7.40039L5 5.40039" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 11.4004H5.8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 8.19922H3.4" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                                            </div>
                                            <div className="tp-footer-contact-content">
                                               <p><a href={`mailto:${email}`}>{email}</a></p>
                                            </div>
                                        </div>
                                        <div className="tp-footer-contact-item d-flex align-items-start">
                                            <div className="tp-footer-contact-icon">
                                                <span>
                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.50001 10.9417C9.99877 10.9417 11.2138 9.72668 11.2138 8.22791C11.2138 6.72915 9.99877 5.51416 8.50001 5.51416C7.00124 5.51416 5.78625 6.72915 5.78625 8.22791C5.78625 9.72668 7.00124 10.9417 8.50001 10.9417Z" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M1.21115 6.64496C2.92464 -0.887449 14.0841 -0.878751 15.7889 6.65366C16.7891 11.0722 14.0406 14.8123 11.6313 17.126C9.88298 18.8134 7.11704 18.8134 5.36006 17.126C2.95943 14.8123 0.210885 11.0635 1.21115 6.64496Z" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                            </span>
                                            </div>
                                            <div className="tp-footer-contact-content">
                                                <p>
                                                    <a href={`https://maps.google.com/?q=${address}`} target="_blank">
  {address}
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
            </div>
            <div className="tp-footer-bottom">
                <div className="container">
                    <div className="tp-footer-bottom-wrapper">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="tp-footer-copyright">
                                    <div>{copyright}</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="tp-footer-payment text-md-end">
                                    <p>
                                        <img src="/storage/footer-pay-1.svg" alt="footer image" />
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div className="evoclabs-powered-by" style={{
        backgroundColor: '#000000',
        padding: '20px 0 25px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
        <a href="https://evoclabs.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.65)',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
        }}
        >
            <span>Powered by</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7H5" />
            </svg>
            <span style={{ fontWeight: 'bold', color: '#00A3FF' }}>EvocLabs</span>
        </a>
    </div>
    </>
  );
}