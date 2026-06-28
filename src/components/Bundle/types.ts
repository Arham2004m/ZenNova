export type BundleProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  category?: string;
  stock?: number;
  isActive?: boolean;
};

export type BundleOffer = {
  id: string;
  title: string;
  bundlePrice: number;
  requiredQuantity: number;
  mode: "CATEGORY" | "PRODUCTS";
  bundleMode?: "CATEGORY" | "PRODUCTS";
  category?: { id: string; name: string; slug?: string; color?: string } | null;
  selectedProducts?: BundleProduct[];
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
};

export type BundleCartItem = {
  type: "BUNDLE";
  bundleId: string;
  title: string;
  productIds: string[];
  items: BundleProduct[];
  subtotal: number;
  payable: number;
  savings: number;
  bundlePrice: number;
  requiredQuantity: number;
};
