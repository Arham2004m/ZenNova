/* eslint-disable */
"use client";

import React, { useState } from "react";

const FAQS = [
  {
    question: "How should I take ZenNova Shilajit?",
    answer:
      "Take a pea-sized amount (about 250–500 mg) of Shilajit resin once daily. Dissolve it fully in warm water, milk, or green tea — avoid boiling water, as high heat can reduce potency. For best results, have it in the morning on an empty stomach. Stay consistent for at least 4–6 weeks to notice energy, stamina, and recovery benefits.",
  },
  {
    question: "Are ZenNova supplements lab tested and safe?",
    answer:
      "Yes. Every ZenNova batch is tested by independent third-party labs for purity, heavy metals, microbial safety, and active ingredient levels. We follow GMP-aligned manufacturing standards so you get clean, effective formulas without harmful contaminants. Certificates of analysis are available on request via our support team.",
  },
  {
    question: "How long does delivery take in India?",
    answer:
      "Orders are usually processed within 1–2 business days. Standard delivery across metro cities takes 3–5 business days; other locations may take 5–7 business days. You will receive tracking details by SMS and email once your order ships. Express delivery may be available at checkout for select pin codes.",
  },
  {
    question: "What is ZenNova's return and refund policy?",
    answer:
      "We offer a 30-day satisfaction guarantee on unopened or lightly used products. If your item arrives damaged, incorrect, or you are not satisfied, contact support within 30 days of delivery with your order number and photos (if applicable). Approved returns are refunded to your original payment method within 5–7 business days after we receive the product.",
  },
  {
    question: "Can I take multiple ZenNova supplements together?",
    answer:
      "Many customers combine products such as Ashwagandha, Shilajit, or Fat Burner as part of a daily routine. However, we recommend starting one supplement at a time so you can assess tolerance. If you are pregnant, nursing, on prescription medication, or managing a health condition, consult your doctor before stacking supplements.",
  },
  {
    question: "How do I track my order or contact support?",
    answer:
      "After placing an order, use the tracking link in your confirmation email or visit your account dashboard under Orders. For help with products, returns, or bulk orders, email zennovapvt@gmail.com or call +91 76672 30620. Our team typically responds within 24 hours on business days.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="zn-faq-page">
      <section className="zn-faq-breadcrumb">
        <div className="container">
          <h1 className="zn-faq-hero__title">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="zn-faq-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9">
              <p className="zn-faq-intro">
                Quick answers about ZenNova supplements, orders, shipping, and returns. Can&apos;t
                find what you need?{" "}
                <a href="/contact" className="zn-faq-intro__link">
                  Contact our team
                </a>
                .
              </p>

              <div className="zn-faq-accordion">
                {FAQS.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={faq.question} className={`zn-faq-item ${isOpen ? "is-open" : ""}`}>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="zn-faq-item__trigger"
                        aria-expanded={isOpen}
                      >
                        <span className="zn-faq-item__question">{faq.question}</span>
                        <span className="zn-faq-item__icon" aria-hidden="true">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="zn-faq-item__panel">
                          <p className="zn-faq-item__answer">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
