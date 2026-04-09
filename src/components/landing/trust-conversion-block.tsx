"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { m } from "framer-motion";
import { VOICES_ATTRIBUTIONS } from "@/lib/constants/voices-from-ghana";

const trustStats = [
  { label: "Weddings, traditional & editorial", value: "Bridal+" },
  { label: "Studio visits & travel days", value: "Accra +" },
  { label: "Heat, humidity & flashback aware", value: "Skin-led" },
];

const testimonials = [
  {
    attribution: VOICES_ATTRIBUTIONS[0],
    role: "Bride",
    quote: "She understood my skin and my culture — I have never felt more myself, just elevated.",
    image: "/editorial/hero-imported.png",
  },
  {
    attribution: VOICES_ATTRIBUTIONS[1],
    role: "Bride",
    quote: "Every brushstroke intentional — she truly gets how our humidity behaves on the skin.",
    image:
      "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?auto=format&fit=crop&w=700&q=80",
  },
  {
    attribution: VOICES_ATTRIBUTIONS[2],
    role: "Bride",
    quote: "Punctual, immaculate kit, and a look that held from sun to dance floor.",
    image:
      "https://images.unsplash.com/photo-1583147610149-78ac5cb5a303?auto=format&fit=crop&w=700&q=80",
  },
];

const recentReel = [
  "Bride prep · Tema",
  "Bride · Pokuase",
  "Bride · Cape Coast",
  "Traditional ceremony · Kumasi",
  "Editorial beauty · Osu studio",
];

export function TrustConversionBlock() {
  return (
    <section className="bg-kabuki-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-kabuki-navy/40">
            Brides first
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.02em] text-kabuki-navy">
            Trusted by brides (and brands) across Ghana — from Tema to Cape Coast.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {trustStats.map((item, i) => (
            <m.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.45, delay: 0.04 * i }}
              className="rounded-2xl border border-kabuki-pink/20 bg-kabuki-grey/45 p-5"
            >
              <p className="font-display text-3xl text-kabuki-navy">{item.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-kabuki-navy/45">
                {item.label}
              </p>
            </m.div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <m.article
              key={item.attribution}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="flex gap-4 rounded-3xl border border-kabuki-pink/25 bg-white p-4 shadow-soft"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl" aria-hidden>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-kabuki-navy">{item.attribution}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-kabuki-navy/45">{item.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-kabuki-navy/72">&ldquo;{item.quote}&rdquo;</p>
              </div>
            </m.article>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-xl text-center text-[0.65rem] leading-relaxed text-kabuki-navy/45">
          Thumbnail photos are illustrative stock imagery. Matilda from Tema, Fafa from Pokuase, and
          Malwine from Cape Coast are real brides Kabuki has worked with, as shared for the site.
        </p>

        <div className="mt-8 rounded-3xl border border-kabuki-navy/10 bg-kabuki-navy px-5 py-5 text-kabuki-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-kabuki-pink/85">Recent work reel</p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm">
            {recentReel.map((item) => (
              <span key={item} className="whitespace-nowrap rounded-full border border-white/20 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
