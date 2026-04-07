"use client";

import { m } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const quotes = [
  {
    quote: (
      <>
        She understood my skin and my culture before I finished explaining the brief. I have never
        felt more myself — just <span className="italic">elevated</span>.
      </>
    ),
    name: "Ama Serwaa",
    context: "Traditional wedding · Kumasi",
  },
  {
    quote: (
      <>
        The studio felt like a <span className="italic">sanctuary</span> in Accra. Every brushstroke
        intentional — she truly gets how our humidity behaves on the skin.
      </>
    ),
    name: "Efua Mensah",
    context: "Editorial shoot · Accra",
  },
  {
    quote: (
      <>
        Home visit in East Legon was seamless. Punctual, immaculate kit, and a look that held through
        the full reception —
        <span className="italic">from sun to dance floor</span>.
      </>
    ),
    name: "Naa Dede",
    context: "Private client · Greater Accra",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-kabuki-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-kabuki-navy/38 sm:text-xs sm:tracking-[0.46em]">
            Testimonials
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,5vw,3.25rem)] tracking-[-0.028em] text-kabuki-navy">
            Voices from Ghana &amp; beyond
          </h2>
          <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-kabuki-navy/58 sm:text-[1.02rem]">
            Brides, creatives, and everyday icons — where technique meets West African warmth.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <m.blockquote
              key={q.name}
              className="flex flex-col justify-between rounded-3xl border border-kabuki-pink/25 bg-kabuki-grey/40 p-8 shadow-soft"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: 0.65,
                delay: 0.05 * i + 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="font-display text-lg leading-relaxed tracking-[-0.01em] text-kabuki-navy/90">
                &ldquo;{q.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-kabuki-pink/20 pt-6">
                <p className="text-sm font-semibold text-kabuki-navy">{q.name}</p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-kabuki-navy/45 sm:tracking-[0.26em]">
                  {q.context}
                </p>
              </footer>
            </m.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
