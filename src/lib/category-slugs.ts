const normalize = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

/** Slugs from the All Categories dropdown → display title + product category matchers */
export const CATEGORY_SLUG_MAP: Record<
  string,
  { title: string; matchers: string[] }
> = {
  "all-supplements": { title: "All Supplements", matchers: [] },
  fragrance: { title: "Perfume", matchers: ["perfumes", "fragrance", "perfume", "fragrances"] },
  face: { title: "Face", matchers: ["face"] },
  body: { title: "Detox & Reset", matchers: ["body", "detox-&-reset", "detox-and-reset", "detox-reset", "detox", "detox & reset", "detox and reset"] },
  hair: { title: "Hair", matchers: ["hair"] },
  fitness: {
    title: "Testosterone Booster",
    matchers: ["fitness", "testosterone-booster", "testosterone booster", "testosterone"],
  },
  "weight-management": {
    title: "Fitness & Daily Care",
    matchers: ["weight-management", "body-care", "fitness-&-daily-care", "fitness-and-daily-care", "fitness & daily care", "fitness and daily care", "body care"],
  },
};

export function normalizeCategorySlug(slug: string) {
  return normalize(slug);
}

export function getCategoryTitle(slug: string) {
  const key = normalizeCategorySlug(slug);
  if (CATEGORY_SLUG_MAP[key]) return CATEGORY_SLUG_MAP[key].title;
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getNavCategoryLinks() {
  return Object.entries(CATEGORY_SLUG_MAP).map(([slug, { title }]) => ({
    slug,
    title,
  }));
}

/** Map a product's API category string to exactly one nav slug (or null). */
export function getProductCategorySlug(category: string): string | null {
  const normalized = normalize(category);
  if (!normalized) return null;

  for (const [slug, config] of Object.entries(CATEGORY_SLUG_MAP)) {
    if (slug === "all-supplements") continue;

    const matchers = config.matchers.length
      ? config.matchers.map(normalize)
      : [slug];

    if (matchers.includes(normalized)) {
      return slug;
    }
  }

  return CATEGORY_SLUG_MAP[normalized] ? normalized : null;
}

export function filterProductsByCategorySlug<T extends { category?: string }>(
  products: T[],
  slug: string
): T[] {
  const key = normalizeCategorySlug(slug);

  if (key === "all-supplements") return products;

  return products.filter(
    (product) => getProductCategorySlug(product.category || "") === key
  );
}
