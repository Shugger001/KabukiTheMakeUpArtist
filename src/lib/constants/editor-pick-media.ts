import { publicMarketingSrc } from "@/lib/media/public-marketing-url";

const pickFallback: Record<string, string> = {
  /** Same Ghana beauty portrait family as hero fallbacks */
  "velvet-skin-primer":
    "https://images.unsplash.com/photo-1624667773099-1b80ae774080?auto=format&fit=crop&w=640&q=80",
  "editorial-lip-velvet":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=640&q=80",
  "kabuki-lash-couture":
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=640&q=80",
};

const pickPath: Record<string, string> = {
  "velvet-skin-primer": "products/velvet-skin-primer.webp",
  "editorial-lip-velvet": "products/editorial-lip-velvet.webp",
  "kabuki-lash-couture": "products/kabuki-lash-couture.webp",
};

export function editorPickImageSrc(slug: string, productFallback: string): string {
  const path = pickPath[slug];
  if (!path) return productFallback;
  return publicMarketingSrc(path, pickFallback[slug] ?? productFallback);
}
