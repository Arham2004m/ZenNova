"use client";

import { useEffect } from "react";

export default function BundlePageShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("zn-bundle-route");

    const popup = document.querySelector(".js-sale-popup-container");
    popup?.classList.add("hidden");

    return () => {
      document.body.classList.remove("zn-bundle-route");
    };
  }, []);

  return <>{children}</>;
}
