
export type Category = "men" | "women" | "essentials" | "new";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  categories: Category[];
  collection: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  badge?: "New" | "Bestseller" | "Limited" | "Sale";
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "essential-cotton-tee-white",
    name: "Essential Cotton Tee — White",
    price: 18.0,
    image: "/assets/shirt-white-tee.jpg",
    categories: ["essentials", "men", "women", "new"],
    collection: "Daily Essentials",
    colors: [
      { name: "White", hex: "#F5F2EA" },
      { name: "Black", hex: "#1B1A18" },
      { name: "Sage", hex: "#8AA17B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Our signature 220gsm combed cotton tee. Tailored fit, reinforced collar, and a clean drop-shoulder silhouette designed for everyday wear in Cambodia's climate.",
    details: ["100% combed cotton, 220gsm", "Pre-shrunk & enzyme washed", "Made in Phnom Penh", "Machine wash cold"],
    badge: "Bestseller",
  },
  {
    id: "p-002",
    slug: "oversized-tee-midnight",
    name: "Oversized Tee — Midnight Black",
    price: 22.0,
    image: "/assets/shirt-black-tee.jpg",
    categories: ["men", "women", "new"],
    collection: "Street Edit",
    colors: [
      { name: "Black", hex: "#1B1A18" },
      { name: "Cream", hex: "#EFE8D8" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Relaxed fit with extended length and dropped shoulders. Heavyweight 240gsm jersey for a structured drape that holds shape wash after wash.",
    details: ["240gsm heavyweight jersey", "Boxy oversized fit", "Garment dyed", "Machine wash cold"],
    badge: "New",
  },
  {
    id: "p-003",
    slug: "linen-camp-shirt-sand",
    name: "Linen Camp Shirt — Sand",
    price: 36.0,
    compareAt: 44.0,
    image: "/assets/shirt-beige-linen.jpg",
    categories: ["men", "new"],
    collection: "Resort '25",
    colors: [
      { name: "Sand", hex: "#E8D9B8" },
      { name: "Olive", hex: "#7B8466" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Breathable Belgian linen with an open camp collar and shell buttons. Perfect for sun-soaked weekends along the Mekong.",
    details: ["100% Belgian linen", "Mother-of-pearl buttons", "Relaxed camp fit", "Cold wash, line dry"],
    badge: "Sale",
  },
  {
    id: "p-004",
    slug: "striped-pique-polo-navy",
    name: "Striped Piqué Polo — Navy",
    price: 28.0,
    image: "/assets/shirt-navy-polo.jpg",
    categories: ["men"],
    collection: "Heritage",
    colors: [
      { name: "Navy", hex: "#1F2A44" },
      { name: "White", hex: "#F5F2EA" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Classic two-button piqué polo with engineered stripes and a soft ribbed collar. A timeless pick for the office or a weekend brunch.",
    details: ["Cotton piqué knit", "Embroidered crest", "Tailored fit", "Machine wash cold"],
  },
  {
    id: "p-005",
    slug: "boxy-tee-sage",
    name: "Boxy Tee — Sage",
    price: 24.0,
    image: "/assets/shirt-sage-graphic.jpg",
    categories: ["women", "essentials", "new"],
    collection: "Daily Essentials",
    colors: [
      { name: "Sage", hex: "#8AA17B" },
      { name: "Clay", hex: "#C97B5A" },
      { name: "Cream", hex: "#EFE8D8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A relaxed boxy tee in dyed-to-match sage. Soft hand feel with a structured neckline that holds its shape.",
    details: ["100% organic cotton", "GOTS certified dye", "Boxy crop fit", "Machine wash cold"],
    badge: "New",
  },
  {
    id: "p-006",
    slug: "oxford-shirt-sky",
    name: "Oxford Shirt — Sky",
    price: 42.0,
    image: "/assets/shirt-blue-oxford.jpg",
    categories: ["men"],
    collection: "Heritage",
    colors: [
      { name: "Sky", hex: "#B7D3E6" },
      { name: "White", hex: "#F5F2EA" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "An everyday Oxford with a button-down collar and single chest pocket. Yarn-dyed for a softer hand and durable wash.",
    details: ["Yarn-dyed Oxford weave", "Button-down collar", "Tailored fit", "Iron on medium heat"],
  },
  {
    id: "p-007",
    slug: "ribbed-knit-polo-cream",
    name: "Ribbed Knit Polo — Cream",
    price: 48.0,
    image: "/assets/shirt-cream-knit.jpg",
    categories: ["men", "women"],
    collection: "Resort '25",
    colors: [
      { name: "Cream", hex: "#EFE8D8" },
      { name: "Olive", hex: "#7B8466" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Mid-weight ribbed knit with a soft open collar. Crafted from breathable cotton-merino blend.",
    details: ["Cotton-merino blend", "Ribbed body & cuffs", "Slim fit", "Hand wash recommended"],
    badge: "Limited",
  },
  {
    id: "p-008",
    slug: "long-sleeve-henley-charcoal",
    name: "Long-Sleeve Henley — Charcoal",
    price: 32.0,
    image: "/assets/shirt-charcoal-henley.jpg",
    categories: ["men", "essentials"],
    collection: "Daily Essentials",
    colors: [
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Black", hex: "#1B1A18" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Three-button henley in soft waffle knit. A layering essential for cooler evenings.",
    details: ["Cotton waffle knit", "3-button placket", "Regular fit", "Machine wash cold"],
  },
];

export const collections = [
  { slug: "daily-essentials", name: "Daily Essentials", tagline: "The everyday foundations." },
  { slug: "heritage", name: "Heritage", tagline: "Timeless tailoring, refined." },
  { slug: "resort-25", name: "Resort '25", tagline: "Made for warm days." },
  { slug: "street-edit", name: "Street Edit", tagline: "Modern silhouettes, off-duty." },
];

export const categoryMeta: Record<Category, { label: string; description: string }> = {
  men: { label: "Men", description: "Shirts, tees & polos for him." },
  women: { label: "Women", description: "Effortless essentials for her." },
  essentials: { label: "Essentials", description: "Wardrobe foundations, refined." },
  new: { label: "New Arrivals", description: "The latest drops, just in." },
};

const ADMIN_STORAGE_KEY = "sahmlot.admin.products.v1";

export const loadAdminProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
};

export const saveAdminProducts = (list: Product[]) => {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota errors */
  }
};

export const getAllProducts = (): Product[] => [...loadAdminProducts(), ...products];
