export type MenuLink = {
  label: string;
  to: string;
  icon?: string; // added optional icon name (used by Header)
};

export type MenuColumn = {
  heading: string;
  links: MenuLink[];
};

export type MegaMenu = {
  id: string;
  label: string;
  to: string;
  columns: MenuColumn[];
  hero?: {
    image: string;
    caption: string;
    sub: string;
    to: string;
  };
  feature?: {
    title: string;
    copy: string;
    cta: string;
    to: string;
  };
  accent?: boolean; // amber highlight
};

export const megaMenus: MegaMenu[] = [
  {
    id: "women",
    label: "Women",
    to: "/shop/women",
    accent: false,
    hero: {
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
      caption: "Woven with intention",
      sub: "Women's collection",
      to: "/shop/women",
    },
    columns: [
      {
        heading: "Clothing",
        links: [
          { label: "Dresses", to: "/shop/women/dresses", icon: "sparkles" },
          { label: "Tops", to: "/shop/women/tops", icon: "shirt" },
          { label: "Trousers", to: "/shop/women/trousers", icon: "layers" },
          { label: "Outerwear", to: "/shop/women/outerwear", icon: "wind" },
          { label: "Knitwear", to: "/shop/women/knitwear", icon: "feather" },
        ],
      },
      {
        heading: "Accessories",
        links: [
          { label: "Bags", to: "/shop/women/bags", icon: "package" },
          { label: "Scarves", to: "/shop/women/scarves", icon: "leaf" },
          { label: "Jewellery", to: "/shop/women/jewellery", icon: "gem" },
        ],
      },
    ],
  },
  {
    id: "men",
    label: "Men",
    to: "/shop/men",
    accent: false,
    hero: {
      image:
        "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=900&q=80",
      caption: "Natural strength",
      sub: "Men's collection",
      to: "/shop/men",
    },
    columns: [
      {
        heading: "Clothing",
        links: [
          { label: "Shirts", to: "/shop/men/shirts", icon: "shirt" },
          { label: "Trousers", to: "/shop/men/trousers", icon: "layers" },
          { label: "Outerwear", to: "/shop/men/outerwear", icon: "wind" },
          { label: "Knitwear", to: "/shop/men/knitwear", icon: "feather" },
        ],
      },
      {
        heading: "Accessories",
        links: [
          { label: "Bags", to: "/shop/men/bags", icon: "package" },
          { label: "Belts", to: "/shop/men/belts", icon: "clock" },
        ],
      },
    ],
  },
  {
    id: "fabrics",
    label: "Fabrics",
    to: "/shop/fabrics",
    accent: false,
    hero: {
      image:
        "https://images.unsplash.com/photo-1558618047-f5e9f1f20a3b?w=900&q=80",
      caption: "Earth's finest fibers",
      sub: "Natural textiles",
      to: "/shop/fabrics",
    },
    columns: [
      {
        heading: "By material",
        links: [
          { label: "Silk", to: "/shop/fabrics/silk", icon: "sparkles" },
          { label: "Linen", to: "/shop/fabrics/linen", icon: "leaf" },
          { label: "Cotton", to: "/shop/fabrics/cotton", icon: "sun" },
          { label: "Wool", to: "/shop/fabrics/wool", icon: "feather" },
          { label: "Hemp", to: "/shop/fabrics/hemp", icon: "droplets" },
        ],
      },
      {
        heading: "By craft",
        links: [
          {
            label: "Handwoven",
            to: "/shop/fabrics/handwoven",
            icon: "palette",
          },
          { label: "Natural dye", to: "/shop/fabrics/dyed", icon: "droplets" },
          {
            label: "Embroidered",
            to: "/shop/fabrics/embroidered",
            icon: "star",
          },
        ],
      },
    ],
  },
  {
    id: "sale",
    label: "Sale",
    to: "/shop/sale",
    accent: true,
    hero: {
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80",
      caption: "Up to 40% off",
      sub: "Final reductions",
      to: "/shop/sale",
    },
    columns: [
      {
        heading: "Shop by",
        links: [
          { label: "New arrivals", to: "/shop/sale/new", icon: "sparkles" },
          { label: "Under $50", to: "/shop/sale/under-50", icon: "tag" },
          { label: "Under $100", to: "/shop/sale/under-100", icon: "tag" },
          { label: "Last sizes", to: "/shop/sale/last-sizes", icon: "clock" },
          { label: "Gift ideas", to: "/shop/sale/gifts", icon: "gift" },
        ],
      },
    ],
  },
];
