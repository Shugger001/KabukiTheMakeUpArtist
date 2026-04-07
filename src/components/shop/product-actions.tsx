"use client";

import { toast } from "sonner";
import { useCartStore } from "@/stores/cart-store";
import type { SampleProduct } from "@/lib/data/sample-products";

export function ProductActions({ product }: { product: SampleProduct }) {
  const addLine = useCartStore((s) => s.addLine);

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <button
        type="button"
        onClick={() => {
          addLine({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
          });
          toast.success("Added to bag", { description: product.name });
        }}
        className="rounded-full bg-kabuki-navy px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-kabuki-navy/90"
      >
        Add to bag
      </button>
      <button
        type="button"
        onClick={() => toast.message("Wishlist", { description: "Wire to Supabase `wishlists`." })}
        className="rounded-full border border-kabuki-pink/40 px-8 py-3 text-sm font-semibold text-kabuki-navy transition hover:bg-kabuki-pink/15"
      >
        Save for later
      </button>
    </div>
  );
}
