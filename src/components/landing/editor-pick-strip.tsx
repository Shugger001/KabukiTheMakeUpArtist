"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { editorPickImageSrc } from "@/lib/constants/editor-pick-media";
import { sampleProducts } from "@/lib/data/sample-products";
import { formatShopPrice } from "@/lib/format/money";

export function EditorPickStrip() {
  const picks = sampleProducts.slice(0, 3);

  return (
    <section className="bg-kabuki-grey py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-kabuki-navy/42 sm:tracking-[0.45em]">
                Editor&apos;s kit
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl tracking-[-0.02em] text-kabuki-navy sm:text-4xl">
                The three we reach for <span className="italic">first</span>.
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-kabuki-navy/12 bg-white/80 px-6 py-3 text-sm font-semibold text-kabuki-navy shadow-[var(--shadow-glass)] transition hover:border-kabuki-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kabuki-pink/80"
            >
              Shop all
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {picks.map((p, i) => {
            const src = editorPickImageSrc(p.slug, p.image);
            return (
              <m.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 * i + 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-3xl border border-kabuki-pink/20 bg-white/80 shadow-soft backdrop-blur-md"
              >
                <Link href={`/shop/${p.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-kabuki-navy/5">
                    <Image
                      src={src}
                      alt={p.name}
                      fill
                      loading="lazy"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kabuki-navy/35 via-transparent to-kabuki-navy/10 mix-blend-multiply"
                      aria-hidden
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-kabuki-navy">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg tracking-tight text-kabuki-navy">{p.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-kabuki-navy/55">
                      {p.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-kabuki-navy">
                      {formatShopPrice(p.price)}
                    </p>
                  </div>
                </Link>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
