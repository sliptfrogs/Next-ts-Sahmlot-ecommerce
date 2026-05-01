// data/menu.ts – images are in /public/assets/

export type MenuLink = { label: string; to: string; tag?: "new" | "hot" };
export type MenuColumn = { heading: string; links: MenuLink[] };
export type MegaMenu = {
  id: string;
  label: string;
  to: string;
  columns: MenuColumn[];
  feature?: {
    title: string;
    copy: string;
    cta: string;
    to: string;
    image: string;
  };
  accent?: boolean;
};

export const megaMenus: MegaMenu[] = [
  {
    id: "new",
    label: "New In",
    to: "/shop?cat=new",
    columns: [
      {
        heading: "Just Dropped",
        links: [
          { label: "All New", to: "/shop?cat=new" },
          { label: "New Tops", to: "/shop?cat=new&q=tee", tag: "new" },
          { label: "New Shirts", to: "/shop?cat=new&q=shirt" },
          { label: "New Polos", to: "/shop?cat=new&q=polo" },
        ],
      },
      {
        heading: "Highlights",
        links: [
          { label: "Bestsellers", to: "/shop?q=bestseller", tag: "hot" },
          { label: "Limited Editions", to: "/shop?q=limited" },
          { label: "Resort '25", to: "/shop?collection=resort-25" },
        ],
      },
    ],
    feature: {
      title: "Resort '25",
      copy: "Linen, light cottons, easy silhouettes.",
      cta: "Shop the drop",
      to: "/shop?collection=resort-25",
      image: "/assets/menu-resort.jpg",
    },
  },
  {
    id: "clothing",
    label: "Clothing",
    to: "/shop",
    columns: [
      {
        heading: "Tops",
        links: [
          { label: "T-shirts", to: "/shop?q=tee" },
          { label: "Polos", to: "/shop?q=polo" },
          { label: "Henleys", to: "/shop?q=henley" },
          { label: "Knits", to: "/shop?q=knit" },
        ],
      },
      {
        heading: "Shirts",
        links: [
          { label: "Linen", to: "/shop?q=linen" },
          { label: "Oxford", to: "/shop?q=oxford" },
          { label: "Camp Collar", to: "/shop?q=camp" },
        ],
      },
      {
        heading: "Shop By Style",
        links: [
          {
            label: "Daily Essentials",
            to: "/shop?collection=daily-essentials",
          },
          { label: "Heritage", to: "/shop?collection=heritage" },
          { label: "Street Edit", to: "/shop?collection=street-edit" },
        ],
      },
    ],
    feature: {
      title: "Daily Essentials",
      copy: "The pieces you'll actually reach for.",
      cta: "Explore essentials",
      to: "/shop?collection=daily-essentials",
      image: "/assets/menu-essentials.jpg",
    },
  },
  {
    id: "men",
    label: "Men",
    to: "/shop?cat=men",
    columns: [
      {
        heading: "Shop Men",
        links: [
          { label: "All Men", to: "/shop?cat=men" },
          { label: "Tees", to: "/shop?cat=men&q=tee" },
          { label: "Shirts", to: "/shop?cat=men&q=shirt" },
          { label: "Polos", to: "/shop?cat=men&q=polo" },
        ],
      },
      {
        heading: "By Collection",
        links: [
          { label: "Heritage", to: "/shop?cat=men&collection=heritage" },
          { label: "Resort '25", to: "/shop?cat=men&collection=resort-25" },
          {
            label: "Daily Essentials",
            to: "/shop?cat=men&collection=daily-essentials",
          },
        ],
      },
    ],
    feature: {
      title: "Made for Men",
      copy: "Tailored fits, natural fibers.",
      cta: "Shop men",
      to: "/shop?cat=men",
      image: "/assets/menu-men.jpg",
    },
  },
  {
    id: "women",
    label: "Women",
    to: "/shop?cat=women",
    columns: [
      {
        heading: "Shop Women",
        links: [
          { label: "All Women", to: "/shop?cat=women" },
          { label: "Tees", to: "/shop?cat=women&q=tee" },
          { label: "Knits", to: "/shop?cat=women&q=knit" },
        ],
      },
      {
        heading: "By Collection",
        links: [
          {
            label: "Daily Essentials",
            to: "/shop?cat=women&collection=daily-essentials",
          },
          { label: "Resort '25", to: "/shop?cat=women&collection=resort-25" },
        ],
      },
    ],
    feature: {
      title: "Soft. Easy. You.",
      copy: "Effortless layers for every day.",
      cta: "Shop women",
      to: "/shop?cat=women",
      image: "/assets/menu-women.jpg",
    },
  },
  {
    id: "collections",
    label: "Collections",
    to: "/shop",
    columns: [
      {
        heading: "Collections",
        links: [
          {
            label: "Daily Essentials",
            to: "/shop?collection=daily-essentials",
          },
          { label: "Heritage", to: "/shop?collection=heritage" },
          { label: "Resort '25", to: "/shop?collection=resort-25" },
          { label: "Street Edit", to: "/shop?collection=street-edit" },
        ],
      },
    ],
    feature: {
      title: "Resort '25",
      copy: "A breezy capsule for warm days.",
      cta: "View collection",
      to: "/shop?collection=resort-25",
      image: "/assets/menu-resort.jpg",
    },
  },
  {
    id: "sale",
    label: "Sale",
    to: "/shop?q=sale",
    accent: true,
    columns: [
      {
        heading: "On Sale",
        links: [
          { label: "All Sale", to: "/shop?q=sale" },
          { label: "Up to 30% Off", to: "/shop?q=sale" },
        ],
      },
    ],
    feature: {
      title: "Final markdowns",
      copy: "Up to 30% off — while sizes last.",
      cta: "Shop sale",
      to: "/shop?q=sale",
      image: "/assets/menu-sale.jpg",
    },
  },
];
