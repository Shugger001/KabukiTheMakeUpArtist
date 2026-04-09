"use client";

import { m } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

/**
 * Style pillars — not press logos. Avoids implying unpaid/unlicensed “as seen in” claims.
 * Swap this strip for real publication wordmarks only when you have verifiable credits.
 */
const pillars = [
  { name: "Bridal" },
  { name: "Traditional" },
  { name: "Editorial" },
  { name: "Campaign" },
  { name: "Private client" },
];

export function PressStrip() {
  return (
    <section className="border-y border-kabuki-navy/[0.06] bg-kabuki-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-kabuki-navy/38 sm:tracking-[0.48em]">
            Editorial-quality makeup
          </p>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-kabuki-navy/50">
            The kinds of looks we craft — not media placements. When you have real press or features,
            we can showcase those here with permission.
          </p>
        </Reveal>
        <m.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 md:gap-x-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {pillars.map((p) => (
            <m.span
              key={p.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="select-none text-lg font-semibold uppercase tracking-[0.28em] text-kabuki-navy/25 sm:text-xl sm:tracking-[0.32em]"
            >
              {p.name}
            </m.span>
          ))}
        </m.div>
      </div>
    </section>
  );
}
