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
                    href="https://maps.google.com/?q=BYE%20PASS%20ROAD,%20Manjhiladih%20Road,%20Near%20Hanuman%20mandir,%20Kolakusma,%20Dhanbad,%20Jharkhand%20828109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zn-contact-info-value"
                  >
                    BYE PASS ROAD, Manjhiladih Road, Near Hanuman mandir, Kolakusma, Dhanbad, Jharkhand - 828109
                  </a>
                </div>

                <div className="zn-contact-info-block">
                  <span className="zn-contact-info-label">Call Us</span>
                  <a href="tel:+917667230620" className="zn-contact-info-value zn-contact-info-value--strong">
                    +91 76672 30620
                  </a>
                </div>

                <div className="zn-contact-info-block">
                  <span className="zn-contact-info-label">Email Address</span>
                  <a href="mailto:zennovapvt@gmail.com" className="zn-contact-info-value">
                    zennovapvt@gmail.com
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
                  src="https://maps.google.com/maps?q=BYE%20PASS%20ROAD,%20Manjhiladih%20Road,%20Near%20Hanuman%20mandir,%20Kolakusma,%20Dhanbad,%20Jharkhand%20828109&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
