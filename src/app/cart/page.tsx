import CartClient from "./CartClient";
import "./cart.css";

export default function CartPage() {
  return (
    <main className="zn-cart-page-bg">
      <section className="breadcrumb__area breadcrumb__style-2 include-bg pt-95 pb-50">
        <div className="container">
          <div className="breadcrumb__content p-relative z-index-1">
            <h3 className="breadcrumb__title">Shopping Cart</h3>
            <div className="breadcrumb__list">
              <span><a href="/">Home</a></span>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </section>
      <section className="container pb-100 pt-30">
        <CartClient />
      </section>
    </main>
  );
}
