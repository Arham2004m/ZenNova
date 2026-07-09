"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/components/Cart/CartProvider";
import { isBundleItem } from "@/types/cart";
import { createStoreOrder } from "@/lib/api-client";
import { formatPrice } from "@/app/components/products/productUtils";
import { sendOtp, verifyOtp, createSession, validateSession } from "@/actions/otp-actions";
import { initiatePayUPayment } from "@/actions/payment-actions";
import "./checkout.css";

// ── CUSTOM INLINE SVG ICONS ──
const PhoneIcon = () => (
  <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CheckCircleIcon = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TruckIcon = () => (
  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ChevronRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const BanknoteIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const CreditCardIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ShoppingBagIcon = ({ size = 64, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const LockIcon = ({ size = 64, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldCheckIcon = ({ size = 64, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
  </svg>
);

const PhoneCallIcon = ({ size = 16, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ArrowRightIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronDownIcon = ({ size = 14, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LoaderIcon = ({ className = "" }) => (
  <svg className={`spinner ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" stroke="rgba(255, 255, 255, 0.2)" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

const IndiaFlag = () => (
  <svg width="20" height="14" viewBox="0 0 30 20" className="checkout__flag">
    <rect width="30" height="20" fill="#FFF" />
    <rect width="30" height="6.67" fill="#FF9933" />
    <rect y="13.33" width="30" height="6.67" fill="#138808" />
    <circle cx="15" cy="10" r="2" fill="#000080" />
    <circle cx="15" cy="10" r="2" fill="none" stroke="#000080" strokeWidth="0.5" />
    <circle cx="15" cy="10" r="0.4" fill="#000080" />
  </svg>
);

type Step = "identify" | "verify" | "details" | "payment" | "success";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh",
  "Andaman & Nicobar Islands", "Puducherry"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, subtotal, clearCart } = useCartContext();

  const [step, setStep] = useState<Step>("identify");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);

  const [payUData, setPayUData] = useState<any>(null);
  const launchAttemptedRef = useRef(false);

  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    type: "HOME",
    flatHouse: "",
    areaStreet: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  // ── Coupon / Discount state ──
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: "PERCENTAGE" | "FIXED";
    value: number;
    discountAmount: number;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const discountedTotal = Math.max(0, total - discountAmount);

  const codFee = 40;

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Handle auto-redirection to PayU Hosted Checkout
  useEffect(() => {
    if (!payUData) return;
    if (launchAttemptedRef.current) return;
    launchAttemptedRef.current = true;

    console.log("Redirecting to PayU Hosted Checkout...", payUData);

    const form = document.createElement("form");
    form.method = "POST";

    const isTestKey = payUData.key === "IWqFlM" || process.env.NEXT_PUBLIC_PAYU_SANDBOX === "true";
    form.action = isTestKey
      ? "https://test.payu.in/_payment"
      : "https://secure.payu.in/_payment";

    Object.entries(payUData).forEach(([key, val]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(val);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    setPayUData(null);
    launchAttemptedRef.current = false;
  }, [payUData]);

  // Load saved addresses and session on mount, check URL status
  useEffect(() => {
    const saved = localStorage.getItem("zennova_saved_addresses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedAddresses(parsed);
        if (parsed.length > 0) {
          const def = parsed.find((a: any) => a.isDefault) || parsed[0];
          setSelectedAddress(def);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const checkSession = async () => {
      try {
        const sessionResult = await validateSession();
        if (sessionResult.valid && sessionResult.phone) {
          setPhone(sessionResult.phone);
          const savedFirstName = localStorage.getItem("zennova_checkout_first_name");
          const savedLastName = localStorage.getItem("zennova_checkout_last_name");
          const savedEmail = localStorage.getItem("zennova_checkout_email");

          if (savedFirstName) setCustomerFirstName(savedFirstName);
          if (savedLastName) setCustomerLastName(savedLastName);
          if (savedEmail) setCustomerEmail(savedEmail);

          // Check for URL status parameters from PayU callback redirection
          const urlParams = new URLSearchParams(window.location.search);
          const statusParam = urlParams.get("status");
          const orderIdParam = urlParams.get("orderId");
          const reasonParam = urlParams.get("reason");

          if (statusParam === "success" && orderIdParam) {
            clearCart();
            const cartBadges = document.querySelectorAll('[data-bb-value="cart-count"]');
            cartBadges.forEach((badge) => {
              badge.textContent = "0";
            });
            document.dispatchEvent(new CustomEvent("ecommerce.cart.removed", {
              detail: { data: { count: 0 } }
            }));

            setPlacedOrderId(orderIdParam);
            setStep("success");
          } else if (statusParam === "failure") {
            setError(reasonParam ? `Payment failed: ${reasonParam.replace(/_/g, " ")}` : "Payment was failed or cancelled. Please try again.");
            setStep("payment");
          } else {
            setStep("details");
          }
        } else {
          setStep("identify");
        }
      } catch (e) {
        console.error("Failed to validate checkout session:", e);
      }
    };
    checkSession();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setOtpLoading(true);
    setError(null);
    setOtp(["", "", "", ""]);

    try {
      const result = await sendOtp({ phone });
      if (result.success) {
        setResendTimer(60);
        setStep("verify");
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(result.message || "Failed to send OTP code");
      }
    } catch (err) {
      setError("Failed to send OTP due to network error");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }
    setOtpLoading(true);
    setError(null);

    try {
      const result = await verifyOtp({ phone, code });
      if (result.success) {
        await createSession(phone);
        localStorage.setItem("zennova_checkout_phone", phone);
        setStep("details");
      } else {
        setError(result.message || "Verification code mismatch");
      }
    } catch (err) {
      setError("Failed to verify OTP due to network error");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSaveAddress = () => {
    if (!addressForm.flatHouse || !addressForm.areaStreet || !addressForm.city || !addressForm.state || !addressForm.pincode) {
      setError("Please fill in all address fields");
      return;
    }
    setError(null);

    const newAddress = {
      id: crypto.randomUUID(),
      ...addressForm,
    };

    let updated = [newAddress, ...savedAddresses];
    if (addressForm.isDefault) {
      updated = updated.map((a) => (a.id === newAddress.id ? a : { ...a, isDefault: false }));
    }

    setSavedAddresses(updated);
    localStorage.setItem("zennova_saved_addresses", JSON.stringify(updated));
    setSelectedAddress(newAddress);
    setShowAddressForm(false);

    setAddressForm({
      type: "HOME",
      flatHouse: "",
      areaStreet: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: true,
    });
  };

  const handleContinueToPayment = () => {
    setError(null);
    setFieldErrors({});

    if (!customerFirstName.trim()) {
      setFieldErrors((prev) => ({ ...prev, firstName: "First name is required" }));
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setFieldErrors((prev) => ({ ...prev, email: "Valid email is required" }));
      return;
    }
    if (!selectedAddress) {
      setError("Please select or add a delivery address");
      return;
    }

    localStorage.setItem("zennova_checkout_first_name", customerFirstName);
    localStorage.setItem("zennova_checkout_last_name", customerLastName);
    localStorage.setItem("zennova_checkout_email", customerEmail);

    setPaymentMethod(null);
    setStep("payment");
  };

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true);
    setCouponError(null);
    setCouponSuccess(null);
    setAppliedCoupon(null);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, orderTotal: total }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setCouponError(json.message || "Invalid coupon code");
        return;
      }
      // Calculate discount amount
      let discountAmt = 0;
      const couponType: "PERCENTAGE" | "FIXED" = json.type || "PERCENTAGE";
      const couponValue: number = Number(json.value) || 0;
      if (couponType === "PERCENTAGE") {
        discountAmt = Math.round((total * couponValue) / 100);
      } else {
        discountAmt = Math.min(couponValue, total);
      }
      setAppliedCoupon({ code, type: couponType, value: couponValue, discountAmount: discountAmt });
      setCouponSuccess(
        couponType === "PERCENTAGE"
          ? `Coupon applied! ${couponValue}% off — You save ₹${formatPrice(discountAmt)}`
          : `Coupon applied! ₹${formatPrice(discountAmt)} off`
      );
    } catch {
      setCouponError("Failed to apply coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
    setCouponSuccess(null);
  };

  const handlePlaceOrder = async (method: "cod" | "payu") => {
    setSubmitting(true);
    setError(null);

    try {
      const items = cart.map((item) => {
        if (isBundleItem(item)) {
          return {
            type: "BUNDLE" as const,
            bundleId: item.bundleId,
            productIds: item.productIds,
          };
        }
        return {
          type: "PRODUCT" as const,
          id: item.productId,
          quantity: item.quantity,
        };
      });

      const fullAddress = `${selectedAddress.flatHouse}, ${selectedAddress.areaStreet}`;

      const payload = {
        items,
        customer: {
          firstName: customerFirstName,
          lastName: customerLastName,
          email: customerEmail,
          phone,
          address: fullAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.pincode,
          paymentMethod: method,
        },
        paymentMethod: method,
      };

      const result = await createStoreOrder(payload);

      if (!result.success) {
        throw new Error(result.message || "Failed to create order");
      }

      if (method === "payu") {
        if (result.url) {
          window.location.href = result.url;
          return;
        }

        const productinfo = cart.map(item => item.type === "PRODUCT" ? item.name : item.title).join(", ").slice(0, 100) || "Store Purchase";
        const payuResult = await initiatePayUPayment({
          orderId: result.orderId,
          amount: discountedTotal,
          firstName: customerFirstName,
          email: customerEmail,
          phone,
          productinfo
        });

        if (payuResult.success && payuResult.data) {
          setPayUData(payuResult.data);
          return;
        } else {
          throw new Error(payuResult.message || "Failed to initiate online payment");
        }
      }

      // COD Path: order is immediately placed and confirmed
      clearCart();

      const cartBadges = document.querySelectorAll('[data-bb-value="cart-count"]');
      cartBadges.forEach((badge) => {
        badge.textContent = "0";
      });

      document.dispatchEvent(new CustomEvent("ecommerce.cart.removed", {
        detail: { data: { count: 0 } }
      }));

      setPlacedOrderId(result.orderId || "ZN-" + Math.floor(100000 + Math.random() * 900000));
      setStep("success");
    } catch (err: any) {
      setError(err.message || "Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && step !== "success") {
    return (
      <main className="checkout">
        <h1 className="checkout__title">Checkout</h1>
        <div className="checkout__empty">
          <ShoppingBagIcon size={64} className="checkout__empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some supplements to your cart to get started.</p>
          <Link href="/products" className="checkout__empty-btn" style={{ textDecoration: "none" }}>
            Browse Supplements
          </Link>
        </div>
      </main>
    );
  }

  const isStepActive = (s: Step) => {
    const order: Step[] = ["identify", "verify", "details", "payment", "success"];
    return order.indexOf(step) >= order.indexOf(s);
  };

  return (
    <main className="checkout">
      <h1 className="checkout__title">CHECKOUT</h1>

      <div className="checkout__steps">
        <div className={`checkout__step ${isStepActive("identify") ? "active" : ""}`}>
          <span className="checkout__step-num">1</span>
          <span className="checkout__step-label">Login</span>
        </div>
        <div className={`checkout__step-line ${isStepActive("details") ? "active" : isStepActive("identify") ? "half-active" : ""}`} />
        <div className={`checkout__step ${isStepActive("details") ? "active" : ""}`}>
          <span className="checkout__step-num">2</span>
          <span className="checkout__step-label">Details</span>
        </div>
        <div className={`checkout__step-line ${isStepActive("payment") ? "active" : isStepActive("details") ? "half-active" : ""}`} />
        <div className={`checkout__step ${isStepActive("payment") ? "active" : ""}`}>
          <span className="checkout__step-num">3</span>
          <span className="checkout__step-label">Payment</span>
        </div>
      </div>

      <div className="checkout__layout">
        <div className="checkout__form">
          {step === "success" && (
            <section className="checkout__section text-center">
              <CheckCircleIcon size={64} className="checkout__success-icon mb-4" />
              <h2 className="checkout__success-heading text-white">Order Confirmed!</h2>
              <p className="checkout__success-order text-warning font-weight-bold">Order #{placedOrderId}</p>
              <p className="checkout__success-message text-white-50">Your shipment is being packed and will ship to you soon.</p>
              <div className="checkout__success-delivery text-white">
                <TruckIcon />
                <span className="ms-2">Standard Delivery (3-5 business days)</span>
              </div>
              <Link href="/products" className="checkout__empty-btn" style={{ textDecoration: "none" }}>
                CONTINUE SHOPPING
              </Link>
            </section>
          )}

          {step === "identify" && (
            <section className="checkout__section">
              <div className="checkout__illustration-container">
                <img
                  src="/storage/otp_illustration.png"
                  alt="Phone Verification"
                  className="checkout__illustration mb-2"
                />
              </div>
              <h3 className="checkout__verification-title text-white">Verify Your Phone Number</h3>
              <p className="checkout__verification-desc text-white-50">
                Secure checkout requires phone verification.<br />
                We will send a one-time OTP to your mobile.
              </p>

              <div className="checkout__verification-badges">
                <div className="checkout__badge-item">
                  <div className="checkout__badge-icon-wrapper">
                    <ShieldCheckIcon size={16} />
                  </div>
                  <div className="checkout__badge-text">
                    <span>Secure</span>
                    <span>Checkout</span>
                  </div>
                </div>
                <div className="checkout__badge-divider" />
                <div className="checkout__badge-item">
                  <div className="checkout__badge-icon-wrapper">
                    <PhoneCallIcon size={16} />
                  </div>
                  <div className="checkout__badge-text">
                    <span>Updates</span>
                    <span>Via SMS</span>
                  </div>
                </div>
              </div>

              <div className="checkout__phone-input-container">
                <div className="checkout__country-selector">
                  <IndiaFlag />
                  <span className="checkout__country-code text-white ms-2">+91</span>
                  <ChevronDownIcon size={14} className="checkout__caret ms-1" />
                </div>
                <div className="checkout__phone-divider" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  maxLength={10}
                  className="checkout__phone-field"
                  disabled={otpLoading}
                />
              </div>
              {error && <p className="checkout__error mb-3">{error}</p>}

              <button className="checkout__send-otp-btn" onClick={handleSendOtp} disabled={otpLoading}>
                {otpLoading ? <LoaderIcon className="animate-spin" /> : <>SEND OTP <ArrowRightIcon size={18} /></>}
              </button>
            </section>
          )}

          {step === "verify" && (
            <section className="checkout__section">
              <div className="checkout__illustration-container">
                <LockIcon size={64} className="text-warning mb-2" />
              </div>
              <h3 className="checkout__verification-title text-white">Enter Verification Code</h3>
              <p className="checkout__verification-desc text-white-50">
                We sent a 4-digit code to +91 {phone}.<br />
                Please check your messages and enter the code below.
              </p>

              <div className="checkout__otp-inputs">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) otpRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="checkout__otp-digit"
                    disabled={otpLoading}
                  />
                ))}
              </div>
              {error && <p className="checkout__error text-center mt-3">{error}</p>}

              <div className="text-center mt-3 mb-4">
                <button className="checkout__resend" onClick={handleSendOtp} disabled={resendTimer > 0 || otpLoading}>
                  {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
                </button>
              </div>

              <button className="checkout__send-otp-btn" onClick={handleVerifyOtp} disabled={otpLoading || otp.join("").length !== 4}>
                {otpLoading ? <LoaderIcon className="animate-spin" /> : <>VERIFY & CONTINUE <ArrowRightIcon size={18} /></>}
              </button>
            </section>
          )}

          {step === "details" && (
            <section className="checkout__section">
              <div className="checkout__step-header">
                <h2>YOUR DETAILS</h2>
                <span className="checkout__verified-badge">✓ Verified</span>
              </div>
              <p className="checkout__step-desc">Provide your contact details and shipping address</p>

              <div className="checkout__row">
                <div className="checkout__field">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={customerFirstName}
                    onChange={(e) => {
                      setCustomerFirstName(e.target.value.replace(/[^a-zA-Z\s]/g, ""));
                      setFieldErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    className={fieldErrors.firstName ? "error" : ""}
                    placeholder="John"
                  />
                  {fieldErrors.firstName && <span className="checkout__error">{fieldErrors.firstName}</span>}
                </div>
                <div className="checkout__field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={customerLastName}
                    onChange={(e) => setCustomerLastName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="checkout__field">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => {
                    setCustomerEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={fieldErrors.email ? "error" : ""}
                  placeholder="john@example.com"
                />
                {fieldErrors.email && <span className="checkout__error">{fieldErrors.email}</span>}
              </div>

              <div className="checkout__address-section">
                <h3 className="checkout__address-title">DELIVERY ADDRESS</h3>

                {!showAddressForm && (
                  <button className="checkout__add-address-btn" onClick={() => setShowAddressForm(true)}>
                    + Add New Address
                  </button>
                )}

                {showAddressForm && (
                  <div className="checkout__address-form">
                    <div className="checkout__address-type-btns">
                      {["HOME", "WORK", "OTHER"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setAddressForm({ ...addressForm, type })}
                          className={`checkout__address-type-btn ${addressForm.type === type ? "active" : ""}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    <div className="checkout__field">
                      <label>House/Flat/Building *</label>
                      <input
                        type="text"
                        value={addressForm.flatHouse}
                        onChange={(e) => setAddressForm({ ...addressForm, flatHouse: e.target.value })}
                        placeholder="Flat 101, building A"
                      />
                    </div>

                    <div className="checkout__field">
                      <label>Street/Area/Landmark *</label>
                      <input
                        type="text"
                        value={addressForm.areaStreet}
                        onChange={(e) => setAddressForm({ ...addressForm, areaStreet: e.target.value })}
                        placeholder="Linking Road, near post office"
                      />
                    </div>

                    <div className="checkout__row checkout__row--3">
                      <div className="checkout__field">
                        <label>City *</label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value.replace(/[^a-zA-Z\s]/g, "") })}
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="checkout__field">
                        <label>State *</label>
                        <select
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        >
                          <option value="">Select State</option>
                          {indianStates.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="checkout__field">
                        <label>PIN Code *</label>
                        <input
                          type="text"
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                          maxLength={6}
                          placeholder="400001"
                        />
                      </div>
                    </div>

                    <div className="checkout__address-form-actions">
                      <button type="button" className="checkout__btn-secondary" onClick={() => setShowAddressForm(false)}>
                        Cancel
                      </button>
                      <button type="button" className="checkout__btn-primary" onClick={handleSaveAddress}>
                        Save Address
                      </button>
                    </div>
                  </div>
                )}

                {savedAddresses.length > 0 && (
                  <div className="checkout__saved-addresses">
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`checkout__address-card ${selectedAddress?.id === addr.id ? "selected" : ""}`}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setShowAddressForm(false);
                        }}
                      >
                        <div className="checkout__address-card-header">
                          <span className="checkout__address-type">{addr.type}</span>
                          {addr.isDefault && <span className="checkout__address-default">Default</span>}
                          {selectedAddress?.id === addr.id && <CheckCircleIcon size={14} className="checkout__address-check" />}
                        </div>
                        <p className="checkout__address-detail font-weight-bold text-white">{addr.flatHouse}</p>
                        <p className="checkout__address-detail text-white-50">{addr.areaStreet}</p>
                        <p className="checkout__address-detail text-white-50">{addr.city}, {addr.state} - {addr.pincode}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && <p className="checkout__error mt-3">{error}</p>}

              <button
                type="button"
                className="checkout__send-otp-btn mt-4"
                onClick={handleContinueToPayment}
                disabled={!selectedAddress}
              >
                CONTINUE TO PAYMENT <ChevronRightIcon size={18} />
              </button>
            </section>
          )}

          {step === "payment" && (
            <>
              {/* Delivery summary capsule */}
              <div className="checkout__delivery-capsule">
                <div className="checkout__delivery-capsule-header">
                  <span className="checkout__delivery-capsule-title">Delivery Details</span>
                  <button type="button" className="checkout__delivery-capsule-change" onClick={() => setStep("details")}>
                    Change
                  </button>
                </div>
                <div className="checkout__delivery-capsule-content">
                  <div className="checkout__delivery-capsule-name-row">
                    <span className="checkout__delivery-capsule-name text-white">
                      {customerFirstName} {customerLastName}
                    </span>
                    <span className="checkout__delivery-capsule-tag">
                      {selectedAddress.type}
                    </span>
                  </div>
                  <p className="checkout__delivery-capsule-address">
                    {selectedAddress.flatHouse}, {selectedAddress.areaStreet}
                  </p>
                  <p className="checkout__delivery-capsule-pincode">
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                  </p>
                  <div className="checkout__delivery-capsule-phone text-white">
                    <PhoneIcon />
                    <span className="ms-2">+91 {phone}</span>
                  </div>
                </div>
              </div>

              <section className="checkout__section">
                <div className="checkout__step-header">
                  <h2>PAYMENT METHOD</h2>
                </div>
                <p className="checkout__step-desc">Select how you want to pay</p>

                {paymentMethod === null && (
                  <div className="checkout__payment-options">
                    <div className="checkout__payment-card" onClick={() => setPaymentMethod("cod")}>
                      <div className="checkout__payment-header">
                        <div className="checkout__payment-info-left">
                          <div className="checkout__payment-icon">
                            <BanknoteIcon size={24} />
                          </div>
                          <div>
                            <p className="checkout__payment-title text-white">Cash on Delivery (COD)</p>
                            <p className="checkout__payment-note text-white-50">+ ₹{codFee} COD handling fee</p>
                          </div>
                        </div>
                        <button className="checkout__payment-select-btn" type="button">
                          Select <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="checkout__payment-card" onClick={() => setPaymentMethod("payu")}>
                      <div className="checkout__payment-header">
                        <div className="checkout__payment-info-left">
                          <div className="checkout__payment-icon">
                            <CreditCardIcon size={24} />
                          </div>
                          <div>
                            <p className="checkout__payment-title text-white">Online Payment</p>
                            <p className="checkout__payment-note text-white-50">Cards, UPI, Netbanking, PayU</p>
                          </div>
                        </div>
                        <button className="checkout__payment-select-btn" type="button">
                          Select <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="checkout__payment-inline-wrapper">
                    <div className="checkout__payment-confirm">
                      <div className="checkout__cod-info text-white-50">
                        <p>Pay with cash upon delivery of your items.</p>
                        <p className="checkout__cod-fee">A handling fee of <span className="text-warning">₹{codFee}</span> applies.</p>
                      </div>
                      {error && <p className="checkout__error">{error}</p>}
                      <div className="checkout__payment-actions">
                        <button type="button" className="checkout__btn-secondary" onClick={() => setPaymentMethod(null)}>
                          Change Method
                        </button>
                        <button
                          type="button"
                          className="checkout__place-order-btn"
                          onClick={() => handlePlaceOrder("cod")}
                          disabled={submitting}
                        >
                          {submitting ? (
                            <LoaderIcon className="animate-spin" />
                          ) : (
                            `PLACE ORDER · ₹${formatPrice(discountedTotal + codFee)}`
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "payu" && (
                  <div className="checkout__payment-inline-wrapper">
                    <div className="checkout__payment-confirm">
                      <div className="checkout__online-info text-white-50">
                        <p>Pay securely via standard gateway integrations.</p>
                        <p className="checkout__secure-badge">🔒 256-bit SSL Secure Payment</p>
                      </div>
                      {error && <p className="checkout__error">{error}</p>}
                      <div className="checkout__payment-actions">
                        <button type="button" className="checkout__btn-secondary" onClick={() => setPaymentMethod(null)}>
                          Change Method
                        </button>
                        <button
                          type="button"
                          className="checkout__place-order-btn checkout__place-order-btn--online"
                          onClick={() => handlePlaceOrder("payu")}
                          disabled={submitting}
                        >
                          {submitting ? (
                            <LoaderIcon className="animate-spin" />
                          ) : (
                            `PAY NOW · ₹${formatPrice(discountedTotal)}`
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </>
          )}
        </div>

        {/* Sidebar Order Summary Panel */}
        <aside className="checkout__summary-panel">
          <h3 className="checkout__summary-title text-white">Order Summary</h3>

          <div className="checkout__summary-items">
            {cart.map((item, index) => {
              const image = isBundleItem(item)
                ? "/storage/logot.webp"
                : item.images?.[0] || "/storage/logot.webp";

              const title = isBundleItem(item) ? item.title : item.name;
              const priceVal = isBundleItem(item) ? item.payable : Number(item.price) * item.quantity;

              return (
                <div key={index} className="checkout__summary-item">
                  <div className="checkout__summary-item-left">
                    <img src={image} alt={title} className="checkout__summary-img" />
                    <div>
                      <h4 className="checkout__summary-name text-white">{title}</h4>
                      {!isBundleItem(item) && (
                        <span className="checkout__summary-qty">Qty: {item.quantity}</span>
                      )}
                    </div>
                  </div>
                  <span className="checkout__summary-price">₹{formatPrice(priceVal)}</span>
                </div>
              );
            })}
          </div>

          {/* Coupon Input Section */}
          <div className="checkout__coupon-section">
            {!appliedCoupon ? (
              <div className="checkout__coupon-input-row">
                <input
                  type="text"
                  className="checkout__coupon-input"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  disabled={couponLoading}
                />
                <button
                  type="button"
                  className="checkout__coupon-apply-btn"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponInput.trim()}
                >
                  {couponLoading ? <LoaderIcon className="animate-spin" /> : "Apply"}
                </button>
              </div>
            ) : (
              <div className="checkout__coupon-applied">
                <span className="checkout__coupon-tag">
                  🏷️ {appliedCoupon.code}
                  {appliedCoupon.type === "PERCENTAGE"
                    ? ` (${appliedCoupon.value}% OFF)`
                    : ` (₹${formatPrice(appliedCoupon.value)} OFF)`}
                </span>
                <button
                  type="button"
                  className="checkout__coupon-remove"
                  onClick={handleRemoveCoupon}
                >
                  ✕ Remove
                </button>
              </div>
            )}
            {couponError && <p className="checkout__coupon-msg checkout__coupon-msg--error">{couponError}</p>}
            {couponSuccess && <p className="checkout__coupon-msg checkout__coupon-msg--success">{couponSuccess}</p>}
          </div>

          <div className="checkout__summary-totals">
            <div className="checkout__summary-row">
              <span>Subtotal</span>
              <span className="text-white">₹{formatPrice(subtotal)}</span>
            </div>

            {appliedCoupon && (
              <div className="checkout__summary-row checkout__summary-row--discount">
                <span>Discount ({appliedCoupon.code})</span>
                <span className="checkout__discount-value">−₹{formatPrice(discountAmount)}</span>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="checkout__summary-row">
                <span>COD Surcharge</span>
                <span className="text-white">₹{codFee}</span>
              </div>
            )}

            <div className="checkout__summary-row checkout__summary-row--total">
              <span>Total</span>
              <span>₹{formatPrice(paymentMethod === "cod" ? discountedTotal + codFee : discountedTotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
