import { getPage } from "@/lib/api";

export default async function Contact() {
  const page = await getPage("about");
  const content =
    page?.content ??
    "<p>We are ZenNova — a wellness brand focused on premium fitness supplements for energy, recovery, fat loss, and sleep. Check back soon for our full story.</p>";

  return (
    <main className="zn-contact-page">
      <section className="zn-contact-hero">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="zn-contact-hero__inner">
                <h1 className="zn-contact-hero__title">About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="zn-contact-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-40">
              <div className="zn-contact-sidebar">
                <h2 className="zn-contact-sidebar__title">Get In Touch</h2>

                <div className="zn-contact-info-block">
                  <span className="zn-contact-info-label">Our Location</span>
                  <a
                    href="https://maps.google.com/?q=79 Sleepy Hollow St. Jamaica, New York 1432"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zn-contact-info-value"
                  >
                    79 Sleepy Hollow St. Jamaica, New York 1432
                  </a>
                </div>

                <div className="zn-contact-info-block">
                  <span className="zn-contact-info-label">Call Us</span>
                  <a href="tel:+67041390762" className="zn-contact-info-value zn-contact-info-value--strong">
                    +670 413 90 762
                  </a>
                </div>

                <div className="zn-contact-info-block">
                  <span className="zn-contact-info-label">Email Address</span>
                  <a href="mailto:support@shofy.com" className="zn-contact-info-value">
                    support@shofy.com
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mb-40">
              <div className="zn-contact-content-card">
                <div className="zn-about-content-rich" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="zn-contact-map-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="zn-map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.067307998638!2d144.99615967675122!3d-37.90547077195431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad668b5a0cf0757%3A0xe54e603e83fdf1b!2s502%20New%20St%2C%20Brighton%20VIC%203186%2C%20Australia!5e0!3m2!1sen!2sin!4v1719520000000!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZenNova location map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
