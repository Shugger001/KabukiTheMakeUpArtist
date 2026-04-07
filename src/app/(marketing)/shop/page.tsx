import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/shop/product-grid";
import { Reveal } from "@/components/motion/reveal";
import { BRAND } from "@/lib/constants/brand";
import { formatShopPrice } from "@/lib/format/money";
import { sampleProducts } from "@/lib/data/sample-products";

const fromPrice = Math.min(...sampleProducts.map((p) => p.price));

export const metadata: Metadata = {
  title: "Shop",
  description: `Curated beauty essentials from ${BRAND.fullName} — shipped across Ghana, prices in GHS.`,
};

export default function ShopPage() {
  return (
    <div className="bg-kabuki-grey py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-kabuki-navy/45">
              The boutique
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-kabuki-navy sm:text-5xl">
              Objects of ritual
            </h1>
            <p className="mt-4 max-w-lg text-kabuki-navy/60">
              Hand-picked ritual pieces for humid climates and celebration season. Prices in Ghana
              cedis ({formatShopPrice(fromPrice)} and up) — swap this grid for your live Supabase
              catalogue when ready.
            </p>
          </Reveal>
          <Link
            href="/shop/cart"
            className="inline-flex items-center justify-center rounded-full border border-kabuki-navy/15 bg-white/80 px-6 py-3 text-sm font-semibold text-kabuki-navy shadow-soft transition hover:border-kabuki-pink"
          >
            View bag
          </Link>
        </div>
        <div className="mt-14">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
