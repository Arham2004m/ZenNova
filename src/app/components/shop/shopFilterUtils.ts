import type { Product } from "@/types/product";

const ATTRIBUTE_LABELS: Record<string, string> = {
  color: "Color",
  weight: "Weight",
  size: "Size",
  boxes: "Boxes",
};

export function getVariantAttrValue(variant: Record<string, unknown>, attr: string): string | null {
  const key = attr.toLowerCase();

  if (variant.attributes && typeof variant.attributes === "object") {
    const attrs = variant.attributes as Record<string, unknown>;
    const match = Object.entries(attrs).find(([name]) => name.toLowerCase() === key);
    if (match?.[1]) return String(match[1]).trim();
  }

  for (const [name, val] of Object.entries(variant)) {
    if (name.toLowerCase() === key && val != null && typeof val !== "object") {
      return String(val).trim();
    }
  }

  if (Array.isArray(variant.options)) {
    const opt = variant.options.find(
      (item) =>
        item &&
        typeof item === "object" &&
        String((item as Record<string, unknown>).name ?? "").toLowerCase() === key
    ) as Record<string, unknown> | undefined;
    if (opt?.value) return String(opt.value).trim();
  }

  return null;
}

export function productMatchesAttributes(
  product: Product,
  selected: Record<string, Set<string>>
): boolean {
  return Object.entries(selected).every(([attr, values]) => {
    if (!values.size) return true;

    return product.variants?.some((variant) => {
      if (!variant || typeof variant !== "object") return false;
      const value = getVariantAttrValue(variant as Record<string, unknown>, attr);
      return value ? values.has(value) : false;
    });
  });
}

export function extractVariantFilters(products: Product[]) {
  const map = new Map<string, Set<string>>();

  products.forEach((product) => {
    product.variants?.forEach((variant) => {
      if (!variant || typeof variant !== "object") return;
      const record = variant as Record<string, unknown>;

      if (record.attributes && typeof record.attributes === "object") {
        Object.entries(record.attributes as Record<string, unknown>).forEach(([name, val]) => {
          const value = String(val ?? "").trim();
          if (!value) return;
          const key = name.toLowerCase();
          if (!map.has(key)) map.set(key, new Set());
          map.get(key)!.add(value);
        });
      }

      Object.entries(record).forEach(([name, val]) => {
        if (!["attributes", "options", "id", "sku", "price", "stock", "images"].includes(name)) {
          const key = name.toLowerCase();
          if (ATTRIBUTE_LABELS[key] && val != null && typeof val !== "object") {
            const value = String(val).trim();
            if (!value) return;
            if (!map.has(key)) map.set(key, new Set());
            map.get(key)!.add(value);
          }
        }
      });

      if (Array.isArray(record.options)) {
        record.options.forEach((item) => {
          if (!item || typeof item !== "object") return;
          const opt = item as Record<string, unknown>;
          const name = String(opt.name ?? "").trim();
          const value = String(opt.value ?? "").trim();
          if (!name || !value) return;
          const key = name.toLowerCase();
          if (!map.has(key)) map.set(key, new Set());
          map.get(key)!.add(value);
        });
      }
    });
  });

  return [...map.entries()]
    .map(([key, values]) => ({
      key,
      label: ATTRIBUTE_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1),
      values: [...values].sort((a, b) => a.localeCompare(b)),
    }))
    .filter((item) => item.values.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getPriceBounds(products: Product[]) {
  const prices = products
    .map((product) => Number(product.price))
    .filter((price) => !Number.isNaN(price) && price >= 0);

  if (!prices.length) {
    return { min: 0, max: 99999 };
  }

  return {
    min: 0,
    max: Math.ceil(Math.max(...prices)),
  };
}

export function isColorAttribute(key: string) {
  return key.toLowerCase() === "color";
}
