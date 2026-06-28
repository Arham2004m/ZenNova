import React from "react";
import { cookies } from "next/headers";
import { getWishlistDetails } from "@/lib/wishlist";
import WishlistClient from "./WishlistClient";

export default async function Wishlist() {
  const cookieStore = await cookies();
  const wishlistedProducts = await getWishlistDetails(cookieStore);

  return (
    <main>
      <section className="breadcrumb__area pt-80 pb-80" style={{ backgroundColor: "#000", borderBottom: "1px solid #111" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content text-center">
                <h2 className="breadcrumb__title text-white">My Wishlist</h2>
                <div className="breadcrumb__list text-white">
                  <span><a href="/" className="text-white">Home</a></span>
                  <span className="dvdr">/</span>
                  <span className="text-white-50">Wishlist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-100 pb-100 grey-bg-2">
        <div className="container">
          <WishlistClient initialProducts={wishlistedProducts} />
        </div>
      </section>
    </main>
  );
}
