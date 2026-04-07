"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { sampleProducts } from "@/lib/data/sample-products";
import { formatShopPrice } from "@/lib/format/money";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";

export function ProductGrid() {
  const addLine = useCartStore((s) => s.addLine);

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {sampleProducts.map((p, i) => (
        <m.article
          key={p.id}
          className="group flex flex-col overflow-hidden rounded-3xl border border-kabuki-pink/25 bg-white/70 shadow-soft backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.5, delay: 0.06 * i }}
        >
          <Link href={`/shop/${p.slug}`} className="relative aspect-square bg-kabuki-grey">
            <Image
              src={p.image}
              alt=""
              fill
              className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-kabuki-navy">
              {p.category}
            </span>
          </Link>
          <div className="flex flex-1 flex-col p-6">
            <Link href={`/shop/${p.slug}`}>
              <h2 className="font-display text-xl text-kabuki-navy transition group-hover:text-kabuki-navy/80">
                {p.name}
              </h2>
            </Link>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-kabuki-navy/55">{p.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-kabuki-navy">{formatShopPrice(p.price)}</p>
              <button
                type="button"
                onClick={() => {
                  addLine({
                    productId: p.id,
                    slug: p.slug,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                  });
                  toast.success("Added to bag", { description: p.name });
                }}
                className="rounded-full bg-kabuki-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-kabuki-navy/90 active:scale-[0.98]"
              >
                Add to bag
              </button>
            </div>
          </div>
        </m.article>
      ))}
    </div>
  );
}
