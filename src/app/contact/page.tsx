/* eslint-disable */
"use client";

import React from "react";

export default function Contact() {
  const [content, setContent] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.evoclabs.com/api/storefront/public/zenova";
    fetch(`${baseUrl}/frontend/pages/about`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.page?.content) {
          setContent(data.page.content);
        } else {
          setContent("<p>Failed to load About Us content.</p>");
        }
      })
      .catch((err) => {
        console.error(err);
        setContent("<p>Failed to load About Us content.</p>");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main>
      {/* Breadcrumb Area */}
      <section className="breadcrumb__area pt-80 pb-80" style={{ backgroundColor: "#000", borderBottom: "1px solid #111" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content text-center">
                <h2 className="breadcrumb__title text-white">About Us</h2>
                <div className="breadcrumb__list text-white">
                  <span><a href="/" className="text-white">Home</a></span>
                  <span className="dvdr">/</span>
                  <span className="text-white-50">About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="tp-contact-area pt-100 pb-50 grey-bg-2" style={{ backgroundColor: "#060608" }}>
        <div className="container">
          <div className="row">
            {/* Info Cards Sidebar */}
            <div className="col-lg-4 mb-40">
              <div className="p-5 bg-dark rounded text-white h-100" style={{ border: "1px solid #222", backgroundColor: "#121214" }}>
                <h3 className="text-white mb-4">Get In Touch</h3>
                
                <div className="mb-4">
                  <h4 className="text-warning small mb-1">Our Location</h4>
                  <p className="text-white-50">
                    <a href="https://maps.google.com/?q=79 Sleepy Hollow St. Jamaica, New York 1432" target="_blank" className="hover-orange text-white-50">
                      79 Sleepy Hollow St. Jamaica, New York 1432
                    </a>
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-warning small mb-1">Call Us</h4>
                  <p className="text-white">
                    <a href="tel:+670 413 90 762" className="text-white hover-orange font-weight-bold">+670 413 90 762</a>
                  </p>
                </div>

                <div>
                  <h4 className="text-warning small mb-1">Email Address</h4>
                  <p className="text-white-50">
                    <a href="mailto:support@shofy.com" className="text-white-50 hover-orange">support@shofy.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Fetch Content Area */}
            <div className="col-lg-8 mb-40">
              <div className="p-5 bg-dark rounded text-white h-100" style={{ border: "1px solid #222", backgroundColor: "#121214" }}>
                {isLoading ? (
                  <div className="d-flex align-items-center justify-content-center h-100" style={{ minHeight: "250px" }}>
                    <div className="spinner-border text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="zn-about-content-rich" 
                    dangerouslySetInnerHTML={{ __html: content }} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="tp-map-area pb-100 grey-bg-2" style={{ backgroundColor: "#060608" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="zn-map-wrapper rounded overflow-hidden" style={{ border: "1px solid #222" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.067307998638!2d144.99615967675122!3d-37.90547077195431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad668b5a0cf0757%3A0xe54e603e83fdf1b!2s502%20New%20St%2C%20Brighton%20VIC%203186%2C%20Australia!5e0!3m2!1sen!2sin!4v1719520000000!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
