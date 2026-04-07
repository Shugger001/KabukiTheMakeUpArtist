export interface SampleProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

/** Prices in GHS (whole cedis) */
export const sampleProducts: SampleProduct[] = [
  {
    id: "p1",
    slug: "velvet-skin-primer",
    name: "Velvet Skin Primer",
    description: "Glass-skin base that grips pigment without weight — ideal in humid climates.",
    price: 265,
    category: "Prep",
    image: "/icons/icon-512.png",
  },
  {
    id: "p2",
    slug: "editorial-lip-velvet",
    name: "Editorial Lip Velvet",
    description: "Soft-focus matte with a feathered edge — built for flash and outdoor sets.",
    price: 195,
    category: "Lips",
    image: "/icons/icon-512.png",
  },
  {
    id: "p3",
    slug: "kabuki-lash-couture",
    name: "Lash Couture Set",
    description: "Hand-clustered strips with invisible bands.",
    price: 310,
    category: "Lashes",
    image: "/icons/icon-512.png",
  },
];
