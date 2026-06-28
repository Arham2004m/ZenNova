"use client";

import React, { useEffect, useState } from "react";

type CartDetailItem = {
  product: {
    id: string;
    name: string;
    price: string;
    slug: string;
    images: string[];
  };
  quantity: number;
  subtotal: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<{ items: CartDetailItem[]; subtotal: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const fetchCart = async () => {
    try {
      const res = await fetch("/ajax/cart-content");
      const json = await res.json();
      if (!json.error) {
        // We need to parse the items from the details helper on the server, but since GET /ajax/cart-content returns HTML,
        // we can fetch the cart cookie directly or we can make the server route support returning JSON details if requested.
        // Wait, let's fetch a special endpoint /ajax/cart-content?json=true!
        // Yes, let's make our /ajax/cart-content GET endpoint return JSON if ?json=true is passed!
        // That is extremely clever and makes it very easy to fetch cart details in JSON format.
        const resJson = await fetch("/ajax/cart-content?json=true");
        const dataJson = await resJson.json();
        setCart(dataJson.details);
      }
    } catch (e) {
      console.error("Failed to load cart on checkout page:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Simulate API order processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Clear cart
      const res = await fetch("/ajax/cart-content?clear=true");
      await res.json();
      
      // Update global badges
      const cartBadges = document.querySelectorAll('[data-bb-value="cart-count"]');
      cartBadges.forEach((badge) => {
        badge.textContent = "0";
      });

      // Dispatch event to refresh header mini cart
      document.dispatchEvent(new CustomEvent("ecommerce.cart.removed", {
        detail: { data: { count: 0 } }
      }));

      setPlaced(true);
    } catch (err) {
      alert("Something went wrong processing your order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="bg-dark text-white min-vh-100 py-5">
        <div className="container py-5 text-center">
          <div className="bg-dark p-5 rounded border border-secondary d-inline-block" style={{ maxWidth: "600px", borderColor: "#333 !important" }}>
            <span style={{ fontSize: "64px" }}>🎉</span>
            <h2 className="text-warning mt-4 mb-3">Order Placed Successfully!</h2>
            <p className="text-white-50 mb-4" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              Thank you for shopping with ZenNova. Your order has been placed successfully and is currently being processed. You will receive an email confirmation shortly.
            </p>
            <a href="/products" className="tp-btn bg-warning border-0 py-3 px-5 text-white font-weight-bold hover-dark-btn rounded">
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="bg-dark text-white min-vh-100 py-5">
        <div className="container py-5 text-center">
          <div className="bg-dark p-5 rounded border border-secondary d-inline-block" style={{ maxWidth: "500px", borderColor: "#333 !important" }}>
            <span style={{ fontSize: "64px" }}>🛒</span>
            <h2 className="text-warning mt-4 mb-3">Your Cart is Empty</h2>
            <p className="text-white-50 mb-4" style={{ fontSize: "16px" }}>
              Please add some premium wellness supplements to your cart before proceeding to checkout.
            </p>
            <a href="/products" className="tp-btn bg-warning border-0 py-3 px-5 text-white font-weight-bold hover-dark-btn rounded">
              Shop Now
            </a>
          </div>
        </div>
      </main>
    );
  }

  const shippingCost = 150;
  const grandTotal = cart.subtotal + shippingCost;

  return (
    <main className="bg-dark text-white min-vh-100 pb-5">
      {/* Breadcrumb */}
      <section className="breadcrumb__area pt-80 pb-80" style={{ backgroundColor: "#000", borderBottom: "1px solid #111" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content text-center">
                <h2 className="breadcrumb__title text-white">Checkout</h2>
                <div className="breadcrumb__list text-white">
                  <span><a href="/" className="text-white">Home</a></span>
                  <span className="dvdr">/</span>
                  <span className="text-white-50">Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="tp-checkout-area pt-80">
        <div className="container">
          <div className="row">
            {/* Form Column */}
            <div className="col-lg-7">
              <div className="bg-dark p-5 rounded border border-secondary mb-4" style={{ borderColor: "#222 !important" }}>
                <h3 className="text-white mb-4" style={{ fontSize: "22px", borderBottom: "1px solid #222", paddingBottom: "15px" }}>Billing & Shipping Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label text-white-50 small">Full Name</label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border-secondary py-2"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-white-50 small">Email Address</label>
                      <input
                        type="email"
                        className="form-control bg-transparent text-white border-secondary py-2"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-white-50 small">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control bg-transparent text-white border-secondary py-2"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="9876543210"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label text-white-50 small">Street Address</label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border-secondary py-2"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="House No, Street Name, Locality"
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label text-white-50 small">City</label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border-secondary py-2"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label text-white-50 small">Pincode / ZIP</label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border-secondary py-2"
                        required
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        placeholder="400001"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="tp-btn bg-warning border-0 w-100 py-3 text-white font-weight-bold hover-dark-btn rounded d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: "16px" }}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      "Place Cash on Delivery Order"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Summary Column */}
            <div className="col-lg-5">
              <div className="bg-dark p-5 rounded border border-secondary" style={{ borderColor: "#222 !important", position: "sticky", top: "100px" }}>
                <h3 className="text-white mb-4" style={{ fontSize: "22px", borderBottom: "1px solid #222", paddingBottom: "15px" }}>Your Order</h3>
                
                <div className="mb-4" style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "10px" }}>
                  {cart.items.map((item) => (
                    <div className="d-flex justify-content-between align-items-center mb-3" key={item.product.id}>
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.product.images?.[0] || "/storage/logot.webp"} alt={item.product.name} style={{ width: "50px", height: "50px", objectFit: "contain", backgroundColor: "#111", borderRadius: "4px" }} />
                        <div>
                          <h4 className="text-white mb-0" style={{ fontSize: "14px", fontWeight: "normal" }}>{item.product.name}</h4>
                          <span className="text-white-50 small">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="text-warning font-weight-bold">₹{item.subtotal.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <div className="border-top border-secondary pt-3 mt-3">
                  <div className="d-flex justify-content-between text-white-50 mb-2">
                    <span>Subtotal</span>
                    <span className="text-white">₹{cart.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="d-flex justify-content-between text-white-50 mb-2">
                    <span>Shipping Charges</span>
                    <span className="text-white">₹{shippingCost}</span>
                  </div>
                  <div className="d-flex justify-content-between border-top border-secondary pt-3 mt-3" style={{ fontSize: "18px", fontWeight: "bold" }}>
                    <span>Total Amount</span>
                    <span className="text-warning">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
