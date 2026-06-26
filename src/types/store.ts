export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
};

export type BrandColors = {
  primary: string;    // e.g. "#6366f1"
  secondary: string;  // e.g. "#ec4899"
  accent: string;     // e.g. "#8b5cf6"
};

export type NavLink = {
  href: string;
  label: string;
};

export type StoreData = {
  store: {
    id: string;
    name: string;
    description: string;
    category: string;
  };
  customization: {
    brandColors: BrandColors;
    heroSection: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      slides: HeroSlide[];
    };
    aboutSection: {
      title: string;
      content: string;
    };
    footerContent: {
      copyright: string;
      links: { label: string; href: string }[];
    };
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
    navLinks: NavLink[];
    socialLinks: {
      instagram: string;
      facebook: string;
      twitter: string;
      linkedin: string;
    };
    homePageConfig: {
      heroEnabled: boolean;
      featuredEnabled: boolean;
      categoriesEnabled: boolean;
    };
  };
  settings: {
    currency: string;
    contactEmail: string;
  };
  announcements: any[];
  categories: any[];
};