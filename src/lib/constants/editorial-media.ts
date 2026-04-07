import { publicMarketingSrc } from "@/lib/media/public-marketing-url";

/**
 * Fallbacks when Supabase/CDN is off. These URLs point to Unsplash photos whose **published tags
 * and titles** explicitly describe Black / African women (verified from unsplash.com/photos/…).
 * Still-life (no people): brushes + lipstick only.
 *
 * If you still see the wrong imagery: (1) set `NEXT_PUBLIC_MARKETING_MEDIA_USE_STORAGE=false` or
 * remove uploaded files, (2) delete `.next` and restart dev, (3) hard-refresh the browser.
 */
const FB = {
  /** Nana Yaw Otoo — Sunyani, Ghana · “beautiful black woman”, makeup (Unsplash) */
  hero: "https://images.unsplash.com/photo-1624667773099-1b80ae774080?auto=format&fit=crop&w=2400&q=85",
  /** Divine Effiong — flower ear, Black woman portrait */
  g1: "https://images.unsplash.com/photo-1593351799227-75df2026356b?auto=format&fit=crop&w=900&q=80",
  g2: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  g3: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  /** Divine Effiong — beautiful Black woman, smiling */
  g4: "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?auto=format&fit=crop&w=900&q=80",
  /** Justin Essah — Black woman, beauty / fashion */
  g5: "https://images.unsplash.com/photo-1583147610149-78ac5cb5a303?auto=format&fit=crop&w=900&q=80",
  /** Zanzibar — tags include African / beautiful Black woman */
  g6: "https://images.unsplash.com/photo-1545583476-c6f2eafc7f47?auto=format&fit=crop&w=900&q=80",
} as const;

export const heroEditorial = {
  src: publicMarketingSrc("editorial/hero.webp", FB.hero),
  alt: "Portrait of a Black woman — soft editorial light, Ghana",
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export const galleryEditorial: GalleryItem[] = [
  {
    id: "gallery-01",
    src: publicMarketingSrc("editorial/gallery-01.webp", FB.g1),
    alt: "Black woman — beauty portrait with floral detail",
    caption: "Atelier detail",
  },
  {
    id: "gallery-02",
    src: publicMarketingSrc("editorial/gallery-02.webp", FB.g2),
    alt: "Makeup brushes and cosmetics in warm light",
    caption: "The kit, quiet",
  },
  {
    id: "gallery-03",
    src: publicMarketingSrc("editorial/gallery-03.webp", FB.g3),
    alt: "Lip colour swatch with brush",
    caption: "Velvet pigment",
  },
  {
    id: "gallery-04",
    src: publicMarketingSrc("editorial/gallery-04.webp", FB.g4),
    alt: "Black woman smiling — editorial portrait",
    caption: "Soft key",
  },
  {
    id: "gallery-05",
    src: publicMarketingSrc("editorial/gallery-05.webp", FB.g5),
    alt: "Black woman — fashion and beauty portrait",
    caption: "Glass skin base",
  },
  {
    id: "gallery-06",
    src: publicMarketingSrc("editorial/gallery-06.webp", FB.g6),
    alt: "Black woman at the coast — natural light portrait",
    caption: "Evening line",
  },
];
