"use client";

import { m } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

/** Typography-only marks — swap for licensed wordmarks when you have credits. */
const marks = [
  { name: "Glitz Africa" },
  { name: "Glam Africa" },
  { name: "Vogue" },
  { name: "ELLE" },
  { name: "Harper's Bazaar" },
];

export function PressStrip() {
  return (
    <section className="border-y border-kabuki-navy/[0.06] bg-kabuki-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-kabuki-navy/38 sm:tracking-[0.48em]">
            Press &amp; editorials — Africa &amp; diaspora
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
          {marks.map((m_) => (
            <m.span
              key={m_.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="select-none text-lg font-semibold uppercase tracking-[0.28em] text-kabuki-navy/25 sm:text-xl sm:tracking-[0.32em]"
            >
              {m_.name}
            </m.span>
          ))}
        </m.div>
      </div>
    </section>
  );
}
