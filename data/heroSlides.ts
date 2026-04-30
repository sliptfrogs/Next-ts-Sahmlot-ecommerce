
export type HeroTheme = "warm" | "festive" | "dark" | "light";

export type HeroSlide = {
  id: string;
  eyebrow?: string;
  headline: string;
  accent?: string;
  description: string;
  image: string;
  imageAlt: string;
  callout?: {
    label: string;
    title: string;
    href: string;
    cta?: string;
  };
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  theme?: HeroTheme;
  endsAt?: string;
  startsAt?: string;
  badge?: string;
};

export const AUTOPLAY_MS = 6500;

export const heroSlides: HeroSlide[] = [
  {
    id: "resort-25",
    eyebrow: "Resort '25 — New Collection",
    headline: "Wear less.",
    accent: "Say more.",
    description:
      "Natural-fiber tees and shirts, cut clean and built to last. Designed and made in our Phnom Penh atelier.",
    image: "/assets/hero-model.jpg",
    imageAlt: "Model wearing the Sahmlot linen shirt in cream",
    callout: {
      label: "Now in stores",
      title: "Linen Camp Shirt — Sand",
      href: "/product/linen-camp-shirt-sand",
    },
    primaryCta: { label: "Shop New In", href: "/shop?cat=new" },
    secondaryCta: { label: "Browse All", href: "/shop" },
    theme: "warm",
  },
  {
    id: "khmer-new-year-2026",
    eyebrow: "Choul Chnam Thmey · Khmer New Year",
    badge: "Festival Edit",
    headline: "Sour Sdey",
    accent: "Chnam Thmey.",
    description:
      "Celebrate the Khmer New Year with our festival edit — soft linens, festive tones, and gifts ready to wrap.",
    image: "/assets/hero-khmer-newyear.jpg",
    imageAlt: "Model wearing Sahmlot linen with traditional Khmer sampot",
    callout: {
      label: "Festival Gifting",
      title: "Free wrapping on $50+",
      href: "/shop?collection=resort-25",
      cta: "Shop the edit",
    },
    primaryCta: { label: "Shop Festival Edit", href: "/shop?collection=resort-25" },
    secondaryCta: { label: "Gift Guide", href: "/shop?cat=new" },
    theme: "festive",
    startsAt: "2026-04-10T00:00:00+07:00",
    endsAt: "2026-04-17T23:59:59+07:00",
  },
  {
    id: "weekend-sale",
    eyebrow: "Limited Time",
    badge: "−30% OFF",
    headline: "The Weekend",
    accent: "Sale.",
    description:
      "Up to 30% off select tees, shirts and knits. Ends Sunday midnight — while sizes last.",
    image: "/assets/hero-sale.jpg",
    imageAlt: "Model wearing oversized black tee under spotlight",
    primaryCta: { label: "Shop Sale", href: "/shop?q=sale" },
    secondaryCta: { label: "View All", href: "/shop" },
    theme: "dark",
    endsAt: "2026-05-04T23:59:59+07:00",
  },
];

export const getActiveSlides = (now: Date = new Date()): HeroSlide[] => {
  const active = heroSlides.filter((s) => {
    if (s.startsAt && new Date(s.startsAt) > now) return false;
    if (s.endsAt && new Date(s.endsAt) < now) return false;
    return true;
  });
  return active.length > 0 ? active : [heroSlides[0]];
};
